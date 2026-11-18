import type { RewardRarity } from '@/shared/contracts/rewards';

export const RARITY_CLASSES: Record<RewardRarity, string> = {
  common: 'border-mist',
  rare: 'border-aurora',
  epic: 'border-valkyrie',
};
