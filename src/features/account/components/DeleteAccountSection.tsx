import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useState, type SubmitEvent } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { describeAccountError } from '@/features/account/accountErrors';
import { deleteAccount } from '@/features/account/api/accountApi';
import { COPY } from '@/shared/constants/copy';
import { ROUTES } from '@/shared/constants/routes';
import { deleteAccountSchema, type DeleteAccountRequest } from '@/shared/contracts/auth';
import { Button } from '@/shared/ui/Button';
import { Modal } from '@/shared/ui/Modal';
import { Panel } from '@/shared/ui/Panel';
import { TextField } from '@/shared/ui/TextField';
import { useSessionStore } from '@/stores/sessionStore';
import { useToastStore } from '@/stores/toastStore';

type DeleteAccountSectionProps = { username: string };

export function DeleteAccountSection({ username }: DeleteAccountSectionProps) {
  const navigate = useNavigate();
  const endSession = useSessionStore((state) => state.endSession);
  const showToast = useToastStore((state) => state.showToast);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const deleteMutation = useMutation({ mutationFn: deleteAccount });
  const { register, handleSubmit, formState, control } = useForm<DeleteAccountRequest>({
    resolver: zodResolver(deleteAccountSchema),
  });
  const typedConfirmation = useWatch({ control, name: 'usernameConfirmation' });
  const isConfirmationTyped = typedConfirmation === username;

  const handleOpen = () => {
    setIsConfirmOpen(true);
  };
  const handleClose = () => {
    setIsConfirmOpen(false);
  };
  const handleDeleted = () => {
    showToast(COPY.account.deleted);
    endSession();
    void navigate(ROUTES.home, { replace: true });
  };
  const handleValidSubmit = (request: DeleteAccountRequest) => {
    deleteMutation.mutate(request, { onSuccess: handleDeleted });
  };
  const handleSubmitForm = (event: SubmitEvent<HTMLFormElement>) => {
    void handleSubmit(handleValidSubmit)(event);
  };

  const requestError = describeAccountError(deleteMutation.error);

  return (
    <Panel className="border-ember">
      <div className="flex flex-col gap-3">
        <h2 className="font-heading text-xl font-bold text-ember">{COPY.account.dangerSection}</h2>
        <p className="text-mist">{COPY.account.dangerBody}</p>
        <Button variant="ghost" onClick={handleOpen} className="text-ember">
          {COPY.account.deleteButton}
        </Button>
      </div>
      <Modal isOpen={isConfirmOpen} title={COPY.account.deleteTitle} onClose={handleClose}>
        <form noValidate onSubmit={handleSubmitForm} className="flex flex-col gap-4">
          <TextField
            label={COPY.account.deletePassword}
            type="password"
            autoComplete="current-password"
            error={formState.errors.password?.message}
            {...register('password')}
          />
          <TextField
            label={COPY.account.deleteConfirmLabel(username)}
            autoComplete="off"
            error={formState.errors.usernameConfirmation?.message}
            {...register('usernameConfirmation')}
          />
          {requestError && (
            <p role="alert" className="font-semibold text-ember">
              {requestError}
            </p>
          )}
          <Button
            type="submit"
            variant="gold"
            disabled={!isConfirmationTyped || deleteMutation.isPending}
          >
            {COPY.account.deleteConfirm}
          </Button>
          <Button variant="ghost" onClick={handleClose}>
            {COPY.account.deleteCancel}
          </Button>
        </form>
      </Modal>
    </Panel>
  );
}
