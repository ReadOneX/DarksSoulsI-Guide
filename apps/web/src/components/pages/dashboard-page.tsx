'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Bell, Cloud, Flame, HardDrive, User } from 'lucide-react';
import { progressModules } from '@/lib/game-data';

export default function DashboardPage(): JSX.Element {
  return (
    <main className="min-h-screen bg-dark-bg pt-24 text-ash-light">
      <section className="container-px mx-auto max-w-7xl py-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-6 lg:grid-cols-[1fr_420px]"
        >
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-ember">
              Account Dashboard
            </p>
            <h1 className="mt-3 text-4xl font-bold md:text-6xl">
              Chosen Undead command center.
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-ash">
              Review local progress, sync readiness, notifications, account state, and backup
              surfaces in one dense companion dashboard.
            </p>
          </div>

          <div className="glass-morphism rounded-lg p-5">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-lg bg-ember/15">
                <User className="h-7 w-7 text-ember" />
              </div>
              <div>
                <h2 className="font-bold text-ash-light">Guest Chosen Undead</h2>
                <p className="text-sm text-ash">Local identity, cloud sync disabled</p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              {[
                { label: 'Access', value: '70%' },
                { label: 'Run', value: '46%' },
                { label: 'Cache', value: 'On' }
              ].map((stat) => (
                <div key={stat.label} className="rounded-lg bg-dark-900 p-3">
                  <div className="font-bold text-gold">{stat.value}</div>
                  <div className="text-xs text-ash">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {progressModules.map((module, index) => {
            const Icon = module.icon;
            return (
              <motion.article
                key={module.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className="glass-morphism rounded-lg p-5"
              >
                <Icon className="mb-4 h-6 w-6 text-ember" />
                <h2 className="font-bold text-ash-light">{module.label}</h2>
                <p className="mt-2 text-2xl font-bold text-gold">{module.value}</p>
              </motion.article>
            );
          })}
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-3">
          {[
            { icon: HardDrive, title: 'Backup Manager', copy: 'Drag save backups into the app shell to cache metadata locally.' },
            { icon: Bell, title: 'Notification Center', copy: 'Web push permission and in-app reminders are wired into the shell.' },
            { icon: Cloud, title: 'Sync Service', copy: 'Registered account sync is separated from guest local progress.' }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-lg border border-dark-600 bg-dark-900 p-6">
                <Icon className="mb-4 h-6 w-6 text-gold" />
                <h2 className="text-lg font-bold text-ash-light">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-ash">{item.copy}</p>
              </div>
            );
          })}
        </section>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/progress" className="rounded-lg bg-ember px-5 py-3 text-center font-bold text-dark-bg">
            Open Progress Tracker
          </Link>
          <Link href="/settings" className="rounded-lg border border-gold px-5 py-3 text-center font-bold text-gold">
            Tune Settings
          </Link>
        </div>

        <div className="mt-10 flex items-center gap-3 text-sm text-ash">
          <Flame className="h-4 w-4 text-ember" />
          Hydration-safe client state is isolated inside providers and shell components.
        </div>
      </section>
    </main>
  );
}
