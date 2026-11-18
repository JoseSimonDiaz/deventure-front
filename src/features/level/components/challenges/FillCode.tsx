import type { ChallengeInputProps } from '@/features/level/components/challenges/challengeInputProps';
import { FillCodeBlanks } from '@/features/level/components/challenges/FillCodeBlanks';
import { FillCodeFree } from '@/features/level/components/challenges/FillCodeFree';

export function FillCode(props: ChallengeInputProps<'fill_code'>) {
  const { payload } = props.challenge;
  if (payload.mode === 'blanks') return <FillCodeBlanks {...props} template={payload.template} />;
  return <FillCodeFree {...props} starterCode={payload.starterCode} />;
}
