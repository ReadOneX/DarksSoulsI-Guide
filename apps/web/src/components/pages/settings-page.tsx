'use client';

import { motion } from 'framer-motion';
import { Bell, Database, Moon, Sun, Wifi } from 'lucide-react';
import { useThemeMode } from '@/hooks/use-theme';

const settings = [
  { label: 'Web Push Notification', description: 'Progress reminders and sync alerts.', icon: Bell },
  { label: 'IndexedDB Offline Cache', description: 'Recently viewed guides and snapshots.', icon: Database },
  { label: 'Background Sync', description: 'Queue local updates until API is reachable.', icon: Wifi }
];

export default function SettingsPage(): JSX.Element {
  const { theme, setTheme, isDark } = useThemeMode();

  return (
    <main className="min-h-screen bg-dark-bg pt-24 text-ash-light">
      <section className="container-px mx-auto max-w-5xl py-10">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-sm font-bold uppercase tracking-widest text-ember">Settings</p>
          <h1 className="mt-3 text-4xl font-bold md:text-6xl">Tune the companion.</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-ash">
            Theme, cache, notifications, and sync behavior are separated into production-friendly
            controls that persist safely on the client.
          </p>
        </motion.div>

        <section className="mt-8 glass-morphism rounded-lg p-6">
          <h2 className="text-xl font-bold text-ash-light">Theme Mode</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              { label: 'dark', icon: Moon },
              { label: 'light', icon: Sun }
            ].map((mode) => {
              const Icon = mode.icon;
              const active = theme === mode.label || (mode.label === 'dark' && isDark);
              return (
                <button
                  key={mode.label}
                  type="button"
                  onClick={() => setTheme(mode.label)}
                  className={`flex items-center justify-between rounded-lg border px-4 py-4 text-left transition ${
                    active
                      ? 'border-ember bg-ember/10 text-ember'
                      : 'border-dark-600 bg-dark-900 text-ash hover:border-gold'
                  }`}
                >
                  <span className="font-bold capitalize">{mode.label}</span>
                  <Icon className="h-5 w-5" />
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-6 grid gap-5 md:grid-cols-3">
          {settings.map((setting) => {
            const Icon = setting.icon;
            return (
              <article key={setting.label} className="rounded-lg border border-dark-600 bg-dark-900 p-5">
                <Icon className="mb-4 h-6 w-6 text-gold" />
                <h2 className="font-bold text-ash-light">{setting.label}</h2>
                <p className="mt-3 text-sm leading-6 text-ash">{setting.description}</p>
                <label className="mt-5 flex items-center justify-between text-sm text-ash">
                  Enabled
                  <input type="checkbox" defaultChecked className="rounded border-dark-600 bg-dark-800 text-ember" />
                </label>
              </article>
            );
          })}
        </section>
      </section>
    </main>
  );
}
