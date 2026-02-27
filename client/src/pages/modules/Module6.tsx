import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Landmark, Calculator, HelpCircle } from "lucide-react";

export default function Module6() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-slate-900 dark:text-white">
          Teil 6: Immobilie als Kapitalanlage
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Investmentstrategien, Renditeberechnung und steuerliche Aspekte.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        <Card className="border-l-4 border-l-emerald-600">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">16 UE</Badge>
            </div>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
              Investment-Grundlagen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Vorteile/Risiken, Portfolio-Aufbau, Hebeleffekt und Langzeitstrategien.
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-600">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">16 UE</Badge>
            </div>
            <CardTitle className="flex items-center gap-2">
              <Landmark className="h-5 w-5 text-yellow-600" />
              Steuern
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Grunderwerbsteuer, Spekulationssteuer, AfA und steuerliche Vorteile.
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-600">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">16 UE</Badge>
            </div>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-blue-600" />
              Renditeberechnung
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Brutto-/Nettorendite, Faktor, Eigenkapitalrendite und Cashflow-Analyse.
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-600">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">32 UE</Badge>
            </div>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-purple-600" />
              Beratungspraxis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Kaufen vs. Mieten, Investitionsanalyse und Kundensimulationen.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
