/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        craft: {
          dark: '#0B0B0B',
          matte: '#141414',
          card: '#1C1C1E',
          copper: '#D97706',
          copperLight: '#F59E0B',
          cream: '#F5F5F0',
          hop: '#10B981',
          forest: '#064E3B'
        }
      }
    },
  },
  plugins: [],
}