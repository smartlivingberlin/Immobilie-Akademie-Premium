import { describe, expect, it, vi } from "vitest";
import { backfillAccessExpiresAt } from "../server/backfillAccess";

describe("backfillAccessExpiresAt", () => {
  it("returns dry-run preview without updates", async () => {
    const query = vi.fn()
      .mockResolvedValueOnce([[{ c: 1 }]]) // columnExists
      .mockResolvedValueOnce([[
        { id: 1, email: "a@test.de", enabledModules: "2", createdAt: "2024-01-01" },
      ]]);

    const db = { $client: { query } };
    const result = await backfillAccessExpiresAt(db, { dryRun: true });

    expect(result.dryRun).toBe(true);
    expect(result.candidates).toBe(1);
    expect(result.updated).toBe(0);
    expect(result.rows[0]?.email).toBe("a@test.de");
    expect(query).toHaveBeenCalledTimes(2);
  });
});
