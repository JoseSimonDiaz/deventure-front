import { motion } from 'motion/react';
import { ILLUSTRATIONS, ILLUSTRATION_SIZES } from '@/shared/constants/illustrations';
import { usePointerParallax } from '@/shared/motion/usePointerParallax';

type DrakkarProps = { className?: string };

const DRAKKAR_PARALLAX_PX = 28;
const ROCKING = { rotate: [-3, 3, -3], y: [0, -10, 0] };
const ROCKING_TRANSITION = { duration: 6, repeat: Infinity, ease: 'easeInOut' } as const;

export function Drakkar({ className = '' }: DrakkarProps) {
  const { offsetX, offsetY } = usePointerParallax(DRAKKAR_PARALLAX_PX);
  const shipStyle = { x: offsetX, y: offsetY };

  return (
    <motion.div aria-hidden="true" style={shipStyle} className={className}>
      <motion.img
        src={ILLUSTRATIONS.drakkar}
        alt=""
        width={ILLUSTRATION_SIZES.drakkar.width}
        height={ILLUSTRATION_SIZES.drakkar.height}
        draggable={false}
        decoding="async"
        animate={ROCKING}
        transition={ROCKING_TRANSITION}
        className="h-auto w-full drop-shadow-[0_24px_24px_var(--color-fjord-950)] select-none"
      />
    </motion.div>
  );
}
