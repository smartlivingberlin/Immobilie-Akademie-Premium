import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();

function readRepo(relativePath: string) {
  return readFileSync(path.join(repoRoot, relativePath), "utf-8");
}

describe("security guards (static verification)", () => {
  it("protects all-questions.json behind module guard", () => {
    const vite = readRepo("server/_core/vite.ts");
    expect(vite).toContain('"all-questions.json"');
    expect(vite).toContain("protectModuleData");
  });

  it("registers ki-stats with requireAdmin before ragTutor", () => {
    const kiStats = readRepo("server/kiStatsRoute.ts");
    const index = readRepo("server/_core/index.ts");
    expect(kiStats).toContain('app.get("/api/admin/ki-stats", requireAdmin');
    expect(index.indexOf("registerKiStatsRoute")).toBeLessThan(index.indexOf("registerRagTutorRoutes"));
  });

  it("rate-limits owner resend-2fa", () => {
    const owner = readRepo("server/ownerRoute.ts");
    expect(owner).toContain("ownerResend2faLimiter");
    expect(owner).toContain('app.post("/api/owner/resend-2fa", ownerResend2faLimiter');
    expect(owner).toMatch(/max:\s*3/);
  });

  it("restricts owner session auth to platform owner openId", () => {
    const owner = readRepo("server/ownerRoute.ts");
    expect(owner).toContain("isPlatformOwnerOpenId");
  });

  it("skips white-label branding for platform admins", () => {
    const wl = readRepo("client/src/contexts/WhiteLabelContext.tsx");
    expect(wl).toContain('skipTenantBranding');
    expect(wl).toContain('user?.role === "admin"');
  });
});
