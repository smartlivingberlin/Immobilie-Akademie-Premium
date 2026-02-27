import { useState } from "react";
import { Calculator, Euro, Building, Ruler, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function ValuationCalculator() {
  // Ertragswert State
  const [ewMiete, setEwMiete] = useState(60000);
  const [ewBwk, setEwBwk] = useState(20);
  const [ewLzs, setEwLzs] = useState(3.5);
  const [ewRnd, setEwRnd] = useState(40);
  const [ewBodenwert, setEwBodenwert] = useState(200000);
  const [ewResult, setEwResult] = useState<number | null>(null);

  // Sachwert State
  const [swBodenwert, setSwBodenwert] = useState(150000);
  const [swNhk, setSwNhk] = useState(1800);
  const [swBgi, setSwBgi] = useState(140); // Baupreisindex
  const [swFlaeche, setSwFlaeche] = useState(150);
  const [swAlter, setSwAlter] = useState(20);
  const [swGnd, setSwGnd] = useState(80);
  const [swMarktfaktor, setSwMarktfaktor] = useState(1.1);
  const [swResult, setSwResult] = useState<number | null>(null);

  // Vergleichswert State
  const [vwFlaeche, setVwFlaeche] = useState(85);
  const [vwVergleichspreis, setVwVergleichspreis] = useState(4500);
  const [vwAnpassung, setVwAnpassung] = useState(0); // in %
  const [vwResult, setVwResult] = useState<number | null>(null);

  // Helper: Vervielfältiger berechnen q = 1+p/100
  const calculateBarwertfaktor = (zins: number, jahre: number) => {
    if (zins === 0) return jahre;
    const q = 1 + zins / 100;
    return (Math.pow(q, jahre) - 1) / (Math.pow(q, jahre) * (zins / 100));
  };

  const calculateErtragswert = () => {
    const rohertrag = ewMiete;
    const bewirtschaftungskosten = rohertrag * (ewBwk / 100);
    const reinertrag = rohertrag - bewirtschaftungskosten;
    const bodenwertverzinsung = ewBodenwert * (ewLzs / 100);
    const gebaeudereinertrag = reinertrag - bodenwertverzinsung;
    
    const barwertfaktor = calculateBarwertfaktor(ewLzs, ewRnd);
    const gebaeudeertragswert = gebaeudereinertrag * barwertfaktor;
    
    setEwResult(Math.round(gebaeudeertragswert + ewBodenwert));
  };

  const calculateSachwert = () => {
    // NHK 2010 Basis auf heute indizieren (Basis 2010 = 100, aktuell ca. 160-180 je nach Index)
    // Vereinfacht: NHK * (Index / 100)
    const herstellungskosten = swNhk * (swBgi / 100) * swFlaeche;
    
    // Alterswertminderung linear
    const minderungProzent = Math.min(100, (swAlter / swGnd) * 100);
    const alterswertminderung = herstellungskosten * (minderungProzent / 100);
    
    const vorlSachwert = (herstellungskosten - alterswertminderung) + swBodenwert;
    const endgueltigerSachwert = vorlSachwert * swMarktfaktor;
    
    setSwResult(Math.round(endgueltigerSachwert));
  };

  const calculateVergleichswert = () => {
    const basiswert = vwFlaeche * vwVergleichspreis;
    const anpassungswert = basiswert * (vwAnpassung / 100);
    setVwResult(Math.round(basiswert + anpassungswert));
  };

  return (
    <div className="space-y-6">
      <Card className="border-slate-200 shadow-md">
        <CardHeader className="bg-slate-50 border-b pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Calculator className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <CardTitle>Immobilien-Wertermittlung</CardTitle>
              <CardDescription>Berechnen Sie den vorläufigen Wert nach ImmoWertV</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="ertrag" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="ertrag">Ertragswert (Rendite)</TabsTrigger>
              <TabsTrigger value="sach">Sachwert (EFH)</TabsTrigger>
              <TabsTrigger value="vergleich">Vergleichswert (ETW)</TabsTrigger>
            </TabsList>

            {/* ERTRAGSWERTVERFAHREN */}
            <TabsContent value="ertrag" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Jahresrohmiete (€)</Label>
                    <Input 
                      type="number" 
                      value={ewMiete} 
                      onChange={(e) => setEwMiete(Number(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Bewirtschaftungskosten (%)</Label>
                    <Input 
                      type="number" 
                      value={ewBwk} 
                      onChange={(e) => setEwBwk(Number(e.target.value))}
                    />
                    <p className="text-xs text-slate-500">Üblich: 20-30% je nach Objektart</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Liegenschaftszinssatz (%)</Label>
                    <Input 
                      type="number" 
                      value={ewLzs} 
                      onChange={(e) => setEwLzs(Number(e.target.value))}
                      step="0.1"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Bodenwert (€)</Label>
                    <Input 
                      type="number" 
                      value={ewBodenwert} 
                      onChange={(e) => setEwBodenwert(Number(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Restnutzungsdauer (Jahre)</Label>
                    <Input 
                      type="number" 
                      value={ewRnd} 
                      onChange={(e) => setEwRnd(Number(e.target.value))}
                    />
                  </div>
                  <div className="pt-6">
                    <Button onClick={calculateErtragswert} className="w-full bg-indigo-600 hover:bg-indigo-700">
                      Ertragswert berechnen
                    </Button>
                  </div>
                </div>
              </div>

              {ewResult && (
                <div className="mt-6 p-6 bg-indigo-50 rounded-xl border border-indigo-100 animate-in fade-in slide-in-from-bottom-2">
                  <div className="text-center">
                    <p className="text-sm font-medium text-indigo-600 uppercase tracking-wider mb-1">Vorläufiger Ertragswert</p>
                    <p className="text-4xl font-bold text-indigo-900">
                      {ewResult.toLocaleString("de-DE")} €
                    </p>
                    <p className="text-xs text-indigo-500 mt-2">
                      (Gebäudeertragswert + Bodenwert)
                    </p>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* SACHWERTVERFAHREN */}
            <TabsContent value="sach" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Normalherstellungskosten (NHK 2010 in €/m²)</Label>
                    <Input 
                      type="number" 
                      value={swNhk} 
                      onChange={(e) => setSwNhk(Number(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Baupreisindex (2010 = 100)</Label>
                    <Input 
                      type="number" 
                      value={swBgi} 
                      onChange={(e) => setSwBgi(Number(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Brutto-Grundfläche (m²)</Label>
                    <Input 
                      type="number" 
                      value={swFlaeche} 
                      onChange={(e) => setSwFlaeche(Number(e.target.value))}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Alter (Jahre)</Label>
                      <Input 
                        type="number" 
                        value={swAlter} 
                        onChange={(e) => setSwAlter(Number(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Gesamtnutzung (Jahre)</Label>
                      <Input 
                        type="number" 
                        value={swGnd} 
                        onChange={(e) => setSwGnd(Number(e.target.value))}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Bodenwert (€)</Label>
                    <Input 
                      type="number" 
                      value={swBodenwert} 
                      onChange={(e) => setSwBodenwert(Number(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Sachwertfaktor (Marktanpassung)</Label>
                    <Input 
                      type="number" 
                      value={swMarktfaktor} 
                      onChange={(e) => setSwMarktfaktor(Number(e.target.value))}
                      step="0.05"
                    />
                  </div>
                  <div className="pt-2">
                    <Button onClick={calculateSachwert} className="w-full bg-indigo-600 hover:bg-indigo-700">
                      Sachwert berechnen
                    </Button>
                  </div>
                </div>
              </div>

              {swResult && (
                <div className="mt-6 p-6 bg-indigo-50 rounded-xl border border-indigo-100 animate-in fade-in slide-in-from-bottom-2">
                  <div className="text-center">
                    <p className="text-sm font-medium text-indigo-600 uppercase tracking-wider mb-1">Marktangepasster Sachwert</p>
                    <p className="text-4xl font-bold text-indigo-900">
                      {swResult.toLocaleString("de-DE")} €
                    </p>
                    <p className="text-xs text-indigo-500 mt-2">
                      (Substanzwert + Bodenwert) × Marktfaktor
                    </p>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* VERGLEICHSWERTVERFAHREN */}
            <TabsContent value="vergleich" className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Wohnfläche (m²)</Label>
                    <Input 
                      type="number" 
                      value={vwFlaeche} 
                      onChange={(e) => setVwFlaeche(Number(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Vergleichspreis pro m² (€)</Label>
                    <Input 
                      type="number" 
                      value={vwVergleichspreis} 
                      onChange={(e) => setVwVergleichspreis(Number(e.target.value))}
                    />
                    <p className="text-xs text-slate-500">Durchschnitt aus Kaufpreissammlung</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Anpassung / Zu- & Abschläge (%)</Label>
                    <div className="flex items-center gap-4">
                      <Input 
                        type="number" 
                        value={vwAnpassung} 
                        onChange={(e) => setVwAnpassung(Number(e.target.value))}
                      />
                      <span className="text-sm text-slate-500 whitespace-nowrap">
                        (z.B. +10 für Lage, -5 für Zustand)
                      </span>
                    </div>
                  </div>
                  
                  <div className="pt-6">
                    <Button onClick={calculateVergleichswert} className="w-full bg-indigo-600 hover:bg-indigo-700">
                      Vergleichswert berechnen
                    </Button>
                  </div>
                </div>
              </div>

              {vwResult && (
                <div className="mt-6 p-6 bg-indigo-50 rounded-xl border border-indigo-100 animate-in fade-in slide-in-from-bottom-2">
                  <div className="text-center">
                    <p className="text-sm font-medium text-indigo-600 uppercase tracking-wider mb-1">Indizierter Vergleichswert</p>
                    <p className="text-4xl font-bold text-indigo-900">
                      {vwResult.toLocaleString("de-DE")} €
                    </p>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200 text-sm text-slate-500 flex items-start gap-3">
            <Info className="h-5 w-5 text-slate-400 flex-shrink-0 mt-0.5" />
            <p>
              Hinweis: Dieser Rechner dient nur zu Übungszwecken und liefert eine erste Indikation. 
              Für rechtssichere Gutachten sind detaillierte, begründete Herleitungen und aktuelle Marktdaten der Gutachterausschüsse erforderlich.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
