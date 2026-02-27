import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Download } from "lucide-react";

interface AmortizationRow {
  month: number;
  payment: number;
  interest: number;
  principal: number;
  balance: number;
}

export default function AmortizationSchedule() {
  const [loanAmount, setLoanAmount] = useState<string>("300000");
  const [interestRate, setInterestRate] = useState<string>("3.5");
  const [initialRepayment, setInitialRepayment] = useState<string>("2.0");
  const [schedule, setSchedule] = useState<AmortizationRow[]>([]);
  const [showSchedule, setShowSchedule] = useState(false);

  const generateSchedule = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100;
    const repayment = parseFloat(initialRepayment) / 100;

    if (isNaN(principal) || isNaN(rate) || isNaN(repayment)) {
      alert("Bitte geben Sie gültige Zahlen ein.");
      return;
    }

    const annuityRate = rate + repayment;
    const monthlyPayment = (principal * annuityRate) / 12;

    let remainingBalance = principal;
    const rows: AmortizationRow[] = [];
    let month = 1;

    // Generate schedule for first 12 months (1 year)
    while (remainingBalance > 0 && month <= 120) {
      const monthlyInterest = (remainingBalance * rate) / 12;
      const monthlyPrincipal = monthlyPayment - monthlyInterest;
      remainingBalance -= monthlyPrincipal;

      if (remainingBalance < 0) remainingBalance = 0;

      rows.push({
        month,
        payment: monthlyPayment,
        interest: monthlyInterest,
        principal: monthlyPrincipal,
        balance: remainingBalance,
      });

      month++;
    }

    setSchedule(rows);
    setShowSchedule(true);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(value);
  };

  const downloadCSV = () => {
    const headers = ["Monat", "Rate", "Zinsen", "Tilgung", "Restschuld"];
    const csvContent = [
      headers.join(";"),
      ...schedule.map((row) =>
        [
          row.month,
          row.payment.toFixed(2),
          row.interest.toFixed(2),
          row.principal.toFixed(2),
          row.balance.toFixed(2),
        ].join(";")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "tilgungsplan.csv";
    link.click();
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-6 h-6 text-green-600" />
          Tilgungsplan-Generator
        </CardTitle>
        <CardDescription>
          Erstellen Sie einen detaillierten Tilgungsplan für Ihr Annuitätendarlehen
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="loanAmount2">Darlehensbetrag (€)</Label>
            <Input
              id="loanAmount2"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="300000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interestRate2">Sollzins p.a. (%)</Label>
            <Input
              id="interestRate2"
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="3.5"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="initialRepayment2">Anfängliche Tilgung p.a. (%)</Label>
            <Input
              id="initialRepayment2"
              type="number"
              step="0.1"
              value={initialRepayment}
              onChange={(e) => setInitialRepayment(e.target.value)}
              placeholder="2.0"
            />
          </div>
        </div>

        {/* Generate Button */}
        <Button onClick={generateSchedule} className="w-full" size="lg">
          <FileText className="w-4 h-4 mr-2" />
          Tilgungsplan erstellen
        </Button>

        {/* Amortization Schedule Table */}
        {showSchedule && schedule.length > 0 && (
          <div className="mt-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Tilgungsplan (erste 10 Jahre)</h3>
              <Button onClick={downloadCSV} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Als CSV herunterladen
              </Button>
            </div>

            <div className="border rounded-lg overflow-hidden max-h-96 overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Monat</TableHead>
                    <TableHead className="text-right">Rate</TableHead>
                    <TableHead className="text-right">Zinsen</TableHead>
                    <TableHead className="text-right">Tilgung</TableHead>
                    <TableHead className="text-right">Restschuld</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schedule.slice(0, 120).map((row) => (
                    <TableRow key={row.month}>
                      <TableCell>{row.month}</TableCell>
                      <TableCell className="text-right">{formatCurrency(row.payment)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(row.interest)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(row.principal)}</TableCell>
                      <TableCell className="text-right font-semibold">
                        {formatCurrency(row.balance)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-950 rounded-md">
              <p className="text-sm text-green-900 dark:text-green-100">
                <strong>Hinweis:</strong> Der Tilgungsplan zeigt die ersten 10 Jahre (120 Monate). 
                Die tatsächliche Laufzeit kann länger sein. Laden Sie die CSV-Datei herunter für den vollständigen Plan.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
