import { useState } from "react";
import { ModuleIntro } from "@/components/ModuleIntro";
import Module2Detail from "./Module2Detail";

export default function Module2WithIntro() {
  const [showIntro, setShowIntro] = useState(true);

  if (showIntro) {
    return (
      <ModuleIntro
        moduleId={2}
        title="Immobilienmakler §34c GewO"
        subtitle="Vollständige Vorbereitung auf die IHK-Sachkundeprüfung §34c GewO. Von Maklerrecht über Vertragsgestaltung bis zur Bewertung — alles was du als Makler wissen musst."
        targetAudience="Für alle, die als Immobilienmakler tätig werden möchten. Ob Quereinsteiger aus dem Vertrieb, der Verwaltung oder völlig anderen Bereichen — dieses Modul führt dich sicher zur §34c-Erlaubnis."
        duration="60 Lerntage"
        units="440"
        goal="Du kennst alle rechtlichen Voraussetzungen für die Maklertätigkeit, kannst Maklerverträge korrekt gestalten, Provisionen berechnen und Immobilien marktgerecht bewerten."
        whatYouLearn={[
          "§34c GewO: Voraussetzungen und Beantragung",
          "Maklervertrag, Courtage und Provisionsrecht",
          "Immobilienbewertung: Vergleichs-, Ertrags- und Sachwertverfahren",
          "Kaufvertragsrecht und Beurkundungspflicht",
          "Energieausweis, Widerrufsrecht, Fernabsatz",
          "Geldwäschegesetz (GwG) Pflichten für Makler",
        ]}
        whatYouCanAfter={[
          "Die IHK-Sachkundeprüfung §34c ablegen",
          "Maklerverträge rechtssicher gestalten",
          "Provision korrekt berechnen und durchsetzen",
          "Immobilien mit allen 3 Verfahren bewerten",
          "Als selbständiger Immobilienmakler arbeiten",
        ]}
        examRelevance="Orientiert am IHK-Rahmenplan §34c GewO. Enthält prüfungsrelevante Übungsaufgaben mit Lösungen und Prüfungssimulation."
        legalBasis="§34c GewO"
        difficulty="Mittelstufe"
        onStart={() => setShowIntro(false)}
      />
    );
  }

  return <Module2Detail />;
}
