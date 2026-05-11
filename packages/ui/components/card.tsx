'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = true }: CardProps): JSX.Element {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : undefined}
      className={clsx(
        'bg-dark-800 rounded-lg border border-dark-700 p-6',
        { 'hover:border-gold transition-colors': hover },
        className
      )}
    >
      {children}
    </motion.div>
  );
}
