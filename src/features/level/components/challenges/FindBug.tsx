import { useState } from 'react';
import type { ChallengeInputProps } from '@/features/level/components/challenges/challengeInputProps';
import { COPY } from '@/shared/constants/copy';

const NO_LINE = -1;

export function FindBug({
  challenge,
  isLocked,
  isCorrect,
  wrongDetails,
  onAnswerChange,
}: ChallengeInputProps<'find_bug'>) {
  const [selectedLine, setSelectedLine] = useState(NO_LINE);
  const [selectedFixId, setSelectedFixId] = useState('');

  const reportAnswer = (line: number, fixOptionId: string) => {
    const isComplete = line !== NO_LINE && Boolean(fixOptionId);
    onAnswerChange(isComplete ? { type: 'find_bug', line, fixOptionId } : null);
  };
  const handleSelectLine = (lineIndex: number) => () => {
    setSelectedLine(lineIndex);
    reportAnswer(lineIndex, selectedFixId);
  };
  const handleSelectFix = (fixOptionId: string) => () => {
    setSelectedFixId(fixOptionId);
    reportAnswer(selectedLine, fixOptionId);
  };

  const lineTone = (lineIndex: number) => {
    if (lineIndex !== selectedLine) return 'border-transparent hover:bg-fjord-700';
    if (isCorrect) return 'border-aurora bg-aurora-deep';
    if (wrongDetails?.isLineCorrect === false) return 'border-ember bg-ember-deep';
    return 'border-rune-gold bg-fjord-700';
  };
  const fixTone = (fixOptionId: string) => {
    if (fixOptionId !== selectedFixId) return 'border-fjord-600 bg-fjord-800 hover:border-aurora';
    if (isCorrect) return 'border-aurora bg-aurora-deep';
    if (wrongDetails?.isLineCorrect) return 'border-ember bg-ember-deep';
    return 'border-rune-gold bg-fjord-700';
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="font-code text-sm font-semibold text-mist uppercase">
        {COPY.challenges.pickBugLine}
      </p>
      <ol className="flex flex-col rounded-xl border-2 border-fjord-600 bg-fjord-950 p-2">
        {challenge.payload.lines.map((codeLine, lineIndex) => (
          <li key={lineIndex}>
            <button
              type="button"
              disabled={isLocked}
              aria-pressed={lineIndex === selectedLine}
              onClick={handleSelectLine(lineIndex)}
              aria-label={COPY.challenges.bugLineLabel(lineIndex + 1, codeLine)}
              className={`flex min-h-11 w-full items-center gap-3 rounded-lg border-2 px-2 text-left font-code text-sm ${lineTone(lineIndex)}`}
            >
              <span className="w-6 text-right text-mist">{lineIndex + 1}</span>
              <span className="whitespace-pre text-frost">{codeLine}</span>
            </button>
          </li>
        ))}
      </ol>
      {selectedLine !== NO_LINE && (
        <div className="flex flex-col gap-2">
          <p className="font-code text-sm font-semibold text-mist uppercase">
            {COPY.challenges.pickFix}
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {challenge.payload.fixOptions.map((fixOption) => (
              <li key={fixOption.id}>
                <button
                  type="button"
                  disabled={isLocked}
                  aria-pressed={fixOption.id === selectedFixId}
                  onClick={handleSelectFix(fixOption.id)}
                  className={`min-h-12 w-full rounded-xl border-2 px-3 py-2 text-left text-frost ${fixTone(fixOption.id)}`}
                >
                  {fixOption.text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
