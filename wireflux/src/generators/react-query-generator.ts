import type { GenerationContext } from "../generation-types.js";

export async function generateReactQueryHooks(
	operations: GenerationContext[],
): Promise<string> {
	const imports = generateImports();

	const queries = operations
		.filter((op) => op.method === "GET")
		.map((op) => generateQueryHook(op))
		.join("\n\n");

	const mutations = operations
		.filter((op) => op.method !== "GET")
		.map((op) => generateMutationHook(op))
		.join("\n\n");

	const hooks = [queries, mutations].filter(Boolean).join("\n\n");

	return `${imports}\n\n${hooks}\n`;
}

function generateImports(): string {
	return `import { useQuery, useMutation, type UseQueryOptions, type UseMutationOptions } from "@tanstack/react-query";
import * as operations from "./operations.js";
import * as types from "./types.js";`;
}

function generateQueryHook(operation: GenerationContext): string {
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
	const paramsArg = `params${paramsRequired ? "" : "?"}: ${paramsType}`;

	const optionsArg = `options?: Omit<UseQueryOptions<types.${capitalize(
		fnName,
	)}SuccessResponse>, "queryKey" | "queryFn">`;

	const hookSignature = [paramsArg, optionsArg].filter(Boolean).join(", ");

	const responseType = `types.${capitalize(fnName)}SuccessResponse`;

	// React Query key
	const keyParts = [`'${camelFnName}'`];
	if (hasPathParams) keyParts.push("params.path");
	if (hasQueryParams) keyParts.push("params.query");
	const queryKey = `[${keyParts.join(", ")}]`;

	// Query function call
	const queryFn = `() => operations.${camelFnName}(params)`;

	const hookBody = `export function use${capitalize(fnName)}Query(${hookSignature}) {
  return useQuery<${responseType}>({
    queryKey: ${queryKey},
    queryFn: ${queryFn},
    ...options
  });
}`;

	return hookBody;
}

function generateMutationHook(operation: GenerationContext): string {
	const { fnName, parameters, requestBody } = operation;
	const camelFnName = fnName.charAt(0).toLowerCase() + fnName.slice(1);

	const pathParams = parameters?.filter((p) => p.in === "path") || [];
	const queryParams = parameters?.filter((p) => p.in === "query") || [];
	const hasPathParams = pathParams.length > 0;
	const hasQueryParams = queryParams.length > 0;
	const hasRequestBody = !!requestBody;

	const responseType = `types.${capitalize(fnName)}SuccessResponse`;

	// Generate mutation variables type
	const variableParts = [];
	if (hasPathParams)
		variableParts.push(`path: types.${capitalize(fnName)}PathParams`);
	if (hasQueryParams)
		variableParts.push(`query?: types.${capitalize(fnName)}QueryParams`);
	if (hasRequestBody)
		variableParts.push(`body: types.${capitalize(fnName)}RequestBody`);

	const variablesType =
		variableParts.length > 0 ? `{ ${variableParts.join("; ")} }` : "void";

	const hookBody = `export function use${capitalize(fnName)}Mutation(
  options?: UseMutationOptions<${responseType}, Error, ${variablesType}>
) {
  return useMutation<${responseType}, Error, ${variablesType}>({
    mutationFn: (variables) => {
      return operations.${camelFnName}(variables);
    },
    ...options
  });
}`;

	return hookBody;
}

function capitalize(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1);
}