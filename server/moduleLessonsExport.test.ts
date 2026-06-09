import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { getModuleLessons } from "./moduleDayExtractor";

describe("module lessons export", () => {
  it("dist/data enthält exportierte Lerntage nach build", () => {
    const path = join(process.cwd(), "dist", "data", "module-lessons-3.json");
    expect(existsSync(path)).toBe(true);
    const lessons = JSON.parse(readFileSync(path, "utf8")) as unknown[];
    expect(lessons.length).toBeGreaterThanOrEqual(60);
  });

  it("getModuleLessons liefert M3-Inhalte", () => {
    const lessons = getModuleLessons(3);
    expect(lessons.length).toBeGreaterThanOrEqual(60);
    expect(lessons[0]?.title).toBeTruthy();
  });
});
