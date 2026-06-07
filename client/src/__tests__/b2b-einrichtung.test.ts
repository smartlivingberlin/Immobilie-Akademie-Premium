import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("B2B onboarding polish", () => {
  const einrichtung = readFileSync(
    resolve(process.cwd(), "client/src/pages/B2bEinrichtung.tsx"),
    "utf-8",
  );
  const landing = readFileSync(
    resolve(process.cwd(), "client/src/pages/MaklerbuerosLanding.tsx"),
    "utf-8",
  );
  const welcome = readFileSync(
    resolve(process.cwd(), "server/b2bWelcomeEmail.ts"),
    "utf-8",
  );

  it("polls tenant status after post-checkout b2b=1", () => {
    expect(einrichtung).toContain('get("b2b") === "1"');
    expect(einrichtung).toContain("setInterval");
    expect(einrichtung).toContain("loadStatus");
  });

  it("does not link tenant admins to platform-only /admin/whitelabel", () => {
    expect(einrichtung).not.toContain('href="/admin/whitelabel"');
    expect(einrichtung).toContain("setStep(1)");
    expect(welcome).not.toContain("/admin/whitelabel");
    expect(welcome).not.toContain("/admin/codes");
  });

  it("uses shared B2B plans on landing instead of window.prompt", () => {
    expect(landing).toContain("@shared/b2bPlans");
    expect(landing).not.toContain("window.prompt");
    expect(landing).toContain("<Dialog");
  });
});
