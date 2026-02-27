import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp } from "lucide-react";

interface AnnuityResult {
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
  effectiveInterestRate: number;
}

export default function AnnuityCalculator() {
  const [loanAmount, setLoanAmount] = useState<string>("300000");
  const [interestRate, setInterestRate] = useState<string>("3.5");
  const [initialRepayment, setInitialRepayment] = useState<string>("2.0");
  const [fixedInterestPeriod, setFixedInterestPeriod] = useState<string>("10");
  const [result, setResult] = useState<AnnuityResult | null>(null);

  const calculateAnnuity = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100;
    const repayment = parseFloat(initialRepayment) / 100;
    const years = parseFloat(fixedInterestPeriod);

    if (isNaN(principal) || isNaN(rate) || isNaN(repayment) || isNaN(years)) {
      alert("Bitte geben Sie gültige Zahlen ein.");
      return;
    }

    // Annuitätenberechnung
    const annuityRate = rate + repayment;
    const monthlyRate = annuityRate / 12;
    const monthlyPayment = (principal * annuityRate) / 12;

    // Gesamtzinsen und Gesamtzahlung über Zinsbindung
    let remainingPrincipal = principal;
    let totalInterest = 0;
    const months = years * 12;

    for (let i = 0; i < months; i++) {
      const monthlyInterest = (remainingPrincipal * rate) / 12;
      const monthlyRepayment = monthlyPayment - monthlyInterest;
      totalInterest += monthlyInterest;
      remainingPrincipal -= monthlyRepayment;
    }

    const totalPayment = principal + totalInterest;
    const effectiveInterestRate = (totalInterest / principal / years) * 100;

    setResult({
      monthlyPayment,
      totalInterest,
      totalPayment,
      effectiveInterestRate,
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return value.toFixed(2) + "%";
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-6 h-6 text-blue-600" />
          Annuitätenrechner
        </CardTitle>
        <CardDescription>
          Berechnen Sie Ihre monatliche Rate, Gesamtzinsen und Effektivzins für ein Annuitätendarlehen
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="loanAmount">Darlehensbetrag (€)</Label>
            <Input
              id="loanAmount"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="300000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interestRate">Sollzins p.a. (%)</Label>
            <Input
              id="interestRate"
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="3.5"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="initialRepayment">Anfängliche Tilgung p.a. (%)</Label>
            <Input
              id="initialRepayment"
              type="number"
              step="0.1"
              value={initialRepayment}
              onChange={(e) => setInitialRepayment(e.target.value)}
              placeholder="2.0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fixedInterestPeriod">Zinsbindung (Jahre)</Label>
            <Input
              id="fixedInterestPeriod"
              type="number"
              value={fixedInterestPeriod}
              onChange={(e) => setFixedInterestPeriod(e.target.value)}
              placeholder="10"
            />
          </div>
        </div>

        {/* Calculate Button */}
        <Button onClick={calculateAnnuity} className="w-full" size="lg">
          <Calculator className="w-4 h-4 mr-2" />
          Berechnen
        </Button>

        {/* Results */}
        {result && (
          <div className="mt-6 p-6 bg-blue-50 dark:bg-blue-950 rounded-lg space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-blue-900 dark:text-blue-100">
              <TrendingUp className="w-5 h-5" />
              Ergebnis
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-slate-800 p-4 rounded-md">
                <p className="text-sm text-slate-600 dark:text-slate-400">Monatliche Rate</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {formatCurrency(result.monthlyPayment)}
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-4 rounded-md">
                <p className="text-sm text-slate-600 dark:text-slate-400">Gesamtzinsen</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {formatCurrency(result.totalInterest)}
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-4 rounded-md">
                <p className="text-sm text-slate-600 dark:text-slate-400">Gesamtzahlung</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {formatCurrency(result.totalPayment)}
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-4 rounded-md">
                <p className="text-sm text-slate-600 dark:text-slate-400">Effektivzins p.a.</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {formatPercent(result.effectiveInterestRate)}
                </p>
              </div>
            </div>

            <div className="mt-4 p-4 bg-blue-100 dark:bg-blue-900 rounded-md">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                <strong>Hinweis:</strong> Diese Berechnung ist eine vereinfachte Annuitätenberechnung. 
                Für eine genaue Finanzierungsplanung konsultieren Sie bitte einen Finanzberater.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
