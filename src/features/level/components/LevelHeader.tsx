import { BookOpen, Heart, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { COPY } from '@/shared/constants/copy';
import { SHAKE_KEYFRAMES } from '@/shared/motion/transitions';
import { Button } from '@/shared/ui/Button';
import { ProgressBar } from '@/shared/ui/ProgressBar';

type LevelHeaderProps = {
  currentIndex: number;
  total: number;
  livesLeft: number;
  initialLives: number;
  onExit: () => void;
  onOpenTheory: () => void;
};

const EXIT_ICON = <X aria-hidden="true" />;
const THEORY_ICON = <BookOpen aria-hidden="true" />;
const LOST_HEART = { x: SHAKE_KEYFRAMES, opacity: 0.35 };
const PERCENT_MAX = 100;

export function LevelHeader({
  currentIndex,
  total,
  livesLeft,
  initialLives,
  onExit,
  onOpenTheory,
}: LevelHeaderProps) {
  const heartSlots = Array.from({ length: initialLives }, (_, slotIndex) => slotIndex);
  const challengeNumber = Math.min(currentIndex + 1, total);

  return (
    <header className="sticky top-0 z-20 flex flex-col gap-3 border-b-2 border-fjord-700 bg-fjord-900/95 px-4 py-3 backdrop-blur-md">
      <div className="flex items-center justify-between gap-3">
        <Button variant="ghost" onClick={onExit} icon={EXIT_ICON} className="w-12 px-0!">
          <span className="sr-only">{COPY.level.exit}</span>
        </Button>
        <p className="font-heading text-lg font-bold text-frost">
          {COPY.level.challengeOf(challengeNumber, total)}
        </p>
        <div role="img" aria-label={COPY.level.lives(livesLeft)} className="flex gap-1">
          <AnimatePresence initial={false}>
            {heartSlots.map((slotIndex) => (
              <motion.span key={slotIndex} animate={slotIndex < livesLeft ? undefined : LOST_HEART}>
                <Heart
                  aria-hidden="true"
                  className={`h-7 w-7 ${slotIndex < livesLeft ? 'fill-ember text-ember' : 'text-fjord-500'}`}
                />
              </motion.span>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <ProgressBar percent={(currentIndex / Math.max(total, 1)) * PERCENT_MAX} tone="aurora" />
        </div>
        <Button
          variant="ghost"
          onClick={onOpenTheory}
          icon={THEORY_ICON}
          className="px-3 text-sm normal-case"
        >
          <span className="sr-only sm:not-sr-only">{COPY.theory.reviewButton}</span>
        </Button>
      </div>
    </header>
  );
}
