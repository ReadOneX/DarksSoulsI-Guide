import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProgress } from '@darks-souls/types';

interface ProgressStore {
  progress: UserProgress | null;
  setProgress: (progress: UserProgress | null) => void;
  updateProgress: (updates: Partial<UserProgress>) => void;
}

const defaultProgress: UserProgress = {
  userId: '',
  completedBosses: [],
  discoveredAreas: [],
  collectedItems: [],
  completedQuests: [],
  unlockedCovenants: [],
  achievements: [],
  playtime: 0,
  lastUpdated: new Date().toISOString()
};

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set) => ({
      progress: defaultProgress,
      setProgress: (progress) => set({ progress }),
      updateProgress: (updates) =>
        set((state) => ({
          progress: state.progress
            ? {
                ...state.progress,
                ...updates,
                lastUpdated: new Date().toISOString()
              }
            : null
        }))
    }),
    {
      name: 'progress-storage'
    }
  )
);
