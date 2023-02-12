/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        lato: ["Lato", "sans-serif"],
      },
      colors: {
        'tb': '#1B1C1E',  // total black
        'cb': '#1F1F1F',  // comfy black
        'lb': '#2B2B2B',  // light black
        'sg': '#303030',  // subtle grey
      },
      backgroundImage:{
        'bubbles': "url('/src/images/bubbleslg.png')"
      },
    },
  },
  plugins: [],
};
