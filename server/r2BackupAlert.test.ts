import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("R2 backup failure alert workflow", () => {
  it("defines notify-failure job with OPS_ALERT_WEBHOOK_URL", () => {
    const workflow = readFileSync(
      resolve(process.cwd(), ".github/workflows/mysql-backup-r2.yml"),
      "utf-8",
    );
    expect(workflow).toContain("notify-failure:");
    expect(workflow).toContain("OPS_ALERT_WEBHOOK_URL");
    expect(workflow).toContain("if: failure()");
  });
});
