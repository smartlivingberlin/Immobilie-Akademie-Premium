import { describe, expect, it } from "vitest";
import { buildFristBatchVorgaenge, resolveFristBatchItems } from "./verwalterFristBatch";
import { FRISTEN_CHECKLISTE } from "./verwalterFristen";

describe("verwalterFristBatch", () => {
  it("uses all fristen when no filter", () => {
    expect(resolveFristBatchItems()).toHaveLength(FRISTEN_CHECKLISTE.length);
  });

  it("filters by frist ids", () => {
    const items = resolveFristBatchItems(["etv-einladung"]);
    expect(items).toHaveLength(1);
    expect(items[0]?.id).toBe("etv-einladung");
  });

  it("builds vorgang inputs with faelligAm", () => {
    const batch = buildFristBatchVorgaenge("obj1", "2026-06-10", ["etv-einladung"]);
    expect(batch[0]?.objektId).toBe("obj1");
    expect(batch[0]?.faelligAm).toBe("2026-07-01");
  });
});
