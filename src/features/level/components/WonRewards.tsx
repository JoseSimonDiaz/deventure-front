import { motion } from 'motion/react';
import { COPY } from '@/shared/constants/copy';
import type { RewardSummary } from '@/shared/contracts/gameplay';
import { popInItem, staggerList } from '@/shared/motion/transitions';

type WonRewardsProps = { rewards: RewardSummary[] };

export function WonRewards({ rewards }: WonRewardsProps) {
  if (!rewards.length) return null;

  return (
    <section className="flex w-full flex-col gap-3 rounded-3xl border-2 border-rune-gold bg-fjord-800 p-5">
      <h2 className="font-heading text-xl font-bold text-rune-gold">{COPY.won.rewardsTitle}</h2>
      <motion.ul
        variants={staggerList}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap justify-center gap-4"
      >
        {rewards.map((reward) => (
          <motion.li
            key={reward.id}
            variants={popInItem}
            className="flex w-32 flex-col items-center gap-2"
          >
            <img
              src={reward.imageUrl}
              alt=""
              className="h-28 w-28 rounded-2xl border-2 border-fjord-600 bg-fjord-950 object-contain"
            />
            <span className="font-heading font-bold text-frost">{reward.name}</span>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
