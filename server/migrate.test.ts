import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";

describe("migrate ledger", () => {
  const src = readFileSync(join(process.cwd(), "server/migrate.ts"), "utf8");

  it("0038 creates schema_migrations table", () => {
    const sql = readFileSync(
      join(process.cwd(), "drizzle/migrations/0038_schema_migrations.sql"),
      "utf8",
    );
    expect(sql).toContain("schema_migrations");
  });

  it("0043 creates verwalter mysql tables", () => {
    const sql = readFileSync(
      join(process.cwd(), "drizzle/migrations/0043_verwalter_mysql.sql"),
      "utf8",
    );
    expect(sql).toContain("verwalter_objekte");
    expect(sql).toContain("verwalter_vorgaenge");
    expect(sql).toContain("verwalter_buchungen");
  });

  it("uses ledger skip logic and strict production mode", () => {
    expect(src).toContain("isMigrationApplied");
    expect(src).toContain("markMigrationApplied");
    expect(src).toContain("getMigrationStatus");
    expect(src).toContain("MIGRATION_STRICT");
    expect(src).toContain("NODE_ENV === \"production\"");
  });

  it("exposes admin migration-status route", () => {
    const admin = readFileSync(join(process.cwd(), "server/adminOpsRoute.ts"), "utf8");
    expect(admin).toContain("/api/admin/migration-status");
  });
});
