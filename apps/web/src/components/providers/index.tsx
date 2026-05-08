'use client';

import React, { ReactNode } from 'react';
import { ClientThemeProvider } from './theme-provider';
import { QueryProvider } from './query-provider';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps): JSX.Element {
  return (
    <ClientThemeProvider>
      <QueryProvider>{children}</QueryProvider>
    </ClientThemeProvider>
  );
}
