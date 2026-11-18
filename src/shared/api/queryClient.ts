import { QueryClient } from '@tanstack/react-query';
import { isRetryableError } from '@/shared/api/ApiError';
import { LIMITS } from '@/shared/constants/limits';

function shouldRetryRequest(failureCount: number, error: unknown): boolean {
  return failureCount < LIMITS.maxRequestRetries && isRetryableError(error);
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: LIMITS.contentStaleTimeMs,
      retry: shouldRetryRequest,
      refetchOnWindowFocus: false,
    },
    mutations: { retry: false },
  },
});
