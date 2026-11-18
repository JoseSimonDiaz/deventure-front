import { useNavigate } from 'react-router';
import { COPY } from '@/shared/constants/copy';
import { LIMITS } from '@/shared/constants/limits';
import { buildLevelPath } from '@/shared/constants/routes';
import type { LevelProgress } from '@/shared/contracts/progress';
import { Button } from '@/shared/ui/Button';
import { StarRating } from '@/shared/ui/StarRating';
import { formatDate } from '@/shared/utils/formatDate';

type LevelRowProps = { level: LevelProgress };

export function LevelRow({ level }: LevelRowProps) {
  const navigate = useNavigate();
  const bestStars = level.bestStars ?? 0;
  const canImprove = level.status === 'completed' && bestStars < LIMITS.maxStars;

  const handlePlay = () => {
    void navigate(buildLevelPath(level.levelId));
  };

  return (
    <li className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-fjord-900 p-3">
      <div className="flex flex-col gap-1">
        <p className="font-heading font-bold text-frost">
          {COPY.zones.levelLabel(level.order, level.title)}
        </p>
        <p className="font-code text-sm text-mist">
          {COPY.progress.statusLabels[level.status]}
          {level.attemptsCount ? ` · ${COPY.progress.attempts(level.attemptsCount)}` : ''}
          {level.lastPlayedAt
            ? ` · ${COPY.progress.lastPlayed(formatDate(level.lastPlayedAt))}`
            : ''}
        </p>
        {level.status === 'completed' && (
          <StarRating stars={bestStars} label={COPY.won.starsLabel(bestStars)} />
        )}
      </div>
      {canImprove && (
        <Button variant="gold" onClick={handlePlay} className="text-base">
          {COPY.progress.improve}
        </Button>
      )}
      {level.status === 'available' && (
        <Button variant="aurora" onClick={handlePlay} className="text-base">
          {COPY.progress.play}
        </Button>
      )}
    </li>
  );
}
