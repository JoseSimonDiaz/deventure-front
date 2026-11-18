import type { ChallengeOfType, PlayerChallenge } from '@/shared/contracts/content';
import type { Answer, AttemptDetails } from '@/shared/contracts/gameplay';

export type ChallengeInputProps<TType extends PlayerChallenge['type']> = {
  challenge: ChallengeOfType<TType>;
  isLocked: boolean;
  isCorrect: boolean;
  wrongDetails: AttemptDetails | null;
  onAnswerChange: (answer: Answer | null) => void;
};
