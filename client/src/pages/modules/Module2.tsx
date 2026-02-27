import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Map, Home, Globe } from "lucide-react";

export default function Module2() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-slate-900 dark:text-white">
          Teil 2: Immobilie richtig analysieren
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Marktanalyse, Immobilienarten und Bewertungsmethoden.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-l-4 border-l-primary">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">8 UE</Badge>
            </div>
            <CardTitle className="flex items-center gap-2">
              <Map className="h-5 w-5 text-primary" />
              Standort & Markt
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Aufbau des Immobilienmarktes, Trends, regionale Unterschiede und Standortanalyse.
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">8 UE</Badge>
            </div>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-blue-500" />
              Marktanalyse
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Digitale Marktanalysetools und Fallstudien zur Bewertung von Lagen.
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-indigo-500">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">16 UE</Badge>
            </div>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5 text-indigo-500" />
              Immobilienarten
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Wohn-, Gewerbe-, Spezialimmobilien, Neubauprojekte und Grundstücke.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
