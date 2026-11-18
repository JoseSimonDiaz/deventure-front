import { ILLUSTRATIONS, ILLUSTRATION_SIZES } from '@/shared/constants/illustrations';
import { Rune } from '@/shared/illustrations/Rune';
import type { RuneGlyph } from '@/shared/illustrations/runeGlyphs';

type RuneStoneShape = 'standing' | 'medallion';
type RuneStoneTone = 'aurora' | 'ember';

type RuneStoneProps = {
  glyph: RuneGlyph;
  shape?: RuneStoneShape;
  tone?: RuneStoneTone;
  className?: string;
};

const RUNE_STONE_SHAPES = {
  standing: {
    src: ILLUSTRATIONS.runestone,
    size: ILLUSTRATION_SIZES.runestone,
    glyphClassName: 'top-[30%] w-1/2',
  },
  medallion: {
    src: ILLUSTRATIONS.runeMedallion,
    size: ILLUSTRATION_SIZES.runeMedallion,
    glyphClassName: 'top-[22%] w-[56%]',
  },
} as const;

const RUNE_TONE_CLASSES: Record<RuneStoneTone, string> = {
  aurora: 'text-aurora',
  ember: 'text-ember',
};

export function RuneStone({
  glyph,
  shape = 'standing',
  tone = 'aurora',
  className = '',
}: RuneStoneProps) {
  const stone = RUNE_STONE_SHAPES[shape];

  return (
    <span aria-hidden="true" className={`relative inline-block ${className}`}>
      <img
        src={stone.src}
        alt=""
        width={stone.size.width}
        height={stone.size.height}
        draggable={false}
        decoding="async"
        className="h-auto w-full drop-shadow-[0_8px_10px_var(--color-fjord-950)] select-none"
      />
      <Rune
        glyph={glyph}
        className={`absolute left-1/2 -translate-x-1/2 ${stone.glyphClassName} ${RUNE_TONE_CLASSES[tone]}`}
      />
    </span>
  );
}
