import { Lock } from 'lucide-react';
import { ApiError } from '@/shared/api/ApiError';
import { COPY } from '@/shared/constants/copy';
import { Button } from '@/shared/ui/Button';
import { Panel } from '@/shared/ui/Panel';

type LevelLockedNoticeProps = { error: unknown; onBackToMap: () => void };

const LEVEL_LOCKED_CODE = 'LEVEL_LOCKED';

export function LevelLockedNotice({ error, onBackToMap }: LevelLockedNoticeProps) {
  const isLocked = error instanceof ApiError && error.code === LEVEL_LOCKED_CODE;

  return (
    <div className="mx-auto flex min-h-dvh max-w-md items-center px-4">
      <Panel className="flex w-full flex-col items-center gap-4 text-center">
        {isLocked && <Lock aria-hidden="true" className="h-12 w-12 text-rune-gold" />}
        <h1 className="font-heading text-2xl font-bold text-frost">
          {isLocked ? COPY.level.lockedTitle : COPY.errors.routeErrorTitle}
        </h1>
        <p role="alert" className="text-mist">
          {isLocked ? COPY.zones.lockedLevel : COPY.errors.generic}
        </p>
        <Button variant="gold" onClick={onBackToMap} className="w-full">
          {COPY.level.backToMap}
        </Button>
      </Panel>
    </div>
  );
}
