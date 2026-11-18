import { motion } from 'motion/react';
import { ILLUSTRATIONS } from '@/shared/constants/illustrations';
import { usePointerParallax } from '@/shared/motion/usePointerParallax';

type FjordBackdropProps = { isDimmed?: boolean };

const BACKDROP_PARALLAX_PX = 14;
const KEN_BURNS = { scale: [1.04, 1.1, 1.04] };
const KEN_BURNS_TRANSITION = { duration: 40, repeat: Infinity, ease: 'easeInOut' } as const;

export function FjordBackdrop({ isDimmed = false }: FjordBackdropProps) {
  const { offsetX, offsetY } = usePointerParallax(BACKDROP_PARALLAX_PX);
  const imageStyle = { x: offsetX, y: offsetY };

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.img
        src={ILLUSTRATIONS.fjordNight}
        alt=""
        draggable={false}
        decoding="async"
        style={imageStyle}
        animate={KEN_BURNS}
        transition={KEN_BURNS_TRANSITION}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-b from-night/50 via-transparent to-night" />
      {isDimmed && <div className="absolute inset-0 bg-night/70 backdrop-blur-[2px]" />}
    </div>
  );
}
