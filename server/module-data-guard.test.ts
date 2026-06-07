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

  it("does not block public data files that are not module course content", () => {
    expect(getProtectedModuleDataRequirement("/all-questions.json")).toBeNull();
    expect(getProtectedModuleDataRequirement("/glossary.json")).toBeNull();
    expect(getProtectedModuleDataRequirement("/unknown.json")).toBeNull();
  });
});
