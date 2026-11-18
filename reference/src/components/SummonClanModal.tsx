import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { PlayerProfile } from '../types/game';
import { sound } from '../utils/sound';

interface SummonClanModalProps {
  player: PlayerProfile;
  isOpen: boolean;
  onClose: () => void;
  onClaimOdinChest: () => void;
  claimedOdinChest: boolean;
  onShowToast: (msg: string) => void;
}

export const SummonClanModal: React.FC<SummonClanModalProps> = ({
  player,
  isOpen,
  onClose,
  onClaimOdinChest,
  claimedOdinChest,
  onShowToast,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const clanLink = `https://valhalla.code/clan/${player.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

  const handleCopy = () => {
    sound.playRuneClick();
    navigator.clipboard?.writeText(clanLink);
    setCopied(true);
    onShowToast('⚔️ Cuerno sonando: Enlace rúnico copiado al portapapeles. ¡Convoca a tu hermandad!');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleClaim = () => {
    sound.playCritSpell();
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#ffd65b', '#00f0ff', '#ffffff'],
    });
    onClaimOdinChest();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#060e1e]/85 backdrop-blur-md flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl bg-[#182030] p-5 shadow-[0_8px_0_#060e1e] border border-[#222a3b] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffd65b] text-[24px]">
              sports_kabaddi
            </span>
            <h3 className="font-['Space_Grotesk'] text-[20px] font-bold text-[#dbfcff]">
              Lanzar Cuerno de Batalla
            </h3>
          </div>
          <button
            onClick={() => {
              sound.playRuneClick();
              onClose();
            }}
            className="w-8 h-8 rounded-lg bg-[#222a3b] flex items-center justify-center text-[#b9cacb] hover:text-[#dbe2f9]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Scroll Box */}
        <div className="bg-[#131b2c] p-4 rounded-xl border border-[#ffd65b]/30 space-y-2 text-center">
          <span className="text-3xl">📯</span>
          <h4 className="font-['Space_Grotesk'] text-[17px] font-bold text-[#ffd65b]">
            Convocatoria de la Hermandad
          </h4>
          <p className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#b9cacb] leading-snug">
            Comparte este pergamino mágico con otros programadores en Discord o WhatsApp. Cuando
            respondan al cuerno, ambos obtendréis runas sagradas de protección.
          </p>

          <div className="bg-[#060e1e] p-2.5 rounded-lg flex items-center justify-between gap-2 border border-[#222a3b]">
            <span className="font-['JetBrains_Mono'] text-[12px] text-[#00f0ff] truncate">
              {clanLink}
            </span>
            <button
              onClick={handleCopy}
              className="px-3 py-1 bg-[#222a3b] hover:bg-[#2d3546] text-[#ffd65b] font-['JetBrains_Mono'] text-[11px] font-bold rounded flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">
                {copied ? 'check' : 'content_copy'}
              </span>
              <span>{copied ? 'Copiado' : 'Copiar'}</span>
            </button>
          </div>
        </div>

        {/* Odin's Chest Claim */}
        <div className="bg-[#222a3b] p-3.5 rounded-xl flex items-center justify-between gap-3 border border-[#2d3546]">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🎁</span>
            <div className="flex flex-col text-left">
              <span className="font-['Space_Grotesk'] text-[15px] font-bold text-[#dbe2f9]">
                Cofre de Odín (+500 XP)
              </span>
              <span className="font-['JetBrains_Mono'] text-[11px] text-[#ffd65b]">
                {claimedOdinChest ? 'Reclamado para tu clan' : 'Disponible al lanzar cuerno'}
              </span>
            </div>
          </div>

          <button
            onClick={handleClaim}
            disabled={claimedOdinChest}
            className={`px-3 py-1.5 rounded-lg font-['Space_Grotesk'] text-[13px] font-bold transition-all shadow-[0_2px_0_#5f4a00] ${
              claimedOdinChest
                ? 'bg-[#182030] text-[#b9cacb] opacity-60 cursor-not-allowed shadow-none'
                : 'bg-[#ffd65b] text-[#3d2f00] hover:bg-[#ffe08b] active:translate-y-0.5 cursor-pointer'
            }`}
          >
            {claimedOdinChest ? 'Reclamado' : 'Reclamar'}
          </button>
        </div>

        {/* Social Share Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => {
              sound.playRuneClick();
              onShowToast('Pergamino preparado para canal de Discord.');
            }}
            className="py-2.5 rounded-lg bg-[#222a3b] hover:bg-[#2d3546] text-[#dbfcff] font-['JetBrains_Mono'] text-[12px] font-bold flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Discord Cuervo</span>
          </button>

          <button
            onClick={() => {
              sound.playRuneClick();
              onShowToast('Pergamino de invitación forjado para WhatsApp.');
            }}
            className="py-2.5 rounded-lg bg-[#222a3b] hover:bg-[#2d3546] text-[#00f0ff] font-['JetBrains_Mono'] text-[12px] font-bold flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>WhatsApp Skald</span>
          </button>
        </div>
      </div>
    </div>
  );
};
