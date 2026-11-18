import { motion } from 'motion/react';

const PARTICLE_COUNT = 18;
const FULL_TURN_DEGREES = 360;
const BURST_RADIUS_PX = 160;
const PARTICLE_GLYPHS = ['★', '✦', 'ᚱ', '✧'];
const PARTICLE_TRANSITION = { duration: 1.2, ease: 'easeOut' } as const;
const PARTICLE_START = { opacity: 1, x: 0, y: 0, scale: 0.4 };

const PARTICLES = Array.from({ length: PARTICLE_COUNT }, (_, particleIndex) => {
  const angle = (particleIndex / PARTICLE_COUNT) * FULL_TURN_DEGREES * (Math.PI / 180);
  return {
    particleIndex,
    glyph: PARTICLE_GLYPHS[particleIndex % PARTICLE_GLYPHS.length],
    target: {
      opacity: 0,
      x: Math.cos(angle) * BURST_RADIUS_PX,
      y: Math.sin(angle) * BURST_RADIUS_PX,
      scale: 1.2,
    },
  };
});

export function StarBurst() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 grid place-items-center"
    >
      {PARTICLES.map((particle) => (
        <motion.span
          key={particle.particleIndex}
          initial={PARTICLE_START}
          animate={particle.target}
          transition={PARTICLE_TRANSITION}
          className="absolute font-display text-2xl text-rune-gold"
        >
          {particle.glyph}
        </motion.span>
      ))}
    </div>
  );
}
