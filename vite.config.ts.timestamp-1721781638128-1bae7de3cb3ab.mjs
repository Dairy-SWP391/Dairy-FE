// vite.config.ts
import { defineConfig } from "file:///D:/LearningMaterial/FPT/CN5/SWP/ahihi/Dairy-FE/node_modules/vite/dist/node/index.js";
import react from "file:///D:/LearningMaterial/FPT/CN5/SWP/ahihi/Dairy-FE/node_modules/@vitejs/plugin-react-swc/index.mjs";
var viteConfig = {
  plugins: [react()],
  server: {
    port: 3e3,
    watch: {
      usePolling: true
    }
  },
  css: {
    devSourcemap: true
  }
};
var vite_config_default = defineConfig(viteConfig);
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxMZWFybmluZ01hdGVyaWFsXFxcXEZQVFxcXFxDTjVcXFxcU1dQXFxcXGFoaWhpXFxcXERhaXJ5LUZFXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxMZWFybmluZ01hdGVyaWFsXFxcXEZQVFxcXFxDTjVcXFxcU1dQXFxcXGFoaWhpXFxcXERhaXJ5LUZFXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9MZWFybmluZ01hdGVyaWFsL0ZQVC9DTjUvU1dQL2FoaWhpL0RhaXJ5LUZFL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgVXNlckNvbmZpZywgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcclxuXHJcbmNvbnN0IHZpdGVDb25maWc6IFVzZXJDb25maWcgPSB7XHJcbiAgcGx1Z2luczogW3JlYWN0KCldLFxyXG4gIHNlcnZlcjoge1xyXG4gICAgcG9ydDogMzAwMCxcclxuICAgIHdhdGNoOiB7XHJcbiAgICAgIHVzZVBvbGxpbmc6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3NzOiB7XHJcbiAgICBkZXZTb3VyY2VtYXA6IHRydWUsXHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh2aXRlQ29uZmlnKTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEwVSxTQUFxQixvQkFBb0I7QUFDblgsT0FBTyxXQUFXO0FBRWxCLElBQU0sYUFBeUI7QUFBQSxFQUM3QixTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDakIsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0wsWUFBWTtBQUFBLElBQ2Q7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxjQUFjO0FBQUEsRUFDaEI7QUFDRjtBQUVBLElBQU8sc0JBQVEsYUFBYSxVQUFVOyIsCiAgIm5hbWVzIjogW10KfQo=