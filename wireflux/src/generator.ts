import type { OpenAPIV3_1 as OpenAPI } from "openapi-types";
import { DEFAULT_ACCEPT_METHODS } from "./config.js";
import { writeFile } from "./file-utils.js";
import type { GenerationContext } from "./generation-types.js";
import { generateOperations } from "./generators/operations-generator.js";
import { generateReactQueryHooks } from "./generators/react-query-generator.js";
import { generateSwrHooks } from "./generators/swr-generator.js";
import { generateTypescriptTypes } from "./generators/typescript-generator.js";
import { generateZodTypes } from "./generators/zod-generator.js";
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
			console.log(pathUrl);
			for (const method of DEFAULT_ACCEPT_METHODS) {
				const operation = pathItem[
					method as keyof typeof pathItem
				] as OpenAPI.OperationObject;
				if (operation) {
					operations.push(extractOperationContext(pathUrl, method, operation));
				}
			}
		}

		await processTypeGeneration(operations, config);
		await processFetchClientGeneration(operations, config);
		await processExtendedClientsGeneration(operations, config);
	}
}

async function processTypeGeneration(
	operations: GenerationContext[],
	config: WirefluxConfig[0],
): Promise<void> {
	// Generate types.ts based on config.types (typescript, zod, etc.)
	let typeContent: string;

	switch (config.types) {
		case "zod":
			typeContent = await generateZodTypes(operations);
			break;
		case "typescript":
			typeContent = await generateTypescriptTypes(operations);
			break;
		default:
			typeContent = await generateTypescriptTypes(operations);
			break;
	}

	await writeFile(`${config.output}/types.ts`, typeContent);
}

async function processFetchClientGeneration(
	operations: GenerationContext[],
	config: WirefluxConfig[0],
): Promise<void> {
	// Generate operations.ts that leverages types.ts
	const operationsContent = await generateOperations(operations, config);

	await writeFile(`${config.output}/operations.ts`, operationsContent);
}

async function processExtendedClientsGeneration(
	operations: GenerationContext[],
	config: WirefluxConfig[0],
): Promise<void> {
	// Generate extended client files (swr.ts, react-query.ts) if specified
	if (!config.extendedClients?.length) {
		return;
	}

	for (const clientType of config.extendedClients) {
		switch (clientType) {
			case "swr": {
				const swrContent = await generateSwrHooks(operations);
				await writeFile(`${config.output}/swr.ts`, swrContent);
				break;
			}
			case "react-query": {
				const reactQueryContent = await generateReactQueryHooks(operations);
				await writeFile(`${config.output}/react-query.ts`, reactQueryContent);
				break;
			}
		}
	}
}
