import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Image, Layout, MessageSquare, Handshake, FileSignature } from "lucide-react";
import { AITutor } from "@/components/AITutor";

export default function Module5() {
  const [tutorOpen, setTutorOpen] = React.useState(false);
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-slate-900 dark:text-white">
          Teil 5: Marketing und Verhandlung
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Exposé-Erstellung, Inserate, Besichtigungen und Vertragsabschluss.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-l-4 border-l-pink-500">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">16 UE</Badge>
            </div>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-pink-500" />
              Zielgruppenanalyse
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Strategien für unterschiedliche Käufergruppen und Ansprachemethoden.
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-600">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">24 UE</Badge>
            </div>
            <CardTitle className="flex items-center gap-2">
              <Image className="h-5 w-5 text-purple-600" />
              Exposé & Inserat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Struktur, Design, Fotos, 360°-Touren und Plattform-Auswahl.
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-400">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">32 UE</Badge>
            </div>
            <CardTitle className="flex items-center gap-2">
              <Layout className="h-5 w-5 text-blue-400" />
              Digitalisierung
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              CRM-Systeme, virtuelle Besichtigungen und digitale Tools.
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-600">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">16 UE</Badge>
            </div>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-green-600" />
              Kommunikation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Anfragenmanagement, Besichtigungen und Einwandbehandlung.
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-600">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">16 UE</Badge>
            </div>
            <CardTitle className="flex items-center gap-2">
              <Handshake className="h-5 w-5 text-orange-600" />
              Verhandlung
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Preisverhandlungen, Abschlussstrategien und Mediation.
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-slate-800">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">32 UE</Badge>
            </div>
            <CardTitle className="flex items-center gap-2">
              <FileSignature className="h-5 w-5 text-slate-800" />
              Kaufvertrag
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Vertragsaufbau, Fallstricke, Notartermin und Kaufabwicklung.
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
        moduleId={5}
        moduleContext="Modul 5"
      />
  );
}
