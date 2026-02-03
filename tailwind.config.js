/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Isto garante que ele procure em todas as subpastas de src
  ],
  theme: {
    extend: {
      colors: {
        brand: '#D4C3A3', // A cor bege dos botões do design
      }
    },
  },
  plugins: [],
}