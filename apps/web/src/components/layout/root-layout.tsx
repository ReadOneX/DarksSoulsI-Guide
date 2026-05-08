'use client';

import React, { ReactNode } from 'react';
import { Providers } from '@/components/providers';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return <Providers>{children}</Providers>;
}
