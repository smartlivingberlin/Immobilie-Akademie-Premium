import { describe, expect, it, afterEach } from "vitest";
import {
  hasVerwalterToolsAccess,
  hasVerwalterToolsGating,
} from "./verwalterToolsAccess";
import { VERWALTER_TOOLS_MODULE_SENTINEL } from "./verwalterToolsProduct";

describe("verwalterToolsAccess", () => {
  const orig = process.env.VERWALTER_TOOLS_GATING;

  afterEach(() => {
    if (orig !== undefined) process.env.VERWALTER_TOOLS_GATING = orig;
    else delete process.env.VERWALTER_TOOLS_GATING;
  });

  it("beta: ohne Gating hat jeder Login-Zugang", () => {
    delete process.env.VERWALTER_TOOLS_GATING;
    expect(hasVerwalterToolsGating()).toBe(false);
    expect(hasVerwalterToolsAccess("", "user")).toBe(true);
  });

  it("mit Gating: nur vt-Sentinel oder Admin", () => {
    process.env.VERWALTER_TOOLS_GATING = "1";
    expect(hasVerwalterToolsAccess("", "user")).toBe(false);
    expect(hasVerwalterToolsAccess(VERWALTER_TOOLS_MODULE_SENTINEL, "user")).toBe(true);
    expect(hasVerwalterToolsAccess("", "admin")).toBe(true);
  });
});
