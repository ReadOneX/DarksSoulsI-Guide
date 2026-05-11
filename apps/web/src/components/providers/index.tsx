'use client';

import { ReactNode } from 'react';
import { ClientThemeProvider } from './theme-provider';
import { QueryProvider } from './query-provider';
import { PwaProvider } from './pwa-provider';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps): JSX.Element {
  return (
    <ClientThemeProvider>
      <PwaProvider>
        <QueryProvider>{children}</QueryProvider>
      </PwaProvider>
    </ClientThemeProvider>
  );
}
