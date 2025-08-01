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
	const camelFnName = fnName.charAt(0).toLowerCase() + fnName.slice(1);

	const pathParams = parameters?.filter((p) => p.in === "path") || [];
	const queryParams = parameters?.filter((p) => p.in === "query") || [];

	const hasPathParams = pathParams.length > 0;
	const hasQueryParams = queryParams.length > 0;

	// Hook parameters
	const hookParamsList: string[] = [];
	if (hasPathParams)
		hookParamsList.push(`path: types.${capitalize(fnName)}PathParams`);
	if (hasQueryParams)
		hookParamsList.push(`query?: types.${capitalize(fnName)}QueryParams`);

	const paramsType =
		hookParamsList.length > 0 ? `{ ${hookParamsList.join("; ")} }` : "void";
	const paramsRequired = hasPathParams;
	const paramSignature = `params${paramsRequired ? "" : "?"}: ${paramsType}`;

	const responseType = `types.${capitalize(fnName)}SuccessResponse`;

	// SWR key
	const keyParts = [`'${camelFnName}'`];
	if (hasPathParams) keyParts.push("params.path");
	if (hasQueryParams) keyParts.push("params.query");
	const swrKey = `[${keyParts.join(", ")}]`;

	// Fetcher function call
	const fetcherCall = `() => operations.${camelFnName}(params)`;

	const hookBody = `export function use${capitalize(fnName)}(${paramSignature}) {
  return useSWR<${responseType}>(
    ${swrKey},
    ${fetcherCall}
  );
}`;

	return hookBody;
}

function capitalize(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1);
}