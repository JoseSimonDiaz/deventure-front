import { Navigate, Outlet } from 'react-router';
import { ROUTES } from '@/shared/constants/routes';
import { useSessionStore } from '@/stores/sessionStore';

export function RequireAdmin() {
  const isAdmin = useSessionStore((state) => state.user?.role === 'admin');
  if (!isAdmin) return <Navigate to={ROUTES.zones} replace />;
  return <Outlet />;
}
