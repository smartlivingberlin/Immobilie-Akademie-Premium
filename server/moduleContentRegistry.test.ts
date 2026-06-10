import { describe, expect, it } from "vitest";
import { getModuleLessons, parseModuleDayLessons } from "./moduleDayExtractor";
import {
  getExpectedDayCount,
  MODULE_CONTENT_REGISTRY,
  validateModuleContentFiles,
} from "./moduleContentRegistry";

describe("moduleContentRegistry", () => {
  it("alle Registry-Dateien existieren im Workspace", () => {
    for (const id of [1, 2, 3, 4, 5]) {
      const v = validateModuleContentFiles(id);
      expect(v.missing, `M${id} fehlt: ${v.missing.join(", ")}`).toEqual([]);
    }
  });

  it("extrahierte Lerntage entsprechen erwarteten Tagen", () => {
    const counts = Object.keys(MODULE_CONTENT_REGISTRY).map((id) => {
      const moduleId = Number(id);
      return {
        moduleId,
        extracted: parseModuleDayLessons(moduleId).length,
        expected: getExpectedDayCount(moduleId),
      };
    });
    for (const { moduleId, extracted, expected } of counts) {
      expect(extracted, `M${moduleId}`).toBeGreaterThanOrEqual(expected);
    }
  });

  it("M2 hat 60 und M4 hat 40 Lerntage (PR-A Fix)", () => {
    expect(parseModuleDayLessons(2).length).toBe(60);
    expect(parseModuleDayLessons(4).length).toBe(40);
  });

  it("getModuleLessons liefert Inhalte für M4", () => {
    const lessons = getModuleLessons(4);
    expect(lessons.length).toBe(40);
  });
});
