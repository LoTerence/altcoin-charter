import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const SERVER_URL = `${
    process.env.VITE_APP_SERVER_URL ?? "http://localhost:5000"
  }`;

  return {
    base: "",
    plugins: [react()],
    server: {
      host: true,
      port: 3000,
      proxy: {
        "/api": {
          target: `${SERVER_URL}/api`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
      watch: {
        usePolling: true,
      },
    },
  };
});
