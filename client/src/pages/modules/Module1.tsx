import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Scale, Shield, UserCheck, AlertTriangle, CheckCircle2, FileText, ArrowRight } from "lucide-react";
import { AITutor } from "@/components/AITutor";

export default function Module1() {
  const [tutorOpen, setTutorOpen] = React.useState(false);
  return (
    <>
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-primary font-medium">
          <Badge variant="outline" className="text-primary border-primary/20">Teil 1</Badge>
          <span>16 Unterrichtseinheiten</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-slate-900 dark:text-white">
          Erste Schritte als Makler
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
          Dieses Modul legt das Fundament für Ihre Maklertätigkeit. Sie lernen die rechtlichen Voraussetzungen nach §34c GewO kennen, verstehen Ihre Pflichten nach dem Geldwäschegesetz (GwG) und entwickeln ein Verständnis für Berufsethik.
        </p>
      </div>

      {/* Quick Access Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary group cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 group-hover:text-primary transition-colors">
              <Scale className="h-5 w-5 text-primary" />
              Rechtliche Basis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              §34c GewO Erlaubnispflicht, Versagungsgründe und Zuverlässigkeitsprüfung.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-orange-500 group cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 group-hover:text-orange-500 transition-colors">
              <Shield className="h-5 w-5 text-orange-500" />
              GwG & Datenschutz
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Identifizierungspflichten (KYC), Risikoanalyse und DSGVO-Compliance.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-slate-700 group cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 group-hover:text-slate-700 transition-colors">
              <UserCheck className="h-5 w-5 text-slate-700" />
              Berufsethik
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Verhaltensgrundsätze, Wettbewerbsrecht und Verantwortung gegenüber Kunden.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="law" className="w-full">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 h-auto p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <TabsTrigger value="law" className="rounded-lg py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm">§34c GewO</TabsTrigger>
          <TabsTrigger value="gwg" className="rounded-lg py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm">Geldwäsche (GwG)</TabsTrigger>
          <TabsTrigger value="dsgvo" className="rounded-lg py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm">Datenschutz</TabsTrigger>
          <TabsTrigger value="ethics" className="rounded-lg py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm">Ethik & Praxis</TabsTrigger>
        </TabsList>

        {/* Tab 1: §34c GewO */}
        <TabsContent value="law" className="mt-8 space-y-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border shadow-sm">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <Scale className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Die Gewerbeerlaubnis nach §34c GewO</h2>
                <p className="text-muted-foreground">
                  Ohne diese Erlaubnis dürfen Sie nicht als Makler tätig werden. Hier lernen Sie die Voraussetzungen.
                </p>
              </div>
            </div>

            <Alert className="mb-8 border-l-4 border-l-blue-600 bg-blue-50/50 dark:bg-blue-900/10">
              <AlertTriangle className="h-4 w-4 text-blue-600" />
              <AlertTitle className="text-blue-800 dark:text-blue-300 font-semibold">Wichtig</AlertTitle>
              <AlertDescription className="text-blue-700 dark:text-blue-400">
                Die Tätigkeit als Immobilienmakler ist erlaubnispflichtig. Ein reiner Gewerbeschein reicht nicht aus!
                Sie müssen die Erlaubnis <strong>vor</strong> Aufnahme der Tätigkeit besitzen.
              </AlertDescription>
            </Alert>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  Voraussetzungen für die Erlaubnis
                </h3>
                <ul className="space-y-3">
                  <li className="flex gap-3 items-start p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <span className="font-bold text-slate-400">1.</span>
                    <div>
                      <span className="font-medium block text-slate-900 dark:text-slate-100">Zuverlässigkeit</span>
                      <span className="text-sm text-muted-foreground">Keine relevanten Vorstrafen (Verbrechen/Vergehen) in den letzten 5 Jahren.</span>
                    </div>
                  </li>
                  <li className="flex gap-3 items-start p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <span className="font-bold text-slate-400">2.</span>
                    <div>
                      <span className="font-medium block text-slate-900 dark:text-slate-100">Geordnete Vermögensverhältnisse</span>
                      <span className="text-sm text-muted-foreground">Kein Insolvenzverfahren, keine Eintragung im Schuldnerverzeichnis.</span>
                    </div>
                  </li>
                  <li className="flex gap-3 items-start p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <span className="font-bold text-slate-400">3.</span>
                    <div>
                      <span className="font-medium block text-slate-900 dark:text-slate-100">Weiterbildungspflicht</span>
                      <span className="text-sm text-muted-foreground">20 Stunden Fortbildung innerhalb von 3 Jahren (für Makler und Verwalter).</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-slate-500" />
                  Benötigte Unterlagen
                </h3>
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-slate-400"></div>
                      Führungszeugnis (Belegart O)
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-slate-400"></div>
                      Auskunft aus dem Gewerbezentralregister
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-slate-400"></div>
                      Unbedenklichkeitsbescheinigung des Finanzamts
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-slate-400"></div>
                      Auskunft des Insolvenzgerichts
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-slate-400"></div>
                      Bescheinigung in Steuersachen (Gemeinde)
                    </li>
                  </ul>
                </div>
                <div className="mt-4 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-100 dark:border-orange-800/30">
                  <h4 className="font-semibold text-orange-800 dark:text-orange-300 text-sm mb-1">Kein Sachkundenachweis!</h4>
                  <p className="text-xs text-orange-700 dark:text-orange-400">
                    Anders als bei Versicherungs- oder Finanzanlagenvermittlern ist für Immobilienmakler aktuell <strong>keine</strong> IHK-Sachkundeprüfung erforderlich.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Tab 2: GwG */}
        <TabsContent value="gwg" className="mt-8 space-y-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border shadow-sm">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                <Shield className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Geldwäschegesetz (GwG)</h2>
                <p className="text-muted-foreground">
                  Immobilienmakler sind Verpflichtete nach dem GwG. Verstöße können existenzbedrohende Bußgelder nach sich ziehen.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">1. Risikoanalyse</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Sie müssen einmalig (und dann regelmäßig) analysieren, wie hoch das Risiko für Geldwäsche in Ihrem spezifischen Geschäftsfeld ist.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">2. Identifizierung (KYC)</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  "Know Your Customer": Sie müssen Vertragspartner <strong>vor</strong> Begründung der Geschäftsbeziehung identifizieren (Ausweiskopie!).
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">3. Verdachtsmeldung</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Bei Verdacht auf Geldwäsche (z.B. Barkauf, undurchsichtige Firmenkonstrukte) müssen Sie dies der FIU melden.
                </CardContent>
              </Card>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Wann muss ich identifizieren?</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li>Bei Kaufverträgen: Sobald ein ernsthaftes Kaufinteresse besteht (spätestens vor dem Notartermin, in der Praxis oft bei Reservierung).</li>
                    <li>Bei Mietverträgen: Nur wenn die monatliche Miete 10.000 € übersteigt.</li>
                    <li>Bei Verdachtsmomenten: Unabhängig von Schwellenwerten.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Wie dokumentiere ich richtig?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    Sie müssen eine Kopie des Personalausweises (Vorder- und Rückseite) anfertigen oder die Daten digital erfassen.
                    Diese Unterlagen müssen <strong>5 Jahre</strong> aufbewahrt werden. Nach 10 Jahren müssen sie vernichtet werden.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Was ist der "Wirtschaftlich Berechtigte"?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    Kauft eine Firma (GmbH, KG, etc.) eine Immobilie, müssen Sie herausfinden, welche natürliche Person dahintersteht (mehr als 25% Anteile).
                    Hier hilft ein Blick ins Transparenzregister.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </TabsContent>

        {/* Tab 3: DSGVO */}
        <TabsContent value="dsgvo" className="mt-8 space-y-8">
           <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border shadow-sm">
             <div className="flex items-start gap-4 mb-6">
               <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
                 <Shield className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
               </div>
               <div>
                 <h2 className="text-2xl font-bold mb-2">Datenschutz (DSGVO)</h2>
                 <p className="text-muted-foreground">
                   Makler verarbeiten viele personenbezogene Daten. Hier gilt es, sauber zu arbeiten.
                 </p>
               </div>
             </div>

             <div className="space-y-6">
               <div className="border-l-4 border-indigo-500 pl-6 py-2">
                 <h3 className="font-semibold text-lg mb-2">Grundsatz der Datenminimierung</h3>
                 <p className="text-muted-foreground">
                   Sammeln Sie nur Daten, die Sie für den Zweck (Vermittlung) wirklich brauchen.
                   Fragen Sie nicht nach der Religion oder politischen Einstellung.
                 </p>
               </div>

               <div className="grid md:grid-cols-2 gap-6">
                 <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl">
                   <h4 className="font-semibold mb-4">Pflichten auf der Webseite</h4>
                   <ul className="space-y-2 text-sm text-muted-foreground">
                     <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500"/> Impressum</li>
                     <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500"/> Datenschutzerklärung</li>
                     <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500"/> Cookie-Banner (Consent)</li>
                     <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500"/> SSL-Verschlüsselung</li>
                   </ul>
                 </div>
                 <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl">
                   <h4 className="font-semibold mb-4">Umgang mit Interessentendaten</h4>
                   <ul className="space-y-2 text-sm text-muted-foreground">
                     <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500"/> Einwilligung für Newsletter/Werbung</li>
                     <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500"/> Löschkonzept (wenn Zweck entfällt)</li>
                     <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500"/> Auskunftsrecht der Kunden</li>
                     <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500"/> Sichere Speicherung (Passwörter!)</li>
                   </ul>
                 </div>
               </div>
             </div>
           </div>
        </TabsContent>

        {/* Tab 4: Ethik & Praxis */}
        <TabsContent value="ethics" className="mt-8 space-y-8">
           <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border shadow-sm">
             <div className="flex items-start gap-4 mb-6">
               <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                 <UserCheck className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
               </div>
               <div>
                 <h2 className="text-2xl font-bold mb-2">Berufsethik & Verantwortung</h2>
                 <p className="text-muted-foreground">
                   Ein guter Makler ist mehr als ein Türöffner. Er ist Vertrauensperson und Berater.
                 </p>
               </div>
             </div>

             <div className="grid gap-6">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                  <h3 className="text-xl font-bold mb-4">Typische Verstöße (Praxisbeispiele)</h3>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">1</div>
                      <div>
                        <h4 className="font-semibold">Das "Lockvogel-Angebot"</h4>
                        <p className="text-sm text-muted-foreground">
                          Ein Makler inseriert eine traumhafte Wohnung, die es gar nicht gibt (oder schon verkauft ist), nur um Leads zu generieren.
                          <br/><span className="text-red-500 text-xs font-semibold">Folge: Abmahnung (UWG), Vertrauensverlust.</span>
                        </p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex gap-4">
                      <div className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">2</div>
                      <div>
                        <h4 className="font-semibold">Verschweigen von Mängeln</h4>
                        <p className="text-sm text-muted-foreground">
                          Der Makler weiß vom feuchten Keller, sagt aber nichts.
                          <br/><span className="text-red-500 text-xs font-semibold">Folge: Schadensersatz, Verlust der Provision, arglistige Täuschung.</span>
                        </p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex gap-4">
                      <div className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">3</div>
                      <div>
                        <h4 className="font-semibold">Doppeltätigkeit ohne Aufklärung</h4>
                        <p className="text-sm text-muted-foreground">
                          Der Makler vertritt Käufer und Verkäufer, bevorzugt aber einseitig den Verkäufer.
                          <br/><span className="text-red-500 text-xs font-semibold">Folge: Interessenkollision, Provisionsverlust (§ 654 BGB).</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="gap-2">
                    Zum Wissens-Quiz
                    <ArrowRight className="h-4 w-4" />
                  </Button>
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
        moduleId={1}
        moduleContext="Modul 1"
      />
    </>
  );
}
