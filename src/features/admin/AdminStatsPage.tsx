import { useQuery } from '@tanstack/react-query';
import { useState, type ChangeEvent } from 'react';
import { fetchAdminStats } from '@/features/admin/api/adminApi';
import { AdminNav } from '@/features/admin/components/AdminNav';
import { LevelStatsTable } from '@/features/admin/components/LevelStatsTable';
import { queryKeys } from '@/shared/api/queryKeys';
import { COPY } from '@/shared/constants/copy';
import { PageShell } from '@/shared/ui/PageShell';
import { RuneSkeleton } from '@/shared/ui/RuneSkeleton';
import { TextField } from '@/shared/ui/TextField';

export function AdminStatsPage() {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const statsQuery = useQuery({
    queryKey: [...queryKeys.admin.stats, fromDate, toDate],
    queryFn: () => fetchAdminStats(fromDate, toDate),
  });

  const handleFromChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFromDate(event.target.value);
  };
  const handleToChange = (event: ChangeEvent<HTMLInputElement>) => {
    setToDate(event.target.value);
  };

  const stats = statsQuery.data;
  const userCards = [
    { label: COPY.admin.totalUsers, value: stats?.users?.totalUsers },
    { label: COPY.admin.newUsers, value: stats?.users?.newUsers },
    { label: COPY.admin.activeUsers, value: stats?.users?.activeUsers7d },
    { label: COPY.admin.activePlayers, value: stats?.progress?.activePlayers },
  ];

  return (
    <PageShell title={COPY.admin.stats}>
      <AdminNav />
      <div className="grid gap-3 sm:grid-cols-2">
        <TextField
          label={COPY.admin.statsFrom}
          type="date"
          value={fromDate}
          onChange={handleFromChange}
        />
        <TextField
          label={COPY.admin.statsTo}
          type="date"
          value={toDate}
          onChange={handleToChange}
        />
      </div>
      {statsQuery.isPending && <RuneSkeleton label={COPY.admin.loading} />}
      {stats?.partial && (
        <p role="alert" className="text-ember">
          {COPY.admin.partial}
        </p>
      )}
      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {userCards.map((card) => (
          <div
            key={card.label}
            className="flex flex-col-reverse justify-end gap-1 rounded-2xl bg-fjord-800 p-4"
          >
            <dt className="font-code text-sm text-mist uppercase">{card.label}</dt>
            <dd className="font-heading text-2xl font-bold text-frost">
              {card.value ?? COPY.admin.unavailable}
            </dd>
          </div>
        ))}
      </dl>
      {stats?.gameplay && <LevelStatsTable gameplayStats={stats.gameplay} />}
    </PageShell>
  );
}
