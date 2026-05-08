'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LoginPage(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement login logic
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <main className="min-h-screen w-full bg-dark-bg flex items-center justify-center pt-20 pb-20">
      <div className="w-full max-w-md px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-morphism p-8 rounded-lg"
        >
          <h1 className="text-3xl font-gothic font-bold text-ash-light mb-2 text-center">
            Welcome Back
          </h1>
          <p className="text-ash text-center mb-8">Sign in to your account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-ash-light text-sm font-medium mb-2">
                Email or Username
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email or username"
                className="w-full px-4 py-2 bg-dark-800 border border-dark-600 text-ash-light rounded-lg focus:outline-none focus:border-ember transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-ash-light text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 bg-dark-800 border border-dark-600 text-ash-light rounded-lg focus:outline-none focus:border-ember transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 bg-gradient-to-r from-ember to-ember-light text-dark-bg font-bold rounded-lg hover:shadow-ember-glow transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-dark-600">
            <p className="text-ash text-sm text-center">
              Don't have an account?{' '}
              <Link href="/auth/register" className="text-gold hover:text-gold-light font-medium">
                Create one
              </Link>
            </p>
            <p className="text-ash text-sm text-center mt-2">
              <Link href="/" className="text-gold hover:text-gold-light">
                Continue as guest
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
