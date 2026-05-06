import { useState } from "react";
import { ModuleIntro } from "@/components/ModuleIntro";
import Module1Detail from "./Module1Detail";

export default function Module1WithIntro() {
  const [showIntro, setShowIntro] = useState(true);

  if (showIntro) {
    return (
      <ModuleIntro
        moduleId={1}
        title="Ihr Fundament in der Immobilienwirtschaft"
        subtitle="Der ideale Einstieg für alle, die neu in der Immobilienbranche sind. Du lernst die wichtigsten Grundlagen, Rechtsgrundlagen und Marktstrukturen — verständlich erklärt, ohne Vorkenntnisse."
        targetAudience="Dieses Modul richtet sich an Quereinsteiger aus allen Berufsfeldern, die eine Karriere als Immobilienmakler, Verwalter oder Sachverständiger anstreben. Keine Vorkenntnisse in der Immobilienwirtschaft erforderlich."
        duration="20 Lerntage"
        units="160"
        goal="Nach diesem Modul kennst du den deutschen Immobilienmarkt, seine wichtigsten Akteure, Rechtsgrundlagen und Objektarten. Du verstehst die Grundbegriffe der Immobilienwirtschaft und kannst dich sicher in Fachgesprächen bewegen."
        whatYouLearn={[
          "Aufbau und Struktur des deutschen Immobilienmarkts",
          "Wichtigste Gesetze: BGB, GewO, WEG, MietG",
          "Objektarten: Wohn-, Gewerbe- und Spezialimmobilien",
          "Akteure: Makler, Verwalter, Gutachter, Banken",
          "Grundbuch, Eigentum und dingliche Rechte",
          "Öffentliches Baurecht und Baugenehmigungen",
        ]}
        whatYouCanAfter={[
          "Den deutschen Immobilienmarkt einordnen und beschreiben",
          "Fachbegriffe sicher verwenden",
          "Einfache Rechtsfragen zu Kauf und Miete beantworten",
          "Die IHK-Sachkundeprüfung §34c vorbereiten",
          "Berufsbild Immobilienmakler vollständig erklären",
        ]}
        examRelevance="Modul 1 bildet die Grundlage für alle weiteren Module und die IHK-Sachkundeprüfung §34c GewO. Ca. 20% der IHK-Prüfungsfragen entstammen den Themen dieses Moduls."
        legalBasis="§34c GewO"
        difficulty="Einsteiger"
        onStart={() => setShowIntro(false)}
      />
    );
  }

  return <Module1Detail />;
}
// rebuild Wed May  6 21:14:37 CEST 2026
