/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

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
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        canvas: token('canvas'),
        surface: token('surface'),
        raised: token('raised'),
        ink: {
          DEFAULT: token('ink'),
          2: token('ink-2'),
          3: token('ink-3'),
        },
        accent: {
          DEFAULT: token('accent'),
          ink: token('accent-ink'),
        },
        line: 'rgb(var(--ink) / 0.09)',
      },
      transitionDuration: { DEFAULT: '150ms' },
      transitionTimingFunction: { DEFAULT: 'cubic-bezier(0.22, 1, 0.36, 1)' },
    },
  },
  plugins: [],
}
