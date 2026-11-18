import { useParams } from 'react-router';
import { LevelPlayground } from '@/features/level/components/LevelPlayground';
import { ZoneTheory } from '@/features/level/components/ZoneTheory';
import { useTheoryGate } from '@/features/level/hooks/useTheoryGate';
import { COPY } from '@/shared/constants/copy';
import { useLevelQuery } from '@/shared/content/useLevelQuery';
import { RuneSkeleton } from '@/shared/ui/RuneSkeleton';

type LevelGateProps = { levelId: string };

function LevelGate({ levelId }: LevelGateProps) {
  const levelQuery = useLevelQuery(levelId);
  const theoryGate = useTheoryGate(levelQuery.data);

  if (levelQuery.isError) {
    return (
      <p role="alert" className="p-10 text-center text-ember">
        {COPY.errors.generic}
      </p>
    );
  }
  if (!levelQuery.data || !theoryGate.isReady) return <RuneSkeleton label={COPY.level.loading} />;
  if (theoryGate.shouldShowTheory) {
    return (
      <ZoneTheory
        zoneId={levelQuery.data.zone.id}
        isReview={false}
        onSkip={theoryGate.dismissTheory}
        onFinish={theoryGate.dismissTheory}
      />
    );
  }
  return <LevelPlayground level={levelQuery.data} />;
}

export function LevelPage() {
  const { levelId = '' } = useParams();
  return <LevelGate key={levelId} levelId={levelId} />;
}
