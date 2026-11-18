import type { TargetAndTransition, Transition } from 'motion/react';

export type BjornMood = 'idle' | 'happy' | 'talking' | 'worried' | 'thinking' | 'cheering';

type BjornMotion = { animation: TargetAndTransition; transition: Transition };

const BREATHING: BjornMotion = {
  animation: { scaleY: [1, 1.015, 1], y: [0, -2, 0] },
  transition: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
};
const HOPPING: BjornMotion = {
  animation: { y: [0, -6, 0] },
  transition: { duration: 1.4, repeat: Infinity, ease: 'easeInOut' },
};
const TALKING: BjornMotion = {
  animation: { y: [0, -3, 0], rotate: [0, -1, 0] },
  transition: { duration: 0.6, repeat: Infinity, ease: 'easeInOut' },
};
const SWAYING: BjornMotion = {
  animation: { rotate: [-2, 2, -2] },
  transition: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' },
};
const PONDERING: BjornMotion = {
  animation: { rotate: [0, -2.5, 0], y: [0, -2, 0] },
  transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
};
const JUMPING: BjornMotion = {
  animation: { y: [0, -14, 0], scaleY: [1, 1.04, 1] },
  transition: { duration: 0.7, repeat: Infinity, ease: 'easeOut' },
};

export const BJORN_MOTIONS: Record<BjornMood, BjornMotion> = {
  idle: BREATHING,
  happy: HOPPING,
  talking: TALKING,
  worried: SWAYING,
  thinking: PONDERING,
  cheering: JUMPING,
};
