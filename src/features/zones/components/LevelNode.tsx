import { Check, Lock } from 'lucide-react';
import { motion } from 'motion/react';
import { COPY } from '@/shared/constants/copy';
import type { LevelProgress, LevelStatus } from '@/shared/contracts/progress';
import { RuneStone } from '@/shared/illustrations/RuneStone';
import type { RuneGlyph } from '@/shared/illustrations/runeGlyphs';
import { popInItem } from '@/shared/motion/transitions';
import { playRuneClick } from '@/shared/sound/soundEffects';
import { StarRating } from '@/shared/ui/StarRating';

type LevelNodeProps = {
  level: LevelProgress;
  glyph: RuneGlyph;
  alignment: 'start' | 'end';
  isJustUnlocked: boolean;
  onSelectLevel: (level: LevelProgress) => void;
};

const NODE_HOVER = { scale: 1.08, rotate: -3 };
const NODE_PRESS = { scale: 0.94, y: 4 };
const AVAILABLE_FLOAT = { y: [0, -6, 0] };
const AVAILABLE_FLOAT_TRANSITION = { duration: 3, repeat: Infinity, ease: 'easeInOut' } as const;
const UNLOCK_BURST = { scale: [0.8, 1.2, 1], opacity: [0.4, 1, 1] };
const UNLOCK_TRANSITION = { duration: 0.8, ease: 'easeOut' } as const;

const STATUS_CLASSES: Record<LevelStatus, string> = {
  locked: 'border-fjord-500 bg-fjord-800 text-fjord-500 cursor-not-allowed',
  available: 'border-rune-gold bg-fjord-700 text-rune-gold ring-4 ring-rune-gold/40',
  completed: 'border-aurora bg-aurora-deep text-aurora',
};

function buildLevelLabel(level: LevelProgress): string {
  if (level.status === 'locked') return COPY.zones.lockedLevelLabel(level.order, level.title);
  if (level.status === 'completed') {
    return COPY.zones.completedLevelLabel(level.order, level.title, level.bestStars ?? 0);
  }
  return COPY.zones.levelLabel(level.order, level.title);
}

export function LevelNode({
  level,
  glyph,
  alignment,
  isJustUnlocked,
  onSelectLevel,
}: LevelNodeProps) {
  const handleSelect = () => {
    playRuneClick();
    onSelectLevel(level);
  };

  const isAvailable = level.status === 'available';

  return (
    <motion.li
      id={`level-${level.levelId}`}
      variants={popInItem}
      className={`flex items-center gap-4 ${alignment === 'end' ? 'flex-row-reverse text-right' : ''}`}
    >
      <motion.div
        animate={isAvailable ? AVAILABLE_FLOAT : undefined}
        transition={AVAILABLE_FLOAT_TRANSITION}
      >
        <motion.button
          type="button"
          onClick={handleSelect}
          whileHover={level.status === 'locked' ? undefined : NODE_HOVER}
          whileTap={NODE_PRESS}
          animate={isJustUnlocked ? UNLOCK_BURST : undefined}
          transition={UNLOCK_TRANSITION}
          aria-label={buildLevelLabel(level)}
          className={`grid h-20 w-20 shrink-0 place-items-center rounded-full border-4 shadow-chunky ${STATUS_CLASSES[level.status]}`}
        >
          {level.status === 'locked' && <Lock aria-hidden="true" className="h-8 w-8" />}
          {level.status === 'available' && (
            <RuneStone glyph={glyph} shape="medallion" className="w-16" />
          )}
          {level.status === 'completed' && <Check aria-hidden="true" className="h-9 w-9" />}
        </motion.button>
      </motion.div>
      <div aria-hidden="true" className="flex flex-col gap-1 rounded-xl bg-fjord-900/80 px-3 py-2">
        <p className="font-code text-sm font-semibold text-aurora uppercase">
          {COPY.zones.levelNumber(level.order)}
        </p>
        <p className="font-heading text-lg leading-tight font-bold text-frost">{level.title}</p>
        {level.status === 'completed' && (
          <StarRating
            stars={level.bestStars ?? 0}
            label={COPY.won.starsLabel(level.bestStars ?? 0)}
          />
        )}
      </div>
    </motion.li>
  );
}
