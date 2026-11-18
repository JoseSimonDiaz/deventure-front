import { CheckCircle2, Flame, XCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { COPY } from '@/shared/constants/copy';
import { LIMITS } from '@/shared/constants/limits';
import type { AttemptResult } from '@/shared/contracts/gameplay';
import { Bjorn } from '@/shared/illustrations/Bjorn';
import { SHAKE_KEYFRAMES, popInItem } from '@/shared/motion/transitions';
import { Button } from '@/shared/ui/Button';

type FeedbackPanelProps = {
  feedback: AttemptResult;
  correctStreak: number;
  onContinue: () => void;
};

const SLIDE_UP = { opacity: 0, y: 40 };
const SETTLED = { opacity: 1, y: 0 };
const SHAKE = { x: SHAKE_KEYFRAMES };

const FEEDBACK_TONES = {
  correct: {
    panelClassName: 'border-aurora bg-aurora-deep',
    icon: <CheckCircle2 aria-hidden="true" className="h-7 w-7 text-aurora" />,
    title: COPY.level.correct,
    bjornMood: 'cheering',
    buttonVariant: 'aurora',
    buttonLabel: COPY.level.continue,
    titleAnimation: undefined,
  },
  incorrect: {
    panelClassName: 'border-ember bg-ember-deep',
    icon: <XCircle aria-hidden="true" className="h-7 w-7 text-ember" />,
    title: COPY.level.incorrect,
    bjornMood: 'worried',
    buttonVariant: 'gold',
    buttonLabel: COPY.level.tryAgain,
    titleAnimation: SHAKE,
  },
} as const;

export function FeedbackPanel({ feedback, correctStreak, onContinue }: FeedbackPanelProps) {
  const isCorrect = feedback.correct;
  const tone = isCorrect ? FEEDBACK_TONES.correct : FEEDBACK_TONES.incorrect;
  const detail = isCorrect ? feedback.explanation : feedback.message;
  const isStreakVisible = isCorrect && correctStreak >= LIMITS.streakCelebrationMin;

  return (
    <motion.div
      role="status"
      aria-live="assertive"
      initial={SLIDE_UP}
      animate={SETTLED}
      className={`flex flex-col gap-4 rounded-3xl border-2 p-4 shadow-chunky sm:p-5 ${tone.panelClassName}`}
    >
      <div className="flex items-center gap-3">
        <Bjorn mood={tone.bjornMood} className="w-16 shrink-0 sm:w-20" />
        <div className="flex min-w-0 flex-col gap-1">
          <motion.p
            animate={tone.titleAnimation}
            className="flex items-center gap-2 font-heading text-2xl font-bold text-frost"
          >
            {tone.icon}
            {tone.title}
          </motion.p>
          {isStreakVisible && (
            <motion.p
              variants={popInItem}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-1 self-start rounded-full bg-night/40 px-3 py-1 font-code text-sm font-semibold text-rune-gold"
            >
              <Flame aria-hidden="true" className="h-4 w-4" />
              {COPY.level.streak(correctStreak)}
            </motion.p>
          )}
          {detail && <p className="text-lg text-frost">{detail}</p>}
        </div>
      </div>
      <Button variant={tone.buttonVariant} onClick={onContinue} className="w-full">
        {tone.buttonLabel}
      </Button>
    </motion.div>
  );
}
