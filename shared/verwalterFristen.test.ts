import { describe, expect, it } from "vitest";
import { FRISTEN_CHECKLISTE } from "./verwalterFristen";

describe("verwalterFristen", () => {
  it("enthält ETV- und Beschluss-Fristen", () => {
    expect(FRISTEN_CHECKLISTE.some((f) => f.category === "etv")).toBe(true);
    expect(FRISTEN_CHECKLISTE.some((f) => f.legalBasis.includes("§ 46"))).toBe(true);
  });
});
