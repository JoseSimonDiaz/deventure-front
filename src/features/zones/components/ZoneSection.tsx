import { Lock } from 'lucide-react';
import { motion } from 'motion/react';
import { Fragment } from 'react';
import { LevelConnector } from '@/features/zones/components/LevelConnector';
import { LevelNode } from '@/features/zones/components/LevelNode';
import { COPY } from '@/shared/constants/copy';
import type { LevelProgress, ZoneProgress } from '@/shared/contracts/progress';
import { RUNE_GLYPHS } from '@/shared/illustrations/runeGlyphs';
import { staggerList } from '@/shared/motion/transitions';
import { ProgressBar } from '@/shared/ui/ProgressBar';

type ZoneSectionProps = {
  zone: ZoneProgress;
  justUnlockedLevelId: string;
  onSelectLevel: (level: LevelProgress) => void;
};

const DEFAULT_GLYPH = RUNE_GLYPHS[0];

export function ZoneSection({ zone, justUnlockedLevelId, onSelectLevel }: ZoneSectionProps) {
  const headingId = `zone-${zone.zoneId}`;

  return (
    <section
      aria-labelledby={headingId}
      className={`flex flex-col gap-4 ${zone.unlocked ? '' : 'opacity-60'}`}
    >
      <header className="flex flex-col gap-2 rounded-3xl border-2 border-rune-gold/40 bg-fjord-800 p-5 shadow-chunky">
        <div className="flex items-center justify-between gap-3">
          <p className="font-code text-sm font-semibold text-rune-gold uppercase">
            {COPY.zones.zoneProgress(zone.levelsCompleted, zone.levelsTotal)}
          </p>
          <p className="font-code text-sm text-mist">
            {COPY.progress.zoneStars(zone.stars, zone.maxStars)}
          </p>
        </div>
        <h2 id={headingId} className="flex items-center gap-2 font-display text-2xl text-frost">
          {!zone.unlocked && <Lock aria-hidden="true" className="h-5 w-5 text-mist" />}
          {zone.name}
        </h2>
        {!zone.unlocked && <p className="text-mist">{COPY.zones.lockedZone}</p>}
        <ProgressBar percent={zone.percent} />
      </header>
      {zone.unlocked && (
        <motion.ol
          variants={staggerList}
          initial="hidden"
          animate="visible"
          className="flex flex-col"
        >
          {zone.levels.map((level, levelIndex) => (
            <Fragment key={level.levelId}>
              {levelIndex > 0 && (
                <li aria-hidden="true">
                  <LevelConnector
                    direction={levelIndex % 2 ? 'toRight' : 'toLeft'}
                    isLeadingToLocked={level.status === 'locked'}
                  />
                </li>
              )}
              <LevelNode
                level={level}
                glyph={RUNE_GLYPHS[levelIndex % RUNE_GLYPHS.length] ?? DEFAULT_GLYPH}
                alignment={levelIndex % 2 ? 'end' : 'start'}
                isJustUnlocked={level.levelId === justUnlockedLevelId}
                onSelectLevel={onSelectLevel}
              />
            </Fragment>
          ))}
        </motion.ol>
      )}
    </section>
  );
}
