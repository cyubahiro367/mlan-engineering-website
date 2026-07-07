/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './assets/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        gold: { DEFAULT: '#E59D2F', deep: '#C97F1B', pale: '#F4C976' },
        ink: { DEFAULT: '#15130F', 2: '#1D1A14', 3: '#26221A' },
        bone: { DEFAULT: '#EFE9DA', soft: '#B8AF9C' },
        paper: { DEFAULT: '#F5F2EA', 2: '#EAE4D4', 3: '#DDD5BE' },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
