import { AnimatePresence, motion } from 'motion/react';
import { useEffect } from 'react';
import { LIMITS } from '@/shared/constants/limits';
import { useToastStore } from '@/stores/toastStore';

const TOAST_ENTER = { opacity: 0, y: -24 };
const TOAST_VISIBLE = { opacity: 1, y: 0 };

export function Toast() {
  const message = useToastStore((state) => state.message);
  const dismissToast = useToastStore((state) => state.dismissToast);

  useEffect(() => {
    if (!message) return;
    const timeoutId = window.setTimeout(dismissToast, LIMITS.toastDurationMs);
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [message, dismissToast]);

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <AnimatePresence>
        {message && (
          <motion.p
            key={message}
            initial={TOAST_ENTER}
            animate={TOAST_VISIBLE}
            exit={TOAST_ENTER}
            className="rounded-2xl border-2 border-rune-gold/50 bg-fjord-900 px-5 py-3 font-semibold text-frost shadow-chunky"
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
