import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        baseBackgroundL0: "rgb(14 15 20 / var(--tw-bg-opacity))",
        greenBackgroundTransparent: "rgba(0, 194, 120, 0.08)",
        redBackgroundTransparent: "rgba(234, 56, 59, 0.12)",
      },
      borderColor: {
        greenBorder: "rgba(0, 194, 120, 0.4)",
        redBorder: "rgba(234, 56, 59, 0.5)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide"), require("tailwind-scrollbar")],
};
export default config;
