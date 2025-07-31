import { OpenAPIV3_1 as OpenAPI } from "openapi-types";

// Schema generation functions
export function generateZodSchema(schema: OpenAPI.SchemaObject): string {
  if (schema.enum) {
    return `z.enum([${schema.enum.map((v) => `"${v}"`).join(", ")}])`;
  }

  switch (schema.type) {
    case "string":
      return "z.string()";
    case "number":
    case "integer":
      return "z.number()";
    case "boolean":
      return "z.boolean()";
    case "array":
      if (!schema.items) return "z.array(z.any())";
      return `z.array(${generateZodSchema(
        schema.items as OpenAPI.SchemaObject
      )})`;
    case "object": {
      const props = schema.properties ?? {};
      const required = schema.required ?? [];

      const shape = Object.entries(props)
        .map(([key, propSchema]) => {
          const isRequired = required.includes(key);
          const zodSchema = generateZodSchema(
            propSchema as OpenAPI.SchemaObject
          );
          const finalSchema = isRequired
            ? zodSchema
            : `${zodSchema}.optional()`;
          return `  ${key}: ${finalSchema}`;
        })
        .join(",\n");

      return `z.object({\n${shape}\n})`;
    }
    default:
      return "z.any()";
  }
}

export function generateParameterSchema(
  parameters: OpenAPI.ParameterObject[],
  paramType: "path" | "query"
): { schema: string; type: string } | null {
  const filteredParams = parameters.filter((param) => param.in === paramType);

  if (filteredParams.length === 0) return null;

  const props = filteredParams
    .map((param) => {
      const schema = param.schema as OpenAPI.SchemaObject;
      const zodSchema = generateZodSchema(schema);
      const finalSchema = param.required
        ? zodSchema
        : `${zodSchema}.optional()`;
      return `  ${param.name}: ${finalSchema}`;
    })
    .join(",\n");

  return {
    schema: `z.object({\n${props}\n})`,
    type: paramType,
  };
}

export function generateRequestBodySchema(
  requestBody: OpenAPI.RequestBodyObject
): string | null {
  const jsonContent = requestBody.content["application/json"];
  if (!jsonContent?.schema) return null;

  return generateZodSchema(jsonContent.schema as OpenAPI.SchemaObject);
}

export function generateResponseSchema(responses: OpenAPI.ResponsesObject): {
  successSchemas: Array<{ statusCode: string; schema: string }>;
  errorSchema: string | null;
} {
  const successSchemas: Array<{ statusCode: string; schema: string }> = [];
  let errorSchema: string | null = null;

  for (const [statusCode, response] of Object.entries(responses)) {
    const responseObj = response as OpenAPI.ResponseObject;
    if (responseObj.content?.["application/json"]?.schema) {
      const schema = responseObj.content["application/json"]
        .schema as OpenAPI.SchemaObject;
      const zodSchema = generateZodSchema(schema);

      // Check if it's a success response (2xx) or error response (4xx, 5xx)
      const code = parseInt(statusCode);
      if (code >= 200 && code < 300) {
        successSchemas.push({
          statusCode,
          schema: zodSchema,
        });
      } else if (code >= 400 && code < 600 && !errorSchema) {
        // Use the first error response schema as the base error schema
        errorSchema = zodSchema;
      }
    }
  }

  return { successSchemas, errorSchema };
}
