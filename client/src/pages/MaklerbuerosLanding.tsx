import { Link } from "wouter";
import { SEO } from "@/components/SEO";
import {
  ArrowRight, Building2, Bot, CheckCircle2, FileCheck, Globe,
  Mail, Palette, ShieldCheck, Users, BarChart3, KeyRound,
} from "lucide-react";

const PLANS = [
  {
    name: "Starter",
    price: "199",
    users: "5 Mitarbeiter",
    modules: "2 Module frei wählbar",
    highlight: false,
    features: [
      "Eigenes Logo & Farben",
      "Willkommenstext & Footer",
      "KI-Tutor für alle Nutzer",
      "Lernfortschritt pro Mitarbeiter",
      "E-Mail-Support",
    ],
  },
  {
    name: "Professional",
    price: "399",
    users: "15 Mitarbeiter",
    modules: "Alle 5 Module",
    highlight: true,
    features: [
      "Alles aus Starter",
      "Weiterbildungsnachweis-Export (§15b MaBV)",
      "Admin-Dashboard für Ihr Büro",
      "Inspect-Links für Partner-Demos",
      "Prioritäts-Support",
    ],
  },
  {
    name: "Enterprise",
    price: "Individuell",
    users: "50+ Mitarbeiter",
    modules: "Maßgeschneidert",
    highlight: false,
    features: [
      "Multi-Standort / Franchise",
      "Eigene Subdomain",
      "API-Anbindung (auf Anfrage)",
      "Schulungs-Onboarding für Teams",
      "Dedizierter Ansprechpartner",
    ],
  },
];

const BENEFITS = [
  { icon: Palette, title: "Ihre Marke, unsere Technik", desc: "Logo, Farben, Favicon und Texte — Ihre Mitarbeiter sehen Ihr Büro, nicht unsere Akademie." },
  { icon: Bot, title: "KI-Tutor inklusive", desc: "Claude, Gemini und Groq beantworten Fragen auf Basis der Kursinhalte — 24/7 für jedes Teammitglied." },
  { icon: FileCheck, title: "§34c-Compliance", desc: "Weiterbildungsnachweis mit serverseitigem Stundenlog — Grundlage für die 20h-Pflicht nach §15b MaBV." },
  { icon: BarChart3, title: "Fortschritt im Blick", desc: "Sehen Sie, wer welches Modul bearbeitet hat. Ideal für Compliance und Onboarding neuer Makler." },
  { icon: Globe, title: "Sofort einsatzbereit", desc: "Kein eigener Entwicklungsaufwand. White-Label-Tenant in wenigen Tagen live — wir richten alles ein." },
  { icon: ShieldCheck, title: "DSGVO-konform", desc: "Hosting in Deutschland, Cookie-Consent, Löschfunktion — rechtssicher für Ihr Maklerbüro." },
];

const MAIL_SUBJECT = encodeURIComponent("B2B-Anfrage: White-Label Akademie für Maklerbüro");
const MAIL_BODY = encodeURIComponent(
  "Guten Tag,\n\nich interessiere mich für die White-Label-Lösung der Immobilien Akademie Smart.\n\n" +
  "Firma: \nAnzahl Mitarbeiter: \nGewünschtes Paket (Starter/Professional/Enterprise): \n\nMit freundlichen Grüßen",
);

export default function MaklerbuerosLanding() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SEO
        title="White-Label Akademie für Maklerbüros — Eigene Lernplattform"
        description="Schulen Sie Ihr Maklerteam mit eigener Branding-Plattform: KI-Tutor, §34c-Weiterbildung, 5 Module. Ab 199 €/Monat für 5 Nutzer."
        keywords="Maklerbüro Schulung, White-Label E-Learning, Immobilien Weiterbildung B2B, §34c Team Schulung, Makler Onboarding"
        canonical="https://immobilien-akademie-smart.de/fuer-maklerbueros"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-4 py-16 sm:py-20">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-200 text-sm font-medium px-3 py-1 rounded-full mb-6">
            <Building2 className="h-4 w-4" /> B2B · White-Label
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-6">
            Ihre eigene Immobilien-Akademie —{" "}
            <span className="text-blue-400">mit Ihrem Logo</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-8 leading-relaxed">
            Schulen Sie Makler, Verwalter und Nachwuchskräfte zentral auf einer KI-gestützten Plattform.
            White-Label-Branding, Team-Lizenzen und §34c-Weiterbildungsnachweise — ohne eigene Software-Entwicklung.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={`mailto:info@immobilien-akademie-smart.de?subject=${MAIL_SUBJECT}&body=${MAIL_BODY}`}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              <Mail className="h-4 w-4" /> Demo anfragen
            </a>
            <Link
              to="/warum-wir"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20"
            >
              Warum unsere Plattform? <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">Was Ihr Büro bekommt</h2>
        <p className="text-slate-600 text-center mb-10 max-w-xl mx-auto">
          Technisch fertig im Portal — Sie brauchen nur Ihr Branding und Ihre Mitarbeiter-Liste.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((b, i) => {
            const Icon = b.icon;
            return (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                <Icon className="h-7 w-7 text-blue-600 mb-3" />
                <h3 className="font-semibold text-slate-900 mb-1">{b.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-white border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">Pakete für Maklerbüros</h2>
          <p className="text-slate-600 text-center mb-10 text-sm">
            Monatliche Lizenz · Jährliche Zahlung auf Anfrage mit Rabatt · Alle Preise zzgl. MwSt.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-xl border p-6 flex flex-col ${
                  plan.highlight
                    ? "border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/30"
                    : "border-slate-200 bg-white"
                }`}
              >
                {plan.highlight && (
                  <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full self-start mb-3">
                    Beliebt
                  </span>
                )}
                <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                <div className="mt-2 mb-4">
                  {plan.price === "Individuell" ? (
                    <span className="text-2xl font-bold text-slate-900">Auf Anfrage</span>
                  ) : (
                    <>
                      <span className="text-3xl font-bold text-slate-900">{plan.price} €</span>
                      <span className="text-slate-500 text-sm"> / Monat</span>
                    </>
                  )}
                </div>
                <p className="text-sm text-blue-600 font-medium mb-1">{plan.users}</p>
                <p className="text-xs text-slate-500 mb-4">{plan.modules}</p>
                <ul className="space-y-2 flex-1 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={`mailto:info@immobilien-akademie-smart.de?subject=${encodeURIComponent(`B2B-Anfrage: ${plan.name}`)}&body=${MAIL_BODY}`}
                  className={`inline-flex items-center justify-center gap-2 font-semibold px-4 py-2.5 rounded-lg transition-colors text-sm ${
                    plan.highlight
                      ? "bg-blue-600 hover:bg-blue-500 text-white"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                  }`}
                >
                  Anfragen <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Typische Einsatzszenarien</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { icon: Users, title: "Onboarding neuer Makler", desc: "Launchpad-Ersatz: strukturiertes Einarbeiten in 10–20 Lerntagen statt PDF-Chaos." },
            { icon: KeyRound, title: "§34c-Weiterbildungspflicht", desc: "20h in 3 Jahren nachweisen — Stundenlog und PDF für die gesamte Belegschaft." },
            { icon: Building2, title: "Franchise / Verbünde", desc: "Einheitliche Qualitätsstandards über alle Standorte mit eigenem Branding pro Partner." },
            { icon: Globe, title: "Investoren-Demos", desc: "Inspect-Links: read-only Admin-Vorschau für Pitch-Decks ohne Zugangsdaten." },
          ].map((uc, i) => {
            const Icon = uc.icon;
            return (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 flex gap-4">
                <Icon className="h-8 w-8 text-blue-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">{uc.title}</h3>
                  <p className="text-sm text-slate-600">{uc.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600">
        <div className="max-w-3xl mx-auto px-4 py-12 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Bereit für Ihre eigene Akademie?</h2>
          <p className="text-blue-100 mb-6">
            Wir richten Ihren White-Label-Tenant ein und schulen Ihr Team im Onboarding-Call.
          </p>
          <a
            href={`mailto:info@immobilien-akademie-smart.de?subject=${MAIL_SUBJECT}&body=${MAIL_BODY}`}
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <Mail className="h-4 w-4" /> info@immobilien-akademie-smart.de
          </a>
        </div>
      </section>
    </div>
  );
}
