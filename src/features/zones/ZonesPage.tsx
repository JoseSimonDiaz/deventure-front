import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { LevelPreviewModal } from '@/features/zones/components/LevelPreviewModal';
import { ZoneSection } from '@/features/zones/components/ZoneSection';
import { ZonesBackdrop } from '@/features/zones/components/ZonesBackdrop';
import { ZonesHud } from '@/features/zones/components/ZonesHud';
import { findFocusLevelId } from '@/features/zones/findFocusLevelId';
import { COPY } from '@/shared/constants/copy';
import { UNLOCKED_LEVEL_PARAM } from '@/shared/constants/routes';
import type { LevelProgress } from '@/shared/contracts/progress';
import { useProgressSummaryQuery } from '@/shared/progress/useProgressSummaryQuery';
import { Button } from '@/shared/ui/Button';
import { RuneSkeleton } from '@/shared/ui/RuneSkeleton';
import { isElementInViewport } from '@/shared/utils/isElementInViewport';
import { useToastStore } from '@/stores/toastStore';

export function ZonesPage() {
  const summaryQuery = useProgressSummaryQuery();
  const showToast = useToastStore((state) => state.showToast);
  const [searchParams] = useSearchParams();
  const justUnlockedLevelId = searchParams.get(UNLOCKED_LEVEL_PARAM) ?? '';
  const [selectedLevel, setSelectedLevel] = useState<LevelProgress | null>(null);

  const zones = summaryQuery.data?.zones ?? [];
  const focusLevelId = justUnlockedLevelId || findFocusLevelId(zones);

  useEffect(() => {
    if (justUnlockedLevelId) showToast(COPY.zones.newLevelUnlocked);
  }, [justUnlockedLevelId, showToast]);

  useEffect(() => {
    const focusLevelNode = document.getElementById(`level-${focusLevelId}`);
    if (!focusLevelNode || isElementInViewport(focusLevelNode)) return;
    focusLevelNode.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [focusLevelId]);

  const handleSelectLevel = (level: LevelProgress) => {
    if (level.status === 'locked') {
      showToast(COPY.zones.lockedLevel);
      return;
    }
    setSelectedLevel(level);
  };
  const handleClosePreview = () => {
    setSelectedLevel(null);
  };
  const handleRetry = () => {
    void summaryQuery.refetch();
  };

  return (
    <div className="relative min-h-dvh pb-32">
      <ZonesBackdrop />
      <ZonesHud totalStars={summaryQuery.data?.totals.stars ?? 0} />
      <div className="relative mx-auto flex max-w-xl flex-col gap-10 px-4 pt-6">
        <h1 className="text-center font-display text-3xl text-rune-gold">{COPY.zones.title}</h1>
        {summaryQuery.isPending && <RuneSkeleton label={COPY.zones.loading} />}
        {summaryQuery.isError && (
          <div role="alert" className="flex flex-col items-center gap-4 text-center">
            <p className="text-ember">{COPY.errors.generic}</p>
            <Button variant="gold" onClick={handleRetry}>
              {COPY.errors.retry}
            </Button>
          </div>
        )}
        {summaryQuery.isSuccess && !zones.length && (
          <p className="text-center text-mist">{COPY.zones.empty}</p>
        )}
        {zones.map((zone) => (
          <ZoneSection
            key={zone.zoneId}
            zone={zone}
            justUnlockedLevelId={justUnlockedLevelId}
            onSelectLevel={handleSelectLevel}
          />
        ))}
      </div>
      <LevelPreviewModal level={selectedLevel} onClose={handleClosePreview} />
    </div>
  );
}
