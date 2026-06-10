import { useState } from "react";
import { Link } from "wouter";
import { SEO } from "@/components/SEO";
import { trpc } from "@/lib/trpc";
import { VERWALTER_VORLAGEN } from "@shared/verwalterVorlagen";
import { RECHENPRAXIS_TASK_COUNT } from "@shared/rechenpraxisProduct";
import { VERWALTER_TOOLS_MONTHLY_EUR } from "@shared/verwalterToolsProduct";
import {
  ArrowRight,
  BookOpen,
  Bot,
  Building2,
  CalendarClock,
  CheckCircle2,
  FileText,
  Kanban,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const VORLAGEN_COUNT = VERWALTER_VORLAGEN.length;

const FEATURES = [
  {
    icon: FileText,
    title: `${VORLAGEN_COUNT} WEG-Vorlagen`,
    desc: "ETV, Mahnung, Nebenkosten — ausfüllen, optional KI verfeinern, PDF exportieren. Mit Rechtshinweis, keine Rechtsberatung.",
  },
  {
    icon: Kanban,
    title: "Vorgänge & Fristen",
    desc: "Kanban für offene To-dos, Fristen-Checkliste mit 1-Klick-Vorgang — ETV, NK, Mahnwesen im Blick.",
  },
  {
    icon: BookOpen,
    title: "Buchungen & DATEV",
    desc: "Hausgeld erfassen, Plausibilität prüfen, EXTF-CSV für den Steuerberater — mit SKR03-WEG-Kontenrahmen.",
  },
  {
    icon: Bot,
    title: "KI-Assistent",
    desc: "Fragen zu Konten, Abläufen und Formulierungen — mit Kontext aus Ihren angelegten Objekten (Fair-Use).",
  },
  {
    icon: Building2,
    title: "WEG-Objekte",
    desc: "Stammdaten, Einheiten, MEA — Basis für Vorlagen, Vorgänge und Buchungen in einem Login.",
  },
  {
    icon: CalendarClock,
    title: "Rechenpraxis inklusive",
    desc: `${RECHENPRAXIS_TASK_COUNT} interaktive Aufgaben — WEG, Hausgeld, Rendite. Ideal für Einsteiger und Auffrischung.`,
  },
];

const FAQ = [
  {
    q: "Ist das eine vollständige Hausverwaltungs-Software?",
    a: "Nein. Der Verwalter-Rechner ist ein Werkzeugkasten für Lernen und Alltagsaufgaben — Vorlagen, leichtes CRM, Buchungsassistenz und Rechenpraxis. Er ersetzt keine Vollsoftware wie casavi oder Immoware24.",
  },
  {
    q: "Sind die Vorlagen rechtssicher?",
    a: "Es handelt sich um Muster mit Rechtshinweisen zu den einschlägigen Normen (z. B. § 24 WEG). Sie ersetzen keine individuelle Rechtsberatung. Prüfen Sie Inhalte vor Versand.",
  },
  {
    q: "Wo werden meine Daten gespeichert?",
    a: "Auf Servern in der EU (Railway). Bei Konto-Löschung unter /konto-loeschen werden Verwalter-Daten mitgelöscht. Details in der Datenschutzerklärung.",
  },
  {
    q: "Was kostet es?",
    a: `Im Beta-Rahmen sind die Verwalter-Werkzeuge für eingeloggte Nutzer kostenlos testbar. Das Verwalter Tools Solo-Abo kostet ${VERWALTER_TOOLS_MONTHLY_EUR} €/Monat (Vorlagen, Objekte, Vorgänge, Buchungen, KI). Rechenpraxis-Solo ab 19 €/Monat. Verwaltungsbüros mit mehreren Nutzern: Team-Angebot ab 199 €/Monat über unsere B2B-Lösung.`,
  },
];

const MAIL_SUBJECT = encodeURIComponent("Anfrage: Verwalter-Rechner für Verwaltungsbüro");
const MAIL_BODY = encodeURIComponent(
  "Guten Tag,\n\nich interessiere mich am Verwalter-Rechner / den Verwalter-Werkzeugen.\n\n" +
    "Firma: \nAnzahl Objekte: \nAnzahl Nutzer: \n\nMit freundlichen Grüßen",
);

export default function FuerVerwaltungsbuerosLanding() {
  const { data: user } = trpc.auth.me.useQuery();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const appHref = user ? "/app/verwalter" : "/login?redirect=/app/verwalter";
  const vorlagenHref = user ? "/app/verwalter/vorlagen" : "/login?redirect=/app/verwalter/vorlagen";

  const startVerwalterToolsCheckout = async () => {
    if (!user) {
      window.location.href = "/login?redirect=/fuer-verwaltungsbueros";
      return;
    }
    setCheckoutLoading(true);
    try {
      const res = await fetch("/api/stripe/verwalter-tools-checkout", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <SEO
        title="Verwalter-Werkzeuge für Verwaltungsbüros — Vorlagen, Vorgänge, DATEV"
        description={`WEG-Praxis digital: ${VORLAGEN_COUNT} Vorlagen, Objektverwaltung, Kanban, Buchungen, KI-Brief und ${RECHENPRAXIS_TASK_COUNT} Rechenaufgaben. Für Hausverwaltung und WEG-Verwalter.`}
        keywords="WEG Verwaltung Software, Hausverwaltung Vorlagen, Nebenkostenabrechnung WEG, Verwalter Tools, DATEV Export WEG"
        canonical="https://immobilien-akademie-smart.de/fuer-verwaltungsbueros"
      />

      <section className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-4 py-16 sm:py-20">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-200 text-sm font-medium px-3 py-1 rounded-full mb-6">
            <Building2 className="h-4 w-4" /> WEG · Hausverwaltung
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-6">
            Verwalter-Werkzeuge —{" "}
            <span className="text-emerald-400">Vorlagen, Fristen & Buchungen</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-8 leading-relaxed">
            Der digitale Werkzeugkasten für WEG-Verwalter und Verwaltungsbüros: {VORLAGEN_COUNT} ausfüllbare 
            Vorlagen, Objekt-Stammdaten, Vorgangs-Kanban, DATEV-Export und KI-Assistent — ergänzt durch{" "}
            {RECHENPRAXIS_TASK_COUNT} Rechenaufgaben.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href={appHref}>
              <span className="inline-flex items-center gap-2 min-h-[44px] bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-3 rounded-lg cursor-pointer transition-colors">
                Kostenlos testen <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
            <Link href={vorlagenHref}>
              <span className="inline-flex items-center gap-2 min-h-[44px] bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg cursor-pointer border border-white/20 transition-colors">
                Vorlagen ansehen
              </span>
            </Link>
            <a
              href={`mailto:info@immobilien-akademie-smart.de?subject=${MAIL_SUBJECT}&body=${MAIL_BODY}`}
              className="inline-flex items-center gap-2 min-h-[44px] text-emerald-200 hover:text-white font-semibold px-6 py-3 transition-colors"
            >
              <Mail className="h-4 w-4" /> Büro-Anfrage
            </a>
          </div>
          <p className="mt-6 text-sm text-slate-400 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            Beta — keine Rechtsberatung · Buchhaltung mit Steuerberater abstimmen
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2 text-center">
          Was Sie im Verwalter-Rechner nutzen
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-center mb-10 max-w-xl mx-auto text-sm">
          Lernen und Anwenden in einem Ökosystem — ohne separate Software-Installation.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm"
              >
                <Icon className="h-7 w-7 text-emerald-600 mb-3" />
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">{f.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10 text-slate-900 dark:text-slate-100">
            So starten Sie in 3 Schritten
          </h2>
          <ol className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Konto anlegen", desc: "Kostenlos registrieren — kein Zahlungsmittel für die Beta nötig." },
              { step: "2", title: "WEG-Objekt anlegen", desc: "Stammdaten und Einheiten — Basis für alle weiteren Funktionen." },
              { step: "3", title: "Vorlage oder Vorgang", desc: "Brief aus Vorlage, Frist im Kanban oder Buchung mit DATEV-Export." },
            ].map((s) => (
              <li key={s.step} className="text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-bold mb-3">
                  {s.step}
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">{s.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-2 text-slate-900 dark:text-slate-100">Preise</h2>
        <p className="text-center text-sm text-slate-600 dark:text-slate-400 mb-10 max-w-xl mx-auto">
          Beta kostenlos testen — Abo jederzeit für den Vollzugang buchbar.
        </p>
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/30 p-6 flex flex-col">
            <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300 mb-1">Beta</p>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Kostenlos testen</h3>
            <p className="text-3xl font-bold text-emerald-600 mt-4 mb-6">0 €</p>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400 mb-8 flex-1">
              <li className="flex gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                Alle Verwalter-Funktionen im Beta-Rahmen
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                {VORLAGEN_COUNT} Vorlagen, Objekte, Kanban, DATEV
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                Kein Zahlungsmittel nötig
              </li>
            </ul>
            <Link href={appHref}>
              <span className="inline-flex w-full justify-center items-center gap-2 min-h-[44px] bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-3 rounded-lg cursor-pointer transition-colors">
                Jetzt starten <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 flex flex-col shadow-sm">
            <p className="text-sm font-medium text-slate-500 mb-1">Solo-Abo</p>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Verwalter Tools</h3>
            <p className="mt-4 mb-6">
              <span className="text-3xl font-bold text-slate-900 dark:text-slate-100">{VERWALTER_TOOLS_MONTHLY_EUR} €</span>
              <span className="text-slate-500 text-sm"> / Monat</span>
            </p>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400 mb-8 flex-1">
              <li className="flex gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                Voller Suite-Zugang inkl. KI-Assistent
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                Monatlich kündbar über Stripe
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                Ideal nach dem Beta-Test
              </li>
            </ul>
            <button
              type="button"
              onClick={() => void startVerwalterToolsCheckout()}
              disabled={checkoutLoading}
              className="inline-flex w-full justify-center items-center gap-2 min-h-[44px] bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900 text-white font-semibold px-6 py-3 rounded-lg transition-colors disabled:opacity-60"
            >
              {checkoutLoading ? "Weiterleitung…" : "Abo buchen"}
            </button>
          </div>
        </div>
        <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-6">
          Mehrere Nutzer?{" "}
          <Link href="/fuer-maklerbueros" className="text-emerald-600 hover:underline">
            B2B Team-Lizenzen ab 199 €/Monat
          </Link>
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-8 text-slate-900 dark:text-slate-100">Häufige Fragen</h2>
        <div className="space-y-4">
          {FAQ.map((item) => (
            <details
              key={item.q}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4"
            >
              <summary className="font-medium text-slate-900 dark:text-slate-100 cursor-pointer list-none flex justify-between gap-2">
                {item.q}
                <span className="text-slate-400">+</span>
              </summary>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="bg-emerald-600 text-white py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <ShieldCheck className="h-10 w-10 mx-auto mb-4 opacity-90" />
          <h2 className="text-2xl font-bold mb-3">Bereit für den Praxis-Test?</h2>
          <p className="text-emerald-100 mb-6 text-sm">
            DSGVO-konforme Löschung unter /konto-loeschen · Hosting EU · Keine Rechtsberatung
          </p>
          <Link href={appHref}>
            <span className="inline-flex items-center gap-2 bg-white text-emerald-800 font-semibold px-8 py-3 rounded-lg cursor-pointer hover:bg-emerald-50 transition-colors min-h-[44px]">
              Zur Verwalter-Übersicht <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
          <p className="mt-6 text-sm text-emerald-200">
            Auch:{" "}
            <Link href="/verwalter-rechner" className="underline hover:text-white">
              Rechenpraxis-Landing
            </Link>
            {" · "}
            <Link href="/fuer-maklerbueros" className="underline hover:text-white">
              B2B Team-Lizenzen
            </Link>
          </p>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-4 py-10 text-center text-xs text-slate-500 dark:text-slate-400">
        <CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto mb-2" />
        Vorlagen und KI-Texte sind Muster mit Rechtshinweisen — keine individuelle Rechts- oder Steuerberatung.
        <Link href="/agb" className="block mt-2 text-emerald-600 hover:underline">
          AGB und Datenschutz lesen →
        </Link>
      </section>
    </div>
  );
}
