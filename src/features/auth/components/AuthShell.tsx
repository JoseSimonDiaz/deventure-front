import { useAnimate } from 'motion/react';
import { useEffect, type ReactNode } from 'react';
import { FjordBackdrop } from '@/shared/illustrations/FjordBackdrop';
import { SHAKE_KEYFRAMES } from '@/shared/motion/transitions';
import { Panel } from '@/shared/ui/Panel';

type AuthShellProps = {
  title: string;
  errorCount: number;
  children: ReactNode;
};

const SHAKE_TRANSITION = { duration: 0.45 };

export function AuthShell({ title, errorCount, children }: AuthShellProps) {
  const [shieldScope, animateShield] = useAnimate<HTMLDivElement>();

  useEffect(() => {
    if (!errorCount) return;
    void animateShield(shieldScope.current, { x: SHAKE_KEYFRAMES }, SHAKE_TRANSITION);
  }, [errorCount, animateShield, shieldScope]);

  return (
    <section className="relative flex min-h-dvh items-center justify-center px-4 py-10">
      <FjordBackdrop isDimmed />
      <div ref={shieldScope} className="relative w-full max-w-md">
        <Panel className="relative border-rune-gold/40">
          <h1 className="mb-6 text-center font-display text-3xl text-rune-gold">{title}</h1>
          {children}
        </Panel>
      </div>
    </section>
  );
}
