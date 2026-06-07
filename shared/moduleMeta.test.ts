import { describe, expect, it } from "vitest";
import { getModuleDayCount, getModuleUeCount } from "./moduleMeta";

describe("moduleMeta", () => {
  it("matches NightCron day counts", () => {
    expect(getModuleDayCount(1)).toBe(20);
    expect(getModuleDayCount(2)).toBe(60);
    expect(getModuleDayCount(3)).toBe(80);
    expect(getModuleDayCount(4)).toBe(40);
    expect(getModuleDayCount(5)).toBe(40);
  });

  it("returns UE for module 4", () => {
    expect(getModuleUeCount(4)).toBe(320);
  });
});
