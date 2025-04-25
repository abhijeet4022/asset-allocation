/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fff9eb',
          100: '#fff3c7',
          200: '#ffe68a',
          300: '#ffd24d',
          400: '#ffba24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#783610',
          950: '#431c06',
        },
      },
    },
  },
  plugins: [],
};