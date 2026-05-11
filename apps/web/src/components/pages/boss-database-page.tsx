'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Shield, Swords } from 'lucide-react';
import { bossCards } from '@/lib/game-data';
import { useProgressStore } from '@/store/progress-store';

export default function BossDatabasePage(): JSX.Element {
  const [query, setQuery] = useState('');
  const { progress, updateProgress } = useProgressStore();
  const completedBosses = progress?.completedBosses ?? [];

  const bosses = useMemo(() => {
    const term = query.trim().toLowerCase();
    return bossCards.filter((boss) =>
      [boss.name, boss.area, boss.difficulty, boss.weakness, boss.reward].some((value) =>
        value.toLowerCase().includes(term)
      )
    );
  }, [query]);

  const toggleBoss = (bossId: string): void => {
    updateProgress({
      completedBosses: completedBosses.includes(bossId)
        ? completedBosses.filter((id) => id !== bossId)
        : [...completedBosses, bossId],
    });
  };

  return (
    <main className="min-h-screen bg-dark-bg pt-24 text-ash-light">
      <section className="container-px mx-auto max-w-7xl py-10">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-sm font-bold uppercase tracking-widest text-ember">Boss Database</p>
          <h1 className="mt-3 text-4xl font-bold md:text-6xl">Every fog gate, mapped.</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-ash">
            Strategy cards include arena location, weakness notes, completion status, guest access,
            and reward information for progression planning.
          </p>
        </motion.div>

        <label className="mt-8 flex max-w-2xl items-center gap-3 rounded-lg border border-dark-600 bg-dark-900 px-4 py-3">
          <Search className="h-5 w-5 text-ember" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search boss, area, weakness, reward..."
            className="w-full border-0 bg-transparent text-ash-light outline-none placeholder:text-ash"
          />
        </label>

        <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {bosses.map((boss, index) => {
            const completed = completedBosses.includes(boss.id);
            return (
              <motion.article
                key={boss.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className="glass-morphism rounded-lg p-5"
              >
                <div className="flex items-center justify-between">
                  <Swords className="h-6 w-6 text-ember" />
                  <span className="rounded bg-gold/15 px-2 py-1 text-xs font-bold text-gold">
                    {boss.difficulty}
                  </span>
                </div>
                <h2 className="mt-5 text-xl font-bold text-ash-light">{boss.name}</h2>
                <p className="mt-2 text-sm text-ash">{boss.area}</p>
                <div className="mt-4 space-y-2 text-sm text-ash">
                  <p>Weakness: {boss.weakness}</p>
                  <p>Reward: {boss.reward}</p>
                  <p>Access: {boss.status}</p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleBoss(boss.id)}
                  className={`mt-5 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 font-bold transition ${
                    completed ? 'bg-gold text-dark-bg' : 'border border-gold text-gold hover:bg-gold/10'
                  }`}
                >
                  <Shield className="h-4 w-4" />
                  {completed ? 'Defeated' : 'Mark Defeated'}
                </button>
              </motion.article>
            );
          })}
        </section>
      </section>
    </main>
  );
}
