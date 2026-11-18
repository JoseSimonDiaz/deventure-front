import { useNavigate } from 'react-router';
import { COPY } from '@/shared/constants/copy';
import { ROUTES } from '@/shared/constants/routes';
import { LOGOUT_NAVIGATION_STATE } from '@/shared/session/logoutNavigation';
import { Button } from '@/shared/ui/Button';
import { Modal } from '@/shared/ui/Modal';

type LogoutConfirmModalProps = { isOpen: boolean; onClose: () => void };

export function LogoutConfirmModal({ isOpen, onClose }: LogoutConfirmModalProps) {
  const navigate = useNavigate();

  const handleConfirmLogout = () => {
    onClose();
    void navigate(ROUTES.home, { state: LOGOUT_NAVIGATION_STATE });
  };

  return (
    <Modal isOpen={isOpen} title={COPY.logout.title} onClose={onClose}>
      <div className="flex flex-col gap-3 sm:flex-row-reverse">
        <Button variant="aurora" onClick={handleConfirmLogout} className="flex-1">
          {COPY.logout.confirm}
        </Button>
        <Button variant="ghost" onClick={onClose} className="flex-1">
          {COPY.logout.cancel}
        </Button>
      </div>
    </Modal>
  );
}
