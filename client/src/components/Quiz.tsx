import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Trophy, 
  RotateCcw, 
  BookOpen,
  Award,
  Target
} from "lucide-react";
import { getQuizForModule, calculateQuizScore, type QuizQuestion, type ModuleQuiz } from "@/data/quiz-data";
import { LawLink } from "@/components/LawLink";

interface QuizProps {
  moduleId: number;
  onComplete?: (score: number, percentage: number, passed: boolean) => void;
}

export function Quiz({ moduleId, onComplete }: QuizProps) {
  const [quizData, setQuizData] = useState<ModuleQuiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizResult, setQuizResult] = useState<{
    score: number;
    percentage: number;
    passed: boolean;
    passingScore: number;
  } | null>(null);

  useEffect(() => {
    const quiz = getQuizForModule(moduleId);
    if (quiz) {
      setQuizData(quiz);
      setUserAnswers(new Array(quiz.questions.length).fill(-1));
    }
  }, [moduleId]);

  if (!quizData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Quiz nicht gefunden</CardTitle>
          <CardDescription>
            Für dieses Modul ist kein Quiz verfügbar.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const currentQuestion: QuizQuestion = quizData.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quizData.questions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    if (!showExplanation) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = selectedAnswer;
    setUserAnswers(newUserAnswers);
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // Quiz completed
      const correctAnswers = quizData.questions.map((q) => q.correctAnswer);
      const result = calculateQuizScore(userAnswers, correctAnswers);
      setQuizResult(result);
      setQuizCompleted(true);

      // Save to localStorage
      const quizHistory = JSON.parse(localStorage.getItem("quizHistory") || "{}");
      quizHistory[`module${moduleId}`] = {
        ...result,
        date: new Date().toISOString(),
        moduleId,
        moduleName: quizData.moduleName,
      };
      localStorage.setItem("quizHistory", JSON.stringify(quizHistory));

      if (onComplete) {
        onComplete(result.score, result.percentage, result.passed);
      }
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers(new Array(quizData.questions.length).fill(-1));
    setSelectedAnswer(null);
    setShowExplanation(false);
    setQuizCompleted(false);
    setQuizResult(null);
  };

  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  if (quizCompleted && quizResult) {
    return (
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {quizResult.passed ? (
              <div className="bg-green-100 p-4 rounded-full">
                <Trophy className="w-16 h-16 text-green-600" />
              </div>
            ) : (
              <div className="bg-orange-100 p-4 rounded-full">
                <Target className="w-16 h-16 text-orange-600" />
              </div>
            )}
          </div>
          <CardTitle className="text-3xl">
            {quizResult.passed ? "Bestanden! 🎉" : "Noch nicht bestanden"}
          </CardTitle>
          <CardDescription className="text-lg mt-2">
            {quizData.moduleName}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Score Overview */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-slate-50 p-4 rounded-lg">
              <div className="text-3xl font-bold text-slate-900">{quizResult.score}</div>
              <div className="text-sm text-slate-600">Richtige Antworten</div>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">{quizResult.percentage}%</div>
              <div className="text-sm text-slate-600">Erfolgsquote</div>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <div className="text-3xl font-bold text-green-600">{quizResult.passingScore}%</div>
              <div className="text-sm text-slate-600">Erforderlich</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-slate-600">
              <span>Fortschritt</span>
              <span>{quizResult.percentage}% von {quizResult.passingScore}%</span>
            </div>
            <Progress value={quizResult.percentage} className="h-3" />
          </div>

          {/* Result Message */}
          <div className={`p-4 rounded-lg ${quizResult.passed ? "bg-green-50 border border-green-200" : "bg-orange-50 border border-orange-200"}`}>
            <div className="flex items-start gap-3">
              {quizResult.passed ? (
                <Award className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <h3 className={`font-semibold mb-1 ${quizResult.passed ? "text-green-900" : "text-orange-900"}`}>
                  {quizResult.passed ? "Glückwunsch!" : "Weiter üben"}
                </h3>
                <p className={`text-sm ${quizResult.passed ? "text-green-700" : "text-orange-700"}`}>
                  {quizResult.passed
                    ? `Sie haben das Quiz mit ${quizResult.percentage}% bestanden. Sie können nun das Zertifikat für dieses Modul herunterladen.`
                    : `Sie haben ${quizResult.percentage}% erreicht. Zum Bestehen sind ${quizResult.passingScore}% erforderlich. Wiederholen Sie das Quiz, um Ihre Kenntnisse zu vertiefen.`}
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Results */}
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900">Detaillierte Ergebnisse</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {quizData.questions.map((question, index) => {
                const userAnswer = userAnswers[index];
                const isCorrect = userAnswer === question.correctAnswer;
                return (
                  <div
                    key={question.id}
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      isCorrect ? "bg-green-50" : "bg-red-50"
                    }`}
                  >
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">
                        Frage {index + 1}: {question.question}
                      </p>
                      {!isCorrect && (
                        <p className="text-xs text-slate-600 mt-1">
                          Richtig: {question.options[question.correctAnswer]}
                        </p>
                      )}
                    </div>
                    <Badge variant={isCorrect ? "default" : "destructive"} className="flex-shrink-0">
                      {isCorrect ? "Richtig" : "Falsch"}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button onClick={handleRestartQuiz} variant="outline" className="flex-1">
              <RotateCcw className="w-4 h-4 mr-2" />
              Quiz wiederholen
            </Button>
            <Button onClick={() => window.history.back()} className="flex-1">
              <BookOpen className="w-4 h-4 mr-2" />
              Zurück zum Modul
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline">
            Frage {currentQuestionIndex + 1} von {quizData.questions.length}
          </Badge>
          {currentQuestion.difficulty && (
            <Badge variant={currentQuestion.difficulty === "easy" ? "default" : currentQuestion.difficulty === "medium" ? "secondary" : "destructive"}>
              {currentQuestion.difficulty === "easy" ? "Leicht" : currentQuestion.difficulty === "medium" ? "Mittel" : "Schwer"}
            </Badge>
          )}
        </div>
        <Progress value={progress} className="h-2 mb-4" />
        <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
        {currentQuestion.category && (
          <CardDescription>Kategorie: {currentQuestion.category}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Answer Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectAnswer = index === currentQuestion.correctAnswer;
            const showCorrect = showExplanation && isCorrectAnswer;
            const showIncorrect = showExplanation && isSelected && !isCorrectAnswer;

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showExplanation}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  showCorrect
                    ? "border-green-500 bg-green-50"
                    : showIncorrect
                    ? "border-red-500 bg-red-50"
                    : isSelected
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                } ${showExplanation ? "cursor-not-allowed" : "cursor-pointer"}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center font-semibold ${
                      showCorrect
                        ? "border-green-500 bg-green-500 text-white"
                        : showIncorrect
                        ? "border-red-500 bg-red-500 text-white"
                        : isSelected
                        ? "border-blue-500 bg-blue-500 text-white"
                        : "border-slate-300 text-slate-600"
                    }`}
                  >
                    {showCorrect ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : showIncorrect ? (
                      <XCircle className="w-5 h-5" />
                    ) : (
                      String.fromCharCode(65 + index)
                    )}
                  </div>
                  <span className={`flex-1 ${showExplanation ? "font-medium" : ""}`}>
                    {option}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className={`p-4 rounded-lg border-2 ${isCorrect ? "border-green-500 bg-green-50" : "border-orange-500 bg-orange-50"}`}>
            <div className="flex items-start gap-3 mb-3">
              {isCorrect ? (
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <h3 className={`font-semibold mb-1 ${isCorrect ? "text-green-900" : "text-orange-900"}`}>
                  {isCorrect ? "Richtig!" : "Leider falsch"}
                </h3>
                <p className={`text-sm ${isCorrect ? "text-green-700" : "text-orange-700"}`}>
                  {currentQuestion.explanation}
                </p>
              </div>
            </div>
            {currentQuestion.lawReference && (
              <div className="mt-3 pt-3 border-t border-slate-200">
                <p className="text-xs text-slate-600 mb-1">Gesetzliche Grundlage:</p>
                <LawLink law={currentQuestion.lawReference} className="text-sm" />
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          {!showExplanation ? (
            <Button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className="w-full"
            >
              Antwort prüfen
            </Button>
          ) : (
            <Button onClick={handleNextQuestion} className="w-full">
              {currentQuestionIndex < quizData.questions.length - 1
                ? "Nächste Frage"
                : "Quiz abschließen"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
