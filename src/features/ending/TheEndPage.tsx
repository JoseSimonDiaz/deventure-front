import { useQuery } from '@tanstack/react-query';
import { motion } from 'motion/react';
import { Navigate, useNavigate } from 'react-router';
import { fetchGalleryCounter } from '@/features/ending/api/endingApi';
import { queryKeys } from '@/shared/api/queryKeys';
import { COPY } from '@/shared/constants/copy';
import { ROUTES } from '@/shared/constants/routes';
import { FjordBackdrop } from '@/shared/illustrations/FjordBackdrop';
import { Bjorn } from '@/shared/illustrations/Bjorn';
import { popInItem, staggerList } from '@/shared/motion/transitions';
import { useProgressSummaryQuery } from '@/shared/progress/useProgressSummaryQuery';
import { Button } from '@/shared/ui/Button';
import { RuneSkeleton } from '@/shared/ui/RuneSkeleton';
import { formatDuration } from '@/shared/utils/formatDuration';

export function TheEndPage() {
  const navigate = useNavigate();
  const summaryQuery = useProgressSummaryQuery();
  const galleryQuery = useQuery({
    queryKey: queryKeys.rewards.gallery({}),
    queryFn: fetchGalleryCounter,
  });

  const handleBackToMap = () => {
    void navigate(ROUTES.zones);
  };
  const handleGoToGallery = () => {
    void navigate(ROUTES.gallery);
  };

  if (summaryQuery.isPending) return <RuneSkeleton label={COPY.progress.loading} />;
  if (!summaryQuery.data?.totals.gameCompleted) return <Navigate to={ROUTES.zones} replace />;

  const { totals } = summaryQuery.data;
  const stats = [
    { label: COPY.ending.levels, value: `${totals.levelsCompleted}/${totals.levelsTotal}` },
    { label: COPY.ending.stars, value: `${totals.stars}/${totals.maxStars}` },
    { label: COPY.ending.time, value: formatDuration(totals.totalTimeMs) },
    {
      label: COPY.ending.rewards,
      value: galleryQuery.data
        ? `${galleryQuery.data.unlockedCount}/${galleryQuery.data.total}`
        : '…',
    },
  ];

  return (
    <section className="relative flex min-h-dvh flex-col items-center gap-8 overflow-hidden px-4 py-12 text-center">
      <FjordBackdrop isDimmed />
      <Bjorn mood="cheering" className="relative w-40" />
      <h1 className="relative font-display text-4xl text-rune-gold">{COPY.ending.title}</h1>
      <p className="relative max-w-xl text-xl text-frost">{COPY.ending.message}</p>
      <dl className="relative grid w-full max-w-xl grid-cols-2 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col-reverse rounded-2xl bg-fjord-800 p-4">
            <dt className="font-code text-sm font-semibold text-mist uppercase">{stat.label}</dt>
            <dd className="font-heading text-2xl font-bold text-frost">{stat.value}</dd>
          </div>
        ))}
      </dl>
      <motion.section
        variants={staggerList}
        initial="hidden"
        animate="visible"
        className="relative flex flex-col gap-2"
      >
        <h2 className="font-heading text-2xl font-bold text-aurora">{COPY.ending.creditsTitle}</h2>
        {COPY.ending.credits.map((creditName) => (
          <motion.p key={creditName} variants={popInItem} className="text-lg text-frost">
            {creditName}
          </motion.p>
        ))}
        <p className="text-mist">{COPY.ending.creditsSubtitle}</p>
      </motion.section>
      <div className="relative flex w-full max-w-xl flex-col gap-3 sm:flex-row">
        <Button variant="gold" onClick={handleGoToGallery} className="flex-1">
          {COPY.ending.gallery}
        </Button>
        <Button variant="ghost" onClick={handleBackToMap} className="flex-1">
          {COPY.ending.backToMap}
        </Button>
      </div>
    </section>
  );
}
