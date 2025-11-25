/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
          600: '#475569',
          accent: '#10b981',
          accentHover: '#059669',
          text: '#e2e8f0'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}