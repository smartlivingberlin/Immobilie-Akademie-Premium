/**
 * Fristen- & Beschluss-Checkliste für WEG-Verwalter.
 */

export type FristItem = {
  id: string;
  title: string;
  description: string;
  legalBasis: string;
  durationDays?: number;
  relatedVorlageSlug?: string;
  category: "etv" | "beschluss" | "nk" | "mahnung";
};

export const FRISTEN_CHECKLISTE: FristItem[] = [
  {
    id: "etv-einladung",
    title: "ETV-Einladungsfrist",
    description: "Einladung mindestens 3 Wochen vor der Versammlung versenden.",
    legalBasis: "§ 24 Abs. 2 WEG",
    durationDays: 21,
    relatedVorlageSlug: "etv-einladung",
    category: "etv",
  },
  {
    id: "beschluss-anfechtung",
    title: "Anfechtung ETV-Beschluss",
    description: "Eigentümer können Beschluss innerhalb eines Monats anfechten.",
    legalBasis: "§ 46 Abs. 1 WEG",
    durationDays: 30,
    relatedVorlageSlug: "beschluss-hinweis",
    category: "beschluss",
  },
  {
    id: "nk-widerspruch",
    title: "Einwendungen NK-Abrechnung",
    description: "Mieter/Eigentümer: Einwendungen binnen 12 Monaten nach Zugang.",
    legalBasis: "§ 556 Abs. 3 BGB",
    durationDays: 365,
    relatedVorlageSlug: "nk-erklaerung",
    category: "nk",
  },
  {
    id: "nk-abrechnungsfrist",
    title: "Abrechnungsfrist Vermieter",
    description: "Betriebskostenabrechnung spätestens 12 Monate nach Periodenende.",
    legalBasis: "§ 556 Abs. 3 BGB",
    durationDays: 365,
    category: "nk",
  },
  {
    id: "mahnung-verzug",
    title: "Verzug nach Mahnung",
    description: "Nach Mahnung mit Frist: Verzugszinsen prüfen (§ 286 BGB).",
    legalBasis: "§ 286 BGB",
    relatedVorlageSlug: "mahnung-stufe2",
    category: "mahnung",
  },
  {
    id: "mahnung-stufe3",
    title: "Letzte Mahnung vor Rechtsweg",
    description: "Nach 2. Mahnung: finale Aufforderung vor Inkasso oder Klage.",
    legalBasis: "§ 286 BGB",
    relatedVorlageSlug: "mahnung-stufe3",
    category: "mahnung",
  },
  {
    id: "etv-protokoll",
    title: "Protokoll zur Verfügung stellen",
    description: "Protokoll jedem Eigentümer unverzüglich nach Versammlung.",
    legalBasis: "§ 24 Abs. 7 WEG",
    relatedVorlageSlug: "etv-protokoll",
    category: "etv",
  },
  {
    id: "nk-weg-abrechnung",
    title: "WEG-NK-Abrechnung versenden",
    description: "Jährliche Betriebskostenabrechnung an Eigentümer mit Fristenhinweis.",
    legalBasis: "§ 28 WEG, Abrechnungsgrundsätze",
    relatedVorlageSlug: "nk-weg-abrechnung",
    category: "nk",
  },
];

export const FRISTEN_CATEGORY_LABELS: Record<FristItem["category"], string> = {
  etv: "Eigentümerversammlung",
  beschluss: "Beschlüsse",
  nk: "Nebenkosten",
  mahnung: "Mahnwesen",
};
