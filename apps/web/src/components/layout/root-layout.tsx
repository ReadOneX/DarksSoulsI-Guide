'use client';

import { ReactNode } from 'react';
import { Providers } from '@/components/providers';
import AppShell from './app-shell';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <Providers>
      <AppShell>{children}</AppShell>
    </Providers>
  );
}
