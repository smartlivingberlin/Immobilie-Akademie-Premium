import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["client/src/**/*.test.ts", "server/**/*.test.ts", "shared/**/*.test.ts"],
    exclude: [
      "server/pdf.test.ts",
      "server/certificates.test.ts",
      "server/ihk-timer.test.ts",
      "server/whitelabel.test.ts",
      "server/auth.logout.test.ts",
      "server/aiAssistant.test.ts",
    ],
    environment: "node",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
});
