import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ChallengeView } from '@/features/level/components/ChallengeView';
import { EncouragementBubble } from '@/features/level/components/EncouragementBubble';
import { ExitLevelModal } from '@/features/level/components/ExitLevelModal';
import { LevelHeader } from '@/features/level/components/LevelHeader';
import { LevelLostModal } from '@/features/level/components/LevelLostModal';
import { LevelLockedNotice } from '@/features/level/components/LevelLockedNotice';
import { LevelWonScreen } from '@/features/level/components/LevelWonScreen';
import { ZoneTheory } from '@/features/level/components/ZoneTheory';
import { useEncouragement } from '@/features/level/hooks/useEncouragement';
import { useLevelSession } from '@/features/level/hooks/useLevelSession';
import { COPY } from '@/shared/constants/copy';
import { ROUTES } from '@/shared/constants/routes';
import type { LevelForPlayer } from '@/shared/contracts/content';
import type { Answer } from '@/shared/contracts/gameplay';
import { RuneSkeleton } from '@/shared/ui/RuneSkeleton';

type LevelPlaygroundProps = { level: LevelForPlayer };

export function LevelPlayground({ level }: LevelPlaygroundProps) {
  const navigate = useNavigate();
  const levelSession = useLevelSession(level.id);
  const pickEncouragement = useEncouragement();
  const [encouragement, setEncouragement] = useState('');
  const [isExitOpen, setIsExitOpen] = useState(false);
  const [isReviewingTheory, setIsReviewingTheory] = useState(false);

  const challenge = level.challenges[levelSession.currentIndex];
  const total = level.challenges.length;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [levelSession.currentIndex, levelSession.outcome, isReviewingTheory]);

  const goToMap = () => {
    void navigate(ROUTES.zones);
  };
  const handleSubmit = (answer: Answer) => {
    setEncouragement('');
    levelSession.submitAnswer(answer);
  };
  const handleContinue = () => {
    const feedback = levelSession.feedback;
    if (feedback && !feedback.correct && feedback.sessionStatus === 'in_progress') {
      setEncouragement(pickEncouragement());
    }
    levelSession.continueAfterFeedback();
  };
  const handleDismissEncouragement = () => {
    setEncouragement('');
  };
  const handleOpenExit = () => {
    setIsExitOpen(true);
  };
  const handleCloseExit = () => {
    setIsExitOpen(false);
  };
  const handleConfirmExit = () => {
    levelSession.abandonCurrentSession();
    goToMap();
  };
  const handleOpenTheory = () => {
    setIsReviewingTheory(true);
  };
  const handleCloseTheory = () => {
    setIsReviewingTheory(false);
  };

  if (levelSession.startError) {
    return <LevelLockedNotice error={levelSession.startError} onBackToMap={goToMap} />;
  }
  if (!levelSession.session || levelSession.isStarting) {
    return <RuneSkeleton label={COPY.level.loading} />;
  }
  if (isReviewingTheory) {
    return (
      <ZoneTheory
        zoneId={level.zone.id}
        isReview
        onSkip={handleCloseTheory}
        onFinish={handleCloseTheory}
      />
    );
  }
  if (levelSession.outcome === 'won' && levelSession.finalResult) {
    return (
      <LevelWonScreen
        finalResult={levelSession.finalResult}
        isRestarting={levelSession.isStarting}
        onRepeat={levelSession.startNewSession}
      />
    );
  }

  return (
    <div className="min-h-dvh pb-10">
      <LevelHeader
        currentIndex={levelSession.currentIndex}
        total={total}
        livesLeft={levelSession.livesLeft}
        initialLives={levelSession.session.initialLives}
        onExit={handleOpenExit}
        onOpenTheory={handleOpenTheory}
      />
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 pt-6">
        <h1 className="sr-only">{level.title}</h1>
        <EncouragementBubble message={encouragement} onDismiss={handleDismissEncouragement} />
        {challenge && (
          <ChallengeView
            key={challenge.id}
            sessionId={levelSession.session.id}
            challenge={challenge}
            feedback={levelSession.feedback}
            correctStreak={levelSession.correctStreak}
            hints={levelSession.currentHints}
            isChecking={levelSession.isChecking}
            isAskingHint={levelSession.isAskingHint}
            onSubmit={handleSubmit}
            onContinue={handleContinue}
            onAskHint={levelSession.askForHint}
          />
        )}
      </div>
      <ExitLevelModal isOpen={isExitOpen} onConfirm={handleConfirmExit} onClose={handleCloseExit} />
      <LevelLostModal
        isOpen={levelSession.outcome === 'lost'}
        lossCount={levelSession.lossCount}
        isRetrying={levelSession.isStarting}
        onRetry={levelSession.startNewSession}
        onReviewTheory={handleOpenTheory}
        onBackToMap={goToMap}
      />
    </div>
  );
}
