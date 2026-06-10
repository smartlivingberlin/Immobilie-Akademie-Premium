import { describe, expect, it } from "vitest";
import { resolvePostLoginRedirect } from "@/lib/postLoginRedirect";

describe("resolvePostLoginRedirect", () => {
  it("nutzt redirect-Query wenn sicher", () => {
    expect(resolvePostLoginRedirect("/modul/1", "?redirect=/rechenpraxis")).toBe("/rechenpraxis");
  });

  it("lehnt externe URLs ab", () => {
    expect(resolvePostLoginRedirect("/modul/1", "?redirect=//evil.example")).toBe("/modul/1");
  });

  it("fallback ohne redirect", () => {
    expect(resolvePostLoginRedirect("/modul/1", "")).toBe("/modul/1");
  });
});
