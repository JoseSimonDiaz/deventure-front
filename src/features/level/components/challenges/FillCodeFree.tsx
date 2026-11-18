import { useId, useState, type ChangeEvent, type KeyboardEvent } from 'react';
import type { ChallengeInputProps } from '@/features/level/components/challenges/challengeInputProps';
import { COPY } from '@/shared/constants/copy';

type FillCodeFreeProps = ChallengeInputProps<'fill_code'> & { starterCode: string };

const INDENTATION = '  ';
const TAB_KEY = 'Tab';
const EDITOR_ROWS = 6;

export function FillCodeFree({
  starterCode,
  isLocked,
  isCorrect,
  wrongDetails,
  onAnswerChange,
}: FillCodeFreeProps) {
  const editorId = useId();
  const [code, setCode] = useState(starterCode);

  const updateCode = (nextCode: string) => {
    setCode(nextCode);
    onAnswerChange(nextCode.trim() ? { type: 'fill_code', code: nextCode } : null);
  };
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    updateCode(event.target.value);
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== TAB_KEY || event.shiftKey) return;
    event.preventDefault();
    const { selectionStart, selectionEnd } = event.currentTarget;
    updateCode(`${code.slice(0, selectionStart)}${INDENTATION}${code.slice(selectionEnd)}`);
  };

  const editorTone = isCorrect ? 'border-aurora' : 'border-fjord-600';
  const errorLine = wrongDetails?.line ?? 0;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={editorId} className="font-code text-sm font-semibold text-mist uppercase">
        {COPY.challenges.codeEditorLabel}
      </label>
      <textarea
        id={editorId}
        value={code}
        rows={EDITOR_ROWS}
        disabled={isLocked}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
        className={`w-full resize-y rounded-xl border-2 bg-fjord-950 p-4 font-code text-base leading-relaxed text-frost focus-visible:border-aurora ${editorTone}`}
      />
      {errorLine > 0 && (
        <p className="font-code text-sm text-ember">{COPY.challenges.errorOnLine(errorLine)}</p>
      )}
    </div>
  );
}
