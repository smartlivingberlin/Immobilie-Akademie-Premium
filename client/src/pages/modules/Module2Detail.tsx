import { trpc } from "@/lib/trpc";
import AudioPlayer from "@/components/AudioPlayer";
import { useState, useRef, useEffect } from "react";
import { Link, useRoute } from "wouter";
import { useActivityHeartbeat } from "@/hooks/useActivityHeartbeat";
import { ArrowLeft, BookOpen, CheckCircle2, FileText, Gavel, Briefcase, ChevronRight, Lightbulb, AlertTriangle, ArrowRight, Maximize2, Minimize2, FlaskConical, Brain } from "lucide-react";
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
import { NotebookLMExport } from "@/components/NotebookLMExport";
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
                <TabsList className="grid w-full grid-cols-6 mb-8 bg-slate-100 p-1 rounded-xl">
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

                                  <TabsTrigger value="praxislab" className="data-[state=active]:bg-white data-[state=active]:text-violet-700 data-[state=active]:shadow-sm rounded-lg">
                    <FlaskConical className="h-4 w-4 mr-2" />
                    Praxis-Lab
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="theory" className="mt-0 space-y-6 animate-in fade-in-50 focus-visible:outline-none relative group">
                  <FullscreenContent
                      title={`Theorie: ${currentContent.title}`}
                      content={
                        <div className="space-y-8">
                          <SmartContent content={currentContent.theory} />
                          {(currentContent as any).extendedTheory && (
                            <div className="mt-8 pt-8 border-t-2 border-amber-200">
                              <h2 className="text-2xl font-bold text-amber-700 mb-4 flex items-center gap-2">
                                <span>💡</span> Vertiefungswissen
                              </h2>
                              <SmartContent content={(currentContent as any).extendedTheory} />
                            </div>
                          )}
                          {(currentContent as any).law && (currentContent as any).law.length > 0 && (
                            <div className="mt-8 pt-8 border-t-2 border-blue-200">
                              <h2 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2">
                                <span>⚖️</span> Relevante Gesetze & Normen
                              </h2>
                              {(currentContent as any).law.map((item: string, i: number) => (
                                <div key={i} className="flex gap-3 p-3 bg-blue-50 rounded-lg mb-2">
                                  <span className="text-blue-600 font-bold">§</span>
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      }
                    />
                  <div className="content-container prose prose-slate max-w-none prose-headings:text-slate-900 prose-a:text-blue-600 prose-strong:text-slate-900">
                    <>
              <AudioPlayer 
                      text={[currentContent.theory, (currentContent as any).extendedTheory].filter(Boolean).join("\n\n")} 
                      label="Theorie + Vertiefung vorlesen" 
                    />
                    <NotebookLMExport
                      moduleId={2}
                      dayNumber={currentDayNum}
                      title={currentContent.title}
                      theory={currentContent.theory}
                      extendedTheory={(currentContent as any).extendedTheory}
                      law={currentContent.law}
                      practice={currentContent.practice}
                      task={typeof currentContent.task === "string" ? currentContent.task : undefined}
                    />
              <SmartContent content={currentContent.theory} />
              </>
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
                    <AudioPlayer text={(currentContent.law || []).join(". ")} label="Normen vorlesen" />
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
                  <FullscreenContent
                    title={`Praxis: ${currentContent.title}`}
                    content={
                      <div>
                        <SmartContent content={currentContent.practice} />
                      </div>
                    }
                  />
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
                    <AudioPlayer text={typeof currentContent.task === "string" ? currentContent.task : ""} label="Aufgaben vorlesen" />
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
                      <div style={{
                        background: "#faf5ff", border: "1px solid #e9d5ff",
                        borderRadius: 12, padding: "24px", textAlign: "center"
                      }}>
                        <div style={{ fontSize: 40, marginBottom: 12 }}>🎬</div>
                        <p style={{ fontWeight: 700, color: "#7c3aed", marginBottom: 6 }}>
                          Video-Tutorials — demnächst verfügbar
                        </p>
                        <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6 }}>
                          Die Live-Webinar-Aufzeichnungen werden nach Start der ersten
                          Staffel (geplant: Juni 2026) hier eingestellt.
                          Bis dahin steht der KI-Tutor 24/7 zur Verfügung.
                        </p>
                      </div>
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
