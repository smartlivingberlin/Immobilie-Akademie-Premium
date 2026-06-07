import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("mysqlHealth", () => {
  it("exposes getMysqlHealth helper", async () => {
    const { getMysqlHealth } = await import("./mysqlHealth");
    expect(typeof getMysqlHealth).toBe("function");
  });

  it("registers admin mysql-health route", () => {
    const admin = readFileSync(resolve(process.cwd(), "server/adminOpsRoute.ts"), "utf-8");
    expect(admin).toContain("/api/admin/mysql-health");
    expect(admin).toContain("getMysqlHealth");
  });

  it("health endpoint reports db connectivity", () => {
    const index = readFileSync(resolve(process.cwd(), "server/_core/index.ts"), "utf-8");
    expect(index).toContain("getMysqlHealth");
    expect(index).toMatch(/db:\s*health\.ok/);
  });
});
