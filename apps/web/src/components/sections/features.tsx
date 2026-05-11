'use client';

import { motion } from 'framer-motion';
import { Zap, Book, Target, Lock, Cloud, Trophy } from 'lucide-react';

const features = [
  {
    icon: Book,
    title: 'Comprehensive Guides',
    description: 'Detailed walkthroughs for every area, boss, and hidden secret'
  },
  {
    icon: Target,
    title: 'Boss Strategies',
    description: 'Proven strategies and attack patterns for every encounter'
  },
  {
    icon: Trophy,
    title: 'Build Planner',
    description: 'Create optimized character builds for PvE and PvP'
  },
  {
    icon: Lock,
    title: 'Progress Tracking',
    description: 'Track your completion and sync progress across devices'
  },
  {
    icon: Cloud,
    title: 'Cloud Sync',
    description: 'Your progress saved securely in the cloud'
  },
  {
    icon: Zap,
    title: 'Instant Access',
    description: 'Fast, responsive guides optimized for all devices'
  }
];

export default function Features(): JSX.Element {
  return (
    <section className="py-20 md:py-32 w-full bg-dark-800 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-radial from-ember/30 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container-px mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-gothic font-bold text-ash-light mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-ash max-w-2xl mx-auto">
            Everything you need to master Dark Souls I
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="glass-morphism p-8 rounded-lg hover:shadow-ember-glow transition-all duration-300 hover:scale-105 group"
              >
                <div className="mb-4 inline-block p-3 bg-ember/10 rounded-lg group-hover:bg-ember/20 transition-colors">
                  <Icon className="w-6 h-6 text-ember" />
                </div>
                <h3 className="text-xl font-bold text-ash-light mb-3 font-gothic">
                  {feature.title}
                </h3>
                <p className="text-ash text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
