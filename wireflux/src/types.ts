// Core types for Wireflux

export type Result<V, E = unknown> =
  | {
      data: V;
      error: null;
    }
  | {
      data: null;
      error: E;
    };

export type UserFetchClient = <T>(
  url: string,
  init?: RequestInit
) => Promise<Result<T, unknown>>;

export interface UserApiError {
  new (error: unknown): Error;
}
