import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem", // her ekranda container'a padding ekler
      screens: {
        sm: "100%", // küçük ekranlarda (mobil) tam genişlik
        md: "728px", // orta ekranlarda (tablet) 728px genişlik
        lg: "984px", // geniş ekranlarda (dizüstü) 984px genişlik
        xl: "1200px", // büyük ekranlarda (masaüstü) 1200px genişlik
        "2xl": "1400px", // daha büyük ekranlarda 1400px genişlik
      },
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
