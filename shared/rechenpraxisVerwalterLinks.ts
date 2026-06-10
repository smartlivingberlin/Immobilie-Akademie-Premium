/** Kontextsensitive Verweise von Rechenpraxis → Verwalter-Tools. */

export type RechenpraxisVerwalterLink = {
  label: string;
  href: string;
  hint: string;
};

export type RechenpraxisAufgabeKontext = {
  id: number;
  bereich: string;
  titel: string;
  berufssituation: string;
  gesetze?: string[];
};

const BEREICH_BASIS: Record<string, RechenpraxisVerwalterLink[]> = {
  "WEG-Hausgeld & Abrechnung": [
    {
      label: "Hausgeld buchen",
      href: "/app/verwalter/buchungen",
      hint: "SKR-Vorlage: Bank 1200 → Erlös 8400",
    },
    {
      label: "WEG-Objekt & Einheiten",
      href: "/app/verwalter/objekte",
      hint: "MEA und Einheiten für Verteilung",
    },
    {
      label: "NK-Erläuterung (Vorlage)",
      href: "/app/verwalter/vorlagen/nk-erklaerung",
      hint: "Abrechnung an Eigentümer erklären",
    },
    {
      label: "Fristen & Vorgänge",
      href: "/app/verwalter/fristen",
      hint: "NK-Fristen, ETV — als Vorgang anlegen",
    },
  ],
  "Mietrendite & Kaufpreisfaktor": [
    {
      label: "Verwalter-Assistent",
      href: "/app/verwalter/buchungen",
      hint: "Hausgeld & Forderungen in der Praxis buchen",
    },
  ],
};

const TITEL_ZUSATZ: { pattern: RegExp; link: RechenpraxisVerwalterLink }[] = [
  {
    pattern: /mahnung|rückstand|rueckstand|hausgeld.*rück/i,
    link: {
      label: "Mahnung Stufe 1",
      href: "/app/verwalter/vorlagen/mahnung-stufe1",
      hint: "Vorlage + KI-Brief bei Zahlungsverzug",
    },
  },
  {
    pattern: /mahnung|rückstand|rueckstand/i,
    link: {
      label: "Forderung buchen",
      href: "/app/verwalter/buchungen",
      hint: "SKR: Soll 1400 → Haben 8400",
    },
  },
  {
    pattern: /betriebskosten|heizkosten|nebenkosten|nk-|co₂|co2/i,
    link: {
      label: "NK-Aufwand buchen",
      href: "/app/verwalter/buchungen",
      hint: "SKR: Soll 4970 → Haben 1200",
    },
  },
  {
    pattern: /wirtschaftsplan|verwalterhonorar|sonderumlage|rücklage/i,
    link: {
      label: "Hausgeld-Anpassung",
      href: "/app/verwalter/vorlagen/hausgeld-anpassung",
      hint: "Vorlage für Beschluss & Anpassung",
    },
  },
  {
    pattern: /beschluss|etv|eigentümerversammlung/i,
    link: {
      label: "ETV-Einladung",
      href: "/app/verwalter/vorlagen/etv-einladung",
      hint: "Einladung mit Fristenhinweis",
    },
  },
  {
    pattern: /doppelbuchung|buchung.*korrig/i,
    link: {
      label: "Buchungen prüfen",
      href: "/app/verwalter/buchungen",
      hint: "Plausibilitäts-Check vor DATEV-Export",
    },
  },
];

export function getRechenpraxisVerwalterLinks(aufgabe: RechenpraxisAufgabeKontext): RechenpraxisVerwalterLink[] {
  const text = `${aufgabe.titel} ${aufgabe.berufssituation}`.toLowerCase();
  const links: RechenpraxisVerwalterLink[] = [...(BEREICH_BASIS[aufgabe.bereich] || [])];

  for (const { pattern, link } of TITEL_ZUSATZ) {
    if (pattern.test(text)) links.push(link);
  }

  if (aufgabe.gesetze?.some((g) => /weg|betrkv|556/i.test(g))) {
    links.push({
      label: "Fristen-Checkliste WEG",
      href: "/app/verwalter/fristen",
      hint: "Gesetzliche Fristen im Überblick",
    });
  }

  const seen = new Set<string>();
  return links.filter((l) => {
    if (seen.has(l.href)) return false;
    seen.add(l.href);
    return true;
  });
}

export function hasVerwalterBezug(aufgabe: RechenpraxisAufgabeKontext): boolean {
  return getRechenpraxisVerwalterLinks(aufgabe).length > 0;
}
