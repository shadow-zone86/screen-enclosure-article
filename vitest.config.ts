import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(dirname, "./src"),
      "@app": path.resolve(dirname, "./src/app"),
      "@views": path.resolve(dirname, "./src/views"),
      "@widgets": path.resolve(dirname, "./src/widgets"),
      "@features": path.resolve(dirname, "./src/features"),
      "@entities": path.resolve(dirname, "./src/entities"),
      "@shared": path.resolve(dirname, "./src/shared"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/shared/lib/test/index.ts",
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/**/*.test.{ts,tsx}", "src/**/*.stories.tsx", "src/shared/lib/test/**"],
    },
  },
});
