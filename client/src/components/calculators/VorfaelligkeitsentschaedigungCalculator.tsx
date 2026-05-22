import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertCircle, Calculator } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function VorfaelligkeitsentschaedigungCalculator() {
  const [restschuld, setRestschuld] = useState<string>("200000");
  const [vertragszins, setVertragszins] = useState<string>("3.5");
  const [wiederanlagezins, setWiederanlagezins] = useState<string>("2.0");
  const [restlaufzeitMonate, setRestlaufzeitMonate] = useState<string>("60");
  const [result, setResult] = useState<{
    vfe: number;
    zinsdifferenz: number;
    restlaufzeitJahre: number;
    methode: string;
  } | null>(null);

  const calculateVFE = () => {
    const restschuldNum = parseFloat(restschuld);
    const vertragszinsNum = parseFloat(vertragszins);
    const wiederanlagezinsNum = parseFloat(wiederanlagezins);
    const restlaufzeitMonateNum = parseInt(restlaufzeitMonate);

    if (
      isNaN(restschuldNum) ||
      isNaN(vertragszinsNum) ||
      isNaN(wiederanlagezinsNum) ||
      isNaN(restlaufzeitMonateNum) ||
      restschuldNum <= 0 ||
      vertragszinsNum <= 0 ||
      wiederanlagezinsNum < 0 ||
      restlaufzeitMonateNum <= 0
    ) {
      console.warn("Ungültige Eingabe: Vorfälligkeit");
      return;
    }

    // Zinsdifferenz in Prozent
    const zinsdifferenz = vertragszinsNum - wiederanlagezinsNum;
    
    // Restlaufzeit in Jahren
    const restlaufzeitJahre = restlaufzeitMonateNum / 12;

    // Aktuar-Methode (vereinfacht)
    // VFE = Restschuld × Zinsdifferenz × Restlaufzeit × Abzinsungsfaktor
    const abzinsungsfaktor = 1 / (1 + wiederanlagezinsNum / 100);
    const vfe = restschuldNum * (zinsdifferenz / 100) * restlaufzeitJahre * abzinsungsfaktor;

    setResult({
      vfe: Math.round(vfe * 100) / 100,
      zinsdifferenz,
      restlaufzeitJahre,
      methode: "Aktuar-Methode (vereinfacht)"
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-6 h-6 text-red-600" />
          Vorfälligkeitsentschädigung-Rechner
        </CardTitle>
        <CardDescription>
          Berechnen Sie die Vorfälligkeitsentschädigung (VFE) bei vorzeitiger Darlehensrückzahlung
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="restschuld">Restschuld (€)</Label>
            <Input
              id="restschuld"
              type="number"
              value={restschuld}
              onChange={(e) => setRestschuld(e.target.value)}
              placeholder="200000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="vertragszins">Vertragszins (%)</Label>
            <Input
              id="vertragszins"
              type="number"
              step="0.01"
              value={vertragszins}
              onChange={(e) => setVertragszins(e.target.value)}
              placeholder="3.5"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="wiederanlagezins">Wiederanlagezins (%)</Label>
            <Input
              id="wiederanlagezins"
              type="number"
              step="0.01"
              value={wiederanlagezins}
              onChange={(e) => setWiederanlagezins(e.target.value)}
              placeholder="2.0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="restlaufzeit">Restlaufzeit (Monate)</Label>
            <Input
              id="restlaufzeit"
              type="number"
              value={restlaufzeitMonate}
              onChange={(e) => setRestlaufzeitMonate(e.target.value)}
              placeholder="60"
            />
          </div>
        </div>

        <Button onClick={calculateVFE} className="w-full bg-red-600 hover:bg-red-700">
          <Calculator className="w-4 h-4 mr-2" />
          Vorfälligkeitsentschädigung berechnen
        </Button>

        {/* Result Section */}
        {result && (
          <div className="mt-6 p-6 bg-red-50 dark:bg-red-950 rounded-lg space-y-4">
            <h3 className="text-xl font-semibold text-red-900 dark:text-red-100">
              Berechnungsergebnis
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white dark:bg-slate-800 rounded-md">
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Vorfälligkeitsentschädigung
                </div>
                <div className="text-3xl font-bold text-red-600">
                  {result.vfe.toLocaleString("de-DE", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  €
                </div>
              </div>

              <div className="p-4 bg-white dark:bg-slate-800 rounded-md">
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Zinsdifferenz
                </div>
                <div className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                  {result.zinsdifferenz.toFixed(2)} %
                </div>
              </div>

              <div className="p-4 bg-white dark:bg-slate-800 rounded-md">
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Restlaufzeit
                </div>
                <div className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                  {result.restlaufzeitJahre.toFixed(1)} Jahre
                </div>
              </div>

              <div className="p-4 bg-white dark:bg-slate-800 rounded-md">
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Berechnungsmethode
                </div>
                <div className="text-lg font-medium text-slate-900 dark:text-slate-100">
                  {result.methode}
                </div>
              </div>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Hinweis:</strong> Dies ist eine vereinfachte Berechnung nach der Aktuar-Methode.
                Die tatsächliche VFE kann je nach Bank und Berechnungsmethode abweichen. Banken verwenden oft
                komplexere Formeln mit Barwertberechnung und Risikozuschlägen.
              </AlertDescription>
            </Alert>

            <div className="mt-4 p-4 bg-white dark:bg-slate-800 rounded-md">
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Erläuterung der Berechnung
              </h4>
              <div className="text-sm text-slate-700 dark:text-slate-300 space-y-2">
                <p>
                  <strong>Formel (vereinfacht):</strong> VFE = Restschuld × Zinsdifferenz × Restlaufzeit × Abzinsungsfaktor
                </p>
                <p>
                  <strong>Zinsdifferenz:</strong> {result.zinsdifferenz.toFixed(2)}% (Vertragszins {vertragszins}% - Wiederanlagezins {wiederanlagezins}%)
                </p>
                <p>
                  <strong>Restlaufzeit:</strong> {result.restlaufzeitJahre.toFixed(1)} Jahre ({restlaufzeitMonate} Monate)
                </p>
                <p>
                  <strong>Abzinsungsfaktor:</strong> {(1 / (1 + parseFloat(wiederanlagezins) / 100)).toFixed(4)}
                </p>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  Die Bank berechnet die VFE, um den entgangenen Zinsgewinn auszugleichen, der durch die vorzeitige
                  Rückzahlung des Darlehens entsteht. Die Höhe hängt von der Zinsdifferenz zwischen Vertragszins und
                  aktuellem Marktzins (Wiederanlagezins) sowie der Restlaufzeit ab.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-6 p-4 bg-slate-100 dark:bg-slate-800 rounded-md">
          <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Was ist die Vorfälligkeitsentschädigung?
          </h4>
          <div className="text-sm text-slate-700 dark:text-slate-300 space-y-2">
            <p>
              Die Vorfälligkeitsentschädigung (VFE) ist eine Entschädigung, die die Bank bei vorzeitiger Rückzahlung
              eines Immobiliendarlehens verlangen kann. Sie gleicht den Zinsverlust aus, der der Bank durch die
              vorzeitige Rückzahlung entsteht.
            </p>
            <p>
              <strong>Wann fällt VFE an?</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Vorzeitige vollständige Rückzahlung des Darlehens</li>
              <li>Vorzeitige Teilrückzahlung (über Sondertilgungsrechte hinaus)</li>
              <li>Verkauf der Immobilie vor Ende der Zinsbindung</li>
            </ul>
            <p>
              <strong>Ausnahmen (keine VFE):</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Nach 10 Jahren Zinsbindung (§ 489 BGB - Kündigungsrecht)</li>
              <li>Bei berechtigtem Interesse (z.B. Härtefall)</li>
              <li>Innerhalb der Sondertilgungsrechte</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
