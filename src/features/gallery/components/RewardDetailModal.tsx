import { useMutation } from '@tanstack/react-query';
import { Download } from 'lucide-react';
import { updateAvatarRequest } from '@/shared/api/accountApi';
import { COPY } from '@/shared/constants/copy';
import type { UserPublic } from '@/shared/contracts/auth';
import type { Reward } from '@/shared/contracts/rewards';
import { Button } from '@/shared/ui/Button';
import { Modal } from '@/shared/ui/Modal';
import { formatDate } from '@/shared/utils/formatDate';
import { useSessionStore } from '@/stores/sessionStore';
import { useToastStore } from '@/stores/toastStore';

type RewardDetailModalProps = { reward: Reward | null; onClose: () => void };

export function RewardDetailModal({ reward, onClose }: RewardDetailModalProps) {
  const updateUser = useSessionStore((state) => state.updateUser);
  const showToast = useToastStore((state) => state.showToast);
  const avatarMutation = useMutation({ mutationFn: updateAvatarRequest });

  const handleAvatarUpdated = (user: UserPublic) => {
    updateUser(user);
    showToast(COPY.gallery.avatarUpdated);
  };
  const handleAvatarError = () => {
    showToast(COPY.errors.generic);
  };
  const handleUseAsAvatar = () => {
    if (!reward) return;
    avatarMutation.mutate(reward.id, {
      onSuccess: handleAvatarUpdated,
      onError: handleAvatarError,
    });
  };

  const isUnlocked = Boolean(reward?.unlocked && reward.imageUrl);

  return (
    <Modal isOpen={Boolean(reward)} title={reward?.name ?? COPY.gallery.title} onClose={onClose}>
      {reward && (
        <div className="flex flex-col gap-4">
          <img
            src={reward.imageUrl ?? reward.silhouetteUrl}
            alt={isUnlocked ? reward.name : ''}
            className={`mx-auto aspect-square w-56 rounded-2xl bg-fjord-950 object-contain ${isUnlocked ? '' : 'opacity-40'}`}
          />
          <p className="font-code text-sm text-aurora uppercase">
            {COPY.gallery.typeLabels[reward.type]} · {COPY.gallery.rarityLabels[reward.rarity]}
          </p>
          {isUnlocked ? (
            <p className="text-frost">{reward.description}</p>
          ) : (
            <div className="flex flex-col gap-1">
              <p className="font-code text-sm font-semibold text-rune-gold uppercase">
                {COPY.gallery.howToUnlock}
              </p>
              <p className="text-frost">{reward.howToUnlock}</p>
            </div>
          )}
          {reward.unlockedAt && (
            <p className="text-sm text-mist">
              {COPY.gallery.unlockedAt(formatDate(reward.unlockedAt))}
            </p>
          )}
          {isUnlocked && reward.type === 'avatar' && (
            <Button
              variant="aurora"
              onClick={handleUseAsAvatar}
              disabled={avatarMutation.isPending}
            >
              {COPY.gallery.useAsAvatar}
            </Button>
          )}
          {isUnlocked && reward.type === 'template' && reward.imageUrl && (
            <a
              href={reward.imageUrl}
              download
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-rune-gold px-6 font-heading text-lg font-bold text-fjord-950 uppercase shadow-chunky"
            >
              <Download aria-hidden="true" />
              {COPY.gallery.download}
            </a>
          )}
          <Button variant="ghost" onClick={onClose}>
            {COPY.gallery.close}
          </Button>
        </div>
      )}
    </Modal>
  );
}
