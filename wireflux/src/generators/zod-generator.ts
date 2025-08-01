import type { OpenAPIV3_1 as OpenAPI } from "openapi-types";
import type { GenerationContext } from "../generation-types.js";

export async function generateZodTypes(
	operations: GenerationContext[],
): Promise<string> {
	const imports = new Set<string>(['import { z } from "zod";']);
	const schemaDefinitions = new Set<string>();
	const typeDefinitions = new Set<string>();

	// Extract and generate schemas from all operations
	for (const operation of operations) {
		// Generate parameter schemas
		if (operation.parameters?.length) {
			const pathParams = operation.parameters.filter((p) => p.in === "path");
			const queryParams = operation.parameters.filter((p) => p.in === "query");

			if (pathParams.length > 0) {
				const pathParamsSchema = generatePathParamsSchema(
					operation.fnName,
					pathParams,
				);
				schemaDefinitions.add(pathParamsSchema.schema);
				typeDefinitions.add(pathParamsSchema.type);
			}

			if (queryParams.length > 0) {
				const queryParamsSchema = generateQueryParamsSchema(
					operation.fnName,
					queryParams,
				);
				schemaDefinitions.add(queryParamsSchema.schema);
				typeDefinitions.add(queryParamsSchema.type);
			}
		}

		// Generate request body schemas
		if (operation.requestBody) {
			const requestBodySchema = generateRequestBodySchema(
				operation.fnName,
				operation.requestBody,
			);
			if (requestBodySchema) {
				schemaDefinitions.add(requestBodySchema.schema);
				typeDefinitions.add(requestBodySchema.type);
			}
		}

		// Generate response schemas
		if (operation.responses) {
			const responseSchemas = generateResponseSchemas(
				operation.fnName,
				operation.responses,
			);
			for (const responseSchema of responseSchemas) {
				schemaDefinitions.add(responseSchema.schema);
				typeDefinitions.add(responseSchema.type);
			}
		}
	}

	// Combine imports, schemas, and type definitions
	const importsString = Array.from(imports).join("\n") + "\n\n";
	const schemasString = Array.from(schemaDefinitions).join("\n\n") + "\n\n";
	const typesString = Array.from(typeDefinitions).join("\n");

	return `${importsString}${schemasString}${typesString}\n`;
}

interface SchemaWithType {
	schema: string;
	type: string;
}

function generatePathParamsSchema(
	fnName: string,
	params: OpenAPI.ParameterObject[],
): SchemaWithType {
	const schemaProperties = params
		.map((param) => {
			const zodType = getZodType(param.schema);
			const optional = param.required ? "" : ".optional()";
			return `  ${param.name}: ${zodType}${optional},`;
		})
		.join("\n");

	const schemaName = `${camelCase(fnName)}PathParamsSchema`;
	const typeName = `${capitalize(fnName)}PathParams`;

	const schema = `export const ${schemaName} = z.object({\n${schemaProperties}\n});`;
	const type = `export type ${typeName} = z.infer<typeof ${schemaName}>;`;

	return { schema, type };
}

function generateQueryParamsSchema(
	fnName: string,
	params: OpenAPI.ParameterObject[],
): SchemaWithType {
	const schemaProperties = params
		.map((param) => {
			const zodType = getZodType(param.schema);
			const optional = param.required ? "" : ".optional()";
			return `  ${param.name}: ${zodType}${optional},`;
		})
		.join("\n");

	const schemaName = `${camelCase(fnName)}QueryParamsSchema`;
	const typeName = `${capitalize(fnName)}QueryParams`;

	const schema = `export const ${schemaName} = z.object({\n${schemaProperties}\n});`;
	const type = `export type ${typeName} = z.infer<typeof ${schemaName}>;`;

	return { schema, type };
}

function generateRequestBodySchema(
	fnName: string,
	requestBody: OpenAPI.RequestBodyObject,
): SchemaWithType | null {
	if (!requestBody.content) return null;

	const jsonContent = requestBody.content["application/json"];
	if (!jsonContent?.schema) return null;

	const zodType = getZodType(jsonContent.schema);
	const schemaName = `${camelCase(fnName)}RequestBodySchema`;
	const typeName = `${capitalize(fnName)}RequestBody`;

	const schema = `export const ${schemaName} = ${zodType};`;
	const type = `export type ${typeName} = z.infer<typeof ${schemaName}>;`;

	return { schema, type };
}

function generateResponseSchemas(
	fnName: string,
	responses: OpenAPI.ResponsesObject,
): SchemaWithType[] {
	const responseSchemas: SchemaWithType[] = [];

	for (const [statusCode, response] of Object.entries(responses)) {
		if (
			typeof response === "object" &&
			"content" in response &&
			response.content
		) {
			const jsonContent = response.content["application/json"];
			if (jsonContent?.schema) {
				const zodType = getZodType(jsonContent.schema);
				const statusName =
					statusCode === "200" || statusCode === "201"
						? "Success"
						: `Response${statusCode}`;
				const schemaName = `${camelCase(fnName)}${statusName}ResponseSchema`;
				const typeName = `${capitalize(fnName)}${statusName}Response`;

				const schema = `export const ${schemaName} = ${zodType};`;
				const type = `export type ${typeName} = z.infer<typeof ${schemaName}>;`;

				responseSchemas.push({ schema, type });
			}
		}
	}

	return responseSchemas;
}

function getZodType(schema: unknown): string {
	if (!schema || typeof schema !== "object") return "z.unknown()";

	const schemaObj = schema as Record<string, unknown>;

	switch (schemaObj.type) {
		case "string":
			return "z.string()";
		case "number":
			return "z.number()";
		case "integer":
			return "z.number().int()";
		case "boolean":
			return "z.boolean()";
		case "array": {
			const itemType = getZodType(schemaObj.items);
			return `z.array(${itemType})`;
		}
		case "object": {
			if (schemaObj.properties) {
				const props = Object.entries(
					schemaObj.properties as Record<string, unknown>,
				)
					.map(([key, value]) => {
						const zodType = getZodType(value);
						const optional = (schemaObj.required as string[])?.includes(key)
							? ""
							: ".optional()";
						return `    ${key}: ${zodType}${optional},`;
					})
					.join("\n");
				return `z.object({\n${props}\n  })`;
			}
			return "z.record(z.unknown())";
		}
		default:
			return "z.unknown()";
	}
}

function capitalize(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function camelCase(str: string): string {
	return str.charAt(0).toLowerCase() + str.slice(1);
}
