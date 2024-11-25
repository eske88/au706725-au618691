import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        genericGradient: {
          100: '#346E78', // Darkest shade
          200: '#2D8D8B',
          300: '#42AC90',
          400: '#71CA89',
          500: '#B0E37B',
          600: '#F9F871'  // Lightest shade
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
