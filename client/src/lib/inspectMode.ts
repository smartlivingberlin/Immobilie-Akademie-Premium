const INSPECT_SESSION_KEY = "inspect_mode";

export function isInspectModeSync(): boolean {
  if (typeof window === "undefined") return false;
  if (sessionStorage.getItem(INSPECT_SESSION_KEY) === "1") return true;
  return new URLSearchParams(window.location.search).get("inspect") === "1";
}

export function markInspectModeActive(): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(INSPECT_SESSION_KEY, "1");
}

export function clearInspectModeClientState(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(INSPECT_SESSION_KEY);
}

/** Syncs inspect mode from the httpOnly server cookie via API. */
export async function activateInspectModeFromServer(): Promise<boolean> {
  if (typeof window === "undefined") return false;
  if (isInspectModeSync()) {
    markInspectModeActive();
    return true;
  }

  try {
    const response = await fetch("/api/auth/inspect-status", { credentials: "include" });
    if (!response.ok) return false;
    const data = await response.json() as { inspect?: boolean };
    if (data.inspect) {
      markInspectModeActive();
      return true;
    }
  } catch {
    return false;
  }

  return false;
}
