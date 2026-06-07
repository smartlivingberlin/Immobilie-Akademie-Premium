import {
  getModulePriceConfig,
  getStripePriceConfig,
  STRIPE_PRICE_ENV_KEYS,
} from "./stripePriceIds";

export type StripePriceReadiness = {
  subscriptions: { total: number; configured: number; missing: string[] };
  modules: { total: number; configured: number; missing: string[] };
  allSubscriptionsReady: boolean;
  allModulesReady: boolean;
  liveReady: boolean;
};

export function getStripePriceReadiness(): StripePriceReadiness {
  const subs = getStripePriceConfig();
  const mods = getModulePriceConfig();
  const subEntries = Object.entries(subs);
  const missingSubs = subEntries.filter(([, p]) => !p.configured).map(([key]) => key);
  const missingMods = mods.filter((p) => !p.configured).map((p) => p.productId);

  const subscriptions = {
    total: Object.keys(STRIPE_PRICE_ENV_KEYS).length,
    configured: subEntries.filter(([, p]) => p.configured).length,
    missing: missingSubs,
  };
  const modules = {
    total: mods.length,
    configured: mods.filter((p) => p.configured).length,
    missing: missingMods,
  };

  return {
    subscriptions,
    modules,
    allSubscriptionsReady: subscriptions.configured === subscriptions.total,
    allModulesReady: modules.configured === modules.total,
    liveReady: subscriptions.configured === subscriptions.total && modules.configured === modules.total,
  };
}
