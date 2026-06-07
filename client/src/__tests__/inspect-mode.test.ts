import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("inspect mode flow", () => {
  it("redirects inspect tokens with inspect=1 and exposes inspect-status API", () => {
    const ownerRoute = readFileSync(resolve(process.cwd(), "server/ownerRoute.ts"), "utf-8");
    expect(ownerRoute).toContain('res.redirect("/?inspect=1")');
    expect(ownerRoute).toContain('"/api/auth/inspect-status"');
  });

  it("allows inspect mode to bypass protected module assets and data", () => {
    const viteCore = readFileSync(resolve(process.cwd(), "server/_core/vite.ts"), "utf-8");
    expect(viteCore).toContain('req.cookies?.inspect_mode === "1"');
  });

  it("lets protected routes render during inspect mode without login", () => {
    const appSource = readFileSync(resolve(process.cwd(), "client/src/App.tsx"), "utf-8");
    expect(appSource).toContain("useInspectMode");
    expect(appSource).toContain("if (!user && !isInspect)");
    expect(appSource).toContain("if (isInspect) return <>{children}</>");
  });
});
