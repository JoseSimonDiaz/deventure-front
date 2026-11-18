import { motion } from 'motion/react';
import { COPY } from '@/shared/constants/copy';

const LOGO_START = { scale: 1.6, opacity: 0, rotate: -6 };
const LOGO_LANDED = { scale: 1, opacity: 1, rotate: 0 };
const HAMMER_SPRING = { type: 'spring', stiffness: 420, damping: 12 } as const;
const SHOCKWAVE_START = { scale: 0.2, opacity: 0.7 };
const SHOCKWAVE_END = { scale: 2.4, opacity: 0 };
const SHOCKWAVE_TRANSITION = { duration: 0.7, delay: 0.25, ease: 'easeOut' } as const;

export function HomeLogo() {
  return (
    <div className="relative flex flex-col items-center gap-3 text-center">
      <motion.span
        aria-hidden="true"
        initial={SHOCKWAVE_START}
        animate={SHOCKWAVE_END}
        transition={SHOCKWAVE_TRANSITION}
        className="absolute top-1/2 left-1/2 -mt-16 -ml-16 h-32 w-32 rounded-full border-4 border-rune-gold"
      />
      <motion.h1
        initial={LOGO_START}
        animate={LOGO_LANDED}
        transition={HAMMER_SPRING}
        className="font-display text-5xl text-rune-gold [text-shadow:0_2px_0_var(--color-rune-gold-deep),0_4px_0_var(--color-rune-gold-deep),0_6px_0_var(--color-ember-deep),0_8px_0_var(--color-ember-deep),0_18px_28px_var(--color-fjord-950)] sm:text-7xl"
      >
        {COPY.app.name}
      </motion.h1>
      <p className="font-heading text-lg text-aurora [text-shadow:0_2px_12px_var(--color-night)] sm:text-xl">
        {COPY.app.tagline}
      </p>
    </div>
  );
}
