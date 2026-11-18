import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import type { SubmitEvent } from 'react';
import { useForm } from 'react-hook-form';
import { describeAccountError } from '@/features/account/accountErrors';
import { changePassword } from '@/features/account/api/accountApi';
import { COPY } from '@/shared/constants/copy';
import {
  changePasswordSchema,
  type AuthResponse,
  type ChangePasswordRequest,
} from '@/shared/contracts/auth';
import { Button } from '@/shared/ui/Button';
import { Panel } from '@/shared/ui/Panel';
import { TextField } from '@/shared/ui/TextField';
import { useSessionStore } from '@/stores/sessionStore';
import { useToastStore } from '@/stores/toastStore';

export function ChangePasswordForm() {
  const startSession = useSessionStore((state) => state.startSession);
  const showToast = useToastStore((state) => state.showToast);
  const passwordMutation = useMutation({ mutationFn: changePassword });
  const { register, handleSubmit, formState, reset } = useForm<ChangePasswordRequest>({
    resolver: zodResolver(changePasswordSchema),
  });

  const handleChanged = (authResponse: AuthResponse) => {
    startSession(authResponse);
    reset();
    showToast(COPY.account.passwordSaved);
  };
  const handleValidSubmit = (request: ChangePasswordRequest) => {
    passwordMutation.mutate(request, { onSuccess: handleChanged });
  };
  const handleSubmitForm = (event: SubmitEvent<HTMLFormElement>) => {
    void handleSubmit(handleValidSubmit)(event);
  };

  const requestError = describeAccountError(passwordMutation.error);

  return (
    <Panel>
      <form noValidate onSubmit={handleSubmitForm} className="flex flex-col gap-4">
        <h2 className="font-heading text-xl font-bold text-rune-gold">
          {COPY.account.passwordSection}
        </h2>
        <TextField
          label={COPY.account.currentPassword}
          type="password"
          autoComplete="current-password"
          error={formState.errors.currentPassword?.message}
          {...register('currentPassword')}
        />
        <TextField
          label={COPY.account.newPassword}
          type="password"
          autoComplete="new-password"
          error={formState.errors.newPassword?.message}
          {...register('newPassword')}
        />
        {requestError && (
          <p role="alert" className="font-semibold text-ember">
            {requestError}
          </p>
        )}
        <Button type="submit" variant="aurora" disabled={passwordMutation.isPending}>
          {passwordMutation.isPending ? COPY.account.saving : COPY.account.savePassword}
        </Button>
      </form>
    </Panel>
  );
}
