import type { Config } from "tailwindcss";

const Colors = {
  primary: "#10CA8B",
  secondary: "#2F4858",
  "dark-accent": "#3F3F46",
  "white-light": "#D4D4D8",
  "inactive-dots-color": "rgba(255,255,255,0.1)",
};

export { Colors };

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
      "inactive-dots-color": "var(--inactive-dots-color)",
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
