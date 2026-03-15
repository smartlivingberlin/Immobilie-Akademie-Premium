import { useState } from "react";
import { ModuleIntro } from "@/components/ModuleIntro";
import Module4Detail from "./Module4Detail";

export default function Module4WithIntro() {
  const [showIntro, setShowIntro] = useState(true);

  if (showIntro) {
    return (
      <ModuleIntro
        moduleId={4}
        title="Gutachter & Sachverständiger"
        subtitle="Immobilienbewertung auf professionellem Niveau. Alle drei Wertermittlungsverfahren nach ImmoWertV 2021 — für Gutachter, Sachverständige und alle die Immobilien professionell bewerten wollen."
        targetAudience="Für alle, die Immobilien professionell bewerten möchten — als öffentlich bestellter Sachverständiger, für Banken, Erbschaften, Scheidungen oder eigene Investitionsentscheidungen."
        duration="40 Lerntage"
        units="264"
        goal="Du beherrschst alle drei Wertermittlungsverfahren nach ImmoWertV 2021, kannst Gutachten erstellen und Immobilienwerte für verschiedene Zwecke korrekt ermitteln."
        whatYouLearn={[
          "Vergleichswertverfahren: Kaufpreissammlungen, Indexreihen",
          "Ertragswertverfahren: Liegenschaftszins, Rohertrag, Reinertrag",
          "Sachwertverfahren: Herstellungskosten, Alterswertminderung",
          "ImmoWertV 2021: Neue Regelungen und Anwendung",
          "Bodenrichtwerte: BORIS, Gutachterausschüsse",
          "Besondere Werteinflüsse und Korrekturen",
        ]}
        whatYouCanAfter={[
          "Alle drei Verfahren selbständig anwenden",
          "Einfache Verkehrswertgutachten erstellen",
          "Immobilienwerte für Banken und Gerichte ermitteln",
          "Grundstücke und Gebäude separat bewerten",
          "Gutachterausschuss-Daten korrekt interpretieren",
        ]}
        examRelevance="Fundierte Vorbereitung auf Sachverständigentätigkeit nach ImmoWertV 2021. Alle Berechnungen mit vollständigen Lösungswegen und Berliner Marktdaten."
        legalBasis="ImmoWertV 2021"
        difficulty="Fortgeschritten"
        onStart={() => setShowIntro(false)}
      />
    );
  }

  return <Module4Detail />;
}
