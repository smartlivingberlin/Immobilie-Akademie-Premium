import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, TrendingUp, FileText, Info } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

export function Mietrechner() {
  const [nettokaltmiete, setNettokaltmiete] = useState<string>('800');
  const [nebenkosten, setNebenkosten] = useState<string>('200');
  const [aktuelleKaltmiete, setAktuelleKaltmiete] = useState<string>('800');
  const [neueMiete, setNeueMiete] = useState<string>('900');
  const [bundesland, setBundesland] = useState<string>('normal');
  const [wohnflaeche, setWohnflaeche] = useState<string>('80');
  const [gesamtkosten, setGesamtkosten] = useState<string>('5000');
  const [gesamtflaeche, setGesamtflaeche] = useState<string>('1000');

  const warmmiete = parseFloat(nettokaltmiete || '0') + parseFloat(nebenkosten || '0');
  const jahreskaltmiete = parseFloat(nettokaltmiete || '0') * 12;
  const erhoehungAbsolut = parseFloat(neueMiete || '0') - parseFloat(aktuelleKaltmiete || '0');
  const erhoehungProzent = aktuelleKaltmiete ? (erhoehungAbsolut / parseFloat(aktuelleKaltmiete)) * 100 : 0;
  const kappungsgrenze = bundesland === 'gespannt' ? 15 : 20;
  const maxErhoehung = (parseFloat(aktuelleKaltmiete || '0') * kappungsgrenze) / 100;
  const istZulaessig = erhoehungAbsolut <= maxErhoehung;
  const betriebskostenProQm = gesamtflaeche ? parseFloat(gesamtkosten || '0') / parseFloat(gesamtflaeche) : 0;
  const betriebskostenWohnung = betriebskostenProQm * parseFloat(wohnflaeche || '0');
  const betriebskostenMonat = betriebskostenWohnung / 12;

  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Calculator className="h-6 w-6 text-blue-600" />
          <div>
            <CardTitle>Mietrechner</CardTitle>
            <CardDescription>Professionelle Berechnungen für Mietverhältnisse nach BGB</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="warmmiete">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="warmmiete">Warmmiete</TabsTrigger>
            <TabsTrigger value="erhoehung">Mieterhöhung</TabsTrigger>
            <TabsTrigger value="betriebskosten">Betriebskosten</TabsTrigger>
          </TabsList>
          <TabsContent value="warmmiete" className="space-y-6 mt-6">
            <Alert><Info className="h-4 w-4" /><AlertDescription>Berechnung der Warmmiete gemäß § 556 BGB.</AlertDescription></Alert>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="space-y-2"><Label>Nettokaltmiete (€/Monat)</Label><Input aria-label="Nettokaltmiete (€/Monat)" type="number" value={nettokaltmiete} onChange={(e) => setNettokaltmiete(e.target.value)} /></div>
                <div className="space-y-2"><Label>Nebenkosten (€/Monat)</Label><Input aria-label="Nebenkosten (€/Monat)" type="number" value={nebenkosten} onChange={(e) => setNebenkosten(e.target.value)} /></div>
              </div>
              <Card className="bg-blue-50 border-blue-200"><CardHeader><CardTitle className="text-lg flex items-center gap-2"><FileText className="h-5 w-5 text-blue-600" />Ergebnis</CardTitle></CardHeader><CardContent className="space-y-3"><div className="flex justify-between items-center pb-2 border-b"><span className="text-sm">Nettokaltmiete:</span><span className="font-semibold">{parseFloat(nettokaltmiete || '0').toFixed(2)} €</span></div><div className="flex justify-between items-center pb-2 border-b"><span className="text-sm">Nebenkosten:</span><span className="font-semibold">{parseFloat(nebenkosten || '0').toFixed(2)} €</span></div><div className="flex justify-between items-center pb-2 border-b border-blue-300"><span className="font-semibold text-blue-900">Warmmiete (Monat):</span><span className="text-xl font-bold text-blue-600">{warmmiete.toFixed(2)} €</span></div><div className="flex justify-between items-center pt-2"><span className="text-sm">Jahreskaltmiete:</span><span className="font-semibold">{jahreskaltmiete.toFixed(2)} €</span></div></CardContent></Card>
            </div>
          </TabsContent>
          <TabsContent value="erhoehung" className="space-y-6 mt-6">
            <Alert><Info className="h-4 w-4" /><AlertDescription>Prüfung der Zulässigkeit einer Mieterhöhung nach § 558 BGB.</AlertDescription></Alert>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="space-y-2"><Label>Aktuelle Kaltmiete (€/Monat)</Label><Input aria-label="Aktuelle Kaltmiete (€/Monat)" type="number" value={aktuelleKaltmiete} onChange={(e) => setAktuelleKaltmiete(e.target.value)} /></div>
                <div className="space-y-2"><Label>Geplante neue Miete (€/Monat)</Label><Input aria-label="Geplante neue Miete (€/Monat)" type="number" value={neueMiete} onChange={(e) => setNeueMiete(e.target.value)} /></div>
                <div className="space-y-2"><Label>Gebiet</Label><select value={bundesland} onChange={(e) => setBundesland(e.target.value)} className="w-full rounded-md border px-3 py-2"><option value="normal">Normal (20%)</option><option value="gespannt">Angespannt (15%)</option></select></div>
              </div>
              <Card className={istZulaessig ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}><CardHeader><CardTitle className="text-lg flex items-center gap-2"><TrendingUp className={`h-5 w-5 ${istZulaessig ? 'text-green-600' : 'text-red-600'}`} />Prüfungsergebnis</CardTitle></CardHeader><CardContent className="space-y-3"><div className="flex justify-between items-center pb-2 border-b"><span className="text-sm">Erhöhung absolut:</span><span className="font-semibold">{erhoehungAbsolut.toFixed(2)} €</span></div><div className="flex justify-between items-center pb-2 border-b"><span className="text-sm">Erhöhung prozentual:</span><span className="font-semibold">{erhoehungProzent.toFixed(2)} %</span></div><div className="flex justify-between items-center pb-2 border-b"><span className="text-sm">Kappungsgrenze:</span><span className="font-semibold">{kappungsgrenze} %</span></div><div className="flex justify-between items-center pb-2 border-b"><span className="text-sm">Max. zulässig:</span><span className="font-semibold">{maxErhoehung.toFixed(2)} €</span></div><div className={`flex justify-between items-center pt-3 ${istZulaessig ? 'text-green-900' : 'text-red-900'}`}><span className="font-bold">Status:</span><span className="text-lg font-bold">{istZulaessig ? '✓ Zulässig' : '✗ Unzulässig'}</span></div></CardContent></Card>
            </div>
          </TabsContent>
          <TabsContent value="betriebskosten" className="space-y-6 mt-6">
            <Alert><Info className="h-4 w-4" /><AlertDescription>Berechnung der Betriebskosten nach Wohnfläche gemäß § 556 BGB und BetrKV.</AlertDescription></Alert>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="space-y-2"><Label>Wohnfläche (m²)</Label><Input aria-label="Wohnfläche (m²)" type="number" value={wohnflaeche} onChange={(e) => setWohnflaeche(e.target.value)} /></div>
                <div className="space-y-2"><Label>Gesamte Betriebskosten (€/Jahr)</Label><Input aria-label="Gesamte Betriebskosten (€/Jahr)" type="number" value={gesamtkosten} onChange={(e) => setGesamtkosten(e.target.value)} /></div>
                <div className="space-y-2"><Label>Gesamtwohnfläche (m²)</Label><Input aria-label="Gesamtwohnfläche (m²)" type="number" value={gesamtflaeche} onChange={(e) => setGesamtflaeche(e.target.value)} /></div>
              </div>
              <Card className="bg-amber-50 border-amber-200"><CardHeader><CardTitle className="text-lg flex items-center gap-2"><FileText className="h-5 w-5 text-amber-600" />Betriebskostenabrechnung</CardTitle></CardHeader><CardContent className="space-y-3"><div className="flex justify-between items-center pb-2 border-b"><span className="text-sm">Kosten pro m²:</span><span className="font-semibold">{betriebskostenProQm.toFixed(2)} €/m²</span></div><div className="flex justify-between items-center pb-2 border-b"><span className="text-sm">Wohnfläche:</span><span className="font-semibold">{wohnflaeche} m²</span></div><div className="flex justify-between items-center pb-2 border-b border-amber-300"><span className="font-semibold text-amber-900">Kosten (Jahr):</span><span className="text-xl font-bold text-amber-600">{betriebskostenWohnung.toFixed(2)} €</span></div><div className="flex justify-between items-center pt-2"><span className="text-sm">Kosten (Monat):</span><span className="font-semibold">{betriebskostenMonat.toFixed(2)} €</span></div></CardContent></Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
