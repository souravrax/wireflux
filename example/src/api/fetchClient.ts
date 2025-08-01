import type { Result } from 'wireflux';
import ApiError from './api-error';

export function createUnhandledError(url: string) {
  return new ApiError({
    status: 500,
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Internal server error',
    timestamp: new Date().toISOString(),
    path: url,
  });
}

export default async function fetchClient<T>(
  url: string,
  init?: RequestInit,
  throwOnError?: boolean
): Promise<Result<T>> {
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
    return (e as Response)
      .json()
      .then((errorData) => {
        return {
          data: null,
          error: new ApiError(errorData),
        };
      })
      .catch(() => {
        const unhandledError = createUnhandledError(url);
        if (throwOnError) {
          throw unhandledError;
        }
        return {
          data: null,
          error: unhandledError,
        };
      });
  }
}
