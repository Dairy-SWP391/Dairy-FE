/* eslint-disable @typescript-eslint/no-unused-vars */
import MillionLint from "@million/lint";
import { defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
const viteConfig: UserConfig = {
  plugins: [react()],
  server: {
    port: 3000,
    watch: {
      usePolling: true,
    },
  },
  css: {
    devSourcemap: true,
  },
  resolve: {
    alias: {
      "@apis": "/src/apis",
      "@assets": "/src/assets",
      "@components": "/src/components",
      "@constants": "/src/constants",
      "@contexts": "/src/contexts",
      "@db": "/src/db",
      "@hooks": "/src/hooks",
      "@layout": "/src/layout",
      "@pages": "/src/pages",
      "@types": "/src/types",
      "@styles": "/src/styles",
      "@utils": "/src/utils",
    },
  },
};
const plugins = [MillionLint.vite()];
export default defineConfig(viteConfig);
