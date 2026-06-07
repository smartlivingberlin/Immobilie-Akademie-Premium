import { describe, expect, it } from "vitest";
import {
  aggregateWeiterbildungLogs,
  defaultWeiterbildungDateRange,
  MABV_PFlicht_STUNDEN,
} from "./weiterbildung";

describe("aggregateWeiterbildungLogs", () => {
  it("filters logs by date range and sums hours", () => {
    const summary = aggregateWeiterbildungLogs(
      [
        { moduleId: 2, dayId: 1, openedAt: "2025-01-15T10:00:00Z", durationSeconds: 3600, completed: true },
        { moduleId: 2, dayId: 2, openedAt: "2025-02-01T10:00:00Z", durationSeconds: 7200, completed: true },
        { moduleId: 2, dayId: 3, openedAt: "2020-01-01T10:00:00Z", durationSeconds: 36000, completed: true },
      ],
      "2025-01-01",
      "2025-12-31",
    );

    expect(summary.gesamtStunden).toBe(3);
    expect(summary.gesamtSitzungen).toBe(2);
    expect(summary.pflichtErfuellt).toBe(false);
    expect(summary.moduleBreakdown).toHaveLength(1);
    expect(summary.tagesNachweis).toHaveLength(2);
  });

  it("marks 20h requirement as fulfilled", () => {
    const summary = aggregateWeiterbildungLogs(
      [
        { moduleId: 2, dayId: 1, openedAt: "2025-06-01T10:00:00Z", durationSeconds: 20 * 3600, completed: true },
      ],
      "2025-01-01",
      "2025-12-31",
    );

    expect(summary.pflichtErfuellt).toBe(true);
    expect(summary.fortschrittProzent).toBe(100);
    expect(summary.pflichtStunden).toBe(MABV_PFlicht_STUNDEN);
  });

  it("defaults to a three-year window", () => {
    const range = defaultWeiterbildungDateRange(new Date("2026-06-07"));
    expect(range.endDate).toBe("2026-06-07");
    expect(range.startDate).toBe("2023-06-07");
  });
});
