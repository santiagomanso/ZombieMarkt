/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      gridTemplateRows: {
        // Complex site-specific row configuration
        layout: '150px minmax(150px, 1fr) 150px',
      },
    },
  },
  plugins: [],
}
