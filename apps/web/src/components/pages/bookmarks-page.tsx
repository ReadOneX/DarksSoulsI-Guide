'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Bookmark, CloudOff, Lock } from 'lucide-react';
import { guideCards } from '@/lib/game-data';

export default function BookmarksPageContent(): JSX.Element {
  const savedGuides = guideCards.slice(0, 4);

  return (
    <main className="min-h-screen bg-dark-bg pt-24 text-ash-light">
      <section className="container-px mx-auto max-w-6xl py-10">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-sm font-bold uppercase tracking-widest text-ember">Bookmark Collection</p>
          <h1 className="mt-3 text-4xl font-bold md:text-6xl">Your run shelf.</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-ash">
            Saved guides are available locally for guests. Registered users unlock cloud bookmark
            sync and cross-device collections.
          </p>
        </motion.div>

        <div className="mt-8 rounded-lg border border-gold/30 bg-gold/10 p-4 text-sm text-gold">
          <CloudOff className="mr-2 inline h-4 w-4" />
          Guest mode: bookmarks are local only until account sync is enabled.
        </div>

        <section className="mt-8 grid gap-5 md:grid-cols-2">
          {savedGuides.map((guide, index) => (
            <motion.article
              key={guide.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              className="glass-morphism rounded-lg p-5"
            >
              <div className="flex items-center justify-between">
                <Bookmark className="h-5 w-5 text-ember" />
                {guide.access === 'registered' && <Lock className="h-4 w-4 text-gold" />}
              </div>
              <h2 className="mt-4 text-xl font-bold text-ash-light">{guide.title}</h2>
              <p className="mt-3 text-sm leading-6 text-ash">{guide.description}</p>
              <Link href="/guides" className="mt-5 inline-block text-sm font-bold text-gold">
                Open in Guide Explorer
              </Link>
            </motion.article>
          ))}
        </section>
      </section>
    </main>
  );
}
