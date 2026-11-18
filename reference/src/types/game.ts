export interface PlayerProfile {
  name: string;
  title: string;
  clan: string;
  level: number;
  xp: number;
  xpMax: number;
  hearts: number;
  maxHearts: number;
  gems: number; // Oro de Odín
  streak: number; // Racha Rúnica
  streakRecord: number;
  joinedDate: string;
  avatarUrl: string;
  coverUrl: string;
  rank: string; // RANGO ORO
  league: string; // Liga Valhalla • Plata II
  leagueRank: number;
  leagueTimeLeft: string;
}

export interface IslandNode {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  stars: number;
  maxStars: number;
  status: 'completed' | 'active' | 'locked' | 'boss';
  icon: string;
  xpReward: number;
  type: 'syntax' | 'quiz' | 'boss';
}

export interface Trophy {
  id: string;
  name: string;
  desc: string;
  icon: string;
  progress: string;
  completed: boolean;
  color: 'gold' | 'cyan' | 'orange' | 'outline';
}

export interface MasteryTrack {
  id: string;
  icon: string;
  title: string;
  level: number;
  percent: number;
  color: 'cyan' | 'gold' | 'slate';
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  tag?: string;
  role: string;
  xp: number;
  streak: number;
  avatarUrl: string;
  isCurrentUser?: boolean;
}
