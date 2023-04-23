/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}",
  ],
  darkMode: "class",
  theme: {
    animation: {
      "spin-fast": "spin 0.35s linear infinite",
    },
    extend: {
      colors: {
        primary: {
          light: "#2c3b54",
          DEFAULT: "#1d2b42",
          dark: "#182539",
        },
        accent: {
          light: "#2dd4bf",
          DEFAULT: "#14b8a6",
          dark: "#0d9488",
        },
        dark: {
          DEFAULT: "#201818",
        },
        calendar: {
          bg: "rgba(15,12,12,0.84)",
          head: "#4a262766",
        },
      },
    },
  },
  plugins: [],
};
