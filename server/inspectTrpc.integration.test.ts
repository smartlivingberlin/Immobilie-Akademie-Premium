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

  describe("admin query block matrix", () => {
    const blockedAdminQueries: Array<{
      name: string;
      run: (caller: Awaited<ReturnType<typeof import("./routers").appRouter.createCaller>>) => Promise<unknown>;
    }> = [
      {
        name: "adminUsers.list",
        run: (caller) => caller.adminUsers.list(),
      },
      {
        name: "whitelabel.list",
        run: (caller) => caller.whitelabel.list(),
      },
      {
        name: "whitelabel.getById",
        run: (caller) => caller.whitelabel.getById({ id: 1 }),
      },
      {
        name: "whitelabel.getTenantUsers",
        run: (caller) => caller.whitelabel.getTenantUsers({ tenantId: 1 }),
      },
      {
        name: "adminCodes.list",
        run: (caller) => caller.adminCodes.list(),
      },
      {
        name: "presentationCode.list",
        run: (caller) => caller.presentationCode.list(),
      },
      {
        name: "adminQuestions.list",
        run: (caller) => caller.adminQuestions.list({}),
      },
    ];

    it.each(blockedAdminQueries)(
      "blocks $name during inspect mode",
      async ({ run }) => {
        const { appRouter } = await import("./routers");
        const caller = appRouter.createCaller(createInspectCtx());

        await expect(run(caller)).rejects.toMatchObject({
          message: INSPECT_FORBIDDEN_MSG,
        });
      },
    );
  });

  describe("allowed inspect read queries", () => {
    it("allows auth.me without forbidden error", async () => {
      const { appRouter } = await import("./routers");
      const caller = appRouter.createCaller(createInspectCtx());

      await expect(caller.auth.me()).resolves.toBeNull();
    });

    it("allows progress.getProgress for inspect preview user", async () => {
      const { appRouter } = await import("./routers");
      const caller = appRouter.createCaller(createInspectCtx());

      const progress = await caller.progress.getProgress();
      expect(Array.isArray(progress)).toBe(true);
    });

    it("allows videos.list as public read", async () => {
      const { appRouter } = await import("./routers");
      const caller = appRouter.createCaller(createInspectCtx());

      await expect(caller.videos.list()).resolves.toEqual(expect.any(Array));
    });
  });
});
