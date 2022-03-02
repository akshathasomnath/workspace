import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  base: './',
  plugins: [solidPlugin()],
  build: {
    outDir: '../backend/static/',
    target: 'esnext',
    polyfillDynamicImport: false,
  },
  server: {
    port: 8081,
    cors: true,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
        //rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  }
});
