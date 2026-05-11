'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Flame, Lock, Search, ShieldCheck } from 'lucide-react';
import { bossCards, buildCards, featureModules, itemCards } from '@/lib/game-data';

interface FeaturePageProps {
  title: string;
  eyebrow: string;
  description: string;
  primaryAction?: string;
}

const quickStats = [
  { label: 'Guest Access', value: '70%' },
  { label: 'Offline Ready', value: 'Cache' },
  { label: 'Sync Mode', value: 'JWT' }
];

export default function FeaturePage({
  title,
  eyebrow,
  description,
  primaryAction = 'Explore guides'
}: FeaturePageProps): JSX.Element {
  return (
    <main className="min-h-screen bg-dark-bg pt-24 text-ash-light">
      <section className="relative overflow-hidden pb-16 pt-10">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(255,107,53,0.18),transparent_32%),radial-gradient(circle_at_80%_0%,rgba(212,175,55,0.12),transparent_28%)]" />
        <div className="container-px mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end"
          >
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-ember">
                {eyebrow}
              </p>
              <h1 className="max-w-3xl text-4xl font-bold text-ash-light md:text-6xl">
                {title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-ash md:text-lg">
                {description}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/guides"
                  className="rounded-lg bg-gradient-to-r from-ember to-ember-light px-6 py-3 text-center font-bold text-dark-bg transition hover:shadow-ember-glow"
                >
                  {primaryAction}
                </Link>
                <Link
                  href="/dashboard"
                  className="rounded-lg border border-gold px-6 py-3 text-center font-bold text-gold transition hover:bg-gold/10"
                >
                  Open dashboard
                </Link>
              </div>
            </div>

            <div className="glass-morphism rounded-lg p-5">
              <div className="grid grid-cols-3 gap-3">
                {quickStats.map((stat) => (
                  <div key={stat.label} className="rounded-lg bg-dark-900/60 p-4 text-center">
                    <div className="text-lg font-bold text-gold">{stat.value}</div>
                    <div className="mt-1 text-xs text-ash">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 space-y-3">
                {[
                  { icon: Search, label: 'Search and filters prepared for guide datasets' },
                  { icon: Lock, label: 'Guest locks for advanced builds and PvP routes' },
                  { icon: ShieldCheck, label: 'Account sync boundary ready for backend services' }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center gap-3 text-sm text-ash">
                      <Icon className="h-4 w-4 text-ember" />
                      {item.label}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container-px mx-auto grid max-w-6xl gap-5 pb-20 md:grid-cols-3">
        {[
          { icon: Flame, title: 'Premium Atmosphere', copy: 'Ember glow, glass panels, and restrained motion keep the interface cinematic.' },
          { icon: BookOpen, title: 'Structured Content', copy: 'Walkthroughs, bosses, lore, builds, and collections share the same reusable shell.' },
          { icon: ShieldCheck, title: 'Deploy Stable', copy: 'Routes are static-friendly and App Router compatible for Vercel builds.' }
        ].map((card) => {
          const Icon = card.icon;
          return (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-morphism rounded-lg p-6"
            >
              <Icon className="mb-4 h-6 w-6 text-gold" />
              <h2 className="text-xl font-bold text-ash-light">{card.title}</h2>
              <p className="mt-3 text-sm leading-6 text-ash">{card.copy}</p>
            </motion.article>
          );
        })}
      </section>

      <section className="container-px mx-auto max-w-6xl pb-20">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-ember">
              Live Companion Modules
            </p>
            <h2 className="mt-2 text-2xl font-bold text-ash-light">Production-ready surfaces</h2>
          </div>
          <div className="hidden gap-2 sm:flex">
            {featureModules.map((module) => {
              const Icon = module.icon;
              return (
                <span
                  key={module.label}
                  className="inline-flex items-center gap-2 rounded-lg border border-dark-600 px-3 py-2 text-xs text-ash"
                >
                  <Icon className="h-3.5 w-3.5 text-gold" />
                  {module.label}
                </span>
              );
            })}
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {bossCards.slice(0, 3).map((boss) => (
            <article key={boss.id} className="rounded-lg border border-dark-600 bg-dark-900 p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-ember">{boss.area}</p>
              <h3 className="mt-2 text-xl font-bold text-ash-light">{boss.name}</h3>
              <p className="mt-3 text-sm text-ash">Weakness: {boss.weakness}</p>
              <p className="mt-2 text-sm text-gold">Reward: {boss.reward}</p>
            </article>
          ))}
          {itemCards.slice(0, 3).map((item) => (
            <article key={item.id} className="rounded-lg border border-dark-600 bg-dark-900 p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-ember">{item.category}</p>
              <h3 className="mt-2 text-xl font-bold text-ash-light">{item.name}</h3>
              <p className="mt-3 text-sm text-ash">{item.location}</p>
              <p className="mt-2 text-sm text-gold">{item.effect}</p>
            </article>
          ))}
          {buildCards.slice(0, 3).map((build) => (
            <article key={build.id} className="rounded-lg border border-dark-600 bg-dark-900 p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-ember">
                Level {build.level} / {build.focus}
              </p>
              <h3 className="mt-2 text-xl font-bold text-ash-light">{build.name}</h3>
              <p className="mt-3 text-sm text-ash">{build.stats}</p>
              <p className="mt-2 text-sm text-gold">{build.equipment}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
