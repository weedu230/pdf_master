/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        'colors': 'color, background-color, border-color, text-decoration-color, fill, stroke',
      }
    },
  },
  plugins: [],
  safelist: [
    'animate-fade-in-up',
    'animate-fade-in-up-delay-1',
    'animate-fade-in-up-delay-2',
    'animate-fade-in-up-delay-3',
    'animate-pulse-glow',
    'animate-gradient',
  ],
}
