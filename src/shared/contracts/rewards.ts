import { z } from 'zod';
import { idSchema } from '@/shared/contracts/common';

export const REWARD_TYPES = ['art', 'character', 'avatar', 'template'] as const;
export const REWARD_RARITIES = ['common', 'rare', 'epic'] as const;
export const REWARD_STATUSES = ['unlocked', 'locked'] as const;

export const rewardSchema = z.object({
  id: idSchema,
  name: z.string(),
  description: z.string(),
  type: z.enum(REWARD_TYPES),
  rarity: z.enum(REWARD_RARITIES),
  unlocked: z.boolean(),
  imageUrl: z.string().nullable(),
  silhouetteUrl: z.string(),
  unlockedAt: z.string().nullable(),
  isNew: z.boolean(),
  howToUnlock: z.string(),
});

export const gallerySchema = z.object({
  rewards: z.array(rewardSchema),
  total: z.number().int(),
  unlockedCount: z.number().int(),
});

export type Reward = z.infer<typeof rewardSchema>;
export type Gallery = z.infer<typeof gallerySchema>;
export type RewardType = (typeof REWARD_TYPES)[number];
export type RewardRarity = (typeof REWARD_RARITIES)[number];
export type RewardStatus = (typeof REWARD_STATUSES)[number];
export type GalleryFilters = { type?: RewardType; status?: RewardStatus };
