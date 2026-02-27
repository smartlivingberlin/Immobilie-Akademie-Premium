import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Download, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CertificateGeneratorProps {
  moduleName?: string;
  courseName?: string; // Alias for moduleName
  userName?: string;
  studentName?: string; // Alias for userName
  completionDate: string;
  isCompleted?: boolean;
  score?: number;
}

export function CertificateGenerator({ 
  moduleName, 
  courseName,
  userName, 
  studentName,
  completionDate, 
  isCompleted = true,
  score
}: CertificateGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  // Resolve props aliases
  const finalModuleName = moduleName || courseName || "Modul";
  const finalUserName = userName || studentName || "Teilnehmer";

  const handleDownload = () => {
    setIsGenerating(true);
    
    // Simulate PDF generation delay
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Zertifikat heruntergeladen",
        description: `Ihr Zertifikat für ${finalModuleName} wurde erfolgreich erstellt.`,
      });
      
      // In a real app, this would trigger a file download from the server or generate a client-side PDF
      // For now, we just show a success message
    }, 2000);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border-2 border-yellow-100 bg-gradient-to-br from-yellow-50 to-white dark:from-yellow-900/20 dark:to-background shadow-lg">
      <CardHeader className="text-center pb-2">
        <div className="mx-auto bg-yellow-100 dark:bg-yellow-900/50 p-4 rounded-full w-20 h-20 flex items-center justify-center mb-4 shadow-sm border border-yellow-200">
          <Award className="w-10 h-10 text-yellow-600 dark:text-yellow-400" />
        </div>
        <CardTitle className="text-2xl font-bold text-slate-900">Teilnahmebescheinigung</CardTitle>
        <CardDescription className="text-base mt-2">
          {isCompleted 
            ? "Sie haben dieses Modul erfolgreich abgeschlossen." 
            : "Schließen Sie alle Lektionen ab, um Ihr Zertifikat zu erhalten."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 py-6">
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Ausgestellt für</p>
          <p className="font-bold text-2xl text-slate-900">{finalUserName}</p>
        </div>
        
        <div className="w-full h-px bg-slate-200 my-4" />
        
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Für den erfolgreichen Abschluss von</p>
          <p className="font-bold text-xl text-blue-700">{finalModuleName}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-4">
          {isCompleted && (
            <div className="text-center p-3 bg-white rounded-lg border border-slate-100 shadow-sm">
              <p className="text-xs text-muted-foreground uppercase">Datum</p>
              <p className="font-semibold text-slate-900">{completionDate}</p>
            </div>
          )}
          {score !== undefined && (
            <div className="text-center p-3 bg-white rounded-lg border border-slate-100 shadow-sm">
              <p className="text-xs text-muted-foreground uppercase">Ergebnis</p>
              <p className="font-semibold text-emerald-600">{score}%</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pb-8 pt-2">
        <Button 
          className="w-full max-w-xs mx-auto gap-2 h-12 text-base shadow-md hover:shadow-lg transition-all" 
          onClick={handleDownload} 
          disabled={!isCompleted || isGenerating}
          variant={isCompleted ? "default" : "secondary"}
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generiere PDF...
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              Zertifikat herunterladen (PDF)
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
