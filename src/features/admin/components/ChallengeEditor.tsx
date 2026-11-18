import { useMutation } from '@tanstack/react-query';
import { useId, useState, type ChangeEvent } from 'react';
import { deleteChallenge, previewChallenge, saveChallenge } from '@/features/admin/api/adminApi';
import {
  NEW_ANSWER_TEMPLATE,
  NEW_CHALLENGE_TEMPLATE,
  parseJsonOrNull,
  stringifyJson,
  toEditableChallenge,
} from '@/features/admin/challengeTemplate';
import { COPY } from '@/shared/constants/copy';
import type { AdminChallenge, PreviewResult } from '@/shared/contracts/admin';
import { Button } from '@/shared/ui/Button';
import { Panel } from '@/shared/ui/Panel';
import { useToastStore } from '@/stores/toastStore';

type ChallengeEditorProps = {
  levelId: string;
  challenge: AdminChallenge | null;
  onChanged: () => void;
};

const EDITOR_ROWS = 18;
const ANSWER_ROWS = 4;

export function ChallengeEditor({ levelId, challenge, onChanged }: ChallengeEditorProps) {
  const challengeFieldId = useId();
  const answerFieldId = useId();
  const showToast = useToastStore((state) => state.showToast);
  const [challengeText, setChallengeText] = useState(() =>
    stringifyJson(challenge ? toEditableChallenge(challenge) : NEW_CHALLENGE_TEMPLATE),
  );
  const [answerText, setAnswerText] = useState(() => stringifyJson(NEW_ANSWER_TEMPLATE));
  const [previewResult, setPreviewResult] = useState<PreviewResult | null>(null);

  const handleRequestError = (requestError: Error) => {
    showToast(requestError.message || COPY.errors.generic);
  };
  const handleSaved = () => {
    showToast(COPY.admin.saved);
    onChanged();
  };
  const saveMutation = useMutation({
    mutationFn: (challengeBody: unknown) =>
      saveChallenge(levelId, challenge?.id ?? '', challengeBody),
    onSuccess: handleSaved,
    onError: handleRequestError,
  });
  const deleteMutation = useMutation({
    mutationFn: deleteChallenge,
    onSuccess: handleSaved,
    onError: handleRequestError,
  });
  const previewMutation = useMutation({
    mutationFn: ({ challengeBody, answer }: { challengeBody: unknown; answer: unknown }) =>
      previewChallenge(challengeBody, answer),
    onSuccess: setPreviewResult,
    onError: handleRequestError,
  });

  const handleChallengeChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setChallengeText(event.target.value);
  };
  const handleAnswerChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setAnswerText(event.target.value);
  };
  const handleSave = () => {
    const challengeBody = parseJsonOrNull(challengeText);
    if (!challengeBody) {
      showToast(COPY.admin.invalidJson);
      return;
    }
    saveMutation.mutate(challengeBody);
  };
  const handlePreview = () => {
    const challengeBody = parseJsonOrNull(challengeText);
    const answer = parseJsonOrNull(answerText);
    if (!challengeBody || !answer) {
      showToast(COPY.admin.invalidJson);
      return;
    }
    previewMutation.mutate({ challengeBody, answer });
  };
  const handleDelete = () => {
    if (challenge) deleteMutation.mutate(challenge.id);
  };

  return (
    <Panel>
      <div className="flex flex-col gap-3">
        <label htmlFor={challengeFieldId} className="font-code text-sm font-semibold text-mist">
          {COPY.admin.challengeJson}
        </label>
        <textarea
          id={challengeFieldId}
          rows={EDITOR_ROWS}
          value={challengeText}
          onChange={handleChallengeChange}
          spellCheck={false}
          className="w-full rounded-xl border-2 border-fjord-600 bg-fjord-950 p-3 font-code text-sm text-frost"
        />
        <label htmlFor={answerFieldId} className="font-code text-sm font-semibold text-mist">
          {COPY.admin.answerJson}
        </label>
        <textarea
          id={answerFieldId}
          rows={ANSWER_ROWS}
          value={answerText}
          onChange={handleAnswerChange}
          spellCheck={false}
          className="w-full rounded-xl border-2 border-fjord-600 bg-fjord-950 p-3 font-code text-sm text-frost"
        />
        {previewResult && (
          <p role="status" className={previewResult.isCorrect ? 'text-aurora' : 'text-ember'}>
            {previewResult.isCorrect
              ? COPY.admin.previewCorrect
              : COPY.admin.previewWrong(previewResult.message ?? '')}
          </p>
        )}
        <div className="flex flex-wrap gap-2">
          <Button variant="ghost" onClick={handlePreview} disabled={previewMutation.isPending}>
            {COPY.admin.preview}
          </Button>
          <Button variant="aurora" onClick={handleSave} disabled={saveMutation.isPending}>
            {COPY.admin.save}
          </Button>
          {challenge && (
            <Button variant="gold" onClick={handleDelete} disabled={deleteMutation.isPending}>
              {COPY.admin.delete}
            </Button>
          )}
        </div>
      </div>
    </Panel>
  );
}
