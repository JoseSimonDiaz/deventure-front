import { COPY } from '@/shared/constants/copy';
import type { AttemptResult } from '@/shared/contracts/gameplay';
import { formatDuration } from '@/shared/utils/formatDuration';

type LevelResult = NonNullable<AttemptResult['result']>;

type WonStatsProps = { result: LevelResult; livesLeft: number };

export function WonStats({ result, livesLeft }: WonStatsProps) {
  const stats = [
    { label: COPY.won.firstTry, value: `${result.correctFirstTry}/${result.total}` },
    { label: COPY.won.livesLeft, value: '❤️'.repeat(livesLeft) },
    { label: COPY.won.time, value: formatDuration(result.durationMs) },
    { label: COPY.won.hintsUsed, value: String(result.hintsUsed) },
  ];

  return (
    <dl className="grid w-full grid-cols-2 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col gap-1 rounded-2xl border-2 border-fjord-600 bg-fjord-800 p-4"
        >
          <dt className="font-code text-sm font-semibold text-mist uppercase">{stat.label}</dt>
          <dd className="font-heading text-2xl font-bold text-frost">{stat.value}</dd>
        </div>
      ))}
    </dl>
  );
}
