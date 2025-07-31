// Core types for Wireflux

export type Result<V, E = any> =
  | {
      data: V;
      error: null;
    }
  | {
      data: null;
      error: E;
    };

export interface WirefluxConfig {
  /** Input OpenAPI schema file path or URL */
  input: string;

  /** Target folder where generated files will be placed */
  targetFolder: string;

  /** Path to the user's fetch client (must return Result<T, E>) */
  fetchClient: string;

  /** Path to the user's API Error class */
  apiError: string;

  /** Supported HTTP methods (optional, defaults to all) */
  supportedMethods?: readonly string[];

  /** Additional configuration options */
  baseUrl?: string;
  includeTypes?: boolean;
}

export interface UserFetchClient {
  <T>(url: string, init?: RequestInit): Promise<Result<T, any>>;
}

export interface UserApiError {
  new (error: any): Error;
}
