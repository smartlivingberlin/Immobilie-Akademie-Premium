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
