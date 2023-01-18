/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["@testing-library/jest-dom/extend-expect"],
    coverage: {
      provider: "c8",
      reporter: ["text", "html"],
      clean: true,
      cleanOnRerun: true,
    },
  },
});
