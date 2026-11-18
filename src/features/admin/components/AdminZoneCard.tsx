import { useState, type ChangeEvent, type SubmitEvent } from 'react';
import { AdminLevelRow } from '@/features/admin/components/AdminLevelRow';
import type { useAdminZones } from '@/features/admin/hooks/useAdminZones';
import { COPY } from '@/shared/constants/copy';
import type { AdminZone } from '@/shared/contracts/admin';
import { Button } from '@/shared/ui/Button';
import { Panel } from '@/shared/ui/Panel';
import { TextField } from '@/shared/ui/TextField';

type AdminZoneCardProps = { zone: AdminZone; actions: ReturnType<typeof useAdminZones> };

function describeZoneStatus(zone: AdminZone): string {
  if (zone.archivedAt) return COPY.admin.archived;
  return zone.isPublished ? COPY.admin.published : COPY.admin.unpublished;
}

export function AdminZoneCard({ zone, actions }: AdminZoneCardProps) {
  const [newLevelTitle, setNewLevelTitle] = useState('');
  const isArchived = Boolean(zone.archivedAt);
  const levelIds = zone.levels.map((level) => level.id);

  const handleTogglePublished = () => {
    actions.updateZone({ zoneId: zone.id, zonePatch: { isPublished: !zone.isPublished } });
  };
  const handleToggleArchived = () => {
    actions.updateZone({ zoneId: zone.id, zonePatch: { isArchived: !isArchived } });
  };
  const handleMoveLevel = (levelIndex: number, offset: number) => {
    const reordered = [...levelIds];
    const [movedLevelId] = reordered.splice(levelIndex, 1);
    if (!movedLevelId) return;
    reordered.splice(levelIndex + offset, 0, movedLevelId);
    actions.reorderLevels({ zoneId: zone.id, levelIds: reordered });
  };
  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewLevelTitle(event.target.value);
  };
  const handleCreateLevel = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newLevelTitle.trim()) return;
    actions.createLevel({ zoneId: zone.id, title: newLevelTitle.trim() });
    setNewLevelTitle('');
  };

  return (
    <Panel className={isArchived ? 'opacity-60' : ''}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-heading text-xl font-bold text-frost">
              {zone.order}. {zone.name}
            </h2>
            <p className="font-code text-sm text-mist">
              {zone.slug} · {describeZoneStatus(zone)}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="ghost" onClick={handleTogglePublished} className="text-sm">
              {zone.isPublished ? COPY.admin.unpublish : COPY.admin.publish}
            </Button>
            <Button variant="ghost" onClick={handleToggleArchived} className="text-sm">
              {isArchived ? COPY.admin.unarchive : COPY.admin.archive}
            </Button>
          </div>
        </div>
        <ol className="flex flex-col gap-2">
          {zone.levels.map((level, levelIndex) => (
            <AdminLevelRow
              key={level.id}
              level={level}
              levelIndex={levelIndex}
              levelsCount={zone.levels.length}
              onMove={handleMoveLevel}
              onTogglePublished={actions.setLevelPublished}
            />
          ))}
        </ol>
        <form onSubmit={handleCreateLevel} className="flex flex-col gap-2 sm:flex-row sm:items-end">
          <div className="flex-1">
            <TextField
              label={COPY.admin.levelTitle}
              value={newLevelTitle}
              onChange={handleTitleChange}
            />
          </div>
          <Button type="submit" variant="aurora">
            {COPY.admin.newLevel}
          </Button>
        </form>
      </div>
    </Panel>
  );
}
