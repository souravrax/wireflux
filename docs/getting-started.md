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

# Or use with npx
npx wireflux [command] [options]
```

## Initializing a Project

The easiest way to start a new project is to use the `init` command. This will create a `wireflux.config.js` file in your project root.

```bash
npx wireflux init
```

This configuration file is where you will define the settings for your generated client.

## Configuring the Client

Next, you'll need to edit the `wireflux.config.js` file to specify the location of your OpenAPI schema, the output directory for the generated client, and your custom fetch client and API error implementations.

```javascript
// wireflux.config.js
import { defineConfig } from 'wireflux';

export default defineConfig({
  input: './openapi.json', // Path to your OpenAPI schema
  targetFolder: './generated', // Where to generate the client
  fetchClient: './super-fetch', // Your fetch client implementation
  apiError: './api-error', // Your API error class
  baseUrl: 'http://localhost:3000/api',
});
```

For more information on the available configuration options, see the [Configuration](./configuration.md) documentation.

## Generating the Client

Once you have configured your project, you can generate the client using the `generate` command.

```bash
npx wireflux generate
```

This will create a new directory (e.g., `./generated`) containing the generated client files.

## Using the Generated Client

After generating the client, you can import and use the functions in your application. Each endpoint in your OpenAPI specification will have a corresponding function in the generated client.

```typescript
import { getUsers, createUser } from './generated';
import { ApiError } from './api-error';

async function main() {
  // Fetch all users
  const { data: users, error: getUsersError } = await getUsers();

  if (getUsersError) {
    console.error('Error fetching users:', getUsersError.message);
    return;
  }

  console.log('Fetched users:', users);

  // Create a new user
  const { data: newUser, error: createUserError } = await createUser({
    body: { name: 'John Doe', email: 'john.doe@example.com' },
  });

  if (createUserError) {
    console.error('Error creating user:', createUserError.message);
    return;
  }

  console.log('Created new user:', newUser);
}

main();
```