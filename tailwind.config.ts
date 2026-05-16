import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Paleta tint de la app (light: rgba(10,126,164,1) = #0A7EA4)
        brand: {
          50: "#eaf4f9",
          100: "#cce4ef",
          200: "#9ac9df",
          300: "#67aece",
          400: "#3593bd",
          500: "#0a7ea4",
          600: "#096f91",
          700: "#075f7d",
          800: "#054d65",
          900: "#033c4f",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "SF Pro Text",
          "Inter",
          "system-ui",
          "sans-serif",
        ],
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, #3593bd 0%, #0a7ea4 50%, #054d65 100%)",
        "hero-radial":
          "radial-gradient(ellipse at top, rgba(10,126,164,0.10), transparent 60%)",
      },
    },
  },
  plugins: [],
};

export default config;
