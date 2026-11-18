import { ArrowDown, ArrowUp } from 'lucide-react';
import { Link } from 'react-router';
import { COPY } from '@/shared/constants/copy';
import { buildAdminLevelPath } from '@/shared/constants/routes';
import type { AdminLevel } from '@/shared/contracts/admin';

type AdminLevelRowProps = {
  level: AdminLevel;
  levelIndex: number;
  levelsCount: number;
  onMove: (levelIndex: number, offset: number) => void;
  onTogglePublished: (change: { levelId: string; isPublished: boolean }) => void;
};

const MOVE_UP = -1;
const MOVE_DOWN = 1;
const ICON_BUTTON =
  'grid h-11 w-11 place-items-center rounded-lg border-2 border-fjord-600 text-aurora disabled:opacity-30';

export function AdminLevelRow({
  level,
  levelIndex,
  levelsCount,
  onMove,
  onTogglePublished,
}: AdminLevelRowProps) {
  const handleMoveUp = () => {
    onMove(levelIndex, MOVE_UP);
  };
  const handleMoveDown = () => {
    onMove(levelIndex, MOVE_DOWN);
  };
  const handleTogglePublished = () => {
    onTogglePublished({ levelId: level.id, isPublished: !level.isPublished });
  };

  return (
    <li className="flex flex-wrap items-center gap-2 rounded-xl bg-fjord-900 p-2">
      <span className="flex-1 font-semibold text-frost">
        {level.order}. {level.title}
        <span className="ml-2 font-code text-sm text-mist">
          {COPY.admin.challenges(level._count?.challenges ?? 0)} ·{' '}
          {level.isPublished ? COPY.admin.published : COPY.admin.unpublished}
        </span>
      </span>
      <button
        type="button"
        onClick={handleMoveUp}
        disabled={levelIndex === 0}
        aria-label={`${COPY.admin.moveUp}: ${level.title}`}
        className={ICON_BUTTON}
      >
        <ArrowUp aria-hidden="true" className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={handleMoveDown}
        disabled={levelIndex === levelsCount - 1}
        aria-label={`${COPY.admin.moveDown}: ${level.title}`}
        className={ICON_BUTTON}
      >
        <ArrowDown aria-hidden="true" className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={handleTogglePublished}
        className="min-h-11 rounded-lg border-2 border-fjord-600 px-3 text-sm text-frost"
      >
        {level.isPublished ? COPY.admin.unpublish : COPY.admin.publish}
      </button>
      <Link
        to={buildAdminLevelPath(level.id)}
        className="inline-flex min-h-11 items-center rounded-lg bg-aurora px-3 text-sm font-bold text-fjord-950"
      >
        {COPY.admin.editChallenges}
      </Link>
    </li>
  );
}
