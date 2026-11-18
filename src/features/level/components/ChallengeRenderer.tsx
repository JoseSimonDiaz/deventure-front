import { FillCode } from '@/features/level/components/challenges/FillCode';
import { FindBug } from '@/features/level/components/challenges/FindBug';
import { MultipleChoice } from '@/features/level/components/challenges/MultipleChoice';
import { OrderBlocks } from '@/features/level/components/challenges/OrderBlocks';
import { PredictOutput } from '@/features/level/components/challenges/PredictOutput';
import type { PlayerChallenge } from '@/shared/contracts/content';
import type { Answer, AttemptDetails } from '@/shared/contracts/gameplay';

type ChallengeRendererProps = {
  challenge: PlayerChallenge;
  isLocked: boolean;
  isCorrect: boolean;
  wrongDetails: AttemptDetails | null;
  onAnswerChange: (answer: Answer | null) => void;
};

export function ChallengeRenderer({ challenge, ...inputProps }: ChallengeRendererProps) {
  if (challenge.type === 'multiple_choice') {
    return <MultipleChoice challenge={challenge} {...inputProps} />;
  }
  if (challenge.type === 'order_blocks') {
    return <OrderBlocks challenge={challenge} {...inputProps} />;
  }
  if (challenge.type === 'fill_code') return <FillCode challenge={challenge} {...inputProps} />;
  if (challenge.type === 'find_bug') return <FindBug challenge={challenge} {...inputProps} />;
  return <PredictOutput challenge={challenge} {...inputProps} />;
}
