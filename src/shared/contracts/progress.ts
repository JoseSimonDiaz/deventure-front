import { z } from 'zod';
import { idSchema } from '@/shared/contracts/common';

export const LEVEL_STATUSES = ['completed', 'available', 'locked'] as const;

export const playerProgressSchema = z.object({
  completed: z.array(
    z.object({
      levelId: idSchema,
      zoneId: idSchema,
      bestStars: z.number().int(),
      attemptsCount: z.number().int(),
      lastPlayedAt: z.string(),
    }),
  ),
  unlockedLevelIds: z.array(idSchema),
  totalStars: z.number().int(),
});

export const progressSummarySchema = z.object({
  totals: z.object({
    percent: z.number().int(),
    stars: z.number().int(),
    maxStars: z.number().int(),
    levelsCompleted: z.number().int(),
    levelsTotal: z.number().int(),
    streakDays: z.number().int(),
    totalTimeMs: z.number().int(),
    gameCompleted: z.boolean(),
  }),
  zones: z.array(
    z.object({
      zoneId: idSchema,
      name: z.string(),
      slug: z.string(),
      unlocked: z.boolean(),
      percent: z.number().int(),
      stars: z.number().int(),
      maxStars: z.number().int(),
      levelsCompleted: z.number().int(),
      levelsTotal: z.number().int(),
      levels: z.array(
        z.object({
          levelId: idSchema,
          order: z.number().int(),
          title: z.string(),
          status: z.enum(LEVEL_STATUSES),
          bestStars: z.number().int().nullable(),
          attemptsCount: z.number().int().nullable(),
          lastPlayedAt: z.string().nullable(),
        }),
      ),
    }),
  ),
});

export const seenTheorySchema = z.object({ zoneIds: z.array(idSchema) });

export type PlayerProgress = z.infer<typeof playerProgressSchema>;
export type ProgressSummary = z.infer<typeof progressSummarySchema>;
export type ZoneProgress = ProgressSummary['zones'][number];
export type LevelProgress = ZoneProgress['levels'][number];
export type LevelStatus = (typeof LEVEL_STATUSES)[number];
