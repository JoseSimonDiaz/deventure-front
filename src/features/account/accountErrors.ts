import { ApiError } from '@/shared/api/ApiError';
import { COPY } from '@/shared/constants/copy';

const BUSINESS_ERROR_STATUSES = new Set([400, 403, 409, 423, 429]);

export function describeAccountError(error: unknown): string {
  if (!error) return '';
  if (error instanceof ApiError && BUSINESS_ERROR_STATUSES.has(error.status)) {
    return error.message;
  }
  return COPY.errors.generic;
}
