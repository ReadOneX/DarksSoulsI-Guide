import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthUser, AuthTokens } from '@darks-souls/types';

interface AuthStore {
  user: AuthUser | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  setUser: (user: AuthUser | null) => void;
  setTokens: (tokens: AuthTokens | null) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      tokens: null,
      isAuthenticated: false,
      setUser: (user) => set({ user }),
      setTokens: (tokens) => set({ tokens }),
      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      logout: () =>
        set({
          user: null,
          tokens: null,
          isAuthenticated: false
        })
    }),
    {
      name: 'auth-storage'
    }
  )
);
