/** @type {import('tailwindcss').Config} */
const ink = (n) => `rgb(var(--ink-${n}) / <alpha-value>)`;

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
        surface: "rgb(var(--surface) / <alpha-value>)",
        raised: "rgb(var(--raised) / <alpha-value>)",
        ink: {
          50: ink(50),
          100: ink(100),
          200: ink(200),
          300: ink(300),
          400: ink(400),
          500: ink(500),
          600: ink(600),
          700: ink(700),
          800: ink(800),
          900: ink(900),
          950: ink(950),
        },
        brand: {
          50: "#eff2ff",
          100: "#e0e6ff",
          200: "#c6d0ff",
          300: "#a3aeff",
          400: "#8184fc",
          500: "#6a5df6",
          600: "#5a3fea",
          700: "#4d30ce",
          800: "#402aa6",
          900: "#372a83",
          950: "#211a4d",
        },
        gold: {
          50: "#fdfaef",
          100: "#fbf2d4",
          200: "#f6e2a0",
          300: "#f0cb62",
          400: "#eab435",
          500: "#dd9718",
          600: "#c37312",
          700: "#a25213",
          800: "#844116",
          900: "#6e3616",
        },
      },
      boxShadow: {
        soft: "0 1px 2px rgb(16 17 25 / 0.04), 0 8px 24px -14px rgb(16 17 25 / 0.20)",
        lift: "0 2px 4px rgb(16 17 25 / 0.05), 0 18px 40px -20px rgb(16 17 25 / 0.30)",
        glow: "0 0 0 1px rgb(106 93 246 / 0.16), 0 12px 34px -14px rgb(106 93 246 / 0.45)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
