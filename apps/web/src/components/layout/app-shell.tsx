'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, useCallback, useMemo, useState } from 'react';
import {
  Bell,
  Bookmark,
  Boxes,
  Flame,
  Gauge,
  Home,
  Map,
  Menu,
  Moon,
  PackageSearch,
  ScrollText,
  Search,
  Settings,
  Shield,
  Sparkles,
  Sun,
  Swords,
  Upload,
  User,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeMode } from '@/hooks/use-theme';
import { saveOfflineEntry } from '@/lib/offline-cache';

interface AppShellProps {
  children: ReactNode;
}

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/guides', label: 'Guide Explorer', icon: Map },
  { href: '/bosses', label: 'Boss Database', icon: Swords },
  { href: '/items', label: 'Item Database', icon: PackageSearch },
  { href: '/builds', label: 'Build Planner', icon: Boxes },
  { href: '/progress', label: 'Progress Tracker', icon: Gauge },
  { href: '/lore', label: 'Lore Archive', icon: ScrollText },
  { href: '/bookmarks', label: 'Bookmarks', icon: Bookmark },
  { href: '/dashboard', label: 'Dashboard', icon: User },
  { href: '/settings', label: 'Settings', icon: Settings }
];

const notifications = [
  'Advanced routes are locked for guest mode until sign in.',
  'Offline guide cache is active for recently visited pages.',
  'Progress sync is ready when backend credentials are configured.'
];

export default function AppShell({ children }: AppShellProps): JSX.Element {
  const pathname = usePathname();
  const { theme, setTheme, isDark } = useThemeMode();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isNotificationsOpen, setNotificationsOpen] = useState(false);
  const [dropMessage, setDropMessage] = useState('Drop save backups or notes here');

  const activeSection = useMemo(
    () => navItems.find((item) => item.href !== '/' && pathname.startsWith(item.href)) ?? navItems[0],
    [pathname]
  );

  const requestNotifications = useCallback(async () => {
    if (!('Notification' in window)) {
      setDropMessage('Notifications are not supported in this browser');
      return;
    }

    const permission = await Notification.requestPermission();
    setDropMessage(permission === 'granted' ? 'Notifications enabled' : 'Notifications not enabled');
  }, []);

  const handleDrop = useCallback(async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    if (files.length === 0) return;

    await saveOfflineEntry(
      'last-drop',
      files.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type || 'unknown',
        importedAt: new Date().toISOString()
      }))
    );
    setDropMessage(`${files.length} file cached for backup review`);
  }, []);

  const nav = (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMenuOpen(false)}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
              isActive
                ? 'bg-ember/15 text-ember shadow-inner-glow'
                : 'text-ash hover:bg-dark-700/70 hover:text-ash-light'
            }`}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-dark-bg text-ash-light">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_0%,rgba(255,107,53,0.14),transparent_30%),radial-gradient(circle_at_100%_20%,rgba(212,175,55,0.1),transparent_26%),linear-gradient(180deg,#0a0a0a,#14100e_52%,#0a0a0a)]" />

      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-72 border-r border-dark-600/70 bg-dark-900/88 p-5 backdrop-blur-xl lg:block">
        <Link href="/" className="mb-8 flex items-center gap-3 text-ash-light">
          <span className="grid h-11 w-11 place-items-center rounded-lg border border-ember/40 bg-ember/10">
            <Flame className="h-6 w-6 text-ember" />
          </span>
          <span>
            <span className="block text-base font-bold">Dark Souls I</span>
            <span className="text-xs text-ash">Guide Companion</span>
          </span>
        </Link>
        {nav}
      </aside>

      <header className="fixed left-0 right-0 top-0 z-30 border-b border-dark-600/70 bg-dark-900/82 backdrop-blur-xl lg:left-72">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-lg border border-dark-600 p-2 text-ash-light lg:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <p className="text-xs uppercase tracking-widest text-ember">{activeSection.label}</p>
              <div className="hidden items-center gap-2 text-sm text-ash sm:flex">
                <Shield className="h-4 w-4 text-gold" />
                Guest mode: local progress, 70% guide access
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-lg border border-dark-600 bg-dark-800/70 px-3 py-2 text-sm text-ash md:flex">
              <Search className="h-4 w-4 text-ember" />
              Search ready
            </div>
            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-lg border border-dark-600 bg-dark-800/80 p-2 text-gold transition hover:bg-dark-700"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              type="button"
              onClick={() => setNotificationsOpen(true)}
              className="relative rounded-lg border border-dark-600 bg-dark-800/80 p-2 text-gold transition hover:bg-dark-700"
              aria-label="Open notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-ember" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 lg:hidden"
          >
            <motion.aside
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              className="h-full w-80 max-w-[86vw] bg-dark-900 p-5"
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-ash-light">
                  <Flame className="h-5 w-5 text-ember" />
                  Dark Souls I
                </div>
                <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close navigation">
                  <X className="h-5 w-5 text-ash" />
                </button>
              </div>
              {nav}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isNotificationsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-end bg-black/60 p-4 pt-20"
            onClick={() => setNotificationsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              onClick={(event) => event.stopPropagation()}
              className="w-full max-w-md rounded-lg border border-dark-600 bg-dark-900 p-5 shadow-2xl"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-ash-light">Notification Center</h2>
                <button type="button" onClick={() => setNotificationsOpen(false)} aria-label="Close notifications">
                  <X className="h-5 w-5 text-ash" />
                </button>
              </div>
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div key={notification} className="rounded-lg bg-dark-800 p-3 text-sm text-ash">
                    {notification}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={requestNotifications}
                className="mt-5 w-full rounded-lg bg-ember px-4 py-2 font-bold text-dark-bg"
              >
                Enable Web Push
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="lg:pl-72">
        <div
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
          className="fixed bottom-4 right-4 z-30 hidden rounded-lg border border-dashed border-gold/60 bg-dark-900/90 px-4 py-3 text-sm text-ash shadow-xl backdrop-blur md:flex md:items-center md:gap-3"
        >
          <Upload className="h-4 w-4 text-gold" />
          {dropMessage}
        </div>
        <div className="pointer-events-none fixed bottom-4 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-ember/30 bg-dark-900/80 px-4 py-2 text-xs text-ash backdrop-blur lg:flex">
          <Sparkles className="h-4 w-4 text-ember" />
          Bonfire ambience active
        </div>
        {children}
      </div>
    </div>
  );
}
