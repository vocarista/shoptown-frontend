const { sage, mint } = require('@radix-ui/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx,ts,jsx}"],
  theme: {
    extend: {
      colors: {
        ...sage,
        ...mint,
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};