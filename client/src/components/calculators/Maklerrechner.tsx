import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, Home, Calculator, Info } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

export function Maklerrechner() {
  const [kaufpreis, setKaufpreis] = useState<string>('300000');
  const [provisionssatz, setProvisionssatz] = useState<string>('3.57');
  const [aufteilung, setAufteilung] = useState<string>('50');
  const [kaltmiete, setKaltmiete] = useState<string>('1200');
  const [provisionMonate, setProvisionMonate] = useState<string>('2');
  const [nettoProvision, setNettoProvision] = useState<string>('10000');

  const mwstSatz = 19;
  const provisionBrutto = (parseFloat(kaufpreis || '0') * parseFloat(provisionssatz || '0')) / 100;
  const provisionNetto = provisionBrutto / (1 + mwstSatz / 100);
  const mwst = provisionBrutto - provisionNetto;
  const kaeuferAnteil = (provisionBrutto * parseFloat(aufteilung || '0')) / 100;
  const verkaeuferAnteil = provisionBrutto - kaeuferAnteil;
  const provisionVermietung = parseFloat(kaltmiete || '0') * parseFloat(provisionMonate || '0');
  const provisionVermietungNetto = provisionVermietung / (1 + mwstSatz / 100);
  const mwstVermietung = provisionVermietung - provisionVermietungNetto;
  const bruttoProvision = parseFloat(nettoProvision || '0') * (1 + mwstSatz / 100);
  const mwstBetrag = bruttoProvision - parseFloat(nettoProvision || '0');

  return (
    <Card className="border-l-4 border-l-indigo-500">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Briefcase className="h-6 w-6 text-indigo-600" />
          <div>
            <CardTitle>Maklerrechner</CardTitle>
            <CardDescription>Provisions-Berechnungen für Immobilienmakler nach § 34c GewO</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="kauf">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="kauf">Kaufprovision</TabsTrigger>
            <TabsTrigger value="vermietung">Mietprovision</TabsTrigger>
            <TabsTrigger value="netto">Netto/Brutto</TabsTrigger>
          </TabsList>
          <TabsContent value="kauf" className="space-y-6 mt-6">
            <Alert><Info className="h-4 w-4" /><AlertDescription>Berechnung der Courtage beim Immobilienkauf. Seit 23.12.2020 gilt das Bestellerprinzip: Käufer und Verkäufer teilen die Provision mindestens 50:50.</AlertDescription></Alert>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="space-y-2"><Label>Kaufpreis (€)</Label><Input aria-label="Kaufpreis (€)" type="number" value={kaufpreis} onChange={(e) => setKaufpreis(e.target.value)} /></div>
                <div className="space-y-2"><Label>Provisionssatz (% inkl. MwSt.)</Label><Input aria-label="Provisionssatz (% inkl. MwSt.)" type="number" step="0.01" value={provisionssatz} onChange={(e) => setProvisionssatz(e.target.value)} /></div>
                <div className="space-y-2"><Label>Aufteilung Käufer (%)</Label><Input aria-label="Aufteilung Käufer (%)" type="number" value={aufteilung} onChange={(e) => setAufteilung(e.target.value)} /></div>
              </div>
              <Card className="bg-indigo-50 border-indigo-200"><CardHeader><CardTitle className="text-lg flex items-center gap-2"><Calculator className="h-5 w-5 text-indigo-600" />Provisions-Berechnung</CardTitle></CardHeader><CardContent className="space-y-3"><div className="flex justify-between items-center pb-2 border-b"><span className="text-sm">Provision brutto:</span><span className="font-semibold">{provisionBrutto.toFixed(2)} €</span></div><div className="flex justify-between items-center pb-2 border-b"><span className="text-sm">Provision netto:</span><span className="font-semibold">{provisionNetto.toFixed(2)} €</span></div><div className="flex justify-between items-center pb-2 border-b"><span className="text-sm">MwSt. ({mwstSatz}%):</span><span className="font-semibold">{mwst.toFixed(2)} €</span></div><div className="flex justify-between items-center pb-2 border-b border-indigo-300"><span className="font-semibold text-indigo-900">Käufer zahlt:</span><span className="text-xl font-bold text-indigo-600">{kaeuferAnteil.toFixed(2)} €</span></div><div className="flex justify-between items-center pt-2"><span className="text-sm">Verkäufer zahlt:</span><span className="font-semibold">{verkaeuferAnteil.toFixed(2)} €</span></div></CardContent></Card>
            </div>
          </TabsContent>
          <TabsContent value="vermietung" className="space-y-6 mt-6">
            <Alert><Info className="h-4 w-4" /><AlertDescription>Berechnung der Provision bei Wohnraumvermietung. Seit 01.06.2015 gilt das Bestellerprinzip: Wer den Makler beauftragt, zahlt die Provision.</AlertDescription></Alert>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="space-y-2"><Label>Kaltmiete (€/Monat)</Label><Input aria-label="Kaltmiete (€/Monat)" type="number" value={kaltmiete} onChange={(e) => setKaltmiete(e.target.value)} /></div>
                <div className="space-y-2"><Label>Provision (Monatsmieten)</Label><Input aria-label="Provision (Monatsmieten)" type="number" step="0.1" value={provisionMonate} onChange={(e) => setProvisionMonate(e.target.value)} /></div>
              </div>
              <Card className="bg-teal-50 border-teal-200"><CardHeader><CardTitle className="text-lg flex items-center gap-2"><Home className="h-5 w-5 text-teal-600" />Mietprovision</CardTitle></CardHeader><CardContent className="space-y-3"><div className="flex justify-between items-center pb-2 border-b"><span className="text-sm">Kaltmiete:</span><span className="font-semibold">{parseFloat(kaltmiete || '0').toFixed(2)} €</span></div><div className="flex justify-between items-center pb-2 border-b"><span className="text-sm">Faktor:</span><span className="font-semibold">{provisionMonate} Monate</span></div><div className="flex justify-between items-center pb-2 border-b border-teal-300"><span className="font-semibold text-teal-900">Provision brutto:</span><span className="text-xl font-bold text-teal-600">{provisionVermietung.toFixed(2)} €</span></div><div className="flex justify-between items-center pb-2 border-b"><span className="text-sm">Provision netto:</span><span className="font-semibold">{provisionVermietungNetto.toFixed(2)} €</span></div><div className="flex justify-between items-center pt-2"><span className="text-sm">MwSt. ({mwstSatz}%):</span><span className="font-semibold">{mwstVermietung.toFixed(2)} €</span></div></CardContent></Card>
            </div>
          </TabsContent>
          <TabsContent value="netto" className="space-y-6 mt-6">
            <Alert><Info className="h-4 w-4" /><AlertDescription>Umrechnung zwischen Netto- und Bruttoprovision mit 19% Mehrwertsteuer.</AlertDescription></Alert>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="space-y-2"><Label>Nettoprovision (€)</Label><Input aria-label="Nettoprovision (€)" type="number" value={nettoProvision} onChange={(e) => setNettoProvision(e.target.value)} /></div>
              </div>
              <Card className="bg-cyan-50 border-cyan-200"><CardHeader><CardTitle className="text-lg flex items-center gap-2"><Calculator className="h-5 w-5 text-cyan-600" />Netto/Brutto-Kalkulation</CardTitle></CardHeader><CardContent className="space-y-3"><div className="flex justify-between items-center pb-2 border-b"><span className="text-sm">Nettoprovision:</span><span className="font-semibold">{parseFloat(nettoProvision || '0').toFixed(2)} €</span></div><div className="flex justify-between items-center pb-2 border-b"><span className="text-sm">MwSt. ({mwstSatz}%):</span><span className="font-semibold">{mwstBetrag.toFixed(2)} €</span></div><div className="flex justify-between items-center pb-2 border-b border-cyan-300"><span className="font-semibold text-cyan-900">Bruttoprovision:</span><span className="text-xl font-bold text-cyan-600">{bruttoProvision.toFixed(2)} €</span></div></CardContent></Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
