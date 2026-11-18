import { useEffect } from 'react';
import { LIMITS } from '@/shared/constants/limits';
import {
  createMusicStage,
  playBoneFlute,
  playFrameDrum,
  type MusicStage,
} from '@/shared/sound/musicInstruments';
import {
  DRUM_ACCENTS_PER_BAR,
  FLUTE_BY_STEP,
  STEP_SECONDS,
  STEPS_PER_BAR,
  STEPS_PER_LOOP,
  getDroneRoot,
} from '@/shared/sound/vikingTheme';
import { useSettingsStore } from '@/stores/settingsStore';

const MUSIC_PEAK_GAIN = 0.45;
const SCHEDULE_AHEAD_SECONDS = 0.4;
const SCHEDULER_INTERVAL_MS = 100;
const START_DELAY_SECONDS = 0.1;

let musicContext: AudioContext | null = null;
let masterGain: GainNode | null = null;
let musicStage: MusicStage | null = null;
let schedulerTimerId = 0;
let nextStepIndex = 0;
let nextStepTime = 0;

function readMusicGain(): number {
  const { musicVolume, isMusicMuted } = useSettingsStore.getState();
  if (isMusicMuted) return 0;
  return (musicVolume / LIMITS.volumeMax) * MUSIC_PEAK_GAIN;
}

export function scheduleThemeStep(stage: MusicStage, stepIndex: number, startTime: number) {
  const loopStep = stepIndex % STEPS_PER_LOOP;
  const barStep = loopStep % STEPS_PER_BAR;
  const drumAccent = DRUM_ACCENTS_PER_BAR[barStep] ?? 0;
  const fluteNote = FLUTE_BY_STEP.get(loopStep);
  if (!barStep) stage.setDroneRoot(getDroneRoot(loopStep), startTime);
  if (drumAccent) playFrameDrum(stage, startTime, drumAccent);
  if (fluteNote) {
    playBoneFlute(stage, startTime, fluteNote.frequency, fluteNote.lengthInSteps * STEP_SECONDS);
  }
}

function scheduleUpcomingSteps() {
  if (!musicContext || !musicStage) return;
  while (nextStepTime < musicContext.currentTime + SCHEDULE_AHEAD_SECONDS) {
    scheduleThemeStep(musicStage, nextStepIndex, nextStepTime);
    nextStepTime += STEP_SECONDS;
    nextStepIndex = (nextStepIndex + 1) % STEPS_PER_LOOP;
  }
}

function startMusic() {
  if (musicContext) return;
  musicContext = new AudioContext();
  masterGain = musicContext.createGain();
  masterGain.gain.value = readMusicGain();
  const limiter = musicContext.createDynamicsCompressor();
  masterGain.connect(limiter);
  limiter.connect(musicContext.destination);
  musicStage = createMusicStage(musicContext, masterGain);
  nextStepIndex = 0;
  nextStepTime = musicContext.currentTime + START_DELAY_SECONDS;
  scheduleUpcomingSteps();
  schedulerTimerId = window.setInterval(scheduleUpcomingSteps, SCHEDULER_INTERVAL_MS);
}

export function useBackgroundMusic(): void {
  const musicVolume = useSettingsStore((state) => state.musicVolume);
  const isMusicMuted = useSettingsStore((state) => state.isMusicMuted);

  useEffect(() => {
    window.addEventListener('pointerdown', startMusic, { once: true });
    window.addEventListener('keydown', startMusic, { once: true });
    return () => {
      window.removeEventListener('pointerdown', startMusic);
      window.removeEventListener('keydown', startMusic);
    };
  }, []);

  useEffect(() => {
    if (masterGain) masterGain.gain.value = readMusicGain();
  }, [musicVolume, isMusicMuted]);

  useEffect(
    () => () => {
      window.clearInterval(schedulerTimerId);
    },
    [],
  );
}
