/// <reference types="vitest" />

import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      provider: "c8",
      reporter: ["text", "html"],
      exclude: [
        ...configDefaults.exclude,
        "src/mocks/**",
        "src/types/**",
        "src/constants/**",
        "__tests__/**",
      ],
    },
  },
});
