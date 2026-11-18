import { useId, useState, type ChangeEvent } from 'react';
import type { ChallengeInputProps } from '@/features/level/components/challenges/challengeInputProps';
import { COPY } from '@/shared/constants/copy';

const OUTPUT_ROWS = 4;

export function PredictOutput({
  challenge,
  isLocked,
  isCorrect,
  wrongDetails,
  onAnswerChange,
}: ChallengeInputProps<'predict_output'>) {
  const outputId = useId();
  const [output, setOutput] = useState('');

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setOutput(event.target.value);
    onAnswerChange(
      event.target.value.trim() ? { type: 'predict_output', output: event.target.value } : null,
    );
  };

  const wrongLine = wrongDetails?.firstWrongLine ?? 0;
  const outputTone = isCorrect ? 'border-aurora' : 'border-fjord-600';

  return (
    <div className="flex flex-col gap-3">
      <pre className="overflow-x-auto rounded-xl border-2 border-fjord-600 bg-fjord-950 p-4 font-code text-sm leading-relaxed text-frost">
        <code>{challenge.payload.code}</code>
      </pre>
      <label htmlFor={outputId} className="font-code text-sm font-semibold text-mist uppercase">
        {COPY.challenges.outputLabel}
      </label>
      <textarea
        id={outputId}
        value={output}
        rows={OUTPUT_ROWS}
        disabled={isLocked}
        onChange={handleChange}
        autoComplete="off"
        spellCheck={false}
        className={`w-full rounded-xl border-2 bg-fjord-950 p-4 font-code text-base text-frost focus-visible:border-aurora ${outputTone}`}
      />
      {wrongLine > 0 && (
        <p className="font-code text-sm text-ember">{COPY.challenges.errorOnLine(wrongLine)}</p>
      )}
    </div>
  );
}
