import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Trophy, BarChart3, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type QuizQuestion = {
  id: number;
  moduleId: number;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  questionText: string;
  options: string;
  correctAnswer: string;
  explanation: string;
};

type QuizState = "setup" | "quiz" | "results";

export default function Quiz() {
  const { toast } = useToast();
  
  // Quiz configuration
  const [moduleId, setModuleId] = useState<number>(5); // Default: Modul 5
  const [category, setCategory] = useState<string>("all");
  const [difficulty, setDifficulty] = useState<string>("all");
  const [questionCount, setQuestionCount] = useState<number>(20);
  
  // Quiz state
  const [quizState, setQuizState] = useState<QuizState>("setup");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<{ questionId: number; answer: string; correct: boolean }[]>([]);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  
  // Fetch quiz statistics
  const { data: stats } = trpc.quiz.getQuizStats.useQuery({ moduleId });
  
  // Fetch random questions (disabled by default)
  const [fetchEnabled, setFetchEnabled] = useState(false);
  const { data: fetchedQuestions, isLoading: isLoadingQuiz, error: quizError } = trpc.quiz.getRandomQuestions.useQuery(
    {
      moduleId,
      category: category === "all" ? undefined : category,
      difficulty: difficulty === "all" ? undefined : (difficulty as "easy" | "medium" | "hard"),
      count: questionCount,
    },
    {
      enabled: fetchEnabled,
    }
  );
  
  // Handle quiz data loading
  useEffect(() => {
    if (!fetchEnabled) return;
    
    if (fetchedQuestions) {
      if (fetchedQuestions.length === 0) {
        toast({
          title: "Keine Fragen gefunden",
          description: "Für die gewählten Kriterien sind keine Fragen verfügbar.",
          variant: "destructive",
        });
        setFetchEnabled(false);
        return;
      }
      setQuestions(fetchedQuestions as QuizQuestion[]);
      setQuizState("quiz");
      setCurrentQuestionIndex(0);
      setAnswers([]);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setFetchEnabled(false);
    }
    
    if (quizError) {
      toast({
        title: "Fehler",
        description: "Quiz konnte nicht gestartet werden.",
        variant: "destructive",
      });
      setFetchEnabled(false);
    }
  }, [fetchedQuestions, quizError, fetchEnabled, toast]);
  
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  
  const handleStartQuiz = () => {
    setFetchEnabled(true);
  };
  
  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };
  
  const handleSubmitAnswer = () => {
    if (!selectedAnswer || !currentQuestion) return;
    
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    setAnswers([
      ...answers,
      {
        questionId: currentQuestion.id,
        answer: selectedAnswer,
        correct: isCorrect,
      },
    ]);
    
    setShowFeedback(true);
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setQuizState("results");
    }
  };
  
  const handleRestartQuiz = () => {
    setQuizState("setup");
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };
  
  const correctCount = answers.filter((a) => a.correct).length;
  const incorrectCount = answers.filter((a) => !a.correct).length;
  const scorePercentage = (correctCount / answers.length) * 100;
  const passed = scorePercentage >= 70;
  
  // Parse options from JSON string
  const parseOptions = (optionsStr: string): string[] => {
    try {
      return JSON.parse(optionsStr);
    } catch {
      return [];
    }
  };
  
  // Calculate knowledge gaps by category
  const knowledgeGaps = () => {
    const categoryStats: Record<string, { correct: number; total: number }> = {};
    
    answers.forEach((answer) => {
      const question = questions.find((q) => q.id === answer.questionId);
      if (!question) return;
      
      if (!categoryStats[question.category]) {
        categoryStats[question.category] = { correct: 0, total: 0 };
      }
      
      categoryStats[question.category].total++;
      if (answer.correct) {
        categoryStats[question.category].correct++;
      }
    });
    
    return Object.entries(categoryStats)
      .map(([category, stats]) => ({
        category,
        percentage: (stats.correct / stats.total) * 100,
        correct: stats.correct,
        total: stats.total,
      }))
      .sort((a, b) => a.percentage - b.percentage);
  };
  
  // Setup screen
  if (quizState === "setup") {
    return (
      <div className="container max-w-4xl py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Prüfungssimulation</CardTitle>
            <CardDescription>
              Teste dein Wissen mit interaktiven Multiple-Choice-Fragen
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Quiz Statistics */}
            {stats && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">Gesamt</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{stats.total}</div>
                    <p className="text-xs text-muted-foreground">Fragen verfügbar</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">Kategorien</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{stats.byCategory.length}</div>
                    <p className="text-xs text-muted-foreground">Themenbereiche</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">Schwierigkeitsgrade</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{stats.byDifficulty.length}</div>
                    <p className="text-xs text-muted-foreground">Stufen</p>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {/* Quiz Configuration */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Modul</label>
                <Select value={moduleId.toString()} onValueChange={(v) => setModuleId(parseInt(v))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">Modul 5: Darlehensvermittlung §34i</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium">Kategorie</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle Kategorien</SelectItem>
                    {stats?.byCategory.map((cat) => (
                      <SelectItem key={cat.category} value={cat.category}>
                        {cat.category} ({cat.count} Fragen)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium">Schwierigkeitsgrad</label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle Schwierigkeitsgrade</SelectItem>
                    <SelectItem value="easy">Leicht</SelectItem>
                    <SelectItem value="medium">Mittel</SelectItem>
                    <SelectItem value="hard">Schwer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium">Anzahl Fragen</label>
                <Select value={questionCount.toString()} onValueChange={(v) => setQuestionCount(parseInt(v))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 Fragen</SelectItem>
                    <SelectItem value="20">20 Fragen</SelectItem>
                    <SelectItem value="30">30 Fragen</SelectItem>
                    <SelectItem value="50">50 Fragen</SelectItem>
                    <SelectItem value="100">100 Fragen</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleStartQuiz} className="w-full" size="lg" disabled={isLoadingQuiz}>
              {isLoadingQuiz ? "Lade Fragen..." : "Quiz starten"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  // Quiz screen
  if (quizState === "quiz" && currentQuestion) {
    const options = parseOptions(currentQuestion.options);
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    return (
      <div className="container max-w-4xl py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <Badge variant={currentQuestion.difficulty === "easy" ? "default" : currentQuestion.difficulty === "medium" ? "secondary" : "destructive"}>
                {currentQuestion.difficulty === "easy" ? "Leicht" : currentQuestion.difficulty === "medium" ? "Mittel" : "Schwer"}
              </Badge>
              <Badge variant="outline">{currentQuestion.category}</Badge>
            </div>
            <CardTitle className="text-2xl">
              Frage {currentQuestionIndex + 1} von {questions.length}
            </CardTitle>
            <Progress value={progress} className="mt-4" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-lg font-medium">{currentQuestion.questionText}</div>
            
            <div className="space-y-3">
              {options.map((option, index) => (
                <Button
                  key={index}
                  variant={
                    showFeedback
                      ? option === currentQuestion.correctAnswer
                        ? "default"
                        : option === selectedAnswer
                        ? "destructive"
                        : "outline"
                      : selectedAnswer === option
                      ? "default"
                      : "outline"
                  }
                  className="w-full justify-start text-left h-auto py-4 px-6"
                  onClick={() => !showFeedback && handleAnswerSelect(option)}
                  disabled={showFeedback}
                >
                  <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                  <span>{option}</span>
                  {showFeedback && option === currentQuestion.correctAnswer && (
                    <CheckCircle2 className="ml-auto h-5 w-5 text-green-500" />
                  )}
                  {showFeedback && option === selectedAnswer && option !== currentQuestion.correctAnswer && (
                    <XCircle className="ml-auto h-5 w-5 text-red-500" />
                  )}
                </Button>
              ))}
            </div>
            
            {showFeedback && (
              <Card className={isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="text-green-600">Richtig!</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-5 w-5 text-red-600" />
                        <span className="text-red-600">Falsch</span>
                      </>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{currentQuestion.explanation}</p>
                </CardContent>
              </Card>
            )}
          </CardContent>
          <CardFooter>
            {!showFeedback ? (
              <Button onClick={handleSubmitAnswer} className="w-full" size="lg" disabled={!selectedAnswer}>
                Antwort prüfen
              </Button>
            ) : (
              <Button onClick={handleNextQuestion} className="w-full" size="lg">
                {currentQuestionIndex < questions.length - 1 ? "Nächste Frage" : "Auswertung anzeigen"}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  // Results screen
  if (quizState === "results") {
    const gaps = knowledgeGaps();
    
    return (
      <div className="container max-w-4xl py-8 space-y-6">
        {/* Score Card */}
        <Card className={passed ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}>
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <Trophy className={`h-16 w-16 ${passed ? "text-green-600" : "text-red-600"}`} />
            </div>
            <CardTitle className="text-3xl text-center">
              {passed ? "Bestanden!" : "Nicht bestanden"}
            </CardTitle>
            <CardDescription className="text-center text-lg">
              Du hast {correctCount} von {answers.length} Fragen richtig beantwortet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-6xl font-bold mb-2">{scorePercentage.toFixed(0)}%</div>
              <Progress value={scorePercentage} className="h-4" />
              <p className="text-sm text-muted-foreground mt-2">
                {passed ? "Mindestens 70% erforderlich" : "Mindestens 70% erforderlich zum Bestehen"}
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                Richtige Antworten
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-green-600">{correctCount}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-600" />
                Falsche Antworten
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-red-600">{incorrectCount}</div>
            </CardContent>
          </Card>
        </div>
        
        {/* Knowledge Gaps */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Wissenslücken-Analyse
            </CardTitle>
            <CardDescription>
              Themenbereiche nach Erfolgsquote sortiert
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {gaps.map((gap) => (
              <div key={gap.category}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{gap.category}</span>
                  <span className="text-sm text-muted-foreground">
                    {gap.correct}/{gap.total} ({gap.percentage.toFixed(0)}%)
                  </span>
                </div>
                <Progress value={gap.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
        
        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Empfehlungen
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {gaps.filter((g) => g.percentage < 70).length > 0 ? (
              <>
                <p className="text-sm">
                  Du solltest folgende Themenbereiche wiederholen:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  {gaps
                    .filter((g) => g.percentage < 70)
                    .map((gap) => (
                      <li key={gap.category} className="text-sm">
                        <strong>{gap.category}</strong> ({gap.percentage.toFixed(0)}% richtig)
                      </li>
                    ))}
                </ul>
              </>
            ) : (
              <p className="text-sm text-green-600">
                Hervorragend! Du hast in allen Themenbereichen mindestens 70% erreicht.
              </p>
            )}
          </CardContent>
        </Card>
        
        {/* Actions */}
        <div className="flex gap-4">
          <Button onClick={handleRestartQuiz} variant="outline" className="flex-1">
            Neues Quiz starten
          </Button>
          <Button onClick={() => window.location.href = "/modul5"} className="flex-1">
            Zu Modul 5
          </Button>
        </div>
      </div>
    );
  }
  
  return null;
}
