import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: "var(--primary)",
      secondary: "var(--secondary)",
      "dark-accent": "var(--dark-accent)",
      "white-light": "var(--white-light)",
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
