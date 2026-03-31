import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, FileSearch, Wrench } from "lucide-react";
import { AITutor } from "@/components/AITutor";

export default function Module4() {
  const [tutorOpen, setTutorOpen] = React.useState(false);
  return (
    <>
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-slate-900 dark:text-white">
          Teil 4: Arbeit mit einem Verkaufsobjekt
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Bewertung, Unterlagenbeschaffung und Objektvorbereitung.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-l-4 border-l-blue-600">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">16 UE</Badge>
            </div>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-blue-600" />
              Immobilienbewertung
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Ertragswert-, Sachwert- und Vergleichswertverfahren in der Praxis.
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">48 UE</Badge>
            </div>
            <CardTitle className="flex items-center gap-2">
              <FileSearch className="h-5 w-5 text-amber-500" />
              Unterlagen & Analyse
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Grundbuch, Teilungserklärung, Energieausweis und Protokolle richtig lesen.
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-cyan-500">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">16 UE</Badge>
            </div>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-cyan-500" />
              Objektvorbereitung
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Schwachstellenanalyse, Optimierung und Home Staging.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
      {/* KI-Tutor Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setTutorOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-200 font-medium text-sm"
        >
          <span>🤖</span>
          <span>KI-Tutor</span>
        </button>
      </div>
      <AITutor
        isOpen={tutorOpen}
        onClose={() => setTutorOpen(false)}
        moduleId={4}
        moduleContext="Modul 4"
      />
    </>
  );
}
