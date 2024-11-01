/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
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
