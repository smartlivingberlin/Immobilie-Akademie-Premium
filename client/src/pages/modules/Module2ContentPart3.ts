// Content Data für Modul 2, Teil 3 (Tag 41-60)
// Themen: Marketing, Digitalisierung, Karriere

export const contentDataPart3: Record<string, {
  title: string;
  theory: string;
  law: string[];
  practice: string;
  task?: string;
  tasks?: Array<{type?: string; question: string; hint?: string}>;
  quiz?: Array<{question: string; options?: string[]; answer?: string; correct?: number; explanation?: string}>;
  type?: string;
}> = {
  // Woche 9-10: Marketing & Digitalisierung (Tag 41-50)
  day_41: {
    title: "Zielgruppenanalyse & Personas",
    theory: "Wer ist mein Kunde? Sinus-Milieus. Buyer Personas erstellen (Der 'Sicherheitsorientierte', Der 'Prestige-Käufer').",
    law: ["DSGVO (Profiling)"],
    practice: "Entwicklung einer Persona für eine Luxus-Penthouse-Wohnung.",
    task: "Erstellen Sie ein Steckbrief für Ihre ideale Zielgruppe.",
    type: "Marketing"
  },
  day_42: {
    title: "Social Media Marketing für Makler",
    theory: "Facebook, Instagram, LinkedIn, TikTok. Content-Strategie. Personal Branding. Community Management.",
    law: ["UWG (Schleichwerbung)", "Urheberrecht"],
    practice: "Planung einer Social-Media-Kampagne für ein Neubauprojekt.",
    task: "Erstellen Sie einen Redaktionsplan für eine Woche.",
    type: "Marketing"
  },
  day_43: {
    title: "Video-Marketing & Drohnen",
    theory: "Bewegtbild wirkt. Immobilienvideos. Drohnenaufnahmen (Rechtliche Lage: Drohnenverordnung).",
    law: ["LuftVO (Drohnenverordnung)", "KunstUrhG (Recht am eigenen Bild)"],
    practice: "Drehbuch für einen 60-Sekunden-Immobilien-Teaser.",
    task: "Erstellen Sie ein Storyboard für einen Objektfilm.",
    type: "Marketing"
  },
  day_44: {
    title: "360-Grad-Besichtigungen",
    theory: "Virtuelle Touren (Matterport, Ogulo). Vorteile: Vorqualifizierung, Zeitersparnis. Nachteile: Kosten, Technik.",
    law: ["DSGVO (Datenschutz bei Aufnahmen)"],
    practice: "Erstellung einer virtuellen Tour. Datenschutzhinweise beachten (persönliche Fotos verpixeln).",
    task: "Vergleichen Sie 3 Anbieter für virtuelle Besichtigungen.",
    type: "Digital"
  },
  day_45: {
    title: "CRM-Systeme & Lead-Management",
    theory: "Customer Relationship Management. Lead-Funnel. Automatisierung (Auto-Responder). DSGVO-Konformität.",
    law: ["DSGVO"],
    practice: "Einrichtung eines Workflows: Von der Anfrage bis zum Exposé-Versand.",
    task: "Definieren Sie die Phasen Ihres Vertriebstrichters (Sales Funnel).",
    type: "Digital"
  },
  day_46: {
    title: "Print-Marketing & Flyer",
    theory: "Ist Print tot? Hochwertige Broschüren. Nachbarschafts-Flyer (Farming). Haptik zählt.",
    law: ["UWG (Briefkastenwerbung)"],
    practice: "Gestaltung eines Verkaufsflyers für die Nachbarschaftsakquise.",
    task: "Entwerfen Sie einen Flyer 'Immobilie gesucht'.",
    type: "Marketing"
  },
  day_47: {
    title: "Netzwerkaufbau & Empfehlungen",
    theory: "Tippgeber-Verträge. Kooperationen mit Banken, Handwerkern, Anwälten. BNI & Co.",
    law: ["GewO (Tippgeberprovision)"],
    practice: "Gespräch mit einem Finanzberater über eine Kooperation.",
    task: "Erstellen Sie eine Liste potenzieller Kooperationspartner.",
    type: "Vertrieb"
  },
  day_48: {
    title: "Selbstmanagement & Zeitplanung",
    theory: "Eisenhower-Prinzip. Time-Boxing. Pareto-Prinzip (80/20). Work-Life-Balance im Makleralltag.",
    law: ["Keine spezifischen Gesetze"],
    practice: "Analyse einer Arbeitswoche. Wie viel Zeit für Akquise, wie viel für Admin?",
    task: "Erstellen Sie einen idealen Wochenplan.",
    type: "Management"
  },
  day_49: {
    title: "Konfliktmanagement & Beschwerden",
    theory: "Umgang mit unzufriedenen Kunden. Reklamation als Chance. Deeskalationstechniken.",
    law: ["Keine spezifischen Gesetze"],
    practice: "Rollenspiel: Kunde beschwert sich über 'schlechte Erreichbarkeit'.",
    task: "Formulieren Sie eine Antwort auf eine negative Google-Bewertung.",
    type: "Softskills"
  },
  day_50: {
    title: "Praxisprojekt: Marketing-Kampagne",
    theory: "Integration aller Kanäle (Cross-Media). Budgetplanung.",
    law: ["UWG"],
    practice: "Entwicklung einer kompletten Kampagne für ein schwer vermittelbares Objekt.",
    task: "Erstellen Sie einen Marketingplan inkl. Budgetierung.",
    type: "Praxis"
  },

  // Woche 11-12: Karriere & Abschluss (Tag 51-60)
  day_51: {
    title: "Businessplan für Makler",
    theory: "Gründung. Rechtsform (Einzelunternehmen, GmbH, UG). Finanzplan. Liquiditätsplanung.",
    law: ["HGB (Rechtsformen)", "GewO"],
    practice: "Kalkulation: Wie viele Verkäufe brauche ich zum Überleben?",
    task: "Erstellen Sie eine Umsatzvorschau für das erste Jahr.",
    type: "Management"
  },
  day_52: {
    title: "Versicherungen für Makler",
    theory: "Vermögensschadenhaftpflicht (Pflicht für Verwalter, Kür für Makler - aber wichtig!). Betriebshaftpflicht.",
    law: ["VVG (Versicherungsvertragsgesetz)"],
    practice: "Risikoanalyse: Was passiert, wenn ich den Schlüssel verliere?",
    task: "Vergleichen Sie Angebote für eine Vermögensschadenhaftpflicht.",
    type: "Management"
  },
  day_53: {
    title: "Steuern für Selbstständige",
    theory: "Umsatzsteuer. Einkommensteuer. Gewerbesteuer. Kleinunternehmerregelung (§ 19 UStG).",
    law: ["EStG", "UStG"],
    practice: "Vorbereitung der Unterlagen für den Steuerberater. Fahrtenbuch.",
    task: "Berechnen Sie die Umsatzsteuerzahllast für einen Monat.",
    type: "Finanzen"
  },
  day_54: {
    title: "Büroorganisation & Digitales Büro",
    theory: "Papierloses Büro. Cloud-Speicher. Dokumentenmanagement (DMS). GoBD-konforme Ablage.",
    law: ["GoBD"],
    practice: "Einrichtung einer digitalen Ablagestruktur.",
    task: "Erstellen Sie einen Aktenplan für Ihre Maklerakte.",
    type: "Organisation"
  },
  day_55: {
    title: "Weiterbildung & IVD",
    theory: "Weiterbildungspflicht (§ 34c GewO - 20h). Verbände (IVD, BVFI). Zertifizierungen (DIA, EIA).",
    law: ["MaBV Anlage 1 (Inhaltliche Anforderungen)"],
    practice: "Planung der Fortbildungen für die nächsten 3 Jahre.",
    task: "Recherchieren Sie geeignete Seminare zur Erfüllung der Weiterbildungspflicht.",
    type: "Karriere"
  },
  day_56: {
    title: "Franchise vs. Eigenmarke",
    theory: "Vor- und Nachteile von Franchise-Systemen (Engel & Völkers, RE/MAX). Kosten. Markenbekanntheit.",
    law: ["Franchiserecht"],
    practice: "Entscheidungsfindung: Bin ich ein Teamplayer oder Einzelkämpfer?",
    task: "Erstellen Sie eine Pro-Contra-Liste für den Franchise-Einstieg.",
    type: "Karriere"
  },
  day_57: {
    title: "Zukunftstrends: PropTech & KI",
    theory: "Künstliche Intelligenz in der Bewertung und Exposé-Erstellung. Blockchain im Grundbuch?",
    law: ["Datenschutz"],
    practice: "Testen von KI-Tools (ChatGPT für Texte).",
    task: "Lassen Sie eine KI einen Exposé-Text schreiben und optimieren Sie ihn.",
    type: "Zukunft"
  },
  day_58: {
    title: "Nachhaltigkeit & ESG im Maklerbüro",
    theory: "Green Office. CO2-Fußabdruck. Beratungskompetenz bei energetischer Sanierung.",
    law: ["KSG (Klimaschutzgesetz)"],
    practice: "Umstellung auf Ökostrom und E-Mobilität im Betrieb.",
    task: "Entwickeln Sie ein Nachhaltigkeitskonzept für Ihr Maklerbüro.",
    type: "Umwelt"
  },
  day_59: {
    title: "Abschlussprüfung Vorbereitung",
    theory: "Wiederholung aller Module. Fokus auf Recht und Bewertung. Typische Fehler vermeiden.",
    law: ["Alle Module"],
    practice: "Simulation eines kompletten Verkaufsfalls (Akquise bis Notar).",
    task: "Lösen Sie einen komplexen Fall aus der Praxis.",
    type: "Test"
  },
  day_60: {
    title: "Abschluss Modul 2 & Zertifikat",
    theory: "Rückblick. Ausblick auf Modul 3 (Verwalter). Übergabe des Teilnahmezertifikats.",
    law: ["§ 34c GewO"],
    practice: "Feierlicher Abschluss. Networking.",
    task: "Absolvieren Sie den finalen Abschlusstest für Modul 2.",
    type: "Test"
  }
};
