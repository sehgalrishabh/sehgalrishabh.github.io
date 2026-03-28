import type { Config } from "tailwindcss";

// Named export kept for DotGrid/constants.tsx compatibility
export const Colors = {
  primary: "#10CA8B",
  secondary: "#2F4858",
  "dark-accent": "#1a1a1a",
  "white-light": "#D4D4D8",
  "inactive-dots-color": "rgba(255,255,255,0.1)",
};

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#10CA8B",
        secondary: "#2F4858",
        "dark-accent": "#1a1a1a",
        "surface": "#111111",
        "bg": "#0a0a0a",
        "white-light": "#D4D4D8",
        "muted": "#6b6b6b",
        "inactive-dots-color": "rgba(255,255,255,0.1)",
      },
      fontFamily: {
        kode: ["Kode Mono", "monospace"],
      },
      fontSize: {
        "display": ["clamp(3.5rem, 9vw, 9rem)", { lineHeight: "0.95" }],
        "display-md": ["clamp(2.5rem, 5vw, 5rem)", { lineHeight: "1.05" }],
      },
    },
  },
  plugins: [],
};

export default config;
