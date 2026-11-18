import { requestApi } from '@/shared/api/httpClient';
import { dataResponse } from '@/shared/contracts/common';
import {
  levelForPlayerSchema,
  zoneTheorySchema,
  type LevelForPlayer,
  type ZoneTheory,
} from '@/shared/contracts/content';

const levelEnvelopeSchema = dataResponse(levelForPlayerSchema);

export async function fetchLevel(levelId: string): Promise<LevelForPlayer> {
  const { data } = await requestApi(`/api/content/levels/${levelId}`, {
    responseSchema: levelEnvelopeSchema,
  });
  return data;
}

const zoneTheoryEnvelopeSchema = dataResponse(zoneTheorySchema);

export async function fetchZoneTheory(zoneId: string): Promise<ZoneTheory> {
  const { data } = await requestApi(`/api/content/zones/${zoneId}/theory`, {
    responseSchema: zoneTheoryEnvelopeSchema,
  });
  return data;
}
