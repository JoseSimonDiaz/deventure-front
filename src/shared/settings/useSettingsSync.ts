import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { queryKeys } from '@/shared/api/queryKeys';
import { fetchAccountSettings, saveAccountSettings } from '@/shared/api/settingsApi';
import { LIMITS } from '@/shared/constants/limits';
import { useSessionStore } from '@/stores/sessionStore';
import { toAccountSettings, useSettingsStore } from '@/stores/settingsStore';

export function useSettingsSync(): void {
  const hasSession = useSessionStore((state) => Boolean(state.token));
  const applyAccountSettings = useSettingsStore((state) => state.applyAccountSettings);
  const { data: accountSettings } = useQuery({
    queryKey: queryKeys.account.settings,
    queryFn: fetchAccountSettings,
    enabled: hasSession,
  });

  useEffect(() => {
    if (accountSettings) applyAccountSettings(accountSettings);
  }, [accountSettings, applyAccountSettings]);

  useEffect(() => {
    if (!hasSession || !accountSettings) return;
    let pendingSaveId = 0;
    const unsubscribe = useSettingsStore.subscribe((settingsState) => {
      window.clearTimeout(pendingSaveId);
      pendingSaveId = window.setTimeout(() => {
        void saveAccountSettings(toAccountSettings(settingsState));
      }, LIMITS.settingsSyncDelayMs);
    });
    return () => {
      window.clearTimeout(pendingSaveId);
      unsubscribe();
    };
  }, [hasSession, accountSettings]);
}
