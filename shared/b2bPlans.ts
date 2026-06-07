/** B2B White-Label Abo-Pläne */

export const B2B_PLANS = {
  starter: {
    id: "b2b_starter",
    name: "Starter",
    priceEur: 199,
    maxUsers: 5,
    enabledModules: "1,2",
    interval: "month" as const,
  },
  professional: {
    id: "b2b_professional",
    name: "Professional",
    priceEur: 399,
    maxUsers: 15,
    enabledModules: "1,2,3,4,5",
    interval: "month" as const,
  },
} as const;

export type B2bPlanId = keyof typeof B2B_PLANS;

export function getB2bPlan(planId: string) {
  return B2B_PLANS[planId as B2bPlanId] ?? null;
}

export const B2B_PLAN_FEATURES: Record<B2bPlanId, string[]> = {
  starter: [
    "Eigenes Logo & Farben",
    "Willkommenstext & Footer",
    "KI-Tutor für alle Nutzer",
    "Lernfortschritt pro Mitarbeiter",
    "E-Mail-Support",
  ],
  professional: [
    "Alles aus Starter",
    "Weiterbildungsnachweis-Export (§15b MaBV)",
    "Admin-Dashboard für Ihr Büro",
    "Inspect-Links für Partner-Demos",
    "Prioritäts-Support",
  ],
};

export function formatB2bModuleLabel(enabledModules: string): string {
  const count = enabledModules.split(",").filter(Boolean).length;
  return count >= 5 ? "Alle 5 Module" : `${count} Module frei wählbar`;
}

export function formatB2bUserLabel(maxUsers: number): string {
  return `${maxUsers} Mitarbeiter`;
}
