import { describe, expect, it } from "vitest";
import express, { type Express, type Request, type Response } from "express";
import cookieParser from "cookie-parser";
import request from "supertest";
import {
  blockInspectWrites,
  INSPECT_FORBIDDEN_MSG,
} from "./inspectMode";

type HttpWriteMethod = "post" | "put" | "patch" | "delete";

type WriteAttempt = {
  method: HttpWriteMethod;
  path: string;
  label: string;
};

const criticalWriteAttempts: WriteAttempt[] = [
  { method: "post", path: "/api/auth/register", label: "auth registration" },
  { method: "post", path: "/api/trial/request", label: "trial request" },
  { method: "post", path: "/api/trial/followup", label: "trial follow-up / email-like write" },
  { method: "post", path: "/api/stripe/checkout", label: "stripe checkout" },
  { method: "post", path: "/api/stripe/create-checkout-session", label: "stripe checkout session" },
  { method: "post", path: "/api/admin/stripe-live-verify", label: "admin stripe live verify" },
  { method: "post", path: "/api/owner/inspect-token", label: "owner inspect-token minting" },
  { method: "post", path: "/api/verwalter/objekte", label: "verwalter object creation" },
  { method: "post", path: "/api/verwalter/buchungen", label: "verwalter booking creation" },
  { method: "put", path: "/api/verwalter/objekte/1", label: "verwalter object update" },
  { method: "patch", path: "/api/verwalter/vorgaenge/1", label: "verwalter case patch" },
  { method: "delete", path: "/api/verwalter/objekte/1", label: "verwalter object delete" },
];

function inspectCookie(offsetMs = 3_600_000): string {
  return `inspect_mode=1; inspect_mode_expires_at=${Date.now() + offsetMs}`;
}

function registerWriteRoute(app: Express, attempt: WriteAttempt): void {
  const handler = (_req: Request, res: Response) => {
    res.status(299).json({
      reached: true,
      label: attempt.label,
      method: attempt.method,
      path: attempt.path,
    });
  };

  switch (attempt.method) {
    case "post":
      app.post(attempt.path, handler);
      break;
    case "put":
      app.put(attempt.path, handler);
      break;
    case "patch":
      app.patch(attempt.path, handler);
      break;
    case "delete":
      app.delete(attempt.path, handler);
      break;
  }
}

function sendWrite(app: Express, attempt: WriteAttempt) {
  const client = request(app);
  switch (attempt.method) {
    case "post":
      return client.post(attempt.path);
    case "put":
      return client.put(attempt.path);
    case "patch":
      return client.patch(attempt.path);
    case "delete":
      return client.delete(attempt.path);
  }
}

function buildMatrixApp(): Express {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());
  app.use(blockInspectWrites);

  app.get("/api/health", (_req, res) => {
    res.json({ ok: true });
  });

  app.head("/api/health", (_req, res) => {
    res.status(200).end();
  });

  app.options("/api/health", (_req, res) => {
    res.status(204).end();
  });

  for (const attempt of criticalWriteAttempts) {
    registerWriteRoute(app, attempt);
  }

  return app;
}

describe("S255B inspect write-block safety matrix", () => {
  it.each(criticalWriteAttempts)(
    "blocks $label during active inspect mode",
    async (attempt) => {
      const app = buildMatrixApp();

      const response = await sendWrite(app, attempt)
        .set("Cookie", inspectCookie())
        .send({ probe: "must-not-reach-handler" })
        .expect(403);

      expect(response.body).toEqual({
        error: INSPECT_FORBIDDEN_MSG,
        inspect: true,
      });
    },
  );

  it("allows safe read methods during active inspect mode", async () => {
    const app = buildMatrixApp();
    const cookie = inspectCookie();

    await request(app)
      .get("/api/health")
      .set("Cookie", cookie)
      .expect(200)
      .expect({ ok: true });

    await request(app)
      .head("/api/health")
      .set("Cookie", cookie)
      .expect(200);

    await request(app)
      .options("/api/health")
      .set("Cookie", cookie)
      .expect(204);
  });

  it("does not block the same write routes without inspect cookies", async () => {
    const app = buildMatrixApp();

    const response = await request(app)
      .post("/api/auth/register")
      .send({ probe: "non-inspect" })
      .expect(299);

    expect(response.body.reached).toBe(true);
    expect(response.body.label).toBe("auth registration");
  });

  it("does not treat expired inspect cookies as active inspect mode", async () => {
    const app = buildMatrixApp();

    const response = await request(app)
      .post("/api/auth/register")
      .set("Cookie", inspectCookie(-1))
      .send({ probe: "expired-inspect-cookie" })
      .expect(299);

    expect(response.body.reached).toBe(true);
    expect(response.body.label).toBe("auth registration");
  });
});
