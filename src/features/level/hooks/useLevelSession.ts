import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  abandonSession,
  requestHint,
  startSession,
  submitAttempt,
} from '@/features/level/api/gameplayApi';
import { clearLevelLosses, registerLevelLoss } from '@/features/level/lossCounter';
import { ApiError } from '@/shared/api/ApiError';
import { queryKeys } from '@/shared/api/queryKeys';
import { COPY } from '@/shared/constants/copy';
import type { Answer, AttemptResult, GameSession, Hint } from '@/shared/contracts/gameplay';
import { playErrorThud, playSuccessChime } from '@/shared/sound/soundEffects';
import { useToastStore } from '@/stores/toastStore';

const BUSINESS_ERROR_STATUSES = new Set([400, 403, 409, 429]);
const NO_HINTS: Hint[] = [];

export type LevelOutcome = 'playing' | 'won' | 'lost';

function describeRequestError(error: unknown): string {
  if (error instanceof ApiError && BUSINESS_ERROR_STATUSES.has(error.status)) {
    return error.message;
  }
  return COPY.errors.generic;
}

export function useLevelSession(levelId: string) {
  const queryClient = useQueryClient();
  const showToast = useToastStore((state) => state.showToast);
  const [session, setSession] = useState<GameSession | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [livesLeft, setLivesLeft] = useState(0);
  const [feedback, setFeedback] = useState<AttemptResult | null>(null);
  const [outcome, setOutcome] = useState<LevelOutcome>('playing');
  const [finalResult, setFinalResult] = useState<AttemptResult | null>(null);
  const [lossCount, setLossCount] = useState(0);
  const [correctStreak, setCorrectStreak] = useState(0);
  const [hintsByChallenge, setHintsByChallenge] = useState<Record<string, Hint[]>>({});
  const hasStartedRef = useRef(false);

  const startMutation = useMutation({ mutationFn: startSession });
  const attemptMutation = useMutation({ mutationFn: submitAttempt });
  const hintMutation = useMutation({ mutationFn: requestHint });
  const abandonMutation = useMutation({ mutationFn: abandonSession });

  const handleSessionStarted = useCallback((startedSession: GameSession) => {
    setSession(startedSession);
    setCurrentIndex(startedSession.currentIndex);
    setLivesLeft(startedSession.livesLeft);
    setFeedback(null);
    setFinalResult(null);
    setOutcome('playing');
    setHintsByChallenge({});
    setCorrectStreak(0);
  }, []);

  const startNewSession = useCallback(() => {
    startMutation.mutate(levelId, { onSuccess: handleSessionStarted });
  }, [startMutation, levelId, handleSessionStarted]);

  useEffect(() => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;
    startNewSession();
  }, [startNewSession]);

  const currentChallengeId = session?.challengeIds[currentIndex] ?? '';

  const handleAttemptResult = (attemptResult: AttemptResult) => {
    setFeedback(attemptResult);
    setLivesLeft(attemptResult.livesLeft);
    setCorrectStreak((currentStreak) => (attemptResult.correct ? currentStreak + 1 : 0));
    if (attemptResult.correct) playSuccessChime();
    else playErrorThud();
    if (attemptResult.sessionStatus === 'won') {
      clearLevelLosses(levelId);
      setFinalResult(attemptResult);
      void queryClient.invalidateQueries({ queryKey: queryKeys.progress.all });
      void queryClient.invalidateQueries({ queryKey: queryKeys.rewards.all });
    }
    if (attemptResult.sessionStatus === 'lost') setLossCount(registerLevelLoss(levelId));
  };
  const handleRequestError = (requestError: unknown) => {
    showToast(describeRequestError(requestError));
  };

  const submitAnswer = (answer: Answer) => {
    if (!session || attemptMutation.isPending) return;
    attemptMutation.mutate(
      { sessionId: session.id, challengeId: currentChallengeId, answer },
      { onSuccess: handleAttemptResult, onError: handleRequestError },
    );
  };

  const continueAfterFeedback = () => {
    if (!feedback) return;
    if (feedback.sessionStatus === 'won' || feedback.sessionStatus === 'lost') {
      setOutcome(feedback.sessionStatus);
      return;
    }
    if (feedback.correct) setCurrentIndex(feedback.nextIndex);
    setFeedback(null);
  };

  const handleHintReceived = (hint: Hint) => {
    setHintsByChallenge((currentHints) => ({
      ...currentHints,
      [currentChallengeId]: [...(currentHints[currentChallengeId] ?? NO_HINTS), hint],
    }));
  };
  const askForHint = () => {
    if (!session || hintMutation.isPending) return;
    hintMutation.mutate(
      { sessionId: session.id, challengeId: currentChallengeId },
      { onSuccess: handleHintReceived, onError: handleRequestError },
    );
  };

  const abandonCurrentSession = () => {
    if (session && outcome === 'playing') abandonMutation.mutate(session.id);
  };

  return {
    session,
    currentIndex,
    currentChallengeId,
    livesLeft,
    feedback,
    outcome,
    finalResult,
    lossCount,
    correctStreak,
    currentHints: hintsByChallenge[currentChallengeId] ?? NO_HINTS,
    startError: startMutation.error,
    isStarting: startMutation.isPending,
    isChecking: attemptMutation.isPending,
    isAskingHint: hintMutation.isPending,
    submitAnswer,
    continueAfterFeedback,
    askForHint,
    startNewSession,
    abandonCurrentSession,
  };
}
