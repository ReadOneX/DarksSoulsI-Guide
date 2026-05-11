'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Filter, Lock, Search } from 'lucide-react';
import { guideCards } from '@/lib/game-data';
import { saveOfflineEntry } from '@/lib/offline-cache';

const guideTypes = ['All', 'Walkthrough', 'Boss Guide', 'Build', 'Lore', 'Secret', 'PvP'];

export default function GuidesPage(): JSX.Element {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('All');
  const [cacheStatus, setCacheStatus] = useState('Offline cache ready');

  const filteredGuides = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return guideCards.filter((guide) => {
      const matchesType = type === 'All' || guide.type === type;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        guide.title.toLowerCase().includes(normalizedQuery) ||
        guide.description.toLowerCase().includes(normalizedQuery) ||
        guide.tags.some((tag) => tag.includes(normalizedQuery));

      return matchesType && matchesQuery;
    });
  }, [query, type]);

  const cacheGuides = async (): Promise<void> => {
    await saveOfflineEntry('guide-library', guideCards);
    setCacheStatus(`${guideCards.length} guides cached for offline reading`);
  };

  return (
    <main className="min-h-screen bg-dark-bg pt-24 text-ash-light">
      <section className="container-px mx-auto max-w-7xl py-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-6 lg:grid-cols-[1fr_360px]"
        >
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-ember">Guide Explorer</p>
            <h1 className="mt-3 text-4xl font-bold md:text-6xl">Find the next right move.</h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-ash">
              Search walkthroughs, boss guides, builds, lore entries, secrets, and locked advanced
              routes from a single responsive explorer.
            </p>
          </div>

          <div className="glass-morphism rounded-lg p-5">
            <div className="flex items-center gap-3 text-sm text-ash">
              <Download className="h-5 w-5 text-gold" />
              {cacheStatus}
            </div>
            <button
              type="button"
              onClick={cacheGuides}
              className="mt-4 w-full rounded-lg bg-gold px-4 py-3 font-bold text-dark-bg transition hover:bg-gold-light"
            >
              Cache Guide Library
            </button>
          </div>
        </motion.div>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_auto]">
          <label className="flex items-center gap-3 rounded-lg border border-dark-600 bg-dark-900 px-4 py-3">
            <Search className="h-5 w-5 text-ember" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search boss, build, route, lore..."
              className="w-full border-0 bg-transparent text-ash-light outline-none placeholder:text-ash"
            />
          </label>

          <div className="flex items-center gap-2 overflow-x-auto rounded-lg border border-dark-600 bg-dark-900 p-2">
            <Filter className="ml-2 h-4 w-4 shrink-0 text-gold" />
            {guideTypes.map((guideType) => (
              <button
                key={guideType}
                type="button"
                onClick={() => setType(guideType)}
                className={`shrink-0 rounded px-3 py-2 text-sm transition ${
                  type === guideType ? 'bg-ember text-dark-bg' : 'text-ash hover:bg-dark-700'
                }`}
              >
                {guideType}
              </button>
            ))}
          </div>
        </div>

        <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredGuides.map((guide, index) => (
            <motion.article
              key={guide.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              className="glass-morphism rounded-lg p-6"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded bg-ember/15 px-2 py-1 text-xs font-bold text-ember">
                    {guide.type}
                  </span>
                  <span className="rounded bg-gold/15 px-2 py-1 text-xs font-bold text-gold">
                    {guide.difficulty}
                  </span>
                </div>
                {guide.access === 'registered' && <Lock className="h-4 w-4 text-gold" />}
              </div>

              <h2 className="text-xl font-bold text-ash-light">{guide.title}</h2>
              <p className="mt-3 text-sm leading-6 text-ash">{guide.description}</p>
              <div className="mt-4 rounded-lg bg-dark-900/70 p-4 text-sm leading-6 text-ash">
                {guide.content}
              </div>
              <div className="mt-5 flex items-center justify-between text-xs text-ash">
                <span>{guide.readTime}</span>
                <span>{guide.access === 'guest' ? 'Guest available' : 'Registered only'}</span>
              </div>
            </motion.article>
          ))}
        </section>
      </section>
    </main>
  );
}
