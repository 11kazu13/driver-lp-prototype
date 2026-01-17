/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#001F3D', // Navy Blue - Main
        brand: '#2557a7', // Indeed Blue
        accent: {
          DEFAULT: '#ED985F', // Orange - Accent Strong
          light: '#F7B980', // Light Orange - Accent Weak
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
