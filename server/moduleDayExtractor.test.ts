import { describe, expect, it } from "vitest";
import { join } from "path";
import { extractDaysFromModuleFile, parseModuleDayLessons } from "./moduleDayExtractor";

describe("moduleDayExtractor", () => {
  const root = process.cwd();

  it("extrahiert Modul-1-Lerntage", () => {
    const days = extractDaysFromModuleFile(join(root, "client/src/pages/modules/Module1Content.ts"));
    expect(days.length).toBeGreaterThanOrEqual(15);
    expect(days[0].title.length).toBeGreaterThan(5);
    expect(days[0].theory.length).toBeGreaterThan(20);
  });

  it("extrahiert Modul-5 mit vielen Lerntagen (§34i)", () => {
    const lessons = parseModuleDayLessons(5);
    expect(lessons.length).toBeGreaterThanOrEqual(35);
    expect(lessons[0].readAloudText).toContain(lessons[0].title);
    expect(lessons[0].source).toBe("module_day");
  });

  it("readAloudText entspricht Titel + Inhalt", () => {
    const lessons = parseModuleDayLessons(1);
    const first = lessons[0];
    expect(first.readAloudText).toBe(`${first.title}. ${first.content}`);
  });
});
