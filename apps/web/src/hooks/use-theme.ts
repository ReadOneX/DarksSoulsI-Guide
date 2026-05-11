'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function useThemeMode(): {
  theme: string | undefined;
  setTheme: (theme: string) => void;
  isDark: boolean;
  isLight: boolean;
} {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return {
      theme: 'dark',
      setTheme: () => {},
      isDark: true,
      isLight: false,
    };
  }

  return {
    theme,
    setTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
  };
}
