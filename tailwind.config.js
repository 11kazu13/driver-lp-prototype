/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#15803d', // Deep Green (Brand)
        brand: '#15803d', // Mapping brand to primary for compatibility
        accent: {
          DEFAULT: '#f97316', // Vivid Orange
          light: '#fdba74', // Lighter Orange
        },
        base: '#E6E6E6', // Light Gray - Base
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
      },
      maxWidth: {
        'mobile': '480px',
      }
    },
  },
  plugins: [],
}
