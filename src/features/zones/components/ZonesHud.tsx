import { BarChart3, Gem, LogOut, Settings, Shield, Star, UserRound } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { OracleModal } from '@/features/zones/components/OracleModal';
import { COPY } from '@/shared/constants/copy';
import { ROUTES } from '@/shared/constants/routes';
import { Rune } from '@/shared/illustrations/Rune';
import { LogoutConfirmModal } from '@/shared/session/LogoutConfirmModal';
import { SettingsModal } from '@/shared/settings/SettingsModal';
import { Button } from '@/shared/ui/Button';
import { useSessionStore } from '@/stores/sessionStore';

type ZonesHudProps = { totalStars: number };

const SETTINGS_ICON = <Settings aria-hidden="true" />;
const LOGOUT_ICON = <LogOut aria-hidden="true" />;
const PROGRESS_ICON = <BarChart3 aria-hidden="true" />;
const GALLERY_ICON = <Gem aria-hidden="true" />;
const ACCOUNT_ICON = <UserRound aria-hidden="true" />;
const ADMIN_ICON = <Shield aria-hidden="true" />;
const ORACLE_ICON = <Rune glyph="ansuz" className="h-6 w-6 text-rune-gold" />;

export function ZonesHud({ totalStars }: ZonesHudProps) {
  const navigate = useNavigate();
  const username = useSessionStore((state) => state.user?.username ?? '');
  const isAdmin = useSessionStore((state) => state.user?.role === 'admin');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isOracleOpen, setIsOracleOpen] = useState(false);

  const handleOpenOracle = () => {
    setIsOracleOpen(true);
  };
  const handleCloseOracle = () => {
    setIsOracleOpen(false);
  };
  const handleOpenSettings = () => {
    setIsSettingsOpen(true);
  };
  const handleCloseSettings = () => {
    setIsSettingsOpen(false);
  };
  const handleOpenLogout = () => {
    setIsLogoutOpen(true);
  };
  const handleCloseLogout = () => {
    setIsLogoutOpen(false);
  };
  const handleGoToProgress = () => {
    void navigate(ROUTES.progress);
  };
  const handleGoToGallery = () => {
    void navigate(ROUTES.gallery);
  };
  const handleGoToAccount = () => {
    void navigate(ROUTES.account);
  };
  const handleGoToAdmin = () => {
    void navigate(ROUTES.admin);
  };

  return (
    <header className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-3 border-b-2 border-fjord-700 bg-fjord-900/90 px-4 py-3 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="grid h-11 w-11 place-items-center rounded-full bg-aurora font-display text-xl text-fjord-950"
        >
          {username.charAt(0).toUpperCase()}
        </span>
        <div className="flex flex-col">
          <span className="font-heading text-lg leading-tight font-bold text-frost">
            {username}
          </span>
          <span className="flex items-center gap-1 font-code text-sm text-rune-gold">
            <Star aria-hidden="true" className="h-4 w-4 fill-rune-gold" />
            {COPY.hud.stars(totalStars)}
          </span>
        </div>
      </div>
      <nav aria-label={COPY.home.menuLabel} className="flex flex-wrap gap-2">
        <Button
          variant="ghost"
          onClick={handleOpenOracle}
          icon={ORACLE_ICON}
          className="w-12 px-0! ring-2 ring-rune-gold/50"
        >
          <span className="sr-only">{COPY.oracle.open}</span>
        </Button>
        <Button
          variant="ghost"
          onClick={handleGoToProgress}
          icon={PROGRESS_ICON}
          className="w-12 px-0!"
        >
          <span className="sr-only">{COPY.hud.progress}</span>
        </Button>
        <Button
          variant="ghost"
          onClick={handleGoToGallery}
          icon={GALLERY_ICON}
          className="w-12 px-0!"
        >
          <span className="sr-only">{COPY.hud.gallery}</span>
        </Button>
        <Button
          variant="ghost"
          onClick={handleGoToAccount}
          icon={ACCOUNT_ICON}
          className="w-12 px-0!"
        >
          <span className="sr-only">{COPY.hud.account}</span>
        </Button>
        {isAdmin && (
          <Button
            variant="ghost"
            onClick={handleGoToAdmin}
            icon={ADMIN_ICON}
            className="w-12 px-0!"
          >
            <span className="sr-only">{COPY.hud.admin}</span>
          </Button>
        )}
        <Button
          variant="ghost"
          onClick={handleOpenSettings}
          icon={SETTINGS_ICON}
          className="w-12 px-0!"
        >
          <span className="sr-only">{COPY.home.settings}</span>
        </Button>
        <Button
          variant="ghost"
          onClick={handleOpenLogout}
          icon={LOGOUT_ICON}
          className="w-12 px-0!"
        >
          <span className="sr-only">{COPY.home.exit}</span>
        </Button>
      </nav>
      <SettingsModal isOpen={isSettingsOpen} onClose={handleCloseSettings} />
      <OracleModal isOpen={isOracleOpen} onClose={handleCloseOracle} />
      <LogoutConfirmModal isOpen={isLogoutOpen} onClose={handleCloseLogout} />
    </header>
  );
}
