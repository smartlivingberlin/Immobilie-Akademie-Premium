import { describe, expect, it } from "vitest";
import { buildMigrationStatus, listMigrationFiles } from "./migrationStatus";

describe("migrationStatus", () => {
  it("lists sorted sql migrations", () => {
    const files = listMigrationFiles();
    expect(files.length).toBeGreaterThan(40);
    expect(files[0]).toMatch(/\.sql$/);
    expect(files).toContain("0038_schema_migrations.sql");
  });

  it("builds pending/applied counts", () => {
    const files = ["0000_a.sql", "0001_b.sql", "0002_c.sql"];
    const status = buildMigrationStatus(files, new Set(["0000_a.sql", "0001_b.sql"]));
    expect(status.applied).toBe(2);
    expect(status.pending).toBe(1);
    expect(status.pendingFiles).toEqual(["0002_c.sql"]);
    expect(status.lastApplied).toBe("0001_b.sql");
  });
});
