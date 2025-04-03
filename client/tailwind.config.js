/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      mobile: "375px",
      laptop: "1440px",
    },
    fontFamily: {
      playfairDisplay: ["Playfair Display"],
      roboto: ["Roboto"],
      caveat: ["Caveat"],
    },
    extend: {
      colors: {
        text26: "#262626",
        background: "#FFFAE9",
        btnLogin: "#2E2828",
        placeholder: "#989898",
      },
    },
  },
  plugins: [],
};
