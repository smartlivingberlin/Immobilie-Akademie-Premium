import { useState } from "react";
import { ModuleIntro } from "@/components/ModuleIntro";
import Module3Detail from "./Module3Detail";

export default function Module3WithIntro() {
  const [showIntro, setShowIntro] = useState(true);

  if (showIntro) {
    return (
      <ModuleIntro
        moduleId={3}
        title="Verwalter WEG & Mietrecht"
        subtitle="Das umfangreichste Modul — für alle, die Wohnungseigentümergemeinschaften oder Mietobjekte professionell verwalten möchten. Fundiertes Wissen für die tägliche Verwaltungspraxis."
        targetAudience="Für angehende WEG-Verwalter, Hausverwalter und Property Manager. Auch ideal für Immobilieneigentümer, die ihre eigenen Objekte besser verwalten möchten."
        duration="80 Lerntage"
        units="528"
        goal="Du kannst Eigentümerversammlungen leiten, Wirtschaftspläne erstellen, Mietverträge rechtssicher gestalten und alle Verwaltungsaufgaben nach aktuellem WEG und Mietrecht ausführen."
        whatYouLearn={[
          "WEG 2020: Alle Neuerungen und praktische Anwendung",
          "Eigentümerversammlung: Einladung, Beschlüsse, Protokoll",
          "Wirtschaftsplan und Jahresabrechnung erstellen",
          "Mietvertrag, Kündigung, Schönheitsreparaturen",
          "Nebenkostenabrechnung Schritt für Schritt",
          "Instandhaltung, Instandsetzung, Modernisierung",
        ]}
        whatYouCanAfter={[
          "WEG-Versammlungen rechtssicher durchführen",
          "Nebenkostenabrechnungen erstellen und prüfen",
          "Mietrechtliche Konflikte einschätzen",
          "Themen der Prüfung zum zertifizierten Verwalter nach §26a WEG einordnen",
          "Eigene Immobilien professionell verwalten",
        ]}
        examRelevance="Vorbereitung auf Themen der IHK-Prüfung zum zertifizierten Verwalter nach §26a WEG. Enthält aktuelle BGH-Urteile 2023-2025 zu WEG und Mietrecht."
        legalBasis="WEG, BGB §535ff"
        difficulty="Fortgeschritten"
        onStart={() => setShowIntro(false)}
      />
    );
  }

  return <Module3Detail />;
}
