import { Lock } from 'lucide-react';
import { motion } from 'motion/react';
import { RARITY_CLASSES } from '@/features/gallery/rarityStyles';
import { COPY } from '@/shared/constants/copy';
import type { Reward } from '@/shared/contracts/rewards';

type RewardCardProps = { reward: Reward; onOpen: (reward: Reward) => void };

const CARD_HOVER = { y: -4 };

export function RewardCard({ reward, onOpen }: RewardCardProps) {
  const handleOpen = () => {
    onOpen(reward);
  };

  return (
    <li>
      <motion.button
        type="button"
        whileHover={CARD_HOVER}
        onClick={handleOpen}
        className={`relative flex h-full w-full flex-col items-center gap-2 rounded-2xl border-2 bg-fjord-800 p-3 text-center shadow-chunky ${RARITY_CLASSES[reward.rarity]}`}
      >
        {reward.isNew && (
          <span className="absolute -top-2 -right-2 rounded-full bg-rune-gold px-2 py-0.5 font-code text-sm font-bold text-fjord-950">
            {COPY.gallery.newBadge}
          </span>
        )}
        <img
          src={reward.imageUrl ?? reward.silhouetteUrl}
          alt=""
          loading="lazy"
          className={`aspect-square w-full rounded-xl bg-fjord-950 object-contain ${reward.unlocked ? '' : 'opacity-40'}`}
        />
        <span className="flex items-center gap-1 font-heading font-bold text-frost">
          {!reward.unlocked && <Lock aria-hidden="true" className="h-4 w-4 text-mist" />}
          {reward.name}
        </span>
        <span className="font-code text-sm text-mist">
          {reward.unlocked ? COPY.gallery.rarityLabels[reward.rarity] : COPY.gallery.locked}
        </span>
      </motion.button>
    </li>
  );
}
