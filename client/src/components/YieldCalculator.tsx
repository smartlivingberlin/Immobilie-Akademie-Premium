import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Calculator, Euro, Percent } from "lucide-react";

export function YieldCalculator() {
  const [purchasePrice, setPurchasePrice] = useState(300000);
  const [monthlyRent, setMonthlyRent] = useState(1000);
  const [purchaseCostsPercent, setPurchaseCostsPercent] = useState(10); // Notar, Steuer, Makler
  const [maintenanceCost, setMaintenanceCost] = useState(500); // Jährlich

  const [grossYield, setGrossYield] = useState(0);
  const [netYield, setNetYield] = useState(0);
  const [factor, setFactor] = useState(0);

  useEffect(() => {
    // Bruttomietrendite = Jahreskaltmiete / Kaufpreis * 100
    const annualRent = monthlyRent * 12;
    const gross = (annualRent / purchasePrice) * 100;
    
    // Nettomietrendite = (Jahreskaltmiete - Bewirtschaftung) / (Kaufpreis + Nebenkosten) * 100
    const purchaseCosts = purchasePrice * (purchaseCostsPercent / 100);
    const totalInvest = purchasePrice + purchaseCosts;
    const net = ((annualRent - maintenanceCost) / totalInvest) * 100;

    // Vervielfältiger = Kaufpreis / Jahreskaltmiete
    const fact = purchasePrice / annualRent;

    setGrossYield(gross);
    setNetYield(net);
    setFactor(fact);
  }, [purchasePrice, monthlyRent, purchaseCostsPercent, maintenanceCost]);

  return (
    <Card className="w-full border-blue-200 bg-blue-50/50 dark:bg-blue-950/10">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <CardTitle>Mietrendite-Rechner</CardTitle>
            <CardDescription>Berechnen Sie die Rentabilität einer Immobilie</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Inputs */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Kaufpreis (€)</Label>
              <div className="relative">
                <Euro className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="number" 
                  value={purchasePrice} 
                  onChange={(e) => setPurchasePrice(Number(e.target.value))}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Monatliche Kaltmiete (€)</Label>
              <div className="relative">
                <Euro className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="number" 
                  value={monthlyRent} 
                  onChange={(e) => setMonthlyRent(Number(e.target.value))}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Kaufnebenkosten (%) <span className="text-xs text-muted-foreground">(Notar, Grunderwerbsteuer, Makler)</span></Label>
              <div className="flex items-center gap-4">
                <Slider 
                  value={[purchaseCostsPercent]} 
                  onValueChange={(v) => setPurchaseCostsPercent(v[0])} 
                  max={20} 
                  step={0.5}
                  className="flex-1"
                />
                <span className="w-12 text-right font-medium">{purchaseCostsPercent}%</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Jährliche Instandhaltung (€)</Label>
              <Input 
                type="number" 
                value={maintenanceCost} 
                onChange={(e) => setMaintenanceCost(Number(e.target.value))}
              />
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4 bg-white dark:bg-slate-900 p-6 rounded-xl border shadow-sm">
            <div className="space-y-1">
              <span className="text-sm text-muted-foreground">Brutto-Mietrendite</span>
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {grossYield.toFixed(2)} %
              </div>
              <p className="text-xs text-slate-500">Jahresmiete / Kaufpreis</p>
            </div>

            <div className="h-px bg-slate-100 dark:bg-slate-800" />

            <div className="space-y-1">
              <span className="text-sm text-muted-foreground">Netto-Mietrendite</span>
              <div className={`text-3xl font-bold ${netYield > 4 ? "text-green-600" : netYield > 2 ? "text-yellow-600" : "text-red-600"}`}>
                {netYield.toFixed(2)} %
              </div>
              <p className="text-xs text-slate-500">Inkl. Kaufnebenkosten & Instandhaltung</p>
            </div>

            <div className="h-px bg-slate-100 dark:bg-slate-800" />

            <div className="space-y-1">
              <span className="text-sm text-muted-foreground">Vervielfältiger (Faktor)</span>
              <div className="text-xl font-semibold">
                {factor.toFixed(1)} x
              </div>
              <p className="text-xs text-slate-500">Jahresmieten bis Kaufpreis bezahlt</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
