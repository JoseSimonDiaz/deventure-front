import { motion } from 'motion/react';
import { useEffect, useId, useRef, type ReactNode, type SyntheticEvent } from 'react';
import { popInItem } from '@/shared/motion/transitions';

type ModalProps = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

export function Modal({ isOpen, title, onClose, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (!dialogElement) return;
    if (isOpen && !dialogElement.open) dialogElement.showModal();
    if (!isOpen && dialogElement.open) dialogElement.close();
    return () => {
      if (dialogElement.open) dialogElement.close();
    };
  }, [isOpen]);

  const handleCancel = (event: SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault();
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={handleCancel}
      className="m-auto w-[min(92vw,28rem)] bg-transparent p-0 text-frost backdrop:bg-fjord-950/80"
    >
      {isOpen && (
        <motion.div
          variants={popInItem}
          initial="hidden"
          animate="visible"
          className="rounded-3xl border-2 border-rune-gold/40 bg-fjord-800 p-6 shadow-chunky"
        >
          <h2 id={titleId} className="mb-4 font-heading text-2xl font-bold text-rune-gold">
            {title}
          </h2>
          {children}
        </motion.div>
      )}
    </dialog>
  );
}
