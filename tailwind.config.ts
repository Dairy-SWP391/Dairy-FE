import { nextui } from "@nextui-org/react";
import { Config } from "tailwindcss/types/config";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [nextui()],
};

export default config;
