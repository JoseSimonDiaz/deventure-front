import { useQuery } from '@tanstack/react-query';
import { fetchLevel } from '@/shared/api/contentApi';
import { queryKeys } from '@/shared/api/queryKeys';

export function useLevelQuery(levelId: string) {
  return useQuery({
    queryKey: queryKeys.levels.detail(levelId),
    queryFn: () => fetchLevel(levelId),
    enabled: Boolean(levelId),
  });
}
