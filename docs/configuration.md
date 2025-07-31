---
outline: deep
---

# Configuration

Wireflux can be configured using a `wireflux.config.js` or `wireflux.config.ts` file in your project root. This file should export a configuration object using the `defineConfig` function.

## `defineConfig`

This function provides type-safety and autocompletion for your configuration.

```javascript
// wireflux.config.js
import { defineConfig } from 'wireflux';

export default defineConfig({
  // Your configuration options here
});
```

## Configuration Options

### `input`

-   **Type:** `string`
-   **Required:** `true`

Path or URL to your OpenAPI schema file (e.g., `openapi.json`).

### `targetFolder`

-   **Type:** `string`
-   **Required:** `true`

Directory where the generated client files will be saved.

### `fetchClient`

-   **Type:** `string`
-   **Required:** `true`

Path to your custom fetch client implementation. This module should export a function that matches the expected signature.

### `apiError`

-   **Type:** `string`
-   **Required:** `true`

Path to your custom API error class. This class will be used to type the `error` property in the `Result` object.

### `supportedMethods`

-   **Type:** `string[]`
-   **Default:** `['get', 'post', 'put', 'delete', 'patch', 'options', 'head']`

An array of HTTP methods to generate clients for.

### `baseUrl`

-   **Type:** `string`
-   **Optional**

A base URL for the API. If provided, it will be prepended to the endpoint paths.

### `includeTypes`

-   **Type:** `boolean`
-   **Default:** `true`

Whether to include TypeScript types in the generated client.

## Example Configuration

```javascript
// wireflux.config.js
import { defineConfig } from 'wireflux';

export default defineConfig({
  input: './openapi.json',
  targetFolder: './generated',
  fetchClient: './super-fetch',
  apiError: './api-error',
  baseUrl: 'http://localhost:3000/api',
  supportedMethods: ['get', 'post', 'put', 'delete', 'patch'],
});
```