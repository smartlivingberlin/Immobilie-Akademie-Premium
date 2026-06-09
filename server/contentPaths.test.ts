import { describe, expect, it } from "vitest";
import { existsSync } from "fs";
import { join } from "path";
import { resolveKnowledgeDir, moduleContentFileExists } from "./contentPaths";

describe("contentPaths", () => {
  it("finds knowledge dir in dev layout", () => {
    const dir = resolveKnowledgeDir();
    expect(existsSync(join(dir, "modul_1.txt"))).toBe(true);
  });

  it("module content files exist in workspace", () => {
    expect(moduleContentFileExists("client/src/pages/modules/Module1Content.ts")).toBe(true);
  });
});
