type ProgressBarProps = { percent: number; tone?: 'gold' | 'aurora' };

const PERCENT_MAX = 100;
const TONE_CLASSES = { gold: 'bg-rune-gold', aurora: 'bg-aurora' } as const;

export function ProgressBar({ percent, tone = 'gold' }: ProgressBarProps) {
  return (
    <div aria-hidden="true" className="h-2.5 overflow-hidden rounded-full bg-fjord-950">
      <div
        className={`h-full origin-left rounded-full transition-transform duration-500 motion-reduce:transition-none ${TONE_CLASSES[tone]}`}
        style={{ transform: `scaleX(${Math.min(percent, PERCENT_MAX) / PERCENT_MAX})` }}
      />
    </div>
  );
}
