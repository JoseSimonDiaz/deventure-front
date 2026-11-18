import { HomeBackdrop } from '@/features/home/components/HomeBackdrop';
import { HomeLogo } from '@/features/home/components/HomeLogo';
import { HomeMenu } from '@/features/home/components/HomeMenu';
import { Drakkar } from '@/shared/illustrations/Drakkar';

export function HomePage() {
  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center gap-10 px-4 pb-28">
      <HomeBackdrop />
      <div className="relative flex flex-col items-center gap-8">
        <HomeLogo />
        <Drakkar className="w-60 sm:w-80" />
        <HomeMenu />
      </div>
    </section>
  );
}
