import type { RuneGlyph } from '@/shared/illustrations/runeGlyphs';

const RUNE_PATHS: Record<RuneGlyph, string> = {
  fehu: 'M8 2V22M8 8L16 3M8 13L16 8',
  ansuz: 'M8 2V22M8 4L16 9M8 10L16 15',
  raido: 'M7 2V22M7 2L15 7L7 12L15 22',
  kenaz: 'M15 3L7 12L15 21',
  thurisaz: 'M8 2V22M8 7L15 12L8 17',
  algiz: 'M12 2V22M12 12L5 5M12 12L19 5',
};

type RuneProps = { glyph: RuneGlyph; className?: string };

export function Rune({ glyph, className = '' }: RuneProps) {
  const runePath = RUNE_PATHS[glyph];

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`overflow-visible drop-shadow-[0_0_5px_currentColor] ${className}`}
    >
      <path
        d={runePath}
        transform="translate(0.7 0.9)"
        fill="none"
        stroke="var(--color-fjord-950)"
        strokeOpacity="0.7"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={runePath}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={runePath}
        transform="translate(-0.4 -0.5)"
        fill="none"
        stroke="var(--color-frost)"
        strokeOpacity="0.55"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
