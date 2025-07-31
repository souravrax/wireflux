import type { GenerationContext } from './generation-types';
import type { WirefluxConfig } from './types';
import { getClientFunctionName } from './utils';

// Fetch client generation functions
export function generateFetchClient(
  context: GenerationContext,
  _config: WirefluxConfig
): string {
  const {
    operationId,
    fnName,
    method,
    path,
    summary,
    description,
    parameters,
    requestBody,
    responses,
  } = context;
  const clientFnName = getClientFunctionName(operationId);

  // Determine what parameters this operation needs
  const pathParams = parameters?.filter((p) => p.in === 'path') || [];
  const queryParams = parameters?.filter((p) => p.in === 'query') || [];
  const hasPathParams = pathParams.length > 0;
  const hasQueryParams = queryParams.length > 0;
  const hasRequestBody = !!requestBody;

  // Find the success response type (200, 201, etc.)
  let successResponseType = 'unknown';
  if (responses) {
    const successCodes = ['200', '201', '202', '204'];
    const successCode = successCodes.find((code) => responses[code]);
    if (successCode) {
      successResponseType = `${fnName}Response${successCode}`;
    }
  }

  // Generate parameter interface
  const paramTypes: string[] = [];
  if (hasPathParams) {
    paramTypes.push(`path: ${fnName}RequestPath`);
  }
  if (hasQueryParams) {
    paramTypes.push(`query?: ${fnName}RequestQuery`);
  }
  if (hasRequestBody) {
    paramTypes.push(`body: ${fnName}RequestBody`);
  }
  paramTypes.push('throwOnError?: boolean');
  paramTypes.push('fetchConfig?: RequestInit');

  const paramsInterface =
    paramTypes.length > 2 // More than just throwOnError and fetchConfig
      ? `{\n  ${paramTypes.join(',\n  ')}\n}`
      : '{ throwOnError?: boolean; fetchConfig?: RequestInit }';

  // Generate URL construction
  let urlConstruction = `const url = \`${path}\``;
  if (hasPathParams) {
    // Replace path parameters in the URL template
    let urlTemplate = path;
    for (const param of pathParams) {
      urlTemplate = urlTemplate.replace(
        `{${param.name}}`,
        `\${path.${param.name}}`
      );
    }
    urlConstruction = `const url = \`${urlTemplate}\``;
  }

  // Generate query parameters handling
  let queryHandling = '';
  if (hasQueryParams) {
    queryHandling = `
  // Handle query parameters
  const searchParams = new URLSearchParams();
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
  }
  const queryString = searchParams.toString();
  const finalUrl = queryString ? \`\${url}?\${queryString}\` : url;`;
  } else {
    queryHandling = '\n  const finalUrl = url;';
  }

  // Generate fetch options
  let fetchOptions = `
  const options: RequestInit = {
    method: "${method}",
    headers: {
      "Content-Type": "application/json",
      ...fetchConfig?.headers,
    },
    ...fetchConfig,`;

  if (hasRequestBody) {
    fetchOptions += `
    body: JSON.stringify(body),`;
  }

  fetchOptions += `
  };`;

  // Generate the complete function
  const paramDeclaration =
    paramTypes.length > 2 // More than just throwOnError and fetchConfig
      ? `params: ${paramsInterface}`
      : 'params: { throwOnError?: boolean; fetchConfig?: RequestInit } = {}';

  const paramExtraction =
    paramTypes.length > 2 // More than just throwOnError and fetchConfig
      ? `
  const { ${hasPathParams ? 'path, ' : ''}${hasQueryParams ? 'query, ' : ''}${
    hasRequestBody ? 'body, ' : ''
  }throwOnError, fetchConfig } = params;`
      : `
  const { throwOnError, fetchConfig } = params;`;

  // Generate return type using the generic Result type
  const returnType = `Promise<Result<${successResponseType}>>`;

  // Generate TSDoc comment
  const tsdocLines = [
    summary ? ` * ${summary}` : ` * ${method} ${path}`,
    description && ' * ',
    description && ` * ${description}`,
    ' * ',
    ' * @param params - Request parameters',
    ' * @param params.throwOnError - If true, throws ApiError instead of returning it as value',
    ` * @returns Promise<Result<${successResponseType}>> - Result with data or error`,
  ].filter(Boolean);

  const tsdocComment = `/**\n${tsdocLines.join('\n')}\n */`;

  return `
${tsdocComment}
export async function ${clientFnName}(${paramDeclaration}): ${returnType} {${paramExtraction}
  
  ${urlConstruction}${queryHandling}
  ${fetchOptions}
  
  const result = await fetchClient<${successResponseType}>(finalUrl, options);
  
  if (result.error) {
    if (throwOnError) {
      throw result.error;
    }
    return {
      data: null,
      error: result.error,
    };
  }
  
  return {
    data: result.data,
    error: null,
  };
}`;
}
