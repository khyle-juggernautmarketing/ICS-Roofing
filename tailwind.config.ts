import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ics: {
          primary: '#ea4a2b',
          'primary-dark': '#c73d22',
          'primary-light': '#fef0ec',
          black: '#0a0a0a',
          gray: {
            50: '#f9fafb',
            100: '#f3f4f6',
            200: '#e5e7eb',
            400: '#9ca3af',
            600: '#4b5563',
            800: '#1f2937',
            900: '#111827',
            950: '#030712',
          },
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 24px -4px rgba(10, 10, 10, 0.08)',
        'card-lg': '0 20px 50px -12px rgba(10, 10, 10, 0.15)',
      },
      backgroundImage: {
        'gradient-ics': 'linear-gradient(135deg, #ea4a2b 0%, #c73d22 100%)',
        'gradient-hero': 'linear-gradient(135deg, #0a0a0a 0%, #1f2937 50%, #111827 100%)',
      },
    },
  },
  plugins: [],
}
export default config
