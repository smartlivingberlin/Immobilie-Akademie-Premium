import { describe, expect, it } from "vitest";
import { STRIPE_LIVE_CHECKLIST_DEFS } from "./stripeLiveChecklist";

describe("stripeLiveChecklist", () => {
  it("defines stripe live key check", () => {
    const item = STRIPE_LIVE_CHECKLIST_DEFS.find((i) => i.id === "stripe_live_key");
    expect(item?.label).toContain("sk_live");
  });

  it("has legal and ops categories", () => {
    const categories = new Set(STRIPE_LIVE_CHECKLIST_DEFS.map((i) => i.category));
    expect(categories.has("legal")).toBe(true);
    expect(categories.has("stripe")).toBe(true);
  });
});
