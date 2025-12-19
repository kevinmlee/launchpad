/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'merriweather': ['Merriweather', 'serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      colors: {
        'space-dark': '#0a0e27',
        'space-blue': '#1a1f3a',
        'moon-gray': '#c9d1d9',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'orbit': 'orbit 8s linear infinite',
        'floating': 'floating 5s linear infinite',
        'blink': 'blink 4s linear infinite',
        'glow': 'glow 5s linear infinite',
        'spin-12': 'spin 12s linear infinite',
        'spin-7': 'spin 7.4s linear infinite',
        'spin-3': 'spin 3s linear infinite',
      },
      keyframes: {
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        floating: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(2px) translateX(1px)', boxShadow: 'inset -20px 0 20px #bfbfbf, 0 0 8px #eaeaea' },
          '100%': { transform: 'translateY(0px)' },
        },
        blink: {
          '5%, 10%': { height: '1px' },
          '10%': { height: '15%' },
        },
        glow: {
          '0%': { opacity: '1' },
          '50%': { opacity: '0.6' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
