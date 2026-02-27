import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, AlertCircle, RefreshCw, Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CertificateGenerator } from "./CertificateGenerator";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option (0-based)
  explanation: string;
}

interface ModuleQuizProps {
  moduleTitle?: string;
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
  passingScore?: number; // Percentage required to pass (default: 70)
}

export function ModuleQuiz({ moduleTitle = "Modul Quiz", questions, onComplete, passingScore = 70 }: ModuleQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const { toast } = useToast();

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / questions.length) * 100;

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;

    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
      toast({
        title: "Richtig!",
        description: "Das war die korrekte Antwort.",
        variant: "default",
      });
    } else {
      toast({
        title: "Leider falsch",
        description: "Schauen Sie sich die Erklärung an.",
        variant: "destructive",
      });
    }
    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
      // Calculate final score including the last answer if it was correct (though state update is async, score here is from render scope)
      // The score state is updated in handleSubmitAnswer, which runs BEFORE handleNextQuestion.
      // However, due to closure, 'score' variable here might be stale if called in same render cycle?
      // No, handleNextQuestion is triggered by button click, which is a separate event. 
      // So 'score' should be up to date from the last render.
      
      const finalScorePercent = Math.round((score / questions.length) * 100);
      onComplete(finalScorePercent);
    }
  };
  
  const finalScorePercent = Math.round((score / questions.length) * 100);
  const isPassed = finalScorePercent >= passingScore;

  if (showResult) {
    return (
      <Card className="w-full border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-800">
        <CardHeader className="text-center">
          <div className={`mx-auto p-4 rounded-full w-20 h-20 flex items-center justify-center mb-4 ${isPassed ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
            {isPassed ? <Trophy className="w-10 h-10" /> : <AlertCircle className="w-10 h-10" />}
          </div>
          <CardTitle className="text-2xl">Quiz beendet</CardTitle>
          <CardDescription>
            Sie haben {score} von {questions.length} Fragen richtig beantwortet.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>Ergebnis: {finalScorePercent}%</span>
              <span>Benötigt: {passingScore}%</span>
            </div>
            <Progress value={finalScorePercent} className={`h-3 ${isPassed ? "bg-green-100" : "bg-red-100"}`} />
          </div>
          
          <div className="text-center">
            {isPassed ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
                <h4 className="font-bold mb-2">Herzlichen Glückwunsch!</h4>
                <p>Sie haben das Modul erfolgreich bestanden und können nun Ihr Zertifikat abrufen.</p>
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
                <h4 className="font-bold mb-2">Nicht bestanden</h4>
                <p>Bitte wiederholen Sie die Lektionen und versuchen Sie es erneut.</p>
              </div>
            )}
          </div>

          {isPassed && (
            <div className="mt-6 flex justify-center">
               <CertificateGenerator 
                  moduleName={moduleTitle}
                  userName="Max Mustermann"
                  completionDate={new Date().toLocaleDateString("de-DE")}
                  isCompleted={true}
                  score={finalScorePercent}
                />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          {!isPassed && (
             <Button onClick={() => window.location.reload()} variant="outline" className="gap-2">
               <RefreshCw className="w-4 h-4" /> Quiz wiederholen
             </Button>
          )}
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full border-slate-200 shadow-md">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-slate-500 font-medium">Frage {currentQuestionIndex + 1} von {questions.length}</span>
          <span className="text-sm text-blue-600 font-bold">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
        <CardTitle className="mt-4 text-xl">{currentQuestion.question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup value={selectedOption?.toString()} onValueChange={(val) => handleOptionSelect(parseInt(val))}>
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              let itemClass = "flex items-center space-x-3 space-y-0 rounded-md border p-4 cursor-pointer transition-all hover:bg-slate-50";
              
              if (isAnswered) {
                if (index === currentQuestion.correctAnswer) {
                  itemClass = "flex items-center space-x-3 space-y-0 rounded-md border border-green-500 bg-green-50 cursor-default";
                } else if (index === selectedOption && index !== currentQuestion.correctAnswer) {
                  itemClass = "flex items-center space-x-3 space-y-0 rounded-md border border-red-500 bg-red-50 cursor-default";
                } else {
                  itemClass = "flex items-center space-x-3 space-y-0 rounded-md border p-4 opacity-50 cursor-default";
                }
              } else if (selectedOption === index) {
                itemClass = "flex items-center space-x-3 space-y-0 rounded-md border-2 border-blue-500 bg-blue-50 cursor-pointer";
              }

              return (
                <div key={index} className={itemClass} onClick={() => handleOptionSelect(index)}>
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} disabled={isAnswered} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer font-normal text-base">
                    {option}
                  </Label>
                  {isAnswered && index === currentQuestion.correctAnswer && (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  )}
                  {isAnswered && index === selectedOption && index !== currentQuestion.correctAnswer && (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                </div>
              );
            })}
          </div>
        </RadioGroup>

        {isAnswered && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg animate-in fade-in-50 slide-in-from-top-2">
            <h4 className="font-semibold text-blue-900 mb-1 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" /> Erklärung
            </h4>
            <p className="text-blue-800 text-sm">{currentQuestion.explanation}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-slate-50/50 border-t p-6">
        {!isAnswered ? (
          <Button 
            className="w-full sm:w-auto ml-auto" 
            onClick={handleSubmitAnswer} 
            disabled={selectedOption === null}
          >
            Antwort prüfen
          </Button>
        ) : (
          <Button 
            className="w-full sm:w-auto ml-auto" 
            onClick={handleNextQuestion}
          >
            {currentQuestionIndex < questions.length - 1 ? "Nächste Frage" : "Ergebnis anzeigen"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
