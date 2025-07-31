import { OpenAPIV3_1 as OpenAPI } from "openapi-types";

export interface GenerationContext {
  operationId: string;
  fnName: string;
  method: string;
  path: string;
  summary?: string;
  description?: string;
  parameters?: OpenAPI.ParameterObject[];
  requestBody?: OpenAPI.RequestBodyObject;
  responses?: OpenAPI.ResponsesObject;
}

export interface SchemaGenerationOptions {
  isRequired?: boolean;
  context?: string;
}

export interface FileTemplate {
  operationId: string;
  imports: string;
  schemas: string;
  types: string;
  fetchClient: string;
}

export interface FetchClientParams {
  hasPathParams: boolean;
  hasQueryParams: boolean;
  hasRequestBody: boolean;
  successResponseType: string;
}
