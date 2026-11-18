import { useMutation } from '@tanstack/react-query';
import { registerRequest } from '@/features/auth/api/authApi';

export function useRegisterMutation() {
  return useMutation({ mutationFn: registerRequest });
}
