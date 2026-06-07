/** Zentrale Modul-Metadaten — Lerntage & UE (Lernpfad) */

export const MODULE_META: Record<number, { days: number; ue: number }> = {
  1: { days: 20, ue: 160 },
  2: { days: 60, ue: 480 },
  3: { days: 80, ue: 640 },
  4: { days: 40, ue: 320 },
  5: { days: 40, ue: 320 },
};

export function getModuleDayCount(moduleId: number): number {
  return MODULE_META[moduleId]?.days ?? 20;
}

export function getModuleUeCount(moduleId: number): number {
  return MODULE_META[moduleId]?.ue ?? 160;
}

export function formatModuleDuration(moduleId: number): string {
  return `${getModuleDayCount(moduleId)} Tage`;
}

export function formatModuleUe(moduleId: number): string {
  return `${getModuleUeCount(moduleId)} UE`;
}
