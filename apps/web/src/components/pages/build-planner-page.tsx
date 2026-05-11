'use client';

import { motion } from 'framer-motion';
import { Lock, Swords } from 'lucide-react';
import { buildCards } from '@/lib/game-data';

export default function BuildPlannerPage(): JSX.Element {
  return (
    <main className="min-h-screen bg-dark-bg pt-24 text-ash-light">
      <section className="container-px mx-auto max-w-7xl py-10">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-sm font-bold uppercase tracking-widest text-ember">Build Planner</p>
          <h1 className="mt-3 text-4xl font-bold md:text-6xl">Plan builds with real constraints.</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-ash">
            Compare level targets, stat routes, equipment packages, playstyles, and guest locks for
            advanced PvP and optimized route content.
          </p>
        </motion.div>

        <section className="mt-8 grid gap-5 lg:grid-cols-3">
          {buildCards.map((build, index) => (
            <motion.article
              key={build.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-morphism rounded-lg p-6"
            >
              <div className="flex items-center justify-between">
                <Swords className="h-6 w-6 text-ember" />
                {build.access === 'registered' && <Lock className="h-5 w-5 text-gold" />}
              </div>
              <p className="mt-5 text-xs font-bold uppercase tracking-widest text-gold">
                Level {build.level} / {build.focus}
              </p>
              <h2 className="mt-2 text-2xl font-bold text-ash-light">{build.name}</h2>
              <div className="mt-5 rounded-lg bg-dark-900 p-4">
                <p className="text-sm text-ash">Stats</p>
                <p className="mt-1 font-bold text-ash-light">{build.stats}</p>
              </div>
              <div className="mt-3 rounded-lg bg-dark-900 p-4">
                <p className="text-sm text-ash">Equipment</p>
                <p className="mt-1 font-bold text-ash-light">{build.equipment}</p>
              </div>
            </motion.article>
          ))}
        </section>
      </section>
    </main>
  );
}
