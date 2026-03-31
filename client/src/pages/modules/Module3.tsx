import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building2, 
  Scale, 
  Wrench, 
  Calculator, 
  Users, 
  Leaf, 
  ShieldCheck, 
  FileText,
  Briefcase,
  Gavel,
  FileCheck
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { AITutor } from "@/components/AITutor";

export default function Module3() {
  const [tutorOpen, setTutorOpen] = React.useState(false);
  return (
    <>
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-primary font-medium">
          <Badge variant="outline" className="text-primary border-primary/20">Modul 3</Badge>
          <span>640 Unterrichtseinheiten</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-slate-900 dark:text-white">
          Immobilienverwaltung & Facility Management
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
          Umfassendes Wissen für die professionelle Verwaltung: Von WEG-Recht über Mietmanagement bis hin zu technischer Gebäudeausrüstung und Nachhaltigkeit.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-l-4 border-l-blue-600 hover:shadow-lg transition-all">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">Basis</Badge>
              <span className="text-xs text-muted-foreground">32 UE</span>
            </div>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-600" />
              WEG-Verwaltung
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Teilungserklärung, Gemeinschaftsordnung, Eigentümerversammlung und Beschlussfassung.
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-600 hover:shadow-lg transition-all">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">Recht</Badge>
              <span className="text-xs text-muted-foreground">48 UE</span>
            </div>
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-green-600" />
              Mietrecht
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Wohnraum- und Gewerbemietrecht, Kündigung, Mieterhöhung und Minderungen.
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-all">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">Technik</Badge>
              <span className="text-xs text-muted-foreground">32 UE</span>
            </div>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-orange-500" />
              Facility Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Technische Verwaltung, Instandhaltung, Verkehrssicherung und Gebäudetechnik.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Content Tabs */}
      <Tabs defaultValue="intro" className="w-full">
        <TabsList className="flex flex-wrap h-auto p-1 bg-slate-100 dark:bg-slate-800 rounded-xl gap-1">
          <TabsTrigger value="intro" className="flex-1 min-w-[120px]">Einführung</TabsTrigger>
          <TabsTrigger value="weg" className="flex-1 min-w-[120px]">WEG-Recht</TabsTrigger>
          <TabsTrigger value="miet" className="flex-1 min-w-[120px]">Mietrecht</TabsTrigger>
          <TabsTrigger value="tech" className="flex-1 min-w-[120px]">Technik & FM</TabsTrigger>
          <TabsTrigger value="finance" className="flex-1 min-w-[120px]">Buchhaltung</TabsTrigger>
          <TabsTrigger value="esg" className="flex-1 min-w-[120px]">Nachhaltigkeit</TabsTrigger>
        </TabsList>

        <TabsContent value="intro" className="mt-8 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border shadow-sm">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Briefcase className="h-6 w-6 text-primary" />
              Einführung in die Immobilienverwaltung
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-3">Verwaltungsarten im Überblick</h3>
                <ul className="space-y-3">
                  <li className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <span className="font-bold block">WEG-Verwaltung</span>
                    <span className="text-sm text-muted-foreground">Verwaltung des Gemeinschaftseigentums einer Wohnungseigentümergemeinschaft nach WEG-Gesetz.</span>
                  </li>
                  <li className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <span className="font-bold block">Mietverwaltung (Sondereigentum)</span>
                    <span className="text-sm text-muted-foreground">Verwaltung einzelner Wohnungen oder ganzer Miethäuser im Auftrag des Eigentümers.</span>
                  </li>
                  <li className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <span className="font-bold block">Gewerbeverwaltung</span>
                    <span className="text-sm text-muted-foreground">Spezialisiert auf Büros, Einzelhandel und Logistikflächen. Fokus auf Rendite und Wertsicherung.</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Rechtliche Grundlagen</h3>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Der Verwalter agiert als Treuhänder fremden Vermögens. Die rechtlichen Rahmenbedingungen sind streng geregelt durch:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>BGB (Bürgerliches Gesetzbuch)</li>
                    <li>WEG (Wohnungseigentumsgesetz)</li>
                    <li>Heizkostenverordnung</li>
                    <li>Trinkwasserverordnung</li>
                    <li>Landesbauordnungen</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="weg" className="mt-8 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border shadow-sm">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Users className="h-6 w-6 text-blue-600" />
              WEG-Verwaltung & Recht
            </h2>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold mb-3">Die "Bibel" der WEG</h3>
                <Card>
                  <CardContent className="pt-6">
                    <h4 className="font-bold mb-2 flex items-center gap-2">
                      <FileCheck className="h-4 w-4 text-blue-500" />
                      Teilungserklärung
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Regelt, was Sondereigentum (Wohnung) und was Gemeinschaftseigentum (Treppenhaus, Dach) ist. Bestimmt auch die Miteigentumsanteile (MEA).
                    </p>
                    <h4 className="font-bold mb-2 flex items-center gap-2">
                      <Gavel className="h-4 w-4 text-blue-500" />
                      Gemeinschaftsordnung
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Das "Grundgesetz" der Gemeinschaft. Regelt Stimmrechte, Kostenverteilung und Nutzungsrechte.
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Die Eigentümerversammlung (ETV)</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2 items-start">
                    <div className="bg-blue-100 rounded-full w-5 h-5 flex items-center justify-center text-blue-600 text-xs font-bold mt-0.5">1</div>
                    <span><strong>Einladung:</strong> Muss mindestens 3 Wochen vorher in Textform erfolgen.</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <div className="bg-blue-100 rounded-full w-5 h-5 flex items-center justify-center text-blue-600 text-xs font-bold mt-0.5">2</div>
                    <span><strong>Beschlussfähigkeit:</strong> Seit der WEG-Reform 2020 ist die Versammlung immer beschlussfähig, egal wie viele Eigentümer anwesend sind.</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <div className="bg-blue-100 rounded-full w-5 h-5 flex items-center justify-center text-blue-600 text-xs font-bold mt-0.5">3</div>
                    <span><strong>Protokoll:</strong> Muss unverzüglich erstellt und vom Verwalter sowie einem Eigentümer unterschrieben werden.</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Was darf der Verwalter entscheiden?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    Der Verwalter hat eine Generalvollmacht für das Gemeinschaftseigentum. Er darf eigenständig Verträge für Versorger (Strom, Wasser) abschließen und notwendige Reparaturen beauftragen. Für größere Maßnahmen (Sanierungen) braucht er einen Beschluss der ETV.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Was ist das "Zertifizierte Verwalter"-Gesetz?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    Seit Dezember 2023 haben Eigentümer Anspruch auf einen zertifizierten Verwalter (IHK-Prüfung). Ausnahme: Kleine WEGs, die sich selbst verwalten.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </TabsContent>

        <TabsContent value="miet" className="mt-8 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border shadow-sm">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Scale className="h-6 w-6 text-green-600" />
              Mietrecht & Praxis
            </h2>
            
            <div className="grid gap-6 md:grid-cols-3 mb-8">
              <Card>
                <CardHeader><CardTitle className="text-base">Mietminderung</CardTitle></CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Voraussetzungen, Berechnung und Ausschlussgründe nach § 536 BGB.
                  <br/><span className="text-green-600 font-semibold mt-2 block">Praxis: Minderungsschreiben prüfen</span>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-base">Mieterhöhung</CardTitle></CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Vergleichsmiete, Index- und Staffelmiete, Modernisierungsumlage.
                  <br/><span className="text-green-600 font-semibold mt-2 block">Praxis: Zustimmungserklärung</span>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-base">Kündigung</CardTitle></CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Eigenbedarf, Zahlungsverzug, fristlose Kündigung und Räumungsklage.
                  <br/><span className="text-green-600 font-semibold mt-2 block">Praxis: Kündigungsschutzklage</span>
                </CardContent>
              </Card>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Interaktive Fallstudie: Schimmel in der Wohnung</h3>
              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <p className="mb-4">
                  <strong>Szenario:</strong> Mieter M meldet Schimmel im Schlafzimmer und mindert die Miete pauschal um 20%. 
                  Der Vermieter behauptet, es liege am falschen Lüftungsverhalten.
                </p>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 p-4 bg-white dark:bg-slate-900 rounded-lg border hover:border-green-500 cursor-pointer transition-colors group">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded group-hover:bg-green-100 group-hover:text-green-600 transition-colors">
                        <Wrench className="h-4 w-4" />
                      </div>
                      <h4 className="font-bold text-sm">Schritt 1: Ursachenforschung</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Bevor rechtliche Schritte eingeleitet werden, muss die Ursache geklärt werden. 
                      <ul>
                        <li>- Feuchtigkeitsmessung durchführen</li>
                        <li>- Baugutachten bei Streitigkeiten</li>
                        <li>- Lüftungsprotokoll vom Mieter anfordern</li>
                      </ul>
                    </p>
                  </div>
                  <div className="flex-1 p-4 bg-white dark:bg-slate-900 rounded-lg border hover:border-blue-500 cursor-pointer transition-colors group">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                        <Scale className="h-4 w-4" />
                      </div>
                      <h4 className="font-bold text-sm">Schritt 2: Rechtliche Bewertung</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      <ul>
                        <li>- Ist der Mangel erheblich? (Bagatellgrenze)</li>
                        <li>- Beweislast: Vermieter muss beweisen, dass kein Baumangel vorliegt.</li>
                        <li>- Angemessene Minderungsquote prüfen (Tabellen).</li>
                      </ul>
                    </p>
                  </div>
                  <div className="flex-1 p-4 bg-white dark:bg-slate-900 rounded-lg border hover:border-purple-500 cursor-pointer transition-colors group">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded group-hover:bg-purple-100 group-hover:text-purple-600 transition-colors">
                        <FileText className="h-4 w-4" />
                      </div>
                      <h4 className="font-bold text-sm">Schritt 3: Lösung</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      <ul>
                        <li>- Mangelbeseitigung beauftragen (wenn Vermietersache)</li>
                        <li>- Abmahnung bei Fehlverhalten des Mieters</li>
                        <li>- Vergleich oder gerichtliche Klärung (letztes Mittel)</li>
                      </ul>
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                   <Button variant="outline" size="sm" className="gap-2">
                     <FileText className="h-4 w-4" />
                     Musterbrief: Abmahnung Lüftungsverhalten
                   </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tech" className="mt-8 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border shadow-sm">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Wrench className="h-6 w-6 text-orange-500" />
              Facility Management & Technik
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="bg-orange-100 p-2 rounded-lg"><ShieldCheck className="h-6 w-6 text-orange-600"/></div>
                <div>
                  <h3 className="font-semibold text-lg">Verkehrssicherungspflicht</h3>
                  <p className="text-muted-foreground">
                    Der Eigentümer (und damit der Verwalter) muss Gefahrenquellen beseitigen. Dazu gehören:
                    Schneeräumung, Beleuchtung, Gehwegplatten, Dachziegel, Spielplatzgeräte.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="bg-orange-100 p-2 rounded-lg"><Leaf className="h-6 w-6 text-orange-600"/></div>
                <div>
                  <h3 className="font-semibold text-lg">Instandhaltung vs. Modernisierung</h3>
                  <p className="text-muted-foreground">
                    <strong>Instandhaltung:</strong> Erhalt des Soll-Zustands (z.B. Reparatur defekter Heizung).<br/>
                    <strong>Modernisierung:</strong> Verbesserung des Wohnwerts oder Energieeinsparung (z.B. Dämmung).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="finance" className="mt-8 space-y-6">
           <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border shadow-sm">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Calculator className="h-6 w-6 text-purple-600" />
              Buchhaltung & Abrechnung
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-3">Die Jahresabrechnung (Hausgeld)</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Die Königsdisziplin des Verwalters. Sie muss für jeden Laien verständlich sein und alle Einnahmen/Ausgaben des Jahres listen.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2"><div className="w-2 h-2 bg-purple-500 rounded-full"></div>Gesamtabrechnung (für die ganze WEG)</li>
                  <li className="flex items-center gap-2"><div className="w-2 h-2 bg-purple-500 rounded-full"></div>Einzelabrechnung (für jeden Eigentümer)</li>
                  <li className="flex items-center gap-2"><div className="w-2 h-2 bg-purple-500 rounded-full"></div>Entwicklung der Erhaltungsrücklage</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Betriebskostenabrechnung (Mieter)</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Umlagefähige Kosten nach BetrKV auf den Mieter umlegen.
                </p>
                <Card className="bg-purple-50 border-purple-100">
                  <CardContent className="pt-4">
                    <span className="font-bold text-purple-800 block mb-1">Achtung: Fristen!</span>
                    <p className="text-xs text-purple-700">
                      Die Abrechnung muss dem Mieter spätestens 12 Monate nach Ende des Abrechnungszeitraums zugehen. Sonst verfällt der Nachzahlungsanspruch!
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
           </div>
        </TabsContent>

        <TabsContent value="esg" className="mt-8 space-y-6">
           <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border shadow-sm">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Leaf className="h-6 w-6 text-emerald-600" />
              Nachhaltigkeit & ESG
            </h2>
            <p className="text-muted-foreground mb-6">
              "Environmental, Social, Governance" – Nachhaltigkeit wird zum entscheidenden Wertfaktor für Immobilien.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 border rounded-xl">
                <h3 className="font-bold text-emerald-700 mb-2">E - Environmental</h3>
                <p className="text-sm text-muted-foreground">Energieeffizienz, CO2-Reduktion, Heizungstausch (GEG), Photovoltaik.</p>
              </div>
              <div className="p-4 border rounded-xl">
                <h3 className="font-bold text-emerald-700 mb-2">S - Social</h3>
                <p className="text-sm text-muted-foreground">Barrierefreiheit, bezahlbares Wohnen, Mieterzufriedenheit, Quartiersentwicklung.</p>
              </div>
              <div className="p-4 border rounded-xl">
                <h3 className="font-bold text-emerald-700 mb-2">G - Governance</h3>
                <p className="text-sm text-muted-foreground">Transparente Verwaltung, Einhaltung von Gesetzen (Compliance), Datenschutz.</p>
              </div>
            </div>
           </div>
        </TabsContent>
      </Tabs>
    </div>
      {/* KI-Tutor Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setTutorOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-200 font-medium text-sm"
        >
          <span>🤖</span>
          <span>KI-Tutor</span>
        </button>
      </div>
      <AITutor
        isOpen={tutorOpen}
        onClose={() => setTutorOpen(false)}
        moduleId={3}
        moduleContext="Modul 3"
      />
    </>
  );
}
