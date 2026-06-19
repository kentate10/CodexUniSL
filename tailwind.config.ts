import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#063970",
          blue: "#0b5ea8",
          sky: "#e9f4ff",
          gold: "#f5b027",
          ink: "#0e1726",
          muted: "#526173",
          line: "#d8e4f2"
        }
      },
      boxShadow: {
        soft: "0 18px 55px rgba(6, 57, 112, 0.14)"
      }
    }
  },
  plugins: []
};

export default config;
