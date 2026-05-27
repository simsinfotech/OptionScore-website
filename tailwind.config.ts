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
        background: "#010101",
        card: "#1C1C24",
        "card-border": "rgba(255,255,255,0.08)",
        accent: {
          cyan: "#00BCD4",
          lime: "#ECFF8C",
          violet: "#7C3AED",
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
        "glow-violet": "0 0 20px rgba(124,58,237,0.3)",
        "glow-lime": "0 0 20px rgba(236,255,140,0.3)",
      },
      letterSpacing: {
        heading: "0.15em",
      },
      borderRadius: {
        none: "0px",
      },
      keyframes: {
        "border-spin": {
          "0%": { "--border-angle": "0deg" },
          "100%": { "--border-angle": "360deg" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "border-spin": "border-spin 4s linear infinite",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
