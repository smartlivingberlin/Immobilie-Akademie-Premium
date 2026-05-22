import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Home, AlertCircle, CheckCircle2 } from "lucide-react";

interface LTVResult {
  loanToValue: number;
  equityRatio: number;
  riskCategory: "low" | "medium" | "high";
  recommendation: string;
}

export default function LoanToValueCalculator() {
  const [propertyValue, setPropertyValue] = useState<string>("400000");
  const [loanAmount, setLoanAmount] = useState<string>("300000");
  const [result, setResult] = useState<LTVResult | null>(null);

  const calculateLTV = () => {
    const value = parseFloat(propertyValue);
    const loan = parseFloat(loanAmount);

    if (isNaN(value) || isNaN(loan) || value <= 0) {
      console.warn("Ungültige Eingabe: LTV");
      return;
    }

    const loanToValue = (loan / value) * 100;
    const equityRatio = ((value - loan) / value) * 100;

    let riskCategory: "low" | "medium" | "high";
    let recommendation: string;

    if (loanToValue <= 60) {
      riskCategory = "low";
      recommendation =
        "Sehr gute Beleihung! Mit einem Beleihungsauslauf unter 60% erhalten Sie in der Regel die besten Konditionen und niedrigste Zinsen.";
    } else if (loanToValue <= 80) {
      riskCategory = "medium";
      recommendation =
        "Moderate Beleihung. Ein Beleihungsauslauf zwischen 60-80% ist üblich und akzeptabel. Die Konditionen sind in der Regel noch gut.";
    } else {
      riskCategory = "high";
      recommendation =
        "Hohe Beleihung! Bei einem Beleihungsauslauf über 80% steigen die Zinsen deutlich. Erwägen Sie eine höhere Eigenkapitalquote oder prüfen Sie KfW-Förderungen.";
    }

    setResult({
      loanToValue,
      equityRatio,
      riskCategory,
      recommendation,
    });
  };

  const formatPercent = (value: number) => {
    return value.toFixed(2) + "%";
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(value);
  };

  const getRiskColor = (category: "low" | "medium" | "high") => {
    switch (category) {
      case "low":
        return "text-green-600 dark:text-green-400";
      case "medium":
        return "text-yellow-600 dark:text-yellow-400";
      case "high":
        return "text-red-600 dark:text-red-400";
    }
  };

  const getRiskBgColor = (category: "low" | "medium" | "high") => {
    switch (category) {
      case "low":
        return "bg-green-50 dark:bg-green-950";
      case "medium":
        return "bg-yellow-50 dark:bg-yellow-950";
      case "high":
        return "bg-red-50 dark:bg-red-950";
    }
  };

  const getRiskIcon = (category: "low" | "medium" | "high") => {
    switch (category) {
      case "low":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case "medium":
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case "high":
        return <AlertCircle className="w-5 h-5 text-red-600" />;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Home className="w-6 h-6 text-purple-600" />
          Beleihungsauslauf-Rechner (LTV)
        </CardTitle>
        <CardDescription>
          Berechnen Sie den Beleihungsauslauf (Loan-to-Value) und Ihre Eigenkapitalquote
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="propertyValue">Immobilienwert (€)</Label>
            <Input
              id="propertyValue"
              type="number"
              value={propertyValue}
              onChange={(e) => setPropertyValue(e.target.value)}
              placeholder="400000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="loanAmount3">Darlehensbetrag (€)</Label>
            <Input
              id="loanAmount3"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="300000"
            />
          </div>
        </div>

        {/* Calculate Button */}
        <Button onClick={calculateLTV} className="w-full" size="lg">
          <Home className="w-4 h-4 mr-2" />
          Berechnen
        </Button>

        {/* Results */}
        {result && (
          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-md">
                <p className="text-sm text-purple-600 dark:text-purple-400">Beleihungsauslauf (LTV)</p>
                <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                  {formatPercent(result.loanToValue)}
                </p>
              </div>

              <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-md">
                <p className="text-sm text-purple-600 dark:text-purple-400">Eigenkapitalquote</p>
                <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                  {formatPercent(result.equityRatio)}
                </p>
              </div>
            </div>

            {/* Risk Assessment */}
            <div className={`p-6 rounded-lg ${getRiskBgColor(result.riskCategory)}`}>
              <div className="flex items-start gap-3">
                {getRiskIcon(result.riskCategory)}
                <div className="flex-1">
                  <h4 className={`font-semibold mb-2 ${getRiskColor(result.riskCategory)}`}>
                    {result.riskCategory === "low" && "Niedriges Risiko"}
                    {result.riskCategory === "medium" && "Mittleres Risiko"}
                    {result.riskCategory === "high" && "Hohes Risiko"}
                  </h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300">{result.recommendation}</p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-md space-y-2">
              <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                Beleihungsauslauf-Kategorien:
              </h4>
              <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                <li className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  <span>≤ 60%: Beste Konditionen (Top-Zinsen)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                  <span>60-80%: Gute Konditionen (Standard-Zinsen)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <span>&gt; 80%: Höhere Zinsen (Risikoaufschlag)</span>
                </li>
              </ul>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-md">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                <strong>Hinweis:</strong> Der Beleihungsauslauf ist ein wichtiger Faktor für die Zinskonditionen. 
                Je niedriger der Beleihungsauslauf, desto günstiger sind in der Regel die Zinsen.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
