import path from "node:path";
import { defineConfig } from "vitest/config";

// Unit tests cover pure logic (content safety, env parsing, metadata helpers).
// Component/E2E testing is added in the QA stage when there is UI to test.
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      // Next.js handles `server-only` itself; outside Next it must be a no-op.
      "server-only": path.resolve(import.meta.dirname, "tests/stubs/empty.ts"),
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts", "tests/**/*.test.ts"],
  },
});
