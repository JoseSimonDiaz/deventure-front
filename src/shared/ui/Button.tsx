import { motion } from 'motion/react';
import type { MouseEvent, ReactNode } from 'react';
import { playRuneClick } from '@/shared/sound/soundEffects';

type ButtonVariant = 'aurora' | 'gold' | 'ghost';

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  type?: 'button' | 'submit';
  disabled?: boolean;
  icon?: ReactNode;
  className?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  aurora: 'bg-aurora text-fjord-950 hover:brightness-110',
  gold: 'bg-rune-gold text-fjord-950 hover:brightness-110',
  ghost: 'bg-fjord-700 text-frost hover:bg-fjord-600',
};

const HOVER_LIFT = { y: -2 };
const PRESS_SINK = { y: 4, boxShadow: 'var(--shadow-chunky-pressed)' };

export function Button({
  children,
  variant = 'aurora',
  type = 'button',
  disabled = false,
  icon,
  className = '',
  onClick,
}: ButtonProps) {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    playRuneClick();
    onClick?.(event);
  };

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      whileHover={disabled ? undefined : HOVER_LIFT}
      whileTap={disabled ? undefined : PRESS_SINK}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-6 font-heading text-lg font-bold tracking-wide uppercase shadow-chunky transition-[filter,background-color] disabled:cursor-not-allowed disabled:opacity-60 ${VARIANT_CLASSES[variant]} ${className}`}
    >
      {icon}
      {children}
    </motion.button>
  );
}
