// @ts-nocheck
import { trpc } from "@/lib/trpc";
import AudioPlayer from "@/components/AudioPlayer";
import { useState, useRef, useEffect } from "react";
import { useActivityHeartbeat } from "@/hooks/useActivityHeartbeat";
import { Link, useRoute } from "wouter";
import { ArrowLeft, BookOpen, CheckCircle2, FileText, Gavel, Briefcase, ChevronRight, Calculator, Search, Scale, Lightbulb, AlertTriangle, Award, ArrowRight, Maximize2, Minimize2, FlaskConical, Brain } from "lucide-react";
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
import { NotebookLMExport } from "@/components/NotebookLMExport";
import { CourtCaseDisplay } from "@/components/CourtCaseDisplay";
import { courtCasesModule4 } from "@/data/rechtsprechung-modul4";

// Import Content
import { quizQuestionsModule4 } from "@/data/quiz-questions-modul4";
import { VideoList } from "@/components/VideoPlayer";
import { Video } from "lucide-react";

type DayContent = Record<string, any>;
let _cache_module4: DayContent | null = null;

// Merge content parts
const allContent = {
  ...contentDataModule4Maximalist,
  ...contentDataModule4MaximalistPart2,
  ...contentDataModule4Bonus,
  ...contentDataModule4BonusPart2
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
  const urlDay = params?.day ? `day_${params.day}` : Object.keys(allContent)[0];
  
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
  const [moduleData, setModuleData] = useState<DayContent | null>(null);

  useEffect(() => {
    if (_cache_module4) { setModuleData(_cache_module4); return; }
    fetch("/data/module4.json").then(r => r.json()).then(d => { _cache_module4 = d; setModuleData(d); });
  }, []);
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
    const autoComplete = () => {
      const duration = Math.round((Date.now() - startTimeRef.current) / 1000);
      if (duration >= 30) {
        completeDayByIdsMutation.mutate({
          moduleId: 4, dayId: dayNum,
          durationSeconds: Math.max(duration, 1),
        });
      }
    };
    window.addEventListener('beforeunload', autoComplete);
    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', autoComplete);
      autoComplete();
    };
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
  const firstDay = Object.keys(allContent)[0] as keyof typeof allContent;
const currentContent = moduleData?.[(selectedDay as string)] ?? moduleData?.["day_1"];
  if (!currentContent) return <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",fontSize:14,color:"#64748b"}}>Laden...</div>;

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
                      Tag {currentDayNum} • {(currentContent as any).type || "Lerneinheit"}
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
                    <div className="content-container prose prose-slate max-w-none break-words prose-headings:text-slate-900 prose-a:text-blue-600 prose-strong:text-slate-900">
                      <>
                      <AudioPlayer 
                      text={[currentContent.theory, (currentContent as any).extendedTheory].filter(Boolean).join("\n\n")} 
                      label="Theorie + Vertiefung vorlesen" 
                    />
                    <NotebookLMExport
                      moduleId={4}
                      dayNumber={currentDayNum}
                      title={currentContent.title}
                      theory={currentContent.theory}
                      extendedTheory={(currentContent as any).extendedTheory}
                      law={currentContent.law}
                      practice={currentContent.practice}
                      task={currentContent.task}
                    />
                      <SmartContent content={currentContent.theory} />
                      </>
                      {(currentContent as any).extendedTheory && (
                        <div className="mt-6 pt-6 border-t border-amber-200">
                          <h3 className="text-lg font-bold text-amber-700 mb-3 flex items-center gap-2">
                            <span>💡</span> Vertiefungswissen
                          </h3>
                          <AudioPlayer 
                            text={(currentContent as any).extendedTheory} 
                            label="Vertiefung vorlesen" 
                          />
                          <SmartContent content={(currentContent as any).extendedTheory} />
                        </div>
                      )}
                    </div>

                    {/* Solution Accordion */}
                    {(currentContent as any).solution && (
                      <div className="mt-8">
                        <SolutionToggler 
                          title="Musterlösung anzeigen"
                          solution={(currentContent as any).solution}
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
                    <AudioPlayer text={(currentContent.law || []).join(". ")} label="Normen vorlesen" />
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
                    {(currentContent as any).solution && (
                      <div className="mt-8">
                        <SolutionToggler 
                          title="Musterlösung anzeigen"
                          solution={(currentContent as any).solution}
                        />
                      </div>
                    )}
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
                    {(currentContent as any).solution && (
                      <div className="mt-8">
                        <SolutionToggler 
                          title="Musterlösung anzeigen"
                          solution={(currentContent as any).solution}
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
                    <AudioPlayer text={currentContent.task || ""} label="Aufgaben vorlesen" />
                                   Aufgabe {index + 1}
                                 </CardTitle>
                               </CardHeader>
                               <CardContent className="p-6 space-y-4">
                                 <div className="prose prose-slate max-w-none break-words">
                                   <SmartContent content={task.question} />
                                 </div>
                                 <SolutionToggler solution={(task as any).solution} />
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
                            <SolutionToggler solution={(task as any).solution} />
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Solution Accordion */}
                    {(currentContent as any).solution && (
                      <div className="mt-8">
                        <SolutionToggler 
                          title="Musterlösung anzeigen"
                          solution={(currentContent as any).solution}
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
