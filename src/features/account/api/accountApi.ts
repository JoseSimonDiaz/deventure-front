import { z } from 'zod';
import { requestApi } from '@/shared/api/httpClient';
import {
  authResponseSchema,
  type AuthResponse,
  type ChangePasswordRequest,
  type DeleteAccountRequest,
  type UpdateUsernameRequest,
} from '@/shared/contracts/auth';
import { dataResponse } from '@/shared/contracts/common';

const authEnvelopeSchema = dataResponse(authResponseSchema);
const emptyResponseSchema = z.unknown();

export async function updateUsername(request: UpdateUsernameRequest): Promise<AuthResponse> {
  const { data } = await requestApi('/api/auth/me', {
    method: 'PATCH',
    body: request,
    responseSchema: authEnvelopeSchema,
  });
  return data;
}

export async function changePassword(request: ChangePasswordRequest): Promise<AuthResponse> {
  const { data } = await requestApi('/api/auth/me/password', {
    method: 'PATCH',
    body: request,
    responseSchema: authEnvelopeSchema,
  });
  return data;
}

export async function deleteAccount(request: DeleteAccountRequest): Promise<void> {
  await requestApi('/api/auth/me', {
    method: 'DELETE',
    body: request,
    responseSchema: emptyResponseSchema,
  });
}
