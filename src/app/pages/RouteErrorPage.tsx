import { COPY } from '@/shared/constants/copy';
import { ROUTES } from '@/shared/constants/routes';
import { RuneStone } from '@/shared/illustrations/RuneStone';

export function RouteErrorPage() {
  return (
    <section className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-night px-4 text-center text-frost">
      <RuneStone glyph="thurisaz" tone="ember" className="w-24" />
      <h1 className="font-display text-3xl text-ember">{COPY.errors.routeErrorTitle}</h1>
      <p className="text-mist">{COPY.errors.generic}</p>
      <a href={ROUTES.home} className="font-heading text-lg font-bold text-rune-gold underline">
        {COPY.errors.backHome}
      </a>
    </section>
  );
}
