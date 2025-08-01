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
		'import type * as types from "./types.js";',
	];

	return imports.join("\n");
}

function generateOperationFunction(
	operation: GenerationContext,
	_config: WirefluxConfig[0],
): string {
	const { fnName, method, path, parameters, requestBody } = operation;
	const camelFnName = fnName.charAt(0).toLowerCase() + fnName.slice(1);

	// Determine parameter types
	const pathParams = parameters?.filter((p) => p.in === "path") || [];
	const queryParams = parameters?.filter((p) => p.in === "query") || [];

	const hasPathParams = pathParams.length > 0;
	const hasQueryParams = queryParams.length > 0;
	const hasRequestBody = !!requestBody;

	// Generate function signature
	const paramsForSignature: string[] = [];
	const paramsForDestructuring: string[] = [];

	if (hasPathParams) {
		paramsForDestructuring.push("path");
		paramsForSignature.push(`path: types.${capitalize(fnName)}PathParams`);
	}
	if (hasQueryParams) {
		paramsForDestructuring.push("query");
		paramsForSignature.push(`query?: types.${capitalize(fnName)}QueryParams`);
	}
	if (hasRequestBody) {
		paramsForDestructuring.push("body");
		paramsForSignature.push(`body: types.${capitalize(fnName)}RequestBody`);
	}

	paramsForSignature.push("init?: RequestInit");
	paramsForDestructuring.push("init");

	const finalParams = `params: { ${paramsForSignature.join("; ")} }`;

	const responseType = `types.${capitalize(fnName)}SuccessResponse`;

	// Generate URL construction
	let urlConstruction = `"${path}"`;
	if (hasPathParams) {
		// Replace path parameters with template literals
		for (const param of pathParams) {
			urlConstruction = urlConstruction.replace(
				`{${param.name}}`,
				`\${path.${param.name}}`,
			);
		}
		urlConstruction = `\`${urlConstruction.replace(/"/g, "")}\``;
	}

	const destructuredParams = `const { ${paramsForDestructuring.join(", ")} } = params;`;

	// Generate query string handling
	const queryHandling = hasQueryParams
		? `  const searchParams = new URLSearchParams();\n  if (query) {\n    Object.entries(query).forEach(([key, value]) => {\n      if (value !== undefined) {\n        searchParams.append(key, String(value));\n      }\n    });\n  }\n  const queryString = searchParams.toString();\n  const fullUrl = queryString ? \`\${url}?\${queryString}\` : url;`
		: "  const fullUrl = url;";

	// Generate fetch options
	const fetchOptions: string[] = [];
	fetchOptions.push(`method: "${method}"`);

	if (hasRequestBody) {
		fetchOptions.push(
			'headers: { "Content-Type": "application/json", ...init?.headers }',
		);
		fetchOptions.push("body: JSON.stringify(body)");
	}

	const fetchOptionsString = `{\n    ...init,\n    ${fetchOptions.join(",\n    ")}\n  }`;

	// Generate function body
	const functionBody = `export async function ${camelFnName}(${finalParams}): Promise<${responseType}> {\n  ${destructuredParams}\n  const url = ${urlConstruction};\n  ${queryHandling}\n\n  const response = await fetchClient(fullUrl, ${fetchOptionsString});\n  \n  if (!response.ok) {\n    throw new Error(\`HTTP error! status: \${response.status}\`);\n  }\n  \n  return response.json() as ${responseType};\n}`;

	return functionBody;
}

function capitalize(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1);
}
