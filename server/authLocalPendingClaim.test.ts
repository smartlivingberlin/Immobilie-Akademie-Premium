import { describe, expect, it, vi, beforeEach } from "vitest";
import express from "express";
import request from "supertest";
import { jwtVerify } from "jose";

vi.hoisted(() => {
  process.env.DATABASE_URL ??= "mysql://test:test@127.0.0.1:3306/test";
  process.env.JWT_SECRET ??= "test-jwt-secret-for-s231f-pending-claim";
  process.env.STRIPE_SECRET_KEY ??= "sk_test_placeholder";
});

const mockExtendUserAccessFromPurchase = vi.fn().mockResolvedValue(undefined);
const mockApplyReferralPurchaseRewards = vi.fn().mockResolvedValue(undefined);

vi.mock("./accessExpiry", () => ({
  extendUserAccessFromPurchase: mockExtendUserAccessFromPurchase,
}));

vi.mock("./referralRewards", () => ({
  applyReferralPurchaseRewards: mockApplyReferralPurchaseRewards,
  attributeReferral: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("./platformAuditLog", () => ({
  auditRequestMeta: vi.fn(() => ({})),
  recordPlatformAudit: vi.fn(),
}));

vi.mock("./_core/logger", () => ({
  logger: { error: vi.fn(), warn: vi.fn(), info: vi.fn(), debug: vi.fn() },
}));

const {
  mockGetDb,
  mockGetUserByOpenId,
  mockGetPasswordHash,
  mockUpdateLastSignedIn,
  mockGetUserCount,
  mockUpsertUser,
  mockSavePasswordHash,
  mockSetUserRole,
} = vi.hoisted(() => ({
  mockGetDb: vi.fn(),
  mockGetUserByOpenId: vi.fn(),
  mockGetPasswordHash: vi.fn(),
  mockUpdateLastSignedIn: vi.fn().mockResolvedValue(undefined),
  mockGetUserCount: vi.fn(),
  mockUpsertUser: vi.fn().mockResolvedValue(undefined),
  mockSavePasswordHash: vi.fn().mockResolvedValue(undefined),
  mockSetUserRole: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("./db", () => ({
  getDb: mockGetDb,
  getUserByOpenId: mockGetUserByOpenId,
  getPasswordHash: mockGetPasswordHash,
  updateLastSignedIn: mockUpdateLastSignedIn,
  getUserCount: mockGetUserCount,
  upsertUser: mockUpsertUser,
  savePasswordHash: mockSavePasswordHash,
  setUserRole: mockSetUserRole,
}));

import {
  claimPendingPurchasesForUser,
  hashPassword,
  registerLocalAuthRoutes,
} from "./_core/auth-local";

function createPendingClaimDb(options: {
  pendingRows?: Array<{ modules: string; productId?: string | null }>;
  currentEnabledModules?: string;
  userId?: number;
}) {
  const {
    pendingRows = [],
    currentEnabledModules = "",
    userId = 42,
  } = options;
  const queries: Array<{ sql: string; params?: unknown[] }> = [];

  const dbConn = {
    $client: {
      query: vi.fn(async (sql: string, params?: unknown[]) => {
        queries.push({ sql, params });
        if (sql.includes("FROM pending_purchases")) {
          return [pendingRows];
        }
        if (sql.includes("UPDATE users SET enabledModules")) {
          return [{ affectedRows: 1 }];
        }
        if (sql.includes("UPDATE pending_purchases SET claimedAt")) {
          return [{ affectedRows: pendingRows.length }];
        }
        if (sql.includes("SELECT id, enabledModules FROM users")) {
          return [[{ id: userId, enabledModules: currentEnabledModules }]];
        }
        return [[]];
      }),
    },
  };

  return { dbConn, queries };
}

function buildAuthApp() {
  const app = express();
  app.use(express.json());
  registerLocalAuthRoutes(app);
  return app;
}

async function decodeSessionModules(setCookieHeader: string | string[] | undefined): Promise<string | undefined> {
  const headers = Array.isArray(setCookieHeader) ? setCookieHeader : setCookieHeader ? [setCookieHeader] : [];
  const sessionCookie = headers.find((h) => h.startsWith("app_session_id="));
  if (!sessionCookie) return undefined;
  const token = sessionCookie.split(";")[0]?.slice("app_session_id=".length);
  if (!token) return undefined;
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const { payload } = await jwtVerify(token, secret, { algorithms: ["HS256"] });
  return payload.enabledModules as string | undefined;
}

describe("claimPendingPurchasesForUser", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("merges modules and marks pending purchases as claimed", async () => {
    const { dbConn, queries } = createPendingClaimDb({
      pendingRows: [{ modules: "3,4", productId: "modul_3" }],
      currentEnabledModules: "1,2",
      userId: 7,
    });

    const merged = await claimPendingPurchasesForUser(dbConn, 7, "Buyer@Example.com", "1,2");

    expect(merged).toBe("1,2,3,4");
    expect(queries.some((q) => q.sql.includes("UPDATE users SET enabledModules"))).toBe(true);
    expect(queries.some((q) => q.sql.includes("UPDATE pending_purchases SET claimedAt"))).toBe(true);
    expect(mockExtendUserAccessFromPurchase).toHaveBeenCalledWith(dbConn, 7, "modul_3", "3,4");
    expect(mockApplyReferralPurchaseRewards).toHaveBeenCalledWith(dbConn, 7);
  });

  it("returns current modules unchanged when no pending purchase exists", async () => {
    const { dbConn, queries } = createPendingClaimDb({
      pendingRows: [],
      currentEnabledModules: "1,2",
    });

    const merged = await claimPendingPurchasesForUser(dbConn, 42, "user@example.com", "1,2");

    expect(merged).toBe("1,2");
    expect(queries.filter((q) => q.sql.includes("UPDATE users SET enabledModules"))).toHaveLength(0);
    expect(mockExtendUserAccessFromPurchase).not.toHaveBeenCalled();
    expect(mockApplyReferralPurchaseRewards).not.toHaveBeenCalled();
  });
});

describe("login pending claim flow", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("claims pending purchases for existing user on successful login", async () => {
    const email = "buyer@example.com";
    const openId = `local:${email}`;
    const { hash, salt } = hashPassword("correct-password");
    const { dbConn } = createPendingClaimDb({
      pendingRows: [{ modules: "3", productId: "modul_3" }],
      currentEnabledModules: "1",
      userId: 99,
    });
    mockGetDb.mockResolvedValue(dbConn);
    mockGetUserByOpenId.mockResolvedValue({
      id: 99,
      openId,
      name: "Buyer",
      email,
      role: "user",
      enabledModules: "1",
    });
    mockGetPasswordHash.mockResolvedValue({ hash, salt });

    const res = await request(buildAuthApp())
      .post("/api/auth/login")
      .send({ email, password: "correct-password" });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true, name: "Buyer", role: "user" });
    expect(mockGetDb).toHaveBeenCalled();
    expect(mockExtendUserAccessFromPurchase).toHaveBeenCalled();
    const sessionModules = await decodeSessionModules(res.headers["set-cookie"]);
    expect(sessionModules).toBe("1,3");
  });

  it("keeps existing modules when login has no pending purchase", async () => {
    const email = "user@example.com";
    const openId = `local:${email}`;
    const { hash, salt } = hashPassword("correct-password");
    const { dbConn } = createPendingClaimDb({
      pendingRows: [],
      currentEnabledModules: "1,2",
      userId: 12,
    });
    mockGetDb.mockResolvedValue(dbConn);
    mockGetUserByOpenId.mockResolvedValue({
      id: 12,
      openId,
      name: "User",
      email,
      role: "user",
      enabledModules: "1,2",
    });
    mockGetPasswordHash.mockResolvedValue({ hash, salt });

    const res = await request(buildAuthApp())
      .post("/api/auth/login")
      .send({ email, password: "correct-password" });

    expect(res.status).toBe(200);
    expect(mockExtendUserAccessFromPurchase).not.toHaveBeenCalled();
    const sessionModules = await decodeSessionModules(res.headers["set-cookie"]);
    expect(sessionModules).toBe("1,2");
  });

  it("does not claim pending purchases when password is wrong", async () => {
    const email = "user@example.com";
    const openId = `local:${email}`;
    const { hash, salt } = hashPassword("correct-password");
    mockGetUserByOpenId.mockResolvedValue({
      id: 12,
      openId,
      name: "User",
      email,
      role: "user",
      enabledModules: "1",
    });
    mockGetPasswordHash.mockResolvedValue({ hash, salt });

    const res = await request(buildAuthApp())
      .post("/api/auth/login")
      .send({ email, password: "wrong-password" });

    expect(res.status).toBe(401);
    expect(mockGetDb).not.toHaveBeenCalled();
    expect(mockExtendUserAccessFromPurchase).not.toHaveBeenCalled();
  });
});

describe("register pending claim flow", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetUserCount.mockResolvedValue(1);
    mockGetUserByOpenId.mockResolvedValue(undefined);
  });

  it("claims pending purchases during registration", async () => {
    const email = "newbuyer@example.com";
    const openId = `local:${email}`;
    const { dbConn } = createPendingClaimDb({
      pendingRows: [{ modules: "2", productId: "modul_2" }],
      currentEnabledModules: "",
      userId: 55,
    });
    mockGetDb.mockResolvedValue(dbConn);
    mockGetUserByOpenId
      .mockResolvedValueOnce(undefined)
      .mockResolvedValueOnce({ id: 55, openId, name: "New Buyer", email, role: "user" });

    const res = await request(buildAuthApp())
      .post("/api/auth/register")
      .send({ email, password: "password123", name: "New Buyer" });

    expect(res.status).toBe(200);
    expect(mockExtendUserAccessFromPurchase).toHaveBeenCalledWith(dbConn, 55, "modul_2", "2");
    const sessionModules = await decodeSessionModules(res.headers["set-cookie"]);
    expect(sessionModules).toBe("2");
  });
});
