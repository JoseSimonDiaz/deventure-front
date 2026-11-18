import { motion } from 'motion/react';
import { FjordBackdrop } from '@/shared/illustrations/FjordBackdrop';
import { RuneStone } from '@/shared/illustrations/RuneStone';
import type { RuneGlyph } from '@/shared/illustrations/runeGlyphs';

type FloatingRune = { glyph: RuneGlyph; placementClass: string; delaySeconds: number };

const FLOATING_RUNES: FloatingRune[] = [
  { glyph: 'fehu', placementClass: 'hidden sm:block left-[8%] top-[18%]', delaySeconds: 0 },
  { glyph: 'ansuz', placementClass: 'hidden sm:block right-[10%] top-[24%]', delaySeconds: 0.8 },
  { glyph: 'raido', placementClass: 'hidden sm:block left-[16%] top-[62%]', delaySeconds: 1.6 },
  { glyph: 'kenaz', placementClass: 'hidden sm:block right-[18%] top-[58%]', delaySeconds: 0.4 },
  { glyph: 'algiz', placementClass: 'right-[28%] top-[78%]', delaySeconds: 1.2 },
];

const FLOAT = { y: [0, -16, 0], rotate: [-4, 4, -4], opacity: [0.55, 0.95, 0.55] };
const FLOAT_DURATION_SECONDS = 5;

function getFloatTransition(delaySeconds: number) {
  return { duration: FLOAT_DURATION_SECONDS, repeat: Infinity, delay: delaySeconds };
}

export function HomeBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <FjordBackdrop />
      {FLOATING_RUNES.map((floatingRune) => (
        <motion.div
          key={floatingRune.glyph}
          className={`absolute w-10 sm:w-14 ${floatingRune.placementClass}`}
          animate={FLOAT}
          transition={getFloatTransition(floatingRune.delaySeconds)}
        >
          <RuneStone glyph={floatingRune.glyph} />
        </motion.div>
      ))}
    </div>
  );
}
