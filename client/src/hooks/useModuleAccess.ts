/**
 * Hook für Modulzugangsschutz
 * Fragt serverseitig ab welche Module der Nutzer sehen darf
 */
import { trpc } from "@/lib/trpc";

export function useModuleAccess() {
  const { data: enabledModules, isLoading } = trpc.modules.myAccess.useQuery();

  const canAccessModule = (moduleId: number): boolean => {
    if (isLoading) return false;
    if (!enabledModules) return moduleId === 1; // Fallback: nur Modul 1
    return enabledModules.includes(moduleId);
  };

  return { enabledModules: enabledModules ?? [1], canAccessModule, isLoading };
}
