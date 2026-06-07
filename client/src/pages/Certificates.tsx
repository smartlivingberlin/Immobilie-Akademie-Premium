import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  Award, 
  Download, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  TrendingUp,
  AlertCircle,
  FileCheck,
  ArrowRight,
} from "lucide-react";
import { 
  getProgress, 
  isModuleEligibleForCertificate, 
  getCertificateData 
} from "@/lib/progressTracking";
// certificateGenerator lazy geladen (enthält jsPDF)
import { useToast } from "@/hooks/use-toast";

export default function Certificates() {
  const [userName, setUserName] = useState("");
  const { toast } = useToast();
  const progress = getProgress();

  const modules = [
    { id: 1, name: "Modul 1: Einführung in die Immobilienwirtschaft", days: 20, color: "bg-blue-500" },
    { id: 2, name: "Modul 2: Immobilienmakler §34c GewO", days: 60, color: "bg-purple-500" },
    { id: 3, name: "Modul 3: WEG- und Mietverwaltung", days: 80, color: "bg-emerald-500" },
    { id: 4, name: "Modul 4: Gutachten & Sachverständiger", days: 40, color: "bg-orange-500" },
    { id: 5, name: "Modul 5: Darlehensvermittlung §34i GewO", days: 40, color: "bg-pink-500" },
  ];

  const handleDownloadCertificate = async (moduleId: number) => {
    if (!userName.trim()) {
      toast({
        title: "Name erforderlich",
        description: "Bitte geben Sie Ihren Namen ein, um das Zertifikat zu generieren.",
        variant: "destructive",
      });
      return;
    }

    const certificateData = getCertificateData(moduleId);
    if (!certificateData) {
      toast({
        title: "Zertifikat nicht verfügbar",
        description: "Sie erfüllen noch nicht alle Voraussetzungen für dieses Zertifikat.",
        variant: "destructive",
      });
      return;
    }

    try {
      (await import("@/lib/certificateGenerator")).generateCertificatePDF({
        userName: userName.trim(),
        certificateData,
      });

      toast({
        title: "Zertifikat erstellt",
        description: "Ihr Zertifikat wurde erfolgreich heruntergeladen.",
      });
    } catch (error) {
      console.error("Error generating certificate:", error);
      toast({
        title: "Fehler",
        description: "Beim Erstellen des Zertifikats ist ein Fehler aufgetreten.",
        variant: "destructive",
      });
    }
  };

  const getModuleStats = (moduleId: number) => {
    const module = progress.modules[moduleId];
    if (!module) {
      return {
        completionPercentage: 0,
        daysCompleted: 0,
        totalDays: modules.find(m => m.id === moduleId)?.days || 0,
        timeSpent: 0,
        eligible: false,
      };
    }

    const totalDays = modules.find(m => m.id === moduleId)?.days || 0;
    const daysCompleted = Object.values(module.days).filter(d => d.completed).length;

    return {
      completionPercentage: module.completionPercentage,
      daysCompleted,
      totalDays,
      timeSpent: Math.round(module.totalTimeSpent / 60), // Convert to hours
      eligible: isModuleEligibleForCertificate(moduleId),
    };
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <Award className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-slate-900">Zertifikate</h1>
        </div>
        <p className="text-slate-600">
          Laden Sie Ihre Teilnahmezertifikate für erfolgreich abgeschlossene Module herunter.
        </p>
      </div>

      <Card className="border-blue-200 bg-blue-50/50">
        <CardContent className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <FileCheck className="h-8 w-8 text-blue-600 flex-shrink-0" />
            <div>
              <h2 className="font-semibold text-slate-900">§34c Weiterbildungsnachweis</h2>
              <p className="text-sm text-slate-600 mt-1">
                Serverseitig protokollierte Lernzeit als PDF — Grundlage für Ihre 20-Stunden-Pflicht nach §15b MaBV.
              </p>
            </div>
          </div>
          <Link href="/weiterbildungsnachweis">
            <Button className="flex-shrink-0">
              Nachweis öffnen <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* User Name Input */}
      <Card>
        <CardHeader>
          <CardTitle>Ihre Daten</CardTitle>
          <CardDescription>
            Geben Sie Ihren Namen ein, wie er auf den Zertifikaten erscheinen soll.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-w-md">
            <Label htmlFor="userName">Vollständiger Name</Label>
            <Input
              id="userName"
              type="text"
              placeholder="Max Mustermann"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="mt-2"
            />
            <p className="text-sm text-muted-foreground mt-2">
              Dieser Name wird auf allen Zertifikaten verwendet.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Gesamtfortschritt</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {progress.overallCompletionPercentage}%
                </p>
                <p className="text-sm text-slate-600">Gesamtfortschritt</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {Math.round(progress.totalTimeSpent / 60)}h
                </p>
                <p className="text-sm text-slate-600">Lernzeit gesamt</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {Object.keys(progress.modules).length}
                </p>
                <p className="text-sm text-slate-600">Aktive Module</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {modules.filter(m => isModuleEligibleForCertificate(m.id)).length}
                </p>
                <p className="text-sm text-slate-600">Zertifikate verfügbar</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Module Certificates */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Modulzertifikate</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {modules.map((module) => {
            const stats = getModuleStats(module.id);
            
            return (
              <Card key={module.id} className="relative overflow-hidden">
                {/* Color accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-2 ${module.color}`} />
                
                <CardHeader className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{module.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {stats.daysCompleted} von {stats.totalDays} Tagen abgeschlossen
                      </CardDescription>
                    </div>
                    {stats.eligible ? (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Verfügbar
                      </Badge>
                    ) : (
                      <Badge variant="secondary">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Nicht verfügbar
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Fortschritt</span>
                      <span className="font-semibold text-slate-900">
                        {stats.completionPercentage}%
                      </span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${module.color} transition-all duration-500`}
                        style={{ width: `${stats.completionPercentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-slate-600">Lernzeit</p>
                      <p className="font-semibold text-slate-900">{stats.timeSpent} Stunden</p>
                    </div>
                    <div>
                      <p className="text-slate-600">Abschluss</p>
                      <p className="font-semibold text-slate-900">
                        {stats.completionPercentage >= 80 ? "Ja" : "Nein"}
                      </p>
                    </div>
                  </div>

                  {/* Requirements */}
                  {!stats.eligible && (
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                      <p className="text-sm font-semibold text-slate-900 mb-2">
                        Voraussetzungen für Zertifikat:
                      </p>
                      <ul className="text-sm text-slate-600 space-y-1">
                        <li className="flex items-center gap-2">
                          {stats.completionPercentage >= 80 ? (
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border-2 border-slate-300" />
                          )}
                          Mindestens 80% Fortschritt
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full border-2 border-slate-300" />
                          50% der Lernkarten gemeistert
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full border-2 border-slate-300" />
                          Quiz mit mind. 60% bestanden
                        </li>
                      </ul>
                    </div>
                  )}

                  {/* Download Button */}
                  <Button
                    onClick={() => handleDownloadCertificate(module.id)}
                    disabled={!stats.eligible || !userName.trim()}
                    className="w-full"
                    variant={stats.eligible ? "default" : "secondary"}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {stats.eligible ? "Zertifikat herunterladen" : "Noch nicht verfügbar"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Info Box */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="p-2 bg-blue-100 rounded-lg">
                <AlertCircle className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-slate-900">Hinweise zu Zertifikaten</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• Zertifikate werden als PDF-Dateien heruntergeladen</li>
                <li>• Jedes Zertifikat enthält eine eindeutige Zertifikat-ID zur Verifizierung</li>
                <li>• Die Zertifikate bestätigen die erfolgreiche Teilnahme am Online-Lernprogramm</li>
                <li>• Für offizielle Abschlüsse wenden Sie sich bitte an eine anerkannte Bildungseinrichtung</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
