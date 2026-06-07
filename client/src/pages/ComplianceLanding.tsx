import { useState } from "react";
import { Link } from "wouter";
import { SEO } from "@/components/SEO";
import { FileCheck, Clock, Download, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";
import { COMPLIANCE_YEARLY_EUR } from "@shared/compliance";
import { MABV_PFlicht_STUNDEN } from "@shared/weiterbildung";
import { trpc } from "@/lib/trpc";

const FEATURES = [
  { icon: Clock, title: "Serverseitiger Stundenlog", desc: "Jede Lerneinheit wird automatisch mit Zeitstempel protokolliert — minutengenau." },
  { icon: Download, title: "PDF-Export", desc: "Weiterbildungsnachweis als PDF für Ihre Unterlagen und die IHK." },
  { icon: ShieldCheck, title: "§15b MaBV konform", desc: "Struktur nach gesetzlicher Weiterbildungspflicht (20h in 3 Jahren)." },
  { icon: FileCheck, title: "Modul 2 inklusive", desc: "Zugang zu Makler-Weiterbildungsthemen (MaBV, GwG, Recht) für Ihre Stunden." },
];

const COMPARE = [
  { label: "Vollkurs Modul 2", price: "499 € einmalig", note: "60 Lerntage, 8 Monate Zugang" },
  { label: "Compliance-Abo", price: `${COMPLIANCE_YEARLY_EUR} €/Jahr`, note: "Nur Nachweis + Modul 2, für erfahrene Makler", highlight: true },
];

export default function ComplianceLanding() {
  const { data: user } = trpc.auth.me.useQuery();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const startCheckout = async () => {
    if (!user) {
      window.location.href = "/login?redirect=/compliance-20h";
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/stripe/compliance-checkout", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else setError(data.error || "Checkout fehlgeschlagen");
    } catch {
      setError("Verbindungsfehler");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="§34c Compliance — MaBV 20h Weiterbildungsnachweis"
        description={`Weiterbildungsnachweis nach §15b MaBV: Stundenlog, PDF-Export, ${MABV_PFlicht_STUNDEN}h in 3 Jahren. Ab ${COMPLIANCE_YEARLY_EUR} €/Jahr.`}
        keywords="MaBV Weiterbildung, §34c Weiterbildungspflicht, Weiterbildungsnachweis Makler"
      />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <section className="container mx-auto px-4 py-16 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <FileCheck className="h-4 w-4" /> §15b MaBV · §34c GewO
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            20 Stunden nachweisen — ohne Vollkurs
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            Das Compliance-Abo für erfahrene Immobilienmakler: serverseitiger Stundenlog,
            PDF-Weiterbildungsnachweis und Modul-2-Zugang — {COMPLIANCE_YEARLY_EUR} € pro Jahr.
          </p>
          <button
            onClick={startCheckout}
            disabled={loading}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-base disabled:opacity-60"
          >
            {loading ? "Weiterleitung…" : `Jetzt starten — ${COMPLIANCE_YEARLY_EUR} €/Jahr`}
            <ArrowRight className="h-5 w-5" />
          </button>
          {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
          {!user && (
            <p className="text-slate-500 text-sm mt-3">
              <Link href="/login" className="text-blue-600 hover:underline">Anmelden</Link> oder Konto erstellen für den Checkout
            </p>
          )}
        </section>

        <section className="container mx-auto px-4 pb-12 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white border border-slate-200 rounded-2xl p-6">
                <Icon className="h-8 w-8 text-blue-600 mb-3" />
                <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
                <p className="text-sm text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 pb-16 max-w-3xl">
          <h2 className="text-xl font-bold text-center mb-6">Vergleich</h2>
          <div className="space-y-3">
            {COMPARE.map((row) => (
              <div
                key={row.label}
                className={`flex justify-between items-center p-4 rounded-xl border ${
                  row.highlight ? "border-blue-300 bg-blue-50" : "border-slate-200 bg-white"
                }`}
              >
                <div>
                  <div className="font-semibold text-slate-900">{row.label}</div>
                  <div className="text-sm text-slate-500">{row.note}</div>
                </div>
                <div className="font-bold text-slate-900">{row.price}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500 text-center mt-6">
            Gesetzliche Pflicht: {MABV_PFlicht_STUNDEN} Zeitstunden in 3 Kalenderjahren (§34c Abs. 2a GewO i.V.m. §15b MaBV).
            Keine behördliche Zulassungsauskunft.
          </p>
        </section>

        <section className="bg-slate-900 text-white py-12">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Bereits Modulkäufer?</h2>
            <p className="text-slate-300 mb-6">
              Mit jedem Modulkauf ist der Weiterbildungsnachweis inklusive — kein Extra-Abo nötig.
            </p>
            <Link href="/weiterbildungsnachweis">
              <span className="inline-flex items-center gap-2 text-blue-300 hover:text-white cursor-pointer">
                <CheckCircle2 className="h-5 w-5" /> Zum Weiterbildungsnachweis
              </span>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
