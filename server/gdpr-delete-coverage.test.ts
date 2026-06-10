import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

const routersSource = readFileSync(
  path.join(process.cwd(), "server/routers.ts"),
  "utf-8"
);

describe("GDPR delete coverage", () => {
  it("includes supplemental personal-data tables in the cleanup helper", () => {
    for (const table of [
      "spacedRepetition",
      "videoProgress",
      "examAuditLog",
      "pending_purchases",
      "otp_tokens",
      "password_reset_tokens",
      "presentation_codes",
      "trial_leads",
      "avv_agreements",
      "access_codes",
      "monitoring_log",
      "monitoring_log_old_0022",
    ]) {
      expect(routersSource).toContain(table);
    }
  });

  it("deletes Verwalter-Suite data on account removal", () => {
    expect(routersSource).toContain("deleteVerwalterUserData");
    const cleanupSource = readFileSync(
      path.join(process.cwd(), "server/verwalterGdprCleanup.ts"),
      "utf-8",
    );
    for (const table of [
      "verwalter_freigaben",
      "verwalter_events",
      "verwalter_buchungen",
      "verwalter_vorgaenge",
      "verwalter_objekte",
    ]) {
      expect(cleanupSource).toContain(table);
    }
  });

  it("uses the supplemental cleanup in admin and self-service delete flows", () => {
    const calls = routersSource.match(/runPersonalDataCleanup\(db,/g) ?? [];
    expect(calls).toHaveLength(2);
  });
});
