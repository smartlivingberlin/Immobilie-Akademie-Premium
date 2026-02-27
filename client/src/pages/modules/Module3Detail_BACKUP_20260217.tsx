import { useState, useEffect } from "react";
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
  Award,
  Lightbulb
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
    title: "Block 1: Grundlagen WEG",
    days: "Tag 1-20",
    topics: ["WEG-Recht", "Eigentümerversammlung", "Verwaltervertrag", "Gemeinschaftseigentum"],
    dayRange: [1, 20]
  },
  {
    id: 2,
    title: "Block 2: Mietverwaltung",
    days: "Tag 21-40",
    topics: ["Mietrecht", "Betriebskosten", "Mieterhöhung", "Kündigung"],
    dayRange: [21, 40]
  },
  {
    id: 3,
    title: "Block 3: Technik & Praxis",
    days: "Tag 41-60",
    topics: ["Instandhaltung", "Modernisierung", "Verkehrssicherung", "Versicherungen"],
    dayRange: [41, 60]
  },
  {
    id: 4,
    title: "Block 4: Management & Konflikte",
    days: "Tag 61-80",
    topics: ["Konfliktmanagement", "Eigentümerversammlung", "Buchhaltung", "Prüfungsvorbereitung"],
    dayRange: [61, 80]
  }
];

export default function Module3Detail() {
  const [, params] = useRoute("/modul/3/tag/:day");
  const dayNum = params?.day ? parseInt(params.day) : 1;
  const [selectedDay, setSelectedDay] = useState(`day_${dayNum}`);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (params?.day) {
      setSelectedDay(`day_${parseInt(params.day)}`);
      setShowQuiz(false);
      setShowCertificate(false);
    }
  }, [params?.day]);

  const currentContent = allContent[selectedDay as keyof typeof allContent] || allContent.day_1;
  const currentDayNum = parseInt(selectedDay.split('_')[1]);
  const progress = (currentDayNum / 80) * 100;
  const isLastDay = currentDayNum === 80;

  // Prepare tasks array
  const tasks = currentContent.task && (currentContent as any).solution
    ? [{ question: currentContent.task, solution: (currentContent as any).solution }]
    : [];

  // Document Generator Logic
  const showDocGenerator = [4, 5, 11, 14, 41, 42, 43, 44, 45, 46].includes(currentDayNum);
  const docType = currentDayNum === 4 ? 'wirtschaftsplan' :
                  currentDayNum === 5 ? 'jahresabrechnung' :
                  currentDayNum === 11 ? 'versammlungsprotokoll' :
                  currentDayNum === 14 ? 'mietvertrag' :
                  [41, 42, 43, 44, 45, 46].includes(currentDayNum) ? 'jahresabrechnung' : 'wirtschaftsplan';
  const docTitle = currentDayNum === 4 ? 'Wirtschaftsplan Generator' :
                   currentDayNum === 5 ? 'Jahresabrechnung Generator' :
                   currentDayNum === 11 ? 'Versammlungsprotokoll Generator' :
                   currentDayNum === 14 ? 'Mietvertrag Generator' :
                   'Dokument Generator';

  const handleNextDay = () => {
    if (currentDayNum < 80) {
      const nextDay = `day_${currentDayNum + 1}`;
      setSelectedDay(nextDay);
      window.location.href = `/modul/3/tag/${currentDayNum + 1}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setShowQuiz(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleQuizComplete = (score: number) => {
    if (score >= 80) {
      setShowCertificate(true);
      toast({
        title: "Glückwunsch!",
        description: `Sie haben ${score}% erreicht und das Modul erfolgreich abgeschlossen!`,
      });
    } else {
      toast({
        title: "Noch nicht bestanden",
        description: `Sie haben ${score}% erreicht. Mindestens 80% sind erforderlich.`,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-8 sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <ArrowLeft className="h-4 w-4 mr-2" /> Zurück
              </Button>
            </Link>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              Verwaltung & WEG
            </Badge>
          </div>
          <h1 className="text-3xl font-bold mb-2">Modul 3: Immobilienverwaltung</h1>
          <p className="text-emerald-100 mb-4">640 Unterrichtseinheiten • 80 Tage</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Fortschritt</span>
              <span>Tag {currentDayNum} von 80</span>
            </div>
            <Progress value={progress} className="h-2 bg-emerald-800" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <Card className="sticky top-32 border-slate-200 shadow-sm">
              <CardHeader className="bg-slate-50 border-b">
                <CardTitle className="text-lg">Lernplan</CardTitle>
                <CardDescription>Wählen Sie einen Tag</CardDescription>
              </CardHeader>
              <ScrollArea className="h-[calc(100vh-300px)]">
                <div className="p-4 space-y-6">
                  {weeks.map((week) => (
                    <div key={week.id}>
                      <div className="mb-3">
                        <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">
                          {week.title}
                        </div>
                        <div className="text-xs text-slate-500">{week.days}</div>
                      </div>
                      <div className="space-y-1">
                        {Array.from({ length: week.dayRange[1] - week.dayRange[0] + 1 }, (_, i) => {
                          const dayNumber = week.dayRange[0] + i;
                          const dayKey = `day_${dayNumber}`;
                          const dayContent = allContent[dayKey as keyof typeof allContent];
                          const isActive = selectedDay === dayKey;
                          
                          return (
                            <Link key={dayKey} href={`/modul/3/tag/${dayNumber}`}>
                              <Button
                                variant={isActive ? "default" : "ghost"}
                                size="sm"
                                className={`w-full justify-start text-left h-auto py-2 ${
                                  isActive 
                                    ? "bg-emerald-600 text-white hover:bg-emerald-700" 
                                    : "hover:bg-slate-100 text-slate-700"
                                }`}
                                onClick={() => setSelectedDay(dayKey)}
                              >
                                <span className="font-semibold mr-2">{dayNumber}</span>
                                <span className="text-xs truncate">{dayContent?.title || `Tag ${dayNumber}`}</span>
                              </Button>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>
          </div>

          {/* Content Area - RESTRUCTURED LIKE MODULE 2 */}
          <div className="lg:col-span-9">
            {showCertificate ? (
              <CertificateGenerator 
                studentName="Max Mustermann"
                courseName="Modul 3: Immobilienverwaltung (IHK-konform)"
                completionDate={new Date().toLocaleDateString('de-DE')}
                score={100}
              />
            ) : showQuiz ? (
              <ModuleQuiz 
                questions={quizQuestionsModule3}
                onComplete={handleQuizComplete}
              />
            ) : (
              <Card className="min-h-[calc(100vh-200px)] border-slate-200 shadow-sm flex flex-col">
                <CardHeader className="border-b bg-slate-50/50 py-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex gap-2 mb-2">
                        <Badge variant="outline" className="bg-white text-slate-600 border-slate-200">
                          {currentContent.type}
                        </Badge>
                      </div>
                      <CardTitle className="text-2xl text-slate-900">{currentContent.title}</CardTitle>
                      <p className="text-slate-500 text-sm mt-1">Tag {currentDayNum} • {currentContent.type}</p>
                    </div>
                    {isLastDay && (
                      <Button 
                        onClick={() => setShowQuiz(true)}
                        className="bg-emerald-600 hover:bg-emerald-700"
                      >
                        <Award className="h-4 w-4 mr-2" />
                        Abschlussprüfung
                      </Button>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="p-6 flex-1">
                  <Tabs defaultValue="theory" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-8 bg-slate-100 p-1 rounded-xl">
                      <TabsTrigger 
                        value="theory" 
                        className="data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm rounded-lg"
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Theorie
                      </TabsTrigger>
                      <TabsTrigger 
                        value="practice" 
                        className="data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm rounded-lg"
                      >
                        <Briefcase className="h-4 w-4 mr-2" />
                        Praxis
                      </TabsTrigger>
                      <TabsTrigger 
                        value="tasks" 
                        className="data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm rounded-lg"
                      >
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Aufgaben
                      </TabsTrigger>
                    </TabsList>

                    {/* Theory Tab */}
                    <TabsContent value="theory" className="mt-0 space-y-6 animate-in fade-in-50 focus-visible:outline-none">
                      <FullscreenContent 
                        content={
                          <div className="prose prose-slate max-w-none break-words">
                            <ReactMarkdown>{currentContent.theory}</ReactMarkdown>
                            {(currentContent as any).extendedTheory && (
                              <div className="mt-8 pt-8 border-t border-slate-200">
                                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                  <Lightbulb className="h-5 w-5 text-amber-500" />
                                  Vertiefungswissen
                                </h3>
                                <ReactMarkdown>{(currentContent as any).extendedTheory}</ReactMarkdown>
                              </div>
                            )}
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
                        title={`Theorie: ${currentContent.title}`} 
                      />
                      
                      <div className="prose prose-slate max-w-none break-words prose-headings:text-slate-900 prose-a:text-emerald-600 prose-strong:text-slate-900">
                        <ReactMarkdown>{currentContent.theory}</ReactMarkdown>
                        
                        {(currentContent as any).extendedTheory && (
                          <div className="mt-8 pt-8 border-t border-slate-200">
                            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                              <Lightbulb className="h-5 w-5 text-amber-500" />
                              Vertiefungswissen
                            </h3>
                            <ReactMarkdown>{(currentContent as any).extendedTheory}</ReactMarkdown>
                          </div>
                        )}
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

                      <SmartContent 
                        topic={currentContent.title}
                        context={currentContent.theory.substring(0, 200)}
                        level="intermediate"
                      />
                    </TabsContent>

                    {/* Practice Tab */}
                    <TabsContent value="practice" className="mt-0 space-y-6 animate-in fade-in-50 focus-visible:outline-none">
                      <FullscreenContent 
                        content={
                          <div className="prose prose-slate max-w-none break-words">
                            <ReactMarkdown>{currentContent.practice}</ReactMarkdown>
                            {(currentContent as any).caseStudy && (
                              <div className="mt-8 pt-8 border-t border-slate-200">
                                <h3 className="text-xl font-bold text-slate-900 mb-4">Fallstudie</h3>
                                <ReactMarkdown>{(currentContent as any).caseStudy}</ReactMarkdown>
                              </div>
                            )}
                          </div>
                        } 
                        title={`Praxis: ${currentContent.title}`} 
                      />
                      
                      <div className="prose prose-slate max-w-none break-words prose-headings:text-slate-900 prose-a:text-emerald-600 prose-strong:text-slate-900">
                        <ReactMarkdown>{currentContent.practice}</ReactMarkdown>
                        
                        {(currentContent as any).caseStudy && (
                          <div className="mt-8 pt-8 border-t border-slate-200">
                            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                              <Briefcase className="h-5 w-5 text-emerald-600" />
                              Fallstudie
                            </h3>
                            <ReactMarkdown>{(currentContent as any).caseStudy}</ReactMarkdown>
                          </div>
                        )}
                      </div>

                      {/* Rechtsprechung Section */}
                      {courtCasesModule3.length > 0 && (
                        <div className="space-y-6 mt-8">
                          <div className="flex items-center gap-3">
                            <Gavel className="h-6 w-6 text-purple-600" />
                            <div>
                              <h3 className="text-xl font-bold text-slate-900">Aktuelle Rechtsprechung</h3>
                              <p className="text-sm text-slate-600">Echte BGH-Urteile zu WEG-Verwaltung & Wohnungseigentumsrecht</p>
                            </div>
                          </div>
                          {courtCasesModule3.slice(0, 2).map((courtCase) => (
                            <CourtCaseDisplay key={courtCase.id} courtCase={courtCase} />
                          ))}
                        </div>
                      )}

                      {showDocGenerator && (
                        <div className="mt-8">
                          <DocumentGenerator 
                            type={docType as any}
                            title={docTitle}
                          />
                        </div>
                      )}
                    </TabsContent>

                    {/* Tasks Tab */}
                    <TabsContent value="tasks" className="mt-0 space-y-6 animate-in fade-in-50 focus-visible:outline-none">
                      {tasks.length > 0 ? (
                        <div className="space-y-6">
                          {tasks.map((task, index) => (
                            <div key={index} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                              <div className="p-4 bg-slate-50 border-b border-slate-100 flex gap-3">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold shrink-0">
                                  {index + 1}
                                </span>
                                <div className="font-medium text-slate-900 prose prose-slate max-w-none break-words">
                                  <ReactMarkdown>{typeof task.question === 'string' ? task.question : ''}</ReactMarkdown>
                                </div>
                              </div>
                              <div className="p-4">
                                <SolutionToggler solution={typeof task.solution === 'string' ? task.solution : ''} />
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12 text-slate-500">
                          <CheckCircle2 className="h-12 w-12 mx-auto mb-3 text-slate-300" />
                          <p>Für diesen Tag sind keine spezifischen Aufgaben hinterlegt.</p>
                          <p className="text-sm mt-2">Wiederholen Sie die Theorie und Praxis-Inhalte.</p>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>

                {/* Navigation Footer */}
                <div className="border-t border-slate-200 p-6 bg-slate-50/50">
                  <div className="flex justify-between items-center">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        if (currentDayNum > 1) {
                          window.location.href = `/modul/3/tag/${currentDayNum - 1}`;
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
                          Nächster Tag: {allContent[`day_${currentDayNum + 1}` as keyof typeof allContent]?.title?.substring(0, 30) || `Tag ${currentDayNum + 1}`}
                          <ArrowRight className="h-4 w-4" />
                        </>
                      ) : (
                        <>
                          Modul abschließen <Award className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
