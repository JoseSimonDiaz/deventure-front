import { ChevronDown, Lock } from 'lucide-react';
import { LevelRow } from '@/features/progress/components/LevelRow';
import { COPY } from '@/shared/constants/copy';
import type { ZoneProgress } from '@/shared/contracts/progress';
import { ProgressBar } from '@/shared/ui/ProgressBar';

type ZoneProgressCardProps = { zone: ZoneProgress };

export function ZoneProgressCard({ zone }: ZoneProgressCardProps) {
  const summary = (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 font-heading text-xl font-bold text-frost">
          {!zone.unlocked && <Lock aria-hidden="true" className="h-5 w-5 text-mist" />}
          {zone.name}
        </h2>
        <span className="font-code text-sm text-rune-gold">
          {zone.unlocked ? `${zone.percent}%` : COPY.progress.zoneLocked}
        </span>
      </div>
      <ProgressBar percent={zone.percent} />
      <p className="font-code text-sm text-mist">
        {COPY.progress.zoneStars(zone.stars, zone.maxStars)} ·{' '}
        {COPY.zones.zoneProgress(zone.levelsCompleted, zone.levelsTotal)}
      </p>
    </div>
  );

  if (!zone.unlocked) {
    return (
      <section className="rounded-3xl border-2 border-fjord-600 bg-fjord-800 p-5 opacity-50">
        {summary}
      </section>
    );
  }

  return (
    <details className="group rounded-3xl border-2 border-fjord-600 bg-fjord-800 p-5 shadow-chunky">
      <summary className="flex min-h-11 cursor-pointer list-none items-start gap-3">
        {summary}
        <ChevronDown
          aria-hidden="true"
          className="mt-1 h-6 w-6 shrink-0 text-mist transition-transform group-open:rotate-180 motion-reduce:transition-none"
        />
      </summary>
      <ol className="mt-4 flex flex-col gap-2">
        {zone.levels.map((level) => (
          <LevelRow key={level.levelId} level={level} />
        ))}
      </ol>
    </details>
  );
}
