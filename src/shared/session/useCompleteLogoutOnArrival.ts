import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { COPY } from '@/shared/constants/copy';
import { isLogoutNavigation } from '@/shared/session/logoutNavigation';
import { useSessionStore } from '@/stores/sessionStore';
import { useToastStore } from '@/stores/toastStore';

export function useCompleteLogoutOnArrival(): void {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const endSession = useSessionStore((state) => state.endSession);
  const showToast = useToastStore((state) => state.showToast);

  useEffect(() => {
    if (!isLogoutNavigation(location.state)) return;
    endSession();
    queryClient.clear();
    showToast(COPY.logout.farewell);
    void navigate(location.pathname, { replace: true });
  }, [location, navigate, queryClient, endSession, showToast]);
}
