/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fef3e7',
          100: '#fde5cc',
          200: '#fbc999',
          300: '#f8a561',
          400: '#f5822e',
          500: '#e65c00', // vibrant African sunset radio orange
          600: '#c74400',
          700: '#9d3204',
          800: '#7c280b',
          900: '#64220c',
          950: '#360e03',
        },
        radio: {
          dark: '#0f172a',
          surface: '#1e293b',
          card: '#162032',
          accent: '#22c55e', // live green
        }
      },
      animation: {
        'pulse-fast': 'pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'equalizer': 'equalizer 1.2s ease-in-out infinite',
      },
      keyframes: {
        equalizer: {
          '0%, 100%': { height: '15%' },
          '50%': { height: '100%' },
        }
      }
    },
  },
  plugins: [],
}
