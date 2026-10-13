import React, { useState } from 'react';
import { IslandNode } from '../types/game';
import { sound } from '../utils/sound';

interface SagaMapScreenProps {
  nodes: IslandNode[];
  onSelectNode: (node: IslandNode) => void;
  onLaunchActiveQuest: () => void;
  onShowToast: (msg: string) => void;
}

export const SagaMapScreen: React.FC<SagaMapScreenProps> = ({
  nodes: _nodes,
  onSelectNode,
  onLaunchActiveQuest,
  onShowToast,
}) => {
  const [showEddaModal, setShowEddaModal] = useState(false);
  const [selectedNodeInfo, setSelectedNodeInfo] = useState<{
    title: string;
    desc: string;
    stars: number;
    node?: IslandNode;
  } | null>(null);

  const bannerImg =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA1MPYsmy1gPxvZ4WCFRuPPOvSolq4g4Nwmr4nuhpnosSd-IljrAz1tafy1cQGXgtPuzDJGe_hKOdCFYccFoLrj7nvP9PdzyzKm8egeMPxs1Nfj4PdV-W4rPELjzR4aPreTupCSp_E3ooUw8R9eWmlOlrldZSwX-SPZ6sYwZ8h5n6IAZ-_rE7QBOTTXExlsnlETbYEr7afLf3-Tdju21F16zlFA4btT13QGrFcIZS24sqlW6Kw-cWaYLQ';

  return (
    <div className="flex flex-col w-full pb-32 space-y-4 max-w-xl mx-auto">
      {/* Realm Banner */}
      <div className="relative w-full rounded-xl bg-[#222a3b] overflow-hidden shadow-[0_6px_0_#060e1e]">
        <div
          className="bg-cover bg-center w-full h-36 relative"
          style={{ backgroundImage: `url('${bannerImg}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#182030] via-[#182030]/60 to-transparent" />

          {/* Lore button top right */}
          <div className="absolute top-2.5 right-2.5">
            <button
              onClick={() => {
                sound.playRuneClick();
                setShowEddaModal(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#060e1e]/90 backdrop-blur-md shadow-[0_3px_0_#060e1e] active:translate-y-0.5 transition-transform cursor-pointer hover:bg-[#0b1323]"
            >
              <span className="material-symbols-outlined text-[#ffd65b] text-[16px]">
                menu_book
              </span>
              <span className="font-['JetBrains_Mono'] text-[11px] font-semibold text-[#ffd65b] tracking-wider">
                EDDA DE SINTAXIS
              </span>
            </button>
          </div>

          {/* Realm Header Info */}
          <div className="absolute bottom-2.5 left-3.5 right-3.5 flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="font-['JetBrains_Mono'] text-[11px] font-bold text-[#7df4ff] uppercase tracking-wider">
                Archipiélago del Skald
              </span>
              <span className="font-['JetBrains_Mono'] text-[11px] font-bold text-[#ffd65b] bg-[#060e1e]/80 px-2 py-0.5 rounded-full">
                4 / 7 Runas
              </span>
            </div>
            <span className="font-['Space_Grotesk'] font-semibold text-[20px] text-[#dbe2f9] leading-tight">
              Acto I: Bosque de la Lógica & C#
            </span>
          </div>
        </div>
      </div>

      {/* Archipelago Map Canvas with Stepping Island Nodes */}
      <div className="relative w-full rounded-xl bg-[#131b2c] px-4 py-6 overflow-hidden shadow-[0_8px_0_#060e1e]">
        {/* Ambient Grid Dots */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#00f0ff 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        {/* Curved Path SVG */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none stroke-current"
          style={{ overflow: 'visible' }}
        >
          <path
            d="M 64 68 C 110 95, 230 110, 260 160 C 280 200, 180 250, 95 300 C 50 330, 80 410, 160 450 C 220 480, 270 530, 240 600 C 210 650, 110 690, 85 750 C 70 790, 120 870, 200 900 C 240 915, 260 970, 250 1020"
            fill="none"
            stroke="#222a3b"
            strokeDasharray="10 12"
            strokeLinecap="round"
            strokeWidth="8"
          />
          <path
            className="animate-pulse"
            d="M 64 68 C 110 95, 230 110, 260 160 C 280 200, 180 250, 95 300 C 50 330, 80 410, 160 450"
            fill="none"
            stroke="#00f0ff"
            strokeDasharray="8 8"
            strokeLinecap="round"
            strokeWidth="4"
          />
        </svg>

        {/* Nodes Cluster */}
        <div className="relative flex flex-col space-y-8 z-10">
          {/* Node 1: Completed */}
          <div className="flex items-center gap-3 justify-start pl-2">
            <div
              className="relative group cursor-pointer"
              onClick={() => {
                sound.playRuneClick();
                setSelectedNodeInfo({
                  title: 'Isla 01: ¡Hola Midgard!',
                  desc: 'Completado con maestría. Dominio absoluto de Console.WriteLine y sintaxis básica.',
                  stars: 3,
                });
              }}
            >
              <div className="w-16 h-16 rounded-xl bg-[#2d3546] flex items-center justify-center shadow-[0_5px_0_#060e1e] active:translate-y-1 transition-transform hover:scale-105">
                <span className="material-symbols-outlined text-[#00f0ff] text-[30px] material-symbols-filled">
                  check_circle
                </span>
              </div>
              <div className="absolute -bottom-2 -right-1 bg-[#060e1e] px-1.5 py-0.5 rounded-full flex items-center shadow-md">
                <span className="material-symbols-outlined text-[#ffd65b] text-[12px] material-symbols-filled">star</span>
                <span className="material-symbols-outlined text-[#ffd65b] text-[12px] material-symbols-filled">star</span>
                <span className="material-symbols-outlined text-[#ffd65b] text-[12px] material-symbols-filled">star</span>
              </div>
            </div>
            <div className="flex flex-col bg-[#182030]/80 backdrop-blur-sm p-2 rounded-lg max-w-[210px]">
              <span className="font-['JetBrains_Mono'] text-[11px] font-bold text-[#7df4ff]">ISLA 01</span>
              <span className="font-['Space_Grotesk'] text-[16px] font-semibold leading-tight text-[#dbe2f9]">¡Hola Midgard!</span>
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#b9cacb]">Console.WriteLine()</span>
            </div>
          </div>

          {/* Node 2: Completed */}
          <div className="flex items-center gap-3 justify-end pr-2">
            <div className="flex flex-col items-end text-right bg-[#182030]/80 backdrop-blur-sm p-2 rounded-lg max-w-[210px]">
              <span className="font-['JetBrains_Mono'] text-[11px] font-bold text-[#7df4ff]">ISLA 02</span>
              <span className="font-['Space_Grotesk'] text-[16px] font-semibold leading-tight text-[#dbe2f9]">Forja de Variables</span>
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#b9cacb]">int, string, bool</span>
            </div>
            <div
              className="relative group cursor-pointer"
              onClick={() => {
                sound.playRuneClick();
                setSelectedNodeInfo({
                  title: 'Isla 02: Forja de Variables',
                  desc: 'Tipos primitivos moldeados en el yunque sagrado de Brokkr.',
                  stars: 3,
                });
              }}
            >
              <div className="w-16 h-16 rounded-xl bg-[#2d3546] flex items-center justify-center shadow-[0_5px_0_#060e1e] active:translate-y-1 transition-transform hover:scale-105">
                <span className="material-symbols-outlined text-[#00f0ff] text-[30px] material-symbols-filled">
                  terminal
                </span>
              </div>
              <div className="absolute -bottom-2 -left-1 bg-[#060e1e] px-1.5 py-0.5 rounded-full flex items-center shadow-md">
                <span className="material-symbols-outlined text-[#ffd65b] text-[12px] material-symbols-filled">star</span>
                <span className="material-symbols-outlined text-[#ffd65b] text-[12px] material-symbols-filled">star</span>
                <span className="material-symbols-outlined text-[#ffd65b] text-[12px] material-symbols-filled">star</span>
              </div>
            </div>
          </div>

          {/* Node 3: 2 Stars (Can replay quiz duel) */}
          <div className="flex items-center gap-3 justify-start pl-6">
            <div
              className="relative group cursor-pointer"
              onClick={() => {
                sound.playRuneClick();
                onSelectNode({
                  id: 'isla-3',
                  number: 'ISLA 03',
                  title: 'Aritmética de Odín',
                  subtitle: '+ - * / % Rangos',
                  stars: 2,
                  maxStars: 3,
                  status: 'completed',
                  icon: 'calculate',
                  xpReward: 50,
                  type: 'quiz',
                });
              }}
            >
              <div className="w-16 h-16 rounded-xl bg-[#2d3546] flex items-center justify-center shadow-[0_5px_0_#060e1e] active:translate-y-1 transition-transform hover:scale-105">
                <span className="material-symbols-outlined text-[#ffd65b] text-[30px]">
                  calculate
                </span>
              </div>
              <div className="absolute -bottom-2 -right-1 bg-[#060e1e] px-1.5 py-0.5 rounded-full flex items-center shadow-md">
                <span className="material-symbols-outlined text-[#ffd65b] text-[12px] material-symbols-filled">star</span>
                <span className="material-symbols-outlined text-[#ffd65b] text-[12px] material-symbols-filled">star</span>
                <span className="material-symbols-outlined text-[#2d3546] text-[12px]">star</span>
              </div>
            </div>
            <div className="flex flex-col bg-[#182030]/80 backdrop-blur-sm p-2 rounded-lg max-w-[210px]">
              <span className="font-['JetBrains_Mono'] text-[11px] font-bold text-[#ffd65b]">ISLA 03</span>
              <span className="font-['Space_Grotesk'] text-[16px] font-semibold leading-tight text-[#dbe2f9]">Aritmética de Odín</span>
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#b9cacb]">+ - * / % Rangos</span>
            </div>
          </div>

          {/* Node 4: Active Battle Node */}
          <div className="relative flex flex-col items-center my-4 py-2">
            <div className="absolute -top-6 animate-bounce bg-[#ffd65b] px-3 py-1 rounded-full shadow-[0_3px_0_#5f4a00] z-20 flex items-center gap-1">
              <span className="material-symbols-outlined text-[#3d2f00] text-[14px]">bolt</span>
              <span className="font-['JetBrains_Mono'] text-[11px] text-[#3d2f00] font-bold tracking-wider">
                ¡BATALLA LISTA!
              </span>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="absolute -inset-3 rounded-2xl bg-[#00f0ff]/20 blur-md animate-pulse" />
              <button
                onClick={() => {
                  sound.playRuneClick();
                  onLaunchActiveQuest();
                }}
                className="relative w-20 h-20 rounded-2xl bg-[#222a3b] flex flex-col items-center justify-center shadow-[0_6px_0_#060e1e] cursor-pointer active:translate-y-1 transition-transform hover:scale-105 ring-2 ring-[#00f0ff]/60"
              >
                <span className="material-symbols-outlined text-[#00f0ff] text-[38px] drop-shadow-[0_0_8px_rgba(0,240,255,0.7)]">
                  alt_route
                </span>
                <span className="font-['JetBrains_Mono'] text-[10px] text-[#7df4ff] mt-0.5 font-bold">
                  ACTIVO
                </span>
              </button>

              {/* Drakkar Boat Marker */}
              <div className="absolute -left-14 top-3 flex flex-col items-center animate-pulse">
                <span className="material-symbols-outlined text-[#ffd65b] text-[26px]">
                  sailing
                </span>
                <span className="font-['JetBrains_Mono'] text-[9px] text-[#ffd65b] bg-[#060e1e]/80 px-1 rounded">
                  Drakkar
                </span>
              </div>
            </div>

            <div className="mt-3 text-center bg-[#222a3b]/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-[0_4px_0_#060e1e]">
              <span className="font-['JetBrains_Mono'] text-[11px] font-bold text-[#00f0ff] uppercase">
                Nodo de Batalla 04
              </span>
              <h3 className="font-['Space_Grotesk'] text-[18px] font-semibold text-[#dbe2f9]">
                Fiordo de los Condicionales
              </h3>
              <p className="font-['JetBrains_Mono'] text-[12px] text-[#b9cacb]">
                Sentencias if / else if / switch
              </p>
            </div>
          </div>

          {/* Rune Chest Box */}
          <div className="flex items-center justify-center">
            <button
              onClick={() => {
                sound.playRuneClick();
                onShowToast('Cofre sellado: Se abrirá tras superar el Fiordo de los Condicionales (+500 XP & Runa de Furia)');
              }}
              className="relative flex items-center gap-3 bg-[#222a3b] px-4 py-2.5 rounded-xl shadow-[0_4px_0_#060e1e] hover:bg-[#2d3546] active:translate-y-0.5 transition-all cursor-pointer text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-[#2d3546] flex items-center justify-center">
                <span className="material-symbols-outlined text-[#ffe08b] text-[22px]">
                  lock
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-['JetBrains_Mono'] text-[11px] font-bold text-[#ffd65b]">
                  COFRE DE RUNAS
                </span>
                <span className="font-['Plus_Jakarta_Sans'] text-[12px] text-[#b9cacb]">
                  Desbloquea en 1 victoria
                </span>
              </div>
              <span className="material-symbols-outlined text-[#ffd65b] text-[18px]">
                inventory_2
              </span>
            </button>
          </div>

          {/* Node 5: Locked */}
          <div className="flex items-center gap-3 justify-end pr-8 opacity-75">
            <div className="flex flex-col items-end text-right bg-[#182030]/60 p-2 rounded-lg max-w-[200px]">
              <span className="font-['JetBrains_Mono'] text-[11px] font-semibold text-[#849495]">ISLA 05 • BLOQUEADA</span>
              <span className="font-['Space_Grotesk'] text-[16px] text-[#b9cacb]">Bucles WHILE & FOR</span>
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#849495]">Ciclos infinitos</span>
            </div>
            <button
              onClick={() => {
                sound.playRuneClick();
                onShowToast('Isla bloqueada. Conquista antes el Fiordo de los Condicionales.');
              }}
              className="w-14 h-14 rounded-xl bg-[#182030] flex items-center justify-center shadow-[0_4px_0_#060e1e] hover:bg-[#222a3b] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[#849495] text-[26px]">
                lock_clock
              </span>
            </button>
          </div>

          {/* Node 6: Locked */}
          <div className="flex items-center gap-3 justify-start pl-6 opacity-65">
            <button
              onClick={() => {
                sound.playRuneClick();
                onShowToast('Fortaleza Asgardiana sellada por runas maestras de C#.');
              }}
              className="w-14 h-14 rounded-xl bg-[#182030] flex items-center justify-center shadow-[0_4px_0_#060e1e] hover:bg-[#222a3b] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[#849495] text-[26px]">
                database
              </span>
            </button>
            <div className="flex flex-col bg-[#182030]/60 p-2 rounded-lg max-w-[200px]">
              <span className="font-['JetBrains_Mono'] text-[11px] font-semibold text-[#849495]">ISLA 06 • BLOQUEADA</span>
              <span className="font-['Space_Grotesk'] text-[16px] text-[#b9cacb]">Fortaleza SQL: SELECT</span>
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#849495]">Filtrado WHERE & JOIN</span>
            </div>
          </div>

          {/* Boss Raid Card */}
          <div className="relative w-full rounded-xl bg-[#222a3b] p-4 shadow-[0_6px_0_#060e1e] overflow-hidden opacity-90 border border-[#93000a]/40">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ffb4ab] text-[24px]">
                  local_fire_department
                </span>
                <span className="font-['JetBrains_Mono'] text-[11px] text-[#ffb4ab] uppercase font-bold tracking-widest">
                  BOSS RAID DE ZONA
                </span>
              </div>
              <span className="font-['JetBrains_Mono'] text-[11px] text-[#b9cacb] bg-[#060e1e] px-2 py-0.5 rounded">
                NIVEL 15
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-xl bg-[#93000a] flex items-center justify-center shadow-[0_4px_0_#060e1e] shrink-0">
                <span className="material-symbols-outlined text-[#ffdad6] text-[34px]">
                  coronavirus
                </span>
              </div>
              <div className="flex flex-col">
                <h4 className="font-['Space_Grotesk'] text-[17px] font-semibold text-[#dbe2f9]">
                  La Sierpe del NullPointer
                </h4>
                <span className="font-['JetBrains_Mono'] text-[11px] text-[#ffb4ab]">
                  Jörmungandr de la Memoria
                </span>
                <p className="font-['Plus_Jakarta_Sans'] text-[12px] text-[#b9cacb] mt-1">
                  Requiere superar los 6 nodos de runas del archipiélago.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Star and Reward Bento strip */}
      <div className="w-full grid grid-cols-2 gap-2">
        <div className="bg-[#222a3b] rounded-xl p-3 shadow-[0_4px_0_#060e1e] flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-[#060e1e] flex items-center justify-center">
            <span className="material-symbols-outlined text-[#ffd65b] text-[20px]">
              stars
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#b9cacb] uppercase font-semibold">
              ESTRELLAS
            </span>
            <span className="font-['JetBrains_Mono'] text-[14px] font-bold text-[#ffd65b]">
              8 / 18
            </span>
          </div>
        </div>

        <div className="bg-[#222a3b] rounded-xl p-3 shadow-[0_4px_0_#060e1e] flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-[#060e1e] flex items-center justify-center">
            <span className="material-symbols-outlined text-[#00f0ff] text-[20px]">
              auto_fix_high
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#b9cacb] uppercase font-semibold">
              RECOMPENSA
            </span>
            <span className="font-['JetBrains_Mono'] text-[14px] font-bold text-[#7df4ff]">
              Tomo C# +30XP
            </span>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Launch Button */}
      <div className="fixed bottom-24 inset-x-0 px-4 flex justify-center z-40 pointer-events-none">
        <button
          onClick={() => {
            sound.playForgeHit();
            onLaunchActiveQuest();
          }}
          className="pointer-events-auto w-full max-w-md py-3.5 px-4 rounded-xl bg-[#00f0ff] hover:bg-[#7df4ff] text-[#00363a] font-['Space_Grotesk'] font-bold text-[17px] flex items-center justify-center gap-2 shadow-[0_5px_0_#006970] active:translate-y-1 transition-transform cursor-pointer"
        >
          <span className="material-symbols-outlined text-[22px]">explore</span>
          <span>Continuar Travesía: Condicionales (+30 XP)</span>
        </button>
      </div>

      {/* Edda de Sintaxis Modal */}
      {showEddaModal && (
        <div className="fixed inset-0 z-50 bg-[#060e1e]/80 backdrop-blur-md flex items-center justify-center px-4">
          <div className="w-full max-w-sm rounded-xl bg-[#222a3b] p-6 shadow-[0_8px_0_#060e1e] flex flex-col space-y-4 border border-[#2d3546]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ffd65b] text-[24px]">
                  auto_stories
                </span>
                <span className="font-['Space_Grotesk'] text-[20px] font-semibold text-[#dbe2f9]">
                  Edda de Sintaxis
                </span>
              </div>
              <button
                onClick={() => {
                  sound.playRuneClick();
                  setShowEddaModal(false);
                }}
                className="w-8 h-8 rounded-lg bg-[#182030] flex items-center justify-center text-[#b9cacb] hover:text-[#dbe2f9] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="bg-[#060e1e] p-3 rounded-lg font-['JetBrains_Mono'] text-[13px] text-[#00f0ff] leading-relaxed overflow-x-auto">
              <code>
                // Ley nórdica de la bifurcación<br />
                if (valorVikingo &gt;= 100) &#123;<br />
                &nbsp;&nbsp;EntrarEnValhalla();<br />
                &#125; else &#123;<br />
                &nbsp;&nbsp;ForjarEspada();<br />
                &#125;
              </code>
            </div>

            <p className="font-['Plus_Jakarta_Sans'] text-[14px] text-[#b9cacb] leading-relaxed">
              Los dioses no aceptan ambigüedades. Cada instrucción condicional evalúa el honor
              booleano de tu código para abrir el paso entre las islas del destino.
            </p>

            <button
              onClick={() => {
                sound.playForgeHit();
                setShowEddaModal(false);
              }}
              className="w-full py-2.5 rounded-lg bg-[#ffd65b] text-[#3d2f00] font-['JetBrains_Mono'] text-[13px] font-bold shadow-[0_3px_0_#5f4a00] active:translate-y-0.5 cursor-pointer"
            >
              ENTENDIDO, MI JARL
            </button>
          </div>
        </div>
      )}

      {/* Node Info Inspection Modal */}
      {selectedNodeInfo && (
        <div className="fixed inset-0 z-50 bg-[#060e1e]/80 backdrop-blur-md flex items-center justify-center px-4">
          <div className="w-full max-w-sm rounded-xl bg-[#222a3b] p-6 shadow-[0_8px_0_#060e1e] flex flex-col space-y-4 border border-[#2d3546]">
            <div className="flex items-center justify-between">
              <span className="font-['Space_Grotesk'] text-[18px] font-semibold text-[#dbe2f9]">
                {selectedNodeInfo.title}
              </span>
              <button
                onClick={() => {
                  sound.playRuneClick();
                  setSelectedNodeInfo(null);
                }}
                className="w-8 h-8 rounded-lg bg-[#182030] flex items-center justify-center text-[#b9cacb] hover:text-[#dbe2f9]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <p className="font-['Plus_Jakarta_Sans'] text-[14px] text-[#b9cacb]">
              {selectedNodeInfo.desc}
            </p>
            <div className="flex items-center justify-center gap-1 py-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <span
                  key={i}
                  className={`material-symbols-outlined text-[24px] ${
                    i < selectedNodeInfo.stars
                      ? 'text-[#ffd65b] material-symbols-filled'
                      : 'text-[#2d3546]'
                  }`}
                >
                  star
                </span>
              ))}
            </div>
            <button
              onClick={() => {
                sound.playRuneClick();
                setSelectedNodeInfo(null);
                onShowToast(`Repasando runas de ${selectedNodeInfo.title}`);
              }}
              className="w-full py-2.5 rounded-lg bg-[#00f0ff] text-[#00363a] font-['Space_Grotesk'] font-bold text-[15px] shadow-[0_3px_0_#006970] active:translate-y-0.5 cursor-pointer"
            >
              Repasar Lección
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
