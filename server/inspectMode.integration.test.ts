import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import express from "express";
import cookieParser from "cookie-parser";
import request from "supertest";
import { SignJWT } from "jose";
import {
  blockInspectWrites,
  INSPECT_FORBIDDEN_MSG,
  isInspectModeActive,
} from "./inspectMode";

function buildInspectApp() {
  const app = express();
  app.use(cookieParser());
  app.use(blockInspectWrites);
  app.get("/api/auth/inspect-status", (req, res) => {
    res.json({ inspect: isInspectModeActive(req) });
  });
  app.get("/read", (_req, res) => res.json({ ok: true }));
  app.post("/write", (_req, res) => res.json({ ok: true }));
  app.get("/inspect/exit", (_req, res) => res.redirect("/"));
  return app;
}

describe("inspectMode server integration", () => {
  it("isInspectModeActive respects cookie and expiry", () => {
    const future = String(Date.now() + 60_000);
    const activeReq = {
      cookies: { inspect_mode: "1", inspect_mode_expires_at: future },
    } as Parameters<typeof isInspectModeActive>[0];
    expect(isInspectModeActive(activeReq)).toBe(true);

    const expiredReq = {
      cookies: { inspect_mode: "1", inspect_mode_expires_at: String(Date.now() - 1) },
    } as Parameters<typeof isInspectModeActive>[0];
    expect(isInspectModeActive(expiredReq)).toBe(false);
  });

  it("allows GET but blocks POST during inspect mode", async () => {
    const app = buildInspectApp();
    const agent = request.agent(app);
    const future = String(Date.now() + 3_600_000);

    await agent
      .get("/read")
      .set("Cookie", `inspect_mode=1; inspect_mode_expires_at=${future}`)
      .expect(200);

    const blocked = await agent
      .post("/write")
      .set("Cookie", `inspect_mode=1; inspect_mode_expires_at=${future}`)
      .expect(403);
    expect(blocked.body.error).toBe(INSPECT_FORBIDDEN_MSG);
    expect(blocked.body.inspect).toBe(true);
  });

  it("allows inspect exit and inspect-status even in inspect mode", async () => {
    const app = buildInspectApp();
    const future = String(Date.now() + 3_600_000);
    const cookie = `inspect_mode=1; inspect_mode_expires_at=${future}`;

    await request(app)
      .get("/api/auth/inspect-status")
      .set("Cookie", cookie)
      .expect(200)
      .expect({ inspect: true });

    await request(app)
      .get("/inspect/exit")
      .set("Cookie", cookie)
      .expect(302);
  });

  it("ownerRoute redirects inspect tokens to admin dashboard", () => {
    const source = readFileSync(resolve(process.cwd(), "server/ownerRoute.ts"), "utf-8");
    expect(source).toContain('res.redirect("/modul/1?inspect=1")');
  });

  it("mints and verifies inspect JWT shape", async () => {
    const secret = new TextEncoder().encode("dev-inspect-secret-change-me");
    const expiresAt = Date.now() + 72 * 60 * 60 * 1000;
    const token = await new SignJWT({ role: "inspect", expiresAt })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("72h")
      .setIssuedAt()
      .sign(secret);

    const { jwtVerify } = await import("jose");
    const { payload } = await jwtVerify(token, secret);
    expect((payload as { role?: string }).role).toBe("inspect");
  });
});
