import React from 'react';
import { Mietrechner } from '@/components/calculators/Mietrechner';
import { WEGRechner } from '@/components/calculators/WEGRechner';
import { Maklerrechner } from '@/components/calculators/Maklerrechner';
import { Darlehensrechner } from '@/components/calculators/Darlehensrechner';
import { Gutachtenrechner } from '@/components/calculators/Gutachtenrechner';
import { Calculator } from 'lucide-react';

export default function Rechner() {
  return (
    <section aria-label="Praxisrechner">
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Calculator className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-slate-900">Praxisrechner</h1>
          </div>
          <p className="text-lg text-slate-600">
            Professionelle Berechnungstools für alle Bereiche der Immobilienwirtschaft. 
            Nutzen Sie unsere interaktiven Rechner für präzise Kalkulationen nach aktuellen gesetzlichen Vorgaben.
          </p>
        </div>

        <div className="space-y-8">
          <Mietrechner />
          <WEGRechner />
          <Maklerrechner />
          <Darlehensrechner />
          <Gutachtenrechner />
        </div>

        <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h2 className="text-xl font-semibold text-blue-900 mb-3">Hinweise zur Nutzung</h2>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• Alle Berechnungen erfolgen nach aktuellen gesetzlichen Vorgaben (BGB, WEG, GewO, ImmoWertV 2021)</li>
            <li>• Die Rechner dienen der Orientierung und ersetzen keine individuelle Beratung</li>
            <li>• Eingaben werden nicht gespeichert und verbleiben in Ihrem Browser</li>
            <li>• Für verbindliche Auskünfte konsultieren Sie bitte einen Fachexperten</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
  );
}
