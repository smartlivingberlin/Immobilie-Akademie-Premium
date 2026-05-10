import { useParams, useLocation } from "wouter";
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  XCircle, 
  Clock, 
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  RotateCcw,
  Home,
  Loader2,
  Download
} from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function ExamResults() {
  const params = useParams<{ sessionId: string }>();
  const [, setLocation] = useLocation();
  const sessionId = parseInt(params.sessionId || "0");
  const [isGeneratingPDF, setIsGeneratingPDF] = React.useState(false);
  const [isGeneratingCertificate, setIsGeneratingCertificate] = React.useState(false);

  const generatePDF = trpc.pdf.generateExamResultPDF.useMutation();
  const generateCertificate = trpc.certificate.generateCertificate.useMutation();

  const { data: sessionData, isLoading } = trpc.exam.getSession.useQuery({ sessionId });
  const { data: existingCertificate } = trpc.certificate.getCertificateByExamSession.useQuery(
    { examSessionId: sessionId },
    { enabled: !!sessionData && sessionData.session.score >= 70 }
  );
  const { data: weakTopics } = trpc.exam.getWeakTopics.useQuery({ 
    moduleId: sessionData?.session.moduleId 
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600">Ergebnisse werden geladen...</p>
        </div>
      </div>
    );
  }

  if (!sessionData || sessionData.session.status !== "completed") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <XCircle className="w-5 h-5" />
              Prüfung nicht abgeschlossen
            </CardTitle>
            <CardDescription>
              Diese Prüfung wurde noch nicht abgeschlossen.
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

  const { session, questions } = sessionData;
  const passed = session.score >= 70;
  const correctCount = questions.filter(q => q.isCorrect).length;
  const incorrectCount = questions.filter(q => !q.isCorrect).length;
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} Min ${secs} Sek`;
  };

  // Group incorrect questions by topic
  const incorrectByTopic = questions
    .filter(q => !q.isCorrect && q.topic)
    .reduce((acc: Record<string, typeof questions>, q) => {
      const topic = q.topic || "Sonstiges";
      if (!acc[topic]) acc[topic] = [];
      acc[topic].push(q);
      return acc;
    }, {} as Record<string, typeof questions>);

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
            passed ? "bg-green-100" : "bg-red-100"
          }`}>
            {passed ? (
              <Trophy className="w-10 h-10 text-green-600" />
            ) : (
              <XCircle className="w-10 h-10 text-red-600" />
            )}
          </div>
          <h1 className={`text-4xl font-bold mb-2 ${passed ? "text-green-900" : "text-red-900"}`}>
            {passed ? "Herzlichen Glückwunsch!" : "Leider nicht bestanden"}
          </h1>
          <p className="text-sm text-slate-500 mt-2">Quiz bestanden ab 50% | Zertifikat wird ab 70% ausgestellt</p>
          <p className="text-lg text-slate-600">
            {passed 
              ? "Sie haben die Prüfung erfolgreich bestanden!" 
              : "Sie benötigen mindestens 70% zum Bestehen."}
          </p>
        </div>

        {/* Score Card */}
        <Card className={`mb-8 ${passed ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
          <CardHeader>
            <CardTitle className={`text-center text-5xl font-bold ${passed ? "text-green-900" : "text-red-900"}`}>
              {session.score}%
            </CardTitle>
            <CardDescription className="text-center text-lg">
              {correctCount} von {session.totalQuestions} Fragen richtig beantwortet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress 
              value={session.score} 
              className={`h-4 ${passed ? "[&>div]:bg-green-600" : "[&>div]:bg-red-600"}`}
            />
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Richtige Antworten</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{correctCount}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((correctCount / session.totalQuestions) * 100)}% der Fragen
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Falsche Antworten</CardTitle>
              <XCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">{incorrectCount}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((incorrectCount / session.totalQuestions) * 100)}% der Fragen
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bearbeitungszeit</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{formatTime(session.timeSpent)}</div>
              <p className="text-xs text-muted-foreground">
                Ø {Math.round(session.timeSpent / session.totalQuestions)} Sek/Frage
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Weak Topics Analysis */}
        {Object.keys(incorrectByTopic).length > 0 && (
          <Card className="mb-8 border-orange-200 bg-orange-50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <CardTitle className="text-orange-900">Wissenslücken-Analyse</CardTitle>
              </div>
              <CardDescription className="text-orange-700">
                Folgende Themenbereiche sollten Sie noch einmal vertiefen:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(incorrectByTopic).map(([topic, topicQuestions]) => (
                  <div key={topic} className="bg-white rounded-lg p-4 border border-orange-200">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-orange-900">{topic}</h3>
                      <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300">
                        {topicQuestions.length} {topicQuestions.length === 1 ? "Fehler" : "Fehler"}
                      </Badge>
                    </div>
                    <Progress 
                      value={(topicQuestions.length / incorrectCount) * 100} 
                      className="h-2 [&>div]:bg-orange-500"
                    />
                    <p className="text-sm text-orange-700 mt-2">
                      {Math.round((topicQuestions.length / incorrectCount) * 100)}% Ihrer Fehler
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Overall Weak Topics */}
        {weakTopics && weakTopics.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <CardTitle>Gesamtübersicht Ihrer Schwachstellen</CardTitle>
              </div>
              <CardDescription>
                Basierend auf allen bisherigen Prüfungen in diesem Modul
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {weakTopics.slice(0, 15).map((topic) => (
                  <Badge 
                    key={topic.id} 
                    variant="outline" 
                    className="bg-slate-100 border-slate-300 text-slate-800"
                  >
                    {topic.topic} ({topic.incorrectCount}x)
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Certificate Button (only for passed exams) */}
          {passed && (
            <Button
              size="lg"
              variant="default"
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={async () => {
                setIsGeneratingCertificate(true);
                try {
                  const result = await generateCertificate.mutateAsync({ examSessionId: sessionId });
                  
                  if (result.success && "pdfUrl" in result && result.pdfUrl) {
                    // Open certificate in new tab
                    window.open(result.pdfUrl, '_blank');
                  } else {
                    alert(("message" in result ? result.message : undefined) || 'Zertifikat konnte nicht erstellt werden.');
                  }
                } catch (error) {
                  console.error('Certificate generation failed:', error);
                  alert('Zertifikatsgenerierung fehlgeschlagen. Bitte versuchen Sie es erneut.');
                } finally {
                  setIsGeneratingCertificate(false);
                }
              }}
              disabled={isGeneratingCertificate}
            >
              {isGeneratingCertificate ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Zertifikat wird erstellt...
                </>
              ) : existingCertificate ? (
                <>
                  <Download className="mr-2 h-5 w-5" />
                  Zertifikat herunterladen
                </>
              ) : (
                <>
                  <Trophy className="mr-2 h-5 w-5" />
                  Zertifikat erstellen
                </>
              )}
            </Button>
          )}
          <Button
            size="lg"
            variant="default"
            onClick={async () => {
              setIsGeneratingPDF(true);
              try {
                const result = await generatePDF.mutateAsync({ sessionId });
                
                // Convert base64 to blob and download
                const byteCharacters = atob(result.pdf);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                  byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], { type: 'application/pdf' });
                
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = result.filename;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
              } catch (error) {
                console.error('PDF generation failed:', error);
                alert('PDF-Generierung fehlgeschlagen. Bitte versuchen Sie es erneut.');
              } finally {
                setIsGeneratingPDF(false);
              }
            }}
            disabled={isGeneratingPDF}
          >
            {isGeneratingPDF ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                PDF wird erstellt...
              </>
            ) : (
              <>
                <Download className="mr-2 h-5 w-5" />
                Ergebnis als PDF
              </>
            )}
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => setLocation("/pruefung")}
          >
            <RotateCcw className="mr-2 h-5 w-5" />
            Neue Prüfung starten
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => setLocation("/")}
          >
            <Home className="mr-2 h-5 w-5" />
            Zurück zur Startseite
          </Button>
        </div>

        {/* Recommendations */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">Empfehlungen</CardTitle>
          </CardHeader>
          <CardContent className="text-blue-800 space-y-2">
            {passed ? (
              <>
                <p>✓ Glückwunsch! Sie haben die Prüfung bestanden.</p>
                <p>✓ Wiederholen Sie schwache Themenbereiche zur Festigung.</p>
                <p>✓ Nutzen Sie den KI-Tutor für vertiefende Fragen.</p>
              </>
            ) : (
              <>
                <p>• Wiederholen Sie die Lerninhalte der identifizierten Schwachstellen.</p>
                <p>• Nutzen Sie den KI-Tutor für gezielte Fragen zu schwierigen Themen.</p>
                <p>• Bearbeiten Sie die Quizze der entsprechenden Tage erneut.</p>
                <p>• Versuchen Sie die Prüfung nach gründlicher Wiederholung erneut.</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
