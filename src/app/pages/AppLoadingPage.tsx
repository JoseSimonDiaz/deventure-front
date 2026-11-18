import { COPY } from '@/shared/constants/copy';
import { RuneSkeleton } from '@/shared/ui/RuneSkeleton';

export function AppLoadingPage() {
  return (
    <section className="grid min-h-dvh place-items-center bg-night">
      <RuneSkeleton label={COPY.app.loading} />
    </section>
  );
}
