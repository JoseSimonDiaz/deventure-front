import React, { useState } from 'react';
import { PlayerProfile } from '../types/game';
import { sound } from '../utils/sound';

interface EditHeroModalProps {
  player: PlayerProfile;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: Partial<PlayerProfile>) => void;
}

const AVATAR_OPTIONS = [
  {
    id: 'einar',
    label: 'Einar Codeblade',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGI8-1EOHTWODrgUPUr-LYLJIzTOGFJ_IUJikZwb19PA4y7w6spADERblvzLG3KZq8ULbSVSSp_sx_W83mBm0j25h40_TgY3fCO_2jksDn10IW7mzYEzQ7JVdxTc96T7NZEtcz5jvS-59rAgNSrqdzP8I1zoSW6f6QhoCTFKw8lusyWe5aM555__gDyJFL_rV61y8bYGr-vW8V6j8E4jxK_G5W8O02qBnKAf_sXV7ghJFED4EGDdjeIQ',
  },
  {
    id: 'einar-smile',
    label: 'Einar Sonriente',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbH0r9CvcCgcueWV0--DnCOMeT2X2PIrMN7-nFygesrgzDHLsFprEmUdoh56jVjvNlIuyZXgqm63IJEkw6pRh6ojAu2iP83yOxYgxXwUrTZjwxt5tfl3HNRWwUaCWHDgN-y5flVQXAC3LfHeOJo8KXMJSMMz_JiGFZZrD5MOmtLAu1xpSaydQgbx_DsIV4MkdDQdtyb6gsoeOvZX09HSFX7r6SNbqXnqlbUSuRzdJupAl2SxwczLUuTQ',
  },
  {
    id: 'astrid',
    label: 'Astrid Valkyrie',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmFy_qmOZw7K6m97vQKwAVmmS4aHiof8fbDkL8w3Ac-5imjcJTL3Lf-daXvS9VA9bSVZgUSA2xRKm2uWnRgbnyQsH7G-q3jTqPAvmn9Ze4rXi1fZ3la0YhkeoQqt1afJRdJ84BcntG0lPSEwajLuA9NSfW66MTmKWjw_o1nBJn4F4FuWlAQ178nVrji5e0rxM-JzUNjWp0x5uTThw0ctnQv2rccVgi1YfGbIcEr5JkW03sC1SPAGlLjQ',
  },
  {
    id: 'torstein',
    label: 'Torstein Herrero',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB00xAGT2zdvkSjFzxf8oFq9jdDPREC-5h2H42vyfbs8VhadyG59fqN9QzIbg9xv1pbyGiTJTpndNjE7tKPdN-BOez1TR_MYNLi6QdwNWfgw-hda-ETBgULUT4YVmMDxFpFa36J2RhtkDpXyzc0rtJC2RDAAYQGNa08i-b8NJbNOhovR0ZxqlUdzkV6uQMdhdpQAOPHjqh6nrp_Lh30aZs836BfICpNAEZxZQ9_2TGGmYSzTaUPJMD6aw',
  },
];

export const EditHeroModal: React.FC<EditHeroModalProps> = ({
  player,
  isOpen,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState(player.name);
  const [title, setTitle] = useState(player.title);
  const [clan, setClan] = useState(player.clan);
  const [selectedAvatar, setSelectedAvatar] = useState(player.avatarUrl);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playForgeHit();
    onSave({
      name: name.trim() || player.name,
      title: title.trim() || player.title,
      clan: clan.trim() || player.clan,
      avatarUrl: selectedAvatar,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#060e1e]/85 backdrop-blur-md flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl bg-[#182030] p-5 shadow-[0_8px_0_#060e1e] border border-[#222a3b] space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00f0ff] text-[24px]">
              person_edit
            </span>
            <h3 className="font-['Space_Grotesk'] text-[20px] font-bold text-[#dbfcff]">
              Forja de Identidad
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

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Avatar selector */}
          <div className="space-y-2">
            <label className="font-['JetBrains_Mono'] text-[11px] font-semibold text-[#b9cacb] uppercase">
              Retrato del Skald
            </label>
            <div className="grid grid-cols-4 gap-2">
              {AVATAR_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    sound.playRuneClick();
                    setSelectedAvatar(opt.url);
                  }}
                  className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all cursor-pointer ${
                    selectedAvatar === opt.url
                      ? 'border-[#00f0ff] ring-2 ring-[#00f0ff]/50 scale-105'
                      : 'border-[#222a3b] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={opt.url} alt={opt.label} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <div className="space-y-1">
            <label className="font-['JetBrains_Mono'] text-[11px] font-semibold text-[#b9cacb] uppercase">
              Nombre del Guerrero
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg bg-[#060e1e] border border-[#222a3b] text-[#dbfcff] font-['Space_Grotesk'] text-[16px] focus:outline-none focus:border-[#00f0ff] transition-colors"
              placeholder="Ej. Einar_Dev"
            />
          </div>

          {/* Title */}
          <div className="space-y-1">
            <label className="font-['JetBrains_Mono'] text-[11px] font-semibold text-[#b9cacb] uppercase">
              Título Rúnico
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg bg-[#060e1e] border border-[#222a3b] text-[#dbfcff] font-['JetBrains_Mono'] text-[13px] focus:outline-none focus:border-[#00f0ff] transition-colors"
              placeholder="Ej. Valkyrie Codeblade"
            />
          </div>

          {/* Clan */}
          <div className="space-y-1">
            <label className="font-['JetBrains_Mono'] text-[11px] font-semibold text-[#b9cacb] uppercase">
              Hermandad / Clan
            </label>
            <input
              type="text"
              value={clan}
              onChange={(e) => setClan(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg bg-[#060e1e] border border-[#222a3b] text-[#dbfcff] font-['JetBrains_Mono'] text-[13px] focus:outline-none focus:border-[#00f0ff] transition-colors"
              placeholder="Ej. Clan de los Cuervos de C#"
            />
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg bg-[#222a3b] text-[#b9cacb] font-['JetBrains_Mono'] text-[13px] font-bold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-lg bg-[#00f0ff] text-[#00363a] font-['Space_Grotesk'] font-bold text-[15px] shadow-[0_3px_0_#006970] active:translate-y-0.5 cursor-pointer"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
