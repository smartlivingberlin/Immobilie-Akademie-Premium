import { Link } from "wouter";
import { SEO } from "@/components/SEO";
import {
  Building2, Calculator, CheckCircle2, Bot, ArrowRight,
  FileSpreadsheet, Users, ShieldCheck, Sparkles,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { RECHENPRAXIS_TASK_COUNT } from "@shared/rechenpraxisProduct";

const BEREICHE = [
  { title: "WEG-Hausgeld & Abrechnung", count: "Schwerpunkt WEG", desc: "Hausgeld, Sonderumlage, Rücklage, CO₂-Kosten, Heizkosten 70/30, Verwalterhonorar" },
  { title: "Mietrendite & Kaufpreisfaktor", count: "19 Aufgaben", desc: "Brutto-/Nettorendite, Cashflow, Break-even für Verwaltungsportfolios" },
  { title: "Annuität & Finanzierung", count: "18 Aufgaben", desc: "Beleihungsauslauf, Tilgungsplan, Anschlussfinanzierung" },
  { title: "Wertermittlung", count: "18 Aufgaben", desc: "Ertragswert, Sachwert, Vergleichswert — Grundlagen für Verwaltergutachten" },
];

const FEATURES = [
  { icon: Calculator, title: "Schritt-für-Schritt", desc: "Jede Aufgabe mit Formel, Variablen und sofortiger Prüfung — kein Taschenrechner-Chaos." },
  { icon: Bot, title: "KI-Assistent", desc: "Erklärt jeden Rechenschritt verständlich — ideal für Quereinsteiger in der Hausverwaltung." },
  { icon: FileSpreadsheet, title: "Praxis aus dem Alltag", desc: "Echte Berufssituationen: NK-Abrechnung, Wirtschaftsplan, Sonderumlage, Hausgeld-Rückstand." },
  { icon: ShieldCheck, title: "Komfort & Barrierefreiheit", desc: "Schrift vergrößern, Dark Mode und Vorlesen — überall im Portal erreichbar." },
];

export default function VerwalterRechnerLanding() {
  const { data: user } = trpc.auth.me.useQuery();

  const ctaHref = user ? "/rechenpraxis" : "/login?redirect=/rechenpraxis";
  const preiseHref = user ? "/rechenpraxis-preise" : "/login?redirect=/rechenpraxis-preise";

  return (
    <>
      <SEO
        title="Verwalter-Rechner — WEG, Nebenkosten & Hausgeld interaktiv"
        description={`Rechenpraxis für Hausverwaltung: WEG-Abrechnung, Hausgeld, Instandhaltungsrücklage, Mietrendite. ${RECHENPRAXIS_TASK_COUNT} Aufgaben mit KI-Hilfe.`}
        keywords="WEG Rechner, Nebenkostenabrechnung, Hausgeld berechnen, Hausverwaltung Rechenpraxis, Verwalter Rechner"
        canonical="https://immobilien-akademie-smart.de/verwalter-rechner"
      />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
        <section className="container mx-auto px-4 py-16 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <Building2 className="h-4 w-4" /> USP · WEG & Hausverwaltung
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4 tracking-tight">
            Verwalter-Rechner — WEG & Nebenkosten sicher berechnen
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-4">
            <strong>{RECHENPRAXIS_TASK_COUNT} interaktive Rechenaufgaben</strong> für Makler und Hausverwalter — Schwerpunkt WEG,
            Hausgeld und Nebenkosten. Mit KI-Erklärung pro Schritt.
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 flex items-center justify-center gap-2 flex-wrap">
            <Sparkles className="h-4 w-4 text-emerald-600" />
            Auch als Solo-Abo ab 19 €/Monat — ohne Vollkurs
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={ctaHref}>
              <span className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-4 rounded-xl cursor-pointer">
                Rechenpraxis öffnen <ArrowRight className="h-5 w-5" />
              </span>
            </Link>
            <Link href="/kurs/modul-3-weg-verwalter">
              <span className="inline-flex items-center gap-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold px-8 py-4 rounded-xl cursor-pointer">
                Modul 3 Theorie
              </span>
            </Link>
            <Link href={preiseHref}>
              <span className="inline-flex items-center gap-2 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 font-semibold px-8 py-4 rounded-xl cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-950/50">
                Preise ansehen
              </span>
            </Link>
          </div>
        </section>

        <section className="container mx-auto px-4 pb-12 max-w-5xl">
          <h2 className="text-xl font-bold text-center mb-2 text-slate-900 dark:text-slate-100">Bereiche für Hausverwaltung</h2>
          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mb-8">30 Aufgaben allein im Bereich WEG — neu erweitert (Sonderumlage, CO₂, Heizkosten)</p>
          <div className="grid md:grid-cols-2 gap-4">
            {BEREICHE.map((b) => (
              <div key={b.title} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">{b.title}</h3>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mb-2">{b.count}</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 pb-16 max-w-5xl">
          <div className="grid sm:grid-cols-2 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4 p-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                <Icon className="h-8 w-8 text-emerald-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-900 dark:bg-slate-950 text-white py-14">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <Users className="h-10 w-10 text-emerald-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-3">Für Verwaltungsbüros & Teams</h2>
            <p className="text-slate-300 mb-6">
              White-Label mit Team-Lizenzen ab 199 €/Monat — Rechenpraxis und KI-Tutor für Ihre gesamte Belegschaft.
            </p>
            <Link href="/fuer-verwaltungsbueros">
              <span className="inline-flex items-center gap-2 text-emerald-300 hover:text-white cursor-pointer font-semibold">
                Verwalter-Werkzeuge ansehen <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 max-w-2xl text-center text-sm text-slate-500 dark:text-slate-400">
          <CheckCircle2 className="h-5 w-5 text-emerald-500 mx-auto mb-2" />
          Rechenpraxis ist Teil des Lernportals — Zugang mit Modulkauf, Testzugang, Solo-Abo oder B2B-Tenant.
          <Link href="/rechenpraxis-preise">
            <span className="block mt-3 text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 font-medium cursor-pointer">
              Preise & Zugangswege ansehen →
            </span>
          </Link>
        </section>
      </div>
    </>
  );
}
