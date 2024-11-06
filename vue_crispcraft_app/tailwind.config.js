/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Bebas Neue", "sans-serif"],
        bebas: ["Bebas Neue", "sans-serif"],
        rubik: ["Rubik", "sans-serif"],
      },
      colors: {
        myPrimaryColor: "var(--primary-color)",
        mySecondaryColor: "var(--secondary-color)",
      },
    },
  },
  plugins: [require("tailwindcss-primeui")],
  darkMode: ["selector", '[class*="app-dark"]'],
  // darkMode: ["class", '[class*="app-dark"]'],
};
