import type { Variants } from 'motion/react';

export const pageTransition: Variants = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: { opacity: 0, x: -40, transition: { duration: 0.25, ease: 'easeIn' } },
};

export const staggerList: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

export const popInItem: Variants = {
  hidden: { opacity: 0, scale: 0.6, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 380, damping: 18 },
  },
};

export const SHAKE_KEYFRAMES = [0, -14, 14, -10, 10, -4, 0];
