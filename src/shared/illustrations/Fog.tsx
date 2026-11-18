import { motion } from 'motion/react';

const FOG_DRIFT = { x: [-60, 60, -60] };
const FOG_TRANSITION = { duration: 24, repeat: Infinity, ease: 'easeInOut' } as const;

export function Fog() {
  return (
    <motion.div
      aria-hidden="true"
      animate={FOG_DRIFT}
      transition={FOG_TRANSITION}
      className="pointer-events-none absolute inset-x-0 top-1/3 h-64 bg-[radial-gradient(ellipse_at_center,var(--color-frost)_0%,transparent_70%)] opacity-10"
    />
  );
}
