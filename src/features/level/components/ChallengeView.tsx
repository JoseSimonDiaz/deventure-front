import { useState } from 'react';
import { AssistantPanel } from '@/features/level/components/AssistantPanel';
import { ChallengeRenderer } from '@/features/level/components/ChallengeRenderer';
import { FeedbackPanel } from '@/features/level/components/FeedbackPanel';
import { HintPanel } from '@/features/level/components/HintPanel';
import { COPY } from '@/shared/constants/copy';
import type { PlayerChallenge } from '@/shared/contracts/content';
import type { Answer, AttemptResult, Hint } from '@/shared/contracts/gameplay';
import { Button } from '@/shared/ui/Button';
import { RichText } from '@/shared/ui/RichText';
import { SqlTablePreview } from '@/shared/ui/SqlTablePreview';

type ChallengeViewProps = {
  sessionId: string;
  challenge: PlayerChallenge;
  feedback: AttemptResult | null;
  correctStreak: number;
  hints: Hint[];
  isChecking: boolean;
  isAskingHint: boolean;
  onSubmit: (answer: Answer) => void;
  onContinue: () => void;
  onAskHint: () => void;
};

export function ChallengeView({
  sessionId,
  challenge,
  feedback,
  correctStreak,
  hints,
  isChecking,
  isAskingHint,
  onSubmit,
  onContinue,
  onAskHint,
}: ChallengeViewProps) {
  const [draftAnswer, setDraftAnswer] = useState<Answer | null>(null);
  const isCorrect = Boolean(feedback?.correct);
  const wrongDetails = feedback && !feedback.correct ? feedback.details : null;
  const { tables, expectedResult } = challenge.payload;

  const handleCheck = () => {
    if (draftAnswer) onSubmit(draftAnswer);
  };

  return (
    <div className="flex flex-col gap-6">
      <RichText
        text={challenge.statement}
        className="rounded-3xl border-2 border-aurora/40 bg-fjord-800 p-5 text-xl font-semibold shadow-chunky"
      />
      {tables?.map((table) => (
        <SqlTablePreview key={table.name ?? 'tabla'} table={table} />
      ))}
      <ChallengeRenderer
        challenge={challenge}
        isLocked={Boolean(feedback) || isChecking}
        isCorrect={isCorrect}
        wrongDetails={wrongDetails}
        onAnswerChange={setDraftAnswer}
      />
      {isCorrect && expectedResult && (
        <SqlTablePreview table={expectedResult} caption={COPY.level.expectedResult} />
      )}
      <HintPanel
        hintsTotal={challenge._count.hints}
        hints={hints}
        isLoading={isAskingHint}
        isDisabled={Boolean(feedback)}
        onAskHint={onAskHint}
      />
      <AssistantPanel sessionId={sessionId} challengeId={challenge.id} />
      <div className="sticky bottom-0 z-10 -mx-4 bg-night/90 px-4 pt-3 pb-4 backdrop-blur-md">
        {feedback ? (
          <FeedbackPanel
            feedback={feedback}
            correctStreak={correctStreak}
            onContinue={onContinue}
          />
        ) : (
          <Button
            variant="aurora"
            onClick={handleCheck}
            disabled={!draftAnswer || isChecking}
            className="w-full"
          >
            {isChecking ? COPY.level.checking : COPY.level.check}
          </Button>
        )}
      </div>
    </div>
  );
}
