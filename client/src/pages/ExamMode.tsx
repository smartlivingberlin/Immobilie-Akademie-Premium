import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ClipboardCheck, 
  Clock, 
  Target, 
  TrendingUp,
  BookOpen,
  Award,
  AlertCircle
} from "lucide-react";
import { trpc } from "@/lib/trpc";

const MODULES = [
  {
    id: 1,
    title: "Modul 1: Einführung & Grundlagen",
    description: "Akteure der Immobilienwirtschaft, Immobilienmärkte, ethische Grundsätze",
    color: "bg-blue-500",
    questions: 50,
    duration: 90,
  },
  {
    id: 2,
    title: "Modul 2: Maklerrecht & §34c GewO",
    description: "Gewerbeordnung, Makler- und Bauträgerverordnung, Wettbewerbsrecht",
    color: "bg-green-500",
    questions: 50,
    duration: 90,
  },
  {
    id: 3,
    title: "Modul 3: Verwaltung (WEG & Miet)",
    description: "WEG-Recht, Mietverwaltung, Hausverwaltung, Eigentümerversammlungen",
    color: "bg-purple-500",
    questions: 50,
    duration: 90,
  },
  {
    id: 4,
    title: "Modul 4: Wertermittlung & Gutachten",
    description: "Sachwert-, Ertragswert-, Vergleichswertverfahren, Verkehrswertermittlung",
    color: "bg-orange-500",
    questions: 50,
    duration: 90,
  },
  {
    id: 5,
    title: "Modul 5: Finanzierung & §34i",
    description: "Immobiliardarlehensvermittlung, Kreditprozesse, IHK-Prüfungsvorbereitung",
    color: "bg-red-500",
    questions: 50,
    duration: 90,
  },
];

export default function ExamMode() {
  const [, setLocation] = useLocation();
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [isIHKMode, setIsIHKMode] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [uiError, setUiError] = useState<string | null>(null);
  
  const { data: examHistory } = trpc.exam.getHistory.useQuery({});
  const { data: weakTopics } = trpc.exam.getWeakTopics.useQuery({});
  
  const startExamMutation = trpc.exam.startExam.useMutation({
    onSuccess: (session) => {
      setUiError(null);
      setLocation(`/pruefung/${session.id}`);
    },
    onError: (error) => {
      console.error("[ExamMode] startExam failed:", error);
      setUiError(error.message || "Prüfung konnte nicht gestartet werden.");
    },
  });

  const handleStartExam = () => {
    if (selectedModule) {
      startExamMutation.mutate({ 
        moduleId: selectedModule, 
        difficulty, 
        isIHKMode 
      });
    }
  };

  const getModuleStats = (moduleId: number) => {
    const moduleExams = examHistory?.filter(e => e.moduleId === moduleId && e.status === "completed") || [];
    if (moduleExams.length === 0) return null;
    
    const avgScore = moduleExams.reduce((sum, e) => sum + e.score, 0) / moduleExams.length;
    const bestScore = Math.max(...moduleExams.map(e => e.score));
    const attempts = moduleExams.length;
    
    return { avgScore, bestScore, attempts };
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <ClipboardCheck className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Prüfungsmodus
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Testen Sie Ihr Wissen mit KI-generierten Prüfungsfragen. 
            Erhalten Sie detailliertes Feedback und identifizieren Sie Ihre Wissenslücken.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fragen pro Prüfung</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">50</div>
              <p className="text-xs text-muted-foreground">Multiple-Choice</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Prüfungsdauer</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">90 Min</div>
              <p className="text-xs text-muted-foreground">Empfohlene Zeit</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bestehensgrenze</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">70%</div>
              <p className="text-xs text-muted-foreground">Mindestpunktzahl</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Absolvierte Prüfungen</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{examHistory?.length || 0}</div>
              <p className="text-xs text-muted-foreground">Alle Module</p>
            </CardContent>
          </Card>
        </div>

        {/* Weak Topics Alert */}
        {weakTopics && weakTopics.length > 0 && (
          <Card className="mb-12 border-orange-200 bg-orange-50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <CardTitle className="text-orange-900">Identifizierte Wissenslücken</CardTitle>
              </div>
              <CardDescription className="text-orange-700">
                Basierend auf Ihren bisherigen Prüfungen haben wir folgende Schwachstellen identifiziert:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {weakTopics.slice(0, 10).map((topic) => (
                  <Badge key={topic.id} variant="outline" className="bg-white border-orange-300 text-orange-800">
                    {topic.topic} ({topic.incorrectCount}x falsch)
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {uiError && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="py-4">
              <div className="text-red-700 text-sm font-medium">
                {uiError}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Module Selection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Modul auswählen
            </CardTitle>
            <CardDescription>
              Wählen Sie ein Modul für Ihre Prüfung aus
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {MODULES.map((module) => {
                const stats = getModuleStats(module.id);
                const isSelected = selectedModule === module.id;

                return (
                  <Card
                    key={module.id}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      isSelected ? "ring-2 ring-blue-500 shadow-lg" : ""
                    }`}
                    onClick={() => setSelectedModule(module.id)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className={`w-12 h-12 rounded-lg ${module.color} flex items-center justify-center text-white font-bold text-xl mb-2`}>
                          {module.id}
                        </div>
                        {stats && (
                          <Badge variant="secondary" className="text-xs">
                            Ø {Math.round(stats.avgScore)}%
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {module.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-slate-600">
                        <span className="flex items-center gap-1">
                          <Target className="w-4 h-4" />
                          {module.questions} Fragen
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {module.duration} Min
                        </span>
                      </div>
                      {stats && (
                        <div className="mt-3 pt-3 border-t border-slate-200">
                          <div className="text-xs text-slate-600 space-y-1">
                            <div className="flex justify-between">
                              <span>Beste Punktzahl:</span>
                              <span className="font-semibold">{stats.bestScore}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Versuche:</span>
                              <span className="font-semibold">{stats.attempts}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* IHK Mode and Difficulty Selection */}
        {selectedModule && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Prüfungseinstellungen</CardTitle>
              <CardDescription>
                Passen Sie die Prüfung an Ihre Bedürfnisse an
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* IHK Mode Toggle */}
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex-1">
                  <div className="font-semibold text-slate-900 mb-1">IHK-Simulationsmodus</div>
                  <div className="text-sm text-slate-600">
                    72 Fragen, 180 Minuten, Auswertung erst am Ende (wie echte IHK-Prüfung)
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isIHKMode}
                    onChange={(e) => setIsIHKMode(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Difficulty Selection (only for normal mode) */}
              {!isIHKMode && (
                <div className="space-y-3">
                  <label className="font-semibold text-slate-900">Schwierigkeitsgrad</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['easy', 'medium', 'hard'].map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setDifficulty(level as 'easy' | 'medium' | 'hard')}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          difficulty === level
                            ? 'border-blue-600 bg-blue-50 text-blue-900'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className="font-semibold">
                          {level === 'easy' ? 'Einfach' : level === 'medium' ? 'Mittel' : 'Schwer'}
                        </div>
                        <div className="text-xs mt-1">
                          {level === 'easy' ? 'Grundwissen' : level === 'medium' ? 'Verständnis' : 'Fachwissen'}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Start Button */}
        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={handleStartExam}
            disabled={!selectedModule || startExamMutation.isPending}
            className="px-12 h-14 text-lg"
          >
            {startExamMutation.isPending ? (
              <>
                <Clock className="mr-2 h-5 w-5 animate-spin" />
                Prüfung wird vorbereitet...
              </>
            ) : (
              <>
                <ClipboardCheck className="mr-2 h-5 w-5" />
                Prüfung starten
              </>
            )}
          </Button>
        </div>

        {/* Instructions */}
        <Card className="mt-12 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">Hinweise zur Prüfung</CardTitle>
          </CardHeader>
          <CardContent className="text-blue-800 space-y-2">
            <p>• Die Prüfung besteht aus 50 Multiple-Choice-Fragen</p>
            <p>• Jede Frage hat 4 Antwortmöglichkeiten (A, B, C, D)</p>
            <p>• Die empfohlene Bearbeitungszeit beträgt 90 Minuten</p>
            <p>• Zum Bestehen sind mindestens 70% richtige Antworten erforderlich</p>
            <p>• Sie erhalten nach jeder Frage sofortiges Feedback</p>
            <p>• Am Ende sehen Sie eine detaillierte Auswertung mit Wissenslücken-Analyse</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
