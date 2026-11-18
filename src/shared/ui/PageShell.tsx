import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { COPY } from '@/shared/constants/copy';
import { ROUTES } from '@/shared/constants/routes';
import { Button } from '@/shared/ui/Button';

type PageShellProps = { title: string; children: ReactNode; backTo?: string };

const BACK_ICON = <ArrowLeft aria-hidden="true" />;

export function PageShell({ title, children, backTo = ROUTES.zones }: PageShellProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    void navigate(backTo);
  };

  return (
    <div className="min-h-dvh pb-16">
      <header className="sticky top-0 z-20 flex items-center gap-3 border-b-2 border-fjord-700 bg-fjord-900/90 px-4 py-3 backdrop-blur-md">
        <Button variant="ghost" onClick={handleBack} icon={BACK_ICON} className="w-12 px-0!">
          <span className="sr-only">{COPY.hud.map}</span>
        </Button>
        <h1 className="font-display text-2xl text-rune-gold">{title}</h1>
      </header>
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 pt-6">{children}</div>
    </div>
  );
}
