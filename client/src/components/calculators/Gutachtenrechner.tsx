import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileCheck, TrendingUp, Home, Info } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

export function Gutachtenrechner() {
  const [vergleichspreis, setVergleichspreis] = useState<string>('3500');
  const [wohnflaeche, setWohnflaeche] = useState<string>('100');
  const [zuschlag, setZuschlag] = useState<string>('5');
  const [abschlag, setAbschlag] = useState<string>('3');
  const [jahresrohertrag, setJahresrohertrag] = useState<string>('24000');
  const [bewirtschaftungskosten, setBewirtschaftungskosten] = useState<string>('6000');
  const [liegenschaftszins, setLiegenschaftszins] = useState<string>('4');
  const [bodenwert, setBodenwert] = useState<string>('150000');
  const [herstellungskosten, setHerstellungskosten] = useState<string>('300000');
  const [alter, setAlter] = useState<string>('10');
  const [gesamtnutzungsdauer, setGesamtnutzungsdauer] = useState<string>('80');

  const vergleichswert = parseFloat(vergleichspreis || '0') * parseFloat(wohnflaeche || '0');
  const zuschlagBetrag = (vergleichswert * parseFloat(zuschlag || '0')) / 100;
  const abschlagBetrag = (vergleichswert * parseFloat(abschlag || '0')) / 100;
  const vergleichswertAngepasst = vergleichswert + zuschlagBetrag - abschlagBetrag;
  const reinertrag = parseFloat(jahresrohertrag || '0') - parseFloat(bewirtschaftungskosten || '0');
  const zins = parseFloat(liegenschaftszins || '0') / 100;
  const vervielfaeltiger = zins > 0 ? (1 - Math.pow(1 + zins, -50)) / zins : 0;
  const ertragswert = parseFloat(bodenwert || '0') + (reinertrag * vervielfaeltiger);
  const alterswertminderung = (parseFloat(alter || '0') / parseFloat(gesamtnutzungsdauer || '1')) * parseFloat(herstellungskosten || '0');
  const gebaeudewert = parseFloat(herstellungskosten || '0') - alterswertminderung;
  const sachwert = parseFloat(bodenwert || '0') + gebaeudewert;
  const sachwertfaktor = 1.0;
  const sachwertAngepasst = sachwert * sachwertfaktor;

  return (
    <Card className="border-l-4 border-l-rose-500">
      <CardHeader>
        <div className="flex items-center gap-3">
          <FileCheck className="h-6 w-6 text-rose-600" />
          <div>
            <CardTitle>Gutachtenrechner</CardTitle>
            <CardDescription>Immobilienbewertung nach ImmoWertV 2021</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="vergleichswert">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="vergleichswert">Vergleichswert</TabsTrigger>
            <TabsTrigger value="ertragswert">Ertragswert</TabsTrigger>
            <TabsTrigger value="sachwert">Sachwert</TabsTrigger>
          </TabsList>
          <TabsContent value="vergleichswert" className="space-y-6 mt-6">
            <Alert><Info className="h-4 w-4" /><AlertDescription>Vergleichswertverfahren gemäß §§ 15-16 ImmoWertV: Bewertung durch Vergleich mit tatsächlich erzielten Kaufpreisen.</AlertDescription></Alert>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="space-y-2"><Label>Vergleichspreis (€/m²)</Label><Input type="number" value={vergleichspreis} onChange={(e) => setVergleichspreis(e.target.value)} /></div>
                <div className="space-y-2"><Label>Wohnfläche (m²)</Label><Input type="number" value={wohnflaeche} onChange={(e) => setWohnflaeche(e.target.value)} /></div>
                <div className="space-y-2"><Label>Zuschlag (%)</Label><Input type="number" step="0.1" value={zuschlag} onChange={(e) => setZuschlag(e.target.value)} /></div>
                <div className="space-y-2"><Label>Abschlag (%)</Label><Input type="number" step="0.1" value={abschlag} onChange={(e) => setAbschlag(e.target.value)} /></div>
              </div>
              <Card className="bg-rose-50 border-rose-200"><CardHeader><CardTitle className="text-lg flex items-center gap-2"><Home className="h-5 w-5 text-rose-600" />Vergleichswert</CardTitle></CardHeader><CardContent className="space-y-3"><div className="flex justify-between items-center pb-2 border-b"><span className="text-sm">Basiswert:</span><span className="font-semibold">{vergleichswert.toFixed(2)} €</span></div><div className="flex justify-between items-center pb-2 border-b"><span className="text-sm">Zuschlag:</span><span className="font-semibold text-green-600">+{zuschlagBetrag.toFixed(2)} €</span></div><div className="flex justify-between items-center pb-2 border-b"><span className="text-sm">Abschlag:</span><span className="font-semibold text-red-600">-{abschlagBetrag.toFixed(2)} €</span></div><div className="flex justify-between items-center pb-2 border-b border-rose-300"><span className="font-semibold text-rose-900">Marktwert:</span><span className="text-xl font-bold text-rose-600">{vergleichswertAngepasst.toFixed(2)} €</span></div><div className="flex justify-between items-center pt-2"><span className="text-sm">Preis pro m²:</span><span className="font-semibold">{(vergleichswertAngepasst / parseFloat(wohnflaeche || '1')).toFixed(2)} €/m²</span></div></CardContent></Card>
            </div>
          </TabsContent>
          <TabsContent value="ertragswert" className="space-y-6 mt-6">
            <Alert><Info className="h-4 w-4" /><AlertDescription>Ertragswertverfahren gemäß §§ 17-20 ImmoWertV: Bewertung nach erzielbarem Ertrag (typisch für Mietobjekte).</AlertDescription></Alert>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="space-y-2"><Label>Jahresrohertrag (€)</Label><Input type="number" value={jahresrohertrag} onChange={(e) => setJahresrohertrag(e.target.value)} /></div>
                <div className="space-y-2"><Label>Bewirtschaftungskosten (€)</Label><Input type="number" value={bewirtschaftungskosten} onChange={(e) => setBewirtschaftungskosten(e.target.value)} /></div>
                <div className="space-y-2"><Label>Liegenschaftszinssatz (%)</Label><Input type="number" step="0.1" value={liegenschaftszins} onChange={(e) => setLiegenschaftszins(e.target.value)} /></div>
                <div className="space-y-2"><Label>Bodenwert (€)</Label><Input type="number" value={bodenwert} onChange={(e) => setBodenwert(e.target.value)} /></div>
              </div>
              <Card className="bg-sky-50 border-sky-200"><CardHeader><CardTitle className="text-lg flex items-center gap-2"><TrendingUp className="h-5 w-5 text-sky-600" />Ertragswert</CardTitle></CardHeader><CardContent className="space-y-3"><div className="flex justify-between items-center pb-2 border-b"><span className="text-sm">Jahresrohertrag:</span><span className="font-semibold">{parseFloat(jahresrohertrag || '0').toFixed(2)} €</span></div><div className="flex justify-between items-center pb-2 border-b"><span className="text-sm">Bewirtschaftungskosten:</span><span className="font-semibold">{parseFloat(bewirtschaftungskosten || '0').toFixed(2)} €</span></div><div className="flex justify-between items-center pb-2 border-b"><span className="text-sm">Reinertrag:</span><span className="font-semibold">{reinertrag.toFixed(2)} €</span></div><div className="flex justify-between items-center pb-2 border-b"><span className="text-sm">Vervielfältiger:</span><span className="font-semibold">{vervielfaeltiger.toFixed(2)}</span></div><div className="flex justify-between items-center pb-2 border-b border-sky-300"><span className="font-semibold text-sky-900">Ertragswert:</span><span className="text-xl font-bold text-sky-600">{ertragswert.toFixed(2)} €</span></div></CardContent></Card>
            </div>
          </TabsContent>
          <TabsContent value="sachwert" className="space-y-6 mt-6">
            <Alert><Info className="h-4 w-4" /><AlertDescription>Sachwertverfahren gemäß §§ 21-23 ImmoWertV: Bewertung nach Herstellungskosten abzüglich Alterswertminderung.</AlertDescription></Alert>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="space-y-2"><Label>Bodenwert (€)</Label><Input type="number" value={bodenwert} onChange={(e) => setBodenwert(e.target.value)} /></div>
                <div className="space-y-2"><Label>Herstellungskosten (€)</Label><Input type="number" value={herstellungskosten} onChange={(e) => setHerstellungskosten(e.target.value)} /></div>
                <div className="space-y-2"><Label>Alter (Jahre)</Label><Input type="number" value={alter} onChange={(e) => setAlter(e.target.value)} /></div>
                <div className="space-y-2"><Label>Gesamtnutzungsdauer (Jahre)</Label><Input type="number" value={gesamtnutzungsdauer} onChange={(e) => setGesamtnutzungsdauer(e.target.value)} /></div>
              </div>
              <Card className="bg-amber-50 border-amber-200"><CardHeader><CardTitle className="text-lg flex items-center gap-2"><FileCheck className="h-5 w-5 text-amber-600" />Sachwert</CardTitle></CardHeader><CardContent className="space-y-3"><div className="flex justify-between items-center pb-2 border-b"><span className="text-sm">Bodenwert:</span><span className="font-semibold">{parseFloat(bodenwert || '0').toFixed(2)} €</span></div><div className="flex justify-between items-center pb-2 border-b"><span className="text-sm">Herstellungskosten:</span><span className="font-semibold">{parseFloat(herstellungskosten || '0').toFixed(2)} €</span></div><div className="flex justify-between items-center pb-2 border-b"><span className="text-sm">Alterswertminderung:</span><span className="font-semibold text-red-600">-{alterswertminderung.toFixed(2)} €</span></div><div className="flex justify-between items-center pb-2 border-b"><span className="text-sm">Gebäudewert:</span><span className="font-semibold">{gebaeudewert.toFixed(2)} €</span></div><div className="flex justify-between items-center pb-2 border-b border-amber-300"><span className="font-semibold text-amber-900">Sachwert:</span><span className="text-xl font-bold text-amber-600">{sachwertAngepasst.toFixed(2)} €</span></div></CardContent></Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
