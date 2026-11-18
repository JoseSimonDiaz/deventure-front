import { DRONE_FIFTH_RATIO } from '@/shared/sound/vikingTheme';

const SILENT_GAIN = 0.0001;
const REVERB_SECONDS = 2.6;
const REVERB_DECAY_POWER = 3;
const REVERB_WET_GAIN = 0.32;
const DRUM_START_HZ = 130;
const DRUM_END_HZ = 46;
const DRUM_PITCH_DROP_SECONDS = 0.22;
const DRUM_DECAY_SECONDS = 0.55;
const DRUM_PEAK_GAIN = 0.9;
const DRUM_SLAP_SECONDS = 0.06;
const DRUM_SLAP_GAIN = 0.18;
const DRUM_SLAP_CUTOFF_HZ = 900;
const FLUTE_PEAK_GAIN = 0.22;
const FLUTE_ATTACK_SECONDS = 0.06;
const FLUTE_RELEASE_SECONDS = 0.18;
const FLUTE_VIBRATO_HZ = 5.4;
const FLUTE_VIBRATO_DEPTH_HZ = 4;
const FLUTE_VIBRATO_DELAY_SECONDS = 0.18;
const FLUTE_CUTOFF_HZ = 2400;
const DRONE_GAIN = 0.07;
const DRONE_CUTOFF_HZ = 520;
const DRONE_BREATH_HZ = 0.09;
const DRONE_BREATH_DEPTH_HZ = 180;
const DRONE_GLIDE_SECONDS = 0.25;

export type MusicStage = {
  context: BaseAudioContext;
  output: AudioNode;
  slapBuffer: AudioBuffer;
  setDroneRoot: (rootFrequency: number, startTime: number) => void;
};

function createNoiseBuffer(context: BaseAudioContext, seconds: number, decayPower: number) {
  const frameCount = Math.floor(context.sampleRate * seconds);
  const noiseBuffer = context.createBuffer(2, frameCount, context.sampleRate);
  for (let channelIndex = 0; channelIndex < noiseBuffer.numberOfChannels; channelIndex += 1) {
    const samples = noiseBuffer.getChannelData(channelIndex);
    for (let frameIndex = 0; frameIndex < frameCount; frameIndex += 1) {
      const remaining = 1 - frameIndex / frameCount;
      samples[frameIndex] = (Math.random() * 2 - 1) * remaining ** decayPower;
    }
  }
  return noiseBuffer;
}

function createHallReverb(context: BaseAudioContext, destination: AudioNode): AudioNode {
  const input = context.createGain();
  const convolver = context.createConvolver();
  const wetGain = context.createGain();
  convolver.buffer = createNoiseBuffer(context, REVERB_SECONDS, REVERB_DECAY_POWER);
  wetGain.gain.value = REVERB_WET_GAIN;
  input.connect(destination);
  input.connect(convolver);
  convolver.connect(wetGain);
  wetGain.connect(destination);
  return input;
}

function startDrone(context: BaseAudioContext, output: AudioNode) {
  const filter = context.createBiquadFilter();
  const droneGain = context.createGain();
  const breath = context.createOscillator();
  const breathDepth = context.createGain();
  const root = context.createOscillator();
  const fifth = context.createOscillator();
  filter.type = 'lowpass';
  filter.frequency.value = DRONE_CUTOFF_HZ;
  droneGain.gain.value = DRONE_GAIN;
  breath.frequency.value = DRONE_BREATH_HZ;
  breathDepth.gain.value = DRONE_BREATH_DEPTH_HZ;
  root.type = 'sawtooth';
  fifth.type = 'sawtooth';
  breath.connect(breathDepth);
  breathDepth.connect(filter.frequency);
  root.connect(filter);
  fifth.connect(filter);
  filter.connect(droneGain);
  droneGain.connect(output);
  root.start();
  fifth.start();
  breath.start();
  return (rootFrequency: number, startTime: number) => {
    root.frequency.setTargetAtTime(rootFrequency, startTime, DRONE_GLIDE_SECONDS);
    fifth.frequency.setTargetAtTime(
      rootFrequency * DRONE_FIFTH_RATIO,
      startTime,
      DRONE_GLIDE_SECONDS,
    );
  };
}

export function createMusicStage(context: BaseAudioContext, destination: AudioNode): MusicStage {
  const output = createHallReverb(context, destination);
  return {
    context,
    output,
    slapBuffer: createNoiseBuffer(context, DRUM_SLAP_SECONDS, 1),
    setDroneRoot: startDrone(context, output),
  };
}

export function playFrameDrum(stage: MusicStage, startTime: number, accent: number) {
  const { context, output, slapBuffer } = stage;
  const body = context.createOscillator();
  const bodyGain = context.createGain();
  body.frequency.setValueAtTime(DRUM_START_HZ, startTime);
  body.frequency.exponentialRampToValueAtTime(DRUM_END_HZ, startTime + DRUM_PITCH_DROP_SECONDS);
  bodyGain.gain.setValueAtTime(DRUM_PEAK_GAIN * accent, startTime);
  bodyGain.gain.exponentialRampToValueAtTime(SILENT_GAIN, startTime + DRUM_DECAY_SECONDS);
  body.connect(bodyGain);
  bodyGain.connect(output);
  body.start(startTime);
  body.stop(startTime + DRUM_DECAY_SECONDS);

  const slap = context.createBufferSource();
  const slapFilter = context.createBiquadFilter();
  const slapGain = context.createGain();
  slap.buffer = slapBuffer;
  slapFilter.type = 'lowpass';
  slapFilter.frequency.value = DRUM_SLAP_CUTOFF_HZ;
  slapGain.gain.value = DRUM_SLAP_GAIN * accent;
  slap.connect(slapFilter);
  slapFilter.connect(slapGain);
  slapGain.connect(output);
  slap.start(startTime);
}

export function playBoneFlute(
  stage: MusicStage,
  startTime: number,
  frequency: number,
  durationSeconds: number,
) {
  const { context, output } = stage;
  const endTime = startTime + durationSeconds;
  const voice = context.createOscillator();
  const vibrato = context.createOscillator();
  const vibratoDepth = context.createGain();
  const tone = context.createBiquadFilter();
  const envelope = context.createGain();
  voice.type = 'triangle';
  voice.frequency.setValueAtTime(frequency, startTime);
  vibrato.frequency.value = FLUTE_VIBRATO_HZ;
  vibratoDepth.gain.setValueAtTime(0, startTime);
  vibratoDepth.gain.linearRampToValueAtTime(
    FLUTE_VIBRATO_DEPTH_HZ,
    startTime + FLUTE_VIBRATO_DELAY_SECONDS,
  );
  tone.type = 'lowpass';
  tone.frequency.value = FLUTE_CUTOFF_HZ;
  envelope.gain.setValueAtTime(SILENT_GAIN, startTime);
  envelope.gain.exponentialRampToValueAtTime(FLUTE_PEAK_GAIN, startTime + FLUTE_ATTACK_SECONDS);
  envelope.gain.setValueAtTime(FLUTE_PEAK_GAIN, endTime - FLUTE_RELEASE_SECONDS);
  envelope.gain.exponentialRampToValueAtTime(SILENT_GAIN, endTime);
  vibrato.connect(vibratoDepth);
  vibratoDepth.connect(voice.frequency);
  voice.connect(tone);
  tone.connect(envelope);
  envelope.connect(output);
  voice.start(startTime);
  vibrato.start(startTime);
  voice.stop(endTime);
  vibrato.stop(endTime);
}
