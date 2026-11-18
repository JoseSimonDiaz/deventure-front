import { useNavigate } from 'react-router';
import { COPY } from '@/shared/constants/copy';
import { ROUTES } from '@/shared/constants/routes';
import { Drakkar } from '@/shared/illustrations/Drakkar';
import { Button } from '@/shared/ui/Button';

export function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    void navigate(ROUTES.home);
  };

  return (
    <section className="flex min-h-dvh flex-col items-center justify-center gap-6 px-4 text-center">
      <Drakkar className="w-56" />
      <h1 className="font-display text-3xl text-rune-gold">{COPY.errors.notFoundTitle}</h1>
      <Button variant="gold" onClick={handleGoHome}>
        {COPY.errors.backHome}
      </Button>
    </section>
  );
}
