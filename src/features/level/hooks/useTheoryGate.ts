import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchSeenTheory, markTheorySeen } from '@/features/level/api/gameplayApi';
import { queryKeys } from '@/shared/api/queryKeys';
import type { LevelForPlayer } from '@/shared/contracts/content';

const FIRST_LEVEL_ORDER = 1;

export function useTheoryGate(level: LevelForPlayer | undefined) {
  const queryClient = useQueryClient();
  const [isDismissed, setIsDismissed] = useState(false);
  const seenTheoryQuery = useQuery({
    queryKey: queryKeys.progress.seenTheory,
    queryFn: fetchSeenTheory,
  });
  const markSeenMutation = useMutation({ mutationFn: markTheorySeen });

  const zoneId = level?.zone.id ?? '';
  const hasSeenTheory = (seenTheoryQuery.data ?? []).includes(zoneId);
  const isFirstLevel = level?.order === FIRST_LEVEL_ORDER;

  const dismissTheory = () => {
    setIsDismissed(true);
    if (hasSeenTheory || !zoneId) return;
    markSeenMutation.mutate(zoneId, {
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: queryKeys.progress.seenTheory });
      },
    });
  };

  return {
    isReady: Boolean(level) && !seenTheoryQuery.isPending,
    shouldShowTheory: isFirstLevel && !hasSeenTheory && !isDismissed && seenTheoryQuery.isSuccess,
    dismissTheory,
  };
}
