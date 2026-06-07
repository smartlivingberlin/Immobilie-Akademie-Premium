import { describe, expect, it } from "vitest";
import { getProtectedModuleDataRequirement } from "./_core/vite";

describe("module data guard", () => {
  it("protects module course JSON files by module", () => {
    expect(getProtectedModuleDataRequirement("/module1.json")).toEqual([1]);
    expect(getProtectedModuleDataRequirement("/module2.json")).toEqual([2]);
    expect(getProtectedModuleDataRequirement("/module2-content.json")).toEqual([2]);
    expect(getProtectedModuleDataRequirement("/module3.json")).toEqual([3]);
    expect(getProtectedModuleDataRequirement("/module4.json")).toEqual([4]);
    expect(getProtectedModuleDataRequirement("/module4-content.json")).toEqual([4]);
    expect(getProtectedModuleDataRequirement("/module5.json")).toEqual([5]);
  });

  it("protects quiz question bank for all modules", () => {
    expect(getProtectedModuleDataRequirement("/all-questions.json")).toEqual([1, 2, 3, 4, 5]);
  });

  it("does not block unrelated public data files", () => {
    expect(getProtectedModuleDataRequirement("/glossary.json")).toBeNull();
    expect(getProtectedModuleDataRequirement("/unknown.json")).toBeNull();
  });
});
