import fs from 'node:fs';
import path from 'node:path';
import type { OpenAPIV3_1 as OpenAPI } from 'openapi-types';
import { DEFAULT_ACCEPT_METHODS } from './config.js';
import {
  ensureDirectoryExists,
  writeIndexFile,
  writeOperationFile,
} from './file-utils.js';
import type { GenerationContext } from './generation-types.js';
import {
  createFileContent,
  generateFileTemplate,
} from './template-generator.js';
import type { WirefluxConfig } from './types.js';
import { getFunctionName } from './utils.js';

async function loadOpenAPISpec(input: string): Promise<OpenAPI.Document> {
  try {
    if (input.startsWith('http://') || input.startsWith('https://')) {
      const response = await fetch(input);
      if (!response.ok) {
        throw new Error(`Failed to fetch OpenAPI spec: ${response.statusText}`);
      }
      return (await response.json()) as OpenAPI.Document;
    }
    const filePath = path.resolve(input);
    if (!fs.existsSync(filePath)) {
      throw new Error(`OpenAPI spec file not found: ${filePath}`);
    }
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent) as OpenAPI.Document;
  } catch (error) {
    throw new Error(`Error loading OpenAPI spec from ${input}: ${error}`);
  }
}

function extractOperationContext(
  pathUrl: string,
  method: string,
  operation: OpenAPI.OperationObject
): GenerationContext {
  const operationId = operation.operationId;
  if (!operationId) {
    throw new Error(
      `Operation ID is required for ${method.toUpperCase()} ${pathUrl} - ${
        operation.summary || 'Unknown operation'
      }`
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

async function generateOperationFiles(
  spec: OpenAPI.Document,
  config: WirefluxConfig
): Promise<string[]> {
  const operationIds: string[] = [];
  const supportedMethods = DEFAULT_ACCEPT_METHODS;
  const promises: Promise<void>[] = [];
  if (!spec.paths) {
    throw new Error('No paths found in OpenAPI specification');
  }
  for (const [pathUrl, pathItem] of Object.entries(spec.paths)) {
    if (!pathItem) {
      continue;
    }
    for (const method of supportedMethods) {
      const operation = pathItem[
        method as keyof typeof pathItem
      ] as OpenAPI.OperationObject;
      if (
        !operation ||
        typeof operation !== 'object' ||
        Array.isArray(operation)
      ) {
        continue;
      }
      const context = extractOperationContext(pathUrl, method, operation);
      const template = generateFileTemplate(context, config);
      const content = createFileContent(template);
      promises.push(
        writeOperationFile(context.operationId, content, config)
      );
      operationIds.push(context.operationId);
    }
  }
  await Promise.all(promises);
  return operationIds;
}

export async function generateFromConfig(
  config: WirefluxConfig
): Promise<void> {
  if (!config.fetchClient) {
    throw new Error('fetchClient path is required in config');
  }
  if (!config.apiError) {
    throw new Error('apiError path is required in config');
  }
  const spec = await loadOpenAPISpec(config.input);
  await ensureDirectoryExists(config.targetFolder);
  const operationIds = await generateOperationFiles(spec, config);
  await writeIndexFile(operationIds, config.targetFolder);
}
