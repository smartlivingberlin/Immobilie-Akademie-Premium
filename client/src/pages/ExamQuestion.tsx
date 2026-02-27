import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  Loader2,
  AlertCircle,
  AlertTriangle
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Streamdown } from "streamdown";

export default function ExamQuestion() {
  const params = useParams<{ sessionId: string }>();
  const [, setLocation] = useLocation();
  const sessionId = parseInt(params.sessionId || "0");

  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; correctAnswer: string; feedback: string | null } | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [questionData, setQuestionData] = useState<any>(null);

  const { data: session, isLoading } = trpc.exam.getSession.useQuery({ sessionId });
  
  const generateQuestionMutation = trpc.exam.generateQuestion.useMutation({
    onSuccess: (data) => {
      setQuestionData(data);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setFeedback(null);
    },
  });

  const submitAnswerMutation = trpc.exam.submitAnswer.useMutation({
    onSuccess: (data) => {
      setFeedback(data);
      setShowFeedback(true);
    },
  });

  const completeExamMutation = trpc.exam.completeExam.useMutation({
    onSuccess: () => {
      setLocation(`/pruefung/${sessionId}/ergebnis`);
    },
  });

  // Determine if this is IHK mode and get time limit
  const isIHKMode = session?.session.isIHKMode || false;
  const timeLimit = session?.session.timeLimit || 1800; // Default 30 min
  const totalQuestions = session?.session.totalQuestions || 50;

  // Timer - counts up for normal mode, counts down for IHK mode
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prev) => {
        const newTime = prev + 1;
        
        // Auto-submit when time runs out in IHK mode
        if (isIHKMode && newTime >= timeLimit) {
          completeExamMutation.mutate({
            sessionId,
            timeSpent: timeLimit,
          });
          return timeLimit;
        }
        
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isIHKMode, timeLimit]);

  // Generate first question
  useEffect(() => {
    if (session && !questionData && currentQuestion <= totalQuestions) {
      generateQuestionMutation.mutate({
        sessionId,
        questionNumber: currentQuestion,
        moduleId: session.session.moduleId,
        difficulty: session.session.difficulty || "medium",
      });
    }
  }, [session, questionData, currentQuestion, totalQuestions]);

  const handleAnswerSelect = (answer: string) => {
    if (!showFeedback) {
      setSelectedAnswer(answer);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer && questionData) {
      // In IHK mode, just save the answer without showing feedback
      if (isIHKMode) {
        submitAnswerMutation.mutate({
          questionId: questionData.id,
          userAnswer: selectedAnswer,
        });
        // Immediately move to next question without showing feedback
        setTimeout(() => {
          handleNextQuestion();
        }, 500);
      } else {
        // Normal mode: show feedback
        submitAnswerMutation.mutate({
          questionId: questionData.id,
          userAnswer: selectedAnswer,
        });
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
      setQuestionData(null);
    } else {
      // Complete exam
      completeExamMutation.mutate({
        sessionId,
        timeSpent: timeElapsed,
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const formatCountdown = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getTimerColor = () => {
    if (!isIHKMode) return "text-slate-700";
    
    const remaining = timeLimit - timeElapsed;
    if (remaining <= 600) return "text-red-600"; // Last 10 minutes
    if (remaining <= 1800) return "text-yellow-600"; // Last 30 minutes
    return "text-green-600";
  };

  const getTimerBgColor = () => {
    if (!isIHKMode) return "bg-slate-100";
    
    const remaining = timeLimit - timeElapsed;
    if (remaining <= 600) return "bg-red-50 border-red-200"; // Last 10 minutes
    if (remaining <= 1800) return "bg-yellow-50 border-yellow-200"; // Last 30 minutes
    return "bg-green-50 border-green-200";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600">Prüfung wird geladen...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertCircle className="w-5 h-5" />
              Prüfung nicht gefunden
            </CardTitle>
            <CardDescription>
              Die angeforderte Prüfung konnte nicht geladen werden.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setLocation("/pruefung")}>
              Zurück zur Übersicht
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const progress = (currentQuestion / totalQuestions) * 100;
  const timeRemaining = isIHKMode ? timeLimit - timeElapsed : 0;

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-slate-900">
                  Modul {session.session.moduleId} - Prüfung
                </h1>
                {isIHKMode && (
                  <Badge variant="default" className="bg-blue-600 text-white">
                    IHK-Simulation
                  </Badge>
                )}
              </div>
              <p className="text-slate-600">
                Frage {currentQuestion} von {totalQuestions}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Card className={`${getTimerBgColor()} border-2`}>
                <CardContent className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <Clock className={`w-5 h-5 ${getTimerColor()}`} />
                    <div className="text-right">
                      {isIHKMode ? (
                        <>
                          <div className={`text-2xl font-bold ${getTimerColor()}`}>
                            {formatCountdown(timeRemaining)}
                          </div>
                          <div className="text-xs text-slate-600">verbleibend</div>
                        </>
                      ) : (
                        <>
                          <div className="text-xl font-semibold text-slate-700">
                            {formatTime(timeElapsed)}
                          </div>
                          <div className="text-xs text-slate-600">vergangen</div>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Time warning for IHK mode */}
          {isIHKMode && timeRemaining <= 1800 && timeRemaining > 0 && (
            <Card className="mb-4 bg-yellow-50 border-yellow-200">
              <CardContent className="py-3">
                <div className="flex items-center gap-2 text-yellow-800">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {timeRemaining <= 600 
                      ? "⚠️ Nur noch 10 Minuten verbleibend!" 
                      : "⏰ Weniger als 30 Minuten verbleibend"}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}
          
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        {generateQuestionMutation.isPending ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-slate-600">Frage wird generiert...</p>
            </CardContent>
          </Card>
        ) : questionData ? (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-xl leading-relaxed">
                {questionData.question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(questionData.options).map(([key, value]) => {
                  const isSelected = selectedAnswer === key;
                  const isCorrect = feedback?.correctAnswer === key;
                  const isWrong = showFeedback && isSelected && !feedback?.isCorrect;

                  return (
                    <button
                      key={key}
                      onClick={() => handleAnswerSelect(key)}
                      disabled={showFeedback}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        showFeedback
                          ? isCorrect
                            ? "border-green-500 bg-green-50"
                            : isWrong
                            ? "border-red-500 bg-red-50"
                            : "border-slate-200 bg-white"
                          : isSelected
                          ? "border-blue-500 bg-blue-50"
                          : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="font-bold text-lg text-slate-700 min-w-[2rem]">
                          {key})
                        </span>
                        <span className="flex-1 text-slate-900">{value as string}</span>
                        {showFeedback && isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                        )}
                        {showFeedback && isWrong && (
                          <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Feedback - Only shown in normal mode */}
              {!isIHKMode && showFeedback && feedback && (
                <Card className={`mt-6 ${feedback.isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
                  <CardHeader>
                    <CardTitle className={`flex items-center gap-2 ${feedback.isCorrect ? "text-green-900" : "text-red-900"}`}>
                      {feedback.isCorrect ? (
                        <>
                          <CheckCircle2 className="w-5 h-5" />
                          Richtig!
                        </>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5" />
                          Leider falsch
                        </>
                      )}
                    </CardTitle>
                  </CardHeader>
                  {feedback.feedback && (
                    <CardContent className={feedback.isCorrect ? "text-green-800" : "text-red-800"}>
                      <Streamdown>{feedback.feedback}</Streamdown>
                    </CardContent>
                  )}
                </Card>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 mt-6">
                {!showFeedback ? (
                  <Button
                    onClick={handleSubmitAnswer}
                    disabled={!selectedAnswer || submitAnswerMutation.isPending}
                    size="lg"
                  >
                    {submitAnswerMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {isIHKMode ? "Wird gespeichert..." : "Wird geprüft..."}
                      </>
                    ) : isIHKMode ? (
                      currentQuestion < totalQuestions ? (
                        <>
                          Nächste Frage
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      ) : (
                        "Prüfung abschließen"
                      )
                    ) : (
                      "Antwort überprüfen"
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={handleNextQuestion}
                    disabled={completeExamMutation.isPending}
                    size="lg"
                  >
                    {currentQuestion < totalQuestions ? (
                      <>
                        Nächste Frage
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    ) : completeExamMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Prüfung wird ausgewertet...
                      </>
                    ) : (
                      "Prüfung abschließen"
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  );
}
