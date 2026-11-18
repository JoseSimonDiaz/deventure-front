import { AnimatePresence, motion } from 'motion/react';
import { useEffect } from 'react';
import { LIMITS } from '@/shared/constants/limits';
import { Bjorn } from '@/shared/illustrations/Bjorn';

type EncouragementBubbleProps = { message: string; onDismiss: () => void };

const BUBBLE_HIDDEN = { opacity: 0, x: -40 };
const BUBBLE_VISIBLE = { opacity: 1, x: 0 };

export function EncouragementBubble({ message, onDismiss }: EncouragementBubbleProps) {
  useEffect(() => {
    if (!message) return;
    const timeoutId = window.setTimeout(onDismiss, LIMITS.encouragementDurationMs);
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [message, onDismiss]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          key={message}
          initial={BUBBLE_HIDDEN}
          animate={BUBBLE_VISIBLE}
          exit={BUBBLE_HIDDEN}
          className="flex items-end gap-3"
        >
          <Bjorn mood="happy" className="w-16 shrink-0" />
          <p
            aria-live="polite"
            className="rounded-2xl rounded-bl-none border-2 border-aurora/50 bg-fjord-800 px-4 py-3 text-frost"
          >
            {message}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
