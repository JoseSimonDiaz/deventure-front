import { motion } from 'motion/react';
import { useEffect } from 'react';
import { useTypewriter } from '@/features/intro/hooks/useTypewriter';
import { COPY } from '@/shared/constants/copy';
import { popInItem } from '@/shared/motion/transitions';

type SpeechBubbleProps = {
  text: string;
  step: number;
  totalSteps: number;
  revealSignal: number;
  onCompletionChange: (isComplete: boolean) => void;
};

export function SpeechBubble({
  text,
  step,
  totalSteps,
  revealSignal,
  onCompletionChange,
}: SpeechBubbleProps) {
  const { visibleText, isComplete, revealAll } = useTypewriter(text);

  useEffect(() => {
    if (revealSignal) revealAll();
  }, [revealSignal, revealAll]);

  useEffect(() => {
    onCompletionChange(isComplete);
  }, [isComplete, onCompletionChange]);

  return (
    <motion.div
      variants={popInItem}
      initial="hidden"
      animate="visible"
      className="relative rounded-3xl border-2 border-aurora/50 bg-fjord-800 p-6 shadow-chunky"
    >
      <div className="mb-2 flex items-center justify-between font-code text-sm font-semibold">
        <p className="text-rune-gold uppercase">{COPY.intro.bjornName}</p>
        <p className="text-mist">
          <span aria-hidden="true">{COPY.intro.dialogueStep(step, totalSteps)}</span>
          <span className="sr-only">{COPY.intro.dialogueStepLabel(step, totalSteps)}</span>
        </p>
      </div>
      <p className="sr-only">{text}</p>
      <p aria-hidden="true" className="min-h-24 text-lg leading-relaxed text-frost">
        {visibleText}
      </p>
    </motion.div>
  );
}
