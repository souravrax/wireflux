import path from "node:path";
import type { GenerationContext } from "../generation-types.js";
import type { WirefluxConfig } from "../types.js";
import { getRelativePath } from "../utils.js";

export async function generateOperations(
	operations: GenerationContext[],
	config: WirefluxConfig[0],
): Promise<string> {
	const imports = generateImports(config);
	const operationFunctions = operations
		.map((op) => generateOperationFunction(op, config))
		.join("\n\n");

	return `${imports}\n\n${operationFunctions}\n`;
}

function generateImports(config: WirefluxConfig[0]): string {
	const relativePath = getRelativePath(config.output, config.fetchClient);
	const imports = [
		`import fetchClient from "${relativePath}";`,
		'import * as types from "./types.js";',
	];

	return imports.join("\n");
}

function generateOperationFunction(
	operation: GenerationContext,
	_config: WirefluxConfig[0],
): string {
	const { fnName, method, path, parameters, requestBody } = operation;

	// Determine parameter types
	const pathParams = parameters?.filter((p) => p.in === "path") || [];
	const queryParams = parameters?.filter((p) => p.in === "query") || [];

	const hasPathParams = pathParams.length > 0;
	const hasQueryParams = queryParams.length > 0;
	const hasRequestBody = !!requestBody;

	// Generate function signature
	const params = [];
	if (hasPathParams)
		params.push(`pathParams: types.${capitalize(fnName)}PathParams`);
	if (hasQueryParams)
		params.push(`queryParams?: types.${capitalize(fnName)}QueryParams`);
	if (hasRequestBody)
		params.push(`requestBody: types.${capitalize(fnName)}RequestBody`);

	const paramSignature = params.length > 0 ? `{ ${params.join(", ")} }` : "";
	const responseType = `types.${capitalize(fnName)}SuccessResponse`;

	// Generate URL construction
	let urlConstruction = `"${path}"`;
	if (hasPathParams) {
		// Replace path parameters with template literals
		for (const param of pathParams) {
			urlConstruction = urlConstruction.replace(
				`{${param.name}}`,
				`\${pathParams.${param.name}}`,
			);
		}
		urlConstruction = `\`${urlConstruction.replace(/"/g, "")}\``;
	}

	// Generate query string handling
	const queryHandling = hasQueryParams
		? `  const searchParams = new URLSearchParams();
  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
  }
  const queryString = searchParams.toString();
  const fullUrl = queryString ? \`\${url}?\${queryString}\` : url;`
		: "  const fullUrl = url;";

	// Generate fetch options
	const fetchOptions = [];
	fetchOptions.push(`method: "${method}"`);

	if (hasRequestBody) {
		fetchOptions.push('headers: { "Content-Type": "application/json" }');
		fetchOptions.push("body: JSON.stringify(requestBody)");
	}

	const fetchOptionsString = `{
    ${fetchOptions.join(",\n    ")}
  }`;

	// Generate function body
	const functionBody = `export async function ${fnName}(${paramSignature}): Promise<${responseType}> {
  const url = ${urlConstruction};
${queryHandling}

  const response = await fetchClient(fullUrl, ${fetchOptionsString});
  
  if (!response.ok) {
    throw new Error(\`HTTP error! status: \${response.status}\`);
  }
  
  return response.json() as ${responseType};
}`;

	return functionBody;
}

function capitalize(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1);
}
