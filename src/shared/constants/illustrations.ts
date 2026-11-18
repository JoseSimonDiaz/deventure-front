export const ILLUSTRATIONS = {
  fjordNight: '/illustrations/fjord-night.webp',
  sagaMap: '/illustrations/saga-map.webp',
  drakkar: '/illustrations/drakkar.webp',
  runestone: '/illustrations/runestone.webp',
  runeMedallion: '/illustrations/rune-medallion.webp',
  bjorn: {
    idle: '/illustrations/bjorn/idle.webp',
    happy: '/illustrations/bjorn/happy.webp',
    talking: '/illustrations/bjorn/talking.webp',
    worried: '/illustrations/bjorn/worried.webp',
    thinking: '/illustrations/bjorn/thinking.webp',
    cheering: '/illustrations/bjorn/cheering.webp',
  },
} as const;

export const ILLUSTRATION_SIZES = {
  bjorn: { width: 512, height: 508 },
  drakkar: { width: 900, height: 686 },
  runestone: { width: 298, height: 480 },
  runeMedallion: { width: 360, height: 366 },
} as const;
