/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        blue: "#BDCCFF",
        secondary_blue: "#8C95C0",
        pink: "#FF78C4",
        white: "#FFFF",
      },
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
        Amce: ["Acme", "sans-serif"],
        krd: ["krd"],
      },
      fontWeight: {
        300: 300,
        400: 400,
        500: 500,
        600: 600,
        700: 700,
        800: 800,
      },
    },
  },
  plugins: [],
};
