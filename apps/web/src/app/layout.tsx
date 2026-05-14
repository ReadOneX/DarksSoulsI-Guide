import type { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';
import './globals.css';
import RootLayout from '@/components/layout/root-layout';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f1e8' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' }
  ]
};

export const metadata: Metadata = {
  title: {
    default: 'Dark Souls I Guide',
    template: '%s | Dark Souls I Guide'
  },
  description: 'Your complete Dark Souls I companion guide with bosses, items, builds, and more',
  keywords: ['Dark Souls', 'Guide', 'Game Guide', 'Boss Guide', 'Walkthroughs'],
  authors: [{ name: 'Dark Souls Guide Team' }],
  creator: 'Dark Souls Guide Team',
  publisher: 'Dark Souls Guide',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'Dark Souls I Guide',
    description: 'Your complete Dark Souls I companion guide',
    url: 'https://darkssouls-guide.com',
    type: 'website',
    siteName: 'Dark Souls I Guide',
    images: [
      {
        url: 'https://darkssouls-guide.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Dark Souls I Guide'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dark Souls I Guide',
    description: 'Your complete Dark Souls I companion guide',
    creator: '@darksoulsguide'
  },
  formatDetection: {
    email: true,
    telephone: true
  }
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="DS Guide" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  );
}
