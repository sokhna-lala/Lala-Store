/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // pour Vite (ou le fichier racine HTML)
    "./src/**/*.{js,ts,jsx,tsx}", // pour tous les fichiers React dans src/
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          100: '#f7f3ef',
          400: '#d4b18f',
          600: '#b48b63', // couleur principale
        },
      },
    },
  },
  plugins: [],
};
