import { afterEach, describe, expect, it } from "vitest";
import {
  getPublicRuntimeInfo,
  getRuntimeActivation,
  gitShaMatchesExpected,
  resolveRuntimeGitSha,
  toShortGitSha,
} from "./runtimeInfo";

describe("runtimeInfo (S231L)", () => {
  const envKeys = ["RAILWAY_GIT_COMMIT_SHA", "GIT_SHA", "STRIPE_WEBHOOK_MANUAL_REPLAY_ENABLED"] as const;

  afterEach(() => {
    for (const key of envKeys) {
      delete process.env[key];
    }
  });

  it("prefers RAILWAY_GIT_COMMIT_SHA over GIT_SHA", () => {
    process.env.RAILWAY_GIT_COMMIT_SHA = "006076e37658e876d213e16a16eab6a2fc7c47d3";
    process.env.GIT_SHA = "deadbeef";
    expect(resolveRuntimeGitSha()).toEqual({
      sha: "006076e37658e876d213e16a16eab6a2fc7c47d3",
      source: "RAILWAY_GIT_COMMIT_SHA",
    });
  });

  it("falls back to GIT_SHA when Railway metadata is absent", () => {
    process.env.GIT_SHA = "abc1234567890";
    expect(resolveRuntimeGitSha()).toEqual({
      sha: "abc1234567890",
      source: "GIT_SHA",
    });
  });

  it("returns unknown when no deploy SHA is configured", () => {
    expect(resolveRuntimeGitSha()).toEqual({ sha: null, source: "unknown" });
  });

  it("exposes short git sha and activation flags", () => {
    process.env.RAILWAY_GIT_COMMIT_SHA = "006076e37658e876d213e16a16eab6a2fc7c47d3";
    const info = getPublicRuntimeInfo();
    expect(info.gitShaShort).toBe("006076e");
    expect(info.gitShaSource).toBe("RAILWAY_GIT_COMMIT_SHA");
    expect(info.activation.s231kReplayRouteDeployed).toBe(true);
    expect(info.activation.s231kManualReplayEnabled).toBe(false);
  });

  it("reports manual replay activation from env", () => {
    process.env.STRIPE_WEBHOOK_MANUAL_REPLAY_ENABLED = "1";
    expect(getRuntimeActivation().s231kManualReplayEnabled).toBe(true);
  });

  it("matches expected deploy SHA with prefix tolerance", () => {
    expect(gitShaMatchesExpected("006076e37658e876d213e16a16eab6a2fc7c47d3", "006076e")).toBe(true);
    expect(gitShaMatchesExpected("006076e", "006076e37658e876d213e16a16eab6a2fc7c47d3")).toBe(true);
    expect(gitShaMatchesExpected("006076e37658e876d213e16a16eab6a2fc7c47d3", "b1a54d2")).toBe(false);
    expect(gitShaMatchesExpected(null, "006076e")).toBe(false);
  });

  it("shortens git sha safely", () => {
    expect(toShortGitSha("006076e37658e876d213e16a16eab6a2fc7c47d3")).toBe("006076e");
    expect(toShortGitSha("abc")).toBe("abc");
    expect(toShortGitSha(null)).toBeNull();
  });
});
