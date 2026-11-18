import { motion } from 'motion/react';
import { Rune } from '@/shared/illustrations/Rune';
import { RUNE_GLYPHS } from '@/shared/illustrations/runeGlyphs';

type RuneBurstProps = { onBurstComplete: () => void };

const BURST_RADIUS = 160;
const BURST_START = { x: 0, y: 0, scale: 0.4, opacity: 1 };
const BURST_TRANSITION = { duration: 0.7, ease: 'easeOut' } as const;
const FULL_TURN = Math.PI * 2;

function getBurstTarget(runeIndex: number) {
  const angle = (runeIndex / RUNE_GLYPHS.length) * FULL_TURN;
  return {
    x: Math.cos(angle) * BURST_RADIUS,
    y: Math.sin(angle) * BURST_RADIUS,
    scale: 1.4,
    opacity: 0,
  };
}

export function RuneBurst({ onBurstComplete }: RuneBurstProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 grid place-items-center"
    >
      {RUNE_GLYPHS.map((glyph, runeIndex) => (
        <motion.div
          key={glyph}
          className="absolute w-10 text-rune-gold"
          initial={BURST_START}
          animate={getBurstTarget(runeIndex)}
          transition={BURST_TRANSITION}
          onAnimationComplete={runeIndex === 0 ? onBurstComplete : undefined}
        >
          <Rune glyph={glyph} />
        </motion.div>
      ))}
    </div>
  );
}
