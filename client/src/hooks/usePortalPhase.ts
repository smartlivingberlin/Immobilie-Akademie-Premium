import { useState, useEffect } from "react";

export type Phase = "A" | "B" | "C" | "D";

export interface PhaseConfig {
  id: Phase;
  name: string;
  description: string;
  badges: { azav: boolean; zfu: boolean; ihk: boolean; bgs: boolean };
  labels: {
    productType: string;
    certificationNote: string;
    faqCertAnswer: string;
    footerBadge1: string;
    footerBadge2: string;
  };
  canSell: boolean;
  requirements: string[];
  unlocked: boolean;
}

let _cachedPhase: { phase: Phase; config: PhaseConfig } | null = null;

export function usePortalPhase() {
  const [data, setData] = useState(_cachedPhase);
  const [loading, setLoading] = useState(!_cachedPhase);

  useEffect(() => {
    if (_cachedPhase) return;
    fetch("/api/portal-phase")
      .then((r) => r.json())
      .then((d) => {
        _cachedPhase = d;
        setData(d);
        setLoading(false);
      })
      .catch(() => {
        const fallback = { phase: "A" as Phase, config: null as any };
        setData(fallback);
        setLoading(false);
      });
  }, []);

  return { phase: data?.phase ?? "A", config: data?.config, loading };
}
