import path from "path";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");

  return {
    server: {
      proxy: {
        "/api": "http://localhost:5000", // Proxy all /api calls to backend
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"), // Keep src alias clean
      },
    },
    define: {
      // You can still expose custom env vars if needed
      "process.env.API_URL": JSON.stringify(env.VITE_API_BASE_URL),
    },
  };
});
