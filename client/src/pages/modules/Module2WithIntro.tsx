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
        subtitle="Fach- und Praxisvorbereitung §34c GewO. Von Maklerrecht über Vertragsgestaltung bis zur Bewertung — alles was du als Makler wissen musst."
        targetAudience="Für alle, die als Immobilienmakler tätig werden möchten. Ob Quereinsteiger aus dem Vertrieb, der Verwaltung oder völlig anderen Bereichen — dieses Modul führt dich sicher zur §34c-Erlaubnis."
        duration="60 Lerntage"
        units="480"
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
          "Maklerrecht und §34c-Praxiswissen vertiefen",
          "Maklerverträge rechtssicher gestalten",
          "Provision korrekt berechnen und durchsetzen",
          "Immobilien mit allen 3 Verfahren bewerten",
          "Als selbständiger Immobilienmakler arbeiten",
        ]}
        examRelevance="Orientiert an typischen §34c-Weiterbildungsthemen. Enthält Praxisaufgaben mit Lösungen und Wissenschecks."
        legalBasis="§34c GewO"
        difficulty="Mittelstufe"
        onStart={() => setShowIntro(false)}
      />
    );
  }

  return <Module2Detail />;
}
