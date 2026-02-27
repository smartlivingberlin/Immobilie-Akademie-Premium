import { useState } from "react";
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
  AlertTriangle,
  ArrowRight,
  Maximize2,
  Minimize2,
  Award
} from "lucide-react";
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
import { quizQuestionsModule3 } from "@/data/quiz-questions-modul3";
import { SolutionToggler } from "@/components/SolutionToggler";
import { SmartContent } from "@/components/SmartContent";
import { FullscreenContent } from "@/components/FullscreenContent";
import { LegalLink } from "@/components/LegalLink";
import { CourtCaseDisplay } from "@/components/CourtCaseDisplay";
import { courtCasesModule3 } from "@/data/rechtsprechung-modul3";
import { useToast } from "@/hooks/use-toast";

// Import Content Parts
import { contentDataModule3Maximal as contentDataModule3MaximalPart1 } from "./Module3Content_Maximal";
import { contentDataModule3MaximalPart2 } from "./Module3Content_Maximal_Part2";
import { contentDataModule3MaximalPart2Extended } from "./Module3Content_Maximal_Part2_Extended";
import { contentDataModule3MaximalPart3 } from "./Module3Content_Maximal_Part3";
import { contentDataModule3MaximalPart3Extended } from "./Module3Content_Maximal_Part3_Extended";
import { contentDataModule3MaximalPart4 } from "./Module3Content_Maximal_Part4";

// Merge all content parts
const allContent = {
  ...contentDataModule3MaximalPart1,
  ...contentDataModule3MaximalPart2,
  ...contentDataModule3MaximalPart2Extended,
  ...contentDataModule3MaximalPart3,
  ...contentDataModule3MaximalPart3Extended,
  ...contentDataModule3MaximalPart4
};

// Define weeks structure for Module 3 (80 Days)
const weeks = [
  {
    id: 1,
    title: "Block 1: Grundlagen WEG (Woche 1-4)",
    days: "Tag 1-20",
    topics: ["WEG-Recht", "Eigentümerversammlung", "Verwaltervertrag", "Gemeinschaftseigentum"],
    dayRange: [1, 20]
  },
  {
    id: 2,
    title: "Block 2: Mietverwaltung (Woche 5-8)",
    days: "Tag 21-40",
    topics: ["Mietrecht", "Betriebskosten", "Mieterhöhung", "Kündigung"],
    dayRange: [21, 40]
  },
  {
    id: 3,
    title: "Block 3: Technik & Praxis (Woche 9-12)",
    days: "Tag 41-60",
    topics: ["Instandhaltung", "Modernisierung", "Verkehrssicherung", "Versicherungen"],
    dayRange: [41, 60]
  },
  {
    id: 4,
    title: "Block 4: Management & Konflikte (Woche 13-16)",
    days: "Tag 61-80",
    topics: ["Konfliktmanagement", "Eigentümerversammlung", "Buchhaltung", "Prüfungsvorbereitung"],
    dayRange: [61, 80]
  }
];

// Helper Component for Fullscreen Button
const FullscreenButton = ({ content, title, icon }: { content: React.ReactNode, title: string, icon?: React.ReactNode }) => (
  <div className="absolute top-2 right-2 z-10">
    <FullscreenContent
      title={title}
      content={content}
      icon={icon}
      triggerButton={
        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-emerald-600 hover:bg-emerald-50">
          <Maximize2 className="h-4 w-4 mr-1" />
          <span className="text-xs">Vollbild</span>
        </Button>
      }
    />
  </div>
);

export default function Module3Detail() {
  const [match, params] = useRoute("/modul/3/tag/:day");
  const urlDay = params?.day ? `day_${params.day}` : "day_1";
  const { toast } = useToast();
  
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
    tasks?: Task[]; // Changed to tasks array to match interface
    task?: Task | Task[]; // Keep for compatibility if needed
    solution?: string;
  }

  const [selectedDay, setSelectedDay] = useState(urlDay);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const currentDayNum = parseInt(selectedDay.split('_')[1]);
  
  // Get content for selected day safely
  const currentContent = (allContent as any)[selectedDay] as ContentData | undefined;
  
  // Check if we should show the document generator (WEG/Rental topics)
  const showDocGenerator = [12, 28, 45, 62].includes(currentDayNum);
  const docType = currentDayNum === 12 ? "verwaltervertrag" : currentDayNum === 28 ? "einladung_etv" : "hausordnung";
  const docTitle = currentDayNum === 12 ? "Verwaltervertrag erstellen" : currentDayNum === 28 ? "Einladung ETV generieren" : "Hausordnung erstellen";

  // Fallback if content is missing
  if (!currentContent) {
    return (
      <div className="p-8 text-center min-h-[50vh] flex flex-col items-center justify-center">
        <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
        <h2 className="text-xl font-bold text-slate-900 mb-2">Inhalt nicht gefunden</h2>
        <p className="text-slate-600 mb-4">Der Inhalt für Tag {currentDayNum} konnte nicht geladen werden.</p>
        <Button onClick={() => setSelectedDay("day_1")}>Zurück zu Tag 1</Button>
      </div>
    );
  }

  // Helper to normalize tasks to array
  // Priority: tasks (new format) -> task (array) -> task (single) -> empty
  const tasks = currentContent.tasks 
    ? currentContent.tasks 
    : Array.isArray(currentContent.task) 
      ? currentContent.task 
      : currentContent.task 
        ? [currentContent.task] 
        : [];

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
    if (currentDayNum < 80) {
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
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="hover:bg-slate-100">
              <ArrowLeft className="h-6 w-6 text-slate-600" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">Modul 3: Immobilienverwaltung</h1>
            <div className="flex flex-wrap items-center gap-2 text-slate-500 mt-1">
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200">
                Verwaltung & WEG
              </Badge>
              <span className="hidden md:inline text-sm">•</span>
              <span className="text-sm">640 Unterrichtseinheiten</span>
              <span className="hidden md:inline text-sm">•</span>
              <span className="text-sm">80 Tage</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4 bg-white p-3 rounded-lg border border-slate-200 shadow-sm w-full md:w-auto">
          <div className="text-right hidden md:block">
            <div className="text-sm font-medium text-slate-900">Fortschritt</div>
            <div className="text-xs text-slate-500">Tag {currentDayNum} von 80</div>
          </div>
          <Progress value={(currentDayNum / 80) * 100} className="w-full md:w-32 h-2" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-3 order-2 lg:order-1">
          <Card className="border-slate-200 shadow-sm sticky top-4 max-h-[calc(100vh-2rem)] flex flex-col">
            <CardHeader className="pb-3 border-b bg-slate-50/50">
              <CardTitle className="text-lg">Lernplan</CardTitle>
              <CardDescription>Wählen Sie einen Tag</CardDescription>
            </CardHeader>
            <div className="flex-1 overflow-hidden min-h-[400px]">
              <ScrollArea className="h-full max-h-[60vh] lg:max-h-[calc(100vh-200px)]">
                <div className="p-3 space-y-4">
                  {weeks.map((week) => (
                    <div key={week.id} className="space-y-2">
                      <div className="px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider flex justify-between items-center sticky top-0 bg-white/95 backdrop-blur py-2 z-10">
                        {week.title}
                      </div>
                      <div className="space-y-1">
                        {Array.from({ length: week.dayRange[1] - week.dayRange[0] + 1 }, (_, i) => {
                          const dayNum = week.dayRange[0] + i;
                          const dayKey = `day_${dayNum}`;
                          const dayData = (allContent as any)[dayKey];
                          const isActive = selectedDay === dayKey;
                          
                          if (!dayData) return null;
                          
                          return (
                            <Button
                              key={dayNum}
                              variant={isActive ? "secondary" : "ghost"}
                              className={`w-full justify-start text-left h-auto py-2.5 px-3 ${
                                isActive 
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-100 font-medium shadow-sm" 
                                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                              }`}
                              onClick={() => {
                                setSelectedDay(dayKey);
                                setShowQuiz(false);
                                setShowCertificate(false);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                            >
                              <div className="flex items-center gap-3 w-full">
                                <div className={`
                                  flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium shrink-0
                                  ${isActive ? "bg-emerald-200 text-emerald-800" : "bg-slate-100 text-slate-500"}
                                `}>
                                  {dayNum}
                                </div>
                                <span className="truncate text-sm">{dayData.title}</span>
                                {isActive && <ChevronRight className="ml-auto h-3 w-3 text-emerald-500" />}
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
        <div className="lg:col-span-9 order-1 lg:order-2 space-y-6">
          {showCertificate ? (
            <CertificateGenerator 
              studentName="Max Mustermann"
              courseName="Modul 3: Immobilienverwaltung – Vorbereitung auf §26a WEG"
              completionDate={new Date().toLocaleDateString('de-DE')}
              score={100}
            />
          ) : showQuiz ? (
            <ModuleQuiz 
              questions={quizQuestionsModule3}
              onComplete={handleQuizComplete}
            />
          ) : (
            <>
              {/* Main Content Tabs */}
              <Tabs defaultValue="theory" className="w-full">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{currentContent.title}</h2>
                    <p className="text-slate-500 flex items-center gap-2 mt-1">
                      <BookOpen className="h-4 w-4" /> Tag {currentDayNum} • {currentContent.type}
                    </p>
                  </div>
                  
                  <TabsList className="grid w-full sm:w-auto grid-cols-3 bg-slate-100 p-1">
                    <TabsTrigger value="theory" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                      <BookOpen className="h-4 w-4 mr-2 hidden sm:inline" /> Theorie
                    </TabsTrigger>
                    <TabsTrigger value="practice" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                      <Briefcase className="h-4 w-4 mr-2 hidden sm:inline" /> Praxis
                    </TabsTrigger>
                    <TabsTrigger value="tasks" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                      <CheckCircle2 className="h-4 w-4 mr-2 hidden sm:inline" /> Aufgaben
                    </TabsTrigger>
                  </TabsList>
                </div>

                {/* Theory Tab */}
                <TabsContent value="theory" className="mt-0 space-y-6">
                  <Card className="border-slate-200 shadow-sm relative overflow-hidden">
                    <FullscreenButton 
                      title={currentContent.title} 
                      content={
                        <div className="prose prose-slate max-w-none break-words">
                          <ReactMarkdown>{currentContent.theory}</ReactMarkdown>
                          {currentContent.law && currentContent.law.length > 0 && (
                            <div className="mt-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
                              <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-4">
                                <Gavel className="h-5 w-5 text-slate-600" />
                                Gesetzliche Grundlagen
                              </h3>
                          <div className="grid gap-3 sm:grid-cols-2">
                            {currentContent.law.map((law, idx) => (
                              <div key={idx} className="flex items-center gap-3 bg-white p-3 rounded-lg border border-slate-200 text-sm font-medium hover:border-emerald-300 hover:shadow-sm transition-all">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                                <LegalLink law={law} />
                              </div>
                            ))}
                          </div>
                            </div>
                          )}
                        </div>
                      } 
                    />
                    <CardHeader className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
                      <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
                        <FileText className="h-5 w-5 text-emerald-600" />
                        Lerninhalt
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="prose prose-slate max-w-none break-words">
                        <ReactMarkdown>{currentContent.theory}</ReactMarkdown>
                      </div>

                      {currentContent.law && currentContent.law.length > 0 && (
                        <div className="mt-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
                          <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-4">
                            <Gavel className="h-5 w-5 text-slate-600" />
                            Gesetzliche Grundlagen
                          </h3>
                          <div className="grid gap-3 sm:grid-cols-2">
                            {currentContent.law.map((law, idx) => (
                              <div key={idx} className="flex items-center gap-3 bg-white p-3 rounded-lg border border-slate-200 text-sm font-medium hover:border-emerald-300 hover:shadow-sm transition-all">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                                <LegalLink law={law} />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Smart Content for additional context */}
                  <SmartContent 
                    topic={currentContent.title}
                    context={currentContent.theory.substring(0, 200)}
                    level="intermediate"
                  />
                </TabsContent>

                {/* Practice Tab */}
                <TabsContent value="practice" className="mt-0 space-y-6">
                  <Card className="border-slate-200 shadow-sm relative overflow-hidden">
                    <FullscreenButton 
                      title={`Praxis: ${currentContent.title}`} 
                      content={
                        <div className="prose prose-slate max-w-none break-words">
                          <ReactMarkdown>{currentContent.practice}</ReactMarkdown>
                        </div>
                      } 
                    />
                    <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
                      <CardTitle className="text-lg text-emerald-900 flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-emerald-600" />
                        Praxistransfer
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="prose prose-slate max-w-none break-words">
                        <ReactMarkdown>{currentContent.practice}</ReactMarkdown>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Rechtsprechung Section */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Gavel className="h-6 w-6 text-purple-600" />
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">Aktuelle Rechtsprechung</h3>
                        <p className="text-sm text-slate-600">Echte BGH-Urteile zu WEG-Verwaltung & Wohnungseigentumsrecht</p>
                      </div>
                    </div>
                    {courtCasesModule3.map((courtCase) => (
                      <CourtCaseDisplay key={courtCase.id} courtCase={courtCase} />
                    ))}
                  </div>

                  {/* Document Generator for specific days */}
                  {showDocGenerator && (
                    <DocumentGenerator 
                      type={docType as any}
                      title={docTitle}
                    />
                  )}
                </TabsContent>

                {/* Tasks Tab */}
                <TabsContent value="tasks" className="mt-0 space-y-6">
                  <Card className="border-slate-200 shadow-sm">
                    <CardHeader className="bg-blue-50/50 border-b border-blue-100">
                      <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-blue-600" />
                        Übungsaufgaben
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 md:p-8 space-y-6">
                      {tasks.length > 0 ? (
                        tasks.map((task, index) => (
                          <div key={index} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                            <div className="p-4 bg-slate-50 border-b border-slate-100 flex gap-3">
                              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold shrink-0">
                                {index + 1}
                              </span>
                              <div className="font-medium text-slate-900">{task.question}</div>
                            </div>
                            <div className="p-4">
                              <SolutionToggler solution={task.solution} />
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-slate-500">
                          <CheckCircle2 className="h-12 w-12 mx-auto mb-3 text-slate-300" />
                          <p>Für diesen Tag sind keine spezifischen Aufgaben hinterlegt.</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Navigation Footer */}
              <div className="flex justify-between items-center pt-8 border-t border-slate-200 mt-12">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    const prevDay = `day_${currentDayNum - 1}`;
                    if (currentDayNum > 1) {
                      setSelectedDay(prevDay);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  disabled={currentDayNum <= 1}
                  className="gap-2"
                >
                  <ArrowLeft className="h-4 w-4" /> Vorheriger Tag
                </Button>

                <Button 
                  onClick={handleNextDay}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 px-8"
                >
                  {currentDayNum < 80 ? (
                    <>
                      Nächster Tag <ArrowRight className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Modul abschließen <Award className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
