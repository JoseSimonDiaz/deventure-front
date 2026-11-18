import { useMutation } from '@tanstack/react-query';
import { useId, useState, type ChangeEvent, type SubmitEvent } from 'react';
import { askOracle } from '@/features/zones/api/oracleApi';
import { ApiError } from '@/shared/api/ApiError';
import { COPY } from '@/shared/constants/copy';
import { LIMITS } from '@/shared/constants/limits';
import type { OracleAnswer } from '@/shared/contracts/gameplay';
import { Bjorn } from '@/shared/illustrations/Bjorn';
import type { BjornMood } from '@/shared/illustrations/bjornMotions';
import { Button } from '@/shared/ui/Button';
import { Modal } from '@/shared/ui/Modal';
import { RichText } from '@/shared/ui/RichText';

type OracleModalProps = { isOpen: boolean; onClose: () => void };

const QUESTION_ROWS = 3;
const BUSINESS_ERROR_STATUSES = new Set([400, 429]);

function describeOracleError(error: unknown): string {
  if (error instanceof ApiError && BUSINESS_ERROR_STATUSES.has(error.status)) return error.message;
  return COPY.errors.generic;
}

function OracleConversation({ onClose }: Pick<OracleModalProps, 'onClose'>) {
  const questionId = useId();
  const [question, setQuestion] = useState('');
  const [oracleAnswer, setOracleAnswer] = useState<OracleAnswer | null>(null);
  const oracleMutation = useMutation({ mutationFn: askOracle });

  const handleQuestionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(event.target.value);
  };
  const handleAnswered = (answer: OracleAnswer) => {
    setOracleAnswer(answer);
    setQuestion('');
  };
  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    oracleMutation.mutate(question.trim(), { onSuccess: handleAnswered });
  };

  const bjornMood: BjornMood = oracleMutation.isPending ? 'thinking' : 'idle';
  const hasQuestionsLeft = !oracleAnswer || oracleAnswer.remaining > 0;
  const canSubmit =
    hasQuestionsLeft &&
    question.trim().length >= LIMITS.oracleQuestionMinLength &&
    !oracleMutation.isPending;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-end gap-3">
        <Bjorn mood={bjornMood} className="w-16 shrink-0" />
        <div
          aria-live="polite"
          className="max-h-72 min-w-0 flex-1 [scrollbar-width:thin] [scrollbar-color:var(--color-fjord-600)_transparent] overflow-x-hidden overflow-y-auto rounded-2xl rounded-bl-none bg-fjord-700 px-4 py-3 wrap-anywhere"
        >
          <RichText text={oracleAnswer?.answer ?? COPY.oracle.intro} className="text-base" />
        </div>
      </div>
      {oracleAnswer && (
        <p className="font-code text-sm text-mist">
          {COPY.oracle.remaining(oracleAnswer.remaining)}
        </p>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label htmlFor={questionId} className="font-code text-sm font-semibold text-mist uppercase">
          {COPY.oracle.questionLabel}
        </label>
        <textarea
          id={questionId}
          rows={QUESTION_ROWS}
          maxLength={LIMITS.oracleQuestionMaxLength}
          value={question}
          placeholder={COPY.oracle.placeholder}
          onChange={handleQuestionChange}
          className="w-full rounded-xl border-2 border-fjord-600 bg-fjord-950 p-3 text-frost focus-visible:border-aurora"
        />
        {oracleMutation.isError && (
          <p role="alert" className="text-ember">
            {describeOracleError(oracleMutation.error)}
          </p>
        )}
        <div className="mt-2 flex flex-col gap-3 sm:flex-row-reverse">
          <Button type="submit" variant="gold" disabled={!canSubmit} className="flex-1">
            {oracleMutation.isPending ? COPY.oracle.sending : COPY.oracle.send}
          </Button>
          <Button variant="ghost" onClick={onClose} className="flex-1">
            {COPY.oracle.close}
          </Button>
        </div>
      </form>
    </div>
  );
}

export function OracleModal({ isOpen, onClose }: OracleModalProps) {
  return (
    <Modal isOpen={isOpen} title={COPY.oracle.title} onClose={onClose}>
      <OracleConversation onClose={onClose} />
    </Modal>
  );
}
