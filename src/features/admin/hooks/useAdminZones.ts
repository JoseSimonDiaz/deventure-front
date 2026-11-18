import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createLevel,
  createZone,
  fetchAdminZones,
  reorderLevels,
  updateLevelPublished,
  updateZone,
} from '@/features/admin/api/adminApi';
import { queryKeys } from '@/shared/api/queryKeys';
import { COPY } from '@/shared/constants/copy';
import type { ZoneDraft, ZonePatch } from '@/shared/contracts/admin';
import { useToastStore } from '@/stores/toastStore';

export function useAdminZones() {
  const queryClient = useQueryClient();
  const showToast = useToastStore((state) => state.showToast);
  const zonesQuery = useQuery({ queryKey: queryKeys.admin.zones, queryFn: fetchAdminZones });

  const mutationCallbacks = {
    onSuccess: () => {
      showToast(COPY.admin.saved);
      void queryClient.invalidateQueries({ queryKey: queryKeys.admin.zones });
      void queryClient.invalidateQueries({ queryKey: queryKeys.progress.all });
    },
    onError: (mutationError: Error) => {
      showToast(mutationError.message || COPY.errors.generic);
    },
  };

  const zoneMutation = useMutation({
    mutationFn: ({ zoneId, zonePatch }: { zoneId: string; zonePatch: ZonePatch }) =>
      updateZone(zoneId, zonePatch),
    ...mutationCallbacks,
  });
  const createZoneMutation = useMutation({
    mutationFn: (zoneDraft: ZoneDraft) => createZone(zoneDraft),
    ...mutationCallbacks,
  });
  const createLevelMutation = useMutation({
    mutationFn: ({ zoneId, title }: { zoneId: string; title: string }) =>
      createLevel(zoneId, title),
    ...mutationCallbacks,
  });
  const levelPublishMutation = useMutation({
    mutationFn: ({ levelId, isPublished }: { levelId: string; isPublished: boolean }) =>
      updateLevelPublished(levelId, isPublished),
    ...mutationCallbacks,
  });
  const reorderMutation = useMutation({
    mutationFn: ({ zoneId, levelIds }: { zoneId: string; levelIds: string[] }) =>
      reorderLevels(zoneId, levelIds),
    ...mutationCallbacks,
  });

  return {
    zonesQuery,
    updateZone: zoneMutation.mutate,
    createZone: createZoneMutation.mutate,
    createLevel: createLevelMutation.mutate,
    setLevelPublished: levelPublishMutation.mutate,
    reorderLevels: reorderMutation.mutate,
  };
}
