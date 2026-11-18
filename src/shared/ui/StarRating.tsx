import { Star } from 'lucide-react';
import { motion } from 'motion/react';
import { LIMITS } from '@/shared/constants/limits';

type StarRatingProps = {
  stars: number;
  label: string;
  size?: 'sm' | 'lg';
  isAnimated?: boolean;
};

const STAR_SLOTS = Array.from({ length: LIMITS.maxStars }, (_, slotIndex) => slotIndex);
const SIZE_CLASSES = { sm: 'h-4 w-4', lg: 'h-14 w-14' } as const;
const HIDDEN_STAR = { opacity: 0, scale: 0.2, rotate: -45 };
const VISIBLE_STAR = { opacity: 1, scale: 1, rotate: 0 };

export function StarRating({ stars, label, size = 'sm', isAnimated = false }: StarRatingProps) {
  return (
    <div role="img" aria-label={label} className="flex items-center gap-1">
      {STAR_SLOTS.map((slotIndex) => {
        const isEarned = slotIndex < stars;
        return (
          <motion.span
            key={slotIndex}
            initial={isAnimated ? HIDDEN_STAR : false}
            animate={VISIBLE_STAR}
            transition={{
              delay: isAnimated ? slotIndex * LIMITS.starRevealDelaySeconds : 0,
              type: 'spring',
              stiffness: 320,
              damping: 14,
            }}
          >
            <Star
              aria-hidden="true"
              className={`${SIZE_CLASSES[size]} ${isEarned ? 'fill-rune-gold text-rune-gold' : 'text-fjord-500'}`}
            />
          </motion.span>
        );
      })}
    </div>
  );
}
