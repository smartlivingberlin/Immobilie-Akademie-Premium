import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import express from "express";
import cookieParser from "cookie-parser";
import request from "supertest";
import { clearAllAuthCookies, clearInspectCookies } from "./authCookies";

describe("auth cookie coherence", () => {
  it("exports centralized clear helpers used by logout and login flows", () => {
    const routers = readFileSync(resolve(process.cwd(), "server/routers.ts"), "utf-8");
    const authLocal = readFileSync(resolve(process.cwd(), "server/_core/auth-local.ts"), "utf-8");
    const ownerRoute = readFileSync(resolve(process.cwd(), "server/ownerRoute.ts"), "utf-8");

    expect(routers).toContain("clearAllAuthCookies");
    expect(authLocal).toContain("clearAllAuthCookies");
    expect(authLocal).toContain("clearInspectCookies");
    expect(ownerRoute).toContain("clearInspectCookies");
    expect(ownerRoute).toContain("clearSessionCookie");
    expect(ownerRoute).toContain('redirect: "/modul/1"');
  });

  it("clearAllAuthCookies removes session, inspect, owner and tester cookies", async () => {
    const cleared: string[] = [];
    const req = { protocol: "https", headers: { host: "immobilien-akademie-smart.de" } } as Parameters<
      typeof clearAllAuthCookies
    >[0];
    const res = {
      clearCookie: (name: string) => {
        cleared.push(name);
      },
    } as Parameters<typeof clearAllAuthCookies>[1];

    clearAllAuthCookies(req, res);

    expect(cleared).toEqual(
      expect.arrayContaining([
        "app_session_id",
        "inspect_mode",
        "inspect_mode_expires_at",
        "owner_2fa_ok",
        "tester_expires",
      ]),
    );
  });

  it("inspect entry clears session before setting inspect cookies", async () => {
    const ownerRoute = readFileSync(resolve(process.cwd(), "server/ownerRoute.ts"), "utf-8");
    const inspectBlock = ownerRoute.slice(
      ownerRoute.indexOf('app.get("/inspect/:token"'),
      ownerRoute.indexOf('app.post("/api/auth/admin-2fa/request"'),
    );
    expect(inspectBlock).toContain("clearSessionCookie(req, res)");
    expect(inspectBlock).toContain("clearAuxAuthCookies(req, res)");
  });

  it("clearInspectCookies via HTTP middleware pattern", async () => {
    const app = express();
    app.use(cookieParser());
    app.get("/exit-inspect", (req, res) => {
      clearInspectCookies(req, res);
      res.json({ ok: true });
    });

    const agent = request.agent(app);
    await agent
      .get("/exit-inspect")
      .set("Cookie", "inspect_mode=1; inspect_mode_expires_at=9999999999999")
      .expect(200);
  });
});
