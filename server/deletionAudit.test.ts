import { describe, expect, it } from "vitest";
import { hashUserIdForAudit } from "./deletionAudit";

describe("deletionAudit", () => {
  it("hashes user id with JWT secret without exposing PII", () => {
    const a = hashUserIdForAudit(42, "test-secret");
    const b = hashUserIdForAudit(42, "test-secret");
    const c = hashUserIdForAudit(42, "other-secret");
    expect(a).toHaveLength(64);
    expect(a).toBe(b);
    expect(a).not.toBe(c);
  });

  it("migration creates deletion_audit_log table", async () => {
    const { readFileSync } = await import("node:fs");
    const { resolve } = await import("node:path");
    const sql = readFileSync(
      resolve(process.cwd(), "drizzle/migrations/0043_deletion_audit_log.sql"),
      "utf-8",
    );
    expect(sql).toContain("deletion_audit_log");
    expect(sql).toContain("userHash");
    expect(sql).toContain("tablesAffected");
  });
});
