const MS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = 3600;
const TWO_DIGITS = 2;

const padTwoDigits = (value: number) => String(value).padStart(TWO_DIGITS, '0');

export function formatDuration(durationMs: number): string {
  const totalSeconds = Math.round(durationMs / MS_PER_SECOND);
  const hours = Math.floor(totalSeconds / SECONDS_PER_HOUR);
  const minutes = Math.floor((totalSeconds % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE);
  const seconds = totalSeconds % SECONDS_PER_MINUTE;
  if (hours) return `${hours}:${padTwoDigits(minutes)}:${padTwoDigits(seconds)}`;
  return `${minutes}:${padTwoDigits(seconds)}`;
}
