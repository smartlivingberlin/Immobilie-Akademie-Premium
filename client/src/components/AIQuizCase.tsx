import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, CheckCircle2, XCircle, Brain, Lightbulb } from "lucide-react";
import { trpc } from "@/lib/trpc";

export interface QuizCase {
  id: string;
  title: string;
  category: string;
  difficulty: "Einsteiger" | "Fortgeschritten" | "Experte";
  scenario: string;
  question: string;
  legalContext: string[];
  correctAnswer: string;
  commonMistakes: string[];
  learningPoints: string[];
}

interface AIQuizCaseProps {
  quizCase: QuizCase;
  onComplete?: (correct: boolean) => void;
}

export function AIQuizCase({ quizCase, onComplete }: AIQuizCaseProps) {
  const [userAnswer, setUserAnswer] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [evaluation, setEvaluation] = useState<{
    isCorrect: boolean;
    feedback: string;
    score: number;
  } | null>(null);

  const evaluateMutation = trpc.aiAssistant.evaluateQuizAnswer.useMutation({
    onSuccess: (data) => {
      setEvaluation(data);
      setIsSubmitted(true);
      if (onComplete) {
        onComplete(data.isCorrect);
      }
    },
  });

  const handleSubmit = () => {
    if (!userAnswer.trim()) return;
    
    evaluateMutation.mutate({
      caseId: quizCase.id,
      userAnswer: userAnswer.trim(),
      correctAnswer: quizCase.correctAnswer,
      legalContext: quizCase.legalContext,
      question: quizCase.question,
    });
  };

  const handleReset = () => {
    setUserAnswer("");
    setIsSubmitted(false);
    setEvaluation(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Einsteiger":
        return "bg-green-100 text-green-800 border-green-300";
      case "Fortgeschritten":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "Experte":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="h-5 w-5 text-blue-600" />
              <Badge variant="outline" className={getDifficultyColor(quizCase.difficulty)}>
                {quizCase.difficulty}
              </Badge>
              <Badge variant="secondary">{quizCase.category}</Badge>
            </div>
            <CardTitle className="text-xl">{quizCase.title}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Scenario */}
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Sachverhalt
          </h4>
          <p className="text-slate-700 leading-relaxed">{quizCase.scenario}</p>
        </div>

        {/* Question */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-2">Aufgabe</h4>
          <p className="text-blue-800 font-medium">{quizCase.question}</p>
        </div>

        {/* Legal Context */}
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <h4 className="font-semibold text-purple-900 mb-2">Relevante Rechtsgrundlagen</h4>
          <ul className="list-disc list-inside space-y-1">
            {quizCase.legalContext.map((law, idx) => (
              <li key={idx} className="text-purple-800 text-sm">
                {law}
              </li>
            ))}
          </ul>
        </div>

        {/* Answer Input */}
        {!isSubmitted && (
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">
              Ihre Antwort:
            </label>
            <Textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Geben Sie Ihre Antwort ein. Begründen Sie Ihre Entscheidung mit Bezug auf die relevanten Rechtsgrundlagen..."
              rows={6}
              className="w-full"
              disabled={evaluateMutation.isPending}
            />
            <Button
              onClick={handleSubmit}
              disabled={!userAnswer.trim() || evaluateMutation.isPending}
              className="w-full"
            >
              {evaluateMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  KI-Bewertung läuft...
                </>
              ) : (
                <>
                  <Brain className="mr-2 h-4 w-4" />
                  Antwort von KI bewerten lassen
                </>
              )}
            </Button>
          </div>
        )}

        {/* Evaluation Result */}
        {isSubmitted && evaluation && (
          <div className="space-y-4">
            <Alert className={evaluation.isCorrect ? "border-green-500 bg-green-50" : "border-orange-500 bg-orange-50"}>
              <div className="flex items-start gap-3">
                {evaluation.isCorrect ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                ) : (
                  <XCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                )}
                <div className="flex-1">
                  <h4 className={`font-semibold mb-2 ${evaluation.isCorrect ? "text-green-900" : "text-orange-900"}`}>
                    {evaluation.isCorrect ? "Richtig!" : "Teilweise richtig"} (Bewertung: {evaluation.score}/100)
                  </h4>
                  <AlertDescription className={evaluation.isCorrect ? "text-green-800" : "text-orange-800"}>
                    {evaluation.feedback}
                  </AlertDescription>
                </div>
              </div>
            </Alert>

            {/* Correct Answer */}
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">Musterlösung</h4>
              <p className="text-green-800 leading-relaxed">{quizCase.correctAnswer}</p>
            </div>

            {/* Learning Points */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">Lernpunkte</h4>
              <ul className="list-disc list-inside space-y-1">
                {quizCase.learningPoints.map((point, idx) => (
                  <li key={idx} className="text-blue-800 text-sm">
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Common Mistakes */}
            {quizCase.commonMistakes.length > 0 && (
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-900 mb-2">Häufige Fehler</h4>
                <ul className="list-disc list-inside space-y-1">
                  {quizCase.commonMistakes.map((mistake, idx) => (
                    <li key={idx} className="text-yellow-800 text-sm">
                      {mistake}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Button onClick={handleReset} variant="outline" className="w-full">
              Nächster Fall
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
