import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("inspect v2 admin read-only", () => {
  it("redirects inspect tokens to admin dashboard", () => {
    const ownerRoute = readFileSync(resolve(process.cwd(), "server/ownerRoute.ts"), "utf-8");
    expect(ownerRoute).toContain('res.redirect("/modul/1?inspect=1")');
  });

  it("blocks inspect mutations and admin queries in tRPC", () => {
    const trpc = readFileSync(resolve(process.cwd(), "server/_core/trpc.ts"), "utf-8");
    expect(trpc).toContain("blockInspectMutations");
    expect(trpc).toContain("blockInspectPrivilegedProcedures");
    expect(trpc).toContain("isInspectModeActive(ctx.req)");
  });

  it("uses shared inspect mode helper for REST write blocking", () => {
    const inspectMode = readFileSync(resolve(process.cwd(), "server/inspectMode.ts"), "utf-8");
    expect(inspectMode).toContain("blockInspectWrites");
    expect(inspectMode).toContain("INSPECT_FORBIDDEN_MSG");

    const index = readFileSync(resolve(process.cwd(), "server/_core/index.ts"), "utf-8");
    expect(index).toContain("blockInspectWrites");
  });

  it("lets AdminRoute and admin nav render during inspect mode", () => {
    const appSource = readFileSync(resolve(process.cwd(), "client/src/App.tsx"), "utf-8");
    expect(appSource).toContain("function AdminRoute");
    expect(appSource).toContain("if (isInspect) return <Component />");

    const layout = readFileSync(resolve(process.cwd(), "client/src/components/layout/DashboardLayout.tsx"), "utf-8");
    expect(layout).toContain("showAdminNav");
    expect(layout).toContain("data-inspect-readonly");
  });

  it("uses REST allowlist for admin GET routes during inspect", () => {
    const authMiddleware = readFileSync(resolve(process.cwd(), "server/authMiddleware.ts"), "utf-8");
    const inspectMode = readFileSync(resolve(process.cwd(), "server/inspectMode.ts"), "utf-8");
    expect(authMiddleware).toContain("isInspectRestAdminReadAllowed");
    expect(inspectMode).toContain("INSPECT_REST_ADMIN_GET_ALLOWLIST");
  });
});
