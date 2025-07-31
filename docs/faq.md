---
outline: deep
---

# Frequently Asked Questions

## General Questions

### What is Wireflux?

Wireflux is a CLI tool that generates type-safe fetch clients from OpenAPI specifications. It uses the Result pattern for error handling and allows you to provide your own fetch client and error handling implementations.

### How is Wireflux different from other code generators?

- **Result Pattern**: Built-in error handling using `Result<T, E>` - no uncaught exceptions
- **User-Provided Dependencies**: You bring your own fetch client and error classes
- **Type Safety**: Full TypeScript support with generated types
- **Flexible**: Works with any fetch implementation (native, axios wrapper, etc.)

### What OpenAPI versions are supported?

Wireflux supports OpenAPI 3.0+ specifications in JSON format.

## Installation & Setup

### Can I use Wireflux without installing it globally?

Yes! You can use `npx wireflux` to run commands without global installation:

```bash
npx wireflux init
npx wireflux generate
```

### Do I need TypeScript to use Wireflux?

No, but it's recommended. Wireflux can generate JavaScript clients and supports JavaScript configuration files:

```bash
wireflux init --js  # Creates wireflux.config.js
```

### Where should I put my configuration file?

The configuration file should be in your project root as either:

- `wireflux.config.ts` (TypeScript, recommended)
- `wireflux.config.js` (JavaScript)

## Configuration

### Can I use a remote OpenAPI schema?

Yes! You can provide a URL as the input:

```typescript
export default defineConfig({
  input: "https://api.example.com/openapi.json",
  // ... other config
});
```

### How do I customize which HTTP methods are generated?

Use the `supportedMethods` option:

```typescript
export default defineConfig({
  supportedMethods: ["get", "post", "put", "delete"],
  // ... other config
});
```

### Can I generate clients for multiple APIs?

Yes, create separate config files and run the generator for each:

```bash
wireflux generate -c api1.config.ts
wireflux generate -c api2.config.ts
```

## Implementation

### What should my fetch client return?

Your fetch client must return a `Result<T, E>` type:

```typescript
// Success
{ data: responseData, error: null }

// Error
{ data: null, error: apiErrorInstance }
```

### Can I use axios instead of fetch?

Absolutely! Wrap axios in a function that returns the Result pattern:

```typescript
import axios from "axios";

export async function fetchClient<T>(
  url: string,
  init?: RequestInit
): Promise<Result<T, ApiError>> {
  try {
    const response = await axios({
      url,
      method: init?.method || "GET",
      data: init?.body,
      headers: init?.headers,
    });
    return { data: response.data, error: null };
  } catch (error) {
    return {
      data: null,
      error: new ApiError(error.response?.data || error.message),
    };
  }
}
```

### How do I handle authentication?

Add authentication in your fetch client implementation:

```typescript
export async function fetchClient<T>(
  url: string,
  init?: RequestInit
): Promise<Result<T, ApiError>> {
  const token = await getAuthToken(); // Your auth logic

  const response = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  // ... rest of implementation
}
```

## Generated Code

### What does the generated code look like?

Each operation becomes a typed function:

```typescript
// From: GET /users/{id}
export async function getUser(params: {
  id: string;
  throwOnError?: boolean;
  fetchConfig?: RequestInit;
}): Promise<Result<User, ApiError>> {
  // Generated implementation
}
```

### How do I use path parameters?

Path parameters are included directly in the function parameters:

```typescript
// GET /users/{userId}/posts/{postId}
const { data, error } = await getUserPost({
  userId: "123",
  postId: "456",
});
```

### How do I pass query parameters?

Query parameters are grouped under the `query` property:

```typescript
// GET /users?page=1&limit=10
const { data, error } = await getUsers({
  query: { page: 1, limit: 10 },
});
```

### How do I send request bodies?

Use the `body` parameter for POST/PUT/PATCH operations:

```typescript
// POST /users
const { data, error } = await createUser({
  body: { name: "John", email: "john@example.com" },
});
```

## Error Handling

### How do I handle errors with the Result pattern?

Always check the error before using data:

```typescript
const { data, error } = await getUsers();

if (error) {
  console.error("API Error:", error.message);
  if (error.isClientError()) {
    // Handle 4xx errors
  }
  return;
}

// Safe to use data here
console.log(data);
```

### Can I still use try/catch?

Yes, use the `throwOnError` option:

```typescript
try {
  const { data } = await getUsers({ throwOnError: true });
  console.log(data);
} catch (error) {
  console.error("API Error:", error);
}
```

### How do I customize error messages?

Implement custom logic in your ApiError class:

```typescript
export class ApiError extends Error {
  // ... properties

  getUserFriendlyMessage(): string {
    switch (this.code) {
      case "NOT_FOUND":
        return "The requested item was not found.";
      case "UNAUTHORIZED":
        return "Please log in to access this resource.";
      default:
        return this.message;
    }
  }
}
```

## Troubleshooting

### "Config file not found" error

Make sure your config file is in the project root and named correctly:

- `wireflux.config.ts` (TypeScript)
- `wireflux.config.js` (JavaScript)

### Generated types are incorrect

1. Check that your OpenAPI schema is valid
2. Ensure the schema follows OpenAPI 3.0+ specification
3. Verify component schemas are properly defined

### My fetch client isn't working

Ensure your fetch client:

1. Returns `Promise<Result<T, E>>`
2. Handles all HTTP errors (don't throw for 4xx/5xx)
3. Returns the correct Result structure

### TypeScript compilation errors

1. Make sure TypeScript is installed: `npm install -D typescript`
2. Check that your tsconfig.json includes the generated files
3. Verify your fetch client and API error types match the expected interfaces

## Best Practices

### Project Structure

```
src/
├── lib/
│   ├── fetch-client.ts    # Your fetch implementation
│   └── api-error.ts       # Your error class
├── api/                   # Generated API client (targetFolder)
│   ├── index.ts
│   ├── types.ts
│   └── operations.ts
└── components/
    └── UserList.tsx       # Using the generated client
```

### Error Handling Strategy

1. **Always check errors first** before using data
2. **Implement helper methods** on your ApiError class
3. **Use meaningful error codes** in your API
4. **Consider retry logic** for network errors

### Type Safety

1. **Enable strict TypeScript** settings
2. **Use the generated types** for request/response models
3. **Don't cast types** - trust the generated code
4. **Update generated code** when your API changes
