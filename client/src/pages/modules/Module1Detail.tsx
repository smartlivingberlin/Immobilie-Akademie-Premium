import { useFontScale } from "@/App";
import { useState } from "react";
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
