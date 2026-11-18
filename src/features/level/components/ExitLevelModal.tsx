import { COPY } from '@/shared/constants/copy';
import { Button } from '@/shared/ui/Button';
import { Modal } from '@/shared/ui/Modal';

type ExitLevelModalProps = { isOpen: boolean; onConfirm: () => void; onClose: () => void };

export function ExitLevelModal({ isOpen, onConfirm, onClose }: ExitLevelModalProps) {
  return (
    <Modal isOpen={isOpen} title={COPY.level.exitTitle} onClose={onClose}>
      <p className="mb-5 text-mist">{COPY.level.exitDescription}</p>
      <div className="flex flex-col gap-3">
        <Button variant="aurora" onClick={onClose}>
          {COPY.level.exitCancel}
        </Button>
        <Button variant="ghost" onClick={onConfirm}>
          {COPY.level.exitConfirm}
        </Button>
      </div>
    </Modal>
  );
}
