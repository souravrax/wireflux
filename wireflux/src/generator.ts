import type { OpenAPIV3_1 as OpenAPI } from "openapi-types";
import { DEFAULT_ACCEPT_METHODS } from "./config.js";
import type { GenerationContext } from "./generation-types.js";
import { loadOpenAPISpec } from "./loadOpenAPISpec.js";
import type { WirefluxConfig } from "./types.js";
import { getFunctionName, tryCatch } from "./utils.js";

function extractOperationContext(
	pathUrl: string,
	method: string,
	operation: OpenAPI.OperationObject,
): GenerationContext {
	const operationId = operation.operationId;
	if (!operationId) {
		throw new Error(
			`Operation ID is required for ${method.toUpperCase()} ${pathUrl} - ${
				operation.summary || "Unknown operation"
			}`,
		);
	}
	return {
		operationId,
		fnName: getFunctionName(operationId),
		method: method.toUpperCase(),
		path: pathUrl,
		summary: operation.summary,
		description: operation.description,
		parameters: operation.parameters as OpenAPI.ParameterObject[],
		requestBody: operation.requestBody as OpenAPI.RequestBodyObject,
		responses: operation.responses,
	};
}

export async function generateFromConfig(
	configs: WirefluxConfig,
): Promise<void> {
	for await (const config of configs) {
		if (!config.input) {
			throw new Error("input path is required in config");
		}
		if (!config.output) {
			throw new Error("output path is required in config");
		}
		if (!config.fetchClient) {
			throw new Error("fetchClient path is required in config");
		}

		const spec = await loadOpenAPISpec(config.input);

		const { value: paths } = tryCatch(() => {
			return spec.paths ? Object.entries(spec.paths) : null;
		});
		if (!paths) {
			console.info(`No paths found in spec for ${config.input}. Continuing...`);
			continue;
		}

		const operations: Array<GenerationContext> = [];

		for (const [pathUrl, pathItem] of paths) {
			if (!pathItem) {
				continue;
			}
			for (const method of DEFAULT_ACCEPT_METHODS) {
				const operation = pathItem[
					method as keyof typeof pathItem
				] as OpenAPI.OperationObject;
				if (operation) {
					operations.push(extractOperationContext(pathUrl, method, operation));
				}
			}
		}

		processTypeGeneration(operations, config);
		processFetchClientGeneration(operations, config);
		processExtendedClientsGeneration(operations, config);
	}
}
