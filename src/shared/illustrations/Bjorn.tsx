import { motion } from 'motion/react';
import { ILLUSTRATIONS, ILLUSTRATION_SIZES } from '@/shared/constants/illustrations';
import { BJORN_MOTIONS, type BjornMood } from '@/shared/illustrations/bjornMotions';

type BjornProps = { mood?: BjornMood; className?: string };

const ORIGIN_BOTTOM = { transformOrigin: 'bottom' } as const;

export function Bjorn({ mood = 'idle', className = '' }: BjornProps) {
  const bjornMotion = BJORN_MOTIONS[mood];

  return (
    <motion.img
      src={ILLUSTRATIONS.bjorn[mood]}
      alt=""
      aria-hidden="true"
      width={ILLUSTRATION_SIZES.bjorn.width}
      height={ILLUSTRATION_SIZES.bjorn.height}
      draggable={false}
      decoding="async"
      animate={bjornMotion.animation}
      transition={bjornMotion.transition}
      style={ORIGIN_BOTTOM}
      className={`h-auto drop-shadow-[0_10px_14px_var(--color-fjord-950)] select-none ${className}`}
    />
  );
}
