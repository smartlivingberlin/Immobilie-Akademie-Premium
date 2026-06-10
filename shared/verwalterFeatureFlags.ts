/** Feature-Flags für Verwalter-Automatisierung (Default: aus = Beta-sicher). */

export function isVerwalterInboxEnabled(): boolean {
  return process.env.VERWALTER_INBOX_ENABLED === "1";
}

export function isVerwalterVoiceEnabled(): boolean {
  return process.env.VERWALTER_VOICE_ENABLED === "1";
}

export function isVerwalterBelegOcrEnabled(): boolean {
  return process.env.VERWALTER_BELEG_OCR_ENABLED === "1";
}

export function getVerwalterFeatureFlags(): Record<string, boolean> {
  return {
    inbox: isVerwalterInboxEnabled(),
    voice: isVerwalterVoiceEnabled(),
    belegOcr: isVerwalterBelegOcrEnabled(),
    toolsGating: process.env.VERWALTER_TOOLS_GATING === "1",
  };
}
