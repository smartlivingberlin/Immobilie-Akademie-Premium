import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("Module4Detail tab structure", () => {
  it("does not nest TabsTrigger components (Radix breaks on nested triggers)", () => {
    const source = readFileSync(
      resolve(process.cwd(), "client/src/pages/modules/Module4Detail.tsx"),
      "utf-8"
    );

    expect(source).not.toMatch(/<TabsTrigger[^>]*>\s*<TabsTrigger/);
    expect(source).toMatch(/<TabsTrigger value="task"/);
    expect(source).toMatch(/<TabsTrigger value="videos"/);
  });

  it("loads protected module data with credentials for authenticated sessions", () => {
    const source = readFileSync(
      resolve(process.cwd(), "client/src/pages/modules/Module4Detail.tsx"),
      "utf-8"
    );

    expect(source).toContain('fetch("/data/module4.json", { credentials: "include" })');
    expect(source).toContain('fetch("/data/module4-content.json", { credentials: "include" })');
  });
});
