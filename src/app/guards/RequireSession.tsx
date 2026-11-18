import { Navigate, Outlet, useMatches } from 'react-router';
import { ROUTE_IDS, ROUTES } from '@/shared/constants/routes';
import { useSessionStore } from '@/stores/sessionStore';

export function RequireSession() {
  const hasSession = useSessionStore((state) => Boolean(state.token));
  const isProtectedRouteActive = useMatches().some(
    (routeMatch) => routeMatch.id === ROUTE_IDS.protected,
  );
  if (!hasSession && isProtectedRouteActive) return <Navigate to={ROUTES.login} replace />;
  return <Outlet />;
}
