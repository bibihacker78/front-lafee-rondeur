/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
  extend: {
    colors: {
      rose: {
        DEFAULT: "#ff008c",      // Rose principal
        light: "#ff008c22",      // Ombres
        pastel: "#ff008c15",     // Arrière-plans
        deep: "#cc317e",         // Hover
      },
    },
    boxShadow: {
      rose: "0 4px 20px rgba(255, 0, 140, 0.12)",
    }
  }
},
  plugins: [],
}
