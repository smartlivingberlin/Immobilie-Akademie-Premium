import { trpc } from "@/lib/trpc";
import AudioPlayer from "@/components/AudioPlayer";
import { useState, useRef, useEffect } from "react";
import { useActivityHeartbeat } from "@/hooks/useActivityHeartbeat";
import { Link, useLocation, useRoute } from "wouter";
import { getModuleDayCount, getModuleUeCount } from "@shared/moduleMeta";
import { ArrowLeft, BookOpen, CheckCircle2, FileText, Gavel, Briefcase, ChevronRight, Calculator, Search, Scale, Lightbulb, AlertTriangle, Award, ArrowRight, Maximize2, Minimize2, FlaskConical, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReactMarkdown from 'react-markdown';
import { SolutionToggler } from "@/components/SolutionToggler";
import { ModuleVideoComingSoon } from "@/components/modules/ModuleVideoComingSoon";
import { useToast } from "@/hooks/use-toast";
import { NotebookLMExport } from "@/components/NotebookLMExport";
import { LoadingHandler } from "@/components/LoadingHandler";
import { SkeletonCard } from "@/components/ui/SkeletonCard";
import { SkeletonText } from "@/components/ui/SkeletonText";
import { Video } from "lucide-react";
import { lazy, Suspense } from "react";

// Lazy-loaded heavy components
const AITutor = lazy(() => import("@/components/AITutor").then(m => ({ default: m.AITutor })));
const CertificateGenerator = lazy(() => import("@/components/CertificateGenerator").then(m => ({ default: m.CertificateGenerator })));
const ModuleQuiz = lazy(() => import("@/components/ModuleQuiz").then(m => ({ default: m.ModuleQuiz })));
const Quiz = lazy(() => import("@/components/Quiz").then(m => ({ default: m.Quiz })));
const SmartContent = lazy(() => import("@/components/SmartContent").then(m => ({ default: m.SmartContent })));
const FullscreenContent = lazy(() => import("@/components/FullscreenContent").then(m => ({ default: m.FullscreenContent })));
const VideoList = lazy(() => import("@/components/VideoPlayer").then(m => ({ default: m.VideoList })));


type DayContent = Record<string, unknown>;
let _module5Cache: DayContent | null = null;

const MODULE5_DAYS = getModuleDayCount(5);

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
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const [selectedDay, setSelectedDay] = useState("day_1");
  const [moduleData, setModuleData] = useState<DayContent | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (params?.day) setSelectedDay(`day_${params.day}`);
  }, [params?.day]);

  const loadModuleData = () => {
    if (_module5Cache) { setModuleData(_module5Cache); setLoadError(null); return; }
    setLoadError(null);
    fetch("/data/module5.json", { credentials: "include" })
      .then((r) => {
        if (!r.ok) throw new Error(`module5.json HTTP ${r.status}`);
        return r.json();
      })
      .then((d) => { _module5Cache = d; setModuleData(d); })
      .catch((err) => setLoadError(err?.message || "Moduldaten konnten nicht geladen werden"));
  };

  useEffect(() => { loadModuleData(); }, []);
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
    const autoComplete = () => {
      const duration = Math.round((Date.now() - startTimeRef.current) / 1000);
      if (duration >= 30) {
        completeDayByIdsMutation.mutate({
          moduleId: 5, dayId: dayNum,
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
  const currentContent = (moduleData?.[selectedDay] ?? moduleData?.["day_1"]) as any;

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
    if (currentDayNum < MODULE5_DAYS) {
      const nextNum = currentDayNum + 1;
      const nextDay = `day_${nextNum}`;
      setSelectedDay(nextDay);
      navigate(`/modul/5/tag/${nextNum}`);
      setShowQuiz(false);
      setShowCertificate(false);
      window.scrollTo(0, 0);
    } else {
      // Last day: Show quiz
      setShowQuiz(true);
    }
  };

  const moduleSkeleton = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-3">
          <SkeletonCard />
        </div>
        <div className="lg:col-span-9">
          <Card className="p-6 space-y-6">
            <SkeletonText lines={2} />
            <SkeletonCard />
            <SkeletonText lines={5} />
          </Card>
        </div>
      </div>
    </div>
  );

  return (
    <LoadingHandler
      isLoading={!moduleData || !currentContent}
      error={loadError}
      onRetry={loadModuleData}
      skeleton={
        <div className="p-8">
          {moduleSkeleton}
        </div>
      }
    >
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
              <span className="text-sm">{getModuleUeCount(5)} Unterrichtseinheiten</span>
              <span className="text-sm">•</span>
              <span className="text-sm">{MODULE5_DAYS} Tage</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
          <div className="text-right hidden md:block">
            <div className="text-sm font-medium text-slate-900">Fortschritt</div>
            <div className="text-xs text-slate-500">Tag {currentDayNum} von {MODULE5_DAYS}</div>
          </div>
          <Progress value={(currentDayNum / MODULE5_DAYS) * 100} className="w-32 h-2" />
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
                                navigate(`/modul/5/tag/${dayNum}`);
                                setShowQuiz(false);
                                setShowCertificate(false);
                                window.scrollTo(0, 0);
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
            <Suspense fallback={<SkeletonCard />}>
              <div className="flex flex-col gap-4 items-center">
                <CertificateGenerator
                  userName="Max Mustermann"
                  moduleName="Modul 5: Prüfung & §34i Darlehensvermittlung"
                  completionDate={new Date().toLocaleDateString()}
                  isCompleted={true}
                />
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => window.open("/api/certificate/5", "_blank")}
                >
                  <FileText className="h-4 w-4" />
                  Teilnahmebestätigung (PDF)
                </Button>
              </div>
            </Suspense>
          ) : (
            <Card className="border-slate-200 shadow-md">
              <CardHeader className="border-b bg-slate-50/50">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl text-slate-900">{currentContent?.title}</CardTitle>
                    <CardDescription className="mt-1">
                      Tag {currentDayNum} • {currentContent?.type || "Lerneinheit"}
                    </CardDescription>
                  </div>
                  {currentDayNum === MODULE5_DAYS && (
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

                  <TabsContent value="theory" className="mt-0 space-y-6 animate-in fade-in-50 focus-visible:outline-none relative group">
                    <Suspense fallback={<SkeletonCard />}>
                    <FullscreenContent
                      title={`Theorie: ${currentContent?.title}`}
                      content={
                        <div className="space-y-8">
                          <SmartContent content={currentContent?.theory} />
                          {currentContent?.extendedTheory && (
                            <div className="mt-8 pt-8 border-t-2 border-amber-200">
                              <h2 className="text-2xl font-bold text-amber-700 mb-4 flex items-center gap-2">
                                <span>💡</span> Vertiefungswissen
                              </h2>
                              <SmartContent content={currentContent?.extendedTheory} />
                            </div>
                          )}
                          {currentContent?.law && currentContent?.law.length > 0 && (
                            <div className="mt-8 pt-8 border-t-2 border-blue-200">
                              <h2 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2">
                                <span>⚖️</span> Relevante Gesetze & Normen
                              </h2>
                              {currentContent?.law.map((item: string, i: number) => (
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
                    </Suspense>
                    <AudioPlayer
                      text={[currentContent?.theory, currentContent?.extendedTheory].filter(Boolean).join("\n\n")}
                      label="Theorie + Vertiefung vorlesen"
                    />
                    <NotebookLMExport
                      moduleId={5}
                      dayNumber={currentDayNum}
                      title={currentContent?.title}
                      theory={currentContent?.theory}
                      extendedTheory={currentContent?.extendedTheory}
                      law={currentContent?.law}
                      practice={currentContent?.practice}
                      task={currentContent?.task}
                    />
                    <Suspense fallback={<SkeletonCard />}>
                      <SmartContent content={currentContent?.theory} />
                    </Suspense>
                    {currentContent?.extendedTheory && (
                      <div className="mt-6 pt-6 border-t border-amber-200">
                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                          <Lightbulb className="h-5 w-5 text-amber-500" />
                          Vertiefungswissen
                        </h3>
                        <AudioPlayer
                          text={currentContent?.extendedTheory}
                          label="Vertiefung vorlesen"
                        />
                        <Suspense fallback={<SkeletonCard />}>
                          <SmartContent content={currentContent?.extendedTheory} />
                        </Suspense>
                      </div>
                    )}
                    {currentContent?.solution && (
                      <div className="mt-8">
                        <SolutionToggler title="Musterlösung anzeigen" solution={currentContent?.solution} />
                      </div>
                    )}
                  </TabsContent>

                                    <TabsContent value="law" className="mt-0 space-y-4 animate-in fade-in-50 focus-visible:outline-none relative group">
                    <Suspense fallback={<SkeletonCard />}>
                    <FullscreenContent
                      title={`Normen & Gesetze: ${currentContent?.title}`}
                      content={
                        <div className="space-y-4">
                          {currentContent?.law && currentContent?.law.length > 0 ? (
                            currentContent?.law.map((lawItem: string, index: number) => (
                              <div key={index} className="flex items-start gap-3 p-4 border-l-4 border-l-blue-500 bg-blue-50 rounded-r-lg">
                                <span className="text-blue-600 font-bold mt-1">§</span>
                                <p className="font-medium text-slate-900">{lawItem}</p>
                              </div>
                            ))
                          ) : (
                            <p className="text-slate-500">Keine spezifischen Gesetze für diesen Tag.</p>
                          )}
                        </div>
                      }
                    />
                    </Suspense>
                    <AudioPlayer text={(currentContent?.law || []).join(". ")} label="Normen vorlesen" />
                    {currentContent?.law && currentContent?.law.length > 0 ? (
                      currentContent?.law.map((lawItem: string, index: number) => (
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

                  <TabsContent value="practice" className="mt-0 space-y-6 animate-in fade-in-50 focus-visible:outline-none relative group">
                    <Suspense fallback={<SkeletonCard />}>
                    <FullscreenContent
                      title={`Praxis: ${currentContent?.title}`}
                      content={
                        <div>
                          <SmartContent content={currentContent?.practice} />
                        </div>
                      }
                    />
                    </Suspense>
                    <AudioPlayer
                      text={currentContent?.practice || ""}
                      label="Praxis vorlesen"
                    />
                    <Suspense fallback={<SkeletonCard />}>
                      <SmartContent content={currentContent?.practice} />
                    </Suspense>
                  </TabsContent>

                  <TabsContent value="tasks" className="mt-0 space-y-6 animate-in fade-in-50 focus-visible:outline-none relative group">
                    <div className="content-container space-y-6">
                      {(Array.isArray(currentContent?.tasks) ? currentContent.tasks : []).map((task: any, index: number) => (
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
                            {task.hint && (
                              <p className="text-sm text-slate-500 italic mb-3">{task.hint}</p>
                            )}
                            {task.solution && <SolutionToggler solution={task.solution ?? task.hint ?? "Kein Lösungshinweis verfügbar."} />}
                          </CardContent>
                        </Card>
                      ))}
                      {(!currentContent?.tasks || currentContent.tasks.length === 0) && currentContent?.task && (
                        <SmartContent content={currentContent.task} />
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
                      <ModuleVideoComingSoon />
                      <Suspense fallback={<SkeletonCard />}>
                        <VideoList moduleId={5} />
                      </Suspense>
                    </div>
                  </TabsContent>


              </Tabs>

                {/* Navigation */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (currentDayNum > 1) {
                        const prevNum = currentDayNum - 1;
                        setSelectedDay(`day_${prevNum}`);
                        navigate(`/modul/5/tag/${prevNum}`);
                        setShowQuiz(false);
                        setShowCertificate(false);
                        window.scrollTo(0, 0);
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
                    {currentDayNum === MODULE5_DAYS ? "Zur Prüfung" : "Nächster Tag"}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <Suspense fallback={null}>
        <AITutor
          isOpen={showAITutor}
          onClose={() => setShowAITutor(false)}
          moduleId={5}
          moduleContext={"Modul 5"}
        />
      </Suspense>
</div>
    </LoadingHandler>
  );
}
