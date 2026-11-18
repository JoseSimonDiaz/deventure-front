import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { SpeechBubble } from '@/features/intro/components/SpeechBubble';
import { useMarkIntroSeenMutation } from '@/features/intro/hooks/useMarkIntroSeenMutation';
import { COPY } from '@/shared/constants/copy';
import { ROUTES } from '@/shared/constants/routes';
import type { UserPublic } from '@/shared/contracts/auth';
import { Bjorn } from '@/shared/illustrations/Bjorn';
import { FjordBackdrop } from '@/shared/illustrations/FjordBackdrop';
import { Button } from '@/shared/ui/Button';
import { useSessionStore } from '@/stores/sessionStore';

const LAST_DIALOGUE_INDEX = COPY.intro.dialogues.length - 1;

export function IntroPage() {
  const navigate = useNavigate();
  const updateUser = useSessionStore((state) => state.updateUser);
  const markIntroSeenMutation = useMarkIntroSeenMutation();
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [isDialogueComplete, setIsDialogueComplete] = useState(false);
  const [revealSignal, setRevealSignal] = useState(0);
  const isFinishRequestedRef = useRef(false);

  const isLastDialogue = dialogueIndex === LAST_DIALOGUE_INDEX;
  const currentDialogue = COPY.intro.dialogues[dialogueIndex] ?? '';
  const bjornMood = isDialogueComplete ? 'happy' : 'talking';

  const handleIntroSeen = (user: UserPublic) => {
    updateUser(user);
    void navigate(ROUTES.zones);
  };
  const releaseFinishRequest = () => {
    isFinishRequestedRef.current = false;
  };
  const finishIntro = () => {
    if (isFinishRequestedRef.current) return;
    isFinishRequestedRef.current = true;
    markIntroSeenMutation.mutate(undefined, {
      onSuccess: handleIntroSeen,
      onError: releaseFinishRequest,
    });
  };
  const handleNext = () => {
    if (!isDialogueComplete) {
      setRevealSignal((currentSignal) => currentSignal + 1);
      return;
    }
    if (isLastDialogue) {
      finishIntro();
      return;
    }
    setDialogueIndex((currentIndex) => currentIndex + 1);
    setRevealSignal(0);
  };
  const handleCompletionChange = useCallback((isComplete: boolean) => {
    setIsDialogueComplete(isComplete);
  }, []);

  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center gap-6 px-4 py-10">
      <h1 className="sr-only">{COPY.intro.title}</h1>
      <FjordBackdrop isDimmed />
      <Bjorn mood={bjornMood} className="relative w-44 sm:w-56" />
      <div className="relative w-full max-w-xl">
        <SpeechBubble
          key={dialogueIndex}
          text={currentDialogue}
          step={dialogueIndex + 1}
          totalSteps={COPY.intro.dialogues.length}
          revealSignal={revealSignal}
          onCompletionChange={handleCompletionChange}
        />
      </div>
      <div className="relative flex w-full max-w-xl flex-col gap-3 sm:flex-row-reverse">
        <Button
          variant="aurora"
          onClick={handleNext}
          disabled={markIntroSeenMutation.isPending}
          className="flex-1"
        >
          {isLastDialogue && isDialogueComplete ? COPY.intro.finish : COPY.intro.next}
        </Button>
        <Button
          variant="ghost"
          onClick={finishIntro}
          disabled={markIntroSeenMutation.isPending}
          className="flex-1"
        >
          {COPY.intro.skip}
        </Button>
      </div>
      {markIntroSeenMutation.isError && (
        <p role="alert" className="relative text-ember">
          {COPY.errors.generic}
        </p>
      )}
    </section>
  );
}
