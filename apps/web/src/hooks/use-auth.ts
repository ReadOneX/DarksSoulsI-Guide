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
          setTokens(response.data);
          setAuthenticated(true);
          // TODO: Fetch current user
        }
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    },
    [setTokens, setAuthenticated]
  );

  const register = useCallback(
    async (data: RegisterRequest) => {
      try {
        const response = await authAPI.register(data);
        if (response.success && response.data) {
          setTokens(response.data);
          setAuthenticated(true);
        }
      } catch (error) {
        console.error('Register error:', error);
        throw error;
      }
    },
    [setTokens, setAuthenticated]
  );

  const handleLogout = useCallback(async () => {
    try {
      if (tokens?.accessToken) {
        await authAPI.logout(tokens.accessToken);
      }
      logout();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      logout();
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
