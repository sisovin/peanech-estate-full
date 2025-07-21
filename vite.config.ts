import path from "path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "development" ? "/" : process.env.VITE_BASE_PATH || "/",
  optimizeDeps: {
    entries: ["src/main.tsx", "src/tempobook/**/*"],
  },
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    preserveSymlinks: true,
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // @ts-ignore
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    hmr: {
      host: "localhost"
    },
    allowedHosts: true,
  }
});
