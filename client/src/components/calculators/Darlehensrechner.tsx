import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Banknote, TrendingDown, PlusCircle, Info } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

export function Darlehensrechner() {
  const [darlehensbetrag, setDarlehensbetrag] = useState<string>('200000');
  const [zinssatz, setZinssatz] = useState<string>('3.5');
  const [tilgungssatz, setTilgungssatz] = useState<string>('2');
  const [sondertilgung, setSondertilgung] = useState<string>('5000');
  const [sondertilgungJahr, setSondertilgungJahr] = useState<string>('5');

  const darlehen = parseFloat(darlehensbetrag || '0');
  const zins = parseFloat(zinssatz || '0') / 100;
  const tilgung = parseFloat(tilgungssatz || '0') / 100;
  const jahresZinsen = darlehen * zins;
  const jahresTilgung = darlehen * tilgung;
  const annuitaet = jahresZinsen + jahresTilgung;
  const monatsRate = annuitaet / 12;
  const laufzeitJahre = tilgung > 0 ? Math.log((annuitaet) / (annuitaet - jahresZinsen)) / Math.log(1 + zins) : 0;
  const gesamtZinsen = (annuitaet * laufzeitJahre) - darlehen;
  
  const sondertilgungBetrag = parseFloat(sondertilgung || '0');
  const sondertilgungZeitpunkt = parseInt(sondertilgungJahr || '1');
  let restschuld = darlehen;
  for (let jahr = 1; jahr < sondertilgungZeitpunkt; jahr++) {
    const zinsenJahr = restschuld * zins;
    const tilgungJahr = annuitaet - zinsenJahr;
    restschuld -= tilgungJahr;
  }
  const restschuldNachSondertilgung = Math.max(0, restschuld - sondertilgungBetrag);
  const neueAnnuitaet = restschuldNachSondertilgung * (zins + tilgung);
  const neueLaufzeit = tilgung > 0 && restschuldNachSondertilgung > 0 ? Math.log((neueAnnuitaet) / (neueAnnuitaet - restschuldNachSondertilgung * zins)) / Math.log(1 + zins) : 0;
  const gesamtLaufzeitMitSondertilgung = sondertilgungZeitpunkt + neueLaufzeit;
  const ersparnis = laufzeitJahre - gesamtLaufzeitMitSondertilgung;

  return (
    <Card className="border-l-4 border-l-emerald-500">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Banknote className="h-6 w-6 text-emerald-600" />
          <div>
            <CardTitle>Darlehensrechner</CardTitle>
            <CardDescription>Finanzierungsberechnungen für Immobiliendarlehen nach §34i GewO</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="annuitaet">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="annuitaet">Annuität</TabsTrigger>
            <TabsTrigger value="tilgungsplan">Tilgungsplan</TabsTrigger>
            <TabsTrigger value="sondertilgung">Sondertilgung</TabsTrigger>
          </TabsList>
          <TabsContent value="annuitaet" className="space-y-6 mt-6">
            <Alert><Info className="h-4 w-4" /><AlertDescription>Berechnung der monatlichen Rate bei einem Annuitätendarlehen mit konstantem Zinssatz und Tilgung.</AlertDescription></Alert>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="space-y-2"><Label>Darlehensbetrag (€)</Label><Input aria-label="Darlehensbetrag (€)" type="number" value={darlehensbetrag} onChange={(e) => setDarlehensbetrag(e.target.value)} /></div>
                <div className="space-y-2"><Label>Sollzinssatz p.a. (%)</Label><Input aria-label="Sollzinssatz p.a. (%)" type="number" step="0.01" value={zinssatz} onChange={(e) => setZinssatz(e.target.value)} /></div>
                <div className="space-y-2"><Label>Anfängliche Tilgung p.a. (%)</Label><Input aria-label="Anfängliche Tilgung p.a. (%)" type="number" step="0.1" value={tilgungssatz} onChange={(e) => setTilgungssatz(e.target.value)} /></div>
              </div>
              <Card className="bg-emerald-50 border-emerald-200"><CardHeader><CardTitle className="text-lg flex items-center gap-2"><Banknote className="h-5 w-5 text-emerald-600" />Darlehensübersicht</CardTitle></CardHeader><CardContent className="space-y-3"><div className="flex justify-between items-center pb-2 border-b"><span className="text-sm">Darlehensbetrag:</span><span className="font-semibold">{darlehen.toFixed(2)} €</span></div><div className="flex justify-between items-center pb-2 border-b"><span className="text-sm">Zinsen (Jahr):</span><span className="font-semibold">{jahresZinsen.toFixed(2)} €</span></div><div className="flex justify-between items-center pb-2 border-b"><span className="text-sm">Tilgung (Jahr):</span><span className="font-semibold">{jahresTilgung.toFixed(2)} €</span></div><div className="flex justify-between items-center pb-2 border-b border-emerald-300"><span className="font-semibold text-emerald-900">Monatsrate:</span><span className="text-xl font-bold text-emerald-600">{monatsRate.toFixed(2)} €</span></div><div className="flex justify-between items-center pb-2 border-b"><span className="text-sm">Laufzeit:</span><span className="font-semibold">{laufzeitJahre.toFixed(1)} Jahre</span></div><div className="flex justify-between items-center pt-2"><span className="text-sm">Gesamtzinsen:</span><span className="font-semibold">{gesamtZinsen.toFixed(2)} €</span></div></CardContent></Card>
            </div>
          </TabsContent>
          <TabsContent value="tilgungsplan" className="space-y-6 mt-6">
            <Alert><Info className="h-4 w-4" /><AlertDescription>Vereinfachter Tilgungsplan für die ersten 5 Jahre des Darlehens.</AlertDescription></Alert>
            <div className="space-y-4">
              <Card className="bg-slate-50 border-slate-200"><CardContent className="pt-6"><table className="w-full text-sm"><thead><tr className="border-b"><th className="text-left pb-2">Jahr</th><th className="text-right pb-2">Restschuld</th><th className="text-right pb-2">Zinsen</th><th className="text-right pb-2">Tilgung</th><th className="text-right pb-2">Rate</th></tr></thead><tbody>{Array.from({ length: Math.min(5, Math.ceil(laufzeitJahre)) }, (_, i) => {
                let restschuldJahr = darlehen;
                for (let j = 0; j < i; j++) {
                  const zinsenJ = restschuldJahr * zins;
                  const tilgungJ = annuitaet - zinsenJ;
                  restschuldJahr -= tilgungJ;
                }
                const zinsenJahr = restschuldJahr * zins;
                const tilgungJahr = annuitaet - zinsenJahr;
                return (<tr key={i} className="border-b"><td className="py-2">{i + 1}</td><td className="text-right">{restschuldJahr.toFixed(2)} €</td><td className="text-right">{zinsenJahr.toFixed(2)} €</td><td className="text-right">{tilgungJahr.toFixed(2)} €</td><td className="text-right">{annuitaet.toFixed(2)} €</td></tr>);
              })}</tbody></table></CardContent></Card>
            </div>
          </TabsContent>
          <TabsContent value="sondertilgung" className="space-y-6 mt-6">
            <Alert><Info className="h-4 w-4" /><AlertDescription>Simulation einer Sondertilgung und deren Auswirkung auf die Laufzeit und Zinslast.</AlertDescription></Alert>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="space-y-2"><Label>Sondertilgung (€)</Label><Input aria-label="Sondertilgung (€)" type="number" value={sondertilgung} onChange={(e) => setSondertilgung(e.target.value)} /></div>
                <div className="space-y-2"><Label>Zeitpunkt (Jahr)</Label><Input aria-label="Zeitpunkt (Jahr)" type="number" value={sondertilgungJahr} onChange={(e) => setSondertilgungJahr(e.target.value)} /></div>
              </div>
              <Card className="bg-violet-50 border-violet-200"><CardHeader><CardTitle className="text-lg flex items-center gap-2"><PlusCircle className="h-5 w-5 text-violet-600" />Sondertilgung-Effekt</CardTitle></CardHeader><CardContent className="space-y-3"><div className="flex justify-between items-center pb-2 border-b"><span className="text-sm">Restschuld vor ST:</span><span className="font-semibold">{restschuld.toFixed(2)} €</span></div><div className="flex justify-between items-center pb-2 border-b"><span className="text-sm">Sondertilgung:</span><span className="font-semibold">{sondertilgungBetrag.toFixed(2)} €</span></div><div className="flex justify-between items-center pb-2 border-b"><span className="text-sm">Restschuld nach ST:</span><span className="font-semibold">{restschuldNachSondertilgung.toFixed(2)} €</span></div><div className="flex justify-between items-center pb-2 border-b border-violet-300"><span className="font-semibold text-violet-900">Neue Laufzeit:</span><span className="text-xl font-bold text-violet-600">{gesamtLaufzeitMitSondertilgung.toFixed(1)} Jahre</span></div><div className="flex justify-between items-center pt-2 text-green-700"><span className="text-sm font-semibold">Ersparnis:</span><span className="font-bold">{ersparnis.toFixed(1)} Jahre</span></div></CardContent></Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
