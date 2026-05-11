'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero(): JSX.Element {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-dark-bg pt-20 md:pt-32">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-radial from-ember/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-conic from-ember/10 via-transparent to-crimson/10" />
      </div>

      <div className="container-px mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 text-center"
        >
          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-5xl md:text-7xl font-gothic font-bold tracking-tight"
          >
            <span className="block text-ash-light dark:text-ash-light">
              Dark Souls I
            </span>
            <span className="block mt-4 bg-gradient-to-r from-ember via-gold to-ember bg-clip-text text-transparent animate-pulse-ember">
              Complete Guide
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-ash mx-auto max-w-2xl font-light"
          >
            Master every boss, discover hidden secrets, and conquer your journey through Lordran
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
          >
            <Link
              href="/guides"
              className="px-8 py-4 bg-gradient-to-r from-ember to-ember-light text-dark-bg font-bold rounded-lg hover:shadow-ember-glow transition-all duration-300 hover:scale-105 text-center"
            >
              Explore Guides
            </Link>
            <Link
              href="/auth/login"
              className="px-8 py-4 border-2 border-gold text-gold hover:bg-gold/10 font-bold rounded-lg transition-all duration-300 text-center"
            >
              Sign In
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="grid grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto"
          >
            {[
              { label: 'Bosses', value: '26+' },
              { label: 'Areas', value: '10+' },
              { label: 'Items', value: '500+' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-gold mb-2">{stat.value}</div>
                <div className="text-sm text-ash">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Animated elements */}
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gold"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
