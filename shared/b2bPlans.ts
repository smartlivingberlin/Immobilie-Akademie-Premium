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
