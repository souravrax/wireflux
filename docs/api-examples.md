---
outline: deep
---

# API Examples

This page provides practical examples of using Wireflux-generated clients in real-world scenarios.

## Basic CRUD Operations

### User Management API

Assuming an OpenAPI schema with user operations, here's how you'd use the generated client:

```typescript
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "./src/api";
import type { User, CreateUserRequest } from "./src/api/types";

// Get all users with pagination
async function fetchUserList(page: number = 1, limit: number = 10) {
  const { data: users, error } = await getUsers({
    query: { page, limit, include: "profile" },
  });

  if (error) {
    if (error.isClientError()) {
      console.error("Client error:", error.message);
    } else {
      console.error("Server error:", error.message);
    }
    return null;
  }

  return users;
}

// Get a specific user
async function fetchUser(userId: string) {
  const { data: user, error } = await getUser({
    id: userId,
    query: { include: "posts,profile" },
  });

  if (error) {
    if (error.status === 404) {
      console.log("User not found");
    } else {
      console.error("Error fetching user:", error.message);
    }
    return null;
  }

  return user;
}

// Create a new user
async function createNewUser(userData: CreateUserRequest) {
  const { data: user, error } = await createUser({
    body: userData,
  });

  if (error) {
    if (error.isValidationError()) {
      const fieldErrors = error.getFieldErrors();
      console.error("Validation errors:", fieldErrors);
    } else {
      console.error("Error creating user:", error.message);
    }
    return null;
  }

  console.log("User created successfully:", user);
  return user;
}

// Update user data
async function updateUserProfile(userId: string, updates: Partial<User>) {
  const { data: user, error } = await updateUser({
    id: userId,
    body: updates,
  });

  if (error) {
    console.error("Error updating user:", error.message);
    return null;
  }

  return user;
}

// Delete a user
async function removeUser(userId: string) {
  const { data, error } = await deleteUser({ id: userId });

  if (error) {
    if (error.status === 404) {
      console.log("User not found");
    } else {
      console.error("Error deleting user:", error.message);
    }
    return false;
  }

  console.log("User deleted successfully");
  return true;
}
```

## Error Handling Patterns

### Centralized Error Handling

```typescript
import type { ApiError } from "./lib/api-error";

// Centralized error handler
function handleApiError(error: ApiError, context?: string) {
  const prefix = context ? `[${context}]` : "";

  switch (error.code) {
    case "UNAUTHORIZED":
      console.error(`${prefix} Authentication required`);
      // Redirect to login
      window.location.href = "/login";
      break;

    case "FORBIDDEN":
      console.error(`${prefix} Access denied`);
      // Show access denied message
      break;

    case "NOT_FOUND":
      console.error(`${prefix} Resource not found`);
      break;

    case "VALIDATION_ERROR":
      const fieldErrors = error.getFieldErrors();
      console.error(`${prefix} Validation errors:`, fieldErrors);
      // Show field-specific errors in UI
      break;

    case "INTERNAL_SERVER_ERROR":
      console.error(`${prefix} Server error occurred`);
      // Show generic error message to user
      break;

    default:
      console.error(`${prefix} Unexpected error:`, error.message);
  }
}

// Usage with centralized error handling
async function fetchUserSafely(userId: string) {
  const { data: user, error } = await getUser({ id: userId });

  if (error) {
    handleApiError(error, "User Fetch");
    return null;
  }

  return user;
}
```

### Retry Logic

```typescript
async function withRetry<T>(
  operation: () => Promise<{ data: T | null; error: ApiError | null }>,
  maxRetries: number = 3
): Promise<{ data: T | null; error: ApiError | null }> {
  let lastError: ApiError | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const result = await operation();

    if (!result.error) {
      return result;
    }

    lastError = result.error;

    // Don't retry client errors (4xx)
    if (result.error.isClientError()) {
      break;
    }

    // Wait before retrying (exponential backoff)
    if (attempt < maxRetries) {
      const delay = Math.pow(2, attempt) * 1000;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  return { data: null, error: lastError };
}

// Usage with retry
async function fetchUserWithRetry(userId: string) {
  return withRetry(() => getUser({ id: userId }), 3);
}
```

## React Integration

### Custom Hooks

```typescript
import { useState, useEffect } from "react";
import { getUsers, getUser } from "./src/api";
import type { User } from "./src/api/types";

// Hook for fetching multiple users
function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      setError(null);

      const { data, error: apiError } = await getUsers();

      if (apiError) {
        setError(apiError.message);
      } else {
        setUsers(data || []);
      }

      setLoading(false);
    }

    fetchUsers();
  }, []);

  return { users, loading, error };
}

// Hook for fetching a single user
function useUser(userId: string | null) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setUser(null);
      return;
    }

    async function fetchUser() {
      setLoading(true);
      setError(null);

      const { data, error: apiError } = await getUser({ id: userId });

      if (apiError) {
        setError(apiError.message);
        setUser(null);
      } else {
        setUser(data);
      }

      setLoading(false);
    }

    fetchUser();
  }, [userId]);

  return { user, loading, error };
}

// React component using the hooks
function UserList() {
  const { users, loading, error } = useUsers();

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name} - {user.email}
        </li>
      ))}
    </ul>
  );
}

function UserProfile({ userId }: { userId: string }) {
  const { user, loading, error } = useUser(userId);

  if (loading) return <div>Loading user...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Created: {new Date(user.createdAt).toLocaleDateString()}</p>
    </div>
  );
}
```

### Form Handling

```typescript
import { useState } from "react";
import { createUser, updateUser } from "./src/api";
import type { CreateUserRequest, User } from "./src/api/types";

function UserForm({
  user,
  onSuccess,
}: {
  user?: User;
  onSuccess: (user: User) => void;
}) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const operation = user
      ? updateUser({ id: user.id, body: formData })
      : createUser({ body: formData as CreateUserRequest });

    const { data, error } = await operation;

    if (error) {
      if (error.isValidationError()) {
        setErrors(error.getFieldErrors());
      } else {
        setErrors({ general: error.message });
      }
    } else if (data) {
      onSuccess(data);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {errors.general && <div className="error">{errors.general}</div>}

      <div>
        <label>Name:</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : user ? "Update" : "Create"}
      </button>
    </form>
  );
}
```

## Advanced Patterns

### Bulk Operations

```typescript
// Process multiple operations with progress tracking
async function bulkUpdateUsers(
  updates: Array<{ id: string; data: Partial<User> }>,
  onProgress?: (completed: number, total: number) => void
) {
  const results: Array<{ id: string; success: boolean; error?: string }> = [];

  for (let i = 0; i < updates.length; i++) {
    const { id, data } = updates[i];
    const { data: user, error } = await updateUser({ id, body: data });

    results.push({
      id,
      success: !error,
      error: error?.message,
    });

    onProgress?.(i + 1, updates.length);
  }

  return results;
}

// Usage
const updates = [
  { id: "1", data: { name: "John Updated" } },
  { id: "2", data: { name: "Jane Updated" } },
];

const results = await bulkUpdateUsers(updates, (completed, total) => {
  console.log(`Progress: ${completed}/${total}`);
});

console.log("Bulk update results:", results);
```

### Caching Layer

```typescript
class ApiCache {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private readonly TTL = 5 * 60 * 1000; // 5 minutes

  private getCacheKey(operation: string, params: any): string {
    return `${operation}:${JSON.stringify(params)}`;
  }

  get<T>(operation: string, params: any): T | null {
    const key = this.getCacheKey(operation, params);
    const cached = this.cache.get(key);

    if (!cached) return null;

    if (Date.now() - cached.timestamp > this.TTL) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  set<T>(operation: string, params: any, data: T): void {
    const key = this.getCacheKey(operation, params);
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  invalidate(operation: string, params?: any): void {
    if (params) {
      const key = this.getCacheKey(operation, params);
      this.cache.delete(key);
    } else {
      // Invalidate all entries for this operation
      for (const key of this.cache.keys()) {
        if (key.startsWith(`${operation}:`)) {
          this.cache.delete(key);
        }
      }
    }
  }
}

const apiCache = new ApiCache();

// Cached user fetching
async function getCachedUser(userId: string) {
  const cacheKey = "getUser";
  const params = { id: userId };

  // Check cache first
  const cached = apiCache.get<User>(cacheKey, params);
  if (cached) {
    return { data: cached, error: null };
  }

  // Fetch from API
  const { data, error } = await getUser(params);

  // Cache successful responses
  if (data) {
    apiCache.set(cacheKey, params, data);
  }

  return { data, error };
}

// Invalidate cache after updates
async function updateUserAndInvalidateCache(
  userId: string,
  updates: Partial<User>
) {
  const { data, error } = await updateUser({ id: userId, body: updates });

  if (data) {
    // Invalidate related cache entries
    apiCache.invalidate("getUser", { id: userId });
    apiCache.invalidate("getUsers"); // Invalidate user lists
  }

  return { data, error };
}
```

This comprehensive set of examples should help you understand how to effectively use Wireflux-generated clients in various scenarios, from basic CRUD operations to advanced patterns like caching and bulk operations.
