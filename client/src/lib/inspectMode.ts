const INSPECT_SESSION_KEY = "inspect_mode";
const INSPECT_EXPIRES_KEY = "inspect_mode_expires_at";

function isClientExpired(): boolean {
  const raw = sessionStorage.getItem(INSPECT_EXPIRES_KEY);
  if (!raw) return false;
  const expiresAt = Number(raw);
  return !Number.isNaN(expiresAt) && expiresAt > 0 && Date.now() > expiresAt;
}

export function isInspectModeSync(): boolean {
  if (typeof window === "undefined") return false;
  if (isClientExpired()) {
    clearInspectModeClientState();
    return false;
  }
  if (sessionStorage.getItem(INSPECT_SESSION_KEY) === "1") return true;
  return new URLSearchParams(window.location.search).get("inspect") === "1";
}

export function markInspectModeActive(expiresAt?: number | null): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(INSPECT_SESSION_KEY, "1");
  if (expiresAt && !Number.isNaN(expiresAt)) {
    sessionStorage.setItem(INSPECT_EXPIRES_KEY, String(expiresAt));
  }
}

export function clearInspectModeClientState(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(INSPECT_SESSION_KEY);
  sessionStorage.removeItem(INSPECT_EXPIRES_KEY);
}

/** Syncs inspect mode from the httpOnly server cookie via API. */
export async function activateInspectModeFromServer(): Promise<boolean> {
  if (typeof window === "undefined") return false;

  if (isInspectModeSync()) {
    try {
      const response = await fetch("/api/auth/inspect-status", { credentials: "include" });
      if (response.ok) {
        const data = await response.json() as { inspect?: boolean; expiresAt?: number | null };
        if (data.inspect) {
          markInspectModeActive(data.expiresAt ?? null);
          return true;
        }
      }
    } catch {
      // Fall through to clear stale client state below.
    }
    clearInspectModeClientState();
    return false;
  }

  try {
    const response = await fetch("/api/auth/inspect-status", { credentials: "include" });
    if (!response.ok) return false;
    const data = await response.json() as { inspect?: boolean; expiresAt?: number | null };
    if (data.inspect) {
      markInspectModeActive(data.expiresAt ?? null);
      return true;
    }
  } catch {
    return false;
  }

  return false;
}
