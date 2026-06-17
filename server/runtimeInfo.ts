import { isStripeWebhookManualReplayEnabled } from "./stripeWebhookReplay";

export type RuntimeGitShaSource = "RAILWAY_GIT_COMMIT_SHA" | "GIT_SHA" | "unknown";

export type RuntimeActivation = {
  /** S231K: manuelles Single-Event-Replay (Env-gated, default aus). */
  s231kManualReplayEnabled: boolean;
  /** S231K: Admin-Replay-Route ist in diesem Build enthalten. */
  s231kReplayRouteDeployed: boolean;
};

export type PublicRuntimeInfo = {
  gitSha: string | null;
  gitShaShort: string | null;
  gitShaSource: RuntimeGitShaSource;
  activation: RuntimeActivation;
};

function normalizeSha(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : null;
}

export function resolveRuntimeGitSha(): { sha: string | null; source: RuntimeGitShaSource } {
  const railway = normalizeSha(process.env.RAILWAY_GIT_COMMIT_SHA);
  if (railway) {
    return { sha: railway, source: "RAILWAY_GIT_COMMIT_SHA" };
  }

  const baked = normalizeSha(process.env.GIT_SHA);
  if (baked) {
    return { sha: baked, source: "GIT_SHA" };
  }

  return { sha: null, source: "unknown" };
}

export function toShortGitSha(sha: string | null): string | null {
  if (!sha) return null;
  return sha.length >= 7 ? sha.slice(0, 7) : sha;
}

export function getRuntimeActivation(): RuntimeActivation {
  return {
    s231kManualReplayEnabled: isStripeWebhookManualReplayEnabled(),
    s231kReplayRouteDeployed: true,
  };
}

/** Read-only Runtime-Metadaten für Deploy-SHA / Activation Reality Gates (S231L). */
export function getPublicRuntimeInfo(): PublicRuntimeInfo {
  const { sha, source } = resolveRuntimeGitSha();
  return {
    gitSha: sha,
    gitShaShort: toShortGitSha(sha),
    gitShaSource: source,
    activation: getRuntimeActivation(),
  };
}

export function gitShaMatchesExpected(liveSha: string | null, expectedSha: string): boolean {
  if (!liveSha || !expectedSha) return false;
  const live = liveSha.trim().toLowerCase();
  const expected = expectedSha.trim().toLowerCase();
  if (!live || !expected) return false;
  return live === expected || live.startsWith(expected) || expected.startsWith(live);
}
