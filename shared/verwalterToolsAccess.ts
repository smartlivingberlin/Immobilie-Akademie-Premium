import { parseEnabledModuleTokens } from "./rechenpraxisAccess";
import { VERWALTER_TOOLS_MODULE_SENTINEL } from "./verwalterToolsProduct";

/** Wenn false (Default): Beta — alle eingeloggten Nutzer. Setze VERWALTER_TOOLS_GATING=1 für Paid-Zwang. */
export function hasVerwalterToolsGating(): boolean {
  return process.env.VERWALTER_TOOLS_GATING === "1";
}

export function hasVerwalterToolsAccess(
  enabledModules = "",
  role?: string | null,
): boolean {
  if (role === "admin") return true;
  if (!hasVerwalterToolsGating()) return true;

  const tokens = parseEnabledModuleTokens(enabledModules);
  return tokens.includes(VERWALTER_TOOLS_MODULE_SENTINEL);
}
