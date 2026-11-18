import { ChangePasswordForm } from '@/features/account/components/ChangePasswordForm';
import { DeleteAccountSection } from '@/features/account/components/DeleteAccountSection';
import { UsernameForm } from '@/features/account/components/UsernameForm';
import { COPY } from '@/shared/constants/copy';
import { PageShell } from '@/shared/ui/PageShell';
import { formatDate } from '@/shared/utils/formatDate';
import { useSessionStore } from '@/stores/sessionStore';

export function AccountPage() {
  const user = useSessionStore((state) => state.user);

  return (
    <PageShell title={COPY.account.title}>
      {user?.createdAt && (
        <p className="text-mist">{COPY.account.memberSince(formatDate(user.createdAt))}</p>
      )}
      <UsernameForm currentUsername={user?.username ?? ''} />
      <ChangePasswordForm />
      <DeleteAccountSection username={user?.username ?? ''} />
    </PageShell>
  );
}
