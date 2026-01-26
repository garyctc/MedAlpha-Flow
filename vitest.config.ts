import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["client/src/test/setup.ts"],
    typecheck: {
      enabled: true,
      include: ["client/src/test/storage-types.test.ts"],
      tsconfig: "tsconfig.vitest.json",
    },
  },
});
