import React from 'react';
import { PlayerProfile } from '../types/game';
import { sound } from '../utils/sound';

interface PrologueScreenProps {
  player: PlayerProfile;
  onZarpar: () => void;
  onAlreadyHaveAccount: () => void;
  onClose: () => void;
}

export const PrologueScreen: React.FC<PrologueScreenProps> = ({
  player,
  onZarpar,
  onAlreadyHaveAccount,
  onClose,
}) => {
  const heroDrakkarImg =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCCMpCntqYhGq9709aatshqnTpgOd7NtZBeOQt8hUoQoNswij1DLGQkFUBevTdRT0-UWEXXya8CBqNKF9MQJJo9tnSJ-BDY-LmGoJNkZozZ_zygJY21wNaIfzSPBvYsDwmyI7T-gvCN8wPyTgCRuyIPJ0F9dnbrM-SJNVw3qsj4aVFK4SB66TXZz-t8sefr0Mp1gBR7EGQllyBET-7z_VWPt1yOlbqilJjElXqQNftuPsASF7LeFiiaLw';

  return (
    <div className="flex flex-col w-full pb-28 space-y-4 max-w-xl mx-auto">
      {/* Header bar */}
      <div className="flex items-center justify-between gap-3 bg-[#131b2c]/90 p-2 rounded-xl backdrop-blur-md shadow-[0_2px_0_#060e1e]">
        <button
          onClick={() => {
            sound.playRuneClick();
            onClose();
          }}
          className="w-10 h-10 rounded-lg bg-[#222a3b] flex items-center justify-center text-[#dbe2f9] hover:text-[#00f0ff] transition-colors shadow-[0_2px_0_#060e1e] cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="flex-1 flex flex-col gap-1 px-1">
          <div className="flex items-center justify-between">
            <span className="font-['JetBrains_Mono'] text-[11px] text-[#dbfcff] tracking-wider uppercase font-bold">
              Runic Code Duel
            </span>
            <div className="flex items-center gap-1 bg-[#222a3b] px-2 py-0.5 rounded">
              <span className="material-symbols-outlined text-[#ffb4ab] text-[14px] material-symbols-filled">
                favorite
              </span>
              <span className="font-['JetBrains_Mono'] text-[11px] text-[#ffdad6] font-bold">
                {player.hearts}/{player.maxHearts}
              </span>
            </div>
          </div>
          <div className="w-full h-1.5 bg-[#060e1e] rounded-full overflow-hidden">
            <div className="h-full bg-[#00f0ff] rounded-full w-3/5 shadow-[0_0_8px_#00f0ff]" />
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => sound.playRuneClick()}
            className="w-10 h-10 rounded-lg bg-[#222a3b] flex items-center justify-center text-[#ffd65b] shadow-[0_2px_0_#060e1e]"
          >
            <span className="material-symbols-outlined text-[20px]">raven</span>
          </button>
          <div className="w-8 h-8 rounded-full bg-[#dbfcff] overflow-hidden flex items-center justify-center">
            <img src={player.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Hero Showcase Image */}
      <div className="relative w-full rounded-xl overflow-hidden shadow-2xl bg-[#060e1e] border border-[#222a3b]">
        <div className="relative aspect-[16/9] w-full">
          <img
            alt="Einar el Skald Digital navegando en su drakkar al amanecer"
            className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-105"
            src={heroDrakkarImg}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1323] via-[#0b1323]/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#00f0ff]/10 via-transparent to-[#ffd65b]/10 pointer-events-none" />

          {/* Badges */}
          <div className="absolute top-3 left-3 bg-[#222a3b]/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse shadow-[0_0_8px_#00f0ff]" />
            <span className="font-['JetBrains_Mono'] text-[11px] font-bold text-[#dbfcff] tracking-wider uppercase">
              Acto I: Las Aguas de Midgard
            </span>
          </div>

          <div className="absolute bottom-3 right-3 bg-[#060e1e]/90 px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-md">
            <span className="material-symbols-outlined text-[#ffd65b] text-[16px]">menu_book</span>
            <span className="font-['JetBrains_Mono'] text-[11px] font-semibold text-[#ffe08b]">
              Capítulo 01
            </span>
          </div>
        </div>
      </div>

      {/* Skald Guide Introduction Box */}
      <div className="bg-[#131b2c] rounded-xl p-4 shadow-xl relative overflow-hidden border border-[#222a3b]">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00f0ff]/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#ffd65b]/5 rounded-full blur-xl pointer-events-none" />

        <div className="flex items-center gap-3 mb-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-[#2d3546] flex items-center justify-center shadow-inner overflow-hidden">
              <span className="material-symbols-outlined text-[#00dbe9] text-[28px]">
                sports_martial_arts
              </span>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-[#ffd65b] text-[#3d2f00] w-5 h-5 rounded-full flex items-center justify-center font-['JetBrains_Mono'] text-[11px] font-bold shadow-md">
              1
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h2 className="font-['Space_Grotesk'] text-[19px] font-semibold text-[#dbe2f9]">
                Einar el Skald Digital
              </h2>
              <span className="bg-[#00f0ff]/10 text-[#7df4ff] px-2 py-0.5 rounded font-['JetBrains_Mono'] text-[11px] font-bold tracking-wide">
                GUÍA
              </span>
            </div>
            <p className="font-['JetBrains_Mono'] text-[11px] text-[#b9cacb] flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px] text-[#ffd65b]">verified</span>
              Voz Ancestral del Fiordo
            </p>
          </div>
        </div>

        {/* Narrative dialogue bubbles */}
        <div className="bg-[#182030] rounded-lg p-3.5 space-y-2.5 shadow-inner border border-[#222a3b]">
          <div className="flex items-start gap-2.5">
            <span className="text-[#ffd65b] font-['JetBrains_Mono'] text-[14px] mt-0.5 select-none font-bold">
              ᚛
            </span>
            <p className="font-['Plus_Jakarta_Sans'] text-[14px] text-[#dbe2f9] leading-snug">
              ¡Saludos, intrépido navegante! Los dioses del Valhalla han encerrado el poder de la
              creación en las sagradas runas de{' '}
              <span className="text-[#00f0ff] font-semibold">C#</span> y{' '}
              <span className="text-[#ffd65b] font-semibold">SQL</span>.
            </p>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="text-[#ffd65b] font-['JetBrains_Mono'] text-[14px] mt-0.5 select-none font-bold">
              ᚛
            </span>
            <p className="font-['Plus_Jakarta_Sans'] text-[14px] text-[#dbe2f9] leading-snug">
              Conquista desafíos de lógica, forja algoritmos inquebrantables y derrota a los
              temibles <span className="text-[#ffb4ab] font-semibold">bugs</span> que amenazan los
              nueve reinos.
            </p>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="text-[#ffd65b] font-['JetBrains_Mono'] text-[14px] mt-0.5 select-none font-bold">
              ᚛
            </span>
            <p className="font-['Plus_Jakarta_Sans'] text-[14px] text-[#7df4ff] font-medium leading-snug">
              ¿Tienes el coraje para convertirte en el legendario Berserker del Código?
            </p>
          </div>
        </div>
      </div>

      {/* Tributo de Bienvenida */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <span className="font-['JetBrains_Mono'] text-[11px] text-[#b9cacb] tracking-wider uppercase font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-[#ffd65b]">card_giftcard</span>
            Tributo de Bienvenida
          </span>
          <span className="font-['JetBrains_Mono'] text-[11px] text-[#00f0ff] font-bold">
            Nivel 0 → 1
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="bg-[#222a3b] rounded-lg p-2.5 flex flex-col items-center justify-center text-center shadow-md border border-[#2d3546]">
            <span className="text-xl mb-0.5">🛡️</span>
            <span className="font-['JetBrains_Mono'] text-[11px] text-[#dbe2f9] font-bold line-clamp-1">
              Escudo Base
            </span>
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#b9cacb]">Protector</span>
          </div>

          <div className="bg-[#222a3b] rounded-lg p-2.5 flex flex-col items-center justify-center text-center shadow-md border border-[#2d3546]">
            <span className="text-xl mb-0.5">🔥</span>
            <span className="font-['JetBrains_Mono'] text-[11px] text-[#ffd65b] font-bold line-clamp-1">
              Racha +1
            </span>
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#b9cacb]">Fuego Sagrado</span>
          </div>

          <div className="bg-[#222a3b] rounded-lg p-2.5 flex flex-col items-center justify-center text-center shadow-md border border-[#2d3546]">
            <span className="text-xl mb-0.5">⚡</span>
            <span className="font-['JetBrains_Mono'] text-[11px] text-[#00f0ff] font-bold line-clamp-1">
              100 XP
            </span>
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#b9cacb]">Runas Iniciales</span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="pt-2 flex flex-col items-center gap-3">
        <button
          onClick={() => {
            sound.playForgeHit();
            onZarpar();
          }}
          className="group relative w-full h-14 bg-[#00f0ff] hover:bg-[#7df4ff] text-[#00363a] active:translate-y-1 transition-all rounded-xl shadow-[0_6px_0_#006970] active:shadow-[0_1px_0_#006970] flex items-center justify-between px-5 overflow-hidden cursor-pointer"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffd65b] shadow-[0_0_6px_#ffd65b] opacity-80" />
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#00363a]">sailing</span>
            <span className="font-['Space_Grotesk'] text-[17px] font-bold tracking-wide text-[#00363a] uppercase">
              ¡ZARPAR A LA AVENTURA!
            </span>
            <span className="material-symbols-outlined text-[20px] text-[#00363a] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffd65b] shadow-[0_0_6px_#ffd65b] opacity-80" />
        </button>

        <button
          onClick={() => {
            sound.playRuneClick();
            onAlreadyHaveAccount();
          }}
          className="h-10 px-4 rounded-lg bg-transparent hover:bg-[#222a3b]/50 text-[#b9cacb] hover:text-[#dbe2f9] transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px] text-[#ffd65b]">vpn_key</span>
          <span className="font-['JetBrains_Mono'] text-[12px]">Ya tengo una cuenta de guerrero</span>
        </button>
      </div>
    </div>
  );
};
