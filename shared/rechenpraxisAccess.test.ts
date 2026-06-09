import { describe, expect, it } from "vitest";
import {
  hasFullRechenpraxisAccess,
  isFreemiumRechenpraxisTask,
  RECHENPRAXIS_FREEMIUM_TASK_IDS,
} from "./rechenpraxisAccess";

describe("rechenpraxisAccess", () => {
  it("erkennt Vollzugang über rp-Sentinel", () => {
    expect(hasFullRechenpraxisAccess("rp")).toBe(true);
  });

  it("erkennt Vollzugang über Modul 1–5", () => {
    expect(hasFullRechenpraxisAccess("1,3")).toBe(true);
    expect(hasFullRechenpraxisAccess("")).toBe(false);
  });

  it("definiert 10 Freemium-WEG-Aufgaben", () => {
    expect(RECHENPRAXIS_FREEMIUM_TASK_IDS).toHaveLength(10);
    expect(isFreemiumRechenpraxisTask(7)).toBe(true);
    expect(isFreemiumRechenpraxisTask(1)).toBe(false);
  });
});
