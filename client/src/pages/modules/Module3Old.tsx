import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Phone, Mail, FileSignature } from "lucide-react";

export default function Module3Old() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-slate-900 dark:text-white">
          Teil 3: Kundenakquise
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Strategien zur Gewinnung von Eigentümern und Suchkunden.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">16 UE</Badge>
            </div>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-purple-500" />
              Kaltakquise
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Rechtliche Grenzen (UWG), Gesprächsleitfäden und Einwandbehandlung.
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-pink-500">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">8 UE</Badge>
            </div>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-pink-500" />
              Farming
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Gebietsbearbeitung, Flyer-Aktionen und lokale Präsenz.
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-indigo-500">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">8 UE</Badge>
            </div>
            <CardTitle className="flex items-center gap-2">
              <FileSignature className="h-5 w-5 text-indigo-500" />
              Maklervertrag
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Alleinauftrag vs. einfacher Auftrag, Laufzeiten und Kündigung.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
