import { NavLink } from 'react-router';
import { COPY } from '@/shared/constants/copy';
import { ROUTES } from '@/shared/constants/routes';

const linkTone = ({ isActive }: { isActive: boolean }) =>
  `inline-flex min-h-11 items-center rounded-full border-2 px-4 font-semibold ${isActive ? 'border-rune-gold bg-rune-gold text-fjord-950' : 'border-fjord-600 text-frost hover:border-aurora'}`;

export function AdminNav() {
  return (
    <nav aria-label={COPY.admin.title} className="flex flex-wrap gap-2">
      <NavLink to={ROUTES.admin} end className={linkTone}>
        {COPY.admin.zones}
      </NavLink>
      <NavLink to={ROUTES.adminStats} className={linkTone}>
        {COPY.admin.stats}
      </NavLink>
    </nav>
  );
}
