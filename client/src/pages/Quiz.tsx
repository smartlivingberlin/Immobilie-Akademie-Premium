import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Trophy, BarChart3, Brain, Shuffle, Scale } from "lucide-react";
import { ALL_QUESTIONS, shuffleQuestions, type UnifiedQuestion } from "@/data/all-questions";

type QuizState = "setup" | "quiz" | "results";

const MODULES = [
  { id: 1, label: "Modul 1: Grundlagen & Einführung" },
  { id: 2, label: "Modul 2: Maklerrecht & §34c GewO" },
  { id: 3, label: "Modul 3: Verwaltung (WEG & Miet)" },
  { id: 4, label: "Modul 4: Wertermittlung & Gutachten" },
  { id: 5, label: "Modul 5: Finanzierung & §34i GewO" },
];

export default function Quiz() {
  const [moduleFilter, setModuleFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [quizState, setQuizState] = useState<QuizState>("setup");
  const [questions, setQuestions] = useState<UnifiedQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [answers, setAnswers] = useState<{ questionId: string; answer: number; correct: boolean }[]>([]);

  const availablePool = useMemo(() => {
    let pool = ALL_QUESTIONS;
    if (moduleFilter !== "all") pool = pool.filter(q => q.moduleId === parseInt(moduleFilter));
    if (difficultyFilter !== "all") pool = pool.filter(q => q.difficulty === difficultyFilter);
    if (categoryFilter !== "all") pool = pool.filter(q => q.category === categoryFilter);
    return pool;
  }, [moduleFilter, difficultyFilter, categoryFilter]);

  const availableCategories = useMemo(() => {
    let pool = ALL_QUESTIONS;
    if (moduleFilter !== "all") pool = pool.filter(q => q.moduleId === parseInt(moduleFilter));
    return Array.from(new Set(pool.map(q => q.category))).sort();
  }, [moduleFilter]);

  const startQuiz = () => {
    if (availablePool.length === 0) return;
    const selected = shuffleQuestions(availablePool).slice(0, Math.min(questionCount, availablePool.length));
    setQuestions(selected);
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setAnswers([]);
    setQuizState("quiz");
  };

  // correctAnswer ist "A"/"B"/"C"/"D" → in Index 0/1/2/3 umrechnen
  const correctAnswerToIdx = (ca: string): number => {
    const map: Record<string, number> = { A: 0, B: 1, C: 2, D: 3 };
    return map[ca?.toUpperCase()] ?? 0;
  };

  const handleAnswer = (answerIdx: number) => {
    if (showFeedback) return;
    setSelectedAnswer(answerIdx);
    setShowFeedback(true);
    const q = questions[currentIdx];
    const correctIdx = correctAnswerToIdx(q.correctAnswer);
    setAnswers(prev => [...prev, { questionId: q.id, answer: answerIdx, correct: answerIdx === correctIdx }]);
  };

  const nextQuestion = () => {
    if (currentIdx + 1 >= questions.length) { setQuizState("results"); }
    else { setCurrentIdx(i => i + 1); setSelectedAnswer(null); setShowFeedback(false); }
  };

  const correctCount = answers.filter(a => a.correct).length;
  const scorePercent = answers.length > 0 ? Math.round((correctCount / answers.length) * 100) : 0;
  const getDiffLabel = (d: string) => ({ easy: "Einfach", medium: "Mittel", hard: "Schwer" }[d] || d);

  if (quizState === "setup") {
    return (
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Brain className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Prüfungssimulation</h1>
            <p className="text-slate-600">
              <span className="font-semibold text-blue-700">{ALL_QUESTIONS.length} Fragen</span> aus Lernmaterial & BGH-Rechtsprechung — vollständig offline
            </p>
            <div className="flex justify-center gap-4 mt-3 flex-wrap">
              {MODULES.map(m => (
                <span key={m.id} className="text-xs text-slate-500">
                  M{m.id}: {ALL_QUESTIONS.filter(q => q.moduleId === m.id).length} Fragen
                </span>
              ))}
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Quiz konfigurieren</CardTitle>
              <CardDescription>Modul, Schwierigkeit, Kategorie und Fragenanzahl wählen</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Modul</label>
                <Select value={moduleFilter} onValueChange={v => { setModuleFilter(v); setCategoryFilter("all"); }}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle Module ({ALL_QUESTIONS.length} Fragen)</SelectItem>
                    {MODULES.map(m => (
                      <SelectItem key={m.id} value={String(m.id)}>
                        {m.label} ({ALL_QUESTIONS.filter(q => q.moduleId === m.id).length} Fragen)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Schwierigkeit</label>
                <div className="grid grid-cols-4 gap-2">
                  {["all","easy","medium","hard"].map(d => (
                    <button key={d} onClick={() => setDifficultyFilter(d)}
                      className={"py-2 px-3 rounded-lg border-2 text-sm font-medium transition-all " + (difficultyFilter === d ? "border-blue-600 bg-blue-50 text-blue-900" : "border-slate-200 text-slate-600 hover:border-slate-300")}>
                      {d === "all" ? "Alle" : getDiffLabel(d)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Scale className="w-4 h-4" /> Kategorie
                </label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle Kategorien ({availablePool.length} verfügbar)</SelectItem>
                    {availableCategories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Anzahl Fragen <span className="text-slate-400">({availablePool.length} verfügbar)</span></label>
                <Select value={String(questionCount)} onValueChange={v => setQuestionCount(parseInt(v))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {[5,10,15,20,30,50].filter(n => n <= availablePool.length).map(n => (
                      <SelectItem key={n} value={String(n)}>{n} Fragen</SelectItem>
                    ))}
                    {availablePool.length > 0 && <SelectItem value={String(availablePool.length)}>Alle {availablePool.length} Fragen</SelectItem>}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full h-12 text-lg" onClick={startQuiz} disabled={availablePool.length === 0}>
                <Shuffle className="mr-2 h-5 w-5" />Quiz starten ({Math.min(questionCount, availablePool.length)} Fragen)
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  if (quizState === "quiz") {
    const q = questions[currentIdx];
    return (
      <div className="min-h-screen bg-slate-50 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="mb-6">
            <div className="flex justify-between text-sm text-slate-600 mb-2">
              <span>Frage {currentIdx + 1} von {questions.length}</span>
              <span className="font-medium text-green-600">{answers.filter(a => a.correct).length} richtig</span>
            </div>
            <Progress value={(currentIdx / questions.length) * 100} className="h-2" />
          </div>
          <Card>
            <CardHeader>
              <div className="flex gap-2 flex-wrap mb-2">
                <Badge variant="outline" className="text-xs">M{q.moduleId}</Badge>
                <Badge variant="outline" className="text-xs">{q.category}</Badge>
                <Badge variant={q.difficulty === "easy" ? "secondary" : q.difficulty === "hard" ? "destructive" : "default"} className="text-xs">
                  {getDiffLabel(q.difficulty)}
                </Badge>
              </div>
              <CardTitle className="text-lg leading-snug">{q.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {q.options.map((option, idx) => {
                let cls = "w-full text-left p-4 rounded-lg border-2 transition-all text-sm ";
                const correctIdx = correctAnswerToIdx(q.correctAnswer);
                if (!showFeedback) cls += selectedAnswer === idx ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-blue-300 hover:bg-slate-50";
                else if (idx === correctIdx) cls += "border-green-500 bg-green-50 text-green-900";
                else if (idx === selectedAnswer) cls += "border-red-500 bg-red-50 text-red-900";
                else cls += "border-slate-200 bg-white opacity-60";
                return (
                  <button key={idx} className={cls} onClick={() => handleAnswer(idx)} disabled={showFeedback}>
                    <span className="font-bold mr-2">{["A","B","C","D"][idx]}.</span>{option}
                    {showFeedback && idx === correctAnswerToIdx(q.correctAnswer) && <CheckCircle2 className="inline ml-2 h-4 w-4 text-green-600" />}
                    {showFeedback && idx === selectedAnswer && idx !== correctAnswerToIdx(q.correctAnswer) && <XCircle className="inline ml-2 h-4 w-4 text-red-600" />}
                  </button>
                );
              })}
              {showFeedback && (
                <div className={"p-4 rounded-lg border mt-4 text-sm " + (selectedAnswer === correctAnswerToIdx(q.correctAnswer) ? "bg-green-50 border-green-200 text-green-800" : "bg-orange-50 border-orange-200 text-orange-800")}>
                  <p className="font-semibold mb-1">{selectedAnswer === correctAnswerToIdx(q.correctAnswer) ? "✓ Richtig!" : "✗ Falsch"}</p>
                  <p>{q.explanation}</p>
                </div>
              )}
            </CardContent>
            {showFeedback && (
              <CardFooter>
                <Button className="w-full" onClick={nextQuestion}>
                  {currentIdx + 1 >= questions.length ? "Auswertung anzeigen" : "Nächste Frage →"}
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {scorePercent >= 70 ? <Trophy className="h-16 w-16 text-yellow-500" /> : <BarChart3 className="h-16 w-16 text-blue-500" />}
            </div>
            <CardTitle className="text-2xl">Quiz abgeschlossen!</CardTitle>
            <CardDescription>{scorePercent >= 70 ? "Bestanden — gut gemacht!" : "Weiter üben — du schaffst das!"}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <div className={"text-5xl font-bold mb-2 " + (scorePercent >= 70 ? "text-green-600" : "text-orange-600")}>{scorePercent}%</div>
              <p className="text-slate-600">{correctCount} von {questions.length} richtig</p>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-3 bg-green-50 rounded-lg"><div className="text-2xl font-bold text-green-600">{correctCount}</div><div className="text-xs text-green-700">Richtig</div></div>
              <div className="text-center p-3 bg-red-50 rounded-lg"><div className="text-2xl font-bold text-red-600">{questions.length - correctCount}</div><div className="text-xs text-red-700">Falsch</div></div>
              <div className="text-center p-3 bg-blue-50 rounded-lg"><div className="text-2xl font-bold text-blue-600">{questions.length}</div><div className="text-xs text-blue-700">Gesamt</div></div>
            </div>
            {answers.filter(a => !a.correct).length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold text-slate-800 mb-3">Falsch beantwortet:</h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {answers.filter(a => !a.correct).map(a => {
                    const q = questions.find(q => q.id === a.questionId);
                    if (!q) return null;
                    return (
                      <div key={a.questionId} className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm">
                        <p className="font-medium text-red-900 mb-1">{q.question}</p>
                        <p className="text-red-700 text-xs">✗ Deine Antwort: {q.options[a.answer]}</p>
                        <p className="text-green-700 text-xs">✓ Richtig: {q.options[correctAnswerToIdx(q.correctAnswer)]}</p>
                        <p className="text-slate-600 mt-2 text-xs italic">{q.explanation}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="gap-3">
            <Button className="flex-1" onClick={startQuiz}><Shuffle className="mr-2 h-4 w-4" />Nochmal</Button>
            <Button variant="outline" className="flex-1" onClick={() => setQuizState("setup")}>Einstellungen</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
