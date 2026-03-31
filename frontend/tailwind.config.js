/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy:   { DEFAULT: "#0d1b2a", 800: "#112236", 700: "#1a3a5c" },
        amber:  { DEFAULT: "#f59e0b", light: "#fcd34d" },
        slate:  { 850: "#1e293b" },
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body:    ["'DM Sans'", "sans-serif"],
        mono:    ["'JetBrains Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
