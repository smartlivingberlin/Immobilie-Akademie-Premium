import { CheckCircle2, ArrowRight, FileText, Award, ShieldCheck, Briefcase, Info } from "lucide-react";
import { Link } from "wouter";

const programs = [
  { icon: Briefcase, title: "Bildungsgutschein (SGB III §81)", who: "Arbeitsuchende, von Arbeitslosigkeit Bedrohte", coverage: "Möglich nach AZAV-Zertifizierung und Bewilligung", badge: "In Vorbereitung", color: "bg-green-100 text-green-800", desc: "Eine Förderung per Bildungsgutschein setzt eine zugelassene AZAV-Maßnahme und eine individuelle Bewilligung voraus. Die AZAV-Zertifizierung ist in Vorbereitung; aktuell besteht daraus kein Förderanspruch." },
  { icon: Award, title: "Qualifizierungschancengesetz (QCG)", who: "Beschäftigte aller Branchen", coverage: "Zuschüsse je nach Einzelfall und Betriebsgröße", badge: "Prüfung nötig", color: "bg-blue-100 text-blue-800", desc: "Der Arbeitgeber stellt den Antrag bei der Agentur für Arbeit. Ob und in welcher Höhe Lehrgangs- oder Lohnkosten übernommen werden, entscheidet die zuständige Stelle im Einzelfall." },
  { icon: FileText, title: "Aufstiegs-BAföG", who: "Personen mit abgeschlossener Erstausbildung", coverage: "Nur für förderfähige Fortbildungen", badge: "Einzelfall", color: "bg-purple-100 text-purple-800", desc: "Aufstiegs-BAföG gilt für bestimmte höherqualifizierende Fortbildungen. Ob ein konkreter Kurs oder Bildungsweg förderfähig ist, sollte vorab bei der zuständigen Stelle geprüft werden." },
  { icon: ShieldCheck, title: "Steuerliche Absetzbarkeit", who: "Alle Berufstätigen & Selbstständige", coverage: "Steuerliche Berücksichtigung je nach Einzelfall", badge: "Prüfen", color: "bg-amber-100 text-amber-800", desc: "Beruflich veranlasste Weiterbildungskosten können steuerlich berücksichtigungsfähig sein. Bitte Einzelfall mit Steuerberatung oder Finanzamt prüfen; dies ist keine Steuerberatung." },
];

export default function Foerderung() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-3 py-1 rounded-full mb-4">
            <Award className="h-4 w-4"/> Förderprogramme
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-3">Ihre Weiterbildung fördern lassen</h1>
          <p className="text-slate-600">Staatliche Förderprogramme können je nach Einzelfall Zuschüsse oder steuerliche Vorteile ermöglichen.</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 flex gap-3">
          <Info className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5"/>
          <p className="text-sm text-amber-700"><strong className="text-amber-800">Wichtiger Hinweis:</strong> Die AZAV-Zertifizierung ist in Vorbereitung. Förderfähigkeit, Bewilligung und steuerliche Anerkennung hängen vom Einzelfall ab.</p>
        </div>

        <div className="space-y-4 mb-10">
          {programs.map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="bg-slate-100 rounded-lg p-2.5 flex-shrink-0">
                    <Icon className="h-5 w-5 text-slate-700"/>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h2 className="font-semibold text-slate-900 text-sm">{p.title}</h2>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${p.color}`}>{p.badge}</span>
                    </div>
                    <p className="text-sm text-blue-600 font-medium mb-1">{p.coverage}</p>
                    <p className="text-xs text-slate-500 mb-2">Zielgruppe: {p.who}</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-blue-600 rounded-xl p-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-lg mb-1">Sofort starten — Förderfähigkeit vorab prüfen</h3>
            <p className="text-blue-100 text-sm">Berufliche Weiterbildungskosten können steuerlich relevant sein. Bitte Einzelfall prüfen.</p>
          </div>
          <Link to="/kurse" className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-4 py-2.5 rounded-lg hover:bg-blue-50 transition-colors flex-shrink-0">
            Zu den Kursen <ArrowRight className="h-4 w-4"/>
          </Link>
        </div>

        <div className="mt-12 text-center space-y-6">
          <Link to="/">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all transform hover:scale-105">
              Jetzt kostenlos testen
            </button>
          </Link>
          <p className="text-slate-600 text-sm">
            Wir unterstützen bei der Orientierung zu Fördermöglichkeiten: <a href="mailto:info@immobilien-akademie-smart.de" className="text-blue-600 hover:underline font-medium">info@immobilien-akademie-smart.de</a>
          </p>
        </div>
      </div>
    </div>
  );
}
