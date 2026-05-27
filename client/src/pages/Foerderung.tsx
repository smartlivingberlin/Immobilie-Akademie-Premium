import { CheckCircle2, ArrowRight, FileText, Award, ShieldCheck, Briefcase, Info } from "lucide-react";
import { Link } from "wouter";

const programs = [
  { icon: Briefcase, title: "Bildungsgutschein (SGB III §81)", who: "Arbeitsuchende, von Arbeitslosigkeit Bedrohte", coverage: "Bis zu 100 % der Kursgebühren", badge: "Bis 100%", color: "bg-green-100 text-green-800", desc: "Erfordert AZAV-zertifizierte Maßnahme. Wir bereiten die AZAV-Zertifizierung vor. Ansprechpartner: Agentur für Arbeit." },
  { icon: Award, title: "Qualifizierungschancengesetz (QCG)", who: "Beschäftigte aller Branchen", coverage: "25–100 % je nach Betriebsgröße", badge: "Bis 100%", color: "bg-blue-100 text-blue-800", desc: "Arbeitgeber stellt Antrag bei der Agentur für Arbeit. Kann Lehrgangs- und Lohnkosten übernehmen." },
  { icon: FileText, title: "Aufstiegs-BAföG", who: "Personen mit abgeschlossener Erstausbildung", coverage: "50 % Zuschuss + 50 % zinsgünstiges Darlehen", badge: "Zuschuss", color: "bg-purple-100 text-purple-800", desc: "Für höhere Fortbildungen wie Geprüfte/r Immobilienfachwirt/in. Zuschuss muss nicht zurückgezahlt werden." },
  { icon: ShieldCheck, title: "Steuerliche Absetzbarkeit", who: "Alle Berufstätigen & Selbstständige", coverage: "Bis zu 100 % als Werbungskosten", badge: "Sofort", color: "bg-amber-100 text-amber-800", desc: "Berufliche Weiterbildungskosten sind sofort und vollständig absetzbar — ohne Voraussetzungen." },
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
          <p className="text-slate-600">Staatliche Förderprogramme können Ihre Kursgebühren vollständig übernehmen.</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 flex gap-3">
          <Info className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5"/>
          <p className="text-sm text-amber-700"><strong className="text-amber-800">AZAV-Zertifizierung:</strong> Wir bereiten die AZAV-Zertifizierung vor. Die steuerliche Absetzbarkeit gilt bereits jetzt sofort.</p>
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

        <div className="bg-blue-600 rounded-xl p-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="font-semibold text-lg mb-1">Sofort starten — steuerlich absetzbar</h3>
            <p className="text-blue-100 text-sm">Alle Kursgebühren sind vollständig von der Steuer absetzbar.</p>
          </div>
          <Link to="/kurse" className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-4 py-2.5 rounded-lg hover:bg-blue-50 transition-colors flex-shrink-0">
            Zu den Kursen <ArrowRight className="h-4 w-4"/>
          </Link>
        </div>

        <div className="text-center bg-slate-100 rounded-xl p-8 border border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-3">Bereit für den nächsten Schritt?</h3>
          <p className="text-slate-600 mb-6">Testen Sie unser Lernportal völlig unverbindlich.</p>
          <Link to="/" className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200 mb-6">
            Jetzt kostenlos testen <ArrowRight className="h-5 w-5"/>
          </Link>
          <div className="pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-500 font-medium">Wir helfen Ihnen bei der Antragstellung:</p>
            <a href="mailto:info@immobilien-akademie-smart.de" className="text-blue-600 font-bold hover:underline">
              info@immobilien-akademie-smart.de
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
