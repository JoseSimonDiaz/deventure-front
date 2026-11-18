import { motion } from 'motion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { COPY } from '@/shared/constants/copy';
import { popInItem, staggerList } from '@/shared/motion/transitions';
import { getPlayDestination } from '@/shared/session/getPlayDestination';
import { LogoutConfirmModal } from '@/shared/session/LogoutConfirmModal';
import { SettingsModal } from '@/shared/settings/SettingsModal';
import { Button } from '@/shared/ui/Button';
import { useSessionStore } from '@/stores/sessionStore';

export function HomeMenu() {
  const navigate = useNavigate();
  const hasSession = useSessionStore((state) => Boolean(state.token));
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const handlePlay = () => {
    void navigate(getPlayDestination(useSessionStore.getState()));
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

  return (
    <nav aria-label={COPY.home.menuLabel}>
      <motion.ul
        variants={staggerList}
        initial="hidden"
        animate="visible"
        className="flex w-72 flex-col gap-4"
      >
        <motion.li variants={popInItem}>
          <Button variant="aurora" onClick={handlePlay} className="w-full">
            {COPY.home.play}
          </Button>
        </motion.li>
        <motion.li variants={popInItem}>
          <Button variant="ghost" onClick={handleOpenSettings} className="w-full">
            {COPY.home.settings}
          </Button>
        </motion.li>
        {hasSession && (
          <motion.li variants={popInItem}>
            <Button variant="ghost" onClick={handleOpenLogout} className="w-full">
              {COPY.home.exit}
            </Button>
          </motion.li>
        )}
      </motion.ul>
      <SettingsModal isOpen={isSettingsOpen} onClose={handleCloseSettings} />
      <LogoutConfirmModal isOpen={isLogoutOpen} onClose={handleCloseLogout} />
    </nav>
  );
}
