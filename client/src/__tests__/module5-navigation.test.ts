import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("Module5Detail navigation polish", () => {
  const source = readFileSync(
    resolve(process.cwd(), "client/src/pages/modules/Module5Detail.tsx"),
    "utf-8",
  );

  it("loads protected module data with credentials for authenticated sessions", () => {
    expect(source).toContain('fetch("/data/module5.json", { credentials: "include" })');
    expect(source).toContain("MODULE5_DAYS");
    expect(source).toContain("getModuleUeCount(5)");
  });

  it("syncs day selection with URL /modul/5/tag/:day", () => {
    expect(source).toContain('useRoute("/modul/5/tag/:day")');
    expect(source).toContain("if (params?.day) setSelectedDay");
    expect(source).toContain("navigate(`/modul/5/tag/${dayNum}`)");
    expect(source).toContain("navigate(`/modul/5/tag/${nextNum}`)");
  });

  it("supports error retry via LoadingHandler", () => {
    expect(source).toContain("loadError");
    expect(source).toContain("onRetry={loadModuleData}");
    expect(source).toMatch(/dayRange: \[31, 40\]/);
  });
});
