export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0a0f0d',
        'card-bg': 'rgba(17, 24, 20, 0.7)',
        'accent-green': '#4ade80',
        'accent-earth': '#92724f',
      },
      backdropBlur: {
        'glass': '12px',
      },
    },
  },
  plugins: [],
}
