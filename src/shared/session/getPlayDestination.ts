import { ROUTES, type AppRoute } from '@/shared/constants/routes';
import type { UserPublic } from '@/shared/contracts/auth';

type SessionSnapshot = { token: string | null; user: UserPublic | null };

export function getPlayDestination(session: SessionSnapshot): AppRoute {
  if (!session.token) return ROUTES.login;
  if (!session.user?.introSeen) return ROUTES.intro;
  return ROUTES.zones;
}
