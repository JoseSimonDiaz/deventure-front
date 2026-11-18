import React from 'react';
import { PlayerProfile, Trophy, MasteryTrack, LeaderboardUser } from '../types/game';
import { sound } from '../utils/sound';

interface WarriorProfileScreenProps {
  player: PlayerProfile;
  trophies: Trophy[];
  masteryTracks: MasteryTrack[];
  leaderboard: LeaderboardUser[];
  onEditHero: () => void;
  onSummonClan: () => void;
  onViewSkillTree: () => void;
  onViewAllTrophies: () => void;
  onShowToast: (msg: string) => void;
}

export const WarriorProfileScreen: React.FC<WarriorProfileScreenProps> = ({
  player,
  trophies,
  masteryTracks,
  leaderboard,
  onEditHero,
  onSummonClan,
  onViewSkillTree,
  onViewAllTrophies,
  onShowToast,
}) => {
  return (
    <div className="flex flex-col w-full pb-28 gap-y-5 max-w-xl mx-auto">
      {/* Top Realm Banner & Utility Header */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-6 rounded-full bg-[#00f0ff] shadow-[0_0_12px_rgba(0,240,255,0.65)]" />
          <div>
            <h1 className="font-['Space_Grotesk'] text-[24px] font-bold text-[#dbfcff] tracking-wide flex items-center gap-1.5">
              Salón del Guerrero
              <span className="material-symbols-outlined text-[#ffd65b] text-[22px] material-symbols-filled">
                shield_person
              </span>
            </h1>
            <p className="font-['JetBrains_Mono'] text-[11px] text-[#b9cacb] uppercase tracking-widest">
              Midgard • Registro del Skald
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              sound.playRuneClick();
              onShowToast('ᚱ Runa del Skald copiada al portapapeles. ¡Compártela en Midgard!');
            }}
            className="w-10 h-10 rounded-xl bg-[#222a3b] flex items-center justify-center text-[#b9cacb] hover:text-[#00f0ff] shadow-[0_4px_0_#060e1e] active:translate-y-1 active:shadow-none transition-all cursor-pointer"
            title="Compartir Runa"
          >
            <span className="material-symbols-outlined text-[20px]">share</span>
          </button>

          <button
            onClick={() => {
              sound.playRuneClick();
              onShowToast('Ajustes rúnicos: Sonido activo, ligaduras C# y modo Valhalla sincronizados.');
            }}
            className="w-10 h-10 rounded-xl bg-[#222a3b] flex items-center justify-center text-[#b9cacb] hover:text-[#ffd65b] shadow-[0_4px_0_#060e1e] active:translate-y-1 active:shadow-none transition-all cursor-pointer"
            title="Ajustes Rúnicos"
          >
            <span className="material-symbols-outlined text-[20px]">settings_suggest</span>
          </button>
        </div>
      </div>

      {/* Hero Warrior Card (Anime Viking Berserker) */}
      <div className="relative overflow-hidden rounded-xl bg-[#182030] shadow-[0_8px_0_#060e1e] border border-[#222a3b]">
        {/* Atmospheric Rune Backdrop */}
        <div className="h-44 w-full relative bg-[#060e1e] overflow-hidden">
          <img
            className="w-full h-full object-cover opacity-60"
            src={player.coverUrl}
            alt="Anime Viking scenery sunset fjord"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#182030] via-[#182030]/60 to-transparent" />

          {/* Top Badges Overlay */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-[#060e1e]/80 backdrop-blur-md px-2.5 py-1 rounded-lg">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
            <span className="font-['JetBrains_Mono'] text-[11px] font-bold text-[#dbfcff]">
              EN COMBATE • C#
            </span>
          </div>

          <div className="absolute top-3 right-3 flex items-center gap-1 bg-[#222a3b]/90 backdrop-blur-md px-2 py-1 rounded-lg">
            <span className="material-symbols-outlined text-[#ffd65b] text-[16px] material-symbols-filled">
              military_tech
            </span>
            <span className="font-['JetBrains_Mono'] text-[13px] font-bold text-[#ffd65b]">
              {player.rank}
            </span>
          </div>
        </div>

        {/* Warrior Details Container */}
        <div className="px-4 pb-6 -mt-16 relative flex flex-col gap-4">
          {/* Avatar & Crest Cluster */}
          <div className="flex items-end justify-between">
            <div className="relative group">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-tr from-[#00f0ff] via-[#ffd65b] to-[#ac3500] blur-sm opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-24 h-24 rounded-xl bg-[#2d3546] overflow-hidden shadow-[0_6px_0_#060e1e]">
                <img
                  className="w-full h-full object-cover"
                  src={player.avatarUrl}
                  alt={player.name}
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-[#ffd65b] text-[#3d2f00] px-2 py-0.5 rounded-md font-['JetBrains_Mono'] text-[13px] font-bold shadow-[0_2px_0_#8f6e00] flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[14px]">swords</span>
                {player.level}
              </div>
            </div>

            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-1.5 bg-[#222a3b] px-2.5 py-1 rounded-lg shadow-inner">
                <span className="material-symbols-outlined text-[#ac3500] text-[18px]">
                  local_fire_department
                </span>
                <span className="font-['JetBrains_Mono'] text-[13px] font-bold text-[#dbe2f9]">
                  🔥 {player.streak} Días Nórdicos
                </span>
              </div>
              <span className="font-['JetBrains_Mono'] text-[11px] text-[#b9cacb] flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">sailing</span>
                Zarpó en {player.joinedDate}
              </span>
            </div>
          </div>

          {/* Identity & Clan Name */}
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <h2 className="font-['Space_Grotesk'] text-[24px] font-bold text-[#dbe2f9] tracking-tight">
                {player.name}
              </h2>
              <button
                onClick={() => {
                  sound.playRuneClick();
                  onEditHero();
                }}
                className="w-6 h-6 rounded bg-[#222a3b] flex items-center justify-center text-[#b9cacb] hover:text-[#00f0ff] transition-colors cursor-pointer"
                title="Editar Nombre"
              >
                <span className="material-symbols-outlined text-[14px]">edit</span>
              </button>
            </div>
            <p className="font-['JetBrains_Mono'] text-[13px] text-[#00dbe9] flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              {player.title} • {player.clan}
            </p>
          </div>

          {/* Interactive 3D Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => {
                sound.playRuneClick();
                onEditHero();
              }}
              className="relative group bg-[#00f0ff] text-[#00363a] font-['Space_Grotesk'] font-bold text-[17px] px-4 py-2.5 rounded-lg shadow-[0_4px_0_#006970] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">person_edit</span>
              <span>Editar Héroe</span>
            </button>

            <button
              onClick={() => {
                sound.playRuneClick();
                onSummonClan();
              }}
              className="relative group bg-[#222a3b] hover:bg-[#2d3546] text-[#ffd65b] font-['Space_Grotesk'] font-bold text-[17px] px-4 py-2.5 rounded-lg shadow-[0_4px_0_#060e1e] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">group_add</span>
              <span>Invocar Clan</span>
            </button>
          </div>
        </div>
      </div>

      {/* Gamer HUD Stats Bento Grid (Runas del Destino) */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="font-['Space_Grotesk'] text-[19px] font-semibold text-[#dbe2f9] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00f0ff] text-[20px]">equalizer</span>
            Runas del Destino
          </h3>
          <span className="font-['JetBrains_Mono'] text-[11px] text-[#b9cacb]">
            ACTUALIZADO TRAS FORJA
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Streak Flame Card */}
          <div className="bg-[#182030] p-4 rounded-xl shadow-[0_5px_0_#060e1e] flex flex-col justify-between relative overflow-hidden border border-[#222a3b]">
            <div className="absolute -right-3 -top-3 w-16 h-16 rounded-full bg-[#ac3500]/15 blur-lg pointer-events-none" />
            <div className="flex items-center justify-between mb-2">
              <span className="font-['JetBrains_Mono'] text-[11px] text-[#b9cacb] uppercase font-semibold">
                Racha Rúnica
              </span>
              <span className="material-symbols-outlined text-[#ac3500] text-[22px]">
                local_fire_department
              </span>
            </div>
            <div>
              <div className="font-['Space_Grotesk'] text-[26px] font-bold text-[#dbe2f9] flex items-baseline gap-1">
                {player.streak}{' '}
                <span className="font-['JetBrains_Mono'] text-[13px] text-[#ac3500]">Días</span>
              </div>
              <p className="font-['JetBrains_Mono'] text-[11px] text-[#b9cacb] mt-0.5">
                Récord de Forja: {player.streakRecord} Días
              </p>
            </div>
          </div>

          {/* Total XP Lightning Card */}
          <div className="bg-[#182030] p-4 rounded-xl shadow-[0_5px_0_#060e1e] flex flex-col justify-between relative overflow-hidden border border-[#222a3b]">
            <div className="absolute -right-3 -top-3 w-16 h-16 rounded-full bg-[#00f0ff]/15 blur-lg pointer-events-none" />
            <div className="flex items-center justify-between mb-2">
              <span className="font-['JetBrains_Mono'] text-[11px] text-[#b9cacb] uppercase font-semibold">
                Poder Total XP
              </span>
              <span className="material-symbols-outlined text-[#00f0ff] text-[22px]">bolt</span>
            </div>
            <div>
              <div className="font-['Space_Grotesk'] text-[26px] font-bold text-[#dbfcff] flex items-baseline gap-1">
                2,450{' '}
                <span className="font-['JetBrains_Mono'] text-[13px] text-[#00dbe9]">XP</span>
              </div>
              <p className="font-['JetBrains_Mono'] text-[11px] text-[#00f0ff] mt-0.5">
                +220 XP en la forja de hoy
              </p>
            </div>
          </div>

          {/* Clan League Division Card (Full width) */}
          <div className="col-span-2 bg-[#182030] p-4 rounded-xl shadow-[0_5px_0_#060e1e] flex items-center justify-between border border-[#222a3b]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#222a3b] flex items-center justify-center shadow-inner">
                <span className="material-symbols-outlined text-[#ffd65b] text-[28px] material-symbols-filled">
                  shield
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-['JetBrains_Mono'] text-[11px] text-[#b9cacb] uppercase font-semibold">
                  División de Clanes
                </span>
                <span className="font-['Space_Grotesk'] text-[18px] font-semibold text-[#dbe2f9]">
                  {player.league}
                </span>
                <span className="font-['JetBrains_Mono'] text-[11px] text-[#ffd65b] flex items-center gap-1 font-semibold">
                  <span className="material-symbols-outlined text-[14px]">trending_up</span>
                  Top #{player.leagueRank} (Zona de Ascenso a Oro)
                </span>
              </div>
            </div>
            <div className="text-right flex flex-col items-end">
              <span className="font-['JetBrains_Mono'] text-[11px] text-[#b9cacb]">CIERRA EN</span>
              <span className="font-['JetBrains_Mono'] text-[14px] text-[#00f0ff] font-bold">
                {player.leagueTimeLeft}
              </span>
            </div>
          </div>

          {/* Vitality Hearts */}
          <div className="bg-[#182030] p-4 rounded-xl shadow-[0_5px_0_#060e1e] flex flex-col justify-between border border-[#222a3b]">
            <div className="flex items-center justify-between mb-1">
              <span className="font-['JetBrains_Mono'] text-[11px] text-[#b9cacb] uppercase font-semibold">
                Vitalidad
              </span>
              <span className="material-symbols-outlined text-[#ffb4ab] text-[20px]">
                favorite
              </span>
            </div>
            <div className="flex items-center gap-1 my-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className="material-symbols-outlined text-[#ffb4ab] text-[18px] material-symbols-filled"
                >
                  favorite
                </span>
              ))}
            </div>
            <span className="font-['JetBrains_Mono'] text-[11px] text-[#b9cacb]">
              5/5 Runas llenas
            </span>
          </div>

          {/* Odin Gold Runes */}
          <div className="bg-[#182030] p-4 rounded-xl shadow-[0_5px_0_#060e1e] flex flex-col justify-between border border-[#222a3b]">
            <div className="flex items-center justify-between mb-1">
              <span className="font-['JetBrains_Mono'] text-[11px] text-[#b9cacb] uppercase font-semibold">
                Oro de Odín
              </span>
              <span className="material-symbols-outlined text-[#ffd65b] text-[20px]">
                monetization_on
              </span>
            </div>
            <div className="font-['Space_Grotesk'] text-[26px] font-bold text-[#ffd65b] flex items-baseline gap-1 my-0.5">
              {player.gems}{' '}
              <span className="font-['JetBrains_Mono'] text-[11px] text-[#b9cacb]">Gems</span>
            </div>
            <span className="font-['JetBrains_Mono'] text-[11px] text-[#f0c110]">
              Canjeable en Herrería
            </span>
          </div>
        </div>
      </div>

      {/* Sendero de Dominio de Saberes (Mastery Tracks) */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="font-['Space_Grotesk'] text-[19px] font-semibold text-[#dbe2f9] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffd65b] text-[20px]">
              auto_stories
            </span>
            Sendero de Saberes Rúnicos
          </h3>
          <button
            onClick={() => {
              sound.playRuneClick();
              onViewSkillTree();
            }}
            className="font-['JetBrains_Mono'] text-[11px] text-[#00f0ff] hover:underline cursor-pointer"
          >
            Ver Árbol
          </button>
        </div>

        <div className="flex flex-col gap-2 bg-[#182030] p-4 rounded-xl shadow-[0_6px_0_#060e1e] border border-[#222a3b]">
          {masteryTracks.map((track, idx) => (
            <React.Fragment key={track.id}>
              {idx > 0 && <div className="w-full h-px bg-[#222a3b] my-1" />}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-7 h-7 rounded-lg bg-[#222a3b] flex items-center justify-center font-['JetBrains_Mono'] text-[14px] font-bold shadow-inner ${
                        track.color === 'cyan'
                          ? 'text-[#00f0ff]'
                          : track.color === 'gold'
                          ? 'text-[#ffd65b]'
                          : 'text-[#7df4ff]'
                      }`}
                    >
                      {track.icon}
                    </span>
                    <span className="font-['Plus_Jakarta_Sans'] text-[15px] text-[#dbe2f9] font-semibold">
                      {track.title}
                    </span>
                  </div>
                  <span
                    className={`font-['JetBrains_Mono'] text-[11px] font-bold ${
                      track.color === 'cyan'
                        ? 'text-[#00f0ff]'
                        : track.color === 'gold'
                        ? 'text-[#ffd65b]'
                        : 'text-[#b9cacb]'
                    }`}
                  >
                    Nivel {track.level} • {track.percent}%
                  </span>
                </div>

                <div className="w-full h-3 bg-[#060e1e] rounded-full overflow-hidden p-0.5 shadow-inner">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      track.color === 'cyan'
                        ? 'bg-gradient-to-r from-[#00f0ff] to-[#7df4ff] shadow-[0_0_10px_rgba(0,240,255,0.7)]'
                        : track.color === 'gold'
                        ? 'bg-gradient-to-r from-[#e7b900] to-[#ffd65b] shadow-[0_0_10px_rgba(255,214,91,0.5)]'
                        : 'bg-[#2d3546]'
                    }`}
                    style={{ width: `${track.percent}%` }}
                  />
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Salón de Trofeos e Insignias Rúnicas */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-['Space_Grotesk'] text-[19px] font-semibold text-[#dbe2f9]">
              Salón de Trofeos
            </h3>
            <span className="bg-[#222a3b] px-2 py-0.5 rounded text-[#ffd65b] font-['JetBrains_Mono'] text-[11px] font-bold">
              4 / 18
            </span>
          </div>
          <button
            onClick={() => {
              sound.playRuneClick();
              onViewAllTrophies();
            }}
            className="font-['JetBrains_Mono'] text-[11px] text-[#00f0ff] hover:underline cursor-pointer"
          >
            Ver Todos
          </button>
        </div>

        {/* Horizontal Trophy Scroll */}
        <div className="flex gap-2.5 overflow-x-auto pb-2 -mx-4 px-4 no-scrollbar">
          {trophies.map((trophy) => (
            <div
              key={trophy.id}
              onClick={() => {
                sound.playRuneClick();
                onShowToast(`${trophy.name}: ${trophy.desc}`);
              }}
              className={`min-w-[140px] rounded-xl p-3 flex flex-col items-center text-center shadow-[0_5px_0_#060e1e] border border-[#222a3b] cursor-pointer active:scale-95 transition-transform ${
                trophy.completed
                  ? 'bg-[#182030]'
                  : trophy.color === 'outline'
                  ? 'bg-[#131b2c] opacity-60'
                  : 'bg-[#182030]'
              }`}
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-[#222a3b] flex items-center justify-center my-2 ${
                  trophy.color === 'gold'
                    ? 'shadow-[0_0_16px_rgba(255,214,91,0.3)] text-[#ffd65b]'
                    : trophy.color === 'cyan'
                    ? 'shadow-[0_0_16px_rgba(0,240,255,0.25)] text-[#00f0ff]'
                    : trophy.color === 'orange'
                    ? 'shadow-[0_0_16px_rgba(255,107,53,0.3)] text-[#ac3500]'
                    : 'text-[#849495]'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[32px] ${
                    trophy.completed ? 'material-symbols-filled' : ''
                  }`}
                >
                  {trophy.icon}
                </span>
              </div>
              <span className="font-['JetBrains_Mono'] text-[13px] font-bold text-[#dbe2f9] leading-tight mt-1 line-clamp-2">
                {trophy.name}
              </span>
              <span
                className={`font-['JetBrains_Mono'] text-[11px] font-semibold mt-1 uppercase ${
                  trophy.color === 'gold'
                    ? 'text-[#ffd65b]'
                    : trophy.color === 'cyan'
                    ? 'text-[#00dbe9]'
                    : trophy.color === 'orange'
                    ? 'text-[#ac3500]'
                    : 'text-[#849495]'
                }`}
              >
                {trophy.progress}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Hermandad del Drakkar (Clan / Friends Leaderboard) */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-['Space_Grotesk'] text-[19px] font-semibold text-[#dbe2f9] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00f0ff] text-[20px]">groups</span>
              Hermandad del Drakkar
            </h3>
            <p className="font-['JetBrains_Mono'] text-[11px] text-[#b9cacb]">
              Top Skalds esta semana
            </p>
          </div>
          <button
            onClick={() => {
              sound.playRuneClick();
              onSummonClan();
            }}
            className="bg-[#222a3b] hover:bg-[#2d3546] px-3 py-1.5 rounded-lg text-[#00f0ff] font-['JetBrains_Mono'] text-[13px] font-bold shadow-[0_3px_0_#060e1e] active:translate-y-0.5 transition-all flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">person_add</span>
            Invitar
          </button>
        </div>

        {/* Friend Rankings List */}
        <div className="flex flex-col gap-2">
          {leaderboard.map((user) => {
            if (user.isCurrentUser) {
              return (
                <div
                  key={user.name}
                  className="bg-[#222a3b] p-3 rounded-xl shadow-[0_4px_0_#006970] flex items-center justify-between relative overflow-hidden border border-[#00f0ff]/40"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00f0ff]" />
                  <div className="flex items-center gap-3 pl-2">
                    <span className="font-['Space_Grotesk'] text-[20px] font-bold text-[#00f0ff] w-6 text-center">
                      {user.rank}
                    </span>
                    <div className="relative w-11 h-11 rounded-lg bg-[#182030] overflow-hidden shadow-[0_0_8px_rgba(0,240,255,0.4)]">
                      <img
                        src={user.avatarUrl}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-['Plus_Jakarta_Sans'] text-[15px] text-[#00f0ff] font-bold flex items-center gap-1">
                        {user.name}
                        <span className="bg-[#00f0ff]/20 text-[#00f0ff] px-1.5 rounded text-[10px] tracking-wider uppercase font-['JetBrains_Mono']">
                          TÚ
                        </span>
                      </span>
                      <span className="font-['JetBrains_Mono'] text-[11px] text-[#00dbe9]">
                        {user.role}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-['JetBrains_Mono'] text-[14px] text-[#00f0ff] font-bold">
                      {user.xp.toLocaleString()} XP
                    </span>
                    <span className="block font-['JetBrains_Mono'] text-[11px] text-[#7df4ff]">
                      🔥 {user.streak} Días
                    </span>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={user.name}
                className="bg-[#182030] p-3 rounded-xl shadow-[0_4px_0_#060e1e] flex items-center justify-between border border-[#222a3b]"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`font-['Space_Grotesk'] text-[20px] font-bold w-6 text-center ${
                      user.rank === 1 ? 'text-[#ffd65b]' : 'text-[#b9cacb]'
                    }`}
                  >
                    {user.rank}
                  </span>
                  <div className="relative w-11 h-11 rounded-lg bg-[#222a3b] overflow-hidden shadow-inner">
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-['Plus_Jakarta_Sans'] text-[15px] text-[#dbe2f9] font-semibold flex items-center gap-1">
                      {user.name}
                      {user.rank === 1 && (
                        <span className="material-symbols-outlined text-[#ffd65b] text-[16px] material-symbols-filled">
                          crown
                        </span>
                      )}
                    </span>
                    <span className="font-['JetBrains_Mono'] text-[11px] text-[#b9cacb]">
                      {user.role}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`font-['JetBrains_Mono'] text-[14px] font-bold ${
                      user.rank === 1 ? 'text-[#ffd65b]' : 'text-[#dbe2f9]'
                    }`}
                  >
                    {user.xp.toLocaleString()} XP
                  </span>
                  <span className="block font-['JetBrains_Mono'] text-[11px] text-[#b9cacb]">
                    🔥 {user.streak} Días
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA: Invocar Aliados Banner */}
      <div className="rounded-xl bg-gradient-to-r from-[#222a3b] via-[#182030] to-[#222a3b] p-4 shadow-[0_6px_0_#060e1e] flex flex-col gap-3 items-center text-center relative overflow-hidden border border-[#222a3b]">
        <div className="w-12 h-12 rounded-full bg-[#ffd65b]/15 flex items-center justify-center text-[#ffd65b] shadow-inner">
          <span className="material-symbols-outlined text-[28px]">sports_kabaddi</span>
        </div>
        <div className="flex flex-col">
          <h4 className="font-['Space_Grotesk'] text-[18px] font-bold text-[#dbe2f9]">
            ¿Necesitas refuerzos para la saga?
          </h4>
          <p className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#b9cacb] mt-0.5">
            Invita a desarrolladores a forjar código juntos y desbloquea el Cofre de Odín (+500 XP).
          </p>
        </div>
        <button
          onClick={() => {
            sound.playForgeHit();
            onSummonClan();
          }}
          className="w-full bg-[#ffd65b] hover:bg-[#ffe08b] text-[#3d2f00] font-['Space_Grotesk'] font-bold text-[17px] py-3 rounded-lg shadow-[0_4px_0_#8f6e00] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">share_location</span>
          <span>Lanzar Cuerno de Batalla</span>
        </button>
      </div>
    </div>
  );
};
