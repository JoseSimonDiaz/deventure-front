import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthResponse, UserPublic } from '@/shared/contracts/auth';

type SessionState = {
  token: string | null;
  user: UserPublic | null;
  startSession: (authResponse: AuthResponse) => void;
  updateUser: (user: UserPublic) => void;
  endSession: () => void;
};

export const useSessionStore = create<SessionState>()(
  persist(
    (setSession) => ({
      token: null,
      user: null,
      startSession: (authResponse) => {
        setSession({ token: authResponse.token, user: authResponse.user });
      },
      updateUser: (user) => {
        setSession({ user });
      },
      endSession: () => {
        setSession({ token: null, user: null });
      },
    }),
    {
      name: 'deventure-session',
      partialize: (state) => ({ token: state.token, user: state.user }),
    },
  ),
);
