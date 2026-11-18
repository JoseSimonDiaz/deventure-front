import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState, type SubmitEvent } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { AuthShell } from '@/features/auth/components/AuthShell';
import { RuneBurst } from '@/features/auth/components/RuneBurst';
import { getFieldErrorMessage, getFormErrorMessage } from '@/features/auth/formErrors';
import { useLoginMutation } from '@/features/auth/hooks/useLoginMutation';
import { COPY } from '@/shared/constants/copy';
import { ROUTES } from '@/shared/constants/routes';
import { loginSchema, type AuthResponse, type LoginRequest } from '@/shared/contracts/auth';
import { playErrorThud, playSuccessChime } from '@/shared/sound/soundEffects';
import { Button } from '@/shared/ui/Button';
import { TextField } from '@/shared/ui/TextField';
import { useSessionStore } from '@/stores/sessionStore';

const LOGIN_FIELD_NAMES = ['identifier', 'password'] as const;

export function LoginPage() {
  const startSession = useSessionStore((state) => state.startSession);
  const loginMutation = useLoginMutation();
  const [errorCount, setErrorCount] = useState(0);
  const [authenticatedPlayer, setAuthenticatedPlayer] = useState<AuthResponse | null>(null);
  const isRequestInFlightRef = useRef(false);
  const { register, handleSubmit, formState } = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
  });

  const handleLoginSuccess = (authResponse: AuthResponse) => {
    playSuccessChime();
    setAuthenticatedPlayer(authResponse);
  };
  const handleLoginError = () => {
    playErrorThud();
    setErrorCount((currentCount) => currentCount + 1);
  };
  const handleLoginRequestError = () => {
    isRequestInFlightRef.current = false;
    handleLoginError();
  };
  const handleValidLogin = (credentials: LoginRequest) => {
    if (isRequestInFlightRef.current) return;
    isRequestInFlightRef.current = true;
    loginMutation.mutate(credentials, {
      onSuccess: handleLoginSuccess,
      onError: handleLoginRequestError,
    });
  };
  const handleBurstComplete = () => {
    if (authenticatedPlayer) startSession(authenticatedPlayer);
  };
  const handleSubmitLogin = (event: SubmitEvent<HTMLFormElement>) => {
    void handleSubmit(handleValidLogin, handleLoginError)(event);
  };

  const formErrorMessage = getFormErrorMessage(loginMutation.error, LOGIN_FIELD_NAMES);
  const isBusy = loginMutation.isPending || Boolean(authenticatedPlayer);
  const identifierError =
    formState.errors.identifier?.message ?? getFieldErrorMessage(loginMutation.error, 'identifier');
  const passwordError =
    formState.errors.password?.message ?? getFieldErrorMessage(loginMutation.error, 'password');

  return (
    <AuthShell title={COPY.auth.loginTitle} errorCount={errorCount}>
      <form noValidate onSubmit={handleSubmitLogin} className="flex flex-col gap-5">
        <TextField
          label={COPY.auth.identifierLabel}
          autoComplete="username"
          error={identifierError}
          {...register('identifier')}
        />
        <TextField
          label={COPY.auth.passwordLabel}
          type="password"
          autoComplete="current-password"
          error={passwordError}
          {...register('password')}
        />
        {formErrorMessage && (
          <p role="alert" className="text-center font-semibold text-ember">
            {formErrorMessage}
          </p>
        )}
        <Button type="submit" variant="aurora" disabled={isBusy}>
          {loginMutation.isPending ? COPY.auth.submitting : COPY.auth.loginSubmit}
        </Button>
        <Link to={ROUTES.register} className="text-center text-aurora underline">
          {COPY.auth.toRegister}
        </Link>
      </form>
      {authenticatedPlayer && <RuneBurst onBurstComplete={handleBurstComplete} />}
    </AuthShell>
  );
}
