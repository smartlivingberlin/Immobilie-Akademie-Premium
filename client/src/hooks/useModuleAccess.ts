/**
 * Hook für Modulzugangsschutz
 * Fragt serverseitig ab welche Module der Nutzer sehen darf
 */
import { trpc } from "@/lib/trpc";

function normalizeEnabledModules(input: unknown): number[] | null {
  if (!input) return null;

  // Schon ein Array (ideal)
  if (Array.isArray(input)) {
    const arr = input.map(Number).filter((n) => Number.isFinite(n));
    return arr.length ? arr : null;
  }

  // Einzelne Zahl
  if (typeof input === "number" && Number.isFinite(input)) return [input];

  // String wie "1" oder "1,2,3"
  if (typeof input === "string") {
    const arr = input
      .split(/[,;\s]+/)
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => Number(s))
      .filter((n) => Number.isFinite(n));
    return arr.length ? arr : null;
  }

  // Falls API mal { enabledModules: ... } liefert
  if (typeof input === "object" && input !== null && "enabledModules" in input) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return normalizeEnabledModules((input as any).enabledModules);
  }

  return null;
}

export function useModuleAccess() {
  const { data, isLoading } = trpc.modules.myAccess.useQuery();

  const normalized = normalizeEnabledModules(data) ?? [1];

  const canAccessModule = (moduleId: number): boolean => {
    // während Laden: wenigstens Modul 1 anzeigen (verhindert „alles leer“)
    if (isLoading) return moduleId === 1;
    return normalized.includes(moduleId);
  };

  return { enabledModules: normalized, canAccessModule, isLoading };
}
