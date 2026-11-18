import { useMemo, useState } from 'react';
import type { ChallengeInputProps } from '@/features/level/components/challenges/challengeInputProps';
import { shuffleItems } from '@/shared/utils/shuffleItems';

const OPTION_LETTERS = 'ABCDEF';

export function MultipleChoice({
  challenge,
  isLocked,
  isCorrect,
  wrongDetails,
  onAnswerChange,
}: ChallengeInputProps<'multiple_choice'>) {
  const options = useMemo(
    () => shuffleItems(challenge.payload.options),
    [challenge.payload.options],
  );
  const [selectedOptionId, setSelectedOptionId] = useState('');

  const handleSelect = (optionId: string) => () => {
    setSelectedOptionId(optionId);
    onAnswerChange({ type: 'multiple_choice', optionId });
  };

  const optionTone = (optionId: string) => {
    if (optionId !== selectedOptionId) return 'border-fjord-600 bg-fjord-800 hover:border-aurora';
    if (isCorrect) return 'border-aurora bg-aurora-deep';
    if (wrongDetails) return 'border-ember bg-ember-deep';
    return 'border-rune-gold bg-fjord-700 ring-4 ring-rune-gold/40';
  };

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {options.map((option, optionIndex) => (
        <li key={option.id}>
          <button
            type="button"
            disabled={isLocked}
            aria-pressed={option.id === selectedOptionId}
            onClick={handleSelect(option.id)}
            className={`flex h-full min-h-14 w-full items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left text-lg text-frost transition-colors disabled:cursor-default ${optionTone(option.id)}`}
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-fjord-950 font-code font-bold text-rune-gold">
              {OPTION_LETTERS.charAt(optionIndex)}
            </span>
            <span>{option.text}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
