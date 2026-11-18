import { z } from 'zod';
import { requestApi } from '@/shared/api/httpClient';
import { dataResponse } from '@/shared/contracts/common';
import { gallerySchema, type Gallery, type GalleryFilters } from '@/shared/contracts/rewards';

const galleryEnvelopeSchema = dataResponse(gallerySchema);
const emptyResponseSchema = z.unknown();

export async function fetchGallery(filters: GalleryFilters): Promise<Gallery> {
  const searchParams = new URLSearchParams();
  if (filters.type) searchParams.set('type', filters.type);
  if (filters.status) searchParams.set('status', filters.status);
  const queryString = searchParams.toString();
  const { data } = await requestApi(`/api/rewards/me${queryString ? `?${queryString}` : ''}`, {
    responseSchema: galleryEnvelopeSchema,
  });
  return data;
}

export async function markRewardSeen(rewardId: string): Promise<void> {
  await requestApi(`/api/rewards/me/${rewardId}/seen`, {
    method: 'PATCH',
    responseSchema: emptyResponseSchema,
  });
}
