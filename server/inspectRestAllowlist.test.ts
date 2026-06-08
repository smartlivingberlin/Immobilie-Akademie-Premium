import { describe, expect, it } from "vitest";
import express from "express";
import cookieParser from "cookie-parser";
import request from "supertest";
import {
  INSPECT_FORBIDDEN_MSG,
  INSPECT_REST_ADMIN_GET_ALLOWLIST,
  INSPECT_REST_ADMIN_GET_ROUTES,
  isInspectRestAdminReadAllowed,
} from "./inspectMode";

function inspectCookie(): string {
  const future = String(Date.now() + 3_600_000);
  return `inspect_mode=1; inspect_mode_expires_at=${future}`;
}

describe("inspect REST admin allowlist", () => {
  it("documents every known admin GET route as allowlisted or blocked", () => {
    for (const route of INSPECT_REST_ADMIN_GET_ROUTES) {
      const allowed = isInspectRestAdminReadAllowed(route);
      const inList = (INSPECT_REST_ADMIN_GET_ALLOWLIST as readonly string[]).includes(route);
      expect(allowed).toBe(inList);
    }
  });

  it("blocks parametric coaching profiles in inspect", () => {
    expect(isInspectRestAdminReadAllowed("/api/agent/coaching/99")).toBe(false);
  });

  it("allows only allowlisted admin GET routes during inspect", async () => {
    process.env.DATABASE_URL ??= "mysql://test:test@127.0.0.1:3306/test";
    process.env.JWT_SECRET ??= "test-jwt-secret-minimum-32-characters!!";
    process.env.STRIPE_SECRET_KEY ??= "sk_test_fake";
    const { requireAdmin } = await import("./authMiddleware");

    const app = express();
    app.use(cookieParser());
    app.get("/api/admin/mysql-health", requireAdmin, (_req, res) => {
      res.json({ ok: true });
    });
    app.get("/api/admin/ki-stats", requireAdmin, (_req, res) => {
      res.json({ leaked: true });
    });
    app.get("/api/admin/pending-purchases", requireAdmin, (_req, res) => {
      res.json({ rows: [{ email: "secret@example.com" }] });
    });
    app.get("/api/agent/coaching/42", requireAdmin, (_req, res) => {
      res.json({ userId: 42 });
    });

    const cookie = inspectCookie();

    await request(app)
      .get("/api/admin/mysql-health")
      .set("Cookie", cookie)
      .expect(200)
      .expect({ ok: true });

    const blockedKi = await request(app)
      .get("/api/admin/ki-stats")
      .set("Cookie", cookie)
      .expect(403);
    expect(blockedKi.body.error).toBe(INSPECT_FORBIDDEN_MSG);
    expect(blockedKi.body.inspect).toBe(true);

    const blockedPurchases = await request(app)
      .get("/api/admin/pending-purchases")
      .set("Cookie", cookie)
      .expect(403);
    expect(blockedPurchases.body.error).toBe(INSPECT_FORBIDDEN_MSG);

    const blockedCoaching = await request(app)
      .get("/api/agent/coaching/42")
      .set("Cookie", cookie)
      .expect(403);
    expect(blockedCoaching.body.error).toBe(INSPECT_FORBIDDEN_MSG);
  });
});
