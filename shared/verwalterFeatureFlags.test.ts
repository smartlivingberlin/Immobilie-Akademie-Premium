import { describe, expect, it, afterEach } from "vitest";
import {
  getVerwalterFeatureFlags,
  isVerwalterInboxEnabled,
  isVerwalterVoiceEnabled,
} from "./verwalterFeatureFlags";

describe("verwalterFeatureFlags", () => {
  const saved: Record<string, string | undefined> = {};

  afterEach(() => {
    for (const [k, v] of Object.entries(saved)) {
      if (v === undefined) delete process.env[k];
      else process.env[k] = v;
    }
  });

  it("defaults automation flags to off", () => {
    saved.VERWALTER_INBOX_ENABLED = process.env.VERWALTER_INBOX_ENABLED;
    saved.VERWALTER_VOICE_ENABLED = process.env.VERWALTER_VOICE_ENABLED;
    delete process.env.VERWALTER_INBOX_ENABLED;
    delete process.env.VERWALTER_VOICE_ENABLED;
    expect(isVerwalterInboxEnabled()).toBe(false);
    expect(isVerwalterVoiceEnabled()).toBe(false);
  });

  it("reads enabled flags from env", () => {
    saved.VERWALTER_INBOX_ENABLED = process.env.VERWALTER_INBOX_ENABLED;
    process.env.VERWALTER_INBOX_ENABLED = "1";
    expect(getVerwalterFeatureFlags().inbox).toBe(true);
  });
});
