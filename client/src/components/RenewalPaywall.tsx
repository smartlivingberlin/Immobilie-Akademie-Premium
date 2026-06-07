import { useState } from "react";
import { RENEWAL_MONTHLY_EUR, RENEWAL_YEARLY_EUR } from "@shared/accessPolicy";

interface RenewalPaywallProps {
  accessExpiresAt?: string | Date | null;
}

export default function RenewalPaywall({ accessExpiresAt }: RenewalPaywallProps) {
  const [loading, setLoading] = useState<"month" | "year" | null>(null);

  const expiryLabel = accessExpiresAt
    ? new Date(accessExpiresAt).toLocaleDateString("de-DE")
    : "abgelaufen";

  const startCheckout = async (interval: "month" | "year") => {
    setLoading(interval);
    try {
      const res = await fetch("/api/stripe/renewal-checkout", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interval }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="relative min-h-[70vh] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-amber-200 max-w-md w-full p-8 text-center">
        <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-5">
          <span className="text-3xl">⏰</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Zugang abgelaufen</h2>
        <p className="text-slate-500 text-sm mb-6">
          Ihr inkludierter Zugangszeitraum endete am {expiryLabel}. Verlängern Sie für alle
          bereits gekauften Module — Rechner, KI-Tutor, Generatoren und Lerninhalte.
        </p>
        <div className="space-y-3">
          <button
            onClick={() => startCheckout("year")}
            disabled={loading !== null}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors text-sm"
          >
            {loading === "year" ? "Weiterleitung…" : `${RENEWAL_YEARLY_EUR} €/Jahr verlängern`}
          </button>
          <button
            onClick={() => startCheckout("month")}
            disabled={loading !== null}
            className="w-full border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-3 px-6 rounded-xl transition-colors text-sm"
          >
            {loading === "month" ? "Weiterleitung…" : `${RENEWAL_MONTHLY_EUR} €/Monat`}
          </button>
          <a href="/kurse" className="block text-slate-400 hover:text-slate-600 text-sm py-2">
            Neues Modul kaufen →
          </a>
        </div>
      </div>
    </div>
  );
}
