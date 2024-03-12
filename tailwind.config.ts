import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: "#10CA8B",
      secondary: "#2F4858",
      "dark-accent": "#3F3F46",
      "white-light": "#D4D4D8",
    },
    extend: {
      fontFamily: {
        kode: ["Kode Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
