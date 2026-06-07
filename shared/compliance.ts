/** §15b MaBV Compliance-SKU — Weiterbildungsnachweis ohne Vollkurs */

export const COMPLIANCE_PRODUCT_ID = "compliance_20h";
export const COMPLIANCE_YEARLY_EUR = 249;

export function isComplianceActive(
  complianceExpiresAt: Date | string | null | undefined,
  reference = new Date(),
): boolean {
  if (!complianceExpiresAt) return false;
  return new Date(complianceExpiresAt) > reference;
}

/** Zugang zum Weiterbildungsnachweis: Admin, Modulzugang oder Compliance-Abo */
export function hasWeiterbildungsnachweisAccess(user: {
  role?: string;
  enabledModules?: string | null;
  complianceExpiresAt?: Date | string | null;
}): boolean {
  if (user.role === "admin") return true;
  const modules = (user.enabledModules || "").split(",").map((m) => m.trim()).filter(Boolean);
  if (modules.length > 0) return true;
  return isComplianceActive(user.complianceExpiresAt);
}
