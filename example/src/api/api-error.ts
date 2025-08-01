// Shared API Error class
// This handles all error responses uniformly across all operations

// ApiError class with useful methods (also serves as the type)
export default class ApiError extends Error {
  readonly status: number;
  readonly code:
    | 'BAD_REQUEST'
    | 'VALIDATION_ERROR'
    | 'INVALID_INPUT'
    | 'MISSING_FIELD'
    | 'DB_FOREIGN_KEY_ERROR'
    | 'UNAUTHORIZED'
    | 'FORBIDDEN'
    | 'NOT_FOUND'
    | 'CONFLICT'
    | 'INTERNAL_SERVER_ERROR'
    | 'SERVICE_UNAVAILABLE';
  readonly timestamp: string;
  readonly path?: string;
  readonly errors?: Array<{
    field: string;
    message: string;
    code?: string;
  }>;

  constructor(error: {
    status: number;
    code: ApiError['code'];
    message: string;
    timestamp: string;
    path?: string;
    errors?: Array<{
      field: string;
      message: string;
      code?: string;
    }>;
  }) {
    super(error.message);
    this.name = 'ApiError';
    this.status = error.status;
    this.code = error.code;
    this.timestamp = error.timestamp;
    this.path = error.path;
    this.errors = error.errors;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }

  /**
   * Check if this is a client error (4xx)
   */
  isClientError(): boolean {
    return this.status >= 400 && this.status < 500;
  }

  /**
   * Check if this is a server error (5xx)
   */
  isServerError(): boolean {
    return this.status >= 500;
  }

  /**
   * Check if this is a validation error
   */
  isValidationError(): boolean {
    return this.code === 'VALIDATION_ERROR' || this.code === 'INVALID_INPUT';
  }

  /**
   * Get field-specific error messages
   */
  getFieldErrors(): Record<string, string> {
    const fieldErrors: Record<string, string> = {};
    if (this.errors) {
      for (const error of this.errors) {
        fieldErrors[error.field] = error.message;
      }
    }
    return fieldErrors;
  }

  /**
   * Convert to JSON representation
   */
  toJSON() {
    return {
      status: this.status,
      code: this.code,
      message: this.message,
      timestamp: this.timestamp,
      path: this.path,
      errors: this.errors,
    };
  }
}
