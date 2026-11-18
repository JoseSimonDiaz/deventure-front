import { Fragment, useState, type ChangeEvent } from 'react';
import type { ChallengeInputProps } from '@/features/level/components/challenges/challengeInputProps';
import { COPY } from '@/shared/constants/copy';

type FillCodeBlanksProps = ChallengeInputProps<'fill_code'> & { template: string };

const BLANK_PLACEHOLDER = /\{\{\d+\}\}/;

export function FillCodeBlanks({
  template,
  isLocked,
  isCorrect,
  wrongDetails,
  onAnswerChange,
}: FillCodeBlanksProps) {
  const segments = template.split(BLANK_PLACEHOLDER);
  const blanksCount = segments.length - 1;
  const [blanks, setBlanks] = useState<string[]>(() =>
    Array.from({ length: blanksCount }, () => ''),
  );

  const handleBlankChange = (blankIndex: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const nextBlanks = blanks.map((blank, index) =>
      index === blankIndex ? event.target.value : blank,
    );
    setBlanks(nextBlanks);
    const isFilled = nextBlanks.every((blank) => blank.trim());
    onAnswerChange(isFilled ? { type: 'fill_code', blanks: nextBlanks } : null);
  };

  const blankTone = (blankIndex: number) => {
    if (isCorrect) return 'border-aurora';
    if (wrongDetails?.firstWrongBlank === blankIndex) return 'border-ember';
    return 'border-rune-gold';
  };

  return (
    <pre className="overflow-x-auto rounded-xl border-2 border-fjord-600 bg-fjord-950 p-4 font-code text-base leading-loose whitespace-pre-wrap text-frost">
      {segments.map((segment, segmentIndex) => (
        <Fragment key={segmentIndex}>
          {segment}
          {segmentIndex < blanksCount && (
            <input
              type="text"
              value={blanks[segmentIndex] ?? ''}
              disabled={isLocked}
              onChange={handleBlankChange(segmentIndex)}
              aria-label={COPY.challenges.blankLabel(segmentIndex + 1)}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              className={`mx-1 min-h-10 w-32 rounded-md border-b-4 bg-fjord-700 px-2 font-code text-rune-gold ${blankTone(segmentIndex)}`}
            />
          )}
        </Fragment>
      ))}
    </pre>
  );
}
