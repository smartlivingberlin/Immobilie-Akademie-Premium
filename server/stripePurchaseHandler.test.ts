import { describe, expect, it, vi } from "vitest";

vi.mock("./accessExpiry", () => ({
  extendUserAccessFromPurchase: vi.fn().mockResolvedValue(undefined),
  extendUserAccessBySubscription: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("./complianceAccess", () => ({
  extendComplianceAccess: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("./kiFairUse", () => ({
  setUserKiTier: vi.fn().mockResolvedValue(undefined),
  KI_TIER_FULL: "full",
  KI_TIER_RENEWAL: "renewal",
}));

vi.mock("./referralRewards", () => ({
  applyReferralPurchaseRewards: vi.fn().mockResolvedValue(undefined),
}));

import { processModulePurchase, processVerwalterToolsSubscription } from "./stripePurchaseHandler";
import { VERWALTER_TOOLS_MODULE_SENTINEL } from "../shared/verwalterToolsProduct";

function createMockDb(user: { id: number; enabledModules: string } | null) {
  const updates: Array<{ sql: string; params: unknown[] }> = [];
  return {
    updates,
    $client: {
      query: vi.fn(async (sql: string, params?: unknown[]) => {
        if (sql.includes("SELECT id, enabledModules FROM users") || sql.includes("SELECT enabledModules FROM users")) {
          return [[user]];
        }
        if (sql.startsWith("UPDATE users SET enabledModules")) {
          updates.push({ sql, params: params || [] });
          return [{ affectedRows: 1 }];
        }
        return [[]];
      }),
    },
  };
}

describe("processModulePurchase", () => {
  it("merges new modules into existing enabledModules", async () => {
    const db = createMockDb({ id: 42, enabledModules: "1,2" });
    const result = await processModulePurchase(db as any, "buyer@example.com", "3,4", "modul_3");

    expect(result).toEqual({ merged: "1,2,3,4", userId: 42 });
    expect(db.updates[0]?.params?.[0]).toBe("1,2,3,4");
  });

  it("returns null when user is not found", async () => {
    const db = createMockDb(null);
    const result = await processModulePurchase(db as any, "missing@example.com", "1");
    expect(result).toBeNull();
    expect(db.updates).toHaveLength(0);
  });
});

describe("processVerwalterToolsSubscription", () => {
  it("adds vt sentinel to enabledModules", async () => {
    const db = createMockDb({ id: 7, enabledModules: "1,rp" });
    await processVerwalterToolsSubscription(db as any, 7);
    expect(db.updates[0]?.params?.[0]).toBe(`1,rp,${VERWALTER_TOOLS_MODULE_SENTINEL}`);
  });
});
