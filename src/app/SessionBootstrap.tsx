import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { fetchCurrentUser } from '@/shared/api/accountApi';
import { queryKeys } from '@/shared/api/queryKeys';
import { useSettingsSync } from '@/shared/settings/useSettingsSync';
import { useSessionStore } from '@/stores/sessionStore';

export function SessionBootstrap() {
  const hasSession = useSessionStore((state) => Boolean(state.token));
  const updateUser = useSessionStore((state) => state.updateUser);
  useSettingsSync();

  const { data: currentUser } = useQuery({
    queryKey: queryKeys.account.me,
    queryFn: fetchCurrentUser,
    enabled: hasSession,
  });

  useEffect(() => {
    if (currentUser) updateUser(currentUser);
  }, [currentUser, updateUser]);

  return null;
}
