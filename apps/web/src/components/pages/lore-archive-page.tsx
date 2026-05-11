'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ScrollText } from 'lucide-react';

const loreEntries = [
  {
    title: 'The First Flame',
    tag: 'Origin',
    body: 'The First Flame brings disparity: heat and cold, life and death, light and dark. Every system in Lordran bends around that first impossible division.'
  },
  {
    title: 'Artorias and the Abyss',
    tag: 'DLC',
    body: 'The heroic myth survives because the truth is scattered across Sif, Oolacile, the covenant, and the player who walks backward through legend.'
  },
  {
    title: 'The Bells of Awakening',
    tag: 'Progression',
    body: 'The bells are not only objectives. They are Lordran teaching the player to read vertical space, hidden routes, and old systems of faith.'
  }
];

export default function LoreArchivePage(): JSX.Element {
  const [openEntry, setOpenEntry] = useState(loreEntries[0]?.title ?? '');

  return (
    <main className="min-h-screen bg-dark-bg pt-24 text-ash-light">
      <section className="container-px mx-auto max-w-5xl py-10">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-sm font-bold uppercase tracking-widest text-ember">Lore Archive</p>
          <h1 className="mt-3 text-4xl font-bold md:text-6xl">Fragments worth reading twice.</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-ash">
            Collapsible, markdown-ready lore entries for NPC arcs, item descriptions, hidden
            mechanics, and area stories.
          </p>
        </motion.div>

        <section className="mt-8 space-y-4">
          {loreEntries.map((entry) => {
            const isOpen = openEntry === entry.title;
            return (
              <article key={entry.title} className="glass-morphism rounded-lg">
                <button
                  type="button"
                  onClick={() => setOpenEntry(isOpen ? '' : entry.title)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="flex items-center gap-3">
                    <ScrollText className="h-5 w-5 text-gold" />
                    <span>
                      <span className="block text-lg font-bold text-ash-light">{entry.title}</span>
                      <span className="text-sm text-ember">{entry.tag}</span>
                    </span>
                  </span>
                  <ChevronDown className={`h-5 w-5 text-ash transition ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && <p className="border-t border-dark-600 p-5 leading-8 text-ash">{entry.body}</p>}
              </article>
            );
          })}
        </section>
      </section>
    </main>
  );
}
