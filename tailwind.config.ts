import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#05070D',
          900: '#0A0E1A',
          800: '#0F1526',
          700: '#161D33',
          600: '#212B47',
        },
        signal: {
          blue: '#3D6BFF',
          violet: '#8B5CF6',
          cyan: '#22D3EE',
        },
        paper: '#F7F8FC',
        mist: '#A6ADC4',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      backgroundImage: {
        'mesh-gradient':
          'radial-gradient(60% 50% at 20% 20%, rgba(61,107,255,0.25) 0%, transparent 60%), radial-gradient(50% 40% at 85% 15%, rgba(139,92,246,0.22) 0%, transparent 60%), radial-gradient(45% 45% at 75% 80%, rgba(34,211,238,0.15) 0%, transparent 60%)',
        'grid-pattern':
          'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '48px 48px',
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 8s ease-in-out infinite',
        'spin-slow': 'spin 24s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(61,107,255,0.4), 0 0 32px rgba(61,107,255,0.25)',
        card: '0 4px 24px rgba(5,7,13,0.4)',
      },
    },
  },
  plugins: [],
};

export default config;
