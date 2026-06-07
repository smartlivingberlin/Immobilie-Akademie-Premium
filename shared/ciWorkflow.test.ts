import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("CI workflows", () => {
  const ci = readFileSync(resolve(process.cwd(), ".github/workflows/ci.yml"), "utf-8");
  const backup = readFileSync(resolve(process.cwd(), ".github/workflows/mysql-backup-r2.yml"), "utf-8");

  it("runs stripe guard E2E job with continue-on-error", () => {
    expect(ci).toContain("e2e-stripe:");
    expect(ci).toContain("continue-on-error: true");
    expect(ci).toContain("test:e2e:stripe-guards");
    expect(ci).toContain("vars.STRIPE_E2E_ENABLED == 'true'");
  });

  it("backup workflow supports dry_run and R2 latest path", () => {
    expect(backup).toContain("dry_run:");
    expect(backup).toContain("immobilien-akademie-smart_mysql_latest.sql.gz.gpg");
    expect(backup).toContain("docs/R2_ACTIVATION_CHECKLIST.md");
    expect(backup).not.toContain("Example");
  });
});
