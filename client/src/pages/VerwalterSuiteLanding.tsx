import { Link } from "wouter";
import { SEO } from "@/components/SEO";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  FileText,
  Kanban,
  Mail,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const VERWALTER_FAQ = [
  {
    question: "Für wen ist die Verwalter-Suite geeignet?",
    answer:
      "Für Solo-Verwalter und kleine WEG-Büros mit bis zu 50 Einheiten als KI-gestützte Starter-Suite für den Arbeitsalltag.",
  },
  {
    question: "Ist die Suite eine vollständige Hausverwaltungssoftware?",
    answer:
      "Nein — sie ist eine Starter-Suite. Für große Portfolios mit 100+ Einheiten empfehlen sich Immoware24 oder SCALARA.",
  },
  {
    question: "Sind meine Daten sicher?",
    answer:
      "Ja — alle Daten sind mandantengetrennt. Kein anderer Nutzer sieht Ihre Daten.",
  },
  {
    question: "Was kostet der DATEV-Export?",
    answer:
      "Der DATEV-orientierte CSV-Export ist in beiden Tarifen enthalten. Keine Zusatzkosten.",
  },
];

const FEATURES = [
  "Verwalten Sie Objekte, Vorgänge und Buchungen zentral in einem schlanken Arbeitsbereich.",
  "Bereiten Sie Eigentümerversammlungen mit ETV-Workflow, Fristen und Beschlussdokumentation strukturiert vor.",
  "Nutzen Sie Mahnwesen, Freigaben und Inbox-Funktionen für wiederkehrende Verwaltungsprozesse.",
  "Erstellen Sie KI-gestützte Schreiben und Verwalterbriefe auf Basis Ihrer Eingaben.",
  "Arbeiten Sie mit 27 fachlich geprüften Vorlagen für typische WEG-Verwalter-Aufgaben.",
  "Exportieren Sie Buchungsdaten im DATEV-orientierten CSV-Format für die weitere Bearbeitung.",
  "Ihre Objekte, Vorgänge und Buchungen bleiben sicher von anderen Nutzern getrennt.",
  "Kombinieren Sie Lernportal, Praxiswerkzeuge und KI-Unterstützung in einem System.",
];

const NOT_INCLUDED = [
  "Keine vollwertige ERP- oder Profi-Verwaltersoftware wie SCALARA, Immoware24 oder PowerHaus.",
  "Keine vollständige WEG-Jahresabrechnung mit Bankanbindung, SEPA oder EBICS.",
  "Kein Eigentümerportal für externe Eigentümerkommunikation.",
  "Keine Rechtsberatung und keine Garantie für rechtssichere Einzelfallentscheidungen.",
  "Kein Ersatz für Steuerberatung, Rechtsberatung oder professionelle Buchhaltungsprüfung.",
];

const FEATURE_ICONS = [Building2, Kanban, Mail, Sparkles, FileText, FileText, ShieldAlert, CheckCircle2];

export default function VerwalterSuiteLanding() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <SEO
        title="KI-gestützte Starter-Suite für WEG-Verwalter"
        description="Lernen, organisieren und Verwalter-Aufgaben bearbeiten — mit Vorlagen, KI-Briefen, Vorgängen, Buchungen, ETV und DATEV-Export."
        keywords="WEG Verwalter Software, Verwalter Suite, Hausverwaltung Vorlagen, DATEV Export WEG, ETV Workflow"
        canonical="https://immobilien-akademie-smart.de/verwalter-suite"
      />

      <section className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-4 py-14 sm:py-20">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-200 text-sm font-medium px-3 py-1 rounded-full mb-6">
            <Building2 className="h-4 w-4" /> WEG · Verwalter-Suite
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
            KI-gestützte Starter-Suite für WEG-Verwalter
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mb-8 leading-relaxed">
            Lernen, organisieren und Verwalter-Aufgaben bearbeiten — mit Vorlagen, KI-Briefen, Vorgängen,
            Buchungen, ETV und DATEV-Export.
          </p>
          <Link href="/login">
            <span className="inline-flex items-center gap-2 min-h-[44px] bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-3 rounded-lg cursor-pointer transition-colors">
              Verwalter-Suite ansehen <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-14 sm:py-16">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2 text-center">
          Was die Verwalter-Suite bietet
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-center mb-10 max-w-xl mx-auto text-sm">
          Acht Kernfunktionen für den Einstieg in die digitale WEG-Verwaltung.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {FEATURES.map((text, i) => {
            const Icon = FEATURE_ICONS[i] ?? CheckCircle2;
            return (
              <div
                key={text}
                className="flex gap-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm"
              >
                <Icon className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                  {text}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-amber-50 dark:bg-amber-950/20 border-y border-amber-200 dark:border-amber-900/50">
        <div className="max-w-5xl mx-auto px-4 py-14 sm:py-16">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2 text-center">
            Ehrliche Abgrenzung
          </h2>
          <p className="text-center text-sm text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto">
            Was die Starter-Suite bewusst nicht abdeckt.
          </p>
          <ul className="space-y-3 max-w-3xl mx-auto">
            {NOT_INCLUDED.map((text) => (
              <li
                key={text}
                className="flex gap-3 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed"
              >
                <ShieldAlert className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-14 sm:py-16">
        <h2 className="text-2xl font-bold text-center mb-2 text-slate-900 dark:text-slate-100">Preise</h2>
        <p className="text-center text-sm text-slate-600 dark:text-slate-400 mb-10 max-w-xl mx-auto">
          Zwei Tarife für Solo-Verwalter und kleine Büros.
        </p>
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/30 p-6 flex flex-col">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Solo</h3>
            <p className="mt-4 mb-2">
              <span className="text-3xl font-bold text-emerald-600">39€</span>
              <span className="text-slate-500 text-sm"> / Monat</span>
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex-1">
              Für Solo-Verwalter und Einsteiger
            </p>
            <Link href="/login">
              <span className="inline-flex w-full justify-center items-center gap-2 min-h-[44px] bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-3 rounded-lg cursor-pointer transition-colors">
                Verwalter-Suite ansehen <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 flex flex-col shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Büro</h3>
            <p className="mt-4 mb-2">
              <span className="text-3xl font-bold text-slate-900 dark:text-slate-100">199€</span>
              <span className="text-slate-500 text-sm"> / Monat</span>
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex-1">
              Für kleine Verwaltungsbüros
            </p>
            <Link href="/login">
              <span className="inline-flex w-full justify-center items-center gap-2 min-h-[44px] bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                Verwalter-Suite ansehen <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-14 sm:py-16">
        <h2 className="text-2xl font-bold text-center mb-2 text-slate-900 dark:text-slate-100">
          Häufige Fragen
        </h2>
        <p className="text-center text-sm text-slate-600 dark:text-slate-400 mb-8">
          Antworten zur Verwalter-Suite auf einen Blick.
        </p>
        <Accordion type="single" collapsible className="w-full">
          {VERWALTER_FAQ.map((item) => (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger className="text-left text-base font-semibold">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="bg-emerald-600 text-white py-12 sm:py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Bereit für den Einstieg?</h2>
          <p className="text-emerald-100 mb-6 text-sm sm:text-base">
            Melden Sie sich an und starten Sie mit der KI-gestützten Starter-Suite für WEG-Verwalter.
          </p>
          <Link href="/login">
            <span className="inline-flex items-center gap-2 bg-white text-emerald-800 font-semibold px-8 py-3 rounded-lg cursor-pointer hover:bg-emerald-50 transition-colors min-h-[44px]">
              Verwalter-Suite ansehen <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
