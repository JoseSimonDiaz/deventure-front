import { requestApi } from '@/shared/api/httpClient';
import { dataResponse } from '@/shared/contracts/common';
import { gallerySchema, type Gallery } from '@/shared/contracts/rewards';

const galleryEnvelopeSchema = dataResponse(gallerySchema);

export async function fetchGalleryCounter(): Promise<Gallery> {
  const { data } = await requestApi('/api/rewards/me', { responseSchema: galleryEnvelopeSchema });
  return data;
}
