/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { PlayerProfile, IslandNode, Trophy, MasteryTrack, LeaderboardUser } from './types/game';
import {
  INITIAL_PLAYER,
  ISLAND_NODES,
  TROPHIES,
  MASTERY_TRACKS,
  LEADERBOARD,
} from './data/mockGameData';
import { HeaderNav } from './components/HeaderNav';
import { BottomNavBar } from './components/BottomNavBar';
import { SagaMapScreen } from './components/SagaMapScreen';
import { ForgeDuelScreen } from './components/ForgeDuelScreen';
import { ShieldQuizDuelScreen } from './components/ShieldQuizDuelScreen';
import { WarriorProfileScreen } from './components/WarriorProfileScreen';
import { PrologueScreen } from './components/PrologueScreen';
import { ValhallaGalleryScreen } from './components/ValhallaGalleryScreen';
import { EditHeroModal } from './components/EditHeroModal';
import { SummonClanModal } from './components/SummonClanModal';
import { Toast } from './components/Toast';
import { sound } from './utils/sound';

export default function App() {
  const [player, setPlayer] = useState<PlayerProfile>(() => {
    try {
      const saved = localStorage.getItem('viking_code_player');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_PLAYER;
  });

  const [nodes, setNodes] = useState<IslandNode[]>(() => {
    try {
      const saved = localStorage.getItem('viking_code_nodes');
      if (saved) return JSON.parse(saved);
    } catch {}
    return ISLAND_NODES;
  });

  const [currentTab, setCurrentTab] = useState<'mapa' | 'misiones' | 'galeria' | 'perfil'>('mapa');
  const [missionSubView, setMissionSubView] = useState<'forge' | 'quiz'>('forge');
  const [showPrologue, setShowPrologue] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSummonModal, setShowSummonModal] = useState(false);
  const [claimedOdinChest, setClaimedOdinChest] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('viking_code_player', JSON.stringify(player));
    } catch {}
  }, [player]);

  useEffect(() => {
    try {
      localStorage.setItem('viking_code_nodes', JSON.stringify(nodes));
    } catch {}
  }, [nodes]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
  };

  const handleGainXp = (amount: number) => {
    setPlayer((prev) => {
      const newXp = prev.xp + amount;
      let newLevel = prev.level;
      let newXpMax = prev.xpMax;

      if (newXp >= newXpMax) {
        newLevel += 1;
        newXpMax += 250;
        showToast(`⚡ ¡SUBIDA DE NIVEL! Ahora eres Nivel ${newLevel} en Midgard`);
      }

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        xpMax: newXpMax,
        gems: prev.gems + Math.round(amount / 2),
      };
    });
  };

  const handleClaimOdinChest = () => {
    if (claimedOdinChest) return;
    setClaimedOdinChest(true);
    handleGainXp(500);
    showToast('🎁 ¡Cofre de Odín reclamado! +500 XP y 150 gemas');
  };

  const handleSaveHeroProfile = (updated: Partial<PlayerProfile>) => {
    setPlayer((prev) => ({
      ...prev,
      ...updated,
    }));
    showToast('🛡️ Identidad del Skald actualizada con honor.');
  };

  const handleLaunchQuest = () => {
    setCurrentTab('misiones');
    setMissionSubView('forge');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0b1323] text-[#dbe2f9] flex flex-col font-['Plus_Jakarta_Sans'] selection:bg-[#00f0ff] selection:text-[#00363a]">
      {/* Toast Notification */}
      <Toast message={toastMessage} />

      {/* Persistent Gamer HUD Top Bar (hidden on prologue for cinematic focus) */}
      {!showPrologue && (
        <HeaderNav
          player={player}
          currentTab={currentTab}
          onNavigate={(tab) => setCurrentTab(tab as typeof currentTab)}
          onOpenProfile={() => setCurrentTab('perfil')}
          soundEnabled={soundEnabled}
          onToggleSound={() => {
            sound.enabled = !soundEnabled;
            setSoundEnabled(!soundEnabled);
          }}
        />
      )}

      {/* Main Content Arena */}
      <main className={`flex-1 w-full px-4 ${showPrologue ? 'pt-4' : 'pt-24'}`}>
        {/* Quick Quick Bar to Switch Views for Evaluation/Review */}
        <div className="max-w-xl mx-auto mb-3 flex items-center justify-between text-[11px] font-['JetBrains_Mono'] text-[#b9cacb] bg-[#182030]/60 px-3 py-1.5 rounded-lg border border-[#222a3b]">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff]" />
            Saga: C# &amp; SQL
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playRuneClick();
                setShowPrologue(!showPrologue);
              }}
              className="text-[#ffd65b] hover:underline cursor-pointer flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">auto_stories</span>
              <span>{showPrologue ? 'Salir de Prólogo' : 'Ver Prólogo (Acto I)'}</span>
            </button>
            <span>•</span>
            <button
              onClick={() => {
                sound.playRuneClick();
                setCurrentTab('misiones');
                setMissionSubView(missionSubView === 'forge' ? 'quiz' : 'forge');
              }}
              className="text-[#00f0ff] hover:underline cursor-pointer"
            >
              {missionSubView === 'forge' ? 'Duelo de Quiz' : 'Yunque Forja'}
            </button>
          </div>
        </div>

        {/* SCREEN 5: Onboarding / Prologue */}
        {showPrologue ? (
          <PrologueScreen
            player={player}
            onZarpar={() => {
              setShowPrologue(false);
              setCurrentTab('mapa');
              showToast('⛵ Zarpando hacia Midgard...');
            }}
            onAlreadyHaveAccount={() => {
              setShowPrologue(false);
              setCurrentTab('perfil');
            }}
            onClose={() => setShowPrologue(false)}
          />
        ) : (
          <>
            {/* SCREEN 2: Saga Map */}
            {currentTab === 'mapa' && (
              <SagaMapScreen
                nodes={nodes}
                onSelectNode={(node) => {
                  if (node.type === 'quiz') {
                    setCurrentTab('misiones');
                    setMissionSubView('quiz');
                  } else {
                    setCurrentTab('misiones');
                    setMissionSubView('forge');
                  }
                }}
                onLaunchActiveQuest={handleLaunchQuest}
                onShowToast={showToast}
              />
            )}

            {/* SCREEN 3 & 4: Runic Code Duel */}
            {currentTab === 'misiones' && (
              <>
                {missionSubView === 'forge' ? (
                  <ForgeDuelScreen
                    player={player}
                    onBack={() => setCurrentTab('mapa')}
                    onSuccess={(xp) => handleGainXp(xp)}
                    onShowToast={showToast}
                    onSwitchToQuiz={() => setMissionSubView('quiz')}
                  />
                ) : (
                  <ShieldQuizDuelScreen
                    player={player}
                    onBack={() => setCurrentTab('mapa')}
                    onSuccess={(xp) => handleGainXp(xp)}
                    onShowToast={showToast}
                    onSwitchToForge={() => setMissionSubView('forge')}
                  />
                )}
              </>
            )}

            {/* SCREEN: Galería de Valhalla */}
            {currentTab === 'galeria' && (
              <ValhallaGalleryScreen trophies={TROPHIES} onShowToast={showToast} />
            )}

            {/* SCREEN 1: Salón del Guerrero (Warrior Profile) */}
            {currentTab === 'perfil' && (
              <WarriorProfileScreen
                player={player}
                trophies={TROPHIES}
                masteryTracks={MASTERY_TRACKS}
                leaderboard={LEADERBOARD}
                onEditHero={() => setShowEditModal(true)}
                onSummonClan={() => setShowSummonModal(true)}
                onViewSkillTree={() => setCurrentTab('galeria')}
                onViewAllTrophies={() => setCurrentTab('galeria')}
                onShowToast={showToast}
              />
            )}
          </>
        )}
      </main>

      {/* Bottom Tab Bar */}
      <BottomNavBar currentTab={currentTab} onTabChange={(tab) => setCurrentTab(tab as typeof currentTab)} />

      {/* Edit Hero Modal */}
      <EditHeroModal
        player={player}
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleSaveHeroProfile}
      />

      {/* Summon Clan Modal */}
      <SummonClanModal
        player={player}
        isOpen={showSummonModal}
        onClose={() => setShowSummonModal(false)}
        onClaimOdinChest={handleClaimOdinChest}
        claimedOdinChest={claimedOdinChest}
        onShowToast={showToast}
      />
    </div>
  );
}
