import { useNavigate } from 'react-router';
import { TotalsCard } from '@/features/progress/components/TotalsCard';
import { ZoneProgressCard } from '@/features/progress/components/ZoneProgressCard';
import { COPY } from '@/shared/constants/copy';
import { ROUTES } from '@/shared/constants/routes';
import { useProgressSummaryQuery } from '@/shared/progress/useProgressSummaryQuery';
import { Button } from '@/shared/ui/Button';
import { PageShell } from '@/shared/ui/PageShell';
import { RuneSkeleton } from '@/shared/ui/RuneSkeleton';

export function ProgressPage() {
  const navigate = useNavigate();
  const summaryQuery = useProgressSummaryQuery();

  const handleGoToMap = () => {
    void navigate(ROUTES.zones);
  };

  return (
    <PageShell title={COPY.progress.title}>
      {summaryQuery.isPending && <RuneSkeleton label={COPY.progress.loading} />}
      {summaryQuery.isError && (
        <p role="alert" className="text-ember">
          {COPY.errors.generic}
        </p>
      )}
      {summaryQuery.data && (
        <>
          <TotalsCard totals={summaryQuery.data.totals} />
          {!summaryQuery.data.totals.levelsCompleted && (
            <div className="flex flex-col items-center gap-4 text-center">
              <p className="text-lg text-mist">{COPY.progress.empty}</p>
              <Button variant="gold" onClick={handleGoToMap}>
                {COPY.progress.goToMap}
              </Button>
            </div>
          )}
          {summaryQuery.data.zones.map((zone) => (
            <ZoneProgressCard key={zone.zoneId} zone={zone} />
          ))}
        </>
      )}
    </PageShell>
  );
}
