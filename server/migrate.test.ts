import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";

describe("migrate ledger", () => {
  it("0038 creates schema_migrations table", () => {
    const sql = readFileSync(
      join(process.cwd(), "drizzle/migrations/0038_schema_migrations.sql"),
      "utf8",
    );
    expect(sql).toContain("schema_migrations");
  });

  it("migrate.ts uses ledger skip logic", () => {
    const src = readFileSync(join(process.cwd(), "server/migrate.ts"), "utf8");
    expect(src).toContain("isMigrationApplied");
    expect(src).toContain("markMigrationApplied");
  });
});
