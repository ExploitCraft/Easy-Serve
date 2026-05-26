/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          deep:    "#070a10",
          base:    "#0e1117",
          surface: "#111620",
          muted:   "#0b0f18",
          border:  "#1e2535",
          subtle:  "#1a2030",
        },
        text: {
          primary:   "#dde4ee",
          secondary: "#8099b0",
          muted:     "#4a5a70",
          dim:       "#3a4a5a",
        },
        teal: {
          DEFAULT: "#22d3a8",
          dark:    "#16a97e",
          bg:      "#0f2820",
          border:  "#1a4030",
        },
        amber: { DEFAULT: "#f0a020" },
        red:   { DEFAULT: "#e05555" },
      },
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
        mono: ["JetBrains Mono", "Consolas", "monospace"],
      },
      borderRadius: {
        sm: "5px",
        md: "7px",
        lg: "10px",
        xl: "12px",
      },
    },
  },
  plugins: [],
};
