import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAdminContext(): { ctx: TrpcContext } {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "admin-user",
    email: "admin@example.com",
    name: "Admin User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return { ctx };
}

function createUserContext(): { ctx: TrpcContext } {
  const user: AuthenticatedUser = {
    id: 2,
    openId: "regular-user",
    email: "user@example.com",
    name: "Regular User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return { ctx };
}

describe("whitelabel", () => {
  describe("access control", () => {
    it("admin can list whitelabel configs", async () => {
      const { ctx } = createAdminContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.whitelabel.list();
      expect(Array.isArray(result)).toBe(true);
    });

    it("regular user cannot list whitelabel configs", async () => {
      const { ctx } = createUserContext();
      const caller = appRouter.createCaller(ctx);

      await expect(caller.whitelabel.list()).rejects.toThrow();
    });

    it("regular user can query their own tenant config", async () => {
      const { ctx } = createUserContext();
      const caller = appRouter.createCaller(ctx);

      // Should not throw - returns null if no tenant assigned
      const result = await caller.whitelabel.myTenant();
      // Result can be null or a config object
      expect(result === null || result === undefined || typeof result === "object").toBe(true);
    });
  });

  describe("CRUD operations", () => {
    it("admin can create a whitelabel config", async () => {
      const { ctx } = createAdminContext();
      const caller = appRouter.createCaller(ctx);

      const slug = `test-tenant-${Date.now()}`;
      const result = await caller.whitelabel.create({
        slug,
        companyName: "Test Akademie GmbH",
        primaryColor: "#2563eb",
        secondaryColor: "#1e293b",
        accentColor: "#3b82f6",
        sidebarColor: "#0f172a",
        azavEnabled: false,
        enabledModules: "1,2,3",
        maxUsers: 50,
      });

      expect(result).toBeDefined();
      expect(result.slug).toBe(slug);
      expect(result.companyName).toBe("Test Akademie GmbH");
      expect(result.primaryColor).toBe("#2563eb");
      expect(result.enabledModules).toBe("1,2,3");
      expect(result.maxUsers).toBe(50);

      // Cleanup
      await caller.whitelabel.delete({ id: result.id });
    });

    it("admin cannot create duplicate slugs", async () => {
      const { ctx } = createAdminContext();
      const caller = appRouter.createCaller(ctx);

      const slug = `dup-test-${Date.now()}`;
      const config = await caller.whitelabel.create({
        slug,
        companyName: "Duplicate Test",
      });

      await expect(
        caller.whitelabel.create({
          slug,
          companyName: "Duplicate Test 2",
        })
      ).rejects.toThrow("Dieser Slug ist bereits vergeben");

      // Cleanup
      await caller.whitelabel.delete({ id: config.id });
    });

    it("admin can update a whitelabel config", async () => {
      const { ctx } = createAdminContext();
      const caller = appRouter.createCaller(ctx);

      const slug = `update-test-${Date.now()}`;
      const config = await caller.whitelabel.create({
        slug,
        companyName: "Before Update",
      });

      const updated = await caller.whitelabel.update({
        id: config.id,
        companyName: "After Update",
        primaryColor: "#ff0000",
        azavEnabled: true,
        azavCertNumber: "DE-AZAV-2026-TEST",
      });

      expect(updated).toBeDefined();
      expect(updated!.companyName).toBe("After Update");
      expect(updated!.primaryColor).toBe("#ff0000");
      expect(updated!.azavEnabled).toBe(true);
      expect(updated!.azavCertNumber).toBe("DE-AZAV-2026-TEST");

      // Cleanup
      await caller.whitelabel.delete({ id: config.id });
    });

    it("admin can delete a whitelabel config", async () => {
      const { ctx } = createAdminContext();
      const caller = appRouter.createCaller(ctx);

      const slug = `delete-test-${Date.now()}`;
      const config = await caller.whitelabel.create({
        slug,
        companyName: "To Delete",
      });

      const result = await caller.whitelabel.delete({ id: config.id });
      expect(result).toEqual({ success: true });

      // Verify it's gone
      await expect(
        caller.whitelabel.getById({ id: config.id })
      ).rejects.toThrow("nicht gefunden");
    });

    it("admin can get a specific config by ID", async () => {
      const { ctx } = createAdminContext();
      const caller = appRouter.createCaller(ctx);

      const slug = `getbyid-test-${Date.now()}`;
      const config = await caller.whitelabel.create({
        slug,
        companyName: "Get By ID Test",
        contactEmail: "test@example.com",
      });

      const fetched = await caller.whitelabel.getById({ id: config.id });
      expect(fetched.slug).toBe(slug);
      expect(fetched.companyName).toBe("Get By ID Test");
      expect(fetched.contactEmail).toBe("test@example.com");

      // Cleanup
      await caller.whitelabel.delete({ id: config.id });
    });
  });

  describe("input validation", () => {
    it("rejects invalid slug format", async () => {
      const { ctx } = createAdminContext();
      const caller = appRouter.createCaller(ctx);

      await expect(
        caller.whitelabel.create({
          slug: "Invalid Slug With Spaces!",
          companyName: "Test",
        })
      ).rejects.toThrow();
    });

    it("rejects invalid color format", async () => {
      const { ctx } = createAdminContext();
      const caller = appRouter.createCaller(ctx);

      await expect(
        caller.whitelabel.create({
          slug: "color-test",
          companyName: "Test",
          primaryColor: "not-a-color",
        })
      ).rejects.toThrow();
    });

    it("rejects empty company name", async () => {
      const { ctx } = createAdminContext();
      const caller = appRouter.createCaller(ctx);

      await expect(
        caller.whitelabel.create({
          slug: "empty-name",
          companyName: "",
        })
      ).rejects.toThrow();
    });
  });
});
