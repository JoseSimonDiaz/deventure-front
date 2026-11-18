import { z } from 'zod';
import { requestApi } from '@/shared/api/httpClient';
import {
  adminChallengeSchema,
  adminLevelChallengesSchema,
  adminLevelSchema,
  adminStatsSchema,
  adminZoneSchema,
  previewResultSchema,
  type AdminChallenge,
  type AdminLevelChallenges,
  type AdminStats,
  type AdminZone,
  type PreviewResult,
  type ZoneDraft,
  type ZonePatch,
} from '@/shared/contracts/admin';
import { dataResponse } from '@/shared/contracts/common';

const ADMIN_CONTENT = '/api/admin/content';
const zonesEnvelope = dataResponse(z.array(adminZoneSchema));
const zoneEnvelope = dataResponse(adminZoneSchema);
const levelEnvelope = dataResponse(adminLevelSchema);
const levelChallengesEnvelope = dataResponse(adminLevelChallengesSchema);
const challengeEnvelope = dataResponse(adminChallengeSchema);
const previewEnvelope = dataResponse(previewResultSchema);
const statsEnvelope = dataResponse(adminStatsSchema);
const emptyResponseSchema = z.unknown();

export async function fetchAdminZones(): Promise<AdminZone[]> {
  const { data } = await requestApi(`${ADMIN_CONTENT}/zones`, { responseSchema: zonesEnvelope });
  return data;
}

export async function createZone(zoneDraft: ZoneDraft): Promise<AdminZone> {
  const { data } = await requestApi(`${ADMIN_CONTENT}/zones`, {
    method: 'POST',
    body: zoneDraft,
    responseSchema: zoneEnvelope,
  });
  return data;
}

export async function updateZone(zoneId: string, zonePatch: ZonePatch): Promise<AdminZone> {
  const { data } = await requestApi(`${ADMIN_CONTENT}/zones/${zoneId}`, {
    method: 'PATCH',
    body: zonePatch,
    responseSchema: zoneEnvelope,
  });
  return data;
}

export async function createLevel(zoneId: string, title: string): Promise<void> {
  await requestApi(`${ADMIN_CONTENT}/zones/${zoneId}/levels`, {
    method: 'POST',
    body: { title },
    responseSchema: levelEnvelope,
  });
}

export async function updateLevelPublished(levelId: string, isPublished: boolean): Promise<void> {
  await requestApi(`${ADMIN_CONTENT}/levels/${levelId}`, {
    method: 'PATCH',
    body: { isPublished },
    responseSchema: levelEnvelope,
  });
}

export async function reorderLevels(zoneId: string, levelIds: string[]): Promise<void> {
  await requestApi(`${ADMIN_CONTENT}/zones/${zoneId}/levels/order`, {
    method: 'PUT',
    body: { levelIds },
    responseSchema: zoneEnvelope,
  });
}

export async function fetchLevelChallenges(levelId: string): Promise<AdminLevelChallenges> {
  const { data } = await requestApi(`${ADMIN_CONTENT}/levels/${levelId}/challenges`, {
    responseSchema: levelChallengesEnvelope,
  });
  return data;
}

export async function saveChallenge(
  levelId: string,
  challengeId: string,
  challengeBody: unknown,
): Promise<AdminChallenge> {
  const { data } = await requestApi(
    challengeId
      ? `${ADMIN_CONTENT}/challenges/${challengeId}`
      : `${ADMIN_CONTENT}/levels/${levelId}/challenges`,
    {
      method: challengeId ? 'PUT' : 'POST',
      body: challengeBody,
      responseSchema: challengeEnvelope,
    },
  );
  return data;
}

export async function deleteChallenge(challengeId: string): Promise<void> {
  await requestApi(`${ADMIN_CONTENT}/challenges/${challengeId}`, {
    method: 'DELETE',
    responseSchema: emptyResponseSchema,
  });
}

export async function previewChallenge(
  challenge: unknown,
  answer: unknown,
): Promise<PreviewResult> {
  const { data } = await requestApi(`${ADMIN_CONTENT}/challenge-previews`, {
    method: 'POST',
    body: { challenge, answer },
    responseSchema: previewEnvelope,
  });
  return data;
}

export async function fetchAdminStats(from: string, to: string): Promise<AdminStats> {
  const searchParams = new URLSearchParams();
  if (from) searchParams.set('from', from);
  if (to) searchParams.set('to', to);
  const { data } = await requestApi(`/api/admin/stats?${searchParams.toString()}`, {
    responseSchema: statsEnvelope,
  });
  return data;
}
