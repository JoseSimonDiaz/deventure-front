import { useNavigate } from 'react-router';
import { useLevelQuery } from '@/shared/content/useLevelQuery';
import { COPY } from '@/shared/constants/copy';
import { buildLevelPath } from '@/shared/constants/routes';
import type { LevelProgress } from '@/shared/contracts/progress';
import { Button } from '@/shared/ui/Button';
import { Modal } from '@/shared/ui/Modal';
import { RuneSkeleton } from '@/shared/ui/RuneSkeleton';
import { StarRating } from '@/shared/ui/StarRating';

type LevelPreviewModalProps = { level: LevelProgress | null; onClose: () => void };

export function LevelPreviewModal({ level, onClose }: LevelPreviewModalProps) {
  const navigate = useNavigate();
  const levelQuery = useLevelQuery(level?.levelId ?? '');

  const handlePlay = () => {
    if (level) void navigate(buildLevelPath(level.levelId));
  };

  const isCompleted = level?.status === 'completed';
  const bestStars = level?.bestStars ?? 0;

  return (
    <Modal isOpen={Boolean(level)} title={level?.title ?? COPY.zones.title} onClose={onClose}>
      {levelQuery.isPending && <RuneSkeleton label={COPY.zones.loading} />}
      {levelQuery.isError && (
        <p role="alert" className="text-ember">
          {COPY.errors.generic}
        </p>
      )}
      {levelQuery.data && (
        <div className="flex flex-col gap-3">
          <p className="font-code text-sm text-aurora uppercase">{levelQuery.data.zone.name}</p>
          <p className="text-lg text-frost">
            {COPY.zones.challengesCount(levelQuery.data.challenges.length)}
          </p>
          {isCompleted ? (
            <div className="flex items-center gap-3">
              <StarRating stars={bestStars} label={COPY.zones.bestResult(bestStars)} />
              <span className="text-mist">{COPY.zones.bestResult(bestStars)}</span>
            </div>
          ) : (
            <p className="text-mist">{COPY.zones.notPlayedYet}</p>
          )}
        </div>
      )}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row-reverse">
        <Button variant="gold" onClick={handlePlay} className="flex-1">
          {isCompleted ? COPY.zones.replay : COPY.zones.play}
        </Button>
        <Button variant="ghost" onClick={onClose} className="flex-1">
          {COPY.zones.close}
        </Button>
      </div>
    </Modal>
  );
}
