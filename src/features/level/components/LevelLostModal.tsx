import { COPY } from '@/shared/constants/copy';
import { LIMITS } from '@/shared/constants/limits';
import { Bjorn } from '@/shared/illustrations/Bjorn';
import { Button } from '@/shared/ui/Button';
import { Modal } from '@/shared/ui/Modal';

type LevelLostModalProps = {
  isOpen: boolean;
  lossCount: number;
  isRetrying: boolean;
  onRetry: () => void;
  onReviewTheory: () => void;
  onBackToMap: () => void;
};

export function LevelLostModal({
  isOpen,
  lossCount,
  isRetrying,
  onRetry,
  onReviewTheory,
  onBackToMap,
}: LevelLostModalProps) {
  const hasLostRepeatedly = lossCount >= LIMITS.repeatedLossThreshold;

  return (
    <Modal isOpen={isOpen} title={COPY.lost.title} onClose={onBackToMap}>
      <div className="flex flex-col items-center gap-4 text-center">
        <Bjorn mood="worried" className="w-28" />
        <p className="text-lg text-frost">{COPY.encouragement.onLevelLost}</p>
        {hasLostRepeatedly && <p className="text-mist">{COPY.encouragement.onLevelLostRepeated}</p>}
        <div className="flex w-full flex-col gap-3">
          <Button variant="gold" onClick={onRetry} disabled={isRetrying}>
            {COPY.lost.retry}
          </Button>
          {hasLostRepeatedly && (
            <Button variant="aurora" onClick={onReviewTheory}>
              {COPY.lost.reviewTheory}
            </Button>
          )}
          <Button variant="ghost" onClick={onBackToMap}>
            {COPY.level.backToMap}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
