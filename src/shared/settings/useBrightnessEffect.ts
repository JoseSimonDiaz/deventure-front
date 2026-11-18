import { useEffect } from 'react';
import { LIMITS } from '@/shared/constants/limits';
import { useSettingsStore } from '@/stores/settingsStore';

export function useBrightnessEffect(): void {
  const brightness = useSettingsStore((state) => state.brightness);

  useEffect(() => {
    document.documentElement.style.filter = `brightness(${brightness / LIMITS.brightnessDefault})`;
  }, [brightness]);
}
