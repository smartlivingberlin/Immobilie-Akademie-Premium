import React, { useState } from "react";
import PortalToolGuard from "@/components/PortalToolGuard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnnuityCalculator from "@/components/calculators/AnnuityCalculator";
import AmortizationSchedule from "@/components/calculators/AmortizationSchedule";
import LoanToValueCalculator from "@/components/calculators/LoanToValueCalculator";
import VorfaelligkeitsentschaedigungCalculator from "@/components/calculators/VorfaelligkeitsentschaedigungCalculator";
import HaushaltsrechnerCalculator from "@/components/calculators/HaushaltsrechnerCalculator";
import { Calculator, FileText, Home, AlertCircle, Wallet } from "lucide-react";

export default function Calculators() {
  return (
    <PortalToolGuard>
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-slate-100">
            Finanzierungsrechner
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Professionelle Rechner für Darlehensvermittlung und Immobilienfinanzierung (§34i)
          </p>
        </div>

        {/* Calculators Tabs */}
        <Tabs defaultValue="annuity" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 mb-8">
            <TabsTrigger value="annuity" className="flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              Annuität
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Tilgungsplan
            </TabsTrigger>
            <TabsTrigger value="ltv" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Beleihung
            </TabsTrigger>
            <TabsTrigger value="vfe" className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              VFE
            </TabsTrigger>
            <TabsTrigger value="haushalt" className="flex items-center gap-2">
              <Wallet className="w-4 h-4" />
              Haushalt
            </TabsTrigger>
          </TabsList>

          <TabsContent value="annuity">
            <AnnuityCalculator />
          </TabsContent>

          <TabsContent value="schedule">
            <AmortizationSchedule />
          </TabsContent>

          <TabsContent value="ltv">
            <LoanToValueCalculator />
          </TabsContent>

          <TabsContent value="vfe">
            <VorfaelligkeitsentschaedigungCalculator />
          </TabsContent>

          <TabsContent value="haushalt">
            <HaushaltsrechnerCalculator />
          </TabsContent>
        </Tabs>

        {/* Info Section */}
        <div className="mt-12 p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
            Über die Rechner
          </h2>
          <div className="space-y-4 text-slate-700 dark:text-slate-300">
            <p>
              Diese Rechner sind speziell für die Ausbildung zum Darlehensvermittler (§34i GewO) entwickelt worden
              und helfen Ihnen, die wichtigsten Finanzierungsberechnungen zu verstehen und durchzuführen.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
              <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-md">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Annuität</h3>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Berechnet die monatliche Rate, Gesamtzinsen und Effektivzins für ein Annuitätendarlehen.
                </p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-950 rounded-md">
                <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">Tilgungsplan</h3>
                <p className="text-sm text-green-800 dark:text-green-200">
                  Erstellt einen detaillierten Tilgungsplan mit monatlichen Raten, Zinsen und Restschuld.
                </p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-md">
                <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Beleihung</h3>
                <p className="text-sm text-purple-800 dark:text-purple-200">
                  Berechnet den Beleihungsauslauf (LTV) und die Eigenkapitalquote für eine Immobilienfinanzierung.
                </p>
              </div>
              <div className="p-4 bg-red-50 dark:bg-red-950 rounded-md">
                <h3 className="font-semibold text-red-900 dark:text-red-100 mb-2">Vorfälligkeit (VFE)</h3>
                <p className="text-sm text-red-800 dark:text-red-200">
                  Berechnet die VFE bei vorzeitiger Darlehensrückzahlung nach der Aktuar-Methode.
                </p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-950 rounded-md">
                <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">Haushalt</h3>
                <p className="text-sm text-green-800 dark:text-green-200">
                  Ermittelt das verfügbare Einkommen und die maximale Darlehensrate für Finanzierungen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </PortalToolGuard>
  );
}
