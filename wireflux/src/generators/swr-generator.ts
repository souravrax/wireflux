import type { GenerationContext } from "../generation-types.js";

export async function generateSwrHooks(
	operations: GenerationContext[],
): Promise<string> {
	const imports = generateImports();
	const hooks = operations
		.filter((op) => op.method === "GET") // SWR is typically for GET requests
		.map((op) => generateSwrHook(op))
		.join("\n\n");

	return `${imports}\n\n${hooks}\n`;
}

function generateImports(): string {
	return `import useSWR from "swr";
import * as operations from "./operations.js";
import * as types from "./types.js";`;
}

function generateSwrHook(operation: GenerationContext): string {
	const { fnName, parameters } = operation;

	const pathParams = parameters?.filter((p) => p.in === "path") || [];
	const queryParams = parameters?.filter((p) => p.in === "query") || [];

	const hasPathParams = pathParams.length > 0;
	const hasQueryParams = queryParams.length > 0;

	// Generate hook parameters
	const params = [];
	if (hasPathParams)
		params.push(`pathParams: types.${capitalize(fnName)}PathParams`);
	if (hasQueryParams)
		params.push(`queryParams?: types.${capitalize(fnName)}QueryParams`);

	const paramSignature = params.length > 0 ? `{ ${params.join(", ")} }` : "";
	const responseType = `types.${capitalize(fnName)}SuccessResponse`;

	// Generate SWR key
	const keyParts = [];
	keyParts.push(`"${fnName}"`);
	if (hasPathParams) keyParts.push("pathParams");
	if (hasQueryParams) keyParts.push("queryParams");

	const swrKey = keyParts.length > 1 ? `[${keyParts.join(", ")}]` : keyParts[0];

	// Generate fetcher function call
	const fetcherArgs = [];
	if (hasPathParams) fetcherArgs.push("pathParams");
	if (hasQueryParams) fetcherArgs.push("queryParams");

	const fetcherCall =
		fetcherArgs.length > 0
			? `operations.${fnName}({ ${fetcherArgs.join(", ")} })`
			: `operations.${fnName}()`;

	const hookBody = `export function use${capitalize(fnName)}(${paramSignature}) {
  return useSWR<${responseType}>(
    ${swrKey},
    () => ${fetcherCall}
  );
}`;

	return hookBody;
}

function capitalize(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1);
}
