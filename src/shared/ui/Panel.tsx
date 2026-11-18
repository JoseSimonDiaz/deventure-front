import type { ReactNode } from 'react';

type PanelProps = { children: ReactNode; className?: string };

export function Panel({ children, className = '' }: PanelProps) {
  return (
    <div
      className={`rounded-3xl border-2 border-fjord-600 bg-fjord-800/90 p-6 shadow-chunky backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  );
}
