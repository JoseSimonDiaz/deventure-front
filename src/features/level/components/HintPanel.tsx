import { Lightbulb } from 'lucide-react';
import { COPY } from '@/shared/constants/copy';
import type { Hint } from '@/shared/contracts/gameplay';
import { Button } from '@/shared/ui/Button';

type HintPanelProps = {
  hintsTotal: number;
  hints: Hint[];
  isLoading: boolean;
  isDisabled: boolean;
  onAskHint: () => void;
};

const HINT_ICON = <Lightbulb aria-hidden="true" className="h-5 w-5" />;

export function HintPanel({ hintsTotal, hints, isLoading, isDisabled, onAskHint }: HintPanelProps) {
  if (!hintsTotal) return null;
  const remaining = hintsTotal - hints.length;

  return (
    <div className="flex flex-col gap-3">
      <Button
        variant="ghost"
        icon={HINT_ICON}
        onClick={onAskHint}
        disabled={isDisabled || isLoading || remaining <= 0}
        className="self-start normal-case"
      >
        {remaining > 0 ? COPY.hints.button(remaining) : COPY.hints.noMore}
      </Button>
      {hints.length > 0 && (
        <section
          aria-label={COPY.hints.title}
          className="rounded-2xl border-2 border-rune-gold/40 bg-fjord-800 p-4"
        >
          <h3 className="mb-2 font-code text-sm font-semibold text-rune-gold uppercase">
            {COPY.hints.title}
          </h3>
          <ol className="flex flex-col gap-2">
            {hints.map((hint) => (
              <li key={hint.order} className="text-frost">
                <span className="font-code text-sm text-rune-gold">
                  {COPY.hints.hintNumber(hint.order)}:
                </span>{' '}
                {hint.text}
              </li>
            ))}
          </ol>
        </section>
      )}
    </div>
  );
}
