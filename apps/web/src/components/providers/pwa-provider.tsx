'use client';

import { ReactNode, useEffect, useState } from 'react';

interface PwaProviderProps {
  children: ReactNode;
}

export function PwaProvider({ children }: PwaProviderProps): JSX.Element {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = (): void => setIsOnline(true);
    const handleOffline = (): void => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if ('serviceWorker' in navigator) {
      void navigator.serviceWorker.register('/sw.js');
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <>
      <div
        aria-live="polite"
        className="sr-only"
        data-network-state={isOnline ? 'online' : 'offline'}
      >
        {isOnline ? 'Online' : 'Offline mode active'}
      </div>
      {children}
    </>
  );
}
