import { useMutation } from '@tanstack/react-query';
import { MessageCircleQuestion } from 'lucide-react';
import { useId, useState, type ChangeEvent, type SubmitEvent } from 'react';
import { askAssistant } from '@/features/level/api/gameplayApi';
import { ApiError } from '@/shared/api/ApiError';
import { COPY } from '@/shared/constants/copy';
import type { AssistantAnswer } from '@/shared/contracts/gameplay';
import { Bjorn } from '@/shared/illustrations/Bjorn';
import { Button } from '@/shared/ui/Button';

type AssistantPanelProps = { sessionId: string; challengeId: string };

const ASSISTANT_ICON = <MessageCircleQuestion aria-hidden="true" className="h-5 w-5" />;
const QUESTION_MIN_LENGTH = 3;
const QUESTION_MAX_LENGTH = 500;
const QUESTION_ROWS = 2;
const BUSINESS_ERROR_STATUSES = new Set([400, 403, 409, 429]);

function describeAssistantError(error: unknown): string {
  if (error instanceof ApiError && BUSINESS_ERROR_STATUSES.has(error.status)) return error.message;
  return COPY.errors.generic;
}

export function AssistantPanel({ sessionId, challengeId }: AssistantPanelProps) {
  const questionId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [assistantAnswer, setAssistantAnswer] = useState<AssistantAnswer | null>(null);
  const assistantMutation = useMutation({ mutationFn: askAssistant });

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleQuestionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(event.target.value);
  };
  const handleAnswered = (answer: AssistantAnswer) => {
    setAssistantAnswer(answer);
    setQuestion('');
  };
  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    assistantMutation.mutate(
      { sessionId, challengeId, question: question.trim() },
      { onSuccess: handleAnswered },
    );
  };

  if (!isOpen) {
    return (
      <Button
        variant="ghost"
        icon={ASSISTANT_ICON}
        onClick={handleOpen}
        className="self-start normal-case"
      >
        {COPY.assistant.open}
      </Button>
    );
  }

  return (
    <section
      aria-label={COPY.assistant.title}
      className="flex flex-col gap-3 rounded-2xl border-2 border-aurora/40 bg-fjord-800 p-4"
    >
      {assistantAnswer && (
        <div className="flex items-end gap-3">
          <Bjorn mood="thinking" className="w-14 shrink-0" />
          <div className="flex flex-col gap-1">
            <p
              aria-live="polite"
              className="rounded-2xl rounded-bl-none bg-fjord-700 px-4 py-3 text-frost"
            >
              {assistantAnswer.hint}
            </p>
            <p className="font-code text-sm text-mist">
              {COPY.assistant.remaining(assistantAnswer.remaining)}
            </p>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label htmlFor={questionId} className="font-code text-sm font-semibold text-mist uppercase">
          {COPY.assistant.questionLabel}
        </label>
        <textarea
          id={questionId}
          rows={QUESTION_ROWS}
          maxLength={QUESTION_MAX_LENGTH}
          value={question}
          placeholder={COPY.assistant.placeholder}
          onChange={handleQuestionChange}
          className="w-full rounded-xl border-2 border-fjord-600 bg-fjord-950 p-3 text-frost focus-visible:border-aurora"
        />
        {assistantMutation.isError && (
          <p role="alert" className="text-ember">
            {describeAssistantError(assistantMutation.error)}
          </p>
        )}
        <Button
          type="submit"
          variant="aurora"
          disabled={question.trim().length < QUESTION_MIN_LENGTH || assistantMutation.isPending}
        >
          {assistantMutation.isPending ? COPY.assistant.sending : COPY.assistant.send}
        </Button>
      </form>
    </section>
  );
}
