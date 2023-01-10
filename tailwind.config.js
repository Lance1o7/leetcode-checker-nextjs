/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        "3xl": "0 35px 35px rgba(0, 0, 0, 0.25)",
        "4xl": [
          "0 30px 35px rgba(0, 0, 0, 0.25)",
          "0 40px 65px rgba(0, 0, 0, 0.15)",
        ],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      "light",
      "bumblebee",
      "emerald",
      "corporate",
      "garden",
      "lofi",
      "pastel",
      "fantasy",
      "cmyk",
      "autumn",
      "acid",
      "lemonade",
      "winter",
      {
        wireframe: {
          ...require("daisyui/src/colors/themes")["[data-theme=wireframe]"],
          ".problem": {
            "font-family": "Comic Sans MS, Comic Sans, cursive, Apple Garamond",
          },
        },
      },
    ],
  },
};
