import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

const repoRoot = path.basename(process.cwd()) === "client"
  ? path.resolve(process.cwd(), "..")
  : process.cwd();

describe("KI-Stats admin guard", () => {
  it("registers ki-stats with requireAdmin before ragTutor", () => {
    const indexSource = readFileSync(path.join(repoRoot, "server/_core/index.ts"), "utf-8");
    const kiStatsSource = readFileSync(path.join(repoRoot, "server/kiStatsRoute.ts"), "utf-8");

    expect(kiStatsSource).toContain("requireAdmin");
    expect(kiStatsSource).toContain("/api/admin/ki-stats");
    expect(indexSource).toContain("registerKiStatsRoute");
    expect(indexSource.indexOf("registerKiStatsRoute")).toBeLessThan(indexSource.indexOf("registerRagTutorRoutes"));
  });
});
