import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertCircle, Calculator, Plus, Trash2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Einnahme {
  id: number;
  bezeichnung: string;
  betrag: number;
}

interface Ausgabe {
  id: number;
  bezeichnung: string;
  betrag: number;
}

export default function HaushaltsrechnerCalculator() {
  const [einnahmen, setEinnahmen] = useState<Einnahme[]>([
    { id: 1, bezeichnung: "Nettoeinkommen Person 1", betrag: 3000 },
    { id: 2, bezeichnung: "Nettoeinkommen Person 2", betrag: 2500 },
  ]);
  const [ausgaben, setAusgaben] = useState<Ausgabe[]>([
    { id: 1, bezeichnung: "Miete/Wohnen", betrag: 1200 },
    { id: 2, bezeichnung: "Lebenshaltung", betrag: 800 },
    { id: 3, bezeichnung: "Versicherungen", betrag: 300 },
    { id: 4, bezeichnung: "Auto/Verkehr", betrag: 400 },
  ]);
  const [sicherheitspuffer, setSicherheitspuffer] = useState<string>("120");
  const [result, setResult] = useState<{
    gesamtEinnahmen: number;
    gesamtAusgaben: number;
    verfuegbaresEinkommen: number;
    maximaleRate: number;
    finanzierungsvolumen: number;
  } | null>(null);

  const addEinnahme = () => {
    const newId = Math.max(...einnahmen.map(e => e.id), 0) + 1;
    setEinnahmen([...einnahmen, { id: newId, bezeichnung: "", betrag: 0 }]);
  };

  const removeEinnahme = (id: number) => {
    setEinnahmen(einnahmen.filter(e => e.id !== id));
  };

  const updateEinnahme = (id: number, field: keyof Einnahme, value: string | number) => {
    setEinnahmen(einnahmen.map(e => 
      e.id === id ? { ...e, [field]: value } : e
    ));
  };

  const addAusgabe = () => {
    const newId = Math.max(...ausgaben.map(a => a.id), 0) + 1;
    setAusgaben([...ausgaben, { id: newId, bezeichnung: "", betrag: 0 }]);
  };

  const removeAusgabe = (id: number) => {
    setAusgaben(ausgaben.filter(a => a.id !== id));
  };

  const updateAusgabe = (id: number, field: keyof Ausgabe, value: string | number) => {
    setAusgaben(ausgaben.map(a => 
      a.id === id ? { ...a, [field]: value } : a
    ));
  };

  const calculateHaushalt = () => {
    const gesamtEinnahmen = einnahmen.reduce((sum, e) => sum + (e.betrag || 0), 0);
    const gesamtAusgaben = ausgaben.reduce((sum, a) => sum + (a.betrag || 0), 0);
    const verfuegbaresEinkommen = gesamtEinnahmen - gesamtAusgaben;
    
    const sicherheitspufferNum = parseFloat(sicherheitspuffer) || 120;
    const maximaleRate = verfuegbaresEinkommen / (sicherheitspufferNum / 100);

    // Finanzierungsvolumen bei 3% Zinsen, 2% Tilgung, 30 Jahre Laufzeit
    const zinssatz = 0.03;
    const tilgung = 0.02;
    const gesamtzins = zinssatz + tilgung;
    const finanzierungsvolumen = (maximaleRate * 12) / gesamtzins;

    setResult({
      gesamtEinnahmen,
      gesamtAusgaben,
      verfuegbaresEinkommen,
      maximaleRate: Math.max(0, maximaleRate),
      finanzierungsvolumen: Math.max(0, finanzierungsvolumen)
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-6 h-6 text-green-600" />
          Haushaltsrechner
        </CardTitle>
        <CardDescription>
          Berechnen Sie Ihr verfügbares Einkommen und die maximale Darlehensrate
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Einnahmen Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Monatliche Einnahmen
            </h3>
            <Button onClick={addEinnahme} size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-1" />
              Hinzufügen
            </Button>
          </div>

          {einnahmen.map((einnahme) => (
            <div key={einnahme.id} className="grid grid-cols-12 gap-2">
              <div className="col-span-7">
                <Input
                  value={einnahme.bezeichnung}
                  onChange={(e) => updateEinnahme(einnahme.id, "bezeichnung", e.target.value)}
                  placeholder="Bezeichnung"
                />
              </div>
              <div className="col-span-4">
                <Input
                  type="number"
                  value={einnahme.betrag}
                  onChange={(e) => updateEinnahme(einnahme.id, "betrag", parseFloat(e.target.value) || 0)}
                  placeholder="Betrag (€)"
                />
              </div>
              <div className="col-span-1 flex items-center">
                <Button
                  onClick={() => removeEinnahme(einnahme.id)}
                  size="sm"
                  variant="ghost"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Ausgaben Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Monatliche Ausgaben
            </h3>
            <Button onClick={addAusgabe} size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-1" />
              Hinzufügen
            </Button>
          </div>

          {ausgaben.map((ausgabe) => (
            <div key={ausgabe.id} className="grid grid-cols-12 gap-2">
              <div className="col-span-7">
                <Input
                  value={ausgabe.bezeichnung}
                  onChange={(e) => updateAusgabe(ausgabe.id, "bezeichnung", e.target.value)}
                  placeholder="Bezeichnung"
                />
              </div>
              <div className="col-span-4">
                <Input
                  type="number"
                  value={ausgabe.betrag}
                  onChange={(e) => updateAusgabe(ausgabe.id, "betrag", parseFloat(e.target.value) || 0)}
                  placeholder="Betrag (€)"
                />
              </div>
              <div className="col-span-1 flex items-center">
                <Button
                  onClick={() => removeAusgabe(ausgabe.id)}
                  size="sm"
                  variant="ghost"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Sicherheitspuffer */}
        <div className="space-y-2">
          <Label htmlFor="sicherheitspuffer">Sicherheitspuffer (%)</Label>
          <Input
            id="sicherheitspuffer"
            type="number"
            value={sicherheitspuffer}
            onChange={(e) => setSicherheitspuffer(e.target.value)}
            placeholder="120"
          />
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Empfohlen: 120% (Banken rechnen mit 20% Sicherheitspuffer)
          </p>
        </div>

        <Button onClick={calculateHaushalt} className="w-full bg-green-600 hover:bg-green-700">
          <Calculator className="w-4 h-4 mr-2" />
          Haushaltsrechnung durchführen
        </Button>

        {/* Result Section */}
        {result && (
          <div className="mt-6 p-6 bg-green-50 dark:bg-green-950 rounded-lg space-y-4">
            <h3 className="text-xl font-semibold text-green-900 dark:text-green-100">
              Berechnungsergebnis
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white dark:bg-slate-800 rounded-md">
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Gesamte Einnahmen
                </div>
                <div className="text-2xl font-semibold text-green-600">
                  {result.gesamtEinnahmen.toLocaleString("de-DE", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  €
                </div>
              </div>

              <div className="p-4 bg-white dark:bg-slate-800 rounded-md">
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Gesamte Ausgaben
                </div>
                <div className="text-2xl font-semibold text-red-600">
                  {result.gesamtAusgaben.toLocaleString("de-DE", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  €
                </div>
              </div>

              <div className="p-4 bg-white dark:bg-slate-800 rounded-md">
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Verfügbares Einkommen
                </div>
                <div className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                  {result.verfuegbaresEinkommen.toLocaleString("de-DE", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  €
                </div>
              </div>

              <div className="p-4 bg-white dark:bg-slate-800 rounded-md">
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Maximale Darlehensrate
                </div>
                <div className="text-2xl font-semibold text-blue-600">
                  {result.maximaleRate.toLocaleString("de-DE", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  €
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-100 dark:bg-blue-950 rounded-md">
              <div className="text-sm text-blue-800 dark:text-blue-200 mb-1">
                Maximales Finanzierungsvolumen
              </div>
              <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">
                {result.finanzierungsvolumen.toLocaleString("de-DE", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}{" "}
                €
              </div>
              <div className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                Bei 3% Zinsen, 2% Tilgung, 30 Jahre Laufzeit
              </div>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Hinweis:</strong> Dies ist eine vereinfachte Berechnung. Banken berücksichtigen zusätzlich
                Faktoren wie Alter, Beruf, Beschäftigungsverhältnis, Eigenkapital und Bonität. Die tatsächliche
                Kreditwürdigkeit kann abweichen.
              </AlertDescription>
            </Alert>

            <div className="mt-4 p-4 bg-white dark:bg-slate-800 rounded-md">
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Erläuterung der Berechnung
              </h4>
              <div className="text-sm text-slate-700 dark:text-slate-300 space-y-2">
                <p>
                  <strong>Verfügbares Einkommen:</strong> Gesamte Einnahmen ({result.gesamtEinnahmen.toFixed(2)} €) - Gesamte Ausgaben ({result.gesamtAusgaben.toFixed(2)} €) = {result.verfuegbaresEinkommen.toFixed(2)} €
                </p>
                <p>
                  <strong>Maximale Darlehensrate:</strong> Verfügbares Einkommen / Sicherheitspuffer ({sicherheitspuffer}%) = {result.maximaleRate.toFixed(2)} €
                </p>
                <p>
                  <strong>Finanzierungsvolumen:</strong> (Maximale Rate × 12 Monate) / (Zinssatz 3% + Tilgung 2%) = {result.finanzierungsvolumen.toFixed(0)} €
                </p>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  Der Sicherheitspuffer berücksichtigt unvorhergesehene Ausgaben und stellt sicher, dass die
                  Finanzierung auch bei Einkommensrückgängen tragfähig bleibt. Banken verlangen üblicherweise
                  einen Puffer von 20-30%.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-6 p-4 bg-slate-100 dark:bg-slate-800 rounded-md">
          <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Was ist die Haushaltsrechnung?
          </h4>
          <div className="text-sm text-slate-700 dark:text-slate-300 space-y-2">
            <p>
              Die Haushaltsrechnung ist ein wichtiges Instrument zur Ermittlung der finanziellen Leistungsfähigkeit
              eines Kunden. Sie zeigt, wie viel Geld monatlich für die Darlehensrate zur Verfügung steht.
            </p>
            <p>
              <strong>Wichtige Faktoren:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Alle Einnahmen (Gehalt, Mieteinnahmen, Kindergeld, etc.)</li>
              <li>Alle Ausgaben (Miete, Lebenshaltung, Versicherungen, Kredite, etc.)</li>
              <li>Sicherheitspuffer für unvorhergesehene Ausgaben (20-30%)</li>
              <li>Berücksichtigung von Lebensumständen (Kinder, Alter, etc.)</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
