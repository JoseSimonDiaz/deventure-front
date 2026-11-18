import { motion } from 'motion/react';

type RuneSkeletonProps = { label: string };

const GLOW_ANIMATION = { opacity: [0.3, 1, 0.3] };
const GLOW_TRANSITION = { duration: 1.6, repeat: Infinity };

export function RuneSkeleton({ label }: RuneSkeletonProps) {
  return (
    <div role="status" className="flex flex-col items-center gap-3 py-10">
      <motion.span
        aria-hidden="true"
        animate={GLOW_ANIMATION}
        transition={GLOW_TRANSITION}
        className="font-display text-5xl text-aurora"
      >
        ᚱᚢᚾᛖ
      </motion.span>
      <span className="text-mist">{label}</span>
    </div>
  );
}
