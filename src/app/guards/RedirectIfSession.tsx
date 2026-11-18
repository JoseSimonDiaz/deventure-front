import { Navigate, Outlet } from 'react-router';
import { getPlayDestination } from '@/shared/session/getPlayDestination';
import { useSessionStore } from '@/stores/sessionStore';

export function RedirectIfSession() {
  const token = useSessionStore((state) => state.token);
  const user = useSessionStore((state) => state.user);
  if (token) return <Navigate to={getPlayDestination({ token, user })} replace />;
  return <Outlet />;
}
