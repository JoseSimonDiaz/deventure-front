import { useQuery } from '@tanstack/react-query';
import { VideoPlayer } from '@/features/level/components/VideoPlayer';
import { fetchZoneTheory } from '@/shared/api/contentApi';
import { queryKeys } from '@/shared/api/queryKeys';
import { COPY } from '@/shared/constants/copy';
import { Button } from '@/shared/ui/Button';
import { Panel } from '@/shared/ui/Panel';
import { RichText } from '@/shared/ui/RichText';
import { RuneSkeleton } from '@/shared/ui/RuneSkeleton';

type ZoneTheoryProps = {
  zoneId: string;
  isReview: boolean;
  onSkip: () => void;
  onFinish: () => void;
};

export function ZoneTheory({ zoneId, isReview, onSkip, onFinish }: ZoneTheoryProps) {
  const theoryQuery = useQuery({
    queryKey: queryKeys.theory.zone(zoneId),
    queryFn: () => fetchZoneTheory(zoneId),
  });

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-4 py-6">
      {theoryQuery.isPending && <RuneSkeleton label={COPY.level.loading} />}
      {theoryQuery.isError && (
        <p role="alert" className="text-ember">
          {COPY.errors.generic}
        </p>
      )}
      {theoryQuery.data && (
        <>
          <h1 className="font-display text-3xl text-rune-gold">
            {COPY.theory.title(theoryQuery.data.name)}
          </h1>
          {theoryQuery.data.videoUrl && (
            <VideoPlayer
              videoUrl={theoryQuery.data.videoUrl}
              title={COPY.theory.videoTitle(theoryQuery.data.name)}
            />
          )}
          <Panel>
            <RichText text={theoryQuery.data.theorySummary} />
          </Panel>
        </>
      )}
      <div className="sticky bottom-0 z-10 -mx-4 flex flex-col gap-3 border-t-2 border-fjord-700 bg-fjord-900/90 px-4 py-4 backdrop-blur-md sm:flex-row-reverse">
        <Button variant="gold" onClick={onFinish} className="flex-1">
          {isReview ? COPY.theory.close : COPY.theory.understood}
        </Button>
        {!isReview && (
          <Button variant="ghost" onClick={onSkip} className="flex-1">
            {COPY.theory.skip}
          </Button>
        )}
      </div>
    </section>
  );
}
