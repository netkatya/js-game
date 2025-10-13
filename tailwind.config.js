/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        scaleBounce: {
          '0%, 80%, 100%': {
            transform: 'scale(0.5)',
            opacity: '0.6',
          },
          '40%': {
            transform: 'scale(1.2)',
            opacity: '1',
          },
        },
        splash: {
          '0%': {
            opacity: '0.6',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '0',
            transform: 'scale(2)',
          },
          '100%': {
            opacity: '0',
            transform: 'scale(2.5)',
          },
        },
      },
      animation: {
        scaleBounce: 'scaleBounce 1.2s ease-in-out infinite',
        splash: 'splash 1.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};