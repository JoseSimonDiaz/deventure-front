export const NETWORK_ERROR_STATUS = 0;
export const UNAUTHORIZED_STATUS = 401;
export const SERVER_ERROR_MIN_STATUS = 500;

type ApiErrorInit = {
  status: number;
  code: string;
  message: string;
  details?: unknown;
};

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly details: unknown;

  constructor({ status, code, message, details }: ApiErrorInit) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export function isRetryableError(error: unknown): boolean {
  if (!(error instanceof ApiError)) return true;
  return error.status === NETWORK_ERROR_STATUS || error.status >= SERVER_ERROR_MIN_STATUS;
}
