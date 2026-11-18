import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState, type SubmitEvent } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Link } from 'react-router';
import { AuthShell } from '@/features/auth/components/AuthShell';
import { PasswordRunes } from '@/features/auth/components/PasswordRunes';
import { RuneBurst } from '@/features/auth/components/RuneBurst';
import { getFieldErrorMessage, getFormErrorMessage } from '@/features/auth/formErrors';
import { useRegisterMutation } from '@/features/auth/hooks/useRegisterMutation';
import { COPY } from '@/shared/constants/copy';
import { ROUTES } from '@/shared/constants/routes';
import { registerSchema, type AuthResponse, type RegisterRequest } from '@/shared/contracts/auth';
import { playErrorThud, playSuccessChime } from '@/shared/sound/soundEffects';
import { Button } from '@/shared/ui/Button';
import { TextField } from '@/shared/ui/TextField';
import { useSessionStore } from '@/stores/sessionStore';

const EMPTY_PASSWORD = '';
const REGISTER_FIELD_NAMES = ['username', 'email', 'password'] as const;

export function RegisterPage() {
  const startSession = useSessionStore((state) => state.startSession);
  const registerMutation = useRegisterMutation();
  const [errorCount, setErrorCount] = useState(0);
  const [registeredPlayer, setRegisteredPlayer] = useState<AuthResponse | null>(null);
  const isRequestInFlightRef = useRef(false);
  const { register, handleSubmit, formState, control } = useForm<RegisterRequest>({
    resolver: zodResolver(registerSchema),
    mode: 'onTouched',
  });
  const typedPassword = useWatch({ control, name: 'password' }) || EMPTY_PASSWORD;

  const handleRegisterSuccess = (authResponse: AuthResponse) => {
    playSuccessChime();
    setRegisteredPlayer(authResponse);
  };
  const handleRegisterError = () => {
    playErrorThud();
    setErrorCount((currentCount) => currentCount + 1);
  };
  const handleRegisterRequestError = () => {
    isRequestInFlightRef.current = false;
    handleRegisterError();
  };
  const handleValidRegister = (newPlayer: RegisterRequest) => {
    if (isRequestInFlightRef.current) return;
    isRequestInFlightRef.current = true;
    registerMutation.mutate(newPlayer, {
      onSuccess: handleRegisterSuccess,
      onError: handleRegisterRequestError,
    });
  };
  const handleBurstComplete = () => {
    if (registeredPlayer) startSession(registeredPlayer);
  };
  const handleSubmitRegister = (event: SubmitEvent<HTMLFormElement>) => {
    void handleSubmit(handleValidRegister, handleRegisterError)(event);
  };

  const formErrorMessage = getFormErrorMessage(registerMutation.error, REGISTER_FIELD_NAMES);
  const isBusy = registerMutation.isPending || Boolean(registeredPlayer);
  const usernameError =
    formState.errors.username?.message ?? getFieldErrorMessage(registerMutation.error, 'username');
  const emailError =
    formState.errors.email?.message ?? getFieldErrorMessage(registerMutation.error, 'email');
  const passwordError =
    formState.errors.password?.message ?? getFieldErrorMessage(registerMutation.error, 'password');

  return (
    <AuthShell title={COPY.auth.registerTitle} errorCount={errorCount}>
      <form noValidate onSubmit={handleSubmitRegister} className="flex flex-col gap-5">
        <TextField
          label={COPY.auth.usernameLabel}
          autoComplete="username"
          error={usernameError}
          {...register('username')}
        />
        <TextField
          label={COPY.auth.emailLabel}
          type="email"
          autoComplete="email"
          error={emailError}
          {...register('email')}
        />
        <TextField
          label={COPY.auth.passwordLabel}
          type="password"
          autoComplete="new-password"
          error={passwordError}
          {...register('password')}
        />
        <PasswordRunes password={typedPassword} />
        {formErrorMessage && (
          <p role="alert" className="text-center font-semibold text-ember">
            {formErrorMessage}
          </p>
        )}
        <Button type="submit" variant="gold" disabled={isBusy}>
          {registerMutation.isPending ? COPY.auth.submitting : COPY.auth.registerSubmit}
        </Button>
        <Link to={ROUTES.login} className="text-center text-aurora underline">
          {COPY.auth.toLogin}
        </Link>
      </form>
      {registeredPlayer && <RuneBurst onBurstComplete={handleBurstComplete} />}
    </AuthShell>
  );
}
