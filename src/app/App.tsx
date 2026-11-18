import { QueryClientProvider } from '@tanstack/react-query';
import { MotionConfig } from 'motion/react';
import { RouterProvider } from 'react-router/dom';
import { router } from '@/app/router';
import { SessionBootstrap } from '@/app/SessionBootstrap';
import { queryClient } from '@/shared/api/queryClient';
import { useBrightnessEffect } from '@/shared/settings/useBrightnessEffect';
import { useBackgroundMusic } from '@/shared/sound/backgroundMusic';

export function App() {
  useBrightnessEffect();
  useBackgroundMusic();

  return (
    <QueryClientProvider client={queryClient}>
      <MotionConfig reducedMotion="user">
        <SessionBootstrap />
        <RouterProvider router={router} />
      </MotionConfig>
    </QueryClientProvider>
  );
}
