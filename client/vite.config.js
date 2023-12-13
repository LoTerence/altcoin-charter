import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "",
  plugins: [react()],
  server: {
    open: true,
    port: 3000,
  },
  esbuild: {
    loader: "jsx",
    include: ["src/**/*.js", "src/index.js", "node_modules/**/*.js"],
  },
});
