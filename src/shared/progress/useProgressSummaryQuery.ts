import { useQuery } from '@tanstack/react-query';
import { fetchProgressSummary } from '@/shared/api/progressApi';
import { queryKeys } from '@/shared/api/queryKeys';
import { useSessionStore } from '@/stores/sessionStore';

export function useProgressSummaryQuery() {
  const hasSession = useSessionStore((state) => Boolean(state.token));

  return useQuery({
    queryKey: queryKeys.progress.summary,
    queryFn: fetchProgressSummary,
    staleTime: 0,
    enabled: hasSession,
  });
}
