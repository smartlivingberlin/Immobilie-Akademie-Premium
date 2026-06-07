import { useState } from "react";
import { Link } from "wouter";
import { SEO } from "@/components/SEO";
import { Calculator, CheckCircle2, ArrowRight } from "lucide-react";
import { RECHENPRAXIS_PLANS, RECHENPRAXIS_STANDALONE_NOTE } from "@shared/rechenpraxisPricing";
import { trpc } from "@/lib/trpc";

export default function RechenpraxisPricing() {
  const { data: user } = trpc.auth.me.useQuery();
  const [loading, setLoading] = useState(false);

  const startStandaloneCheckout = async () => {
    if (!user) {
      window.location.href = "/login?redirect=/rechenpraxis-preise";
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/rechenpraxis-checkout", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Rechenpraxis Preise — 128 Aufgaben mit KI-Hilfe"
        description="Preise für die interaktive Rechenpraxis: Solo ab 19 €/Monat, im Modulkurs inklusive, Portal-Verlängerung ab 29 €/Jahr, Team ab 199 €/Monat."
        keywords="Rechenpraxis Preise, Immobilien Rechner Abo, Hausverwaltung Rechentraining"
        canonical="https://immobilien-akademie-smart.de/rechenpraxis-preise"
      />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <section className="container mx-auto px-4 py-16 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <Calculator className="h-4 w-4" /> Rechenpraxis
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Preise & Zugangswege
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-4">
            128 Aufgaben in 7 Bereichen — vom Maklercourtage-Rechner bis zur WEG-Abrechnung.
          </p>
          <p className="text-sm text-slate-500 max-w-xl mx-auto">{RECHENPRAXIS_STANDALONE_NOTE}</p>
        </section>

        <section className="container mx-auto px-4 pb-16 max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {RECHENPRAXIS_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-2xl border p-6 flex flex-col ${
                  plan.highlight
                    ? "border-blue-300 bg-blue-50/50 shadow-lg ring-2 ring-blue-200"
                    : "border-slate-200 bg-white"
                }`}
              >
                <h2 className="text-lg font-bold text-slate-900">{plan.name}</h2>
                <div className="mt-4 mb-6">
                  {plan.priceEur === 0 ? (
                    <span className="text-2xl font-bold text-emerald-600">Inklusive</span>
                  ) : (
                    <>
                      <span className="text-3xl font-bold text-slate-900">{plan.priceEur} €</span>
                      <span className="text-slate-500 text-sm"> / {plan.period}</span>
                    </>
                  )}
                </div>
                <ul className="space-y-2 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                {plan.checkout ? (
                  <button
                    type="button"
                    onClick={startStandaloneCheckout}
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 w-full font-semibold py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-60"
                  >
                    {loading ? "Weiterleitung…" : plan.cta.label} <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <Link href={plan.cta.href}>
                    <span className={`inline-flex items-center justify-center gap-2 w-full font-semibold py-3 px-4 rounded-xl cursor-pointer ${
                      plan.highlight
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "border border-slate-200 hover:bg-slate-50 text-slate-800"
                    }`}>
                      {plan.cta.label} <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 pb-12 max-w-2xl text-center">
          <Link href="/verwalter-rechner">
            <span className="text-blue-600 hover:text-blue-800 font-medium text-sm">
              Verwalter-Rechner Landing ansehen →
            </span>
          </Link>
        </section>
      </div>
    </>
  );
}
