import React from 'react';
import { sound } from '../utils/sound';

interface BottomNavBarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ currentTab, onTabChange }) => {
  const tabs = [
    { id: 'mapa', label: 'Mapa', icon: 'explore' },
    { id: 'misiones', label: 'Misiones', icon: 'swords' },
    { id: 'galeria', label: 'Galería', icon: 'shield' },
    { id: 'perfil', label: 'Perfil', icon: 'military_tech' },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-[#131b2c]/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.4)] border-t border-[#222a3b]/50">
      <div className="flex justify-around items-center h-20 max-w-xl mx-auto px-2">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                sound.playRuneClick();
                onTabChange(tab.id);
              }}
              className={`flex flex-col items-center justify-center gap-1 min-w-[56px] h-14 transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'text-[#00f0ff] drop-shadow-[0_0_8px_rgba(0,240,255,0.45)] scale-105'
                  : 'text-[#b9cacb] hover:text-[#dbfcff] active:scale-95'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[24px] ${
                  isActive ? 'material-symbols-filled' : ''
                }`}
              >
                {tab.icon}
              </span>
              <span className="font-['JetBrains_Mono'] text-[11px] font-semibold tracking-wide">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
