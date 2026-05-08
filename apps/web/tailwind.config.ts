import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
        gothic: ['Cinzel', 'serif']
      },
      colors: {
        // Dark Mode - Dark Souls Theme
        'dark-bg': '#0a0a0a',
        'dark-900': '#1a1a1a',
        'dark-800': '#2a2a2a',
        'dark-700': '#3a3a3a',
        'dark-600': '#4a4a4a',
        'ember': '#ff6b35',
        'ember-light': '#ff8c5a',
        'gold': '#d4af37',
        'gold-light': '#e8c547',
        'crimson': '#c82828',
        'ash': '#8b8b8b',
        'ash-light': '#a9a9a9',
        // Light Mode - Parchment Theme
        'parchment': '#f5f1e8',
        'parchment-light': '#fdfbf7',
        'warm-gold': '#e8d5b7',
        'soft-gold': '#d4af37',
        'light-ash': '#c9c9c9',
        'warm-gray': '#b8b8b8'
      },
      backgroundColor: {
        'gradient-dark': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
        'gradient-ember': 'linear-gradient(135deg, #ff6b35 0%, #ff8c5a 100%)',
        'gradient-light': 'linear-gradient(135deg, #f5f1e8 0%, #fdfbf7 100%)'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-ember-glow': 'radial-gradient(circle, rgba(255,107,53,0.3) 0%, transparent 70%)',
        'gradient-gold-glow': 'radial-gradient(circle, rgba(212,175,55,0.3) 0%, transparent 70%)'
      },
      boxShadow: {
        'ember-glow': '0 0 20px rgba(255, 107, 53, 0.5)',
        'ember-glow-lg': '0 0 40px rgba(255, 107, 53, 0.7)',
        'gold-glow': '0 0 20px rgba(212, 175, 55, 0.5)',
        'gold-glow-lg': '0 0 40px rgba(212, 175, 55, 0.7)',
        'inner-glow': 'inset 0 0 20px rgba(255, 107, 53, 0.1)',
        'neon': '0 0 10px currentColor'
      },
      animation: {
        'pulse-ember': 'pulse-ember 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'glow-ember': 'glow-ember 3s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'flicker': 'flicker 0.15s infinite',
        'shimmer': 'shimmer 2s infinite',
        'fade-in': 'fade-in 0.5s ease-in',
        'fade-out': 'fade-out 0.5s ease-out'
      },
      keyframes: {
        'pulse-ember': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' }
        },
        'glow': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(255, 107, 53, 0.5)'
          },
          '50%': {
            boxShadow: '0 0 40px rgba(255, 107, 53, 0.8)'
          }
        },
        'glow-ember': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(255, 107, 53, 0.3)'
          },
          '50%': {
            boxShadow: '0 0 30px rgba(255, 107, 53, 0.6)'
          }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'flicker': {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': { opacity: '1' },
          '20%, 24%, 55%': { opacity: '0.8' }
        },
        'shimmer': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' }
        },
        'fade-in': {
          'from': { opacity: '0' },
          'to': { opacity: '1' }
        },
        'fade-out': {
          'from': { opacity: '1' },
          'to': { opacity: '0' }
        }
      },
      opacity: {
        '5': '0.05',
        '10': '0.1',
        '15': '0.15'
      },
      spacing: {
        '128': '32rem',
        '144': '36rem'
      },
      borderRadius: {
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.25rem'
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ]
};

export default config;
