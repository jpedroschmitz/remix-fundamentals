const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ff2148",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    plugin(function ({ addVariant }) {
      addVariant("not-last-child", "&:not(:last-child)");
    }),
  ],
};
