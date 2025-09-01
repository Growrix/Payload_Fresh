/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'space-grotesk': ['var(--font-space-grotesk)', 'sans-serif'],
        'inter': ['var(--font-inter)', 'sans-serif'],
      },
      colors: {
        background: '#0B0B0B',
        panel: '#181818',
        surface: '#1A1A1A',
        accent: '#9C6BFF',
        text: '#FFFFFF',
        subtext: '#B0B0B0',
      },
    },
  },
  plugins: [],
}
