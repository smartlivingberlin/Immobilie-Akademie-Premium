import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("Owner key URL exposure", () => {
  const ownerDashboardSource = readFileSync(
    resolve(process.cwd(), "client/src/pages/OwnerDashboard.tsx"),
    "utf-8",
  );

  const azavPdfExportSource = readFileSync(
    resolve(process.cwd(), "client/src/components/AzavPdfExport.tsx"),
    "utf-8",
  );

  it("does not send owner key in OwnerDashboard API query strings", () => {
    expect(ownerDashboardSource).not.toMatch(/\/api\/owner\/[^`"'\s]*\?key=\$\{ownerKey\}/);
    expect(ownerDashboardSource).not.toContain("?key=${ownerKey}");
    expect(ownerDashboardSource).not.toContain("key=${ownerKey}&");
    expect(ownerDashboardSource).not.toContain("new URLSearchParams({ key: ownerKey");
    expect(ownerDashboardSource).toContain('"x-owner-key": ownerKey');
  });

  it("does not send owner key in AZAV PDF query strings", () => {
    expect(azavPdfExportSource).not.toContain("new URLSearchParams({ key: ownerKey");
    expect(azavPdfExportSource).toContain('headers: { "x-owner-key": ownerKey }');
  });
});
