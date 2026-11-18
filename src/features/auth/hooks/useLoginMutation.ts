import { useMutation } from '@tanstack/react-query';
import { loginRequest } from '@/features/auth/api/authApi';

export function useLoginMutation() {
  return useMutation({ mutationFn: loginRequest });
}
