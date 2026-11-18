import { useQuery } from '@tanstack/react-query';
import { fetchAdminZones } from '@/features/admin/api/adminApi';
import { queryKeys } from '@/shared/api/queryKeys';
import { COPY } from '@/shared/constants/copy';
import type { AdminStats } from '@/shared/contracts/admin';
import { formatDuration } from '@/shared/utils/formatDuration';

type LevelStatsTableProps = { gameplayStats: NonNullable<AdminStats['gameplay']> };

const CELL = 'px-3 py-2 text-left';

export function LevelStatsTable({ gameplayStats }: LevelStatsTableProps) {
  const zonesQuery = useQuery({ queryKey: queryKeys.admin.zones, queryFn: fetchAdminZones });
  const levelTitles = new Map(
    (zonesQuery.data ?? []).flatMap((zone) =>
      zone.levels.map((level) => [level.id, `${zone.name} · ${level.title}`] as const),
    ),
  );

  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-heading text-xl font-bold text-rune-gold">{COPY.admin.levelStats}</h2>
      <div className="overflow-x-auto rounded-xl border-2 border-fjord-600">
        <table className="w-full text-sm">
          <thead className="bg-fjord-800 text-aurora">
            <tr>
              <th scope="col" className={CELL}>
                {COPY.admin.level}
              </th>
              <th scope="col" className={CELL}>
                {COPY.admin.playersStarted}
              </th>
              <th scope="col" className={CELL}>
                {COPY.admin.playersWon}
              </th>
              <th scope="col" className={CELL}>
                {COPY.admin.sessions}
              </th>
              <th scope="col" className={CELL}>
                {COPY.admin.failRate}
              </th>
              <th scope="col" className={CELL}>
                {COPY.admin.avgTime}
              </th>
            </tr>
          </thead>
          <tbody>
            {gameplayStats.levels.map((levelStats) => (
              <tr key={levelStats.levelId} className="odd:bg-fjord-900">
                <td className={CELL}>
                  {levelTitles.get(levelStats.levelId) ?? levelStats.levelId}
                </td>
                <td className={CELL}>{levelStats.playersStarted}</td>
                <td className={CELL}>{levelStats.playersWon}</td>
                <td className={CELL}>{levelStats.sessions}</td>
                <td className={CELL}>{levelStats.failRate}%</td>
                <td className={CELL}>{formatDuration(levelStats.avgDurationMs)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2 className="font-heading text-xl font-bold text-rune-gold">{COPY.admin.topFailed}</h2>
      <ul className="flex flex-col gap-2">
        {gameplayStats.topFailedChallenges.map((challengeStats) => (
          <li
            key={challengeStats.challengeId}
            className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-fjord-800 px-4 py-3"
          >
            <span className="font-semibold text-frost">
              {levelTitles.get(challengeStats.levelId) ?? COPY.admin.unavailable} ·{' '}
              {COPY.admin.challengeNumber(challengeStats.challengeNumber)}
            </span>
            <span className="font-code text-sm text-ember">
              {COPY.admin.errorsSummary(challengeStats.errors, challengeStats.attempts)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
