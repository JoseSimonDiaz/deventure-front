import { motion } from 'motion/react';

type LevelConnectorProps = { direction: 'toRight' | 'toLeft'; isLeadingToLocked: boolean };

const CONNECTOR_PATHS = {
  toRight: 'M22 0C22 46 278 14 278 60',
  toLeft: 'M278 0C278 46 22 14 22 60',
} as const;

const PATH_HIDDEN = { pathLength: 0, opacity: 0 };
const PATH_DRAWN = { pathLength: 1, opacity: 1 };
const DRAW_TRANSITION = { duration: 0.8, ease: 'easeInOut' } as const;
const DRAW_ONCE = { once: true };
const LOCKED_PATH_DASH = '2 12';

export function LevelConnector({ direction, isLeadingToLocked }: LevelConnectorProps) {
  return (
    <svg viewBox="0 0 300 60" preserveAspectRatio="none" aria-hidden="true" className="h-14 w-full">
      {isLeadingToLocked ? (
        <path
          d={CONNECTOR_PATHS[direction]}
          fill="none"
          stroke="var(--color-fjord-500)"
          strokeWidth="4"
          strokeDasharray={LOCKED_PATH_DASH}
          strokeLinecap="round"
        />
      ) : (
        <motion.path
          d={CONNECTOR_PATHS[direction]}
          fill="none"
          stroke="var(--color-aurora)"
          strokeWidth="4"
          strokeLinecap="round"
          initial={PATH_HIDDEN}
          whileInView={PATH_DRAWN}
          viewport={DRAW_ONCE}
          transition={DRAW_TRANSITION}
        />
      )}
    </svg>
  );
}
