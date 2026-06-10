import { describe, expect, it } from "vitest";
import { mapWithConcurrency } from "./kursbuchClaude";

describe("mapWithConcurrency", () => {
  it("verarbeitet alle Items mit begrenzter Parallelität", async () => {
    const items = [1, 2, 3, 4, 5];
    let maxConcurrent = 0;
    let current = 0;

    const results = await mapWithConcurrency(items, 2, async (n) => {
      current++;
      maxConcurrent = Math.max(maxConcurrent, current);
      await new Promise((r) => setTimeout(r, 10));
      current--;
      return n * 2;
    });

    expect(results).toEqual([2, 4, 6, 8, 10]);
    expect(maxConcurrent).toBeLessThanOrEqual(2);
  });
});
