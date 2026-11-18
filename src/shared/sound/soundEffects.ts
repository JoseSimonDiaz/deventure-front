import { LIMITS } from '@/shared/constants/limits';
import { useSettingsStore } from '@/stores/settingsStore';

type ToneOptions = {
  waveform: OscillatorType;
  frequencyStart: number;
  frequencyEnd: number;
  durationSeconds: number;
  peakGain: number;
  delaySeconds?: number;
};

const SILENT_GAIN = 0.001;
let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  audioContext ??= new AudioContext();
  if (audioContext.state === 'suspended') void audioContext.resume();
  return audioContext;
}

function getVolumeFactor(): number {
  const { effectsVolume, isEffectsMuted } = useSettingsStore.getState();
  if (isEffectsMuted) return 0;
  return effectsVolume / LIMITS.volumeMax;
}

function playTone(options: ToneOptions): void {
  const volumeFactor = getVolumeFactor();
  if (!volumeFactor) return;

  const context = getAudioContext();
  const startTime = context.currentTime + (options.delaySeconds ?? 0);
  const endTime = startTime + options.durationSeconds;
  const oscillator = context.createOscillator();
  const gainNode = context.createGain();

  oscillator.type = options.waveform;
  oscillator.frequency.setValueAtTime(options.frequencyStart, startTime);
  oscillator.frequency.exponentialRampToValueAtTime(options.frequencyEnd, endTime);
  gainNode.gain.setValueAtTime(options.peakGain * volumeFactor, startTime);
  gainNode.gain.exponentialRampToValueAtTime(SILENT_GAIN, endTime);

  oscillator.connect(gainNode);
  gainNode.connect(context.destination);
  oscillator.start(startTime);
  oscillator.stop(endTime);
}

export function playRuneClick(): void {
  playTone({
    waveform: 'sine',
    frequencyStart: 640,
    frequencyEnd: 1080,
    durationSeconds: 0.08,
    peakGain: 0.12,
  });
}

export function playErrorThud(): void {
  playTone({
    waveform: 'sawtooth',
    frequencyStart: 140,
    frequencyEnd: 90,
    durationSeconds: 0.25,
    peakGain: 0.18,
  });
}

export function playSuccessChime(): void {
  playTone({
    waveform: 'triangle',
    frequencyStart: 523,
    frequencyEnd: 523,
    durationSeconds: 0.3,
    peakGain: 0.15,
  });
  playTone({
    waveform: 'triangle',
    frequencyStart: 659,
    frequencyEnd: 659,
    durationSeconds: 0.3,
    peakGain: 0.15,
    delaySeconds: 0.08,
  });
  playTone({
    waveform: 'triangle',
    frequencyStart: 784,
    frequencyEnd: 784,
    durationSeconds: 0.4,
    peakGain: 0.15,
    delaySeconds: 0.16,
  });
}
