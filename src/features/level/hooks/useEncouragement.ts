import { useCallback, useRef } from 'react';
import { COPY } from '@/shared/constants/copy';

const PHRASES = COPY.encouragement.onLifeLost;
const NO_PREVIOUS_INDEX = -1;

export function useEncouragement() {
  const previousIndexRef = useRef(NO_PREVIOUS_INDEX);

  return useCallback((): string => {
    const candidateIndex = Math.floor(Math.random() * (PHRASES.length - 1));
    const phraseIndex =
      candidateIndex >= previousIndexRef.current && previousIndexRef.current !== NO_PREVIOUS_INDEX
        ? candidateIndex + 1
        : candidateIndex;
    previousIndexRef.current = phraseIndex;
    return PHRASES[phraseIndex] ?? PHRASES[0];
  }, []);
}
