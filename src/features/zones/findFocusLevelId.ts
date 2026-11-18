import type { ZoneProgress } from '@/shared/contracts/progress';

export function findFocusLevelId(zones: readonly ZoneProgress[]): string {
  const availableLevel = zones
    .flatMap((zone) => zone.levels)
    .find((level) => level.status === 'available');
  return availableLevel?.levelId ?? '';
}
