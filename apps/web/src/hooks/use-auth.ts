'use client';

import { useCallback } from 'react';
import { useAuthStore } from '@/store/auth-store';
import { authAPI } from '@darks-souls/api';
import { LoginRequest, RegisterRequest, AuthTokens, AuthUser } from '@darks-souls/types';

interface UseAuthReturn {
  user: AuthUser | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: AuthUser | null) => void;
}

export function useAuth(): UseAuthReturn {
  const { user, tokens, isAuthenticated, setUser, setTokens, setAuthenticated, logout } =
    useAuthStore();

  const login = useCallback(
    async (credentials: LoginRequest) => {
      try {
        const response = await authAPI.login(credentials);
        if (response.success && response.data) {
          const { user: sessionUser, ...sessionTokens } = response.data;
          setUser(sessionUser);
          setTokens(sessionTokens);
          setAuthenticated(true);
        } else if (response.error) {
          throw new Error(response.error || 'Login failed');
        }
      } catch (error) {
        throw error instanceof Error ? error : new Error('Login failed');
      }
    },
    [setUser, setTokens, setAuthenticated]
  );

  const register = useCallback(
    async (data: RegisterRequest) => {
      try {
        const response = await authAPI.register(data);
        if (response.success && response.data) {
          const { user: sessionUser, ...sessionTokens } = response.data;
          setUser(sessionUser);
          setTokens(sessionTokens);
          setAuthenticated(true);
        } else if (response.error) {
          throw new Error(response.error || 'Registration failed');
        }
      } catch (error) {
        throw error instanceof Error ? error : new Error('Registration failed');
      }
    },
    [setUser, setTokens, setAuthenticated]
  );

  const handleLogout = useCallback(async () => {
    try {
      if (tokens?.accessToken) {
        await authAPI.logout(tokens.accessToken);
      }
    } catch (error) {
      // Silent fail on logout API error, still clear local state
    } finally {
      logout();
      setUser(null);
    }
  }, [tokens, logout, setUser]);

  return {
    user,
    tokens,
    isAuthenticated,
    login,
    register,
    logout: handleLogout,
    setUser
  };
}
