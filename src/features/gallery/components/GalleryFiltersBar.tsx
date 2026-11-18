import { COPY } from '@/shared/constants/copy';
import {
  REWARD_STATUSES,
  REWARD_TYPES,
  type GalleryFilters,
  type RewardStatus,
  type RewardType,
} from '@/shared/contracts/rewards';

type GalleryFiltersBarProps = {
  filters: GalleryFilters;
  onChange: (filters: GalleryFilters) => void;
};

const FILTER_TITLE_CLASSES = 'w-full font-code text-sm font-semibold text-mist uppercase';

const chipTone = (isActive: boolean) =>
  isActive
    ? 'border-rune-gold bg-rune-gold text-fjord-950'
    : 'border-fjord-600 bg-fjord-800 text-frost hover:border-aurora';

export function GalleryFiltersBar({ filters, onChange }: GalleryFiltersBarProps) {
  const handleType = (type: RewardType | undefined) => () => {
    onChange({ ...filters, type });
  };
  const handleStatus = (status: RewardStatus | undefined) => () => {
    onChange({ ...filters, status });
  };

  return (
    <div className="flex flex-col gap-3">
      <div role="group" aria-label={COPY.gallery.typeFilterLabel} className="flex flex-wrap gap-2">
        <span aria-hidden="true" className={FILTER_TITLE_CLASSES}>
          {COPY.gallery.typeFilterLabel}
        </span>
        <button
          type="button"
          aria-pressed={!filters.type}
          onClick={handleType(undefined)}
          className={`min-h-11 rounded-full border-2 px-4 font-semibold ${chipTone(!filters.type)}`}
        >
          {COPY.gallery.allFilter}
        </button>
        {REWARD_TYPES.map((type) => (
          <button
            key={type}
            type="button"
            aria-pressed={filters.type === type}
            onClick={handleType(type)}
            className={`min-h-11 rounded-full border-2 px-4 font-semibold ${chipTone(filters.type === type)}`}
          >
            {COPY.gallery.typeLabels[type]}
          </button>
        ))}
      </div>
      <div
        role="group"
        aria-label={COPY.gallery.statusFilterLabel}
        className="flex flex-wrap gap-2"
      >
        <span aria-hidden="true" className={FILTER_TITLE_CLASSES}>
          {COPY.gallery.statusFilterLabel}
        </span>
        <button
          type="button"
          aria-pressed={!filters.status}
          onClick={handleStatus(undefined)}
          className={`min-h-11 rounded-full border-2 px-4 font-semibold ${chipTone(!filters.status)}`}
        >
          {COPY.gallery.allFilter}
        </button>
        {REWARD_STATUSES.map((status) => (
          <button
            key={status}
            type="button"
            aria-pressed={filters.status === status}
            onClick={handleStatus(status)}
            className={`min-h-11 rounded-full border-2 px-4 font-semibold ${chipTone(filters.status === status)}`}
          >
            {COPY.gallery.statusLabels[status]}
          </button>
        ))}
      </div>
    </div>
  );
}
