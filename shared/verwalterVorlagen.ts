/**
 * WEG-Verwalter-Vorlagen — Katalog (Phase B MVP).
 * Ausfüllbare Felder + Markdown-Body mit {{platzhaltern}}.
 */

export type VorlageFieldType = "text" | "textarea" | "date" | "number";

export type VorlageField = {
  key: string;
  label: string;
  type: VorlageFieldType;
  required?: boolean;
  placeholder?: string;
};

export type VorlageCategory = "etv" | "mahnung" | "nk" | "kommunikation";

export type VerwalterVorlage = {
  id: string;
  slug: string;
  title: string;
  category: VorlageCategory;
  description: string;
  legalHint: string;
  fields: VorlageField[];
  body: string;
};

export const VORLAGE_CATEGORY_LABELS: Record<VorlageCategory, string> = {
  etv: "Eigentümerversammlung",
  mahnung: "Mahnwesen",
  nk: "Nebenkosten & Hausgeld",
  kommunikation: "Kommunikation",
};

export const VERWALTER_VORLAGEN: VerwalterVorlage[] = [
  {
    id: "etv-einladung",
    slug: "etv-einladung",
    title: "Einladung zur Eigentümerversammlung",
    category: "etv",
    description: "Formelle Einladung gemäß § 24 WEG mit Tagesordnung.",
    legalHint: "Einladungsfrist mindestens 3 Wochen vor dem Termin (§ 24 Abs. 2 WEG).",
    fields: [
      { key: "wegName", label: "WEG-Bezeichnung", type: "text", required: true },
      { key: "verwalterName", label: "Verwalter / Verwaltung", type: "text", required: true },
      { key: "verwalterAdresse", label: "Anschrift Verwaltung", type: "textarea", required: true },
      { key: "etvDatum", label: "Datum der Versammlung", type: "date", required: true },
      { key: "etvUhrzeit", label: "Uhrzeit", type: "text", required: true, placeholder: "18:00 Uhr" },
      { key: "etvOrt", label: "Ort", type: "text", required: true },
      { key: "tagesordnung", label: "Tagesordnung (Punkte)", type: "textarea", required: true },
    ],
    body: `Einladung zur Eigentümerversammlung

{{wegName}}

Sehr geehrte Eigentümerinnen und Eigentümer,

hiermit laden wir Sie gemäß § 24 WEG zur Eigentümerversammlung ein.

Termin: {{etvDatum}}, {{etvUhrzeit}}
Ort: {{etvOrt}}

Tagesordnung:
{{tagesordnung}}

Mit freundlichen Grüßen
{{verwalterName}}
{{verwalterAdresse}}`,
  },
  {
    id: "mahnung-stufe1",
    slug: "mahnung-stufe1",
    title: "1. Mahnung — Hausgeld-Rückstand",
    category: "mahnung",
    description: "Freundliche Zahlungserinnerung bei ausstehendem Hausgeld.",
    legalHint: "Verzugszinsen gemäß § 286 BGB prüfen; Frist angemessen setzen.",
    fields: [
      { key: "eigentuemerName", label: "Eigentümer", type: "text", required: true },
      { key: "einheit", label: "Wohnungs-/Einheitsnr.", type: "text", required: true },
      { key: "wegName", label: "WEG", type: "text", required: true },
      { key: "betrag", label: "Offener Betrag (€)", type: "number", required: true },
      { key: "faelligSeit", label: "Fällig seit", type: "date", required: true },
      { key: "zahlungsfrist", label: "Neue Zahlungsfrist", type: "date", required: true },
      { key: "verwalterName", label: "Verwaltung", type: "text", required: true },
    ],
    body: `1. Mahnung — Hausgeld

{{eigentuemerName}}
Einheit {{einheit}}
{{wegName}}

Sehr geehrte/r {{eigentuemerName}},

bei Prüfung unserer Unterlagen stellen wir fest, dass das Hausgeld in Höhe von {{betrag}} € seit {{faelligSeit}} offen ist.

Wir bitten um Begleichung bis zum {{zahlungsfrist}} auf das Ihnen bekannte Verwalterkonto.

Bei Rückfragen stehen wir gerne zur Verfügung.

Mit freundlichen Grüßen
{{verwalterName}}`,
  },
  {
    id: "mahnung-stufe2",
    slug: "mahnung-stufe2",
    title: "2. Mahnung — mit Verzugshinweis",
    category: "mahnung",
    description: "Nachfass-Mahnung mit Verzugszins-Hinweis.",
    legalHint: "Rechtsberatung bei drohender Kündigung oder Klage einholen.",
    fields: [
      { key: "eigentuemerName", label: "Eigentümer", type: "text", required: true },
      { key: "wegName", label: "WEG", type: "text", required: true },
      { key: "betrag", label: "Offener Betrag (€)", type: "number", required: true },
      { key: "zahlungsfrist", label: "Letzte Zahlungsfrist", type: "date", required: true },
      { key: "verwalterName", label: "Verwaltung", type: "text", required: true },
    ],
    body: `2. Mahnung

{{eigentuemerName}}
{{wegName}}

trotz unserer ersten Mahnung ist der Betrag von {{betrag}} € weiterhin offen.

Wir fordern Sie letztmalig auf, den Betrag bis {{zahlungsfrist}} zu überweisen. Andernfalls behalten wir uns weitere rechtliche Schritte vor. Verzugszinsen können gemäß § 286 BGB anfallen.

{{verwalterName}}`,
  },
  {
    id: "nk-erklaerung",
    slug: "nk-erklaerung",
    title: "Begleitschreiben Nebenkostenabrechnung",
    category: "nk",
    description: "Erläuterung zur jährlichen Betriebskostenabrechnung.",
    legalHint: "Abrechnungsfrist § 556 Abs. 3 BGB; Widerspruchsfrist beachten.",
    fields: [
      { key: "mieterName", label: "Empfänger", type: "text", required: true },
      { key: "objektAdresse", label: "Objekt / Wohnung", type: "text", required: true },
      { key: "abrechnungszeitraum", label: "Abrechnungszeitraum", type: "text", required: true, placeholder: "01.01.2025 – 31.12.2025" },
      { key: "nachzahlung", label: "Nachzahlung / Guthaben (€)", type: "text", required: true },
      { key: "verwalterName", label: "Verwaltung", type: "text", required: true },
    ],
    body: `Begleitschreiben zur Nebenkostenabrechnung

{{mieterName}}
{{objektAdresse}}

Sehr geehrte/r {{mieterName}},

anbei erhalten Sie die Betriebskostenabrechnung für den Zeitraum {{abrechnungszeitraum}}.

Ergebnis: {{nachzahlung}}

Bitte prüfen Sie die Abrechnung. Einwendungen sind innerhalb von 12 Monaten nach Zugang möglich (§ 556 Abs. 3 BGB).

{{verwalterName}}`,
  },
  {
    id: "sonderumlage-info",
    slug: "sonderumlage-info",
    title: "Information Sonderumlage",
    category: "nk",
    description: "Ankündigung und Erläuterung einer Sonderumlage nach Beschluss.",
    legalHint: "Beschlussfassung und Verteilung nach MEA prüfen (§ 16 WEG).",
    fields: [
      { key: "wegName", label: "WEG", type: "text", required: true },
      { key: "beschlussDatum", label: "Beschlussdatum ETV", type: "date", required: true },
      { key: "zweck", label: "Verwendungszweck", type: "textarea", required: true },
      { key: "betragGesamt", label: "Gesamtbetrag (€)", type: "number", required: true },
      { key: "faelligkeit", label: "Fälligkeit", type: "date", required: true },
      { key: "verwalterName", label: "Verwaltung", type: "text", required: true },
    ],
    body: `Information zur Sonderumlage

{{wegName}}

Sehr geehrte Eigentümerinnen und Eigentümer,

die Eigentümerversammlung hat am {{beschlussDatum}} folgende Sonderumlage beschlossen:

Zweck: {{zweck}}
Gesamtbetrag: {{betragGesamt}} €
Fälligkeit: {{faelligkeit}}

Die Umlage wird gemäß Miteigentumsanteilen verteilt.

{{verwalterName}}`,
  },
  {
    id: "eigentuemer-info",
    slug: "eigentuemer-info",
    title: "Allgemeine Eigentümerinformation",
    category: "kommunikation",
    description: "Information zu Sanierung, Reparatur oder Maßnahmen.",
    legalHint: "DSGVO: nur notwendige Daten; Hausmeister-/Firmenkontakte optional.",
    fields: [
      { key: "wegName", label: "WEG / Objekt", type: "text", required: true },
      { key: "betreff", label: "Betreff", type: "text", required: true },
      { key: "inhalt", label: "Informationstext", type: "textarea", required: true },
      { key: "verwalterName", label: "Verwaltung", type: "text", required: true },
      { key: "kontakt", label: "Kontakt für Rückfragen", type: "text", required: false },
    ],
    body: `Eigentümerinformation

{{wegName}}

Betreff: {{betreff}}

{{inhalt}}

Rückfragen: {{kontakt}}

Mit freundlichen Grüßen
{{verwalterName}}`,
  },
  {
    id: "beschluss-hinweis",
    slug: "beschluss-hinweis",
    title: "Hinweis Beschlussanfechtung",
    category: "etv",
    description: "Information zur Anfechtungsfrist nach ETV-Beschluss.",
    legalHint: "Anfechtungsfrist 1 Monat ab Beschluss (§ 46 Abs. 1 WEG).",
    fields: [
      { key: "wegName", label: "WEG", type: "text", required: true },
      { key: "beschlussDatum", label: "Datum der Versammlung", type: "date", required: true },
      { key: "beschlussInhalt", label: "Beschluss (Kurzfassung)", type: "textarea", required: true },
      { key: "verwalterName", label: "Verwaltung", type: "text", required: true },
    ],
    body: `Hinweis zu Beschlussfassung

{{wegName}}

Beschluss der Eigentümerversammlung vom {{beschlussDatum}}:

{{beschlussInhalt}}

Gemäß § 46 Abs. 1 WEG kann der Beschluss innerhalb eines Monats seit Beschlussfassung angefochten werden.

{{verwalterName}}`,
  },
  {
    id: "wirtschaftsplan-hinweis",
    slug: "wirtschaftsplan-hinweis",
    title: "Übersendung Wirtschaftsplan",
    category: "nk",
    description: "Begleitschreiben zum Wirtschaftsplan § 28 WEG.",
    legalHint: "Beschluss der Eigentümerversammlung erforderlich.",
    fields: [
      { key: "wegName", label: "WEG", type: "text", required: true },
      { key: "wirtschaftsjahr", label: "Wirtschaftsjahr", type: "text", required: true },
      { key: "hausgeldGesamt", label: "Jahreshausgeld gesamt (€)", type: "number", required: true },
      { key: "verwalterName", label: "Verwaltung", type: "text", required: true },
    ],
    body: `Wirtschaftsplan {{wirtschaftsjahr}}

{{wegName}}

Sehr geehrte Eigentümerinnen und Eigentümer,

anbei der Wirtschaftsplan für das Jahr {{wirtschaftsjahr}}.

Geplantes Jahreshausgeld (Gesamt): {{hausgeldGesamt}} €

Der Plan wird zur Beschlussfassung in der nächsten Eigentümerversammlung vorgelegt (§ 28 WEG).

{{verwalterName}}`,
  },
  {
    id: "etv-protokoll",
    slug: "etv-protokoll",
    title: "Protokollhinweis nach ETV",
    category: "etv",
    description: "Übersendung des Versammlungsprotokolls.",
    legalHint: "Protokoll jedem Eigentümer unverzüglich zugänglich machen (§ 24 Abs. 7 WEG).",
    fields: [
      { key: "wegName", label: "WEG", type: "text", required: true },
      { key: "etvDatum", label: "Datum der Versammlung", type: "date", required: true },
      { key: "verwalterName", label: "Verwaltung", type: "text", required: true },
    ],
    body: `Protokoll der Eigentümerversammlung

{{wegName}}

Sehr geehrte Eigentümerinnen und Eigentümer,

anbei das Protokoll der Eigentümerversammlung vom {{etvDatum}}.

{{verwalterName}}`,
  },
  {
    id: "nk-widerspruch-antwort",
    slug: "nk-widerspruch-antwort",
    title: "Antwort auf NK-Einwendungen",
    category: "nk",
    description: "Stellungnahme zu Einwendungen gegen die Betriebskostenabrechnung.",
    legalHint: "Einwendungsfrist 12 Monate nach Zugang (§ 556 Abs. 3 BGB).",
    fields: [
      { key: "empfaenger", label: "Empfänger", type: "text", required: true },
      { key: "objektAdresse", label: "Objekt", type: "text", required: true },
      { key: "einwendung", label: "Einwendung (Kurzfassung)", type: "textarea", required: true },
      { key: "antwort", label: "Stellungnahme", type: "textarea", required: true },
      { key: "verwalterName", label: "Verwaltung", type: "text", required: true },
    ],
    body: `Stellungnahme zur Nebenkostenabrechnung

{{empfaenger}}
{{objektAdresse}}

Ihre Einwendung: {{einwendung}}

Unsere Stellungnahme:
{{antwort}}

{{verwalterName}}`,
  },
  {
    id: "hausmeister-beauftragung",
    slug: "hausmeister-beauftragung",
    title: "Beauftragung Hausmeister / Dienstleister",
    category: "kommunikation",
    description: "Auftrag für Instandhaltung oder Reinigung.",
    legalHint: "Leistungsumfang und Vergütung schriftlich fixieren.",
    fields: [
      { key: "wegName", label: "Objekt / WEG", type: "text", required: true },
      { key: "auftragnehmer", label: "Auftragnehmer", type: "text", required: true },
      { key: "leistung", label: "Leistungsbeschreibung", type: "textarea", required: true },
      { key: "termin", label: "Ausführungstermin", type: "date", required: true },
      { key: "verwalterName", label: "Verwaltung", type: "text", required: true },
    ],
    body: `Auftrag Instandhaltung

{{auftragnehmer}}

Objekt: {{wegName}}
Leistung: {{leistung}}
Termin: {{termin}}

Bitte bestätigen Sie den Termin schriftlich.

{{verwalterName}}`,
  },
  {
    id: "sanierung-info",
    slug: "sanierung-info",
    title: "Ankündigung Sanierungsmaßnahme",
    category: "kommunikation",
    description: "Information an Eigentümer/Mieter über geplante Arbeiten.",
    legalHint: "Lärm-/Schmutzzeiten und Ansprechpartner angeben.",
    fields: [
      { key: "wegName", label: "Objekt", type: "text", required: true },
      { key: "massnahme", label: "Maßnahme", type: "textarea", required: true },
      { key: "zeitraum", label: "Zeitraum", type: "text", required: true },
      { key: "verwalterName", label: "Verwaltung", type: "text", required: true },
    ],
    body: `Ankündigung Sanierungsmaßnahme

{{wegName}}

Geplante Maßnahme: {{massnahme}}
Zeitraum: {{zeitraum}}

Wir bitten um Verständnis für die entstehenden Einschränkungen.

{{verwalterName}}`,
  },
  {
    id: "laerm-antwort",
    slug: "laerm-antwort",
    title: "Antwort Lärmbeschwerde",
    category: "kommunikation",
    description: "Reaktion auf Lärmbeschwerde unter Bezug auf Hausordnung.",
    legalHint: "Hausordnung und ggf. Ordnungsamt-Hinweis; keine Rechtsberatung.",
    fields: [
      { key: "beschwerdefuehrer", label: "Beschwerdeführer", type: "text", required: true },
      { key: "wegName", label: "Objekt", type: "text", required: true },
      { key: "vorfall", label: "Vorfall", type: "textarea", required: true },
      { key: "massnahme", label: "Ergriffene Maßnahme", type: "textarea", required: true },
      { key: "verwalterName", label: "Verwaltung", type: "text", required: true },
    ],
    body: `Stellungnahme Lärmbeschwerde

{{beschwerdefuehrer}}
{{wegName}}

Vorfall: {{vorfall}}

Maßnahme: {{massnahme}}

{{verwalterName}}`,
  },
  {
    id: "hausgeld-anpassung",
    slug: "hausgeld-anpassung",
    title: "Anpassung Hausgeld-Vorauszahlung",
    category: "nk",
    description: "Mitteilung neuer Hausgeld-Vorauszahlung nach Beschluss.",
    legalHint: "Beschlussgrundlage und Wirksamkeit dokumentieren.",
    fields: [
      { key: "eigentuemerName", label: "Eigentümer", type: "text", required: true },
      { key: "wegName", label: "WEG", type: "text", required: true },
      { key: "altBetrag", label: "Bisherige Vorauszahlung (€)", type: "number", required: true },
      { key: "neuBetrag", label: "Neue Vorauszahlung (€)", type: "number", required: true },
      { key: "wirksamAb", label: "Wirksam ab", type: "date", required: true },
      { key: "verwalterName", label: "Verwaltung", type: "text", required: true },
    ],
    body: `Anpassung Hausgeld-Vorauszahlung

{{eigentuemerName}}
{{wegName}}

Bisher: {{altBetrag}} € / Monat
Neu: {{neuBetrag}} € / Monat, wirksam ab {{wirksamAb}}

Grundlage: Beschluss der Eigentümerversammlung.

{{verwalterName}}`,
  },
  {
    id: "eigentuemer-wechsel",
    slug: "eigentuemer-wechsel",
    title: "Mitteilung Eigentümerwechsel",
    category: "kommunikation",
    description: "Information an übrige Eigentümer über Verkauf/Übergang.",
    legalHint: "DSGVO: nur notwendige Daten weitergeben.",
    fields: [
      { key: "wegName", label: "WEG", type: "text", required: true },
      { key: "einheit", label: "Einheit", type: "text", required: true },
      { key: "neuerEigentuemer", label: "Neuer Eigentümer", type: "text", required: true },
      { key: "stichtag", label: "Stichtag", type: "date", required: true },
      { key: "verwalterName", label: "Verwaltung", type: "text", required: true },
    ],
    body: `Eigentümerwechsel

{{wegName}}

Einheit {{einheit}}: Eigentumsübergang an {{neuerEigentuemer}} zum {{stichtag}}.

{{verwalterName}}`,
  },
  {
    id: "versicherungsschaden",
    slug: "versicherungsschaden",
    title: "Schadensmeldung Versicherung",
    category: "kommunikation",
    description: "Meldung eines Gebäudeschadens an die Versicherung.",
    legalHint: "Fotos und Ursache dokumentieren; Fristen des Vertrags beachten.",
    fields: [
      { key: "versicherer", label: "Versicherung", type: "text", required: true },
      { key: "wegName", label: "Objekt", type: "text", required: true },
      { key: "schaden", label: "Schadensbeschreibung", type: "textarea", required: true },
      { key: "schadendatum", label: "Schadensdatum", type: "date", required: true },
      { key: "verwalterName", label: "Verwaltung", type: "text", required: true },
    ],
    body: `Schadensmeldung

{{versicherer}}

Objekt: {{wegName}}
Datum: {{schadendatum}}

Schaden: {{schaden}}

Kontakt: {{verwalterName}}`,
  },
  {
    id: "instandhaltung-protokoll",
    slug: "instandhaltung-protokoll",
    title: "Instandhaltungsprotokoll (kurz)",
    category: "kommunikation",
    description: "Dokumentation durchgeführter Instandhaltung.",
    legalHint: "Für Rücklagen-Nachweis und Eigentümerinformation aufbewahren.",
    fields: [
      { key: "wegName", label: "Objekt", type: "text", required: true },
      { key: "arbeit", label: "Durchgeführte Arbeit", type: "textarea", required: true },
      { key: "auftragnehmer", label: "Ausführender", type: "text", required: true },
      { key: "kosten", label: "Kosten (€)", type: "number", required: true },
      { key: "datum", label: "Datum", type: "date", required: true },
      { key: "verwalterName", label: "Verwaltung", type: "text", required: true },
    ],
    body: `Instandhaltungsprotokoll

{{wegName}} — {{datum}}

Arbeit: {{arbeit}}
Ausführender: {{auftragnehmer}}
Kosten: {{kosten}} €

{{verwalterName}}`,
  },
  {
    id: "etv-online",
    slug: "etv-online",
    title: "Hinweis Online-Eigentümerversammlung",
    category: "etv",
    description: "Information zu hybrider/online ETV gemäß WEG-Reform.",
    legalHint: "Technische Voraussetzungen und Zugangslink rechtzeitig mitteilen.",
    fields: [
      { key: "wegName", label: "WEG", type: "text", required: true },
      { key: "etvDatum", label: "Datum", type: "date", required: true },
      { key: "zugangslink", label: "Zugangslink / Ort", type: "text", required: true },
      { key: "verwalterName", label: "Verwaltung", type: "text", required: true },
    ],
    body: `Online-Eigentümerversammlung

{{wegName}}

Termin: {{etvDatum}}
Zugang: {{zugangslink}}

Bitte testen Sie den Zugang vorab. Technische Fragen an die Verwaltung.

{{verwalterName}}`,
  },
  {
    id: "ruecklage-info",
    slug: "ruecklage-info",
    title: "Information Instandhaltungsrücklage",
    category: "nk",
    description: "Übersicht Stand der Rücklage § 19 WEG.",
    legalHint: "Wirtschaftsplan und Beschlüsse als Grundlage.",
    fields: [
      { key: "wegName", label: "WEG", type: "text", required: true },
      { key: "standRuecklage", label: "Stand Rücklage (€)", type: "number", required: true },
      { key: "geplanteMassnahme", label: "Geplante Maßnahme", type: "textarea", required: true },
      { key: "verwalterName", label: "Verwaltung", type: "text", required: true },
    ],
    body: `Instandhaltungsrücklage

{{wegName}}

Aktueller Stand: {{standRuecklage}} €

Geplante Maßnahme: {{geplanteMassnahme}}

{{verwalterName}}`,
  },
  {
    id: "kuendigung-vertrag",
    slug: "kuendigung-vertrag",
    title: "Kündigung Dienstleistervertrag",
    category: "kommunikation",
    description: "Ordentliche Kündigung Hausmeister o.ä.",
    legalHint: "Kündigungsfrist und Vertragsklauseln prüfen.",
    fields: [
      { key: "empfaenger", label: "Empfänger", type: "text", required: true },
      { key: "wegName", label: "Objekt", type: "text", required: true },
      { key: "kuendigungsdatum", label: "Kündigung zum", type: "date", required: true },
      { key: "verwalterName", label: "Verwaltung", type: "text", required: true },
    ],
    body: `Kündigung

{{empfaenger}}

hiermit kündigen wir den Vertrag für {{wegName}} zum {{kuendigungsdatum}} ordentlich.

{{verwalterName}}`,
  },
  {
    id: "mahnung-stufe3",
    slug: "mahnung-stufe3",
    title: "3. Mahnung — letzte Aufforderung",
    category: "mahnung",
    description: "Finale Mahnung vor Inkasso oder rechtlichen Schritten.",
    legalHint: "Vor Versand Rechtsberatung einholen; Verzugszinsen und Kosten dokumentieren.",
    fields: [
      { key: "eigentuemerName", label: "Eigentümer", type: "text", required: true },
      { key: "einheit", label: "Wohnungs-/Einheitsnr.", type: "text", required: true },
      { key: "wegName", label: "WEG", type: "text", required: true },
      { key: "betrag", label: "Offener Betrag inkl. Zinsen (€)", type: "number", required: true },
      { key: "zahlungsfrist", label: "Letzte Zahlungsfrist", type: "date", required: true },
      { key: "verwalterName", label: "Verwaltung", type: "text", required: true },
    ],
    body: `3. Mahnung — letzte Aufforderung

{{eigentuemerName}}
Einheit {{einheit}}
{{wegName}}

trotz zweier Mahnungen ist der Gesamtbetrag von {{betrag}} € weiterhin offen.

Wir fordern Sie hiermit letztmalig auf, den Betrag bis {{zahlungsfrist}} zu begleichen. Andernfalls werden wir ohne weitere Ankündigung weitere rechtliche Schritte einleiten.

{{verwalterName}}`,
  },
  {
    id: "etv-vertretungsvollmacht",
    slug: "etv-vertretungsvollmacht",
    title: "Vertretungsvollmacht ETV",
    category: "etv",
    description: "Vollmacht zur Stimmabgabe in der Eigentümerversammlung.",
    legalHint: "Schriftform und klare Vollmachtsurkunde empfohlen; Stimmrecht nur wirksam übertragen.",
    fields: [
      { key: "wegName", label: "WEG", type: "text", required: true },
      { key: "vollmachtgeber", label: "Vollmachtgeber (Eigentümer)", type: "text", required: true },
      { key: "bevollmaechtigter", label: "Bevollmächtigter", type: "text", required: true },
      { key: "etvDatum", label: "Datum der Versammlung", type: "date", required: true },
      { key: "etvOrt", label: "Ort der Versammlung", type: "text", required: true },
      { key: "verwalterName", label: "Verwaltung", type: "text", required: true },
    ],
    body: `Vertretungsvollmacht Eigentümerversammlung

{{wegName}}

Ich, {{vollmachtgeber}}, bevollmächtige hiermit {{bevollmaechtigter}}, mich in der Eigentümerversammlung am {{etvDatum}} in {{etvOrt}} zu vertreten und in meinem Namen abzustimmen.

Die Vollmacht gilt für sämtliche Tagesordnungspunkte, sofern nicht gesondert eingeschränkt.

Ort, Datum: _________________
Unterschrift Vollmachtgeber: _________________

Zur Kenntnis: {{verwalterName}}`,
  },
  {
    id: "etv-tagesordnung-nachtrag",
    slug: "etv-tagesordnung-nachtrag",
    title: "Nachtrag zur Tagesordnung",
    category: "etv",
    description: "Ergänzung der Tagesordnung vor der Eigentümerversammlung.",
    legalHint: "Nachtrag nur unter engen Voraussetzungen zulässig (§ 24 Abs. 4 WEG); Fristen prüfen.",
    fields: [
      { key: "wegName", label: "WEG", type: "text", required: true },
      { key: "etvDatum", label: "Datum der Versammlung", type: "date", required: true },
      { key: "nachtragPunkte", label: "Ergänzte Tagesordnungspunkte", type: "textarea", required: true },
      { key: "verwalterName", label: "Verwaltung", type: "text", required: true },
      { key: "verwalterAdresse", label: "Anschrift Verwaltung", type: "textarea", required: true },
    ],
    body: `Nachtrag zur Tagesordnung

{{wegName}}

Sehr geehrte Eigentümerinnen und Eigentümer,

zur Eigentümerversammlung am {{etvDatum}} ergänzen wir die Tagesordnung wie folgt:

{{nachtragPunkte}}

Bitte beachten Sie die gesetzlichen Voraussetzungen für einen Tagesordnungsnachtrag.

Mit freundlichen Grüßen
{{verwalterName}}
{{verwalterAdresse}}`,
  },
  {
    id: "nk-weg-abrechnung",
    slug: "nk-weg-abrechnung",
    title: "WEG-Nebenkostenabrechnung an Eigentümer",
    category: "nk",
    description: "Begleitschreiben zur jährlichen WEG-Betriebskostenabrechnung.",
    legalHint: "Abrechnungsfrist und Verteilungsschlüssel (MEA) dokumentieren; Einwendungsfrist beachten.",
    fields: [
      { key: "eigentuemerName", label: "Eigentümer", type: "text", required: true },
      { key: "wegName", label: "WEG", type: "text", required: true },
      { key: "objektAdresse", label: "Objekt / Einheit", type: "text", required: true },
      { key: "abrechnungszeitraum", label: "Abrechnungszeitraum", type: "text", required: true, placeholder: "01.01.2025 – 31.12.2025" },
      { key: "ergebnis", label: "Nachzahlung / Guthaben (€)", type: "text", required: true },
      { key: "verwalterName", label: "Verwaltung", type: "text", required: true },
    ],
    body: `Nebenkostenabrechnung WEG

{{eigentuemerName}}
{{objektAdresse}}
{{wegName}}

Sehr geehrte/r {{eigentuemerName}},

anbei die Betriebskostenabrechnung für den Zeitraum {{abrechnungszeitraum}}.

Ergebnis für Ihre Einheit: {{ergebnis}}

Bitte prüfen Sie die Abrechnung. Einwendungen können innerhalb der gesetzlichen Frist geltend gemacht werden.

{{verwalterName}}`,
  },
  {
    id: "nk-korrekturabrechnung",
    slug: "nk-korrekturabrechnung",
    title: "Korrektur Nebenkostenabrechnung",
    category: "nk",
    description: "Überarbeitete Abrechnung nach Fehler oder Einwendung.",
    legalHint: "Korrektur schriftlich begründen; Fristen und Zinsen bei Nachforderung prüfen.",
    fields: [
      { key: "empfaenger", label: "Empfänger", type: "text", required: true },
      { key: "wegName", label: "WEG / Objekt", type: "text", required: true },
      { key: "ursprungszeitraum", label: "Ursprünglicher Abrechnungszeitraum", type: "text", required: true },
      { key: "korrekturgrund", label: "Grund der Korrektur", type: "textarea", required: true },
      { key: "neuesErgebnis", label: "Neues Ergebnis (€)", type: "text", required: true },
      { key: "verwalterName", label: "Verwaltung", type: "text", required: true },
    ],
    body: `Korrektur Nebenkostenabrechnung

{{empfaenger}}
{{wegName}}

bezugnehmend auf die Abrechnung für {{ursprungszeitraum}} übersenden wir eine korrigierte Nebenkostenabrechnung.

Grund der Korrektur:
{{korrekturgrund}}

Neues Ergebnis: {{neuesErgebnis}}

{{verwalterName}}`,
  },
];

export function getVorlageBySlug(slug: string): VerwalterVorlage | undefined {
  return VERWALTER_VORLAGEN.find((v) => v.slug === slug);
}

export function renderVorlageBody(
  template: string,
  values: Record<string, string>,
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => values[key]?.trim() || `[${key}]`);
}
