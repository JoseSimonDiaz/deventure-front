import { useReducedMotion } from 'motion/react';
import { useCallback, useEffect, useState } from 'react';
import { LIMITS } from '@/shared/constants/limits';

type Typewriter = { visibleText: string; isComplete: boolean; revealAll: () => void };

export function useTypewriter(fullText: string): Typewriter {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const [visibleLength, setVisibleLength] = useState(prefersReducedMotion ? fullText.length : 0);
  const isComplete = visibleLength >= fullText.length;

  useEffect(() => {
    if (isComplete) return;
    const timeoutId = window.setTimeout(() => {
      setVisibleLength((currentLength) => currentLength + 1);
    }, LIMITS.typewriterCharacterDelayMs);
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [visibleLength, isComplete]);

  const revealAll = useCallback(() => {
    setVisibleLength(fullText.length);
  }, [fullText.length]);

  return { visibleText: fullText.slice(0, visibleLength), isComplete, revealAll };
}
