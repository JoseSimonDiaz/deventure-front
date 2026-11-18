import { useMutation } from '@tanstack/react-query';
import { markIntroSeenRequest } from '@/shared/api/accountApi';

export function useMarkIntroSeenMutation() {
  return useMutation({ mutationFn: markIntroSeenRequest });
}
