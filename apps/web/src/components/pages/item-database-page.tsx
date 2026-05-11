'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Gem, Search } from 'lucide-react';
import { itemCards } from '@/lib/game-data';
import { useProgressStore } from '@/store/progress-store';

const categories = ['All', 'Weapon', 'Shield', 'Consumable', 'Ring'];

export default function ItemDatabasePage(): JSX.Element {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const { progress, updateProgress } = useProgressStore();
  const collectedItems = progress?.collectedItems ?? [];

  const items = useMemo(() => {
    const term = query.trim().toLowerCase();
    return itemCards.filter((item) => {
      const matchesCategory = category === 'All' || item.category === category;
      const matchesQuery = [item.name, item.location, item.effect, item.rarity].some((value) =>
        value.toLowerCase().includes(term)
      );
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const toggleItem = (itemId: string): void => {
    updateProgress({
      collectedItems: collectedItems.includes(itemId)
        ? collectedItems.filter((id) => id !== itemId)
        : [...collectedItems, itemId],
    });
  };

  return (
    <main className="min-h-screen bg-dark-bg pt-24 text-ash-light">
      <section className="container-px mx-auto max-w-7xl py-10">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-sm font-bold uppercase tracking-widest text-ember">Item Database</p>
          <h1 className="mt-3 text-4xl font-bold md:text-6xl">Gear, drops, and secrets.</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-ash">
            Track weapons, rings, consumables, rarity, location, and build utility with local item
            collection persistence.
          </p>
        </motion.div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_auto]">
          <label className="flex items-center gap-3 rounded-lg border border-dark-600 bg-dark-900 px-4 py-3">
            <Search className="h-5 w-5 text-ember" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search item, location, effect..."
              className="w-full border-0 bg-transparent text-ash-light outline-none placeholder:text-ash"
            />
          </label>
          <div className="flex gap-2 overflow-x-auto rounded-lg border border-dark-600 bg-dark-900 p-2">
            {categories.map((itemCategory) => (
              <button
                key={itemCategory}
                type="button"
                onClick={() => setCategory(itemCategory)}
                className={`rounded px-3 py-2 text-sm ${
                  category === itemCategory ? 'bg-ember text-dark-bg' : 'text-ash hover:bg-dark-700'
                }`}
              >
                {itemCategory}
              </button>
            ))}
          </div>
        </div>

        <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item, index) => {
            const collected = collectedItems.includes(item.id);
            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className="glass-morphism rounded-lg p-5"
              >
                <Gem className="h-6 w-6 text-gold" />
                <p className="mt-4 text-xs font-bold uppercase tracking-widest text-ember">
                  {item.category} / {item.rarity}
                </p>
                <h2 className="mt-2 text-xl font-bold text-ash-light">{item.name}</h2>
                <p className="mt-3 text-sm leading-6 text-ash">{item.location}</p>
                <p className="mt-3 text-sm leading-6 text-gold">{item.effect}</p>
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className={`mt-5 w-full rounded-lg px-4 py-2 font-bold ${
                    collected ? 'bg-gold text-dark-bg' : 'border border-gold text-gold'
                  }`}
                >
                  {collected ? 'Collected' : 'Mark Collected'}
                </button>
              </motion.article>
            );
          })}
        </section>
      </section>
    </main>
  );
}
