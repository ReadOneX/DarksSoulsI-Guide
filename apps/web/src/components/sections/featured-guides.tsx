'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const guides = [
  {
    id: '1',
    title: 'Getting Started',
    description: 'Begin your journey through Lordran with essential tips',
    difficulty: 'Beginner',
    type: 'Walkthrough'
  },
  {
    id: '2',
    title: 'Boss Battle Guide',
    description: 'Master strategies for defeating all bosses',
    difficulty: 'Intermediate',
    type: 'Boss Guide'
  },
  {
    id: '3',
    title: 'Optimized Builds',
    description: 'Create powerful character builds for any playstyle',
    difficulty: 'Advanced',
    type: 'Build Guide'
  }
];

export default function FeaturedGuides(): JSX.Element {
  return (
    <section className="py-20 md:py-32 w-full bg-dark-bg relative overflow-hidden">
      <div className="container-px mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-gothic font-bold text-ash-light mb-4">
            Featured Guides
          </h2>
          <p className="text-lg text-ash max-w-2xl mx-auto">
            Popular guides to help you on your adventure
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {guides.map((guide, index) => (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="glass-morphism rounded-lg overflow-hidden hover:shadow-gold-glow transition-all duration-300 group cursor-pointer"
            >
              {/* Card header */}
              <div className="h-32 bg-gradient-to-br from-ember/20 to-gold/20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent" />
                </div>
              </div>

              {/* Card content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-ember/10 text-ember text-xs font-bold rounded-full">
                    {guide.type}
                  </span>
                  <span className="px-3 py-1 bg-gold/10 text-gold text-xs font-bold rounded-full">
                    {guide.difficulty}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-ash-light font-gothic mb-2">
                  {guide.title}
                </h3>
                <p className="text-ash text-sm mb-4">{guide.description}</p>
                <Link
                  href={`/guides/${guide.id}`}
                  className="inline-block text-gold hover:text-gold-light text-sm font-bold transition-colors"
                >
                  Read Guide →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <Link
            href="/guides"
            className="inline-block px-8 py-3 border-2 border-gold text-gold hover:bg-gold/10 font-bold rounded-lg transition-all duration-300"
          >
            View All Guides
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
