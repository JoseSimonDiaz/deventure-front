import { requestApi } from '@/shared/api/httpClient';
import { userPublicSchema, type UserPublic } from '@/shared/contracts/auth';
import { dataResponse } from '@/shared/contracts/common';

const userResponseSchema = dataResponse(userPublicSchema);

export async function fetchCurrentUser(): Promise<UserPublic> {
  const { data } = await requestApi('/api/auth/me', { responseSchema: userResponseSchema });
  return data;
}

export async function markIntroSeenRequest(): Promise<UserPublic> {
  const { data } = await requestApi('/api/auth/me/intro-seen', {
    method: 'PATCH',
    responseSchema: userResponseSchema,
  });
  return data;
}

export async function updateAvatarRequest(avatarRewardId: string): Promise<UserPublic> {
  const { data } = await requestApi('/api/auth/me/avatar', {
    method: 'PATCH',
    body: { avatarRewardId },
    responseSchema: userResponseSchema,
  });
  return data;
}
