import type { Result } from 'wireflux';
import { ApiError } from './api-error';

async function getHeaders() {
  // In a real app, you might get headers from your framework
  // For this example, we'll just return null
  return null;
}

export async function fetchClient<T>(
  url: string,
  init?: RequestInit
): Promise<Result<T>> {
  const _headers = await getHeaders();
  try {
    const response = await fetch(url, {
      ...init,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...init?.headers,
      },
    });
    if (!response.ok) {
      throw response;
    }
    return {
      data: (await response.json()) as T,
      error: null,
    };
  } catch (e) {
    try {
      const errorData = await (e as Response).json();
      return {
        data: null,
        error: new ApiError(errorData),
      };
    } catch (_e) {
      return {
        data: null,
        error: new ApiError({
          status: 500,
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Internal server error',
          timestamp: new Date().toISOString(),
          path: url,
        }),
      };
    }
  }
}
