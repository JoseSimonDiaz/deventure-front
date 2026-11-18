import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LIMITS } from '@/shared/constants/limits';
import type { Settings } from '@/shared/contracts/auth';

type SettingsState = {
  musicVolume: number;
  isMusicMuted: boolean;
  effectsVolume: number;
  isEffectsMuted: boolean;
  brightness: number;
  setMusicVolume: (musicVolume: number) => void;
  toggleMusicMuted: () => void;
  setEffectsVolume: (effectsVolume: number) => void;
  toggleEffectsMuted: () => void;
  setBrightness: (brightness: number) => void;
  applyAccountSettings: (settings: Settings) => void;
};

export const toAccountSettings = (state: SettingsState): Settings => ({
  musicVolume: state.musicVolume,
  musicMuted: state.isMusicMuted,
  sfxVolume: state.effectsVolume,
  sfxMuted: state.isEffectsMuted,
  brightness: state.brightness,
});

export const useSettingsStore = create<SettingsState>()(
  persist(
    (setSettings) => ({
      musicVolume: LIMITS.musicVolumeDefault,
      isMusicMuted: false,
      effectsVolume: LIMITS.effectsVolumeDefault,
      isEffectsMuted: false,
      brightness: LIMITS.brightnessDefault,
      setMusicVolume: (musicVolume) => {
        setSettings({ musicVolume });
      },
      toggleMusicMuted: () => {
        setSettings((current) => ({ isMusicMuted: !current.isMusicMuted }));
      },
      setEffectsVolume: (effectsVolume) => {
        setSettings({ effectsVolume });
      },
      toggleEffectsMuted: () => {
        setSettings((current) => ({ isEffectsMuted: !current.isEffectsMuted }));
      },
      setBrightness: (brightness) => {
        setSettings({ brightness });
      },
      applyAccountSettings: (settings) => {
        setSettings({
          musicVolume: settings.musicVolume,
          isMusicMuted: settings.musicMuted,
          effectsVolume: settings.sfxVolume,
          isEffectsMuted: settings.sfxMuted,
          brightness: settings.brightness,
        });
      },
    }),
    {
      name: 'deventure-settings',
      partialize: (state) => ({
        musicVolume: state.musicVolume,
        isMusicMuted: state.isMusicMuted,
        effectsVolume: state.effectsVolume,
        isEffectsMuted: state.isEffectsMuted,
        brightness: state.brightness,
      }),
    },
  ),
);
