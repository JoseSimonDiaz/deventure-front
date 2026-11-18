import { z } from 'zod';
import { idSchema } from '@/shared/contracts/common';

export const CHALLENGE_LANGUAGES = ['pseudo', 'csharp', 'sql'] as const;

export const levelSummarySchema = z.object({
  id: idSchema,
  order: z.number().int(),
  title: z.string(),
});

export const zoneWithLevelsSchema = z.object({
  id: idSchema,
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  order: z.number().int(),
  levels: z.array(levelSummarySchema),
});

const optionSchema = z.object({ id: z.string(), text: z.string() });

export const sqlTableSchema = z.object({
  name: z.string().optional(),
  columns: z.array(z.string()),
  rows: z.array(z.array(z.union([z.string(), z.number(), z.null()]))),
});

const sqlContextSchema = z.object({
  tables: z.array(sqlTableSchema).optional(),
  expectedResult: sqlTableSchema.optional(),
});

export const multipleChoicePayloadSchema = sqlContextSchema.extend({
  options: z.array(optionSchema),
});

export const orderBlocksPayloadSchema = sqlContextSchema.extend({
  blocks: z.array(z.object({ id: z.string(), code: z.string() })),
  expectedOutput: z.string().optional(),
});

export const fillCodePayloadSchema = z.union([
  sqlContextSchema.extend({ mode: z.literal('blanks'), template: z.string() }),
  sqlContextSchema.extend({ mode: z.literal('free'), starterCode: z.string().default('') }),
]);

export const findBugPayloadSchema = sqlContextSchema.extend({
  lines: z.array(z.string()),
  fixOptions: z.array(optionSchema),
});

export const predictOutputPayloadSchema = sqlContextSchema.extend({ code: z.string() });

const challengeBaseSchema = z.object({
  id: idSchema,
  order: z.number().int(),
  language: z.enum(CHALLENGE_LANGUAGES),
  statement: z.string(),
  _count: z.object({ hints: z.number().int() }),
});

export const playerChallengeSchema = z.discriminatedUnion('type', [
  challengeBaseSchema.extend({
    type: z.literal('multiple_choice'),
    payload: multipleChoicePayloadSchema,
  }),
  challengeBaseSchema.extend({
    type: z.literal('order_blocks'),
    payload: orderBlocksPayloadSchema,
  }),
  challengeBaseSchema.extend({ type: z.literal('fill_code'), payload: fillCodePayloadSchema }),
  challengeBaseSchema.extend({ type: z.literal('find_bug'), payload: findBugPayloadSchema }),
  challengeBaseSchema.extend({
    type: z.literal('predict_output'),
    payload: predictOutputPayloadSchema,
  }),
]);

export const levelForPlayerSchema = z.object({
  id: idSchema,
  order: z.number().int(),
  title: z.string(),
  initialLives: z.number().int(),
  zone: z.object({ id: idSchema, slug: z.string(), name: z.string() }),
  challenges: z.array(playerChallengeSchema),
});

export const zoneTheorySchema = z.object({
  id: idSchema,
  name: z.string(),
  videoUrl: z.string().nullable(),
  theorySummary: z.string(),
});

export type LevelSummary = z.infer<typeof levelSummarySchema>;
export type ZoneWithLevels = z.infer<typeof zoneWithLevelsSchema>;
export type LevelForPlayer = z.infer<typeof levelForPlayerSchema>;
export type PlayerChallenge = z.infer<typeof playerChallengeSchema>;
export type SqlTable = z.infer<typeof sqlTableSchema>;
export type ZoneTheory = z.infer<typeof zoneTheorySchema>;
export type ChallengeOfType<TType extends PlayerChallenge['type']> = Extract<
  PlayerChallenge,
  { type: TType }
>;
