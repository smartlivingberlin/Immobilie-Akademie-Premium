import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, PiggyBank, Scale, Info } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

export function WEGRechner() {
  const [mea, setMea] = useState<string>('50');
  const [gesamtmea, setGesamtmea] = useState<string>('1000');
  const [gesamtkosten, setGesamtkosten] = useState<string>('50000');
  const [herstellungskosten, setHerstellungskosten] = useState<string>('500000');
  const [alter, setAlter] = useState<string>('20');
  const [wohnflaeche, setWohnflaeche] = useState<string>('80');
  const [gesamtwohnflaeche, setGesamtwohnflaeche] = useState<string>('2000');
  const [kostenWohnflaeche, setKostenWohnflaeche] = useState<string>('10000');
  const [kostenMEA, setKostenMEA] = useState<string>('5000');

  const anteil = gesamtmea ? (parseFloat(mea || '0') / parseFloat(gesamtmea)) * 100 : 0;
  const hausgeld = (parseFloat(gesamtkosten || '0') * parseFloat(mea || '0')) / parseFloat(gesamtmea || '1');
  const hausgeldMonat = hausgeld / 12;
  const petersscheFormel = (1.5 * parseFloat(herstellungskosten || '0')) / 80;
  const ruecklageJahr = petersscheFormel * parseFloat(mea || '0') / parseFloat(gesamtmea || '1');
  const ruecklageMonat = ruecklageJahr / 12;
  const umlageFlaechenanteil = (parseFloat(wohnflaeche || '0') / parseFloat(gesamtwohnflaeche || '1')) * parseFloat(kostenWohnflaeche || '0');
  const umlageMEA = (parseFloat(mea || '0') / parseFloat(gesamtmea || '1')) * parseFloat(kostenMEA || '0');
  const umlageDifferenz = umlageFlaechenanteil - umlageMEA;

  return (
    <Card className="border-l-4 border-l-green-500">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Building2 className="h-6 w-6 text-green-600" />
          <div>
            <CardTitle>WEG-Rechner</CardTitle>
            <CardDescription>Berechnungen für Wohnungseigentümergemeinschaften nach WEG</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="hausgeld">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="hausgeld">Hausgeld</TabsTrigger>
            <TabsTrigger value="ruecklage">Instandhaltungsrücklage</TabsTrigger>
            <TabsTrigger value="umlage">Umlageschlüssel</TabsTrigger>
          </TabsList>
          <TabsContent value="hausgeld" className="space-y-6 mt-6">
            <Alert><Info className="h-4 w-4" /><AlertDescription>Berechnung des Hausgeldes nach Miteigentumsanteil gemäß § 16 Abs. 2 WEG.</AlertDescription></Alert>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="space-y-2"><Label>Miteigentumsanteil (MEA in Tausendstel)</Label><Input aria-label="Miteigentumsanteil (MEA in Tausendstel)" type="number" value={mea} onChange={(e) => setMea(e.target.value)} /></div>
                <div className="space-y-2"><Label>Gesamt-MEA (Tausendstel)</Label><Input aria-label="Gesamt-MEA (Tausendstel)" type="number" value={gesamtmea} onChange={(e) => setGesamtmea(e.target.value)} /></div>
                <div className="space-y-2"><Label>Gesamtkosten pro Jahr (€)</Label><Input aria-label="Gesamtkosten pro Jahr (€)" type="number" value={gesamtkosten} onChange={(e) => setGesamtkosten(e.target.value)} /></div>
              </div>
              <Card className="bg-green-50 border-green-200"><CardHeader><CardTitle className="text-lg flex items-center gap-2"><Building2 className="h-5 w-5 text-green-600" />Hausgeld-Berechnung</CardTitle></CardHeader><CardContent className="space-y-3"><div className="flex justify-between items-center pb-2 border-b"><span className="text-sm">MEA-Anteil:</span><span className="font-semibold">{anteil.toFixed(3)} %</span></div><div className="flex justify-between items-center pb-2 border-b"><span className="text-sm">Gesamtkosten (Jahr):</span><span className="font-semibold">{parseFloat(gesamtkosten || '0').toFixed(2)} €</span></div><div className="flex justify-between items-center pb-2 border-b border-green-300"><span className="font-semibold text-green-900">Hausgeld (Jahr):</span><span className="text-xl font-bold text-green-600">{hausgeld.toFixed(2)} €</span></div><div className="flex justify-between items-center pt-2"><span className="text-sm">Hausgeld (Monat):</span><span className="font-semibold">{hausgeldMonat.toFixed(2)} €</span></div></CardContent></Card>
            </div>
          </TabsContent>
          <TabsContent value="ruecklage" className="space-y-6 mt-6">
            <Alert><Info className="h-4 w-4" /><AlertDescription>Berechnung der Instandhaltungsrücklage nach Petersscher Formel: (1,5 × Herstellungskosten) / 80 Jahre.</AlertDescription></Alert>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="space-y-2"><Label>Herstellungskosten Gebäude (€)</Label><Input aria-label="Herstellungskosten Gebäude (€)" type="number" value={herstellungskosten} onChange={(e) => setHerstellungskosten(e.target.value)} /></div>
                <div className="space-y-2"><Label>Alter des Gebäudes (Jahre)</Label><Input aria-label="Alter des Gebäudes (Jahre)" type="number" value={alter} onChange={(e) => setAlter(e.target.value)} /></div>
                <div className="space-y-2"><Label>Ihr MEA (Tausendstel)</Label><Input aria-label="Ihr MEA (Tausendstel)" type="number" value={mea} onChange={(e) => setMea(e.target.value)} /></div>
                <div className="space-y-2"><Label>Gesamt-MEA (Tausendstel)</Label><Input aria-label="Gesamt-MEA (Tausendstel)" type="number" value={gesamtmea} onChange={(e) => setGesamtmea(e.target.value)} /></div>
              </div>
              <Card className="bg-purple-50 border-purple-200"><CardHeader><CardTitle className="text-lg flex items-center gap-2"><PiggyBank className="h-5 w-5 text-purple-600" />Instandhaltungsrücklage</CardTitle></CardHeader><CardContent className="space-y-3"><div className="flex justify-between items-center pb-2 border-b"><span className="text-sm">Peterssche Formel:</span><span className="font-semibold">{petersscheFormel.toFixed(2)} €/Jahr</span></div><div className="flex justify-between items-center pb-2 border-b"><span className="text-sm">Ihr MEA-Anteil:</span><span className="font-semibold">{anteil.toFixed(3)} %</span></div><div className="flex justify-between items-center pb-2 border-b border-purple-300"><span className="font-semibold text-purple-900">Rücklage (Jahr):</span><span className="text-xl font-bold text-purple-600">{ruecklageJahr.toFixed(2)} €</span></div><div className="flex justify-between items-center pt-2"><span className="text-sm">Rücklage (Monat):</span><span className="font-semibold">{ruecklageMonat.toFixed(2)} €</span></div></CardContent></Card>
            </div>
          </TabsContent>
          <TabsContent value="umlage" className="space-y-6 mt-6">
            <Alert><Info className="h-4 w-4" /><AlertDescription>Vergleich verschiedener Umlageschlüssel: Wohnfläche vs. Miteigentumsanteil.</AlertDescription></Alert>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="space-y-2"><Label>Ihre Wohnfläche (m²)</Label><Input aria-label="Ihre Wohnfläche (m²)" type="number" value={wohnflaeche} onChange={(e) => setWohnflaeche(e.target.value)} /></div>
                <div className="space-y-2"><Label>Gesamtwohnfläche (m²)</Label><Input aria-label="Gesamtwohnfläche (m²)" type="number" value={gesamtwohnflaeche} onChange={(e) => setGesamtwohnflaeche(e.target.value)} /></div>
                <div className="space-y-2"><Label>Kosten (Wohnfläche) (€)</Label><Input aria-label="Kosten (Wohnfläche) (€)" type="number" value={kostenWohnflaeche} onChange={(e) => setKostenWohnflaeche(e.target.value)} /></div>
                <div className="space-y-2"><Label>Ihr MEA (Tausendstel)</Label><Input aria-label="Ihr MEA (Tausendstel)" type="number" value={mea} onChange={(e) => setMea(e.target.value)} /></div>
                <div className="space-y-2"><Label>Gesamt-MEA (Tausendstel)</Label><Input aria-label="Gesamt-MEA (Tausendstel)" type="number" value={gesamtmea} onChange={(e) => setGesamtmea(e.target.value)} /></div>
                <div className="space-y-2"><Label>Kosten (MEA) (€)</Label><Input aria-label="Kosten (MEA) (€)" type="number" value={kostenMEA} onChange={(e) => setKostenMEA(e.target.value)} /></div>
              </div>
              <Card className="bg-orange-50 border-orange-200"><CardHeader><CardTitle className="text-lg flex items-center gap-2"><Scale className="h-5 w-5 text-orange-600" />Umlageschlüssel-Vergleich</CardTitle></CardHeader><CardContent className="space-y-3"><div className="flex justify-between items-center pb-2 border-b"><span className="text-sm">Nach Wohnfläche:</span><span className="font-semibold">{umlageFlaechenanteil.toFixed(2)} €</span></div><div className="flex justify-between items-center pb-2 border-b"><span className="text-sm">Nach MEA:</span><span className="font-semibold">{umlageMEA.toFixed(2)} €</span></div><div className={`flex justify-between items-center pb-2 border-b border-orange-300 ${umlageDifferenz > 0 ? 'text-red-900' : 'text-green-900'}`}><span className="font-semibold">Differenz:</span><span className="text-xl font-bold">{umlageDifferenz > 0 ? '+' : ''}{umlageDifferenz.toFixed(2)} €</span></div><div className="text-xs text-slate-600 pt-2">{umlageDifferenz > 0 ? 'Wohnfläche teurer als MEA' : 'MEA teurer als Wohnfläche'}</div></CardContent></Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
