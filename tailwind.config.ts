import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#1472D2",
          50: "#F0F7FF",
          100: "#E0EFFE",
          200: "#C7E1FE",
          300: "#A4CCFD",
          400: "#7FB3FB",
          500: "#5B99F7",
          600: "#2B7FD8",
          700: "#1472D2",
          800: "#0E5AA8",
          900: "#0A3D7A",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#E65D24",
          50: "#FFF5EB",
          100: "#FFE8D6",
          200: "#FDD0AE",
          300: "#FCB37D",
          400: "#FB8F4A",
          500: "#F56830",
          600: "#E65D24",
          700: "#C73D11",
          800: "#9D2A0B",
          900: "#6B1A04",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#D24545",
          50: "#FEF2F2",
          100: "#FEE2E2",
          200: "#FECACA",
          300: "#FCA5A5",
          400: "#F87171",
          500: "#EF4444",
          600: "#D24545",
          700: "#B91C1C",
          800: "#7F1D1D",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        destructive: {
          DEFAULT: "#DC2626",
          foreground: "#FFFFFF",
        },
        trade: {
          plombier: "#1472D2",
          pisciniste: "#0891B2",
          paysagiste: "#15803D",
          electricien: "#EA580C",
          demenageur: "#8B5CF6",
        },
      },
      fontFamily: {
        sans: ["Poppins", "system-ui", "sans-serif"],
        heading: ["Playfair Display", "Poppins", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
