---
outline: deep
---

# Configuration

Wireflux can be configured using a `wireflux.config.ts` or `wireflux.config.js` file in your project root. This file should export a configuration object using the `defineConfig` function.

## `defineConfig`

This function provides type-safety and autocompletion for your configuration.

```typescript
// wireflux.config.ts
import { defineConfig } from "wireflux";

export default defineConfig({
  // Your configuration options here
});
```

For JavaScript projects:

```javascript
// wireflux.config.js
const { defineConfig } = require("wireflux");

module.exports = defineConfig({
  // Your configuration options here
});
```

## Configuration Options

### `input`

- **Type:** `string`
- **Required:** `true`

Path or URL to your OpenAPI schema file (e.g., `openapi.json`).

### `targetFolder`

- **Type:** `string`
- **Required:** `true`

Directory where the generated client files will be saved.

### `fetchClient`

- **Type:** `string`
- **Required:** `true`

Path to your custom fetch client implementation. This module should export a function that matches the expected signature:

```typescript
export async function fetchClient<T>(
  url: string,
  init?: RequestInit
): Promise<Result<T, YourApiError>>;
```

The function must return a `Result<T, E>` type where:

- Success: `{ data: T, error: null }`
- Error: `{ data: null, error: E }`

### `apiError`

- **Type:** `string`
- **Required:** `true`

Path to your custom API error class. This class will be used to type the `error` property in the `Result` object. The class should extend the built-in `Error` class:

```typescript
export class ApiError extends Error {
  constructor(error: any) {
    super(error.message);
    // Custom error properties
  }
}
```

### `supportedMethods`

- **Type:** `string[]`
- **Default:** `['get', 'post', 'put', 'delete', 'patch', 'options', 'head']`

An array of HTTP methods to generate clients for.

### `baseUrl`

- **Type:** `string`
- **Optional**

A base URL for the API. If provided, it will be prepended to the endpoint paths.

### `includeTypes`

- **Type:** `boolean`
- **Default:** `true`

Whether to include TypeScript types in the generated client.

## Example Configurations

### TypeScript Configuration

```typescript
// wireflux.config.ts
import { defineConfig } from "wireflux";

export default defineConfig({
  input: "./openapi.json",
  targetFolder: "./src/api",
  fetchClient: "./lib/fetch-client",
  apiError: "./lib/api-error",
  baseUrl: "http://localhost:3000/api",
  supportedMethods: ["get", "post", "put", "delete", "patch"],
  includeTypes: true,
});
```

### JavaScript Configuration

```javascript
// wireflux.config.js
const { defineConfig } = require("wireflux");

module.exports = defineConfig({
  input: "./openapi.json",
  targetFolder: "./src/api",
  fetchClient: "./lib/fetch-client",
  apiError: "./lib/api-error",
  baseUrl: "http://localhost:3000/api",
  supportedMethods: ["get", "post", "put", "delete", "patch"],
  includeTypes: true,
});
```

## Result Type

Wireflux uses a Result pattern for error handling. All generated functions return a `Result<T, E>` type:

```typescript
type Result<V, E = any> =
  | { data: V; error: null } // Success case
  | { data: null; error: E }; // Error case
```

This pattern ensures that errors are handled explicitly and prevents uncaught exceptions.
