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
        background: "#0D0D12",
        card: "#1C1C24",
        "card-border": "rgba(255,255,255,0.08)",
        accent: {
          cyan: "#00BCD4",
          lime: "#ECFF8C",
        },
        text: {
          primary: "#F9FAFB",
          secondary: "#D1D5DB",
          muted: "#6B7280",
        },
      },
      fontFamily: {
        urbanist: ["var(--font-urbanist)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(0,188,212,0.3)",
        "glow-lg": "0 0 40px rgba(0,188,212,0.4)",
      },
      letterSpacing: {
        heading: "0.15em",
      },
      borderRadius: {
        none: "0px",
      },
    },
  },
  plugins: [],
};

export default config;
