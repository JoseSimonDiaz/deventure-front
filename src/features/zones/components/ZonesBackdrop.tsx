import { motion, useScroll, useTransform } from 'motion/react';
import { ILLUSTRATIONS } from '@/shared/constants/illustrations';
import { Fog } from '@/shared/illustrations/Fog';

const SCROLL_RANGE = [0, 1];
const MAP_DRIFT = ['0%', '-20%'];

export function ZonesBackdrop() {
  const { scrollYProgress } = useScroll();
  const mapY = useTransform(scrollYProgress, SCROLL_RANGE, MAP_DRIFT);
  const mapStyle = { y: mapY };

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
      <motion.img
        src={ILLUSTRATIONS.sagaMap}
        alt=""
        draggable={false}
        decoding="async"
        style={mapStyle}
        className="absolute inset-x-0 top-0 h-[125%] w-full object-cover opacity-80"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-night)_0%,transparent_75%)] opacity-80" />
      <Fog />
    </div>
  );
}
