const NOTE_HZ = {
  bassC2: 65.41,
  bassD2: 73.42,
  bassF2: 87.31,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392,
  A4: 440,
  C5: 523.25,
  D5: 587.33,
} as const;

type MelodyNote = keyof typeof NOTE_HZ | 'rest';
type MelodyPhrase = ReadonlyArray<readonly [MelodyNote, number]>;
export type MelodyEvent = { frequency: number; lengthInSteps: number };

const BEATS_PER_MINUTE = 84;
const STEPS_PER_BEAT = 2;
const SECONDS_PER_MINUTE = 60;
export const STEPS_PER_BAR = 8;
const BARS_PER_LOOP = 8;

export const STEP_SECONDS = SECONDS_PER_MINUTE / BEATS_PER_MINUTE / STEPS_PER_BEAT;
export const STEPS_PER_LOOP = STEPS_PER_BAR * BARS_PER_LOOP;

const FLUTE_PHRASE: MelodyPhrase = [
  ['A4', 2],
  ['G4', 1],
  ['F4', 1],
  ['E4', 2],
  ['D4', 2],
  ['F4', 2],
  ['G4', 2],
  ['A4', 4],
  ['C5', 2],
  ['A4', 1],
  ['G4', 1],
  ['A4', 2],
  ['F4', 2],
  ['E4', 2],
  ['D4', 2],
  ['D4', 4],
  ['rest', 4],
  ['A4', 2],
  ['C5', 2],
  ['D5', 3],
  ['C5', 1],
  ['A4', 2],
  ['G4', 2],
  ['F4', 2],
  ['G4', 1],
  ['A4', 1],
  ['G4', 2],
  ['E4', 2],
  ['D4', 6],
  ['rest', 2],
];

export const DRUM_ACCENTS_PER_BAR = [1, 0, 0, 0.4, 0.8, 0, 0.3, 0];

const DRONE_ROOTS_PER_BAR = [
  NOTE_HZ.bassD2,
  NOTE_HZ.bassD2,
  NOTE_HZ.bassF2,
  NOTE_HZ.bassD2,
  NOTE_HZ.bassD2,
  NOTE_HZ.bassC2,
  NOTE_HZ.bassC2,
  NOTE_HZ.bassD2,
];

function buildMelodyByStep(phrase: MelodyPhrase): Map<number, MelodyEvent> {
  const melodyByStep = new Map<number, MelodyEvent>();
  let stepCursor = 0;
  for (const [note, lengthInSteps] of phrase) {
    if (note !== 'rest') melodyByStep.set(stepCursor, { frequency: NOTE_HZ[note], lengthInSteps });
    stepCursor += lengthInSteps;
  }
  return melodyByStep;
}

export const FLUTE_BY_STEP = buildMelodyByStep(FLUTE_PHRASE);

export function getDroneRoot(stepIndex: number): number {
  const barIndex = Math.floor(stepIndex / STEPS_PER_BAR) % DRONE_ROOTS_PER_BAR.length;
  return DRONE_ROOTS_PER_BAR[barIndex] ?? NOTE_HZ.bassD2;
}

export const DRONE_FIFTH_RATIO = 1.5;
