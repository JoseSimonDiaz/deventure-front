import { Flame, Percent, Star, Trophy } from 'lucide-react';
import { COPY } from '@/shared/constants/copy';
import type { ProgressSummary } from '@/shared/contracts/progress';
import { ProgressBar } from '@/shared/ui/ProgressBar';

type TotalsCardProps = { totals: ProgressSummary['totals'] };

export function TotalsCard({ totals }: TotalsCardProps) {
  const items = [
    { label: COPY.progress.percent, value: `${totals.percent}%`, icon: Percent },
    { label: COPY.progress.stars, value: `${totals.stars}/${totals.maxStars}`, icon: Star },
    {
      label: COPY.progress.levels,
      value: `${totals.levelsCompleted}/${totals.levelsTotal}`,
      icon: Trophy,
    },
    {
      label: COPY.progress.streak,
      value: COPY.progress.streakDays(totals.streakDays),
      icon: Flame,
    },
  ];

  return (
    <section className="flex flex-col gap-4 rounded-3xl border-2 border-rune-gold/40 bg-fjord-800 p-5 shadow-chunky">
      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col-reverse items-center gap-1 text-center">
            <dt className="font-code text-sm font-semibold text-mist uppercase">{item.label}</dt>
            <dd className="flex flex-col items-center gap-1 font-heading text-2xl font-bold text-frost">
              <item.icon aria-hidden="true" className="h-6 w-6 text-rune-gold" />
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
      <ProgressBar percent={totals.percent} />
    </section>
  );
}
