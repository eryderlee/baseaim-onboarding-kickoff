import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#2563eb",
          sky: "#87CEEB",
          deep: "#0A2E6E",
          medium: "#0052CC",
          bright: "#0066FF",
          azure: "#4FC3F7",
          light: "#6BB6FF",
          powder: "#B0E0E6",
        },
        bg: {
          ice: "#F8FCFF",
          "sky-tint": "#E1F5FE",
          cloud: "#E3F2FD",
        },
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
