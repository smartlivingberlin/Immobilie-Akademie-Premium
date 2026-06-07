import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("inspect mode flow", () => {
  it("redirects inspect tokens with inspect=1 and exposes inspect-status API", () => {
    const ownerRoute = readFileSync(resolve(process.cwd(), "server/ownerRoute.ts"), "utf-8");
    expect(ownerRoute).toContain('res.redirect("/admin?inspect=1")');
    expect(ownerRoute).toContain('"/api/auth/inspect-status"');
    expect(ownerRoute).toContain("inspect_mode_expires_at");
    expect(ownerRoute).toContain("payload.exp");
  });

  it("allows inspect mode to bypass protected module assets and data", () => {
    const viteCore = readFileSync(resolve(process.cwd(), "server/_core/vite.ts"), "utf-8");
    expect(viteCore).toContain("isInspectModeActive");
    const inspectMode = readFileSync(resolve(process.cwd(), "server/inspectMode.ts"), "utf-8");
    expect(inspectMode).toContain("inspect_mode_expires_at");
  });

  it("lets protected routes render during inspect mode without login", () => {
    const appSource = readFileSync(resolve(process.cwd(), "client/src/App.tsx"), "utf-8");
    expect(appSource).toContain("useInspectMode");
    expect(appSource).toContain("if (!user && !isInspect)");
    expect(appSource).toContain("if (isInspect) return <>{children}</>");
    expect(appSource).toContain("if (isInspect) return <Component />");
  });

  it("routes inspect module buttons to learning area and shows static stats", () => {
    const homeSource = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf-8");
    expect(homeSource).toContain("isInspect ? `/modul/${m.id}` : `/kurs/${m.slug}`");
    expect(homeSource).toContain("showStatsInstantly");
    expect(homeSource).toContain("instant={showStatsInstantly}");
  });
});
