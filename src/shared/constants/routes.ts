export const ROUTES = {
  home: '/',
  login: '/login',
  register: '/register',
  intro: '/intro',
  zones: '/zones',
  level: '/level/:levelId',
  progress: '/progress',
  gallery: '/gallery',
  account: '/account',
  theEnd: '/the-end',
  admin: '/admin',
  adminLevel: '/admin/levels/:levelId',
  adminStats: '/admin/stats',
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];

export const ROUTE_IDS = {
  protected: 'protected-routes',
} as const;

export const UNLOCKED_LEVEL_PARAM = 'unlocked';

export const buildLevelPath = (levelId: string) => `/level/${levelId}`;

export const buildAdminLevelPath = (levelId: string) => `/admin/levels/${levelId}`;

export const buildZonesPathWithUnlocked = (levelId: string) =>
  levelId ? `${ROUTES.zones}?${UNLOCKED_LEVEL_PARAM}=${levelId}` : ROUTES.zones;
