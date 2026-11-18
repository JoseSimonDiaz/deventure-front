import { useState, type ChangeEvent, type SubmitEvent } from 'react';
import { COPY } from '@/shared/constants/copy';
import type { ZoneDraft } from '@/shared/contracts/admin';
import { Button } from '@/shared/ui/Button';
import { Panel } from '@/shared/ui/Panel';
import { TextField } from '@/shared/ui/TextField';

type NewZoneFormProps = { onCreate: (zoneDraft: ZoneDraft) => void };

const EMPTY_DRAFT: ZoneDraft = { slug: '', name: '', description: '', theorySummary: '' };

export function NewZoneForm({ onCreate }: NewZoneFormProps) {
  const [zoneDraft, setZoneDraft] = useState<ZoneDraft>(EMPTY_DRAFT);

  const handleFieldChange =
    (fieldName: keyof ZoneDraft) => (event: ChangeEvent<HTMLInputElement>) => {
      setZoneDraft((currentDraft) => ({ ...currentDraft, [fieldName]: event.target.value }));
    };
  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    onCreate(zoneDraft);
    setZoneDraft(EMPTY_DRAFT);
  };

  const isComplete = Object.values(zoneDraft).every((fieldValue) => fieldValue.trim());

  return (
    <Panel>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <h2 className="font-heading text-xl font-bold text-rune-gold">{COPY.admin.newZone}</h2>
        <TextField
          label={COPY.admin.zoneName}
          value={zoneDraft.name}
          onChange={handleFieldChange('name')}
        />
        <TextField
          label={COPY.admin.zoneSlug}
          value={zoneDraft.slug}
          onChange={handleFieldChange('slug')}
        />
        <TextField
          label={COPY.admin.zoneDescription}
          value={zoneDraft.description}
          onChange={handleFieldChange('description')}
        />
        <TextField
          label={COPY.admin.zoneTheory}
          value={zoneDraft.theorySummary}
          onChange={handleFieldChange('theorySummary')}
        />
        <Button type="submit" variant="aurora" disabled={!isComplete}>
          {COPY.admin.create}
        </Button>
      </form>
    </Panel>
  );
}
