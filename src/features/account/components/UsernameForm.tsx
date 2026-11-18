import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import type { SubmitEvent } from 'react';
import { useForm } from 'react-hook-form';
import { describeAccountError } from '@/features/account/accountErrors';
import { updateUsername } from '@/features/account/api/accountApi';
import { COPY } from '@/shared/constants/copy';
import {
  updateUsernameSchema,
  type AuthResponse,
  type UpdateUsernameRequest,
} from '@/shared/contracts/auth';
import { Button } from '@/shared/ui/Button';
import { Panel } from '@/shared/ui/Panel';
import { TextField } from '@/shared/ui/TextField';
import { useSessionStore } from '@/stores/sessionStore';
import { useToastStore } from '@/stores/toastStore';

type UsernameFormProps = { currentUsername: string };

export function UsernameForm({ currentUsername }: UsernameFormProps) {
  const startSession = useSessionStore((state) => state.startSession);
  const showToast = useToastStore((state) => state.showToast);
  const usernameMutation = useMutation({ mutationFn: updateUsername });
  const { register, handleSubmit, formState } = useForm<UpdateUsernameRequest>({
    resolver: zodResolver(updateUsernameSchema),
    defaultValues: { username: currentUsername },
  });

  const handleUpdated = (authResponse: AuthResponse) => {
    startSession(authResponse);
    showToast(COPY.account.usernameSaved);
  };
  const handleValidSubmit = (request: UpdateUsernameRequest) => {
    usernameMutation.mutate(request, { onSuccess: handleUpdated });
  };
  const handleSubmitForm = (event: SubmitEvent<HTMLFormElement>) => {
    void handleSubmit(handleValidSubmit)(event);
  };

  const errorMessage =
    formState.errors.username?.message ?? describeAccountError(usernameMutation.error);

  return (
    <Panel>
      <form noValidate onSubmit={handleSubmitForm} className="flex flex-col gap-4">
        <h2 className="font-heading text-xl font-bold text-rune-gold">
          {COPY.account.usernameSection}
        </h2>
        <TextField
          label={COPY.auth.usernameLabel}
          autoComplete="username"
          error={errorMessage || undefined}
          {...register('username')}
        />
        <Button type="submit" variant="aurora" disabled={usernameMutation.isPending}>
          {usernameMutation.isPending ? COPY.account.saving : COPY.account.saveUsername}
        </Button>
      </form>
    </Panel>
  );
}
