---
outline: deep
---

# Wireflux CLI

The Wireflux CLI is a powerful tool for generating a fetch client from an OpenAPI specification. It provides a simple and efficient way to create a fully typed client for your API, making it easy to interact with your backend services.

## Installation

To get started, install the Wireflux CLI globally using npm or use it directly with `npx`.

```bash
# Install globally
npm install -g wireflux

# Or use with npx
npx wireflux [command] [options]
```

## `generate` Command

The core of the CLI is the `generate` command, which creates the fetch client based on your wireflux configuration file.

```bash
wireflux generate [options]
```

### Options

- `--config <path>` or `-c <path>`: Provide a path to a custom configuration file. By default, it looks for `wireflux.config.ts` or `wireflux.config.js` in the current directory.

## `init` Command

The `init` command creates a new wireflux configuration file in your project.

```bash
wireflux init [options]
```

### Options

- `--js`: Create a JavaScript configuration file (`wireflux.config.js`) instead of TypeScript (`wireflux.config.ts`).

## Configuration

For more advanced control over the generated client, you can use a `wireflux.config.js` file in your project root. This file should export a configuration object using the `defineConfig` function.

```javascript
// wireflux.config.js
import { defineConfig } from "wireflux";

export default defineConfig({
  // Your configuration options here
});
```

### Available Options

- `supportedMethods`: An array of HTTP methods to generate clients for.
  - **Default**: `['get', 'post', 'put', 'delete', 'patch', 'options', 'head']`
- `includeTypes`: A boolean indicating whether to include TypeScript types in the generated client.
  - **Default**: `true`

## Example Usage

Here's a practical example of how to use the CLI:

```bash
# Initialize a new wireflux project
wireflux init

# Generate a client using the default config file
wireflux generate

# Generate a client using a custom config file
wireflux generate --config ./custom-wireflux.config.ts

# Initialize a JavaScript config instead of TypeScript
wireflux init --js
```

This will create a client based on your configuration file settings. You can then import the generated functions in your application.

## Using the Generated Client

Once the client is generated, you can import and use the functions in your code. Each endpoint in your OpenAPI specification will have a corresponding function that returns a `Result<T, E>` type.

```typescript
// Example: src/api/users.ts
import { getUsers, createUser } from "../generated";
import type { ApiError } from "../lib/api-error";

async function fetchUsers() {
  const { data: users, error } = await getUsers();

  if (error) {
    console.error("Error fetching users:", error.message);
    return;
  }

  console.log("Users:", users);
}

async function addUser(name: string, email: string) {
  const { data: newUser, error } = await createUser({
    body: { name, email },
  });

  if (error) {
    console.error("Error creating user:", error.message);
    return;
  }

  console.log("New user created:", newUser);
}
```

This provides a fully typed and safe client using the Result pattern, improving developer experience and reducing the risk of runtime errors.
