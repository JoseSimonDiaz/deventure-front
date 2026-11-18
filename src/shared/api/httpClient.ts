import type { z } from 'zod';
import { ApiError, NETWORK_ERROR_STATUS, UNAUTHORIZED_STATUS } from '@/shared/api/ApiError';
import { env } from '@/shared/config/env';
import { COPY } from '@/shared/constants/copy';
import { errorResponseSchema } from '@/shared/contracts/common';
import { useSessionStore } from '@/stores/sessionStore';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type RequestOptions<TSchema extends z.ZodTypeAny> = {
  method?: HttpMethod;
  body?: unknown;
  responseSchema: TSchema;
};

const NETWORK_ERROR_CODE = 'NETWORK_ERROR';
const JSON_CONTENT_TYPE = 'application/json';
const EMPTY_BODY = {};
const UNKNOWN_ERROR_BODY = { error: { code: 'UNKNOWN_ERROR', message: COPY.errors.generic } };

async function readJsonBody(response: Response): Promise<unknown> {
  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes(JSON_CONTENT_TYPE)) return EMPTY_BODY;
  const body: unknown = await response.json();
  return body;
}

function buildRequestInit<TSchema extends z.ZodTypeAny>(
  options: RequestOptions<TSchema>,
  token: string | null,
): RequestInit {
  const headers = new Headers({ Accept: JSON_CONTENT_TYPE });
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const requestInit: RequestInit = { method: options.method ?? 'GET', headers };
  if (Object.hasOwn(options, 'body')) {
    headers.set('Content-Type', JSON_CONTENT_TYPE);
    requestInit.body = JSON.stringify(options.body);
  }
  return requestInit;
}

async function sendRequest(url: string, requestInit: RequestInit): Promise<Response> {
  try {
    return await fetch(url, requestInit);
  } catch (networkError) {
    throw new ApiError({
      status: NETWORK_ERROR_STATUS,
      code: NETWORK_ERROR_CODE,
      message: COPY.errors.generic,
      details: networkError,
    });
  }
}

export async function requestApi<TSchema extends z.ZodTypeAny>(
  path: string,
  options: RequestOptions<TSchema>,
): Promise<z.output<TSchema>> {
  const { token, endSession } = useSessionStore.getState();
  const response = await sendRequest(
    `${env.VITE_API_URL}${path}`,
    buildRequestInit(options, token),
  );
  const responseBody = await readJsonBody(response);

  if (!response.ok) {
    if (response.status === UNAUTHORIZED_STATUS && token) endSession();
    const { error } = errorResponseSchema.catch(UNKNOWN_ERROR_BODY).parse(responseBody);
    throw new ApiError({ status: response.status, ...error });
  }

  return options.responseSchema.parse(responseBody) as z.output<TSchema>;
}
