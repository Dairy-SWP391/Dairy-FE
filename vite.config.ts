import { UserConfig, defineConfig } from "vite";
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
};

export default defineConfig(viteConfig);
