---
outline: deep
---

# API Reference

This page documents the Wireflux API and the types exported by the package.

## Core Types

### `Result<V, E>`

The Result type is used for error handling throughout Wireflux. It represents either a successful operation with data or a failed operation with an error.

```typescript
type Result<V, E = any> =
  | { data: V; error: null } // Success case
  | { data: null; error: E }; // Error case
```

**Type Parameters:**

- `V` - The type of the data on success
- `E` - The type of the error on failure (defaults to `any`)

**Usage:**

```typescript
const { data, error } = await someApiCall();
if (error) {
  // Handle error
  console.error(error.message);
  return;
}
// Use data safely
console.log(data);
```

## Configuration

### `WirefluxConfig`

The main configuration interface for Wireflux.

```typescript
interface WirefluxConfig {
  /** Input OpenAPI schema file path or URL */
  input: string;

  /** Target folder where generated files will be placed */
  targetFolder: string;

  /** Path to the user's fetch client (must return Result<T, E>) */
  fetchClient: string;

  /** Path to the user's API Error class */
  apiError: string;

  /** Supported HTTP methods (optional, defaults to all) */
  supportedMethods?: readonly string[];

  /** Additional configuration options */
  baseUrl?: string;
  includeTypes?: boolean;
}
```

### `defineConfig(config: WirefluxConfig): WirefluxConfig`

A helper function that provides type safety and autocompletion for your configuration.

```typescript
import { defineConfig } from "wireflux";

export default defineConfig({
  input: "./openapi.json",
  targetFolder: "./src/api",
  fetchClient: "./lib/fetch-client",
  apiError: "./lib/api-error",
});
```

## User-Defined Interfaces

### `UserFetchClient`

Your fetch client must match this signature:

```typescript
type UserFetchClient = <T>(
  url: string,
  init?: RequestInit
) => Promise<Result<T, any>>;
```

**Requirements:**

- Must accept `url` (string) and optional `init` (RequestInit)
- Must return a Promise that resolves to a Result type
- Must handle all HTTP errors and return them in the Result pattern
- Should not throw exceptions for HTTP errors

**Example Implementation:**

```typescript
export async function fetchClient<T>(
  url: string,
  init?: RequestInit
): Promise<Result<T, ApiError>> {
  try {
    const response = await fetch(url, init);
    if (!response.ok) {
      const errorData = await response.json();
      return { data: null, error: new ApiError(errorData) };
    }
    return { data: await response.json(), error: null };
  } catch (error) {
    return {
      data: null,
      error: new ApiError({
        status: 500,
        message: "Network error",
      }),
    };
  }
}
```

### `UserApiError`

Your API error class interface:

```typescript
interface UserApiError {
  new (error: any): Error;
}
```

**Requirements:**

- Must extend the built-in Error class
- Constructor should accept error data and set appropriate properties
- Recommended to include status codes, error codes, and helpful methods

**Example Implementation:**

```typescript
export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly timestamp: string;

  constructor(error: {
    status: number;
    code: string;
    message: string;
    timestamp: string;
  }) {
    super(error.message);
    this.name = "ApiError";
    this.status = error.status;
    this.code = error.code;
    this.timestamp = error.timestamp;
  }

  isClientError(): boolean {
    return this.status >= 400 && this.status < 500;
  }

  isServerError(): boolean {
    return this.status >= 500;
  }
}
```

## Generated Function Signature

All generated API functions follow this pattern:

```typescript
function apiOperation(params: {
  // Path parameters (if any)
  pathParam?: string;

  // Query parameters (if any)
  query?: {
    param1?: string;
    param2?: number;
  };

  // Request body (if applicable)
  body?: RequestBodyType;

  // Additional options
  throwOnError?: boolean;
  fetchConfig?: RequestInit;
}): Promise<Result<ResponseType, YourApiError>>;
```

**Parameters:**

- Path parameters are included directly in the params object
- Query parameters are grouped under the `query` property
- Request body is provided via the `body` property
- `throwOnError` - If true, throws the error instead of returning it in Result
- `fetchConfig` - Additional RequestInit options passed to your fetch client

**Example:**

```typescript
// GET /users/{id}?include=profile
const { data: user, error } = await getUser({
  id: "123", // path parameter
  query: { include: "profile" }, // query parameters
});

// POST /users with body
const { data: newUser, error } = await createUser({
  body: { name: "John", email: "john@example.com" },
});
```

## Default Configuration

```typescript
const DEFAULT_CONFIG: Partial<WirefluxConfig> = {
  supportedMethods: [
    "get",
    "post",
    "put",
    "delete",
    "patch",
    "options",
    "head",
  ] as const,
  includeTypes: true,
};
```
