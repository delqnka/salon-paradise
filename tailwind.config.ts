import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#9B7FD4",
        "primary-light": "#C4A8E8",
        accent: "#EC4899",
      },
      fontFamily: {
        script: ["Dancing Script", "cursive"],
        heading: ["Playfair Display", "serif"],
        body: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
