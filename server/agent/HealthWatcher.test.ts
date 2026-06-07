import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("HealthWatcher", () => {
  const source = readFileSync(
    resolve(process.cwd(), "server/agent/HealthWatcher.ts"),
    "utf-8",
  );

  it("checks /api/health for ok and db connected", () => {
    expect(source).toContain('expectedBody: \'"ok":true\'');
    expect(source).toContain('expectedBody: \'"db":"connected"\'');
    expect(source).toContain('["health_db", r]');
  });

  it("uses correct guard check names in recommendations", () => {
    expect(source).toContain("quiz_data_guard");
    expect(source).toContain("module_data_guard");
    expect(source).not.toContain("quiz_data?.ok");
    expect(source).not.toContain("module4_hints");
  });
});
