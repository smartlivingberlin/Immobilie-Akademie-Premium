import { useState } from "react";
import { Link } from "wouter";
import { 
  BookOpen, 
  GraduationCap, 
  Search, 
  Building, 
  Calculator, 
  Users,
  ChevronRight,
  Clock,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

export default function Syllabus() {
  const [searchQuery, setSearchQuery] = useState("");

  const modules = [
    {
      id: 1,
      title: "Einführung & Grundlagen",
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      duration: "20 Tage",
      units: "160 UE",
      description: "Einführung in die Immobilienwirtschaft, Berufsbild, Märkte und Akteure.",
      topics: [
        "Einführung in die Immobilienbranche",
        "Karrierepfade & Weiterbildung",
        "Persönliche Eignung & Soft Skills",
        "Eignungstest & Selbstreflexion",
        "Ziele und Visionen",
        "Marktanalyse & Standortfaktoren",
        "Immobilienarten & Nutzungsarten",
        "Bauqualität & Ausstattung",
        "Energieeffizienz & Nachhaltigkeit",
        "Grundbuch & Liegenschaftskataster",
        "Kaufvertrag & Notar",
        "Mietvertrag & Wohnraumrecht",
        "Wohnungseigentumsgesetz (WEG)",
        "Maklerrecht & Provision",
        "Haftung & Risikomanagement",
        "Steuern rund um die Immobilie",
        "Finanzierungsgrundlagen",
        "Marketing & Exposé-Erstellung",
        "Kundengewinnung & Akquise",
        "Abschlussprüfung Modul 1"
      ]
    },
    {
      id: 2,
      title: "Makler §34c GewO",
      icon: Search,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      duration: "60 Tage",
      units: "480 UE",
      description: "Rechtliche Rahmenbedingungen, Maklervertrag, Wettbewerbsrecht und Verbraucherschutz.",
      topics: [
        "Berufsbild & §34c GewO",
        "Gewerberecht & Erlaubnis",
        "Maklervertrag & AGB",
        "Widerrufsrecht",
        "Geldwäschegesetz (GwG)",
        "Wettbewerbsrecht (UWG)",
        "Preisangabenverordnung (PAngV)",
        "Energieeinsparverordnung (EnEV/GEG)",
        "Datenschutz (DSGVO)",
        "Verbraucherschutz",
        "BGB Vertragsrecht",
        "Sachenrecht",
        "Erbrecht & Immobilien",
        "Familienrecht & Scheidungsimmobilien",
        "Insolvenzrecht",
        "Zwangsversteigerung",
        "Baurecht (BauGB, BauNVO)",
        "Landesbauordnung",
        "Denkmalschutz",
        "Erbbaurecht",
        "Wohnungseigentumsrecht Vertiefung",
        "Mietrecht Vertiefung",
        "Pachtrecht",
        "Objektaufnahme & Bewertung",
        "Exposé & Vermarktung",
        "Besichtigungen durchführen",
        "Verkaufsverhandlungen",
        "Notartermin vorbereiten",
        "Objektübergabe",
        "After-Sales-Service",
        "Farming & Netzwerk",
        "Onlinemarketing & Social Media",
        "Printmarketing",
        "Telefonakquise",
        "Einkauf & Bewertung",
        "Alleinauftrag vs. Allgemeiner Auftrag",
        "Gemeinschaftsgeschäfte",
        "Teilungsgeschäfte",
        "Bauträgergeschäfte",
        "Kapitalanlagenvertrieb",
        "Gewerbeimmobilien",
        "Grundstückshandel",
        "Investmentmakler",
        "Auslandsimmobilien",
        "Büroorganisation",
        "Software & Tools",
        "Rechnungswesen & Buchhaltung",
        "Steuern für Makler",
        "Versicherungen für Makler",
        "Existenzgründung",
        "Businessplan",
        "Markenaufbau",
        "Qualitätsmanagement",
        "Beschwerdemanagement",
        "Konfliktmanagement",
        "Rhetorik & Körpersprache",
        "Verkaufspsychologie",
        "Prüfungsvorbereitung IHK",
        "Prüfungssimulation",
        "Abschlussprüfung Modul 2"
      ]
    },
    {
      id: 3,
      title: "Verwaltung (WEG & Miet)",
      icon: Building,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
      duration: "80 Tage",
      units: "640 UE",
      description: "Umfassende Ausbildung zum WEG- und Mietverwalter mit technischem und kaufmännischem Schwerpunkt.",
      topics: [
        "Einführung in die WEG-Verwaltung",
        "Die Teilungserklärung",
        "Die Eigentümerversammlung (ETV)",
        "Der Wirtschaftsplan",
        "Die Jahresabrechnung",
        "Beschlussfassung & Anfechtung",
        "Verwaltervertrag & Bestellung",
        "Rechte & Pflichten des Verwalters",
        "Der Verwaltungsbeirat",
        "Bauliche Veränderungen",
        "Instandhaltung & Instandsetzung",
        "Verkehrssicherungspflichten",
        "Versicherungen in der WEG",
        "Heizkostenabrechnung",
        "Buchhaltung in der WEG",
        "Mahnwesen & Inkasso",
        "Gerichtliche Verfahren",
        "Sonderumlagen",
        "Modernisierung & Sanierung",
        "Einführung in die Mietverwaltung",
        "Mietvertrag Wohnraum",
        "Mietvertrag Gewerbe",
        "Mietpreiskalkulation",
        "Mietanpassung & Mieterhöhung",
        "Betriebskostenabrechnung",
        "Kautionsverwaltung",
        "Wohnungsübergabe & Abnahme",
        "Mängel & Mietminderung",
        "Schönheitsreparaturen",
        "Kündigung & Räumung",
        "Leerstandsmanagement",
        "Mieterbetreuung & Kommunikation",
        "Konfliktlösung im Mietverhältnis",
        "Technische Verwaltung",
        "Objektbegehung & Dokumentation",
        "Wartungsverträge",
        "Hausmeister & Dienstleister",
        "Vergabe von Handwerkerleistungen",
        "Gewährleistungsverfolgung",
        "Energiemanagement",
        "Facility Management Grundlagen",
        "Sicherheitstechnik",
        "Brandschutz",
        "Trinkwasserverordnung",
        "Legionellenprüfung",
        "Aufzugsanlagen",
        "Elektroprüfung (E-Check)",
        "Dach & Fassade",
        "Außenanlagen & Winterdienst",
        "Müllmanagement",
        "Kaufmännische Verwaltung",
        "Objektbuchhaltung",
        "Sollstellung & Zahlungseingang",
        "Liquiditätsplanung",
        "Budgetierung",
        "Reporting & Berichte",
        "Verwaltersoftware",
        "Digitalisierung in der Verwaltung",
        "Dokumentenmanagement",
        "Datenschutz in der Verwaltung",
        "Büroorganisation für Verwalter",
        "Mitarbeiterführung",
        "Kundenmanagement",
        "Akquise von Verwaltungsmandaten",
        "Kalkulation von Verwaltergebühren",
        "Übernahme neuer Objekte",
        "Beendigung von Verwalterverträgen",
        "Haftungsrisiken für Verwalter",
        "Vermögensschadenhaftpflicht",
        "Rechtsprechung WEG-Recht",
        "Rechtsprechung Mietrecht",
        "Spezialimmobilien (Senioren, Studenten)",
        "Sondereigentumsverwaltung",
        "Poolverwaltung",
        "Genossenschaftsverwaltung",
        "Kommunale Wohnungsverwaltung",
        "Nachhaltigkeitsmanagement (ESG)",
        "Zertifizierter Verwalter (IHK)",
        "Prüfungsvorbereitung",
        "Fallstudien & Praxis",
        "Abschlussprüfung Modul 3"
      ]
    },
    {
      id: 4,
      title: "Gutachten & Sachverständiger",
      icon: Calculator,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      duration: "20 Tage",
      units: "160 UE",
      description: "Grundlagen der Immobilienbewertung, Verfahren und Gutachtenerstellung.",
      topics: [
        "Einführung in das Sachverständigenwesen",
        "Wertbegriffe & Definitionen",
        "ImmoWertV & Wertermittlungsrichtlinien",
        "Bodenwertermittlung",
        "Sachwertverfahren Grundlagen",
        "Sachwertverfahren Vertiefung",
        "Ertragswertverfahren Grundlagen",
        "Ertragswertverfahren Vertiefung",
        "Vergleichswertverfahren",
        "Plausibilisierung von Werten",
        "Bautechnik für Gutachter",
        "Bauschäden & Baumängel",
        "Wohnflächenberechnung",
        "Grundstücksmarktbericht",
        "Rechte & Belastungen (Abt. II)",
        "Wegerechte & Leitungsrechte",
        "Wohnungsrecht & Nießbrauch",
        "Erbbaurecht Bewertung",
        "Gutachtenerstellung Praxis",
        "Abschlussprüfung Modul 4"
      ]
    },
    {
      id: 5,
      title: "Prüfung & §34i",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      duration: "20 Tage",
      units: "160 UE",
      description: "Immobiliardarlehensvermittlung, Finanzierung und Prüfungsvorbereitung.",
      topics: [
        "Rechtliche Grundlagen §34i GewO",
        "Immobiliar-Verbraucherdarlehensvertragsgesetz",
        "Kreditwürdigkeitsprüfung",
        "Finanzierungsarten & Darlehensformen",
        "Zinsen & Tilgung",
        "Kreditsicherheiten",
        "Grundschuld & Hypothek",
        "Bausparen & Förderungen",
        "KfW-Programme",
        "Beratungsprozess & Dokumentation",
        "Vorvertragliche Informationen (ESIS)",
        "Steuerliche Aspekte der Finanzierung",
        "Rechenübungen Finanzierung",
        "Beleihungswertermittlung",
        "Bonitätsprüfung Unterlagen",
        "Bankgespräche führen",
        "Haftung & Sanktionen",
        "Berufspflichten §34i",
        "Intensive Prüfungsvorbereitung",
        "Abschlussprüfung Gesamtlehrgang"
      ]
    }
  ];

  const filteredModules = modules.map(mod => ({
    ...mod,
    topics: mod.topics.filter(topic => 
      topic.toLowerCase().includes(searchQuery.toLowerCase()) || 
      mod.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(mod => mod.topics.length > 0 || mod.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            className="pl-0 hover:pl-2 transition-all text-slate-500 hover:text-slate-900"
            onClick={() => window.location.href = '/'}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zurück zur Startseite
          </Button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Offizieller Lehrgang 2026
              </Badge>
              <span className="text-sm text-slate-500">Stand: Februar 2026</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Gesamter Lehrplan</h1>
            <p className="text-slate-600 mt-2 max-w-2xl">
              Der vollständige Ausbildungsplan über alle 5 Module und 220 Tage. 
              Insgesamt 1760 Unterrichtseinheiten (UE) für Ihre Karriere.
            </p>
          </div>
          
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Thema suchen..." 
              className="pl-9 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-8">
          {filteredModules.map((module) => (
            <Card key={module.id} className={`overflow-hidden border-l-4 ${module.borderColor.replace('border', 'border-l')}`}>
              <CardHeader className={`${module.bgColor} border-b ${module.borderColor} bg-opacity-30`}>
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center ${module.color}`}>
                      <module.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl md:text-2xl font-bold text-slate-900">
                        Modul {module.id}: {module.title}
                      </CardTitle>
                      <p className="text-slate-600 text-sm mt-1">{module.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 text-sm font-medium">
                    <Badge variant="secondary" className="bg-white/80 backdrop-blur border-slate-200">
                      <Clock className="w-3 h-3 mr-1" /> {module.duration}
                    </Badge>
                    <Badge variant="secondary" className="bg-white/80 backdrop-blur border-slate-200">
                      <GraduationCap className="w-3 h-3 mr-1" /> {module.units}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-full max-h-[500px]">
                  <div className="p-6">
                    <div className="grid md:grid-cols-2 gap-x-8 gap-y-3">
                      {module.topics.map((topic, index) => (
                        <div key={index} className="flex items-start gap-3 group p-2 rounded-lg hover:bg-slate-50 transition-colors">
                          <div className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold border ${module.color.replace('text', 'border')} ${module.color.replace('text', 'bg')}/10 shrink-0`}>
                            {index + 1}
                          </div>
                          <span className="text-slate-700 group-hover:text-slate-900 transition-colors text-sm md:text-base">
                            {topic}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollArea>
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
                  <Button 
                    className={`${module.bgColor.replace('bg-', 'bg-').replace('50', '600')} hover:opacity-90 text-white border-0`}
                    onClick={() => window.location.href = `/modul/${module.id}`}
                  >
                    Zu Modul {module.id} wechseln <ChevronRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {filteredModules.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
              <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900">Keine Ergebnisse gefunden</h3>
              <p className="text-slate-500">Versuchen Sie es mit einem anderen Suchbegriff.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
