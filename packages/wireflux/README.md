# Wireflux

A CLI tool to generate type-safe fetch clients from OpenAPI schemas with the Result pattern.

## Features

- 🚀 **CLI-based**: Simple command-line interface
- 📝 **TypeScript Support**: Full TypeScript support with generated types
- 🔒 **Type Safety**: Zod schemas for runtime validation
- 🎯 **Result Pattern**: User-provided fetch client must return `Result<T, E>`
- 🔧 **Configurable**: Use `wireflux.config.ts` for configuration
- 📦 **User Dependencies**: You provide your own fetchClient and ApiError implementations

## Installation

```bash
npm install wireflux
# or
pnpm add wireflux
# or
yarn add wireflux
```

## Quick Start

1. **Initialize a config file:**

```bash
npx wireflux init
```

2. **Edit `wireflux.config.ts`:**

```typescript
import { defineConfig } from "wireflux";

export default defineConfig({
  input: "./openapi.json", // Path to your OpenAPI schema
  targetFolder: "./src/api", // Where to generate the client
  fetchClient: "./lib/fetch-client", // Your fetch client implementation
  apiError: "./lib/api-error", // Your API error class
  baseUrl: "http://localhost:3000/api",
  supportedMethods: ["get", "post", "put", "delete", "patch"],
});
```

3. **Implement your fetch client** (must return `Result<T, E>`):

```typescript
// lib/fetch-client.ts
import { Result } from "wireflux";
import { ApiError } from "./api-error";

export async function fetchClient<T>(
  url: string,
  init?: RequestInit
): Promise<Result<T, ApiError>> {
  try {
    const response = await fetch(url, init);
    if (!response.ok) {
      const errorData = await response.json();
      return {
        data: null,
        error: new ApiError(errorData),
      };
    }
    return {
      data: await response.json(),
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: new ApiError({
        status: 500,
        message: "Network error",
        // ... other error properties
      }),
    };
  }
}
```

4. **Implement your API error class:**

```typescript
// lib/api-error.ts
export class ApiError extends Error {
  public readonly status: number;
  public readonly code: string;

  constructor(error: { status: number; code: string; message: string }) {
    super(error.message);
    this.status = error.status;
    this.code = error.code;
  }
}
```

5. **Generate the client:**

```bash
npx wireflux generate
```

## Generated Code

The tool generates type-safe functions for each operation:

```typescript
// Generated from your OpenAPI schema
export async function getUsers(
  params: { throwOnError?: boolean; fetchConfig?: RequestInit } = {}
): Promise<Result<User[]>> {
  // Implementation with your fetchClient
}

export async function createUser(params: {
  body: CreateUserRequest;
  throwOnError?: boolean;
  fetchConfig?: RequestInit;
}): Promise<Result<User>> {
  // Implementation with your fetchClient
}
```

## Config Options

| Option             | Type       | Required | Description                                         |
| ------------------ | ---------- | -------- | --------------------------------------------------- |
| `input`            | `string`   | ✅       | Path to OpenAPI schema file or URL                  |
| `targetFolder`     | `string`   | ✅       | Directory where files will be generated             |
| `fetchClient`      | `string`   | ✅       | Path to your fetch client implementation            |
| `apiError`         | `string`   | ✅       | Path to your API error class                        |
| `supportedMethods` | `string[]` | ❌       | HTTP methods to generate (default: all)             |
| `baseUrl`          | `string`   | ❌       | Base URL for the API                                |
| `includeTypes`     | `boolean`  | ❌       | Whether to include TypeScript types (default: true) |

## CLI Commands

- `wireflux init` - Create a new wireflux.config.ts file
- `wireflux generate` - Generate fetch client from config
- `wireflux generate -c <config-path>` - Use custom config file path

## Requirements

Your fetch client **must**:

- Return a `Result<T, E>` type where:
  - Success: `{ data: T, error: null }`
  - Error: `{ data: null, error: E }`
- Accept `(url: string, init?: RequestInit)` parameters
- Handle all HTTP errors and return them in the Result pattern

## Examples

Check the `/examples` directory for complete implementation examples.

## License

ISC
