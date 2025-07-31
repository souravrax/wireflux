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

The core of the CLI is the `generate` command, which creates the fetch client based on your OpenAPI specification.

```bash
wireflux generate <path-to-openapi-spec> [options]
```

### Arguments

*   `<path-to-openapi-spec>`: The path to your OpenAPI specification file (e.g., `openapi.json`). This is a required argument.

### Options

*   `--output <path>`: Specify the output directory for the generated client. By default, it's `./generated`.
*   `--config <path>`: Provide a path to a custom configuration file. The default is `wireflux.config.js`.

## Configuration

For more advanced control over the generated client, you can use a `wireflux.config.js` file in your project root. This file should export a configuration object using the `defineConfig` function.

```javascript
// wireflux.config.js
import { defineConfig } from 'wireflux';

export default defineConfig({
  // Your configuration options here
});
```

### Available Options

*   `supportedMethods`: An array of HTTP methods to generate clients for. 
    *   **Default**: `['get', 'post', 'put', 'delete', 'patch', 'options', 'head']`
*   `includeTypes`: A boolean indicating whether to include TypeScript types in the generated client. 
    *   **Default**: `true`

## Example Usage

Here's a practical example of how to use the CLI to generate a client:

```bash
# Generate a client from openapi.json into the ./src/client directory
wireflux generate openapi.json --output ./src/client
```

This command will create a client in the `./src/client` directory with the default settings. You can then import the generated functions in your application.

## Using the Generated Client

Once the client is generated, you can import and use the functions in your code. Each endpoint in your OpenAPI specification will have a corresponding function in the generated client.

```typescript
// Example: src/api/users.ts
import { getUsers, createUser } from '../client';

async function fetchUsers() {
  try {
    const users = await getUsers();
    console.log('Users:', users);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

async function addUser(name: string, email: string) {
  try {
    const newUser = await createUser({ name, email });
    console.log('New user created:', newUser);
  } catch (error) {
    console.error('Error creating user:', error);
  }
}
```

This provides a fully typed and easy-to-use client for interacting with your API, improving developer experience and reducing the risk of runtime errors.