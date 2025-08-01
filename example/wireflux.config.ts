import { defineConfig } from 'wireflux';

export const config = defineConfig({
  input: './openapi.json', // Path to your OpenAPI schema
  targetFolder: './src/api/operations', // Where to generate the client
  fetchClient: './src/api/fetchClient', // Your fetch client implementation
  apiError: './src/api/api-error', // Your API error class
  baseUrl: 'http://localhost:3000/api',
  supportedMethods: ['get', 'post', 'put', 'delete', 'patch'],
});
