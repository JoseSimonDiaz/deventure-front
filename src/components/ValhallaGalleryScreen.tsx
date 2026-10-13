import React, { useState } from 'react';
import { Trophy } from '../types/game';
import { sound } from '../utils/sound';

interface ValhallaGalleryScreenProps {
  trophies: Trophy[];
  onShowToast: (msg: string) => void;
}

const EXTENDED_TROPHIES: Trophy[] = [
  {
    id: 'trophy-1',
    name: 'Primer Hechizo C#',
    desc: 'Compila tu primer programa en Midgard sin errores sintácticos.',
    icon: 'swords',
    progress: 'COMPLETADO',
    completed: true,
    color: 'gold',
  },
  {
    id: 'trophy-2',
    name: 'Cazador del Fiordo',
    desc: 'Elimina 10 bugs de tipado estricto en duelos nórdicos.',
    icon: 'pest_control',
    progress: '8 / 10 BUGS',
    completed: false,
    color: 'cyan',
  },
  {
    id: 'trophy-3',
    name: 'Furia Berserker',
    desc: 'Mantén una racha ininterrumpida de forja por 7 días.',
    icon: 'whatshot',
    progress: '5 / 7 DÍAS',
    completed: false,
    color: 'orange',
  },
  {
    id: 'trophy-4',
    name: 'Forjador Veloz',
    desc: 'Resuelve un encantamiento rúnico en menos de 5 segundos.',
    icon: 'electric_bolt',
    progress: '< 5s RÉCORD',
    completed: true,
    color: 'cyan',
  },
  {
    id: 'trophy-5',
    name: 'Boss NullPointer',
    desc: 'Derrota a Jörmungandr protegiendo las referencias de memoria.',
    icon: 'lock',
    progress: 'BLOQUEADO',
    completed: false,
    color: 'outline',
  },
  {
    id: 'trophy-6',
    name: 'Herrero de Bucles',
    desc: 'Domina los ciclos while y for con contadores de runas.',
    icon: 'cached',
    progress: 'NIVEL 3 • 45%',
    completed: false,
    color: 'gold',
  },
  {
    id: 'trophy-7',
    name: 'Guardián SQL de Asgard',
    desc: 'Realiza consultas SELECT con WHERE y JOIN entre tablas divinas.',
    icon: 'database',
    progress: 'NIVEL 1 • 15%',
    completed: false,
    color: 'outline',
  },
  {
    id: 'trophy-8',
    name: 'Paladín Asíncrono',
    desc: 'Invoca tareas async / await sin bloquear el hilo de los dioses.',
    icon: 'hourglass_empty',
    progress: 'BLOQUEADO',
    completed: false,
    color: 'outline',
  },
];

const RUNIC_RELICS = [
  { symbol: 'ᛏ', name: 'Tiwaz', power: 'Justicia de Tipos', desc: 'Garantiza tipado estricto en variables y constantes.' },
  { symbol: 'ᛉ', name: 'Algiz', power: 'Escudo Condicional', desc: 'Protege ramas if / else contra desbordamiento.' },
  { symbol: 'ᚠ', name: 'Fehu', power: 'Riqueza de Memoria', desc: 'Optimiza la recolección de basura del Garbage Collector.' },
  { symbol: 'ᛊ', name: 'Sowilo', power: 'Rayo de Compilación', desc: 'Acelera la compilación Roslyn al instante.' },
  { symbol: 'ᚫ', name: 'Ansuz', power: 'Sabiduría de Odín', desc: 'Desbloquea sugerencias del cuervo Huginn.' },
  { symbol: 'ᚱ', name: 'Raidho', power: 'Viaje del Drakkar', desc: 'Permite navegar libremente entre islas del mapa.' },
];

export const ValhallaGalleryScreen: React.FC<ValhallaGalleryScreenProps> = ({
  trophies: _trophies,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'trophies' | 'tree' | 'runes'>('trophies');

  return (
    <div className="flex flex-col w-full pb-28 space-y-4 max-w-xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-6 rounded-full bg-[#ffd65b] shadow-[0_0_12px_rgba(255,214,91,0.65)]" />
          <div>
            <h1 className="font-['Space_Grotesk'] text-[24px] font-bold text-[#dbfcff] tracking-wide flex items-center gap-1.5">
              Galería de Valhalla
              <span className="material-symbols-outlined text-[#ffd65b] text-[22px] material-symbols-filled">
                shield
              </span>
            </h1>
            <p className="font-['JetBrains_Mono'] text-[11px] text-[#b9cacb] uppercase tracking-widest">
              Relicario • Saberes & Trofeos
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Filter */}
      <div className="flex items-center gap-1.5 p-1 bg-[#182030] rounded-xl border border-[#222a3b]">
        <button
          onClick={() => {
            sound.playRuneClick();
            setActiveTab('trophies');
          }}
          className={`flex-1 py-2 text-center font-['JetBrains_Mono'] text-[12px] font-bold rounded-lg transition-all cursor-pointer ${
            activeTab === 'trophies'
              ? 'bg-[#00f0ff] text-[#00363a] shadow-sm'
              : 'text-[#b9cacb] hover:text-[#dbe2f9]'
          }`}
        >
          Trofeos (8)
        </button>
        <button
          onClick={() => {
            sound.playRuneClick();
            setActiveTab('tree');
          }}
          className={`flex-1 py-2 text-center font-['JetBrains_Mono'] text-[12px] font-bold rounded-lg transition-all cursor-pointer ${
            activeTab === 'tree'
              ? 'bg-[#00f0ff] text-[#00363a] shadow-sm'
              : 'text-[#b9cacb] hover:text-[#dbe2f9]'
          }`}
        >
          Árbol Rúnico
        </button>
        <button
          onClick={() => {
            sound.playRuneClick();
            setActiveTab('runes');
          }}
          className={`flex-1 py-2 text-center font-['JetBrains_Mono'] text-[12px] font-bold rounded-lg transition-all cursor-pointer ${
            activeTab === 'runes'
              ? 'bg-[#00f0ff] text-[#00363a] shadow-sm'
              : 'text-[#b9cacb] hover:text-[#dbe2f9]'
          }`}
        >
          Runas (6)
        </button>
      </div>

      {/* Content: Trophies */}
      {activeTab === 'trophies' && (
        <div className="grid grid-cols-2 gap-3">
          {EXTENDED_TROPHIES.map((t) => (
            <div
              key={t.id}
              onClick={() => {
                sound.playRuneClick();
                onShowToast(`${t.name}: ${t.desc}`);
              }}
              className={`p-3.5 rounded-xl flex flex-col items-center text-center shadow-[0_4px_0_#060e1e] border border-[#222a3b] cursor-pointer active:scale-95 transition-transform ${
                t.completed
                  ? 'bg-[#182030]'
                  : t.color === 'outline'
                  ? 'bg-[#131b2c] opacity-65'
                  : 'bg-[#182030]'
              }`}
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-[#222a3b] flex items-center justify-center my-1.5 ${
                  t.color === 'gold'
                    ? 'text-[#ffd65b] shadow-[0_0_16px_rgba(255,214,91,0.25)]'
                    : t.color === 'cyan'
                    ? 'text-[#00f0ff] shadow-[0_0_16px_rgba(0,240,255,0.25)]'
                    : t.color === 'orange'
                    ? 'text-[#ac3500] shadow-[0_0_16px_rgba(255,107,53,0.25)]'
                    : 'text-[#849495]'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[30px] ${
                    t.completed ? 'material-symbols-filled' : ''
                  }`}
                >
                  {t.icon}
                </span>
              </div>
              <h4 className="font-['Space_Grotesk'] text-[14px] font-bold text-[#dbe2f9] mt-1 leading-tight line-clamp-1">
                {t.name}
              </h4>
              <p className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#b9cacb] mt-0.5 line-clamp-2">
                {t.desc}
              </p>
              <span
                className={`font-['JetBrains_Mono'] text-[10px] font-bold mt-2 uppercase ${
                  t.color === 'gold'
                    ? 'text-[#ffd65b]'
                    : t.color === 'cyan'
                    ? 'text-[#00dbe9]'
                    : t.color === 'orange'
                    ? 'text-[#ac3500]'
                    : 'text-[#849495]'
                }`}
              >
                {t.progress}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Content: Skill Tree */}
      {activeTab === 'tree' && (
        <div className="bg-[#182030] p-4 rounded-xl border border-[#222a3b] shadow-[0_6px_0_#060e1e] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-['Space_Grotesk'] text-[18px] font-bold text-[#dbfcff]">
              Árbol Yggdrasil del Código
            </h3>
            <span className="font-['JetBrains_Mono'] text-[11px] text-[#00f0ff]">
              Rama Principal C#
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-[#222a3b] border-l-2 border-[#00f0ff]">
              <div className="flex items-center justify-between">
                <span className="font-['Space_Grotesk'] text-[15px] font-bold text-[#00f0ff]">
                  1. Fundamentos & Tipado Estricto
                </span>
                <span className="font-['JetBrains_Mono'] text-[11px] text-[#ffd65b] font-bold">
                  ★ MAESTRO
                </span>
              </div>
              <p className="font-['Plus_Jakarta_Sans'] text-[12px] text-[#b9cacb] mt-1">
                Declaración de variables primitivas (int, string, bool, double, char) y ámbito local.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-[#222a3b] border-l-2 border-[#00f0ff]">
              <div className="flex items-center justify-between">
                <span className="font-['Space_Grotesk'] text-[15px] font-bold text-[#00f0ff]">
                  2. Bifurcaciones & Condicionales
                </span>
                <span className="font-['JetBrains_Mono'] text-[11px] text-[#00f0ff] font-bold">
                  EN CURSO (65%)
                </span>
              </div>
              <p className="font-['Plus_Jakarta_Sans'] text-[12px] text-[#b9cacb] mt-1">
                Estructuras if, else if, switch expression y operadores booleanos &&, ||, !.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-[#131b2c] border-l-2 border-[#849495] opacity-75">
              <div className="flex items-center justify-between">
                <span className="font-['Space_Grotesk'] text-[15px] font-semibold text-[#b9cacb]">
                  3. Forja de Bucles & Arreglos
                </span>
                <span className="font-['JetBrains_Mono'] text-[11px] text-[#849495]">
                  BLOQUEADO
                </span>
              </div>
              <p className="font-['Plus_Jakarta_Sans'] text-[12px] text-[#849495] mt-1">
                Ciclos while, do-while, for y recorrido con foreach sobre arreglos y listas genéricas.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-[#131b2c] border-l-2 border-[#849495] opacity-60">
              <div className="flex items-center justify-between">
                <span className="font-['Space_Grotesk'] text-[15px] font-semibold text-[#849495]">
                  4. Fortaleza SQL Asgardiana
                </span>
                <span className="font-['JetBrains_Mono'] text-[11px] text-[#849495]">
                  BLOQUEADO
                </span>
              </div>
              <p className="font-['Plus_Jakarta_Sans'] text-[12px] text-[#849495] mt-1">
                Sentencias SELECT, WHERE, GROUP BY, INNER JOIN y modelado relacional de Midgard.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Content: Runes */}
      {activeTab === 'runes' && (
        <div className="grid grid-cols-2 gap-3">
          {RUNIC_RELICS.map((r) => (
            <div
              key={r.name}
              onClick={() => {
                sound.playRuneClick();
                onShowToast(`Runa ${r.name} (${r.symbol}): ${r.power}`);
              }}
              className="p-3 rounded-xl bg-[#182030] border border-[#222a3b] shadow-[0_4px_0_#060e1e] flex flex-col items-center text-center cursor-pointer hover:border-[#00f0ff] transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-[#222a3b] flex items-center justify-center text-[26px] font-bold text-[#00f0ff] shadow-inner mb-2">
                {r.symbol}
              </div>
              <h4 className="font-['Space_Grotesk'] text-[15px] font-bold text-[#dbe2f9]">
                {r.name}
              </h4>
              <span className="font-['JetBrains_Mono'] text-[11px] text-[#ffd65b] font-semibold">
                {r.power}
              </span>
              <p className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#b9cacb] mt-1">
                {r.desc}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
