import { requestApi } from '@/shared/api/httpClient';
import { settingsSchema, type Settings } from '@/shared/contracts/auth';
import { dataResponse } from '@/shared/contracts/common';

const settingsEnvelopeSchema = dataResponse(settingsSchema);

export async function fetchAccountSettings(): Promise<Settings> {
  const { data } = await requestApi('/api/auth/me/settings', {
    responseSchema: settingsEnvelopeSchema,
  });
  return data;
}

export async function saveAccountSettings(settings: Settings): Promise<Settings> {
  const { data } = await requestApi('/api/auth/me/settings', {
    method: 'PATCH',
    body: settings,
    responseSchema: settingsEnvelopeSchema,
  });
  return data;
}
