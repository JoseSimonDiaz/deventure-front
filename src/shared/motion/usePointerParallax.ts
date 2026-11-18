import { useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import { useEffect } from 'react';

const PARALLAX_SPRING = { stiffness: 60, damping: 18, mass: 0.6 };
const POINTER_RANGE = [-1, 1];

function toCenteredRatio(position: number, size: number) {
  return (position / size) * 2 - 1;
}

export function usePointerParallax(maxOffset: number) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, PARALLAX_SPRING);
  const smoothY = useSpring(pointerY, PARALLAX_SPRING);
  const offsetX = useTransform(smoothX, POINTER_RANGE, [maxOffset, -maxOffset]);
  const offsetY = useTransform(smoothY, POINTER_RANGE, [maxOffset, -maxOffset]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const handlePointerMove = (event: PointerEvent) => {
      pointerX.set(toCenteredRatio(event.clientX, window.innerWidth));
      pointerY.set(toCenteredRatio(event.clientY, window.innerHeight));
    };
    window.addEventListener('pointermove', handlePointerMove);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, [prefersReducedMotion, pointerX, pointerY]);

  return { offsetX, offsetY };
}
