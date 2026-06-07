import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();

const marketingFiles = [
  "client/src/pages/Home.tsx",
  "client/src/pages/Dashboard.tsx",
  "client/src/components/ExitIntentPopup.tsx",
  "client/src/pages/Syllabus.tsx",
  "client/src/pages/KursPakete.tsx",
  "client/src/pages/admin/AdminDashboard.tsx",
  "client/src/pages/UspLanding.tsx",
];

describe("claims centralization", () => {
  it("marketing pages import from shared/claims", () => {
    for (const file of marketingFiles) {
      const source = readFileSync(path.join(repoRoot, file), "utf-8");
      expect(source, file).toMatch(/@shared\/claims/);
      expect(source, file).not.toMatch(/855\+/);
      expect(source, file).not.toMatch(/\b810\b/);
    }
  });
});
