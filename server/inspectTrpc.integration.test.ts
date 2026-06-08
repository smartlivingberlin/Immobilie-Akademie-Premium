import { describe, expect, it } from "vitest";
import type { TrpcContext } from "./_core/context";
import { INSPECT_FORBIDDEN_MSG } from "./inspectMode";

process.env.DATABASE_URL ??= "mysql://test:test@127.0.0.1:3306/test";
process.env.JWT_SECRET ??= "test-jwt-secret-minimum-32-characters!!";
process.env.STRIPE_SECRET_KEY ??= "sk_test_fake";
process.env.NODE_ENV ??= "test";

function createInspectCtx(): TrpcContext {
  const expiresAt = Date.now() + 72 * 60 * 60 * 1000;
  return {
    user: null,
    req: {
      protocol: "http",
      headers: {
        cookie: `inspect_mode=1; inspect_mode_expires_at=${expiresAt}`,
      },
      cookies: {
        inspect_mode: "1",
        inspect_mode_expires_at: String(expiresAt),
      },
    } as TrpcContext["req"],
    res: {
      clearCookie: () => undefined,
    } as TrpcContext["res"],
  };
}

describe("inspect tRPC integration", { timeout: 120_000 }, () => {
  it("blocks mutations during inspect mode", async () => {
    const { appRouter } = await import("./routers");
    const caller = appRouter.createCaller(createInspectCtx());

    await expect(
      caller.presentationCode.redeem({ code: "DEMO-CODE" }),
    ).rejects.toMatchObject({
      message: INSPECT_FORBIDDEN_MSG,
    });
  });

  it("injects preview admin user for protected inspect queries", async () => {
    const { appRouter } = await import("./routers");
    const caller = appRouter.createCaller(createInspectCtx());

    const modules = await caller.modules.myAccess();
    expect(modules).toEqual([1, 2, 3, 4, 5]);
  });
});
