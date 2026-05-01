import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#101828',
        mist: '#f4f7fb',
        accent: '#0f766e',
        warn: '#b42318',
      },
      boxShadow: {
        card: '0 16px 40px rgba(16, 24, 40, 0.08)',
      },
    },
  },
  plugins: [],
};

export default config;
