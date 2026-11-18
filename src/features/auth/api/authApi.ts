import { requestApi } from '@/shared/api/httpClient';
import {
  authResponseSchema,
  type AuthResponse,
  type LoginRequest,
  type RegisterRequest,
} from '@/shared/contracts/auth';
import { dataResponse } from '@/shared/contracts/common';

const authEnvelopeSchema = dataResponse(authResponseSchema);

export async function loginRequest(credentials: LoginRequest): Promise<AuthResponse> {
  const { data } = await requestApi('/api/auth/login', {
    method: 'POST',
    body: credentials,
    responseSchema: authEnvelopeSchema,
  });
  return data;
}

export async function registerRequest(newPlayer: RegisterRequest): Promise<AuthResponse> {
  const { data } = await requestApi('/api/auth/register', {
    method: 'POST',
    body: newPlayer,
    responseSchema: authEnvelopeSchema,
  });
  return data;
}
