import { z } from 'zod';
import { idSchema } from '@/shared/contracts/common';

export const SESSION_STATUSES = ['in_progress', 'won', 'lost', 'abandoned'] as const;

export const gameSessionSchema = z.object({
  id: idSchema,
  levelId: idSchema,
  zoneId: idSchema,
  challengeIds: z.array(idSchema),
  currentIndex: z.number().int(),
  initialLives: z.number().int(),
  livesLeft: z.number().int(),
  hintsUsed: z.number().int(),
  status: z.enum(SESSION_STATUSES),
});

export const answerSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('multiple_choice'), optionId: z.string() }),
  z.object({ type: z.literal('order_blocks'), order: z.array(z.string()) }),
  z.object({
    type: z.literal('fill_code'),
    code: z.string().optional(),
    blanks: z.array(z.string()).optional(),
  }),
  z.object({ type: z.literal('find_bug'), line: z.number().int(), fixOptionId: z.string() }),
  z.object({ type: z.literal('predict_output'), output: z.string() }),
]);

export const rewardSummarySchema = z.object({
  id: idSchema,
  name: z.string(),
  type: z.string(),
  rarity: z.string(),
  imageUrl: z.string(),
});

export const attemptDetailsSchema = z.object({
  line: z.number().int().nullable().optional(),
  firstWrongIndex: z.number().int().nullable().optional(),
  firstWrongBlank: z.number().int().nullable().optional(),
  firstWrongLine: z.number().int().nullable().optional(),
  isLineCorrect: z.boolean().optional(),
});

export const levelResultSchema = z.object({
  stars: z.number().int(),
  correctFirstTry: z.number().int(),
  total: z.number().int(),
  durationMs: z.number().int(),
  hintsUsed: z.number().int(),
  isNewBest: z.boolean(),
});

export const attemptResultSchema = z.object({
  correct: z.boolean(),
  explanation: z.string().nullable(),
  message: z.string().nullable(),
  details: attemptDetailsSchema,
  livesLeft: z.number().int(),
  nextIndex: z.number().int(),
  total: z.number().int(),
  sessionStatus: z.enum(SESSION_STATUSES),
  result: levelResultSchema.optional(),
  unlockedLevelIds: z.array(idSchema).optional(),
  unlockedZoneId: idSchema.nullable().optional(),
  nextLevelId: idSchema.nullable().optional(),
  isLastOfZone: z.boolean().optional(),
  isLastOfGame: z.boolean().optional(),
  rewardsUnlocked: z.array(rewardSummarySchema).optional(),
  progressSaved: z.boolean().optional(),
});

export const hintSchema = z.object({
  order: z.number().int(),
  text: z.string(),
  remaining: z.number().int(),
  hintsUsed: z.number().int(),
});

export const assistantAnswerSchema = z.object({
  hint: z.string(),
  source: z.enum(['ai', 'hint']),
  remaining: z.number().int(),
});

export const oracleAnswerSchema = z.object({
  answer: z.string(),
  remaining: z.number().int(),
});

export type AssistantAnswer = z.infer<typeof assistantAnswerSchema>;
export type OracleAnswer = z.infer<typeof oracleAnswerSchema>;
export type GameSession = z.infer<typeof gameSessionSchema>;
export type Answer = z.infer<typeof answerSchema>;
export type AttemptResult = z.infer<typeof attemptResultSchema>;
export type AttemptDetails = z.infer<typeof attemptDetailsSchema>;
export type Hint = z.infer<typeof hintSchema>;
export type RewardSummary = z.infer<typeof rewardSummarySchema>;
