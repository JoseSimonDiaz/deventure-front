import { ApiError, isRetryableError } from '@/shared/api/ApiError';
import { COPY } from '@/shared/constants/copy';
import { fieldErrorsSchema } from '@/shared/contracts/common';

const VALIDATION_ERROR_CODE = 'VALIDATION_ERROR';
const FIELD_BY_ERROR_CODE = new Map([
  ['USERNAME_TAKEN', 'username'],
  ['EMAIL_TAKEN', 'email'],
]);
const FORM_LEVEL_CODES = new Set(['INVALID_CREDENTIALS', 'ACCOUNT_LOCKED', 'TOO_MANY_REQUESTS']);

export function getFieldErrorMessage(error: unknown, fieldName: string): string | undefined {
  if (!(error instanceof ApiError)) return undefined;
  if (FIELD_BY_ERROR_CODE.get(error.code) === fieldName) return error.message;
  if (error.code !== VALIDATION_ERROR_CODE) return undefined;
  const fieldErrors = fieldErrorsSchema.catch({}).parse(error.details);
  return fieldErrors[fieldName]?.[0];
}

export function getFormErrorMessage(
  error: unknown,
  formFieldNames: readonly string[],
): string | undefined {
  if (!error) return undefined;
  if (isRetryableError(error)) return COPY.errors.generic;
  if (error instanceof ApiError && FORM_LEVEL_CODES.has(error.code)) return error.message;
  const isShownOnAField = formFieldNames.some((fieldName) =>
    Boolean(getFieldErrorMessage(error, fieldName)),
  );
  return isShownOnAField ? undefined : COPY.errors.generic;
}
