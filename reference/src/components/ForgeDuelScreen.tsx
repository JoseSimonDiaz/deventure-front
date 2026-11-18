import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { PlayerProfile } from '../types/game';
import { sound } from '../utils/sound';

interface ForgeDuelScreenProps {
  player: PlayerProfile;
  onBack: () => void;
  onSuccess: (xpGained: number) => void;
  onShowToast: (msg: string) => void;
  onSwitchToQuiz: () => void;
}

export const ForgeDuelScreen: React.FC<ForgeDuelScreenProps> = ({
  player,
  onBack,
  onSuccess,
  onShowToast,
  onSwitchToQuiz,
}) => {
  const [selectedRune, setSelectedRune] = useState<string | null>(null);
  const [forgeState, setForgeState] = useState<'idle' | 'success' | 'error'>('idle');
  const [heatLevel] = useState(850);
  const [showRavenAdvice, setShowRavenAdvice] = useState(false);

  const heroGuidanceAvatar =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCcr8oPFXVkRQ0sOTx50jb4byHLogdgOxHKTRCsvjrZvzto93pXbnGu-CgUgBz144IRHl8Jbjo4SjOgEJq_JLmT91URB8Zrj4U6r8vGI_BZfvPeessqp5rVXvhu_1LX3SA5mh8OLp54ryzLcWoCeFGV6VZFwUtMKpaeSdmJhT_5Hs0Ibv1I9xPVUvGO-ezlARjJhtUvXhTMR8DMb-oCO2W5Z3wMzuJFg0gfcCMBIWw-DbIqr_ge86QoLw';

  const runes = [
    { id: 'used-if', label: 'if', type: 'used', icon: 'auto_fix_high' },
    { id: 'correct-defensa', label: '"¡Defensa Activa!"', type: 'correct', icon: 'verified', color: 'cyan' },
    { id: 'while', label: 'while', type: 'distractor', icon: 'cached', color: 'gold' },
    { id: 'cond-zero', label: 'armadura == 0', type: 'distractor', icon: 'tune', color: 'slate' },
    { id: 'else-if', label: 'else if', type: 'distractor', icon: 'call_split', color: 'cyan-fixed' },
    { id: 'broken-shield', label: '"Escudo Roto"', type: 'distractor', icon: 'broken_image', color: 'error' },
  ];

  const handleSelectRune = (label: string) => {
    sound.playRuneClick();
    setSelectedRune(label);
    setForgeState('idle');
  };

  const handleReset = () => {
    sound.playRuneClick();
    setSelectedRune(null);
    setForgeState('idle');
  };

  const handleExecuteForge = () => {
    if (!selectedRune) {
      sound.playErrorBuzz();
      onShowToast('Selecciona o engarza una runa mágica en el hacha antes de forjar.');
      return;
    }

    if (selectedRune === '"¡Defensa Activa!"') {
      sound.playForgeHit();
      setForgeState('success');
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#00f0ff', '#ffd65b', '#ffffff'],
      });
      onSuccess(30);
      onShowToast('⚔️ ¡Arma consagrada con éxito! +30 XP forjados');
    } else {
      sound.playErrorBuzz();
      setForgeState('error');
      onShowToast('⚠️ Fallo rúnico: La condición (armadura >= 30) se cumple, imprime el mensaje de defensa.');
      setTimeout(() => setForgeState('idle'), 1500);
    }
  };

  return (
    <div className="flex flex-col w-full pb-28 space-y-4 max-w-xl mx-auto">
      {/* Top Duel Bar */}
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
            <div className="h-full bg-[#00f0ff] rounded-full w-3/5 shadow-[0_0_8px_#00f0ff]" />
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              sound.playRuneClick();
              setShowRavenAdvice(!showRavenAdvice);
            }}
            title="Consejo del Cuervo"
            className="w-10 h-10 rounded-lg bg-[#222a3b] flex items-center justify-center text-[#ffd65b] hover:text-[#ffe08b] transition-colors shadow-[0_2px_0_#060e1e] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">raven</span>
          </button>
          <div className="w-8 h-8 rounded-full bg-[#dbfcff] overflow-hidden flex items-center justify-center">
            <img src={player.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Raven Advice Dropdown if open */}
      {showRavenAdvice && (
        <div className="bg-[#182030] border border-[#ffd65b]/40 rounded-xl p-3 flex items-start gap-3 shadow-[0_4px_0_#060e1e] animate-fadeIn">
          <div className="w-8 h-8 rounded-lg bg-[#222a3b] flex items-center justify-center text-[#ffd65b] shrink-0">
            <span className="material-symbols-outlined text-[20px]">raven</span>
          </div>
          <div className="flex-1">
            <h4 className="font-['JetBrains_Mono'] text-[12px] font-bold text-[#ffd65b]">
              Consejo de Huginn & Muninn
            </h4>
            <p className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#dbe2f9] mt-0.5 leading-snug">
              "Dado que <code>armadura = 50</code> y la condición es <code>armadura &gt;= 30</code>, la rama se ejecutará. Debes encajar la runa de victoria <strong>&quot;¡Defensa Activa!&quot;</strong> para que el hacha cante su conjuro."
            </p>
          </div>
        </div>
      )}

      {/* Viking Hero Guidance Card */}
      <div className="relative overflow-hidden rounded-xl bg-[#182030] shadow-xl border border-[#222a3b]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00f0ff]/10 via-transparent to-[#ffd65b]/10 pointer-events-none" />
        <div className="relative p-3.5 flex items-center gap-3">
          <div className="relative shrink-0 w-16 h-16 rounded-xl overflow-hidden shadow-[0_4px_0_#060e1e] bg-[#222a3b]">
            <img
              className="w-full h-full object-cover"
              src={heroGuidanceAvatar}
              alt="Anime Viking Hero"
            />
            <div className="absolute bottom-0 right-0 bg-[#ffd65b] text-[#3d2f00] px-1 py-0.2 rounded-tl font-['JetBrains_Mono'] text-[10px] uppercase font-bold tracking-tight">
              LV.4
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#2d3546] text-[#ffd65b] font-['JetBrains_Mono'] text-[11px] font-semibold">
                <span className="material-symbols-outlined text-[13px] material-symbols-filled">
                  hardware
                </span>
                Yunque Enano
              </span>
              <span className="text-[#b9cacb] font-['JetBrains_Mono'] text-[11px] truncate">
                Misión: Aegis Frost
              </span>
            </div>
            <p className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#dbe2f9] leading-snug">
              "Arrastra o toca las runas mágicas para encajarlas en la hoja del hacha antes de que caiga el fuego rúnico."
            </p>
          </div>
        </div>
      </div>

      {/* Mystic Energy Meter */}
      <div className="rounded-xl bg-[#131b2c] p-2.5 shadow-md flex items-center justify-between gap-3 border border-[#222a3b]">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-[#222a3b] flex items-center justify-center text-[#00f0ff] shadow-[0_2px_0_#060e1e]">
            <span className="material-symbols-outlined text-[18px]">bolt</span>
          </div>
          <div className="flex flex-col">
            <span className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-wider text-[#b9cacb]">
              Calor de la Forja
            </span>
            <span className="font-['JetBrains_Mono'] text-[14px] text-[#dbfcff] font-bold">
              {heatLevel}°C <span className="text-[#ffd65b] text-[11px]">✦ Óptimo</span>
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-6 rounded bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]" />
          <div className="w-2.5 h-6 rounded bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]" />
          <div className="w-2.5 h-6 rounded bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]" />
          <div className="w-2.5 h-6 rounded bg-[#00f0ff]/40" />
          <div className="w-2.5 h-6 rounded bg-[#222a3b]" />
        </div>
      </div>

      {/* Forge Code Runestone (Anvil Blade) */}
      <div className="relative rounded-xl bg-[#060e1e] p-4 shadow-[0_8px_0_#060e1e] overflow-hidden border border-[#222a3b]">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00f0ff]/5 rounded-full blur-2xl pointer-events-none" />

        {/* Code Editor Stone Top Bar */}
        <div className="flex items-center justify-between pb-2 mb-2 bg-[#222a3b]/40 -mx-4 px-4 -mt-4 pt-3 border-b border-[#222a3b]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffd65b] text-[18px]">shield</span>
            <span className="font-['JetBrains_Mono'] text-[11px] text-[#dbe2f9] font-semibold tracking-wide uppercase">
              RuneAxe_Defense.cs
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#ffb4ab]" />
            <span className="w-2 h-2 rounded-full bg-[#ffd65b]" />
            <span className="w-2 h-2 rounded-full bg-[#00f0ff]" />
          </div>
        </div>

        {/* Code Block with Inset Rune Slots */}
        <div className="font-['JetBrains_Mono'] text-[15px] leading-relaxed text-[#dbe2f9] flex flex-col space-y-2 py-1">
          {/* Line 1 */}
          <div className="flex items-center flex-wrap gap-2">
            <span className="text-[#ffd65b] font-semibold">int</span>
            <span className="text-[#dbfcff] font-medium">armadura</span>
            <span className="text-[#b9cacb]">=</span>
            <span className="text-[#ffe08b] font-bold">50</span>
            <span className="text-[#b9cacb]">;</span>
          </div>

          {/* Line 2: if Slot */}
          <div className="flex items-center flex-wrap gap-2 py-1">
            <div className="relative inline-flex items-center justify-center px-3 py-1.5 rounded-lg bg-[#222a3b] text-[#00f0ff] font-['JetBrains_Mono'] text-[13px] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] min-h-[38px] min-w-[70px]">
              <span className="font-bold tracking-wide">if</span>
              <span className="material-symbols-outlined text-[14px] text-[#7df4ff] ml-1">
                lock
              </span>
            </div>
            <span className="text-[#b9cacb]">(</span>
            <span className="text-[#dbfcff]">armadura</span>
            <span className="text-[#ffe08b]">&gt;=</span>
            <span className="text-[#ffe08b] font-bold">30</span>
            <span className="text-[#b9cacb]">)</span>
          </div>

          <div className="text-[#b9cacb] font-bold">&#123;</div>

          {/* Line 4: Console.WriteLine( [Slot] ); */}
          <div className="pl-5 flex items-center flex-wrap gap-2 py-1">
            <span className="text-[#00f0ff]">Console</span>
            <span className="text-[#b9cacb]">.</span>
            <span className="text-[#7df4ff]">WriteLine</span>
            <span className="text-[#b9cacb]">(</span>

            {/* Inset Slot Button */}
            <button
              onClick={handleReset}
              className={`relative inline-flex items-center justify-center px-3.5 py-1.5 rounded-lg font-['JetBrains_Mono'] text-[13px] transition-all min-h-[40px] min-w-[140px] cursor-pointer shadow-[inset_0_2px_4px_rgba(0,0,0,0.7)] ${
                selectedRune
                  ? forgeState === 'success'
                    ? 'bg-[#182030] text-[#00f0ff] border border-[#00f0ff] shadow-[0_0_15px_#00f0ff]'
                    : forgeState === 'error'
                    ? 'bg-[#182030] text-[#ffb4ab] border border-[#ffb4ab] shadow-[0_0_15px_#ffb4ab]'
                    : 'bg-[#222a3b] text-[#00f0ff]'
                  : 'bg-[#182030] text-[#b9cacb] hover:bg-[#222a3b]'
              }`}
            >
              {selectedRune ? (
                <span className="font-bold tracking-wide flex items-center gap-1">
                  {selectedRune}
                  <span className="material-symbols-outlined text-[14px] text-[#b9cacb]">close</span>
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-[#b9cacb] font-['JetBrains_Mono'] text-[11px]">
                  <span className="material-symbols-outlined text-[16px] text-[#00f0ff] animate-pulse">
                    add_circle
                  </span>
                  Engarzar runa
                </span>
              )}
            </button>

            <span className="text-[#b9cacb]">);</span>
          </div>

          <div className="text-[#b9cacb] font-bold">&#125;</div>
        </div>
      </div>

      {/* Runestone Vault Section */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#ffd65b] text-[16px]">token</span>
            <span className="font-['JetBrains_Mono'] text-[13px] uppercase tracking-wider text-[#dbe2f9] font-bold">
              Banco de Runas Mágicas
            </span>
          </div>
          <span className="font-['JetBrains_Mono'] text-[11px] text-[#b9cacb]">
            Toca para encajar
          </span>
        </div>

        {/* Runic Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Used Inactive Rune */}
          <button
            className="w-full text-left p-3 rounded-xl bg-[#222a3b]/40 text-[#b9cacb]/40 flex items-center justify-between cursor-not-allowed shadow-[0_2px_0_#060e1e]"
            disabled
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-[#b9cacb]/30">
                auto_fix_high
              </span>
              <span className="font-['JetBrains_Mono'] text-[13px] font-bold">if</span>
            </div>
            <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-wider bg-[#060e1e] px-1.5 py-0.5 rounded text-[#b9cacb]/50">
              Usada
            </span>
          </button>

          {/* Target Rune: ¡Defensa Activa! */}
          <button
            onClick={() => handleSelectRune('"¡Defensa Activa!"')}
            className={`w-full text-left p-3 rounded-xl transition-all shadow-[0_4px_0_#060e1e] active:translate-y-1 flex items-center justify-between cursor-pointer ${
              selectedRune === '"¡Defensa Activa!"'
                ? 'bg-[#222a3b] ring-2 ring-[#00f0ff]'
                : 'bg-[#182030] hover:bg-[#222a3b]'
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-[#00f0ff] text-[18px]">verified</span>
              <span className="font-['JetBrains_Mono'] text-[13px] text-[#dbfcff] font-bold truncate">
                "¡Defensa Activa!"
              </span>
            </div>
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] shadow-[0_0_6px_#00f0ff] shrink-0" />
          </button>

          {/* Distractor: while */}
          <button
            onClick={() => handleSelectRune('while')}
            className={`w-full text-left p-3 rounded-xl transition-all shadow-[0_4px_0_#060e1e] active:translate-y-1 flex items-center justify-between cursor-pointer ${
              selectedRune === 'while'
                ? 'bg-[#222a3b] ring-2 ring-[#ffd65b]'
                : 'bg-[#182030] hover:bg-[#222a3b]'
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-[#ffd65b] text-[18px]">cached</span>
              <span className="font-['JetBrains_Mono'] text-[13px] text-[#ffd65b] font-bold truncate">
                while
              </span>
            </div>
            <span className="w-2 h-2 rounded-full bg-[#ffd65b] shrink-0" />
          </button>

          {/* Distractor: armadura == 0 */}
          <button
            onClick={() => handleSelectRune('armadura == 0')}
            className={`w-full text-left p-3 rounded-xl transition-all shadow-[0_4px_0_#060e1e] active:translate-y-1 flex items-center justify-between cursor-pointer ${
              selectedRune === 'armadura == 0'
                ? 'bg-[#222a3b] ring-2 ring-[#b9cacb]'
                : 'bg-[#182030] hover:bg-[#222a3b]'
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-[#b9cacb] text-[18px]">tune</span>
              <span className="font-['JetBrains_Mono'] text-[13px] text-[#dbe2f9] font-bold truncate">
                armadura == 0
              </span>
            </div>
            <span className="w-2 h-2 rounded-full bg-[#2d3546] shrink-0" />
          </button>

          {/* Distractor: else if */}
          <button
            onClick={() => handleSelectRune('else if')}
            className={`w-full text-left p-3 rounded-xl transition-all shadow-[0_4px_0_#060e1e] active:translate-y-1 flex items-center justify-between cursor-pointer ${
              selectedRune === 'else if'
                ? 'bg-[#222a3b] ring-2 ring-[#7df4ff]'
                : 'bg-[#182030] hover:bg-[#222a3b]'
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-[#7df4ff] text-[18px]">call_split</span>
              <span className="font-['JetBrains_Mono'] text-[13px] text-[#7df4ff] font-bold truncate">
                else if
              </span>
            </div>
            <span className="w-2 h-2 rounded-full bg-[#7df4ff] shrink-0" />
          </button>

          {/* Distractor: "Escudo Roto" */}
          <button
            onClick={() => handleSelectRune('"Escudo Roto"')}
            className={`w-full text-left p-3 rounded-xl transition-all shadow-[0_4px_0_#060e1e] active:translate-y-1 flex items-center justify-between cursor-pointer ${
              selectedRune === '"Escudo Roto"'
                ? 'bg-[#222a3b] ring-2 ring-[#ffb4ab]'
                : 'bg-[#182030] hover:bg-[#222a3b]'
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-[#ffb4ab] text-[18px]">broken_image</span>
              <span className="font-['JetBrains_Mono'] text-[13px] text-[#ffb4ab] font-bold truncate">
                "Escudo Roto"
              </span>
            </div>
            <span className="w-2 h-2 rounded-full bg-[#ffb4ab] shrink-0" />
          </button>
        </div>
      </div>

      {/* Bottom Action Controls */}
      <div className="pt-2 flex items-center gap-3">
        {/* Reset button */}
        <button
          onClick={handleReset}
          className="w-14 h-14 rounded-xl bg-[#182030] text-[#dbe2f9] hover:text-[#00f0ff] transition-all active:translate-y-1 flex flex-col items-center justify-center shadow-[0_4px_0_#060e1e] shrink-0 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">refresh</span>
          <span className="font-['JetBrains_Mono'] text-[9px] uppercase font-bold tracking-tight">
            Re-forjar
          </span>
        </button>

        {/* Main Forge Button */}
        <button
          onClick={handleExecuteForge}
          className={`flex-1 h-14 rounded-xl font-['Space_Grotesk'] text-[18px] font-bold flex items-center justify-center gap-2 transition-all active:translate-y-1 cursor-pointer ${
            forgeState === 'success'
              ? 'bg-[#ffd65b] text-[#3d2f00] shadow-[0_5px_0_#5f4a00]'
              : 'bg-[#00f0ff] hover:bg-[#7df4ff] text-[#00363a] shadow-[0_5px_0_#006970]'
          }`}
        >
          {forgeState === 'success' ? (
            <>
              <span className="material-symbols-outlined text-[22px]">verified</span>
              <span>¡ARMA CONSAGRADA!</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[22px]">hardware</span>
              <span>FORJAR SINTAXIS</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </>
          )}
        </button>
      </div>

      {/* If forge succeeds, offer jump to Kahoot Quiz Duel */}
      {forgeState === 'success' && (
        <div className="bg-[#182030] p-4 rounded-xl border border-[#00f0ff]/40 shadow-xl flex flex-col gap-2 animate-fadeIn">
          <div className="flex items-center gap-2 text-[#00f0ff]">
            <span className="material-symbols-outlined text-[20px]">military_tech</span>
            <span className="font-['Space_Grotesk'] font-bold text-[16px]">
              ¡Siguiente Desafío Desbloqueado!
            </span>
          </div>
          <p className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#b9cacb]">
            Has forjado la hoja. Ahora pon a prueba tu maestría de daño en el duelo de escudos rúnicos.
          </p>
          <button
            onClick={() => {
              sound.playRuneClick();
              onSwitchToQuiz();
            }}
            className="w-full py-3 rounded-lg bg-[#ffd65b] text-[#3d2f00] font-['Space_Grotesk'] font-bold text-[15px] flex items-center justify-center gap-2 shadow-[0_3px_0_#5f4a00] active:translate-y-0.5 cursor-pointer"
          >
            <span>Ir a Duelo de Escudos (Quiz C#)</span>
            <span className="material-symbols-outlined text-[18px]">bolt</span>
          </button>
        </div>
      )}
    </div>
  );
};
