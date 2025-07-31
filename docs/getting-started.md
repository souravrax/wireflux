---
outline: deep
---

# Getting Started

This guide will walk you through the process of installing and using the Wireflux CLI to generate a type-safe fetch client for your API.

## Installation

You can install the Wireflux CLI globally using npm or use it directly with `npx`.

```bash
# Install globally
npm install -g wireflux

# Or install locally in your project
npm install wireflux

# Use with npx (no installation required)
npx wireflux [command] [options]
```

## Initializing a Project

The easiest way to start a new project is to use the `init` command. This will create a `wireflux.config.ts` file in your project root.

```bash
# Create a TypeScript config file (default)
npx wireflux init

# Or create a JavaScript config file
npx wireflux init --js
```

This configuration file is where you will define the settings for your generated client.

## Configuring the Client

Next, you'll need to edit the `wireflux.config.ts` file to specify the location of your OpenAPI schema, the output directory for the generated client, and your custom fetch client and API error implementations.

```typescript
// wireflux.config.ts
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

For more information on the available configuration options, see the [Configuration](./configuration.md) documentation.

## Implementing Required Dependencies

Before generating the client, you need to implement the required dependencies:

### 1. Fetch Client Implementation

Create your fetch client that returns a `Result<T, E>` type:

```typescript
// lib/fetch-client.ts
import type { Result } from "wireflux";
import { ApiError } from "./api-error";

export async function fetchClient<T>(
  url: string,
  init?: RequestInit
): Promise<Result<T, ApiError>> {
  try {
    const response = await fetch(url, {
      ...init,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...init?.headers,
      },
    });

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
        code: "INTERNAL_SERVER_ERROR",
        message: "Network error",
        timestamp: new Date().toISOString(),
        path: url,
      }),
    };
  }
}
```

### 2. API Error Class

Create your API error class:

```typescript
// lib/api-error.ts
export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly timestamp: string;
  readonly path?: string;

  constructor(error: {
    status: number;
    code: string;
    message: string;
    timestamp: string;
    path?: string;
  }) {
    super(error.message);
    this.name = "ApiError";
    this.status = error.status;
    this.code = error.code;
    this.timestamp = error.timestamp;
    this.path = error.path;
  }

  isClientError(): boolean {
    return this.status >= 400 && this.status < 500;
  }

  isServerError(): boolean {
    return this.status >= 500;
  }
}
```

## Generating the Client

Once you have configured your project, you can generate the client using the `generate` command.

```bash
npx wireflux generate
```

This will create a new directory (e.g., `./src/api`) containing the generated client files based on your configuration.

## Using the Generated Client

After generating the client, you can import and use the functions in your application. Each endpoint in your OpenAPI specification will have a corresponding function that returns a `Result<T, E>` type.

```typescript
import { getUsers, createUser } from "./src/api";
import type { ApiError } from "./lib/api-error";

async function main() {
  // Fetch all users - using the Result pattern
  const { data: users, error: getUsersError } = await getUsers();

  if (getUsersError) {
    console.error("Error fetching users:", getUsersError.message);
    if (getUsersError.isClientError()) {
      console.log("This is a client error (4xx)");
    }
    return;
  }

  console.log("Fetched users:", users);

  // Create a new user with request body
  const { data: newUser, error: createUserError } = await createUser({
    body: { name: "John Doe", email: "john.doe@example.com" },
  });

  if (createUserError) {
    console.error("Error creating user:", createUserError.message);
    return;
  }

  console.log("Created new user:", newUser);
}

main();
```

The Result pattern ensures that you handle errors explicitly, preventing uncaught exceptions and improving code reliability.
