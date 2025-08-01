import type { OpenAPIV3_1 as OpenAPI } from "openapi-types";
import { DEFAULT_CONTENT_TYPES } from "../config.js";
import type { GenerationContext } from "../generation-types.js";

export async function generateTypescriptTypes(
	operations: GenerationContext[],
): Promise<string> {
	const imports = new Set<string>();
	const typeDefinitions = new Set<string>();

	// Extract and generate types from all operations
	for (const operation of operations) {
		// Generate parameter types
		if (operation.parameters?.length) {
			const pathParams = operation.parameters.filter((p) => p.in === "path");
			const queryParams = operation.parameters.filter((p) => p.in === "query");

			if (pathParams.length > 0) {
				const pathParamsType = generatePathParamsType(
					operation.fnName,
					pathParams,
				);
				typeDefinitions.add(pathParamsType);
			}

			if (queryParams.length > 0) {
				const queryParamsType = generateQueryParamsType(
					operation.fnName,
					queryParams,
				);
				typeDefinitions.add(queryParamsType);
			}
		}

		// Generate request body types
		if (operation.requestBody) {
			const requestBodyType = generateRequestBodyType(
				operation.fnName,
				operation.requestBody,
			);
			if (requestBodyType) {
				typeDefinitions.add(requestBodyType);
			}
		}

		// Generate response types
		if (operation.responses) {
			const responseTypes = generateResponseTypes(
				operation.fnName,
				operation.responses,
			);
			typeDefinitions.add(responseTypes);
		}
	}

	// Combine imports and type definitions
	const importsString =
		imports.size > 0 ? Array.from(imports).join("\n") + "\n\n" : "";
	const typesString = Array.from(typeDefinitions).join("\n\n");

	return `${importsString}${typesString}\n`;
}

function generatePathParamsType(
	fnName: string,
	params: OpenAPI.ParameterObject[],
): string {
	const paramTypes = params
		.map((param) => {
			const required = param.required ? "" : "?";
			const type = getTypeScriptType(param.schema);
			return `  ${param.name}${required}: ${type};`;
		})
		.join("\n");

	return `export interface ${capitalize(fnName)}PathParams {\n${paramTypes}\n}`;
}

function generateQueryParamsType(
	fnName: string,
	params: OpenAPI.ParameterObject[],
): string {
	const paramTypes = params
		.map((param) => {
			const required = param.required ? "" : "?";
			const type = getTypeScriptType(param.schema);
			return `  ${param.name}${required}: ${type};`;
		})
		.join("\n");

	return `export interface ${capitalize(fnName)}QueryParams {\n${paramTypes}\n}`;
}

function generateRequestBodyType(
	fnName: string,
	requestBody: OpenAPI.RequestBodyObject,
): string | null {
	if (!requestBody.content) return null;

	const jsonContent = getJsonContent(requestBody.content);
	if (!jsonContent?.schema) return null;

	const type = getTypeScriptType(jsonContent.schema);
	return `export type ${capitalize(fnName)}RequestBody = ${type};`;
}

function generateResponseTypes(
	fnName: string,
	responses: OpenAPI.ResponsesObject,
): string {
	const responseTypes: string[] = [];

	for (const [statusCode, response] of Object.entries(responses)) {
		const code: number = parseInt(statusCode);
		if (code > 300) {
			continue;
		}
		if (
			typeof response === "object" &&
			"content" in response &&
			response.content
		) {
			const jsonContent = getJsonContent(response.content);
			if (jsonContent?.schema) {
				const type = getTypeScriptType(jsonContent.schema);
				responseTypes.push(
					`export type ${capitalize(fnName)}${code}Response = ${type};`,
				);
			}
		} else {
			responseTypes.push(
				`export type ${capitalize(fnName)}${code}Response = unknown;`,
			);
		}
	}

	return responseTypes.join("\n");
}

function getTypeScriptType(schema: unknown): string {
	if (!schema || typeof schema !== "object") return "unknown";

	const schemaObj = schema as Record<string, unknown>;

	if ("allOf" in schemaObj) {
		const allOf = schemaObj.allOf as unknown[];
		const types = allOf.map((item) => getTypeScriptType(item));
		return `${types.join(" & ")}`;
	}

	if ("oneOf" in schemaObj) {
		const oneOf = schemaObj.oneOf as unknown[];
		const types = oneOf.map((item) => getTypeScriptType(item));
		return `${types.join(" | ")}`;
	}

	switch (schemaObj.type) {
		case "string":
			return "string";
		case "number":
		case "integer":
			return "number";
		case "boolean":
			return "boolean";
		case "array": {
			const itemType = getTypeScriptType(schemaObj.items);
			return `${itemType}[]`;
		}
		case "object": {
			if (schemaObj.properties) {
				const props = Object.entries(
					schemaObj.properties as Record<string, unknown>,
				)
					.map(([key, value]) => {
						const required = (schemaObj.required as string[])?.includes(key)
							? ""
							: "?";
						const type = getTypeScriptType(value);
						return `  ${key}${required}: ${type};`;
					})
					.join("\n");
				return `{\n${props}\n}`;
			}
			return "Record<string, unknown>";
		}
		default:
			return "unknown";
	}
}

function capitalize(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function getJsonContent(
	content: Record<string, OpenAPI.MediaTypeObject>,
): OpenAPI.MediaTypeObject | undefined {
	return Object.entries(content).find(([contentType]) =>
		DEFAULT_CONTENT_TYPES.includes(contentType),
	)?.[1] as OpenAPI.MediaTypeObject | undefined;
}
