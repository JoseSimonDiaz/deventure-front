import React from 'react';
import { PlayerProfile } from '../types/game';
import { sound } from '../utils/sound';

interface HeaderNavProps {
  player: PlayerProfile;
  currentTab: string;
  onNavigate: (tab: string) => void;
  onOpenProfile: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  player,
  currentTab: _currentTab,
  onNavigate: _onNavigate,
  onOpenProfile,
  soundEnabled,
  onToggleSound,
}) => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#131b2c]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.3)] pt-safe">
      <div className="h-20 px-4 max-w-xl mx-auto flex flex-col justify-center gap-1">
        {/* Top metrics row */}
        <div className="flex items-center justify-between">
          {/* Logo / Level pill */}
          <button
            onClick={() => {
              sound.playRuneClick();
              onOpenProfile();
            }}
            className="flex items-center gap-2 text-left cursor-pointer active:scale-95 transition-transform"
          >
            <div className="relative flex items-center justify-center">
              <div className="w-9 h-9 rounded-xl bg-[#222a3b] flex items-center justify-center shadow-[0_3px_0_#060e1e]">
                <span className="material-symbols-outlined text-[#ffd65b] text-[22px]">
                  sports_martial_arts
                </span>
              </div>
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#00f0ff] flex items-center justify-center">
                <span className="material-symbols-outlined text-[#00363a] text-[10px]">
                  bolt
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-['Space_Grotesk'] font-semibold text-[17px] text-[#dbfcff] tracking-wide leading-none">
                Saga Map
              </span>
              <span className="font-['JetBrains_Mono'] text-[11px] text-[#b9cacb] font-semibold tracking-wider">
                VALKYRIE LVL {player.level}
              </span>
            </div>
          </button>

          {/* Player Resource Badges */}
          <div className="flex items-center gap-1.5">
            {/* Health */}
            <div className="flex items-center gap-1 bg-[#222a3b] px-2 py-1 rounded-lg">
              <span className="material-symbols-outlined text-[#ffb4ab] text-[16px] material-symbols-filled">
                favorite
              </span>
              <span className="font-['JetBrains_Mono'] text-[13px] font-bold text-[#ffdad6]">
                {player.hearts}/{player.maxHearts}
              </span>
            </div>

            {/* Odin Gems */}
            <div className="flex items-center gap-1 bg-[#222a3b] px-2 py-1 rounded-lg">
              <span className="material-symbols-outlined text-[#ffd65b] text-[16px] material-symbols-filled">
                monetization_on
              </span>
              <span className="font-['JetBrains_Mono'] text-[13px] font-bold text-[#ffd65b]">
                {player.gems}
              </span>
            </div>

            {/* Fire Streak */}
            <div className="flex items-center gap-1 bg-[#222a3b] px-2 py-1 rounded-lg">
              <span className="material-symbols-outlined text-[#ac3500] text-[16px] material-symbols-filled">
                local_fire_department
              </span>
              <span className="font-['JetBrains_Mono'] text-[13px] font-bold text-[#ac3500]">
                {player.streak}
              </span>
            </div>

            {/* Sound FX Toggle */}
            <button
              onClick={() => {
                onToggleSound();
                sound.playRuneClick();
              }}
              title={soundEnabled ? 'Silenciar Runas' : 'Activar Sonido Rúnico'}
              className="w-8 h-8 rounded-lg bg-[#222a3b] flex items-center justify-center text-[#b9cacb] hover:text-[#00f0ff] transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">
                {soundEnabled ? 'volume_up' : 'volume_off'}
              </span>
            </button>

            {/* User Avatar */}
            <button
              onClick={() => {
                sound.playRuneClick();
                onOpenProfile();
              }}
              className="w-8 h-8 rounded-full bg-[#dbfcff] overflow-hidden flex items-center justify-center ring-2 ring-[#00f0ff]/40 active:scale-95 transition-transform"
              title="Perfil del Guerrero"
            >
              {player.avatarUrl ? (
                <img
                  src={player.avatarUrl}
                  alt={player.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="material-symbols-outlined text-[#00363a] text-[18px]">
                  person
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Bottom XP Bar */}
        <div className="w-full flex items-center gap-2">
          <div className="flex-1 h-2 bg-[#060e1e] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#00f0ff] to-[#ffd65b] rounded-full transition-all duration-500 shadow-[0_0_8px_#00f0ff]"
              style={{
                width: `${Math.min(100, Math.round((player.xp / player.xpMax) * 100))}%`,
              }}
            />
          </div>
          <span className="font-['JetBrains_Mono'] text-[11px] font-semibold text-[#7df4ff] whitespace-nowrap">
            {player.xp}/{player.xpMax} XP
          </span>
        </div>
      </div>
    </header>
  );
};
