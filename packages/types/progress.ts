// Progress tracking types
export interface UserProgress {
  userId: string;
  completedBosses: string[];
  discoveredAreas: string[];
  collectedItems: string[];
  completedQuests: string[];
  unlockedCovenants: string[];
  achievements: string[];
  playtime: number; // in minutes
  currentBuild?: BuildProgress;
  notes?: string;
  lastUpdated: string;
  syncedAt?: string;
}

export interface BuildProgress {
  buildId: string;
  currentLevel: number;
  currentStats: Record<string, number>;
  equippedItems: Record<string, string>;
  completionPercentage: number;
}

export interface BossProgress {
  bossId: string;
  bossName: string;
  attempts: number;
  defeats: number;
  completed: boolean;
  firstDefeatDate?: string;
  completedAt?: string;
  strategy?: string;
}

export interface AreaProgress {
  areaId: string;
  areaName: string;
  discoveredBonfires: string[];
  discoveredItems: string[];
  discoveredSecrets: string[];
  discoveredEnemies: string[];
  explorationPercentage: number;
  completedAt?: string;
}

export interface ItemProgress {
  itemId: string;
  itemName: string;
  quantity: number;
  location: string;
  obtainedAt?: string;
}

export interface QuestProgress {
  questId: string;
  questName: string;
  currentStep: number;
  totalSteps: number;
  startedAt: string;
  completedAt?: string;
  status: 'active' | 'completed' | 'abandoned' | 'failed';
}

export interface CovenantProgress {
  covenantId: string;
  covenantName: string;
  joinedAt: string;
  currentRank: number;
  maxRank: number;
}

export interface AchievementProgress {
  achievementId: string;
  achievementName: string;
  unlockedAt: string;
  rarity: number;
  points: number;
}

export interface Bookmark {
  id: string;
  userId: string;
  guideId: string;
  title: string;
  url: string;
  createdAt: string;
  tags: string[];
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'achievement' | 'boss_guide' | 'item_found' | 'sync' | 'system';
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface SyncData {
  userId: string;
  progress: UserProgress;
  bookmarks: Bookmark[];
  notifications: Notification[];
  lastSyncTime: string;
  clientVersion: string;
}
