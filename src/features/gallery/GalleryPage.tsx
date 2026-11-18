import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchGallery, markRewardSeen } from '@/features/gallery/api/rewardsApi';
import { GalleryFiltersBar } from '@/features/gallery/components/GalleryFiltersBar';
import { RewardCard } from '@/features/gallery/components/RewardCard';
import { RewardDetailModal } from '@/features/gallery/components/RewardDetailModal';
import { queryKeys } from '@/shared/api/queryKeys';
import { COPY } from '@/shared/constants/copy';
import type { GalleryFilters, Reward } from '@/shared/contracts/rewards';
import { PageShell } from '@/shared/ui/PageShell';
import { RuneSkeleton } from '@/shared/ui/RuneSkeleton';

const NO_FILTERS: GalleryFilters = {};

export function GalleryPage() {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState<GalleryFilters>(NO_FILTERS);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const galleryQuery = useQuery({
    queryKey: queryKeys.rewards.gallery(filters),
    queryFn: () => fetchGallery(filters),
    staleTime: 0,
  });
  const markSeenMutation = useMutation({
    mutationFn: markRewardSeen,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.rewards.all }),
  });

  const handleOpenReward = (reward: Reward) => {
    setSelectedReward(reward);
    if (reward.isNew) markSeenMutation.mutate(reward.id);
  };
  const handleCloseReward = () => {
    setSelectedReward(null);
  };

  return (
    <PageShell title={COPY.gallery.title}>
      {galleryQuery.data && (
        <p className="text-center font-heading text-xl font-bold text-rune-gold">
          {COPY.gallery.counter(galleryQuery.data.unlockedCount, galleryQuery.data.total)}
        </p>
      )}
      <GalleryFiltersBar filters={filters} onChange={setFilters} />
      {galleryQuery.isPending && <RuneSkeleton label={COPY.gallery.loading} />}
      {galleryQuery.isError && (
        <p role="alert" className="text-ember">
          {COPY.errors.generic}
        </p>
      )}
      {galleryQuery.data && !galleryQuery.data.rewards.length && (
        <p className="text-center text-mist">{COPY.gallery.empty}</p>
      )}
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {galleryQuery.data?.rewards.map((reward) => (
          <RewardCard key={reward.id} reward={reward} onOpen={handleOpenReward} />
        ))}
      </ul>
      <RewardDetailModal reward={selectedReward} onClose={handleCloseReward} />
    </PageShell>
  );
}
