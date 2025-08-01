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
	params.push(
		`options?: Omit<UseQueryOptions<types.${capitalize(fnName)}SuccessResponse>, "queryKey" | "queryFn">`,
	);

	const paramSignature = `{ ${params.join(", ")} }`;
	const responseType = `types.${capitalize(fnName)}SuccessResponse`;

	// Generate React Query key
	const keyParts = [];
	keyParts.push(`"${fnName}"`);
	if (hasPathParams) keyParts.push("pathParams");
	if (hasQueryParams) keyParts.push("queryParams");

	const queryKey =
		keyParts.length > 1 ? `[${keyParts.join(", ")}]` : keyParts[0];

	// Generate query function call
	const queryArgs = [];
	if (hasPathParams) queryArgs.push("pathParams");
	if (hasQueryParams) queryArgs.push("queryParams");

	const queryCall =
		queryArgs.length > 0
			? `operations.${fnName}({ ${queryArgs.join(", ")} })`
			: `operations.${fnName}()`;

	const hookBody = `export function use${capitalize(fnName)}Query(${paramSignature}) {
  return useQuery<${responseType}>({
    queryKey: ${queryKey},
    queryFn: () => ${queryCall},
    ...options
  });
}`;

	return hookBody;
}

function generateMutationHook(operation: GenerationContext): string {
	const { fnName, parameters, requestBody } = operation;

	const pathParams = parameters?.filter((p) => p.in === "path") || [];
	const queryParams = parameters?.filter((p) => p.in === "query") || [];
	const hasPathParams = pathParams.length > 0;
	const hasQueryParams = queryParams.length > 0;
	const hasRequestBody = !!requestBody;

	const responseType = `types.${capitalize(fnName)}SuccessResponse`;

	// Generate mutation variables type
	const variableParts = [];
	if (hasPathParams)
		variableParts.push(`pathParams: types.${capitalize(fnName)}PathParams`);
	if (hasQueryParams)
		variableParts.push(`queryParams?: types.${capitalize(fnName)}QueryParams`);
	if (hasRequestBody)
		variableParts.push(`requestBody: types.${capitalize(fnName)}RequestBody`);

	const variablesType =
		variableParts.length > 0 ? `{ ${variableParts.join("; ")} }` : "void";

	const hookBody = `export function use${capitalize(fnName)}Mutation(
  options?: UseMutationOptions<${responseType}, Error, ${variablesType}>
) {
  return useMutation<${responseType}, Error, ${variablesType}>({
    mutationFn: (variables) => {
      const args = ${variableParts.length > 0 ? "variables" : "{}"};
      return operations.${fnName}(args);
    },
    ...options
  });
}`;

	return hookBody;
}

function capitalize(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1);
}
