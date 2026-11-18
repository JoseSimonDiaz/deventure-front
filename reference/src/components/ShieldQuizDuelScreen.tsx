import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { PlayerProfile } from '../types/game';
import { sound } from '../utils/sound';

interface ShieldQuizDuelScreenProps {
  player: PlayerProfile;
  onBack: () => void;
  onSuccess: (xpGained: number) => void;
  onShowToast: (msg: string) => void;
  onSwitchToForge: () => void;
}

export const ShieldQuizDuelScreen: React.FC<ShieldQuizDuelScreenProps> = ({
  player,
  onBack,
  onSuccess,
  onShowToast,
  onSwitchToForge,
}) => {
  const [selectedShield, setSelectedShield] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [hintRevealed, setHintRevealed] = useState(false);
  const [spellCastState, setSpellCastState] = useState<'none' | 'success' | 'error'>('none');

  const thinkingHeroAvatar =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAEpsAyPZTGFxWEqjXHiGMpwkolUSQeV_tcoymLUGW7jfPZsi01vMHK1EFRJiWlbiGBKuWevZit62om0SA9ijyyK-ZEdOeLNbC5hyIi5yTH095sPl9_DF16NtpoH2XhGhb3thc5u7Ai6Na1gy_dnvkODowNKpkXaux_mRQWEbJQuCzDr86vbNieOBpGHcCWztz9A62NhywLmdiGd85D1Qo2__sfjGLPOAXjqUwtyIP7L4Mi_hBErmw0cQ';

  const handleSelectShield = (shield: 'A' | 'B' | 'C' | 'D') => {
    sound.playRuneClick();
    setSelectedShield(shield);
    setSpellCastState('none');
  };

  const handleRevealHint = () => {
    sound.playRuneClick();
    if (!hintRevealed) {
      setHintRevealed(true);
      onShowToast('Hugin murmura: El operador + entre dos enteros (int) efectúa adición aritmética.');
    }
  };

  const handleCastSpell = () => {
    if (!selectedShield) {
      sound.playErrorBuzz();
      onShowToast('¡Empuña un escudo! Selecciona una runa antes de invocar la magia de Odín.');
      return;
    }

    if (selectedShield === 'B') {
      sound.playCritSpell();
      setSpellCastState('success');
      confetti({
        particleCount: 75,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#00f0ff', '#ffd65b', '#ff6b35'],
      });
      onSuccess(80);
      onShowToast('⚡ ¡Golpe crítico rúnico! +80 XP y honor en Valhalla.');
    } else {
      sound.playErrorBuzz();
      setSpellCastState('error');
      onShowToast('⚠️ Magia corrupta: Revisa cómo interactúan los tipos numéricos int en C#.');
    }
  };

  return (
    <div className="flex flex-col w-full pb-28 space-y-4 max-w-xl mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-3 bg-[#131b2c]/90 p-2 rounded-xl backdrop-blur-md shadow-[0_2px_0_#060e1e]">
        <button
          onClick={() => {
            sound.playRuneClick();
            onBack();
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
            <div className="h-full bg-[#00f0ff] rounded-full w-4/5 shadow-[0_0_8px_#00f0ff]" />
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              sound.playRuneClick();
              handleRevealHint();
            }}
            title="Consejo de Huginn"
            className="w-10 h-10 rounded-lg bg-[#222a3b] flex items-center justify-center text-[#ffd65b] hover:text-[#ffe08b] transition-colors shadow-[0_2px_0_#060e1e] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">raven</span>
          </button>
          <div className="w-8 h-8 rounded-full bg-[#dbfcff] overflow-hidden flex items-center justify-center">
            <img src={player.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Challenge Lore Stone Banner */}
      <div className="relative bg-[#182030] rounded-xl p-4 shadow-[0_6px_0_#060e1e] overflow-hidden border border-[#222a3b]">
        {/* Geometric Norse watermark background */}
        <div className="absolute -right-2 -bottom-2 w-28 h-28 opacity-20 pointer-events-none text-[#00f0ff]">
          <svg className="w-full h-full fill-current" viewBox="0 0 100 100">
            <path
              d="M50 0 L93 25 L93 75 L50 100 L7 75 L7 25 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              d="M50 15 L80 32 L80 68 L50 85 L20 68 L20 32 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle cx="50" cy="50" fill="none" r="12" stroke="currentColor" strokeWidth="3" />
          </svg>
        </div>

        <div className="flex items-start gap-3 relative z-10">
          <div className="relative shrink-0">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#222a3b] shadow-[0_3px_0_#060e1e]">
              <img
                className="w-full h-full object-cover"
                src={thinkingHeroAvatar}
                alt="Thinking Viking Hero"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-[#ffd65b] text-[#3d2f00] px-1.5 py-0.2 rounded font-['JetBrains_Mono'] text-[10px] uppercase font-bold shadow-[0_2px_0_#5f4a00]">
              XP +80
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <span className="font-['JetBrains_Mono'] text-[11px] text-[#7df4ff] tracking-wider uppercase flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">auto_fix_high</span>
                Capítulo 3: Encantamientos C#
              </span>
              <span className="font-['JetBrains_Mono'] text-[11px] text-[#ffd65b] flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[14px]">bolt</span>
                Combo x2
              </span>
            </div>

            <h2 className="font-['Space_Grotesk'] text-[17px] font-semibold text-[#dbe2f9] leading-snug">
              ¿Cuál es el valor final de la runa{' '}
              <span className="text-[#00f0ff] font-['JetBrains_Mono'] font-bold">dañoTotal</span>{' '}
              tras invocar este encantamiento?
            </h2>
          </div>
        </div>
      </div>

      {/* Runestone Code Forge Editor */}
      <div className="bg-[#060e1e] rounded-xl p-3 shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)] relative overflow-hidden border border-[#222a3b]">
        {/* Stone header */}
        <div className="flex items-center justify-between px-1 pb-1 mb-1.5 text-[#b9cacb] border-b border-[#222a3b]/50">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffb4ab]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffd65b]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#00dbe9]" />
            </div>
            <span className="font-['JetBrains_Mono'] text-[11px] text-[#00f0ff] tracking-widest pl-1 font-bold">
              FORJA_RUNICA.CS
            </span>
          </div>
          <div className="flex items-center gap-1 font-['JetBrains_Mono'] text-[10px] text-[#b9cacb] bg-[#182030] px-2 py-0.5 rounded">
            <span className="material-symbols-outlined text-[12px] text-[#00f0ff]">terminal</span>
            C# RUNIC v9.4
          </div>
        </div>

        {/* Code Lines with Syntax Colors */}
        <div className="bg-[#131b2c] rounded-lg p-3 font-['JetBrains_Mono'] text-[13px] space-y-1">
          <div className="flex items-center gap-2 text-[#849495]">
            <span className="text-[#2d3546] font-['JetBrains_Mono'] text-[11px] select-none">01</span>
            <span className="italic">// Forja de Ataque Rúnico</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#2d3546] font-['JetBrains_Mono'] text-[11px] select-none">02</span>
            <span>
              <span className="text-[#00f0ff] font-semibold">int</span>{' '}
              <span className="text-[#dbe2f9]">dañoBase</span>{' '}
              <span className="text-[#ffe08b]">=</span>{' '}
              <span className="text-[#ffd65b] font-bold">25</span>
              <span className="text-[#b9cacb]">;</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#2d3546] font-['JetBrains_Mono'] text-[11px] select-none">03</span>
            <span>
              <span className="text-[#00f0ff] font-semibold">int</span>{' '}
              <span className="text-[#dbe2f9]">bonoFuria</span>{' '}
              <span className="text-[#ffe08b]">=</span>{' '}
              <span className="text-[#ffd65b] font-bold">10</span>
              <span className="text-[#b9cacb]">;</span>
            </span>
          </div>

          <div className="flex items-center gap-2 bg-[#222a3b]/60 rounded px-1 -mx-1">
            <span className="text-[#7df4ff] font-['JetBrains_Mono'] text-[11px] select-none">04</span>
            <span>
              <span className="text-[#00f0ff] font-semibold">int</span>{' '}
              <span className="text-[#00f0ff] font-bold">dañoTotal</span>{' '}
              <span className="text-[#ffe08b]">=</span>{' '}
              <span className="text-[#dbe2f9]">dañoBase</span>{' '}
              <span className="text-[#ffe08b]">+</span>{' '}
              <span className="text-[#dbe2f9]">bonoFuria</span>
              <span className="text-[#b9cacb]">;</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#2d3546] font-['JetBrains_Mono'] text-[11px] select-none">05</span>
            <span>
              <span className="text-[#ffb59d]">Console</span>
              <span className="text-[#b9cacb]">.</span>
              <span className="text-[#7df4ff]">WriteLine</span>
              <span className="text-[#b9cacb]">(</span>
              <span className="text-[#dbfcff]">dañoTotal</span>
              <span className="text-[#b9cacb]">);</span>
            </span>
          </div>
        </div>
      </div>

      {/* 4 Kahoot-Style Tactile 3D Shields Grid */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        {/* Option A: Crimson Shield (ᛏ Tiwaz) */}
        <button
          onClick={() => handleSelectShield('A')}
          type="button"
          className={`group relative flex flex-col items-center justify-center p-3 rounded-xl transition-all active:translate-y-1 text-center cursor-pointer ${
            selectedShield === 'A'
              ? 'bg-[#93000a] ring-2 ring-[#ffdad6] shadow-[0_5px_0_#490003] scale-[1.02]'
              : 'bg-[#93000a]/80 hover:bg-[#93000a] text-[#ffdad6] shadow-[0_5px_0_#490003]'
          }`}
        >
          <div className="flex items-center justify-between w-full mb-1">
            <span className="w-6 h-6 rounded-full bg-[#ffb4ab]/30 flex items-center justify-center text-[11px] font-['JetBrains_Mono'] text-[#ffdad6] font-bold">
              A
            </span>
            <div className="flex gap-1 opacity-70">
              <div className="w-1.5 h-1.5 rounded-full bg-[#ffdad6]/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#ffdad6]/40" />
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#690005] flex items-center justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] my-1">
            <span className="text-[20px] font-bold text-[#ffdad6] select-none">ᛏ</span>
          </div>
          <span className="font-['Space_Grotesk'] text-[24px] font-bold text-[#ffdad6] mt-1">
            15
          </span>
          <span className="font-['JetBrains_Mono'] text-[10px] text-[#ffb4ab] uppercase tracking-wider mt-0.5">
            Runa Tiwaz
          </span>
        </button>

        {/* Option B: Ice Cyan Shield (ᛉ Algiz) - Correct */}
        <button
          onClick={() => handleSelectShield('B')}
          type="button"
          className={`group relative flex flex-col items-center justify-center p-3 rounded-xl transition-all active:translate-y-1 text-center cursor-pointer ${
            selectedShield === 'B'
              ? 'bg-[#222a3b] ring-2 ring-[#00f0ff] shadow-[0_5px_0_#060e1e] scale-[1.02]'
              : 'bg-[#182030] hover:bg-[#222a3b] text-[#dbfcff] shadow-[0_5px_0_#060e1e]'
          }`}
        >
          <div className="flex items-center justify-between w-full mb-1">
            <span className="w-6 h-6 rounded-full bg-[#00f0ff]/20 flex items-center justify-center text-[11px] font-['JetBrains_Mono'] text-[#00f0ff] font-bold">
              B
            </span>
            <div className="flex gap-1 opacity-70">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00f0ff]/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#00f0ff]/40" />
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#00f0ff] flex items-center justify-center shadow-[0_0_12px_#00f0ff] my-1">
            <span className="text-[20px] font-bold text-[#00363a] select-none">ᛉ</span>
          </div>
          <span className="font-['Space_Grotesk'] text-[24px] font-bold text-[#00f0ff] mt-1">
            35
          </span>
          <span className="font-['JetBrains_Mono'] text-[10px] text-[#7df4ff] uppercase tracking-wider mt-0.5">
            Runa Algiz
          </span>
        </button>

        {/* Option C: Gold Shield (ᚠ Fehu) */}
        <button
          onClick={() => handleSelectShield('C')}
          type="button"
          className={`group relative flex flex-col items-center justify-center p-3 rounded-xl transition-all active:translate-y-1 text-center cursor-pointer ${
            selectedShield === 'C'
              ? 'bg-[#222a3b] ring-2 ring-[#ffd65b] shadow-[0_5px_0_#060e1e] scale-[1.02]'
              : 'bg-[#182030] hover:bg-[#222a3b] text-[#ffd65b] shadow-[0_5px_0_#060e1e]'
          }`}
        >
          <div className="flex items-center justify-between w-full mb-1">
            <span className="w-6 h-6 rounded-full bg-[#ffd65b]/20 flex items-center justify-center text-[11px] font-['JetBrains_Mono'] text-[#ffe08b] font-bold">
              C
            </span>
            <div className="flex gap-1 opacity-70">
              <div className="w-1.5 h-1.5 rounded-full bg-[#ffd65b]/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#ffd65b]/40" />
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#ffd65b] flex items-center justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] my-1">
            <span className="text-[20px] font-bold text-[#3d2f00] select-none">ᚠ</span>
          </div>
          <span className="font-['Space_Grotesk'] text-[24px] font-bold text-[#ffd65b] mt-1">
            2510
          </span>
          <span className="font-['JetBrains_Mono'] text-[10px] text-[#ffe08b] uppercase tracking-wider mt-0.5">
            Runa Fehu
          </span>
        </button>

        {/* Option D: Dark Shield (ᛊ Sowilo) */}
        <button
          onClick={() => handleSelectShield('D')}
          type="button"
          className={`group relative flex flex-col items-center justify-center p-3 rounded-xl transition-all active:translate-y-1 text-center cursor-pointer ${
            selectedShield === 'D'
              ? 'bg-[#222a3b] ring-2 ring-[#b9cacb] shadow-[0_5px_0_#060e1e] scale-[1.02]'
              : 'bg-[#182030] hover:bg-[#222a3b] text-[#dbe2f9] shadow-[0_5px_0_#060e1e]'
          }`}
        >
          <div className="flex items-center justify-between w-full mb-1">
            <span className="w-6 h-6 rounded-full bg-[#2d3546] flex items-center justify-center text-[11px] font-['JetBrains_Mono'] text-[#b9cacb] font-bold">
              D
            </span>
            <div className="flex gap-1 opacity-70">
              <div className="w-1.5 h-1.5 rounded-full bg-[#b9cacb]/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#b9cacb]/40" />
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#31394b] flex items-center justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] my-1">
            <span className="text-[20px] font-bold text-[#dbe2f9] select-none">ᛊ</span>
          </div>
          <span className="font-['Space_Grotesk'] text-[17px] font-bold text-[#dbe2f9] mt-1 truncate max-w-full">
            Error de Forja
          </span>
          <span className="font-['JetBrains_Mono'] text-[10px] text-[#b9cacb] uppercase tracking-wider mt-0.5">
            Runa Sowilo
          </span>
        </button>
      </div>

      {/* Odin's Raven Hint Quick Bar */}
      <div className="bg-[#182030] rounded-xl p-3 flex items-center justify-between shadow-[0_2px_0_#060e1e] border border-[#222a3b]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#222a3b] flex items-center justify-center text-[#ffd65b]">
            <span className="material-symbols-outlined text-[18px]">raven</span>
          </div>
          <span className="font-['Plus_Jakarta_Sans'] text-[14px] text-[#dbe2f9]">
            {hintRevealed ? 'Pista: int + int = 25 + 10 (Suma aritmética)' : 'Consejo de Hugin'}
          </span>
        </div>

        <button
          onClick={handleRevealHint}
          disabled={hintRevealed}
          className={`flex items-center gap-1 px-3 py-1.5 rounded font-['JetBrains_Mono'] text-[12px] font-bold shadow-[0_2px_0_#060e1e] transition-all cursor-pointer ${
            hintRevealed
              ? 'bg-[#222a3b] text-[#7df4ff] cursor-default'
              : 'bg-[#222a3b] hover:bg-[#2d3546] text-[#ffd65b] active:translate-y-0.5'
          }`}
        >
          <span className="material-symbols-outlined text-[14px]">
            {hintRevealed ? 'lightbulb' : 'token'}
          </span>
          <span>{hintRevealed ? 'Revelado' : '-10 Runas'}</span>
        </button>
      </div>

      {/* Feedback Banner */}
      {spellCastState === 'success' && (
        <div className="rounded-xl p-4 flex items-center gap-3 bg-[#00f0ff] text-[#00363a] shadow-[0_4px_0_#006970] animate-bounce">
          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-[#00363a] text-[#00f0ff]">
            <span className="material-symbols-outlined text-[24px]">verified</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-['Space_Grotesk'] text-[18px] font-bold leading-tight">
              ¡GOLPE CRÍTICO RÚNICO!
            </h3>
            <p className="font-['Plus_Jakarta_Sans'] text-[13px]">
              int suma 25 + 10 = 35. ¡El dragón sufre daño masivo! (+80 XP)
            </p>
          </div>
        </div>
      )}

      {spellCastState === 'error' && (
        <div className="rounded-xl p-4 flex items-center gap-3 bg-[#93000a] text-[#ffdad6] shadow-[0_4px_0_#490003] animate-pulse">
          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-[#690005] text-[#ffdad6]">
            <span className="material-symbols-outlined text-[24px]">heart_broken</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-['Space_Grotesk'] text-[18px] font-bold leading-tight">
              ¡MAGIA CORRUPTA!
            </h3>
            <p className="font-['Plus_Jakarta_Sans'] text-[13px]">
              En C#, int + int realiza suma matemática, no concatenación de texto.
            </p>
          </div>
        </div>
      )}

      {/* Cast Spell Button */}
      <div className="pt-2">
        <button
          onClick={handleCastSpell}
          type="button"
          className={`w-full relative group overflow-hidden py-4 px-6 rounded-xl font-['Space_Grotesk'] text-[20px] font-bold tracking-wider flex items-center justify-center gap-3 transition-all active:translate-y-1 cursor-pointer ${
            selectedShield
              ? 'bg-[#ffd65b] text-[#3d2f00] shadow-[0_6px_0_#5f4a00]'
              : 'bg-[#00f0ff] hover:bg-[#7df4ff] text-[#00363a] shadow-[0_6px_0_#006970]'
          }`}
        >
          <span className="material-symbols-outlined text-[28px] animate-pulse">swords</span>
          <span>LANZAR HECHIZO</span>
          <span className="material-symbols-outlined text-[28px]">electric_bolt</span>
        </button>
      </div>

      {/* Switch to Forge tool */}
      <div className="text-center pt-1">
        <button
          onClick={() => {
            sound.playRuneClick();
            onSwitchToForge();
          }}
          className="text-[#b9cacb] hover:text-[#00f0ff] font-['JetBrains_Mono'] text-[12px] underline cursor-pointer"
        >
          ← Regresar al Yunque de Sintaxis (Aegis Frost)
        </button>
      </div>
    </div>
  );
};
