const LOSS_KEY_PREFIX = 'deventure-lost-';

const lossKey = (levelId: string) => `${LOSS_KEY_PREFIX}${levelId}`;

export function registerLevelLoss(levelId: string): number {
  const lossCount = Number(sessionStorage.getItem(lossKey(levelId)) ?? 0) + 1;
  sessionStorage.setItem(lossKey(levelId), String(lossCount));
  return lossCount;
}

export function clearLevelLosses(levelId: string): void {
  sessionStorage.removeItem(lossKey(levelId));
}
