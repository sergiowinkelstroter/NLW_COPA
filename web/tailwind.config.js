/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["src/**/*.tsx"],
  theme: {
    extend: {
      backgroundImage: {
        app: "url(/app-bg.png)",
      },
    },
  },
  plugins: [],
};
