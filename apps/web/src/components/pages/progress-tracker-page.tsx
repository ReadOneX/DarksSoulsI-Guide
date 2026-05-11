'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Flame, Save } from 'lucide-react';
import { progressModules } from '@/lib/game-data';
import { useProgressStore } from '@/store/progress-store';
import { saveOfflineEntry } from '@/lib/offline-cache';

const bossChecklist = [
  { id: 'asylum-demon', label: 'Asylum Demon' },
  { id: 'taurus-demon', label: 'Taurus Demon' },
  { id: 'bell-gargoyles', label: 'Bell Gargoyles' },
  { id: 'capra-demon', label: 'Capra Demon' },
  { id: 'ornstein-smough', label: 'Ornstein and Smough' },
  { id: 'gwyn', label: 'Gwyn, Lord of Cinder' }
];

const areaChecklist = [
  { id: 'undead-asylum', label: 'Undead Asylum' },
  { id: 'firelink-shrine', label: 'Firelink Shrine' },
  { id: 'undead-burg', label: 'Undead Burg' },
  { id: 'undead-parish', label: 'Undead Parish' },
  { id: 'anor-londo', label: 'Anor Londo' },
  { id: 'kiln', label: 'Kiln of the First Flame' }
];

export default function ProgressTrackerPage(): JSX.Element {
  const { progress, updateProgress } = useProgressStore();
  const completedBosses = progress?.completedBosses ?? [];
  const discoveredAreas = progress?.discoveredAreas ?? [];

  const toggleBoss = (bossId: string): void => {
    const nextBosses = completedBosses.includes(bossId)
      ? completedBosses.filter((id) => id !== bossId)
      : [...completedBosses, bossId];
    updateProgress({ completedBosses: nextBosses });
  };

  const toggleArea = (areaId: string): void => {
    const nextAreas = discoveredAreas.includes(areaId)
      ? discoveredAreas.filter((id) => id !== areaId)
      : [...discoveredAreas, areaId];
    updateProgress({ discoveredAreas: nextAreas });
  };

  const saveSnapshot = async (): Promise<void> => {
    await saveOfflineEntry('progress-snapshot', progress);
  };

  return (
    <main className="min-h-screen bg-dark-bg pt-24 text-ash-light">
      <section className="container-px mx-auto max-w-7xl py-10">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-sm font-bold uppercase tracking-widest text-ember">Progress Tracker</p>
          <h1 className="mt-3 text-4xl font-bold md:text-6xl">Track the run, not the chaos.</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-ash">
            Local progress works in guest mode and can be cached offline. Registered accounts can
            sync the same model to the REST API when backend credentials are configured.
          </p>
        </motion.div>

        <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {progressModules.map((module) => {
            const Icon = module.icon;
            return (
              <article key={module.label} className="glass-morphism rounded-lg p-5">
                <Icon className="mb-4 h-6 w-6 text-ember" />
                <h2 className="font-bold text-ash-light">{module.label}</h2>
                <p className="mt-2 text-xl font-bold text-gold">{module.value}</p>
              </article>
            );
          })}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="glass-morphism rounded-lg p-6">
            <h2 className="mb-5 flex items-center gap-2 text-xl font-bold text-ash-light">
              <Flame className="h-5 w-5 text-ember" />
              Boss Tracker
            </h2>
            <div className="space-y-3">
              {bossChecklist.map((boss) => {
                const checked = completedBosses.includes(boss.id);
                return (
                  <button
                    key={boss.id}
                    type="button"
                    onClick={() => toggleBoss(boss.id)}
                    className="flex w-full items-center justify-between rounded-lg border border-dark-600 bg-dark-900 px-4 py-3 text-left transition hover:border-ember"
                  >
                    <span className={checked ? 'text-ash-light' : 'text-ash'}>{boss.label}</span>
                    {checked ? (
                      <CheckCircle2 className="h-5 w-5 text-gold" />
                    ) : (
                      <Circle className="h-5 w-5 text-ash" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="glass-morphism rounded-lg p-6">
            <h2 className="mb-5 flex items-center gap-2 text-xl font-bold text-ash-light">
              <Flame className="h-5 w-5 text-ember" />
              Area Progression
            </h2>
            <div className="space-y-3">
              {areaChecklist.map((area) => {
                const checked = discoveredAreas.includes(area.id);
                return (
                  <button
                    key={area.id}
                    type="button"
                    onClick={() => toggleArea(area.id)}
                    className="flex w-full items-center justify-between rounded-lg border border-dark-600 bg-dark-900 px-4 py-3 text-left transition hover:border-gold"
                  >
                    <span className={checked ? 'text-ash-light' : 'text-ash'}>{area.label}</span>
                    {checked ? (
                      <CheckCircle2 className="h-5 w-5 text-gold" />
                    ) : (
                      <Circle className="h-5 w-5 text-ash" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <button
          type="button"
          onClick={saveSnapshot}
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-gold px-5 py-3 font-bold text-dark-bg"
        >
          <Save className="h-5 w-5" />
          Save Offline Snapshot
        </button>
      </section>
    </main>
  );
}
