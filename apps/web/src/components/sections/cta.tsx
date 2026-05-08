'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CTA(): JSX.Element {
  return (
    <section className="py-20 md:py-32 w-full bg-gradient-to-r from-dark-800 to-dark-900 relative overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-conic from-ember/10 via-transparent to-gold/10" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -right-32 -top-32 w-64 h-64 bg-gradient-radial from-ember/20 to-transparent rounded-full"
        />
      </div>

      <div className="container-px mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          <h2 className="text-4xl md:text-5xl font-gothic font-bold text-ash-light">
            Ready to Begin Your Journey?
          </h2>

          <p className="text-lg text-ash max-w-2xl mx-auto">
            Join thousands of adventurers who have used our guides to master Dark Souls I. Create
            your account to unlock advanced guides, track your progress, and sync across devices.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link
              href="/auth/register"
              className="px-8 py-4 bg-gradient-to-r from-ember to-ember-light text-dark-bg font-bold rounded-lg hover:shadow-ember-glow transition-all duration-300 hover:scale-105 text-center"
            >
              Create Account
            </Link>
            <Link
              href="/guides"
              className="px-8 py-4 border-2 border-gold text-gold hover:bg-gold/10 font-bold rounded-lg transition-all duration-300 text-center"
            >
              Continue as Guest
            </Link>
          </div>

          {/* Features highlight */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12">
            {[
              { icon: '📊', label: 'Progress Tracking' },
              { icon: '☁️', label: 'Cloud Sync' },
              { icon: '🎮', label: 'Multi-Platform' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <p className="text-sm text-ash">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
