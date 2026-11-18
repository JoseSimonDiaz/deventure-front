import { AdminNav } from '@/features/admin/components/AdminNav';
import { AdminZoneCard } from '@/features/admin/components/AdminZoneCard';
import { NewZoneForm } from '@/features/admin/components/NewZoneForm';
import { useAdminZones } from '@/features/admin/hooks/useAdminZones';
import { COPY } from '@/shared/constants/copy';
import { PageShell } from '@/shared/ui/PageShell';
import { RuneSkeleton } from '@/shared/ui/RuneSkeleton';

export function AdminZonesPage() {
  const adminZones = useAdminZones();
  const { zonesQuery } = adminZones;

  return (
    <PageShell title={COPY.admin.title}>
      <AdminNav />
      {zonesQuery.isPending && <RuneSkeleton label={COPY.admin.loading} />}
      {zonesQuery.isError && (
        <p role="alert" className="text-ember">
          {COPY.errors.generic}
        </p>
      )}
      {zonesQuery.data?.map((zone) => (
        <AdminZoneCard key={zone.id} zone={zone} actions={adminZones} />
      ))}
      <NewZoneForm onCreate={adminZones.createZone} />
    </PageShell>
  );
}
