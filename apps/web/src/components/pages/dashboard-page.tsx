'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function DashboardPage(): JSX.Element {
  return (
    <main className="min-h-screen w-full bg-dark-bg pt-20">
      <div className="container-px mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-20"
        >
          <h1 className="text-4xl md:text-5xl font-gothic font-bold text-ash-light mb-4">
            Dashboard
          </h1>
          <p className="text-lg text-ash">
            Your progress tracking and account settings - coming soon
          </p>
        </motion.div>
      </div>
    </main>
  );
}
