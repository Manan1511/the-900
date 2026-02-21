/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#00ff66",
        "primary-hover": "#00CC52",
        "neon-green": "#00FF66",
        "background-light": "#f6f8f6",
        "background-dark": "#0b1c12",
        "surface-dark": "#1a2c20",
        "surface-lighter": "#1c3825",
        "text-light": "#ffffff",
        "text-muted": "#a3b8ad",
        "border-subtle": "#25422e",
      },
      fontFamily: {
        "display": ["Manrope", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1rem",
        "full": "9999px"
      },
      animation: {
        'pulse-slow': 'pulse-ring 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-slow-opacity': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in-fast': 'fadeIn 0.5s ease-in-out forwards',
        'breathe': 'breathe 8s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0)' }
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', boxShadow: '0 0 0 0 rgba(0, 255, 102, 0.7)' },
          '70%': { transform: 'scale(1)', boxShadow: '0 0 0 20px rgba(0, 255, 102, 0)' },
          '100%': { transform: 'scale(0.8)', boxShadow: '0 0 0 0 rgba(0, 255, 102, 0)' }
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1.5)', opacity: '1' },
          '50%': { transform: 'scale(1)', opacity: '0.8' },
        }
      }
    },
  },
  plugins: [],
}
