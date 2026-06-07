import { Link } from "wouter";
import { SEO } from "@/components/SEO";
import {
  ArrowRight, Bot, BookOpenCheck, Calculator, CheckCircle2,
  Clock, GraduationCap, Layers, Mic, ShieldCheck, Sparkles,
  Users, Zap
} from "lucide-react";
import { MARKETING_LEARNING_TASKS_LABEL, STRUCTURED_LEARNING_DAYS, KI_MODEL_COUNT } from "@shared/claims";

const USP_PILLARS = [
  {
    icon: Layers,
    title: "5 Berufsbilder — ein Portal",
    desc: "§34c Makler, §34i Darlehensvermittler, WEG-Verwalter, Gutachter und Grundlagen. Kein anderer deutscher Anbieter vereint alle Lizenzen in einer Plattform.",
    highlight: "240 Lerntage · 1.920 UE",
  },
  {
    icon: Bot,
    title: "KI-Tutor mit Modulwissen (RAG)",
    desc: "Claude, Gemini und Groq beantworten Fragen auf Basis Ihrer Kursinhalte — nicht aus dem Internet. Sokrates-Modus für echtes Verstehen statt Auswendiglernen.",
    highlight: `${KI_MODEL_COUNT} KI-Modelle · 24/7`,
  },
  {
    icon: Calculator,
    title: "10 Praxis-Rechner integriert",
    desc: "Mietrendite, WEG-Umlage, Annuität, LTV, Sachwert — direkt im Lernflow. Kein Tab-Wechsel zu Excel.",
    highlight: "Einzigartig im Markt",
  },
  {
    icon: Clock,
    title: "Doppelte Lernzeit — faire Verlängerung",
    desc: "Jeder Kauf inkl. 2× Lernzeit (z. B. 8–20 Monate). Danach weiternutzen ab 29 €/Jahr oder 5 €/Monat — nur für gekaufte Module.",
    highlight: "Ab 149 €",
  },
];

const COMPARISON = [
  { feature: "5 Lizenz-Bereiche in einem Portal", us: true, wbthek: false, ihk: false, billig: false },
  { feature: "KI-Tutor auf Kursinhalten (RAG)", us: true, wbthek: false, ihk: false, billig: false },
  { feature: `${MARKETING_LEARNING_TASKS_LABEL} Lernaufgaben`, us: true, wbthek: false, ihk: true, billig: false },
  { feature: "Prüfungssimulation (50 Fragen)", us: true, wbthek: false, ihk: true, billig: false },
  { feature: "Audio-Lernmodus", us: true, wbthek: false, ihk: false, billig: false },
  { feature: "MaBV 20h minutengenauer Nachweis", us: true, wbthek: true, ihk: true, billig: true },
  { feature: "Live-Dozenten / Webinare", us: false, wbthek: false, ihk: true, billig: false },
  { feature: "IHK-/Verbands-Siegel", us: false, wbthek: false, ihk: true, billig: false },
  { feature: "Günstigster Einstieg (<300 €)", us: false, wbthek: true, ihk: false, billig: true },
];

const TARGETS = [
  { icon: GraduationCap, title: "Berufseinsteiger", desc: "Vom Quereinsteiger zum lizenzierten Makler — strukturierter Pfad statt YouTube-Chaos." },
  { icon: Users, title: "Maklerbüros", desc: "Schulen Sie Ihr Team zentral. White-Label und Inspect-Demos für Entscheider." },
  { icon: ShieldCheck, title: "§34c-Weiterbildungspflicht", desc: "Mehr als 20 Stunden Minimum: vertiefen Sie Fachwissen statt nur Compliance abzuhaken." },
  { icon: Sparkles, title: "Tech-affine Lerner", desc: "KI, Gamification, Spaced Repetition — Lernen wie in 2026, nicht wie 1996." },
];

export default function UspLanding() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SEO
        title="Warum Immobilien Akademie Smart? — USP & Vorteile"
        description={`Deutschlands KI-Lernportal für Immobilienprofis: ${STRUCTURED_LEARNING_DAYS} Lerntage, ${MARKETING_LEARNING_TASKS_LABEL} Aufgaben, §34c, §34i, WEG, Gutachter. Einmalzahlung, 24h Trial.`}
        keywords="Immobilien Akademie, USP, KI-Tutor Makler, §34c Weiterbildung online, Immobilien Lernportal, WBThek Alternative"
        canonical="https://immobilien-akademie-smart.de/warum-wir"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-4 py-16 sm:py-24">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-200 text-sm font-medium px-3 py-1 rounded-full mb-6">
            <Sparkles className="h-4 w-4" /> Unser Alleinstellungsmerkmal (USP)
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-6">
            Das einzige KI-Lernportal für{" "}
            <span className="text-blue-400">alle Immobilien-Lizenzen</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-8 leading-relaxed">
            Während WBThek, IHK und Billig-Anbieter einzelne Nischen bedienen, vereint die
            Immobilien Akademie Smart fünf Berufsbilder, {MARKETING_LEARNING_TASKS_LABEL} Aufgaben
            und einen RAG-KI-Tutor — in einem Portal, einmal bezahlt.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/code-einloesen"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              24h gratis testen <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/pakete"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20"
            >
              Pakete & Preise
            </Link>
          </div>
        </div>
      </section>

      {/* USP Pillars */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">Was uns unterscheidet</h2>
        <p className="text-slate-600 text-center mb-10 max-w-xl mx-auto">
          Vier Säulen, die kein Wettbewerber in dieser Kombination bietet.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          {USP_PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 rounded-lg p-3 flex-shrink-0">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">{pillar.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-2">{pillar.desc}</p>
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                      {pillar.highlight}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-white border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">Ehrlicher Vergleich</h2>
          <p className="text-slate-600 text-center mb-8 text-sm">
            Basierend auf öffentlich zugänglichen Angeboten (Juni 2026).
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 pr-4 font-semibold text-slate-700">Feature</th>
                  <th className="text-center py-3 px-2 font-semibold text-blue-700 bg-blue-50 rounded-t-lg">Akademie Smart</th>
                  <th className="text-center py-3 px-2 font-semibold text-slate-600">WBThek</th>
                  <th className="text-center py-3 px-2 font-semibold text-slate-600">IHK Live</th>
                  <th className="text-center py-3 px-2 font-semibold text-slate-600">Billig-20h</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={i} className="border-b border-slate-100">
                    <td className="py-3 pr-4 text-slate-700">{row.feature}</td>
                    {(["us", "wbthek", "ihk", "billig"] as const).map((col) => (
                      <td key={col} className={`text-center py-3 px-2 ${col === "us" ? "bg-blue-50/50" : ""}`}>
                        {row[col] ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" />
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-4 text-center">
            Wir sind ehrlich: Für reine 20-Stunden-Compliance sind spezialisierte Anbieter günstiger.
            Unser USP ist Tiefe, Breite und KI — nicht der Mindestpreis.
          </p>
        </div>
      </section>

      {/* Target audiences */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Für wen ist das Portal?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TARGETS.map((t, i) => {
            const Icon = t.icon;
            return (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 text-center">
                <Icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-900 text-sm mb-2">{t.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{t.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* More features */}
      <section className="bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Weitere Alleinstellungsmerkmale</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: BookOpenCheck, label: "Echte Gesetzesquellen", sub: "gesetze-im-internet.de verlinkt" },
              { icon: Mic, label: "Audio-Lernmodus", sub: "Lernen unterwegs" },
              { icon: Zap, label: "Gamification & Streaks", sub: "Motivation durch Fortschritt" },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="text-center">
                  <Icon className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <p className="font-semibold text-sm">{f.label}</p>
                  <p className="text-xs text-slate-400">{f.sub}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Überzeugen Sie sich selbst</h2>
        <p className="text-slate-600 mb-8">
          24 Stunden Zugang zu allen 5 Modulen und dem KI-Tutor — ohne Kreditkarte.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700"
          >
            Zur Startseite <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/kurse"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Kurse entdecken
          </Link>
        </div>
      </section>
    </div>
  );
}
