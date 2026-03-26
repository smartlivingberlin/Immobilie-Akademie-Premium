This file is a merged representation of a subset of the codebase, containing specifically included files and files not matching ignore patterns, combined into a single document by Repomix.

<file_summary>
This section contains a summary of this file.

<purpose>
This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.
</purpose>

<file_format>
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  - File path as an attribute
  - Full contents of the file
</file_format>

<usage_guidelines>
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.
</usage_guidelines>

<notes>
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Only files matching these patterns are included: client/src/pages/modules/*Detail*, client/src/pages/modules/*WithIntro*
- Files matching these patterns are excluded: node_modules, dist, .git
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)
</notes>

</file_summary>

<directory_structure>
client/
  src/
    pages/
      modules/
        Module1Detail.tsx
        Module1WithIntro.tsx
        Module2Detail.tsx
        Module2WithIntro.tsx
        Module3Detail.tsx
        Module3WithIntro.tsx
        Module4Detail.tsx
        Module4WithIntro.tsx
        Module5Detail.tsx
        Module5WithIntro.tsx
</directory_structure>

<files>
This section contains the contents of the repository's files.

<file path="client/src/pages/modules/Module1WithIntro.tsx">
import { useState } from "react";
import { ModuleIntro } from "@/components/ModuleIntro";
import Module1Detail from "./Module1Detail";

export default function Module1WithIntro() {
  const [showIntro, setShowIntro] = useState(true);

  if (showIntro) {
    return (
      <ModuleIntro
        moduleId={1}
        title="Einführung in die Immobilienwirtschaft"
        subtitle="Der ideale Einstieg für alle, die neu in der Immobilienbranche sind. Du lernst die wichtigsten Grundlagen, Rechtsgrundlagen und Marktstrukturen — verständlich erklärt, ohne Vorkenntnisse."
        targetAudience="Dieses Modul richtet sich an Quereinsteiger aus allen Berufsfeldern, die eine Karriere als Immobilienmakler, Verwalter oder Sachverständiger anstreben. Keine Vorkenntnisse in der Immobilienwirtschaft erforderlich."
        duration="20 Lerntage"
        units="160"
        goal="Nach diesem Modul kennst du den deutschen Immobilienmarkt, seine wichtigsten Akteure, Rechtsgrundlagen und Objektarten. Du verstehst die Grundbegriffe der Immobilienwirtschaft und kannst dich sicher in Fachgesprächen bewegen."
        whatYouLearn={[
          "Aufbau und Struktur des deutschen Immobilienmarkts",
          "Wichtigste Gesetze: BGB, GewO, WEG, MietG",
          "Objektarten: Wohn-, Gewerbe- und Spezialimmobilien",
          "Akteure: Makler, Verwalter, Gutachter, Banken",
          "Grundbuch, Eigentum und dingliche Rechte",
          "Öffentliches Baurecht und Baugenehmigungen",
        ]}
        whatYouCanAfter={[
          "Den deutschen Immobilienmarkt einordnen und beschreiben",
          "Fachbegriffe sicher verwenden",
          "Einfache Rechtsfragen zu Kauf und Miete beantworten",
          "Die IHK-Sachkundeprüfung §34c vorbereiten",
          "Berufsbild Immobilienmakler vollständig erklären",
        ]}
        examRelevance="Modul 1 bildet die Grundlage für alle weiteren Module und die IHK-Sachkundeprüfung §34c GewO. Ca. 20% der IHK-Prüfungsfragen entstammen den Themen dieses Moduls."
        legalBasis="§34c GewO"
        difficulty="Einsteiger"
        onStart={() => setShowIntro(false)}
      />
    );
  }

  return <Module1Detail />;
}
</file>

<file path="client/src/pages/modules/Module3WithIntro.tsx">
import { useState } from "react";
import { ModuleIntro } from "@/components/ModuleIntro";
import Module3Detail from "./Module3Detail";

export default function Module3WithIntro() {
  const [showIntro, setShowIntro] = useState(true);

  if (showIntro) {
    return (
      <ModuleIntro
        moduleId={3}
        title="Verwalter WEG & Mietrecht"
        subtitle="Das umfangreichste Modul — für alle, die Wohnungseigentümergemeinschaften oder Mietobjekte professionell verwalten möchten. Fundiertes Wissen für die tägliche Verwaltungspraxis."
        targetAudience="Für angehende WEG-Verwalter, Hausverwalter und Property Manager. Auch ideal für Immobilieneigentümer, die ihre eigenen Objekte besser verwalten möchten."
        duration="80 Lerntage"
        units="528"
        goal="Du kannst Eigentümerversammlungen leiten, Wirtschaftspläne erstellen, Mietverträge rechtssicher gestalten und alle Verwaltungsaufgaben nach aktuellem WEG und Mietrecht ausführen."
        whatYouLearn={[
          "WEG 2020: Alle Neuerungen und praktische Anwendung",
          "Eigentümerversammlung: Einladung, Beschlüsse, Protokoll",
          "Wirtschaftsplan und Jahresabrechnung erstellen",
          "Mietvertrag, Kündigung, Schönheitsreparaturen",
          "Nebenkostenabrechnung Schritt für Schritt",
          "Instandhaltung, Instandsetzung, Modernisierung",
        ]}
        whatYouCanAfter={[
          "WEG-Versammlungen rechtssicher durchführen",
          "Nebenkostenabrechnungen erstellen und prüfen",
          "Mietrechtliche Konflikte einschätzen",
          "Als zertifizierter Verwalter nach §26a WEG arbeiten",
          "Eigene Immobilien professionell verwalten",
        ]}
        examRelevance="Vorbereitung auf die IHK-Sachkundeprüfung Verwalter §26a WEG. Enthält aktuelle BGH-Urteile 2023-2025 zu WEG und Mietrecht."
        legalBasis="WEG, BGB §535ff"
        difficulty="Fortgeschritten"
        onStart={() => setShowIntro(false)}
      />
    );
  }

  return <Module3Detail />;
}
</file>

<file path="client/src/pages/modules/Module2WithIntro.tsx">
import { useState } from "react";
import { ModuleIntro } from "@/components/ModuleIntro";
import Module2Detail from "./Module2Detail";

export default function Module2WithIntro() {
  const [showIntro, setShowIntro] = useState(true);

  if (showIntro) {
    return (
      <ModuleIntro
        moduleId={2}
        title="Immobilienmakler §34c GewO"
        subtitle="Vollständige Vorbereitung auf die IHK-Sachkundeprüfung §34c GewO. Von Maklerrecht über Vertragsgestaltung bis zur Bewertung — alles was du als Makler wissen musst."
        targetAudience="Für alle, die als Immobilienmakler tätig werden möchten. Ob Quereinsteiger aus dem Vertrieb, der Verwaltung oder völlig anderen Bereichen — dieses Modul führt dich sicher zur §34c-Erlaubnis."
        duration="60 Lerntage"
        units="440"
        goal="Du kennst alle rechtlichen Voraussetzungen für die Maklertätigkeit, kannst Maklerverträge korrekt gestalten, Provisionen berechnen und Immobilien marktgerecht bewerten."
        whatYouLearn={[
          "§34c GewO: Voraussetzungen und Beantragung",
          "Maklervertrag, Courtage und Provisionsrecht",
          "Immobilienbewertung: Vergleichs-, Ertrags- und Sachwertverfahren",
          "Kaufvertragsrecht und Beurkundungspflicht",
          "Energieausweis, Widerrufsrecht, Fernabsatz",
          "Geldwäschegesetz (GwG) Pflichten für Makler",
        ]}
        whatYouCanAfter={[
          "Die IHK-Sachkundeprüfung §34c ablegen",
          "Maklerverträge rechtssicher gestalten",
          "Provision korrekt berechnen und durchsetzen",
          "Immobilien mit allen 3 Verfahren bewerten",
          "Als selbständiger Immobilienmakler arbeiten",
        ]}
        examRelevance="Orientiert am IHK-Rahmenplan §34c GewO. Enthält prüfungsrelevante Übungsaufgaben mit Lösungen und Prüfungssimulation."
        legalBasis="§34c GewO"
        difficulty="Mittelstufe"
        onStart={() => setShowIntro(false)}
      />
    );
  }

  return <Module2Detail />;
}
</file>

<file path="client/src/pages/modules/Module4WithIntro.tsx">
import { useState } from "react";
import { ModuleIntro } from "@/components/ModuleIntro";
import Module4Detail from "./Module4Detail";

export default function Module4WithIntro() {
  const [showIntro, setShowIntro] = useState(true);

  if (showIntro) {
    return (
      <ModuleIntro
        moduleId={4}
        title="Gutachter & Sachverständiger"
        subtitle="Immobilienbewertung auf professionellem Niveau. Alle drei Wertermittlungsverfahren nach ImmoWertV 2021 — für Gutachter, Sachverständige und alle die Immobilien professionell bewerten wollen."
        targetAudience="Für alle, die Immobilien professionell bewerten möchten — als öffentlich bestellter Sachverständiger, für Banken, Erbschaften, Scheidungen oder eigene Investitionsentscheidungen."
        duration="40 Lerntage"
        units="264"
        goal="Du beherrschst alle drei Wertermittlungsverfahren nach ImmoWertV 2021, kannst Gutachten erstellen und Immobilienwerte für verschiedene Zwecke korrekt ermitteln."
        whatYouLearn={[
          "Vergleichswertverfahren: Kaufpreissammlungen, Indexreihen",
          "Ertragswertverfahren: Liegenschaftszins, Rohertrag, Reinertrag",
          "Sachwertverfahren: Herstellungskosten, Alterswertminderung",
          "ImmoWertV 2021: Neue Regelungen und Anwendung",
          "Bodenrichtwerte: BORIS, Gutachterausschüsse",
          "Besondere Werteinflüsse und Korrekturen",
        ]}
        whatYouCanAfter={[
          "Alle drei Verfahren selbständig anwenden",
          "Einfache Verkehrswertgutachten erstellen",
          "Immobilienwerte für Banken und Gerichte ermitteln",
          "Grundstücke und Gebäude separat bewerten",
          "Gutachterausschuss-Daten korrekt interpretieren",
        ]}
        examRelevance="Fundierte Vorbereitung auf Sachverständigentätigkeit nach ImmoWertV 2021. Alle Berechnungen mit vollständigen Lösungswegen und Berliner Marktdaten."
        legalBasis="ImmoWertV 2021"
        difficulty="Fortgeschritten"
        onStart={() => setShowIntro(false)}
      />
    );
  }

  return <Module4Detail />;
}
</file>

<file path="client/src/pages/modules/Module5WithIntro.tsx">
import { useState } from "react";
import { ModuleIntro } from "@/components/ModuleIntro";
import Module5Detail from "./Module5Detail";

export default function Module5WithIntro() {
  const [showIntro, setShowIntro] = useState(true);

  if (showIntro) {
    return (
      <ModuleIntro
        moduleId={5}
        title="Darlehensvermittler §34i GewO"
        subtitle="Vollständige Vorbereitung auf die IHK-Sachkundeprüfung §34i GewO. Immobilienfinanzierung, Kreditrecht und Verbraucherschutz — alles für die Darlehensvermittlung."
        targetAudience="Für alle, die als Immobiliendarlehensvermittler tätig werden möchten. Ideal in Kombination mit Modul 2 (Makler) für ein vollständiges Beratungsangebot."
        duration="40 Lerntage"
        units="304"
        goal="Du kennst alle Finanzierungsprodukte, kannst Finanzierungsangebote vergleichen und Kunden bei der Immobilienfinanzierung professionell beraten — rechtssicher nach §34i GewO."
        whatYouLearn={[
          "§34i GewO: Erlaubnisvoraussetzungen und Pflichten",
          "Annuitätendarlehen: Berechnung, Tilgung, Zinsbindung",
          "Bausparvertrag, KfW-Förderung, Riester-Rente",
          "EU-Wohnimmobilienkreditrichtlinie (WIKR)",
          "ESIS-Merkblatt und Beratungsdokumentation",
          "Kreditwürdigkeitsprüfung und Beleihungswert",
        ]}
        whatYouCanAfter={[
          "Die IHK-Sachkundeprüfung §34i ablegen",
          "Annuitätendarlehen vollständig berechnen",
          "Kunden bei Immobilienfinanzierung beraten",
          "KfW-Förderprogramme erklären und vermitteln",
          "Als zertifizierter Darlehensvermittler arbeiten",
        ]}
        examRelevance="Orientiert am IHK-Rahmenplan §34i GewO. Alle Rechenaufgaben mit vollständigen Lösungswegen."
        legalBasis="§34i GewO, WIKR"
        difficulty="Mittelstufe"
        onStart={() => setShowIntro(false)}
      />
    );
  }

  return <Module5Detail />;
}
</file>

<file path="client/src/pages/modules/Module2Detail.tsx">
import { trpc } from "@/lib/trpc";
import { useState, useRef, useEffect } from "react";
import { Link, useRoute } from "wouter";
import { useActivityHeartbeat } from "@/hooks/useActivityHeartbeat";
import { 
  ArrowLeft, 
  BookOpen, 
  CheckCircle2, 
  FileText, 
  Gavel,
  Briefcase,
  ChevronRight,
  Lightbulb,
  AlertTriangle,
  ArrowRight,
  Maximize2,
  Minimize2
} from "lucide-react";
import { AITutor } from "@/components/AITutor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReactMarkdown from 'react-markdown';
import { CertificateGenerator } from "@/components/CertificateGenerator";
import { YieldCalculator } from "@/components/YieldCalculator";
import { DocumentGenerator } from "@/components/DocumentGenerator";
import { ModuleQuiz } from "@/components/ModuleQuiz";
import { Quiz } from "@/components/Quiz";
import { quizQuestionsModule2 } from "@/data/quiz-questions-modul2";
import { SolutionToggler } from "@/components/SolutionToggler";
import { SmartContent } from "@/components/SmartContent";
import { FullscreenContent } from "@/components/FullscreenContent";
import { CourtCaseDisplay } from "@/components/CourtCaseDisplay";
import { courtCasesModule2 } from "@/data/rechtsprechung-modul2";
import { VideoList } from "@/components/VideoPlayer";
import { Video } from "lucide-react";

// Import Maximalist Content Parts
import { contentDataPart1Maximal } from "./Module2ContentPart1_Maximal";
import { contentDataPart2Maximal } from "./Module2ContentPart2_Maximal";
import { contentDataPart3Maximal } from "./Module2ContentPart3_Maximal";

// Merge all content parts
export const contentDataModule2 = {
  ...contentDataPart1Maximal,
  ...contentDataPart2Maximal,
  ...contentDataPart3Maximal
};

// Updated weeks structure for 60 days
const weeks = [
  {
    id: 1,
    title: "Woche 1-2: Rechtliche Grundlagen & Start",
    days: "Tag 1-10",
    topics: ["§34c GewO", "Maklerrecht", "GwG", "Verbraucherschutz"],
    dayRange: [1, 10]
  },
  {
    id: 2,
    title: "Woche 3-4: Marktanalyse & Objekt",
    days: "Tag 11-20",
    topics: ["Standortanalyse", "Immobilienarten", "Grundbuch", "Bewertung"],
    dayRange: [11, 20]
  },
  {
    id: 3,
    title: "Woche 5-6: Vertiefung Recht & Bewertung",
    days: "Tag 21-30",
    topics: ["Doppeltätigkeit", "Haftung", "Spezielle Bewertung", "Energieausweis"],
    dayRange: [21, 30]
  },
  {
    id: 4,
    title: "Woche 7-8: Marketing & Vertrieb",
    days: "Tag 31-40",
    topics: ["Exposé", "Zielgruppen", "Social Media", "Besichtigungen"],
    dayRange: [31, 40]
  },
  {
    id: 5,
    title: "Woche 9-10: Verkauf & Abschluss",
    days: "Tag 41-50",
    topics: ["Verhandlung", "Kaufvertrag", "Notar", "Übergabe"],
    dayRange: [41, 50]
  },
  {
    id: 6,
    title: "Woche 11-12: Spezialthemen & Karriere",
    days: "Tag 51-60",
    topics: ["Kapitalanlage", "Neubau", "Konflikte", "Zukunft"],
    dayRange: [51, 60]
  }
];

// Helper Component for Maximize Button

export default function Module2Detail() {
  const [match, params] = useRoute("/modul/2/tag/:day");
  const urlDay = params?.day ? `day_${params.day}` : "day_1";
  
  // Define types for content structure
  interface Task {
    question: string;
    solution: string;
  }
  
  interface ContentData {
    title: string;
    type: string;
    theory: string;
    extendedTheory?: string;
    law: string[];
    practice: string;
    // Task can be a string (old format) or an object/array (new format)
    task?: string | Task | Task[];
    solution?: string; // For string-based tasks
  }

  const [selectedDay, setSelectedDay] = useState(urlDay);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [showAITutor, setShowAITutor] = useState(false);

  // Lernfortschritt Tracking
  const logIdRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const heartbeatRef = useRef<number>(0);
  const startDayMutation = trpc.progress.startDay.useMutation();
  const completeDayByIdsMutation = trpc.progress.completeDayByIds.useMutation();

  // Tag öffnen → in DB speichern
  useEffect(() => {
    const dayNum = parseInt(selectedDay.replace('day_', ''));
    if (!dayNum) return;
    startTimeRef.current = Date.now();
    heartbeatRef.current = 0;
    startDayMutation.mutate(
      { moduleId: 2, dayId: dayNum },
      { onSuccess: (data) => { logIdRef.current = data.logId; } }
    );
    // Heartbeat alle 30 Sekunden
    const interval = setInterval(() => { heartbeatRef.current += 1; }, 30000);
    return () => clearInterval(interval);
  }, [selectedDay]);

  // Tag abschließen
  const completeCurrentDay = () => {
    const dayNum = parseInt(selectedDay.replace('day_', ''));
    const duration = Math.round((Date.now() - startTimeRef.current) / 1000);
    completeDayByIdsMutation.mutate({
      moduleId: 2,
      dayId: dayNum,
      durationSeconds: Math.max(duration, 1),
    });
  };

  const currentDayNum = parseInt(selectedDay.split('_')[1]);

  // AZAV-Anwesenheitsnachweis: Heartbeat alle 60 Sekunden
  useActivityHeartbeat({ moduleId: 2, dayId: currentDayNum });
  
  // Cast to ContentData to handle the mixed types safely
  const currentContent = contentDataModule2[selectedDay as keyof typeof contentDataModule2] as unknown as ContentData;

  // Mock completion status for demo
  const isLastDay = currentDayNum === 60;
  
  // Check if we should show the calculator (Investment topics)
  const showCalculator = [19, 42, 49].includes(currentDayNum);

  // Check if we should show the document generator (Contract topics)
  const showDocGenerator = [7, 34, 45].includes(currentDayNum);
  const docType = currentDayNum === 7 ? "maklervertrag" : currentDayNum === 34 ? "widerrufsbelehrung" : "reservierung";
  const docTitle = currentDayNum === 7 ? "Maklervertrag erstellen" : currentDayNum === 34 ? "Widerrufsbelehrung generieren" : "Reservierungsvereinbarung";

  // Function to handle navigation to next day
  const handleNextDay = () => {
    if (currentDayNum < 60) {
      const nextDay = `day_${currentDayNum + 1}`;
      setSelectedDay(nextDay);
      window.scrollTo(0,0);
    }
  };

  // Fallback if content is missing
  if (!currentContent) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-red-600">Inhalt nicht gefunden</h2>
        <p>Der Inhalt für Tag {currentDayNum} konnte nicht geladen werden.</p>
        <Button className="mt-4" onClick={() => setSelectedDay("day_1")}>Zurück zu Tag 1</Button>
      </div>
    );
  }

  // Helper to normalize task(s) to array of Task objects
  const getTasks = (): Task[] => {
    if (!currentContent.task) return [];
    
    // Case 1: Array of Task objects
    if (Array.isArray(currentContent.task)) {
      return currentContent.task;
    }
    
    // Case 2: Single Task object
    if (typeof currentContent.task === 'object') {
      return [currentContent.task as Task];
    }
    
    // Case 3: String task (legacy format)
    if (typeof currentContent.task === 'string') {
      return [{
        question: currentContent.task,
        solution: currentContent.solution || "Keine Lösung verfügbar."
      }];
    }
    
    return [];
  };

  const tasks = getTasks();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Link href="/">
<div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer hover:bg-accent hover:text-accent-foreground h-10 w-10">
              <ArrowLeft className="h-6 w-6" />
            </div>
</Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Modul 2: Makler §34c</h1>
            <div className="flex items-center gap-2 text-slate-500 mt-1">
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                Basiskurs
              </Badge>
              <span className="text-sm">•</span>
              <span className="text-sm">480 Unterrichtseinheiten</span>
              <span className="text-sm">•</span>
              <span className="text-sm">60 Tage</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
          <div className="text-right hidden md:block">
            <div className="text-sm font-medium text-slate-900">Fortschritt</div>
            <div className="text-xs text-slate-500">Tag {currentDayNum} von 60</div>
          </div>
          <Progress value={(currentDayNum / 60) * 100} className="w-32 h-2" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-3">
          <Card className="h-[calc(100vh-200px)] border-slate-200 shadow-sm flex flex-col">
            <CardHeader className="pb-3 border-b bg-slate-50/50">
              <CardTitle className="text-lg">Lernplan</CardTitle>
              <CardDescription>Wählen Sie einen Tag</CardDescription>
            </CardHeader>
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-3 space-y-4">
                  {weeks.map((week) => (
                    <div key={week.id} className="space-y-2">
                      <div className="px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider flex justify-between items-center">
                        {week.title}
                      </div>
                      <div className="space-y-1">
                        {Array.from({ length: week.dayRange[1] - week.dayRange[0] + 1 }, (_, i) => {
                          const dayNum = week.dayRange[0] + i;
                          const dayKey = `day_${dayNum}`;
                          const dayData = contentDataModule2[dayKey as keyof typeof contentDataModule2];
                          const isActive = selectedDay === dayKey;
                          
                          if (!dayData) return null;
                          
                          return (
                            <Button
                              key={dayNum}
                              variant={isActive ? "secondary" : "ghost"}
                              className={`w-full justify-start text-left h-auto py-2.5 px-3 ${
                                isActive 
                                  ? "bg-blue-50 text-blue-700 border border-blue-100" 
                                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                              }`}
                              onClick={() => {
                                setSelectedDay(dayKey);
                                window.scrollTo(0,0);
                              }}
                            >
                              <div className="flex items-center gap-3 w-full">
                                <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                  isActive 
                                    ? "bg-blue-600 text-white" 
                                    : "bg-slate-200 text-slate-600"
                                }`}>
                                  {dayNum}
                                </div>
                                <div className="overflow-hidden flex-1">
                                  <p className="font-medium truncate text-sm">
                                    {dayData.title}
                                  </p>
                                </div>
                                {isActive && <ChevronRight className="h-4 w-4 text-blue-500" />}
                              </div>
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </Card>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-9">
          <Card className="min-h-[calc(100vh-200px)] border-slate-200 shadow-sm flex flex-col">
            <CardHeader className="border-b bg-slate-50/50 py-5">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex gap-2 mb-2">
                    <Badge variant="outline" className="bg-white text-slate-600 border-slate-200">
                      {currentContent.type}
                    </Badge>
                    {showCalculator && (
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                        <Lightbulb className="w-3 h-3 mr-1" /> Interaktiv
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-2xl text-slate-900">{currentContent.title}</CardTitle>
                </div>
                {isLastDay && (
                   <div className="flex gap-2">
                     <CertificateGenerator 
                       moduleName="Modul 2: Makler §34c"
                       userName="Teilnehmer"
                       completionDate={new Date().toLocaleDateString()}
                       isCompleted={true} // Mocked for now
                     />
                   </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-6 flex-1">
              <Tabs defaultValue="theory" className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-8 bg-slate-100 p-1 rounded-xl">
                  <TabsTrigger value="theory" className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm rounded-lg">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Theorie
                  </TabsTrigger>
                  <TabsTrigger value="law" className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm rounded-lg">
                    <Gavel className="h-4 w-4 mr-2" />
                    Normen
                  </TabsTrigger>
                  <TabsTrigger value="practice" className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm rounded-lg">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Praxis
                  </TabsTrigger>
                  <TabsTrigger value="task" className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm rounded-lg">
                    <FileText className="h-4 w-4 mr-2" />
                    Aufgaben
                  </TabsTrigger>
                                      <TabsTrigger value="videos" className="data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-sm rounded-lg">
                      <Video className="h-4 w-4 mr-2" />
                      Videos
                    </TabsTrigger>

                </TabsList>

                <TabsContent value="theory" className="mt-0 space-y-6 animate-in fade-in-50 focus-visible:outline-none relative group">
                  <FullscreenContent content={<SmartContent content={currentContent.theory} />} title={`Theorie: ${currentContent.title}`} />
                  <div className="content-container prose prose-slate max-w-none prose-headings:text-slate-900 prose-a:text-blue-600 prose-strong:text-slate-900">
                    <SmartContent content={currentContent.theory} />
                    {currentContent.extendedTheory && (
                      <div className="mt-8 pt-8 border-t border-slate-200">
                        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                          <Lightbulb className="h-5 w-5 text-amber-500" />
                          Vertiefungswissen
                        </h3>
                        <SmartContent content={currentContent.extendedTheory} />
                      </div>
                    )}
                  </div>
                  
                  {/* Interactive Tools Injection */}
                  {showCalculator && (
                    <div className="mt-8 border rounded-xl overflow-hidden shadow-sm">
                      <div className="bg-emerald-50 p-4 border-b border-emerald-100 flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-emerald-600" />
                        <h3 className="font-semibold text-emerald-900">Interaktiver Rendite-Rechner</h3>
                      </div>
                      <div className="p-6 bg-white">
                        <YieldCalculator />
                      </div>
                    </div>
                  )}

                  {showDocGenerator && (
                    <div className="mt-8 border rounded-xl overflow-hidden shadow-sm">
                      <div className="bg-blue-50 p-4 border-b border-blue-100 flex items-center gap-2">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <h3 className="font-semibold text-blue-900">Dokumenten-Generator</h3>
                      </div>
                      <div className="p-6 bg-white">
                         <DocumentGenerator 
                           title={docTitle}
                           content={`Musterinhalt für ${docTitle}...`}
                           description="Erstellen Sie hier Ihr rechtssicheres Dokument."
                           templateType={docType as any}
                         />
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="law" className="mt-0 space-y-6 animate-in fade-in-50 focus-visible:outline-none relative group">
                  <FullscreenContent 
                    title={`Rechtliche Grundlagen: ${currentContent.title}`}
                    content={
                      <div className="grid gap-4">
                        {currentContent.law.map((law, index) => (
                          <Card key={index} className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="p-4 flex items-start gap-3">
                              <Gavel className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                              <div className="prose prose-sm max-w-none">
                                <SmartContent content={law} />
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    } 
                  />
                  <div className="content-container grid gap-4">
                    {currentContent.law.map((law, index) => (
                      <Card key={index} className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-4 flex items-start gap-3">
                          <Gavel className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                          <div className="prose prose-sm max-w-none">
                            <SmartContent content={law} />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="practice" className="mt-0 space-y-6 animate-in fade-in-50 focus-visible:outline-none relative group">
                  <FullscreenContent content={<SmartContent content={currentContent.practice} />} title={`Praxis-Analyse: ${currentContent.title}`} />
                  <Card className="bg-emerald-50/50 border-emerald-100 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-emerald-800 flex items-center gap-2">
                        <Briefcase className="h-5 w-5" />
                        Praxis-Transfer
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="content-container prose prose-emerald max-w-none">
                        <SmartContent content={currentContent.practice} />
                      </div>
                    </CardContent>
                  </Card>

                  {/* BGH Court Cases Section */}
                  <Card className="bg-blue-50/50 border-blue-200 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-blue-900 flex items-center gap-2">
                        <Gavel className="h-5 w-5" />
                        Rechtsprechung: BGH-Urteile zu Maklerprovision
                      </CardTitle>
                      <CardDescription>
                        Aktuelle Bundesgerichtshof-Entscheidungen mit direkter Praxisrelevanz für Immobilienmakler
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {courtCasesModule2.map((courtCase) => (
                        <CourtCaseDisplay key={courtCase.id} courtCase={courtCase} />
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="task" className="mt-0 space-y-6 animate-in fade-in-50 focus-visible:outline-none relative group">
                   <FullscreenContent 
                     title={`Aufgaben & Lösungen: ${currentContent.title}`}
                     content={
                       <div className="space-y-6">
                         {tasks.map((task, index) => (
                           <Card key={index} className="border-slate-200 shadow-sm">
                             <CardHeader className="bg-slate-50 pb-3">
                               <CardTitle className="text-base font-medium flex gap-2">
                                 <span className="bg-slate-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">
                                   {index + 1}
                                 </span>
                                 {task.question}
                               </CardTitle>
                             </CardHeader>
                             <CardContent className="pt-4">
                               <SolutionToggler solution={task.solution} />
                             </CardContent>
                           </Card>
                         ))}
                         
                         {currentDayNum === 60 && (
                           <div className="mt-8 pt-8 border-t">
                             <h3 className="text-lg font-bold mb-4">Abschlussprüfung Modul 2</h3>
                             <ModuleQuiz 
                               questions={quizQuestionsModule2} 
                               onComplete={(score) => {
                                 if (score >= 80) setIsQuizCompleted(true);
                               }}
                               moduleTitle="Modul 2: Makler §34c"
                             />
                           </div>
                         )}
                       </div>
                     } 
                   />
                  <div className="content-container space-y-6">
                    {tasks.map((task, index) => (
                      <Card key={index} className="border-slate-200 shadow-sm">
                        <CardHeader className="bg-slate-50 pb-3">
                          <CardTitle className="text-base font-medium flex gap-2">
                            <span className="bg-slate-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">
                              {index + 1}
                            </span>
                            {task.question}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <SolutionToggler solution={task.solution} />
                        </CardContent>
                      </Card>
                    ))}
                    
                    {currentDayNum === 60 && (
                      <div className="mt-8 pt-8 border-t">
                        <h3 className="text-lg font-bold mb-4">Abschlussprüfung Modul 2</h3>
                        <ModuleQuiz 
                          questions={quizQuestionsModule2} 
                          onComplete={(score) => {
                            if (score >= 80) setIsQuizCompleted(true);
                          }}
                          moduleTitle="Modul 2: Makler §34c"
                        />
                      </div>
                    )}
                  </div>
                </TabsContent>
                                  <TabsContent value="videos" className="mt-0 space-y-6 animate-in fade-in-50 focus-visible:outline-none">
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Video className="h-6 w-6 text-purple-600" />
                        <h3 className="text-xl font-bold text-slate-900">Video-Tutorials</h3>
                      </div>
                      <p className="text-slate-600 mb-6">
                        Vertiefen Sie Ihr Wissen mit professionellen Video-Tutorials. 
                        Ihr Fortschritt wird automatisch gespeichert.
                      </p>
                      <VideoList moduleId={2} dayNumber={currentDayNum} />
                    </div>
                  </TabsContent>


              </Tabs>

              {currentDayNum < 60 && (
                <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
                  <Button onClick={handleNextDay} className="group bg-blue-600 hover:bg-blue-700 text-white">
                    Nächster Tag: {contentDataModule2[`day_${currentDayNum + 1}` as keyof typeof contentDataModule2]?.title}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <AITutor
      isOpen={showAITutor}
      onClose={() => setShowAITutor(false)}
      moduleId={2}
      moduleContext={"Modul 2"}
    />
</div>
  );
}
</file>

<file path="client/src/pages/modules/Module3Detail.tsx">
import { trpc } from "@/lib/trpc";
import { useState, useRef, useEffect } from "react";
import { useActivityHeartbeat } from "@/hooks/useActivityHeartbeat";
import { Link, useRoute } from "wouter";
import { 
  ArrowLeft, 
  BookOpen, 
  CheckCircle2, 
  FileText, 
  Gavel,
  Briefcase,
  ChevronRight,
  Lightbulb,
  AlertTriangle,
  ArrowRight,
  Maximize2,
  Minimize2
} from "lucide-react";
import { AITutor } from "@/components/AITutor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReactMarkdown from 'react-markdown';
import { CertificateGenerator } from "@/components/CertificateGenerator";
import { DocumentGenerator } from "@/components/DocumentGenerator";
import { ModuleQuiz } from "@/components/ModuleQuiz";
import { Quiz } from "@/components/Quiz";
import { quizQuestionsModule3 } from "@/data/quiz-questions-modul3";
import { SolutionToggler } from "@/components/SolutionToggler";
import { SmartContent } from "@/components/SmartContent";
import { FullscreenContent } from "@/components/FullscreenContent";
import { CourtCaseDisplay } from "@/components/CourtCaseDisplay";
import { courtCasesModule3 } from "@/data/rechtsprechung-modul3";
import { VideoList } from "@/components/VideoPlayer";
import { Video } from "lucide-react";

// Import Content Parts
import { contentDataModule3Maximal as contentDataModule3MaximalPart1 } from "./Module3Content_Maximal";
import { contentDataModule3MaximalPart2 } from "./Module3Content_Maximal_Part2";
import { contentDataModule3MaximalPart2Extended } from "./Module3Content_Maximal_Part2_Extended";
import { contentDataModule3MaximalPart3 } from "./Module3Content_Maximal_Part3";
import { contentDataModule3MaximalPart3Extended } from "./Module3Content_Maximal_Part3_Extended";
import { contentDataModule3MaximalPart4 } from "./Module3Content_Maximal_Part4";
import { contentDataModule3MaximalMissingDays } from "./Module3Content_Maximal_MissingDays";

// Merge all content parts
export const contentDataModule3 = {
  ...contentDataModule3MaximalPart1,
  ...contentDataModule3MaximalMissingDays,
  ...contentDataModule3MaximalPart2,
  ...contentDataModule3MaximalPart2Extended,
  ...contentDataModule3MaximalPart3,
  ...contentDataModule3MaximalPart3Extended,
  ...contentDataModule3MaximalPart4
};

// Updated weeks structure for 80 days
const weeks = [
  {
    id: 1,
    title: "Woche 1-4: Grundlagen WEG",
    days: "Tag 1-20",
    topics: ["WEG-Recht", "Eigentümerversammlung", "Verwaltervertrag", "Gemeinschaftseigentum"],
    dayRange: [1, 20]
  },
  {
    id: 2,
    title: "Woche 5-8: Mietverwaltung",
    days: "Tag 21-40",
    topics: ["Mietrecht", "Betriebskosten", "Mieterhöhung", "Kündigung"],
    dayRange: [21, 40]
  },
  {
    id: 3,
    title: "Woche 9-12: Technik & Praxis",
    days: "Tag 41-60",
    topics: ["Instandhaltung", "Modernisierung", "Verkehrssicherung", "Versicherungen"],
    dayRange: [41, 60]
  },
  {
    id: 4,
    title: "Woche 13-16: Management & Konflikte",
    days: "Tag 61-80",
    topics: ["Konfliktmanagement", "Eigentümerversammlung", "Buchhaltung", "Prüfungsvorbereitung"],
    dayRange: [61, 80]
  }
];

export default function Module3Detail() {
  const [match, params] = useRoute("/modul/3/tag/:day");
  const urlDay = params?.day ? `day_${params.day}` : "day_1";
  
  // Define types for content structure
  interface Task {
    question: string;
    solution: string;
  }
  
  interface ContentData {
    title: string;
    type: string;
    theory: string;
    extendedTheory?: string;
    law: string[];
    practice: string;
    caseStudy?: string;
    // Task can be a string (old format) or an object/array (new format)
    task?: string | Task | Task[];
    solution?: string; // For string-based tasks
  }

  const [selectedDay, setSelectedDay] = useState(urlDay);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [showAITutor, setShowAITutor] = useState(false);

  // Lernfortschritt Tracking
  const logIdRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const heartbeatRef = useRef<number>(0);
  const startDayMutation = trpc.progress.startDay.useMutation();
  const completeDayByIdsMutation = trpc.progress.completeDayByIds.useMutation();

  // Tag öffnen → in DB speichern
  useEffect(() => {
    const dayNum = parseInt(selectedDay.replace('day_', ''));
    if (!dayNum) return;
    startTimeRef.current = Date.now();
    heartbeatRef.current = 0;
    startDayMutation.mutate(
      { moduleId: 3, dayId: dayNum },
      { onSuccess: (data) => { logIdRef.current = data.logId; } }
    );
    // Heartbeat alle 30 Sekunden
    const interval = setInterval(() => { heartbeatRef.current += 1; }, 30000);
    return () => clearInterval(interval);
  }, [selectedDay]);

  // Tag abschließen
  const completeCurrentDay = () => {
    const dayNum = parseInt(selectedDay.replace('day_', ''));
    const duration = Math.round((Date.now() - startTimeRef.current) / 1000);
    completeDayByIdsMutation.mutate({
      moduleId: 3,
      dayId: dayNum,
      durationSeconds: Math.max(duration, 1),
    });
  };

  const currentDayNum = parseInt(selectedDay.split('_')[1]);

  // AZAV-Anwesenheitsnachweis: Heartbeat alle 60 Sekunden
  useActivityHeartbeat({ moduleId: 3, dayId: currentDayNum });
  
  // Cast to ContentData to handle the mixed types safely
  const currentContent = contentDataModule3[selectedDay as keyof typeof contentDataModule3] as unknown as ContentData;

  // Mock completion status for demo
  const isLastDay = currentDayNum === 80;
  
  // Check if we should show the document generator (Contract topics)
  const showDocGenerator = [4, 14, 28].includes(currentDayNum);
  const docType = currentDayNum === 4 ? "verwaltervertrag" : currentDayNum === 14 ? "mietvertrag" : "kuendigungsschreiben";
  const docTitle = currentDayNum === 4 ? "Verwaltervertrag erstellen" : currentDayNum === 14 ? "Mietvertrag generieren" : "Kündigungsschreiben";

  // Function to handle navigation to next day
  const handleNextDay = () => {
    if (currentDayNum < 80) {
      const nextDay = `day_${currentDayNum + 1}`;
      setSelectedDay(nextDay);
      window.scrollTo(0,0);
    }
  };

  // Fallback if content is missing
  if (!currentContent) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-red-600">Inhalt nicht gefunden</h2>
        <p>Der Inhalt für Tag {currentDayNum} konnte nicht geladen werden.</p>
        <Button className="mt-4" onClick={() => setSelectedDay("day_1")}>Zurück zu Tag 1</Button>
      </div>
    );
  }

  // Helper to normalize task(s) to array of Task objects
  const getTasks = (): Task[] => {
    if (!currentContent.task) return [];
    
    // Case 1: Array of Task objects
    if (Array.isArray(currentContent.task)) {
      return currentContent.task;
    }
    
    // Case 2: Single Task object
    if (typeof currentContent.task === 'object') {
      return [currentContent.task as Task];
    }
    
    // Case 3: String task (legacy format)
    if (typeof currentContent.task === 'string') {
      return [{
        question: currentContent.task,
        solution: currentContent.solution || "Keine Lösung verfügbar."
      }];
    }
    
    return [];
  };

  const tasks = getTasks();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Link href="/">
<div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer hover:bg-accent hover:text-accent-foreground h-10 w-10">
              <ArrowLeft className="h-6 w-6" />
            </div>
</Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Modul 3: Immobilienverwaltung</h1>
            <div className="flex items-center gap-2 text-slate-500 mt-1">
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                Verwaltung & WEG
              </Badge>
              <span className="text-sm">•</span>
              <span className="text-sm">640 Unterrichtseinheiten</span>
              <span className="text-sm">•</span>
              <span className="text-sm">80 Tage</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
          <div className="text-right hidden md:block">
            <div className="text-sm font-medium text-slate-900">Fortschritt</div>
            <div className="text-xs text-slate-500">Tag {currentDayNum} von 80</div>
          </div>
          <Progress value={(currentDayNum / 80) * 100} className="w-32 h-2" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-3">
          <Card className="h-[calc(100vh-200px)] border-slate-200 shadow-sm flex flex-col">
            <CardHeader className="pb-3 border-b bg-slate-50/50">
              <CardTitle className="text-lg">Lernplan</CardTitle>
              <CardDescription>Wählen Sie einen Tag</CardDescription>
            </CardHeader>
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-3 space-y-4">
                  {weeks.map((week) => (
                    <div key={week.id} className="space-y-2">
                      <div className="px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider flex justify-between items-center">
                        {week.title}
                      </div>
                      <div className="space-y-1">
                        {Array.from({ length: week.dayRange[1] - week.dayRange[0] + 1 }, (_, i) => {
                          const dayNum = week.dayRange[0] + i;
                          const dayKey = `day_${dayNum}`;
                          const dayData = contentDataModule3[dayKey as keyof typeof contentDataModule3];
                          const isActive = selectedDay === dayKey;
                          
                          if (!dayData) return null;
                          
                          return (
                            <Button
                              key={dayNum}
                              variant={isActive ? "secondary" : "ghost"}
                              className={`w-full justify-start text-left h-auto py-2.5 px-3 ${
                                isActive 
                                  ? "bg-blue-50 text-blue-700 border border-blue-100" 
                                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                              }`}
                              onClick={() => {
                                setSelectedDay(dayKey);
                                window.scrollTo(0,0);
                              }}
                            >
                              <div className="flex items-center gap-3 w-full">
                                <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                  isActive 
                                    ? "bg-blue-600 text-white" 
                                    : "bg-slate-200 text-slate-600"
                                }`}>
                                  {dayNum}
                                </div>
                                <div className="overflow-hidden flex-1">
                                  <p className="font-medium truncate text-sm">
                                    {dayData.title}
                                  </p>
                                </div>
                              </div>
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </Card>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-9">
          <Card className="min-h-[calc(100vh-200px)] border-slate-200 shadow-sm flex flex-col">
            <CardHeader className="border-b bg-slate-50/50 py-5">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex gap-2 mb-2">
                    <Badge variant="outline" className="bg-white text-slate-600 border-slate-200">
                      {currentContent.type}
                    </Badge>
                    {showDocGenerator && (
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                        <Lightbulb className="w-3 h-3 mr-1" /> Interaktiv
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-2xl text-slate-900">{currentContent.title}</CardTitle>
                </div>
                {isLastDay && (
                   <div className="flex gap-2">
                     <CertificateGenerator 
                       moduleName="Modul 3: Immobilienverwaltung"
                       userName="Teilnehmer"
                       completionDate={new Date().toLocaleDateString()}
                       isCompleted={true} // Mocked for now
                     />
                   </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-6 flex-1">
              <Tabs defaultValue="theory" className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-8 bg-slate-100 p-1 rounded-xl">
                  <TabsTrigger value="theory" className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm rounded-lg">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Theorie
                  </TabsTrigger>
                  <TabsTrigger value="law" className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm rounded-lg">
                    <Gavel className="h-4 w-4 mr-2" />
                    Normen
                  </TabsTrigger>
                  <TabsTrigger value="practice" className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm rounded-lg">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Praxis
                  </TabsTrigger>
                  <TabsTrigger value="task" className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm rounded-lg">
                                      <TabsTrigger value="videos" className="data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-sm rounded-lg">
                      <Video className="h-4 w-4 mr-2" />
                      Videos
                    </TabsTrigger>

                    <FileText className="h-4 w-4 mr-2" />
                    Aufgaben
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="theory" className="mt-0 space-y-6 animate-in fade-in-50 focus-visible:outline-none relative group">
                  <FullscreenContent content={<SmartContent content={currentContent.theory} />} title={`Theorie: ${currentContent.title}`} />
                  <div className="content-container prose prose-slate max-w-none prose-headings:text-slate-900 prose-a:text-blue-600 prose-strong:text-slate-900">
                    <SmartContent content={currentContent.theory} />
                    {currentContent.extendedTheory && (
                      <div className="mt-8 pt-8 border-t border-slate-200">
                        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                          <Lightbulb className="h-5 w-5 text-amber-500" />
                          Vertiefungswissen
                        </h3>
                        <SmartContent content={currentContent.extendedTheory} />
                      </div>
                    )}
                  </div>
                  
                  {/* Interactive Tools Injection */}
                  {showDocGenerator && (
                    <div className="mt-8 border rounded-xl overflow-hidden shadow-sm">
                      <div className="bg-blue-50 p-4 border-b border-blue-100 flex items-center gap-2">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <h3 className="font-semibold text-blue-900">Dokumenten-Generator</h3>
                      </div>
                      <div className="p-6 bg-white">
                         <DocumentGenerator 
                           title={docTitle}
                           content={`Musterinhalt für ${docTitle}...`}
                           description="Erstellen Sie hier Ihr rechtssicheres Dokument."
                           templateType={docType as any}
                         />
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="law" className="mt-0 space-y-6 animate-in fade-in-50 focus-visible:outline-none relative group">
                  <FullscreenContent 
                    title={`Rechtliche Grundlagen: ${currentContent.title}`}
                    content={
                      <div className="grid gap-4">
                        {currentContent.law.map((law, index) => (
                          <Card key={index} className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="p-4 flex items-start gap-3">
                              <Gavel className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                              <div className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-a:text-blue-600 prose-strong:text-slate-900">
                                <SmartContent content={law} />
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    } 
                  />
                  <div className="content-container grid gap-4">
                    {currentContent.law.map((law, index) => (
                      <Card key={index} className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-4 flex items-start gap-3">
                          <Gavel className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                          <div className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-a:text-blue-600 prose-strong:text-slate-900">
                            <SmartContent content={law} />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="practice" className="mt-0 space-y-6 animate-in fade-in-50 focus-visible:outline-none relative group">
                  <FullscreenContent content={<SmartContent content={currentContent.practice} />} title={`Praxis-Analyse: ${currentContent.title}`} />
                  <Card className="bg-emerald-50/50 border-emerald-100 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-emerald-800 flex items-center gap-2">
                        <Briefcase className="h-5 w-5" />
                        Praxis-Transfer
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="content-container prose prose-emerald max-w-none">
                        <SmartContent content={currentContent.practice} />
                      </div>
                    </CardContent>
                  </Card>

                  {currentContent.caseStudy && (
                    <Card className="bg-blue-50/50 border-blue-200 shadow-sm">
                      <CardHeader>
                        <CardTitle className="text-blue-900 flex items-center gap-2">
                          <Gavel className="h-5 w-5" />
                          Fallstudie
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="content-container prose prose-blue max-w-none">
                          <SmartContent content={currentContent.caseStudy} />
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Court Cases Section */}
                  <Card className="bg-blue-50/50 border-blue-200 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-blue-900 flex items-center gap-2">
                        <Gavel className="h-5 w-5" />
                        Rechtsprechung: BGH-Urteile zur Immobilienverwaltung
                      </CardTitle>
                      <CardDescription>
                        Aktuelle Bundesgerichtshof-Entscheidungen mit direkter Praxisrelevanz für Immobilienverwalter
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {courtCasesModule3.map((courtCase) => (
                        <CourtCaseDisplay key={courtCase.id} courtCase={courtCase} />
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="task" className="mt-0 space-y-6 animate-in fade-in-50 focus-visible:outline-none relative group">
                   <FullscreenContent 
                     title={`Aufgaben & Lösungen: ${currentContent.title}`}
                     content={
                       <div className="space-y-6">
                         {tasks.map((task, index) => (
                           <Card key={index} className="border-slate-200 shadow-sm">
                             <CardHeader className="bg-slate-50 pb-3">
                               <CardTitle className="text-base font-medium flex gap-2">
                                 <span className="bg-slate-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">
                                   {index + 1}
                                 </span>
                                 {task.question}
                               </CardTitle>
                             </CardHeader>
                             <CardContent className="pt-4">
                               <SolutionToggler solution={task.solution} />
                             </CardContent>
                           </Card>
                         ))}
                         
                         {currentDayNum === 80 && (
                           <div className="mt-8 pt-8 border-t">
                             <h3 className="text-lg font-bold mb-4">Abschlussprüfung Modul 3</h3>
                             <ModuleQuiz 
                               questions={quizQuestionsModule3} 
                               onComplete={(score) => {
                                 if (score >= 80) setIsQuizCompleted(true);
                               }}
                               moduleTitle="Modul 3: Immobilienverwaltung"
                             />
                           </div>
                         )}
                       </div>
                     } 
                   />
                  <div className="content-container space-y-6">
                    {tasks.map((task, index) => (
                      <Card key={index} className="border-slate-200 shadow-sm">
                        <CardHeader className="bg-slate-50 pb-3">
                          <CardTitle className="text-base font-medium flex gap-2">
                            <span className="bg-slate-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">
                              {index + 1}
                            </span>
                            {task.question}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <SolutionToggler solution={task.solution} />
                        </CardContent>
                      </Card>
                    ))}
                    
                    {currentDayNum === 80 && (
                      <div className="mt-8 pt-8 border-t">
                        <h3 className="text-lg font-bold mb-4">Abschlussprüfung Modul 3</h3>
                        <ModuleQuiz 
                          questions={quizQuestionsModule3} 
                          onComplete={(score) => {
                            if (score >= 80) setIsQuizCompleted(true);
                          }}
                          moduleTitle="Modul 3: Immobilienverwaltung"
                        />
                      </div>
                    )}
                  </div>
                </TabsContent>
                                                <TabsContent value="videos" className="mt-0 space-y-6 animate-in fade-in-50 focus-visible:outline-none">
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Video className="h-6 w-6 text-purple-600" />
                        <h3 className="text-xl font-bold text-slate-900">Video-Tutorials</h3>
                      </div>
                      <p className="text-slate-600 mb-6">
                        Vertiefen Sie Ihr Wissen mit professionellen Video-Tutorials. 
                        Ihr Fortschritt wird automatisch gespeichert.
                      </p>
                      <VideoList moduleId={3} dayNumber={currentDayNum} />
                    </div>
                  </TabsContent>


              </Tabs>

              {currentDayNum < 80 && (
                <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
                  <Button onClick={handleNextDay} className="group bg-blue-600 hover:bg-blue-700 text-white">
                    Nächster Tag: {contentDataModule3[`day_${currentDayNum + 1}` as keyof typeof contentDataModule3]?.title}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <AITutor
      isOpen={showAITutor}
      onClose={() => setShowAITutor(false)}
      moduleId={3}
      moduleContext={"Modul 3"}
    />
</div>
  );
}
</file>

<file path="client/src/pages/modules/Module4Detail.tsx">
import { trpc } from "@/lib/trpc";
import { useState, useRef, useEffect } from "react";
import { useActivityHeartbeat } from "@/hooks/useActivityHeartbeat";
import { Link, useRoute } from "wouter";
import { 
  ArrowLeft, 
  BookOpen, 
  CheckCircle2, 
  FileText, 
  Gavel,
  Briefcase,
  ChevronRight,
  Calculator,
  Search,
  Scale,
  Lightbulb,
  AlertTriangle,
  Award,
  ArrowRight,
  Maximize2,
  Minimize2
} from "lucide-react";
import { AITutor } from "@/components/AITutor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReactMarkdown from 'react-markdown';
import { SolutionToggler } from "@/components/SolutionToggler";
import { ModuleQuiz } from "@/components/ModuleQuiz";
import { Quiz } from "@/components/Quiz";
import { CertificateGenerator } from "@/components/CertificateGenerator";
import { useToast } from "@/hooks/use-toast";
import { SmartContent } from "@/components/SmartContent";
import { FullscreenContent } from "@/components/FullscreenContent";
import { CourtCaseDisplay } from "@/components/CourtCaseDisplay";
import { courtCasesModule4 } from "@/data/rechtsprechung-modul4";

// Import Content
import { contentDataModule4Maximalist } from "./Module4Content_Valuation_Maximalist";
import { contentDataModule4MaximalistPart2 } from "./Module4Content_Valuation_Maximalist_Part2";
import { quizQuestionsModule4 } from "@/data/quiz-questions-modul4";
import { VideoList } from "@/components/VideoPlayer";
import { Video } from "lucide-react";

// Merge content parts
const allContent = {
  ...contentDataModule4Maximalist,
  ...contentDataModule4MaximalistPart2
};

// Define weeks structure for Module 4 (20 Days)
const weeks = [
  {
    id: 1,
    title: "Woche 1: Grundlagen & Sachwert",
    days: "Tag 1-5",
    topics: ["Wertermittlungsverordnung", "Sachwertverfahren", "Bodenrichtwert", "Normalherstellungskosten"],
    dayRange: [1, 5]
  },
  {
    id: 2,
    title: "Woche 2: Ertragswert & Vergleichswert",
    days: "Tag 6-10",
    topics: ["Ertragswertverfahren", "Liegenschaftszins", "Vergleichswertverfahren", "Marktanpassung"],
    dayRange: [6, 10]
  },
  {
    id: 3,
    title: "Woche 3: Gutachten & Sonderfälle",
    days: "Tag 11-15",
    topics: ["Gutachtenerstellung", "Rechte & Belastungen", "Wohnungsrecht", "Erbbaurecht"],
    dayRange: [11, 15]
  },
  {
    id: 4,
    title: "Woche 4: Sachverständigenwesen",
    days: "Tag 16-20",
    topics: ["Haftung", "Honorar", "Gerichtsgutachten", "Abschlussprüfung"],
    dayRange: [16, 20]
  }
];

// Helper Component for Maximize Button

export default function Module4Detail() {
  const [match, params] = useRoute("/modul/4/tag/:day");
  const { toast } = useToast();
  const urlDay = params?.day ? `day_${params.day}` : "day_1";
  
  // Define types for content structure
  interface Task {
    question: string;
    solution: string;
  }
  
  interface ContentData {
    title: string;
    type: string;
    theory: string;
    law: string[];
    practice: string;
    tasks: Task[];
  }

  const [selectedDay, setSelectedDay] = useState(urlDay);
  const [showAITutor, setShowAITutor] = useState(false);

  // Lernfortschritt Tracking
  const logIdRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const heartbeatRef = useRef<number>(0);
  const startDayMutation = trpc.progress.startDay.useMutation();
  const completeDayByIdsMutation = trpc.progress.completeDayByIds.useMutation();

  // Tag öffnen → in DB speichern
  useEffect(() => {
    const dayNum = parseInt(selectedDay.replace('day_', ''));
    if (!dayNum) return;
    startTimeRef.current = Date.now();
    heartbeatRef.current = 0;
    startDayMutation.mutate(
      { moduleId: 4, dayId: dayNum },
      { onSuccess: (data) => { logIdRef.current = data.logId; } }
    );
    // Heartbeat alle 30 Sekunden
    const interval = setInterval(() => { heartbeatRef.current += 1; }, 30000);
    return () => clearInterval(interval);
  }, [selectedDay]);

  // Tag abschließen
  const completeCurrentDay = () => {
    const dayNum = parseInt(selectedDay.replace('day_', ''));
    const duration = Math.round((Date.now() - startTimeRef.current) / 1000);
    completeDayByIdsMutation.mutate({
      moduleId: 4,
      dayId: dayNum,
      durationSeconds: Math.max(duration, 1),
    });
  };

  const [showQuiz, setShowQuiz] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const currentDayNum = parseInt(selectedDay.split('_')[1]);

  // AZAV-Anwesenheitsnachweis: Heartbeat alle 60 Sekunden
  useActivityHeartbeat({ moduleId: 4, dayId: currentDayNum });
  
  // Get content for selected day
  const currentContent = allContent[selectedDay as keyof typeof allContent] || allContent.day_1;

  const handleQuizComplete = (score: number) => {
    if (score >= 50) {
      setShowQuiz(false);
      setShowCertificate(true);
      toast({
        title: "Herzlichen Glückwunsch!",
        description: "Sie haben das Modul erfolgreich abgeschlossen.",
      });
    }
  };

  // Function to handle navigation to next day
  const handleNextDay = () => {
    if (currentDayNum < 20) {
      const nextDay = `day_${currentDayNum + 1}`;
      setSelectedDay(nextDay);
      setShowQuiz(false);
      setShowCertificate(false);
      window.scrollTo(0,0);
    } else {
      // Last day: Show quiz
      setShowQuiz(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Link href="/">
            <div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
              <ArrowLeft className="h-6 w-6" />
            </div>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Modul 4: Gutachten & Sachverständiger</h1>
            <div className="flex items-center gap-2 text-slate-500 mt-1">
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                Wertermittlung
              </Badge>
              <span className="text-sm">•</span>
              <span className="text-sm">160 Unterrichtseinheiten</span>
              <span className="text-sm">•</span>
              <span className="text-sm">20 Tage</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
          <div className="text-right hidden md:block">
            <div className="text-sm font-medium text-slate-900">Fortschritt</div>
            <div className="text-xs text-slate-500">Tag {currentDayNum} von 20</div>
          </div>
          <Progress value={(currentDayNum / 20) * 100} className="w-32 h-2" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-3">
          <Card className="h-[calc(100vh-200px)] border-slate-200 shadow-sm flex flex-col">
            <CardHeader className="pb-3 border-b bg-slate-50/50">
              <CardTitle className="text-lg">Lernplan</CardTitle>
              <CardDescription>Wählen Sie einen Tag</CardDescription>
            </CardHeader>
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-3 space-y-4">
                  {weeks.map((week) => (
                    <div key={week.id} className="space-y-2">
                      <div className="px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider flex justify-between items-center">
                        {week.title}
                      </div>
                      <div className="space-y-1">
                        {Array.from({ length: week.dayRange[1] - week.dayRange[0] + 1 }, (_, i) => {
                          const dayNum = week.dayRange[0] + i;
                          const dayKey = `day_${dayNum}`;
                          const isActive = selectedDay === dayKey;
                          
                          return (
                            <Button
                              key={dayNum}
                              variant={isActive ? "secondary" : "ghost"}
                              className={`w-full justify-start text-left h-auto py-2.5 px-3 ${
                                isActive 
                                  ? "bg-blue-50 text-blue-700 border border-blue-100" 
                                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                              }`}
                              onClick={() => {
                                setSelectedDay(dayKey);
                                setShowQuiz(false);
                                setShowCertificate(false);
                                window.scrollTo(0,0);
                              }}
                            >
                              <div className="flex items-center gap-3 w-full">
                                <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                  isActive 
                                    ? "bg-blue-600 text-white" 
                                    : "bg-slate-200 text-slate-600"
                                }`}>
                                  {dayNum}
                                </div>
                                <div className="overflow-hidden flex-1">
                                  <div className="truncate font-medium text-sm">
                                    Tag {dayNum}
                                  </div>
                                </div>
                                {isActive && <ChevronRight className="h-4 w-4 text-blue-500" />}
                              </div>
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-9">
          {showQuiz ? (
            <ModuleQuiz 
              moduleTitle="Gutachten & Sachverständiger"
              questions={quizQuestionsModule4}
              onComplete={handleQuizComplete}
            />
          ) : showCertificate ? (
            <CertificateGenerator 
              userName="Max Mustermann"
              moduleName="Modul 4: Gutachten & Sachverständiger"
              completionDate={new Date().toLocaleDateString()}
              isCompleted={true}
            />
          ) : (
            <Card className="border-slate-200 shadow-md">
              <CardHeader className="border-b bg-slate-50/50">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl text-slate-900">{currentContent.title}</CardTitle>
                    <CardDescription className="mt-1">
                      Tag {currentDayNum} • {currentContent.type || "Lerneinheit"}
                    </CardDescription>
                  </div>
                  {currentDayNum === 20 && (
                    <Button 
                      onClick={() => setShowQuiz(true)} 
                      className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
                    >
                      <Award className="h-4 w-4" />
                      Abschlussprüfung
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <Tabs defaultValue="theory" className="w-full">
                  <TabsList className="grid w-full grid-cols-5 mb-8 bg-slate-100 p-1 rounded-xl">
                    <TabsTrigger value="theory" className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm rounded-lg">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Theorie
                    </TabsTrigger>
                    <TabsTrigger value="law" className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm rounded-lg">
                      <Gavel className="h-4 w-4 mr-2" />
                      Normen
                    </TabsTrigger>
                    <TabsTrigger value="practice" className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm rounded-lg">
                      <Calculator className="h-4 w-4 mr-2" />
                      Praxis
                    </TabsTrigger>
                    <TabsTrigger value="task" className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm rounded-lg">
                                      <TabsTrigger value="videos" className="data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-sm rounded-lg">
                      <Video className="h-4 w-4 mr-2" />
                      Videos
                    </TabsTrigger>

                      <FileText className="h-4 w-4 mr-2" />
                      Aufgaben
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="theory" className="mt-0 space-y-6 animate-in fade-in-50 focus-visible:outline-none relative group">
                    <FullscreenContent content={<SmartContent content={currentContent.theory} />} title={`Theorie: ${currentContent.title}`} />
                    <div className="content-container prose prose-slate max-w-none break-words prose-headings:text-slate-900 prose-a:text-blue-600 prose-strong:text-slate-900">
                      <SmartContent content={currentContent.theory} />
                    </div>

                    {/* Solution Accordion */}
                    {currentContent.solution && (
                      <div className="mt-8">
                        <SolutionToggler 
                          title="Musterlösung anzeigen"
                          solution={currentContent.solution}
                        />
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="law" className="mt-0 space-y-6 animate-in fade-in-50 focus-visible:outline-none relative group">
                    <FullscreenContent 
                      title={`Rechtliche Grundlagen: ${currentContent.title}`}
                      content={
                        <div className="grid gap-4">
                          {currentContent.law.map((law, index) => (
                            <Card key={index} className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
                              <CardContent className="p-4 flex items-start gap-3">
                                <Gavel className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                <div className="prose prose-sm max-w-none break-words">
                                  <SmartContent content={law} />
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      } 
                    />
                    <div className="content-container grid gap-4">
                      {currentContent.law.map((law, index) => (
                        <Card key={index} className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
                          <CardContent className="p-4 flex items-start gap-3">
                            <Gavel className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                            <div className="prose prose-sm max-w-none break-words">
                              <SmartContent content={law} />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Solution Accordion */}
                    {currentContent.solution && (
                      <div className="mt-8">
                        <SolutionToggler 
                          title="Musterlösung anzeigen"
                          solution={currentContent.solution}
                        />
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="practice" className="mt-0 space-y-6 animate-in fade-in-50 focus-visible:outline-none relative group">
                    <FullscreenContent content={<SmartContent content={currentContent.practice} />} title={`Praxis-Analyse: ${currentContent.title}`} />
                    <div className="content-container prose prose-slate max-w-none break-words prose-headings:text-slate-900 prose-a:text-blue-600 prose-strong:text-slate-900 bg-emerald-50/50 p-6 rounded-lg border border-emerald-100">
                      <SmartContent content={currentContent.practice} />
                    </div>

                    {/* OLG/BGH Court Cases Section */}
                    <Card className="bg-purple-50/50 border-purple-200 shadow-sm">
                      <CardHeader>
                        <CardTitle className="text-purple-900 flex items-center gap-2">
                          <Gavel className="h-5 w-5" />
                          Rechtsprechung: Sachverständigenhaftung
                        </CardTitle>
                        <CardDescription>
                          Aktuelle OLG- und BGH-Entscheidungen zur Haftung von Immobiliengutachtern
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {courtCasesModule4.map((courtCase) => (
                          <CourtCaseDisplay key={courtCase.id} courtCase={courtCase} />
                        ))}
                      </CardContent>
                    </Card>

                    {/* Solution Accordion */}
                    {currentContent.solution && (
                      <div className="mt-8">
                        <SolutionToggler 
                          title="Musterlösung anzeigen"
                          solution={currentContent.solution}
                        />
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="task" className="mt-0 space-y-6 animate-in fade-in-50 focus-visible:outline-none relative group">
                    <FullscreenContent 
                       title={`Aufgaben & Lösungen: ${currentContent.title}`}
                       content={
                         <div className="space-y-6">
                           {currentContent.tasks && currentContent.tasks.map((task, index) => (
                             <Card key={index} className="border-slate-200 shadow-sm">
                               <CardHeader className="bg-slate-50/50 pb-3">
                                 <CardTitle className="text-base flex items-center gap-2">
                                   <CheckCircle2 className="h-5 w-5 text-blue-600" />
                                   Aufgabe {index + 1}
                                 </CardTitle>
                               </CardHeader>
                               <CardContent className="p-6 space-y-4">
                                 <div className="prose prose-slate max-w-none break-words">
                                   <SmartContent content={task.question} />
                                 </div>
                                 <SolutionToggler solution={task.solution} />
                               </CardContent>
                             </Card>
                           ))}
                         </div>
                       } 
                     />
                    <div className="content-container space-y-6">
                      {currentContent.tasks && currentContent.tasks.map((task, index) => (
                        <Card key={index} className="border-slate-200 shadow-sm">
                          <CardHeader className="bg-slate-50/50 pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                              <CheckCircle2 className="h-5 w-5 text-blue-600" />
                              Aufgabe {index + 1}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-6 space-y-4">
                            <div className="prose prose-slate max-w-none break-words">
                              <SmartContent content={task.question} />
                            </div>
                            <SolutionToggler solution={task.solution} />
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Solution Accordion */}
                    {currentContent.solution && (
                      <div className="mt-8">
                        <SolutionToggler 
                          title="Musterlösung anzeigen"
                          solution={currentContent.solution}
                        />
                      </div>
                    )}
                  </TabsContent>
                                                  <TabsContent value="videos" className="mt-0 space-y-6 animate-in fade-in-50 focus-visible:outline-none">
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Video className="h-6 w-6 text-purple-600" />
                        <h3 className="text-xl font-bold text-slate-900">Video-Tutorials</h3>
                      </div>
                      <p className="text-slate-600 mb-6">
                        Vertiefen Sie Ihr Wissen mit professionellen Video-Tutorials. 
                        Ihr Fortschritt wird automatisch gespeichert.
                      </p>
                      <VideoList moduleId={4} dayNumber={currentDayNum} />
                    </div>
                  </TabsContent>


              </Tabs>
                
                {/* Navigation Footer */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-100">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      if (currentDayNum > 1) {
                        setSelectedDay(`day_${currentDayNum - 1}`);
                        setShowQuiz(false);
                        setShowCertificate(false);
                        window.scrollTo(0,0);
                      }
                    }}
                    disabled={currentDayNum === 1}
                    className="gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" /> Vorheriger Tag
                  </Button>
                  
                  {currentDayNum < 20 ? (
                    <Button 
                      onClick={handleNextDay}
                      className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Nächster Tag <ArrowRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => setShowQuiz(true)}
                      className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Zur Abschlussprüfung <ArrowRight className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <AITutor
      isOpen={showAITutor}
      onClose={() => setShowAITutor(false)}
      moduleId={4}
      moduleContext={"Modul 4"}
    />
</div>
  );
}
</file>

<file path="client/src/pages/modules/Module5Detail.tsx">
import { trpc } from "@/lib/trpc";
import { useState, useRef, useEffect } from "react";
import { useActivityHeartbeat } from "@/hooks/useActivityHeartbeat";
import { Link, useRoute } from "wouter";
import { 
  ArrowLeft, 
  BookOpen, 
  CheckCircle2, 
  FileText, 
  Gavel,
  Briefcase,
  ChevronRight,
  Calculator,
  Search,
  Scale,
  Lightbulb,
  AlertTriangle,
  Award,
  ArrowRight,
  Maximize2,
  Minimize2
} from "lucide-react";
import { AITutor } from "@/components/AITutor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReactMarkdown from 'react-markdown';
import { SolutionToggler } from "@/components/SolutionToggler";
import { ModuleQuiz } from "@/components/ModuleQuiz";
import { Quiz } from "@/components/Quiz";
import { CertificateGenerator } from "@/components/CertificateGenerator";
import { useToast } from "@/hooks/use-toast";
import { SmartContent } from "@/components/SmartContent";
import { FullscreenContent } from "@/components/FullscreenContent";
import { VideoList } from "@/components/VideoPlayer";
import { Video } from "lucide-react";

// Import Content
// OLD: import { contentDataModule5Maximal } from "./Module5Content_Maximal";
import { contentDataModule5_34i_Part1 } from "./Module5Content_34i_Part1";
import { contentDataModule5_34i_Part2 } from "./Module5Content_34i_Part2";
import { contentDataModule5_34i_Part3 } from "./Module5Content_34i_Part3";
import { contentDataModule5_34i_Part4 } from "./Module5Content_34i_Part4";
import { contentDataModule5_34i_Part5 } from "./Module5Content_34i_Part5";
import { contentDataModule5_34i_Part6 } from "./Module5Content_34i_Part6";
import { contentDataModule5_34i_Part7_Final } from "./Module5Content_34i_Part7_Final";

// Merge all parts into one object
const contentDataModule5Maximal = {
  ...contentDataModule5_34i_Part1,
  ...contentDataModule5_34i_Part2,
  ...contentDataModule5_34i_Part3,
  ...contentDataModule5_34i_Part4,
  ...contentDataModule5_34i_Part5,
  ...contentDataModule5_34i_Part6,
  ...contentDataModule5_34i_Part7_Final,
};

// Define weeks structure for Module 5 (40 Days)
const weeks = [
  {
    id: 1,
    title: "Woche 1-2: Prüfungsvorbereitung",
    days: "Tag 1-10",
    topics: ["Module 1-4 Wiederholung", "Prüfungsstrategien", "Zeitmanagement", "Prüfungssimulation"],
    dayRange: [1, 10]
  },
  {
    id: 2,
    title: "Woche 3-4: §34i Grundlagen",
    days: "Tag 11-20",
    topics: ["Erlaubnispflicht", "Sachkundeprüfung", "Berufshaftpflicht", "Compliance"],
    dayRange: [11, 20]
  },
  {
    id: 3,
    title: "Woche 5-6: Darlehensarten",
    days: "Tag 21-30",
    topics: ["Annuitätendarlehen", "KfW-Darlehen", "Forward-Darlehen", "Kombidarlehen"],
    dayRange: [21, 30]
  },
  {
    id: 4,
    title: "Woche 7-8: Beratung & Praxis",
    days: "Tag 31-40",
    topics: ["Finanzierungsberatung", "Haushaltsrechnung", "Praxisfälle", "Anschlussfinanzierung"],
    dayRange: [31, 40]
  }
];

export default function Module5Detail() {
  const [match, params] = useRoute("/modul/5/tag/:day");
  const { toast } = useToast();
  const urlDay = params?.day ? `day_${params.day}` : "day_1";
  
  const [selectedDay, setSelectedDay] = useState(urlDay);
  const [showAITutor, setShowAITutor] = useState(false);

  // Lernfortschritt Tracking
  const logIdRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const heartbeatRef = useRef<number>(0);
  const startDayMutation = trpc.progress.startDay.useMutation();
  const completeDayByIdsMutation = trpc.progress.completeDayByIds.useMutation();

  // Tag öffnen → in DB speichern
  useEffect(() => {
    const dayNum = parseInt(selectedDay.replace('day_', ''));
    if (!dayNum) return;
    startTimeRef.current = Date.now();
    heartbeatRef.current = 0;
    startDayMutation.mutate(
      { moduleId: 5, dayId: dayNum },
      { onSuccess: (data) => { logIdRef.current = data.logId; } }
    );
    // Heartbeat alle 30 Sekunden
    const interval = setInterval(() => { heartbeatRef.current += 1; }, 30000);
    return () => clearInterval(interval);
  }, [selectedDay]);

  // Tag abschließen
  const completeCurrentDay = () => {
    const dayNum = parseInt(selectedDay.replace('day_', ''));
    const duration = Math.round((Date.now() - startTimeRef.current) / 1000);
    completeDayByIdsMutation.mutate({
      moduleId: 5,
      dayId: dayNum,
      durationSeconds: Math.max(duration, 1),
    });
  };

  const [showQuiz, setShowQuiz] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const currentDayNum = parseInt(selectedDay.split('_')[1]);

  // AZAV-Anwesenheitsnachweis: Heartbeat alle 60 Sekunden
  useActivityHeartbeat({ moduleId: 5, dayId: currentDayNum });
  
  // Get content for selected day
  const currentContent = contentDataModule5Maximal[selectedDay as keyof typeof contentDataModule5Maximal] || contentDataModule5Maximal.day_1;

  const handleQuizComplete = (score: number) => {
    if (score >= 50) {
      setShowQuiz(false);
      setShowCertificate(true);
      toast({
        title: "Herzlichen Glückwunsch!",
        description: "Sie haben das Modul erfolgreich abgeschlossen.",
      });
    }
  };

  // Function to handle navigation to next day
  const handleNextDay = () => {
    if (currentDayNum < 40) {
      const nextDay = `day_${currentDayNum + 1}`;
      setSelectedDay(nextDay);
      setShowQuiz(false);
      setShowCertificate(false);
      window.scrollTo(0,0);
    } else {
      // Last day: Show quiz
      setShowQuiz(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Link href="/">
<div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer hover:bg-accent hover:text-accent-foreground h-10 w-10">
              <ArrowLeft className="h-6 w-6" />
            </div>
</Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Modul 5: Prüfung & §34i Darlehensvermittlung</h1>
            <div className="flex items-center gap-2 text-slate-500 mt-1">
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                Finanzierung
              </Badge>
              <span className="text-sm">•</span>
              <span className="text-sm">320 Unterrichtseinheiten</span>
              <span className="text-sm">•</span>
              <span className="text-sm">40 Tage</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
          <div className="text-right hidden md:block">
            <div className="text-sm font-medium text-slate-900">Fortschritt</div>
            <div className="text-xs text-slate-500">Tag {currentDayNum} von 40</div>
          </div>
          <Progress value={(currentDayNum / 40) * 100} className="w-32 h-2" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-3">
          <Card className="h-[calc(100vh-200px)] border-slate-200 shadow-sm flex flex-col">
            <CardHeader className="pb-3 border-b bg-slate-50/50">
              <CardTitle className="text-lg">Lernplan</CardTitle>
              <CardDescription>Wählen Sie einen Tag</CardDescription>
            </CardHeader>
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-3 space-y-4">
                  {weeks.map((week) => (
                    <div key={week.id} className="space-y-2">
                      <div className="px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider flex justify-between items-center">
                        {week.title}
                      </div>
                      <div className="space-y-1">
                        {Array.from({ length: week.dayRange[1] - week.dayRange[0] + 1 }, (_, i) => {
                          const dayNum = week.dayRange[0] + i;
                          const dayKey = `day_${dayNum}`;
                          const isActive = selectedDay === dayKey;
                          
                          return (
                            <Button
                              key={dayNum}
                              variant={isActive ? "secondary" : "ghost"}
                              className={`w-full justify-start text-left h-auto py-2.5 px-3 ${
                                isActive 
                                  ? "bg-blue-50 text-blue-700 border border-blue-100" 
                                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                              }`}
                              onClick={() => {
                                setSelectedDay(dayKey);
                                setShowQuiz(false);
                                setShowCertificate(false);
                                window.scrollTo(0,0);
                              }}
                            >
                              <div className="flex items-center gap-3 w-full">
                                <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                  isActive 
                                    ? "bg-blue-600 text-white" 
                                    : "bg-slate-200 text-slate-600"
                                }`}>
                                  {dayNum}
                                </div>
                                <div className="overflow-hidden flex-1">
                                  <div className="truncate font-medium text-sm">
                                    Tag {dayNum}
                                  </div>
                                </div>
                                {isActive && <ChevronRight className="h-4 w-4 text-blue-500" />}
                              </div>
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-9">
          {showQuiz ? (
            <div className="text-center p-8">
              <h2 className="text-2xl font-bold mb-4">Abschlussprüfung</h2>
              <p>Quiz wird bald verfügbar sein.</p>
            </div>
          ) : showCertificate ? (
            <CertificateGenerator 
              userName="Max Mustermann"
              moduleName="Modul 5: Prüfung & §34i Darlehensvermittlung"
              completionDate={new Date().toLocaleDateString()}
              isCompleted={true}
            />
          ) : (
            <Card className="border-slate-200 shadow-md">
              <CardHeader className="border-b bg-slate-50/50">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl text-slate-900">{currentContent.title}</CardTitle>
                    <CardDescription className="mt-1">
                      Tag {currentDayNum} • {currentContent.type || "Lerneinheit"}
                    </CardDescription>
                  </div>
                  {currentDayNum === 40 && (
                    <Button 
                      onClick={() => setShowQuiz(true)} 
                      className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
                    >
                      <Award className="h-4 w-4" />
                      Abschlussprüfung
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <Tabs defaultValue="theory" className="w-full">
                  <TabsList className="grid w-full grid-cols-5 mb-8 bg-slate-100 p-1 rounded-xl">
                    <TabsTrigger value="theory" className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm rounded-lg">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Theorie
                    </TabsTrigger>
                    <TabsTrigger value="law" className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm rounded-lg">
                      <Gavel className="h-4 w-4 mr-2" />
                      Gesetze
                    </TabsTrigger>
                    <TabsTrigger value="practice" className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm rounded-lg">
                      <Briefcase className="h-4 w-4 mr-2" />
                      Praxis
                    </TabsTrigger>
                    <TabsTrigger value="tasks" className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm rounded-lg">
                      <FileText className="h-4 w-4 mr-2" />
                      Aufgaben
                    </TabsTrigger>
                    <TabsTrigger value="videos" className="data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-sm rounded-lg">
                      <Video className="h-4 w-4 mr-2" />
                      Videos
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="theory" className="space-y-6">
                    <SmartContent content={currentContent.theory} />
                    {currentContent.extendedTheory && (
                      <div className="mt-6 pt-6 border-t">
                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                          <Lightbulb className="h-5 w-5 text-amber-500" />
                          Vertiefungswissen
                        </h3>
                        <SmartContent content={currentContent.extendedTheory} />
                      </div>
                    )}

                    {/* Solution Accordion */}
                    {currentContent.solution && (
                      <div className="mt-8">
                        <SolutionToggler 
                          title="Musterlösung anzeigen"
                          solution={currentContent.solution}
                        />
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="law" className="space-y-4">
                    {currentContent.law && currentContent.law.length > 0 ? (
                      currentContent.law.map((lawItem, index) => (
                        <Card key={index} className="border-l-4 border-l-blue-500">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <Scale className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                              <div className="flex-1">
                                <p className="font-medium text-slate-900">{lawItem}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <p className="text-slate-500">Keine spezifischen Gesetze für diesen Tag.</p>
                    )}
                  </TabsContent>

                  <TabsContent value="practice" className="space-y-6">
                    <SmartContent content={currentContent.practice} />
                  </TabsContent>

                  <TabsContent value="tasks" className="space-y-6">
                    <SmartContent content={currentContent.task} />
                    {currentContent.solution && (
                      <SolutionToggler solution={currentContent.solution} />
                    )}
                  </TabsContent>
                                                  <TabsContent value="videos" className="mt-0 space-y-6 animate-in fade-in-50 focus-visible:outline-none">
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Video className="h-6 w-6 text-purple-600" />
                        <h3 className="text-xl font-bold text-slate-900">Video-Tutorials</h3>
                      </div>
                      <p className="text-slate-600 mb-6">
                        Vertiefen Sie Ihr Wissen mit professionellen Video-Tutorials. 
                        Ihr Fortschritt wird automatisch gespeichert.
                      </p>
                      <VideoList moduleId={5} dayNumber={currentDayNum} />
                    </div>
                  </TabsContent>


              </Tabs>

                {/* Navigation */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (currentDayNum > 1) {
                        setSelectedDay(`day_${currentDayNum - 1}`);
                        window.scrollTo(0,0);
                      }
                    }}
                    disabled={currentDayNum === 1}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Vorheriger Tag
                  </Button>
                  <Button
                    onClick={handleNextDay}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {currentDayNum === 40 ? "Zur Prüfung" : "Nächster Tag"}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <AITutor
      isOpen={showAITutor}
      onClose={() => setShowAITutor(false)}
      moduleId={5}
      moduleContext={"Modul 5"}
    />
</div>
  );
}
</file>

<file path="client/src/pages/modules/Module1Detail.tsx">
import { trpc } from "@/lib/trpc";
import { useState, useRef, useEffect } from "react";
import { useActivityHeartbeat } from "@/hooks/useActivityHeartbeat";
import { Link, useRoute } from "wouter";
import { 
  ArrowLeft, 
  BookOpen, 
  CheckCircle2, 
  FileText, 
  Gavel,
  Briefcase,
  ChevronRight,
  Target,
  Users,
  Lightbulb,
  LineChart,
  Ruler,
  ArrowRight
} from "lucide-react";
import { AITutor } from "@/components/AITutor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReactMarkdown from 'react-markdown';
import { SolutionToggler } from "@/components/SolutionToggler";
import { Quiz } from "@/components/Quiz";
import { CertificateGenerator } from "@/components/CertificateGenerator";
import { DocumentGenerator } from "@/components/DocumentGenerator";
import { SmartContent } from "@/components/SmartContent";
import { FullscreenContent } from "@/components/FullscreenContent";

// Import Maximalist Content
import { contentDataModule1Maximal as contentData } from "./Module1Content_Maximal";
import { quizQuestionsModule1 } from "../../data/quiz-questions-modul1";
import { quizCasesModule1 } from "../../data/quiz-cases-modul1";
import { AIQuizCase } from "@/components/AIQuizCase";
import { VideoList } from "@/components/VideoPlayer";
import { Video } from "lucide-react";

// Define weeks structure for Module 1 (20 Days) - Maximalist Structure
const weeks = [
  {
    id: 1,
    title: "Woche 1: Die Immobilienwirtschaft",
    days: "Tag 1-5",
    topics: ["Marktüberblick", "Rechtsgrundlagen", "Akteure", "Objektarten"],
    dayRange: [1, 5]
  },
  {
    id: 2,
    title: "Woche 2: Dingliches Recht",
    days: "Tag 6-10",
    topics: ["Grundbuch", "Eigentum vs. Besitz", "Lasten & Beschränkungen"],
    dayRange: [6, 10]
  },
  {
    id: 3,
    title: "Woche 3: Öffentliches Baurecht",
    days: "Tag 11-15",
    topics: ["BauGB", "Flächennutzungsplan", "Bebauungsplan", "Baugenehmigung"],
    dayRange: [11, 15]
  },
  {
    id: 4,
    title: "Woche 4: Steuern & Finanzierung",
    days: "Tag 16-20",
    topics: ["Grunderwerbsteuer", "Grundsteuer", "Finanzierungsarten", "Abschluss"],
    dayRange: [16, 20]
  }
];

export default function Module1Detail() {
  const [match, params] = useRoute("/modul/1/tag/:day");
  const urlDay = params?.day ? `day_${params.day}` : "day_1";
  const [selectedDay, setSelectedDay] = useState(urlDay);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [showAITutor, setShowAITutor] = useState(false);

  // Lernfortschritt Tracking
  const logIdRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const heartbeatRef = useRef<number>(0);
  const startDayMutation = trpc.progress.startDay.useMutation();
  const completeDayByIdsMutation = trpc.progress.completeDayByIds.useMutation();

  // Tag öffnen → in DB speichern
  useEffect(() => {
    const dayNum = parseInt(selectedDay.replace('day_', ''));
    if (!dayNum) return;
    startTimeRef.current = Date.now();
    heartbeatRef.current = 0;
    startDayMutation.mutate(
      { moduleId: 1, dayId: dayNum },
      { onSuccess: (data) => { logIdRef.current = data.logId; } }
    );
    // Heartbeat alle 30 Sekunden
    const interval = setInterval(() => { heartbeatRef.current += 1; }, 30000);
    return () => clearInterval(interval);
  }, [selectedDay]);

  // Tag abschließen
  const completeCurrentDay = () => {
    const dayNum = parseInt(selectedDay.replace('day_', ''));
    const duration = Math.round((Date.now() - startTimeRef.current) / 1000);
    completeDayByIdsMutation.mutate({
      moduleId: 1,
      dayId: dayNum,
      durationSeconds: Math.max(duration, 1),
    });
  };


  const currentContent = contentData[selectedDay as keyof typeof contentData] || contentData.day_1;
  const currentDayNum = parseInt(selectedDay.replace('day_', ''));

  // AZAV-Anwesenheitsnachweis: Heartbeat alle 60 Sekunden
  useActivityHeartbeat({ moduleId: 1, dayId: currentDayNum });

  // Calculate progress
  const totalDays = 20;
  const completedDays = currentDayNum;
  const progressPercentage = (completedDays / totalDays) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
<div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer hover:bg-accent hover:text-accent-foreground h-10 w-10 hover:bg-slate-100">
                  <ArrowLeft className="h-5 w-5" />
                </div>
</Link>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Modul 1: Einführung in die Immobilienbranche</h1>
                <p className="text-sm text-slate-500 mt-0.5">20 Ausbildungstage • Grundlagen der Immobilienwirtschaft</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 px-4 py-2 text-sm font-semibold">
              Tag {currentDayNum} von {totalDays}
            </Badge>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-slate-600 mb-2">
              <span>Gesamtfortschritt</span>
              <span className="font-semibold">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2 bg-slate-200" />
            <p className="text-xs text-slate-500 mt-1">
              {completedDays} von {totalDays} UE absolviert
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Sidebar - Learning Plan */}
          <div className="lg:col-span-3">
            <Card className="border-slate-200 shadow-md sticky top-24">
              <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-slate-50">
                <CardTitle className="text-lg flex items-center gap-2 text-slate-900">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Lernplan
                </CardTitle>
                <CardDescription>Wählen Sie einen Tag</CardDescription>
              </CardHeader>
              <ScrollArea className="h-[calc(100vh-280px)]">
                <div className="p-4 space-y-6">
                  {weeks.map((week) => (
                    <div key={week.id} className="space-y-2">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                          {week.id}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm text-slate-900 leading-tight">{week.title}</h3>
                          <p className="text-xs text-slate-500">{week.days}</p>
                        </div>
                      </div>
                      <div className="space-y-1 pl-1">
                        {Array.from({ length: week.dayRange[1] - week.dayRange[0] + 1 }, (_, i) => {
                          const dayNum = week.dayRange[0] + i;
                          const dayKey = `day_${dayNum}`;
                          const dayData = contentData[dayKey as keyof typeof contentData];
                          const isActive = selectedDay === dayKey;
                          
                          if (!dayData) return null;
                          
                          return (
                            <Button
                              key={dayNum}
                              variant={isActive ? "secondary" : "ghost"}
                              className={`w-full justify-start text-left h-auto py-2.5 px-3 ${
                                isActive 
                                  ? "bg-blue-50 text-blue-700 border border-blue-100" 
                                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                              }`}
                              onClick={() => {
                                setSelectedDay(dayKey);
                                window.scrollTo(0,0);
                              }}
                            >
                              <div className="flex items-center gap-3 w-full">
                                <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                  isActive 
                                    ? "bg-blue-600 text-white" 
                                    : "bg-slate-200 text-slate-600"
                                }`}>
                                  {dayNum}
                                </div>
                                <div className="overflow-hidden flex-1">
                                  <div className="truncate font-medium text-sm">
                                    {dayData.title}
                                  </div>
                                </div>
                                {isActive && <ChevronRight className="h-4 w-4 text-blue-500" />}
                              </div>
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <Card className="border-slate-200 shadow-md">
              <CardHeader className="border-b bg-slate-50/50">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl text-slate-900">{currentContent.title}</CardTitle>
                    <CardDescription className="mt-1">
                      Tag {currentDayNum} • {currentContent.type || "Lerneinheit"}
                    </CardDescription>
                  </div>
                  {currentDayNum === 20 && (
                     <div className="flex gap-2">
                       <DocumentGenerator 
                         title="Modul 1 Zusammenfassung"
                         content={Object.values(contentData).map(d => d.theory).join('\n\n')}
                         description="Zusammenfassung aller Inhalte aus Modul 1"
                         templateType="summary" 
                       />
                       <CertificateGenerator 
                         moduleName="Modul 1: Grundlagen"
                         userName="Teilnehmer"
                         completionDate={new Date().toLocaleDateString()}
                         isCompleted={isQuizCompleted}
                       />
                     </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <Tabs defaultValue="theory" className="w-full">
                  <TabsList className="grid w-full grid-cols-5 mb-8 bg-slate-100 p-1 rounded-xl">
                    <TabsTrigger value="theory" className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm rounded-lg">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Theorie
                    </TabsTrigger>
                    <TabsTrigger value="law" className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm rounded-lg">
                      <Gavel className="h-4 w-4 mr-2" />
                      Normen
                    </TabsTrigger>
                    <TabsTrigger value="practice" className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm rounded-lg">
                      <LineChart className="h-4 w-4 mr-2" />
                      Analyse
                    </TabsTrigger>
                    <TabsTrigger value="task" className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm rounded-lg">
                      <Ruler className="h-4 w-4 mr-2" />
                      Aufgaben
                    </TabsTrigger>
                    <TabsTrigger value="videos" className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm rounded-lg">
                      <Video className="h-4 w-4 mr-2" />
                      Videos
                    </TabsTrigger>
                    
                  </TabsList>

                  <TabsContent value="theory" className="mt-0 space-y-6 animate-in fade-in-50 focus-visible:outline-none">
                    <FullscreenContent 
                      title={`Theorie: ${currentContent.title}`}
                      content={<SmartContent content={currentContent.theory} />}
                    />
                    <div className="prose prose-slate max-w-none break-words prose-headings:text-slate-900 prose-p:text-slate-600 prose-li:text-slate-600 prose-strong:text-slate-900">
                      <SmartContent content={currentContent.theory} />
                    </div>
                  </TabsContent>

                  <TabsContent value="law" className="mt-0 space-y-6 animate-in fade-in-50 focus-visible:outline-none">
                    <FullscreenContent 
                      title={`Rechtliche Grundlagen: ${currentContent.title}`}
                      content={
                        <div className="grid gap-4">
                          {currentContent.law.map((law, index) => (
                            <Card key={index} className="border-l-4 border-l-blue-500 bg-slate-50">
                              <CardContent className="pt-6">
                                <div className="flex gap-4">
                                  <Gavel className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
                                  <div className="prose prose-sm max-w-none break-words">
                                    <SmartContent content={law} />
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      }
                    />
                    <div className="grid gap-4">
                      {currentContent.law.map((law, index) => (
                        <Card key={index} className="border-l-4 border-l-blue-500 bg-slate-50">
                          <CardContent className="pt-6">
                            <div className="flex gap-4">
                              <Gavel className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
                              <div className="prose prose-sm max-w-none break-words">
                                <SmartContent content={law} />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="practice" className="mt-0 space-y-6 animate-in fade-in-50 focus-visible:outline-none">
                    <FullscreenContent 
                      title={`Praxis-Analyse: ${currentContent.title}`}
                      content={<SmartContent content={currentContent.practice} />}
                    />
                    <Card className="bg-emerald-50/50 border-emerald-100">
                      <CardHeader>
                        <CardTitle className="text-emerald-800 flex items-center gap-2">
                          <Briefcase className="h-5 w-5" />
                          Praxis-Transfer
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="prose prose-sm max-w-none break-words prose-headings:text-emerald-900 prose-p:text-slate-700">
                          <SmartContent content={currentContent.practice} />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="task" className="mt-0 space-y-6 animate-in fade-in-50 focus-visible:outline-none">
                    <FullscreenContent 
                      title={`Aufgaben: ${currentContent.title}`}
                      content={
                        <Card className="border-l-4 border-l-amber-500 bg-amber-50/30">
                          <CardContent className="pt-6">
                            <div className="flex gap-4">
                              <Target className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
                              <div className="flex-1">
                                <div className="prose prose-sm max-w-none break-words">
                                  <SmartContent content={currentContent.task} />
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      }
                    />
                    <Card className="border-l-4 border-l-amber-500 bg-amber-50/30">
                      <CardContent className="pt-6">
                        <div className="flex gap-4">
                          <Target className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
                          <div className="flex-1">
                            <div className="prose prose-sm max-w-none break-words">
                              <SmartContent content={currentContent.task} />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    {/* Strukturierte Aufgaben aus tasks[] */}
                    {(currentContent as any).tasks && (currentContent as any).tasks.length > 0 && (
                      <div className="space-y-4 mt-4">
                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                          <Target className="h-5 w-5 text-amber-600" />
                          Tagesaufgaben
                        </h3>
                        {(currentContent as any).tasks.map((aufgabe: any, idx: number) => (
                          <Card key={idx} className="border-l-4 border-l-amber-500 bg-amber-50/30">
                            <CardContent className="pt-4">
                              <div className="flex gap-3">
                                <span className="flex-shrink-0 w-7 h-7 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-bold">{idx + 1}</span>
                                <div>
                                  <p className="font-medium text-slate-900 mb-1">{aufgabe.question}</p>
                                  {aufgabe.hint && <p className="text-sm text-slate-500 italic">💡 Tipp: {aufgabe.hint}</p>}
                                  <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                                    {aufgabe.type === "reflection" ? "🤔 Reflexion" : aufgabe.type === "case" ? "📋 Fallstudie" : "🔍 Recherche"}
                                  </span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}

                    {/* AI-Powered Interactive Quiz Cases */}
                    <div className="mt-8 space-y-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Lightbulb className="h-6 w-6 text-blue-600" />
                        <h3 className="text-xl font-bold text-slate-900">Interaktive Prüfungsfälle mit KI-Bewertung</h3>
                      </div>
                      <p className="text-slate-600 mb-6">
                        Bearbeiten Sie echte Prüfungsfälle und erhalten Sie sofortiges, KI-gestütztes Feedback mit Musterlösung und Lernpunkten.
                      </p>
                      {quizCasesModule1.map((quizCase) => (
                        <AIQuizCase key={quizCase.id} quizCase={quizCase} />
                      ))}
                    </div>

                    {/* Solution Accordion */}
                    {currentContent.solution && (
                      <div className="mt-8">
                        <SolutionToggler 
                          title="Musterlösung anzeigen"
                          solution={currentContent.solution}
                        />
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="videos" className="mt-0 space-y-6 animate-in fade-in-50 focus-visible:outline-none">
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Video className="h-6 w-6 text-blue-600" />
                        <h3 className="text-xl font-bold text-slate-900">Video-Tutorials</h3>
                      </div>
                      <p className="text-slate-600 mb-6">
                        Vertiefen Sie Ihr Wissen mit professionellen Video-Tutorials. 
                        Ihr Fortschritt wird automatisch gespeichert.
                      </p>
                      <VideoList moduleId={1} dayNumber={currentDayNum} />
                    </div>
                  </TabsContent>

                  
                </Tabs>

                {/* Quiz Section (only on last day) */}
                {currentDayNum === 20 && (
                  <div className="mt-12 pt-8 border-t border-slate-200">
                    <div className="mb-6 text-center">
                      <h2 className="text-2xl font-bold text-slate-900 mb-2">Abschlussquiz: Modul 1</h2>
                      <p className="text-slate-600 mb-4">
                        Testen Sie Ihr Wissen aus allen 20 Tagen. Mindestens 80% richtige Antworten erforderlich.
                      </p>
                      <Link href="/quiz/1">
<div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 bg-blue-600 hover:bg-blue-700">
                          <Target className="w-5 h-5 mr-2" />
                          Quiz starten
                        </div>
</Link>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between items-center mt-12 pt-8 border-t border-slate-200">
                  {currentDayNum > 1 && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        const prevDay = `day_${currentDayNum - 1}`;
                        setSelectedDay(prevDay);
                        window.scrollTo(0, 0);
                      }}
                      className="gap-2"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Vorheriger Tag
                    </Button>
                  )}
                  {currentDayNum < 20 && (
                    <Button
                      onClick={() => {
                        completeCurrentDay();
                        const nextDay = `day_${currentDayNum + 1}`;
                        setSelectedDay(nextDay);
                        window.scrollTo(0, 0);
                      }}
                      className="ml-auto gap-2 bg-blue-600 hover:bg-blue-700"
                    >
                      Nächster Tag
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <AITutor
      isOpen={showAITutor}
      onClose={() => setShowAITutor(false)}
      moduleId={1}
      moduleContext={"Modul 1"}
    />
</div>
  );
}
</file>

</files>
