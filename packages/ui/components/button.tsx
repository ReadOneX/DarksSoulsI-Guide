'use client';

import { ReactNode } from 'react';
import { HTMLMotionProps, motion } from 'framer-motion';
import clsx from 'clsx';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className,
  disabled,
  children,
  ...props
}: ButtonProps): JSX.Element {
  const baseClasses = 'font-semibold rounded transition-all duration-300 flex items-center justify-center gap-2';

  const variantClasses = {
    primary: 'bg-gold text-dark-900 hover:bg-gold-light',
    secondary: 'bg-ember text-white hover:bg-ember-light',
    outline: 'border-2 border-gold text-gold hover:bg-gold hover:text-dark-900',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2 text-base',
    lg: 'px-8 py-3 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      disabled={disabled || isLoading}
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        { 'opacity-50 cursor-not-allowed': disabled || isLoading },
        className
      )}
      {...props}
    >
      {isLoading && <span className="animate-spin">⚙️</span>}
      {children}
    </motion.button>
  );
}
