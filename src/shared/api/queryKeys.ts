import type { GalleryFilters } from '@/shared/contracts/rewards';

export const queryKeys = {
  account: { me: ['account', 'me'] as const, settings: ['account', 'settings'] as const },
  levels: { detail: (levelId: string) => ['levels', 'detail', levelId] as const },
  theory: { zone: (zoneId: string) => ['theory', zoneId] as const },
  progress: {
    all: ['progress'] as const,
    summary: ['progress', 'summary'] as const,
    seenTheory: ['progress', 'seen-theory'] as const,
  },
  rewards: {
    all: ['rewards'] as const,
    gallery: (filters: GalleryFilters) => ['rewards', 'gallery', filters] as const,
  },
  admin: {
    zones: ['admin', 'zones'] as const,
    levelChallenges: (levelId: string) => ['admin', 'level-challenges', levelId] as const,
    stats: ['admin', 'stats'] as const,
  },
};
