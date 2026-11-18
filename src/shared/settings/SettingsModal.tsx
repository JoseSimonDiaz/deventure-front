import { Music, Volume2, VolumeX } from 'lucide-react';
import { useNavigate } from 'react-router';
import { COPY } from '@/shared/constants/copy';
import { LIMITS } from '@/shared/constants/limits';
import { ROUTES } from '@/shared/constants/routes';
import { Button } from '@/shared/ui/Button';
import { Modal } from '@/shared/ui/Modal';
import { Slider } from '@/shared/ui/Slider';
import { useSessionStore } from '@/stores/sessionStore';
import { useSettingsStore } from '@/stores/settingsStore';

type SettingsModalProps = { isOpen: boolean; onClose: () => void };

const MUSIC_ICON = <Music aria-hidden="true" />;

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const navigate = useNavigate();
  const hasSession = useSessionStore((state) => Boolean(state.token));
  const musicVolume = useSettingsStore((state) => state.musicVolume);
  const isMusicMuted = useSettingsStore((state) => state.isMusicMuted);
  const effectsVolume = useSettingsStore((state) => state.effectsVolume);
  const isEffectsMuted = useSettingsStore((state) => state.isEffectsMuted);
  const brightness = useSettingsStore((state) => state.brightness);
  const setMusicVolume = useSettingsStore((state) => state.setMusicVolume);
  const toggleMusicMuted = useSettingsStore((state) => state.toggleMusicMuted);
  const setEffectsVolume = useSettingsStore((state) => state.setEffectsVolume);
  const toggleEffectsMuted = useSettingsStore((state) => state.toggleEffectsMuted);
  const setBrightness = useSettingsStore((state) => state.setBrightness);

  const handleReplayIntro = () => {
    onClose();
    void navigate(ROUTES.intro);
  };

  const effectsIcon = isEffectsMuted ? (
    <VolumeX aria-hidden="true" />
  ) : (
    <Volume2 aria-hidden="true" />
  );

  return (
    <Modal isOpen={isOpen} title={COPY.settings.title} onClose={onClose}>
      <div className="flex flex-col gap-5">
        <Slider
          label={COPY.settings.musicVolume}
          value={musicVolume}
          min={LIMITS.volumeMin}
          max={LIMITS.volumeMax}
          onChange={setMusicVolume}
        />
        <Button variant="ghost" icon={MUSIC_ICON} onClick={toggleMusicMuted}>
          {isMusicMuted ? COPY.settings.unmuteMusic : COPY.settings.muteMusic}
        </Button>
        <Slider
          label={COPY.settings.effectsVolume}
          value={effectsVolume}
          min={LIMITS.volumeMin}
          max={LIMITS.volumeMax}
          onChange={setEffectsVolume}
        />
        <Button variant="ghost" icon={effectsIcon} onClick={toggleEffectsMuted}>
          {isEffectsMuted ? COPY.settings.unmute : COPY.settings.mute}
        </Button>
        <Slider
          label={COPY.settings.brightness}
          value={brightness}
          min={LIMITS.brightnessMin}
          max={LIMITS.brightnessMax}
          onChange={setBrightness}
        />
        {hasSession && (
          <Button variant="ghost" onClick={handleReplayIntro}>
            {COPY.settings.replayIntro}
          </Button>
        )}
        <Button variant="gold" onClick={onClose}>
          {COPY.settings.close}
        </Button>
      </div>
    </Modal>
  );
}
