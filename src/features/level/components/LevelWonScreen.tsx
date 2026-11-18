import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { StarBurst } from '@/features/level/components/StarBurst';
import { WonRewards } from '@/features/level/components/WonRewards';
import { WonStats } from '@/features/level/components/WonStats';
import { COPY } from '@/shared/constants/copy';
import { ROUTES, buildLevelPath, buildZonesPathWithUnlocked } from '@/shared/constants/routes';
import type { AttemptResult } from '@/shared/contracts/gameplay';
import { Button } from '@/shared/ui/Button';
import { StarRating } from '@/shared/ui/StarRating';
import { useToastStore } from '@/stores/toastStore';

type LevelWonScreenProps = {
  finalResult: AttemptResult;
  isRestarting: boolean;
  onRepeat: () => void;
};

function resolveNextAction(finalResult: AttemptResult): { label: string; path: string } {
  const unlockedLevelId = finalResult.unlockedLevelIds?.[0] ?? '';
  if (finalResult.isLastOfGame) return { label: COPY.won.theEnd, path: ROUTES.theEnd };
  if (finalResult.isLastOfZone) {
    return { label: COPY.won.nextZone, path: buildZonesPathWithUnlocked(unlockedLevelId) };
  }
  return { label: COPY.won.nextLevel, path: buildLevelPath(finalResult.nextLevelId ?? '') };
}

export function LevelWonScreen({ finalResult, isRestarting, onRepeat }: LevelWonScreenProps) {
  const navigate = useNavigate();
  const showToast = useToastStore((state) => state.showToast);
  const result = finalResult.result;
  const nextAction = resolveNextAction(finalResult);

  useEffect(() => {
    showToast(finalResult.progressSaved ? COPY.won.progressSaved : COPY.won.progressNotSaved);
  }, [finalResult.progressSaved, showToast]);

  const handleNext = () => {
    void navigate(nextAction.path);
  };
  const handleBackToMap = () => {
    void navigate(buildZonesPathWithUnlocked(finalResult.unlockedLevelIds?.[0] ?? ''));
  };

  if (!result) return null;

  return (
    <section className="relative mx-auto flex w-full max-w-xl flex-col items-center gap-6 px-4 py-10 text-center">
      <StarBurst />
      <h1 className="font-display text-4xl text-rune-gold">{COPY.won.title}</h1>
      <StarRating
        stars={result.stars}
        label={COPY.won.starsLabel(result.stars)}
        size="lg"
        isAnimated
      />
      {result.isNewBest && (
        <p className="rounded-full bg-rune-gold px-4 py-1 font-heading font-bold text-fjord-950 uppercase">
          {COPY.won.newRecord}
        </p>
      )}
      <WonStats result={result} livesLeft={finalResult.livesLeft} />
      <WonRewards rewards={finalResult.rewardsUnlocked ?? []} />
      <div className="flex w-full flex-col gap-3">
        <Button variant="gold" onClick={handleNext}>
          {nextAction.label}
        </Button>
        <Button variant="ghost" onClick={onRepeat} disabled={isRestarting}>
          {COPY.won.repeat}
        </Button>
        <Button variant="ghost" onClick={handleBackToMap}>
          {COPY.won.backToMap}
        </Button>
      </div>
    </section>
  );
}
