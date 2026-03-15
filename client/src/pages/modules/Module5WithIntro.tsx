import { useState } from "react";
import { ModuleIntro } from "@/components/ModuleIntro";
import Module5Detail from "./Module5Detail";

export default function Module5WithIntro() {
  const [showIntro, setShowIntro] = useState(true);

  if (showIntro) {
    return (
      <ModuleIntro
        moduleId={5}
        title="Darlehensvermittler §34i GewO"
        subtitle="Vollständige Vorbereitung auf die IHK-Sachkundeprüfung §34i GewO. Immobilienfinanzierung, Kreditrecht und Verbraucherschutz — alles für die Darlehensvermittlung."
        targetAudience="Für alle, die als Immobiliendarlehensvermittler tätig werden möchten. Ideal in Kombination mit Modul 2 (Makler) für ein vollständiges Beratungsangebot."
        duration="40 Lerntage"
        units="304"
        goal="Du kennst alle Finanzierungsprodukte, kannst Finanzierungsangebote vergleichen und Kunden bei der Immobilienfinanzierung professionell beraten — rechtssicher nach §34i GewO."
        whatYouLearn={[
          "§34i GewO: Erlaubnisvoraussetzungen und Pflichten",
          "Annuitätendarlehen: Berechnung, Tilgung, Zinsbindung",
          "Bausparvertrag, KfW-Förderung, Riester-Rente",
          "EU-Wohnimmobilienkreditrichtlinie (WIKR)",
          "ESIS-Merkblatt und Beratungsdokumentation",
          "Kreditwürdigkeitsprüfung und Beleihungswert",
        ]}
        whatYouCanAfter={[
          "Die IHK-Sachkundeprüfung §34i ablegen",
          "Annuitätendarlehen vollständig berechnen",
          "Kunden bei Immobilienfinanzierung beraten",
          "KfW-Förderprogramme erklären und vermitteln",
          "Als zertifizierter Darlehensvermittler arbeiten",
        ]}
        examRelevance="Orientiert am IHK-Rahmenplan §34i GewO. Alle Rechenaufgaben mit vollständigen Lösungswegen."
        legalBasis="§34i GewO, WIKR"
        difficulty="Mittelstufe"
        onStart={() => setShowIntro(false)}
      />
    );
  }

  return <Module5Detail />;
}
