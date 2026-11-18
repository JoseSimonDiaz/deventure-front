import { z } from 'zod';
import { idSchema } from '@/shared/contracts/common';

export const adminLevelSchema = z.object({
  id: idSchema,
  order: z.number().int(),
  title: z.string(),
  initialLives: z.number().int(),
  isPublished: z.boolean(),
  _count: z.object({ challenges: z.number().int() }).optional(),
});

export const adminZoneSchema = z.object({
  id: idSchema,
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  order: z.number().int(),
  videoUrl: z.string().nullable(),
  theorySummary: z.string(),
  isPublished: z.boolean(),
  archivedAt: z.string().nullable(),
  levels: z.array(adminLevelSchema),
});

export const adminChallengeSchema = z.object({
  id: idSchema,
  levelId: idSchema,
  order: z.number().int(),
  type: z.string(),
  language: z.string(),
  statement: z.string(),
  payload: z.unknown(),
  solution: z.unknown(),
  explanation: z.string(),
  commonErrors: z.unknown(),
  hints: z.array(z.object({ order: z.number().int(), text: z.string() })),
});

export const adminLevelChallengesSchema = z.object({
  id: idSchema,
  title: z.string(),
  zoneId: idSchema,
  challenges: z.array(adminChallengeSchema),
});

export const previewResultSchema = z.object({
  isCorrect: z.boolean(),
  message: z.string().optional(),
});

const levelStatsSchema = z.object({
  levelId: idSchema,
  playersStarted: z.number().int(),
  playersWon: z.number().int(),
  sessions: z.number().int(),
  failRate: z.number().int(),
  avgDurationMs: z.number().int(),
});

export const adminStatsSchema = z.object({
  users: z
    .object({
      totalUsers: z.number().int(),
      newUsers: z.number().int(),
      activeUsers7d: z.number().int(),
    })
    .nullable(),
  gameplay: z
    .object({
      levels: z.array(levelStatsSchema),
      topFailedChallenges: z.array(
        z.object({
          challengeId: idSchema,
          levelId: idSchema,
          challengeNumber: z.number().int(),
          errors: z.number().int(),
          attempts: z.number().int(),
        }),
      ),
    })
    .nullable(),
  progress: z.object({ activePlayers: z.number().int() }).passthrough().nullable(),
  partial: z.boolean(),
});

export type AdminZone = z.infer<typeof adminZoneSchema>;
export type AdminLevel = z.infer<typeof adminLevelSchema>;
export type AdminChallenge = z.infer<typeof adminChallengeSchema>;
export type AdminLevelChallenges = z.infer<typeof adminLevelChallengesSchema>;
export type PreviewResult = z.infer<typeof previewResultSchema>;
export type AdminStats = z.infer<typeof adminStatsSchema>;
export type ZonePatch = Partial<{
  isPublished: boolean;
  isArchived: boolean;
  name: string;
  description: string;
}>;
export type ZoneDraft = {
  slug: string;
  name: string;
  description: string;
  theorySummary: string;
};
