import { RECHENPRAXIS_MODULE_SENTINEL } from "./rechenpraxisProduct";

/** Erste 10 WEG-Aufgaben (nach ID) — Freemium ohne Vollabo */
export const RECHENPRAXIS_FREEMIUM_TASK_IDS = [
  7, 15, 16, 17, 28, 33, 40, 96, 97, 98,
] as const;

export const RECHENPRAXIS_FREEMIUM_BEREICH = "WEG-Hausgeld & Abrechnung";

export function parseEnabledModuleTokens(enabledModules = ""): string[] {
  return String(enabledModules)
    .split(",")
    .map((m) => m.trim())
    .filter(Boolean);
}

export function hasFullRechenpraxisAccess(
  enabledModules = "",
  role?: string | null,
): boolean {
  if (role === "admin") return true;
  const tokens = parseEnabledModuleTokens(enabledModules);
  if (tokens.includes(RECHENPRAXIS_MODULE_SENTINEL)) return true;
  const numeric = tokens.map((m) => parseInt(m, 10)).filter((n) => !Number.isNaN(n));
  return [1, 2, 3, 4, 5].some((m) => numeric.includes(m));
}

export function isFreemiumRechenpraxisTask(taskId: number): boolean {
  return (RECHENPRAXIS_FREEMIUM_TASK_IDS as readonly number[]).includes(taskId);
}
