/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./layouts/**/*.html",
    "./content/**/*.{md,html}",
    "./data/**/*.{yml,yaml,json}",
    "./i18n/**/*.{yml,yaml}",
    "./assets/**/*.{js,ts,jsx,tsx,vue,svelte}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Sora', 'sans-serif'],
        mono: ['Space Grotesk', 'monospace'],
      },
      colors: {
        primary: {
          DEFAULT: '#06b6d4',
          dark: '#0891b2',
          glow: 'rgba(6, 182, 212, 0.45)'
        },
        dark: {
          bg: '#0b1224',
          card: '#11182d',
          border: '#1f2a44'
        }
      },
      boxShadow: {
        glow: '0 20px 80px -24px rgba(6, 182, 212, 0.55)',
      },
      backgroundImage: {
        'grid': "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)",
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}
