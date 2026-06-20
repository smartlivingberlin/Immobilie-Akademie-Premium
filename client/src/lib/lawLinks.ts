/**
 * Utility to generate direct links to German laws on gesetze-im-internet.de
 */

interface LawReference {
  shortName: string;
  fullName: string;
  url: string;
}

export const lawReferences: Record<string, LawReference> = {
  "§34c GewO": {
    shortName: "§34c GewO",
    fullName: "§ 34c Gewerbeordnung",
    url: "https://www.gesetze-im-internet.de/gewo/__34c.html",
  },
  "§34i GewO": {
    shortName: "§34i GewO",
    fullName: "§ 34i Gewerbeordnung",
    url: "https://www.gesetze-im-internet.de/gewo/__34i.html",
  },
  "GewO": {
    shortName: "GewO",
    fullName: "Gewerbeordnung",
    url: "https://www.gesetze-im-internet.de/gewo/",
  },
  "BGB": {
    shortName: "BGB",
    fullName: "Bürgerliches Gesetzbuch",
    url: "https://www.gesetze-im-internet.de/bgb/",
  },
  "WEG": {
    shortName: "WEG",
    fullName: "Wohnungseigentumsgesetz",
    url: "https://www.gesetze-im-internet.de/woeigg/",
  },
  "MaBV": {
    shortName: "MaBV",
    fullName: "Makler- und Bauträgerverordnung",
    url: "https://www.gesetze-im-internet.de/gewo_34cdv/",
  },
  "ImmoWertV": {
    shortName: "ImmoWertV",
    fullName: "Immobilienwertermittlungsverordnung",
    url: "https://www.gesetze-im-internet.de/immowertv_2022/",
  },
  "GrundstVG": {
    shortName: "GrundstVG",
    fullName: "Grundstücksverkehrsgesetz",
    url: "https://www.gesetze-im-internet.de/grdstvg/",
  },
  "EStG": {
    shortName: "EStG",
    fullName: "Einkommensteuergesetz",
    url: "https://www.gesetze-im-internet.de/estg/",
  },
  "MietRÄndG": {
    shortName: "MietRÄndG",
    fullName: "Mietrechtsänderungsgesetz",
    url: "https://www.gesetze-im-internet.de/bgb/",
  },
  "BetrKV": {
    shortName: "BetrKV",
    fullName: "Betriebskostenverordnung",
    url: "https://www.gesetze-im-internet.de/betrkv/",
  },
  "HeizkostenV": {
    shortName: "HeizkostenV",
    fullName: "Heizkostenverordnung",
    url: "https://www.gesetze-im-internet.de/heizkostenv/",
  },
  "GmbHG": {
    shortName: "GmbHG",
    fullName: "GmbH-Gesetz",
    url: "https://www.gesetze-im-internet.de/gmbhg/",
  },
  "HGB": {
    shortName: "HGB",
    fullName: "Handelsgesetzbuch",
    url: "https://www.gesetze-im-internet.de/hgb/",
  },
  "ZPO": {
    shortName: "ZPO",
    fullName: "Zivilprozessordnung",
    url: "https://www.gesetze-im-internet.de/zpo/",
  },
  "GVG": {
    shortName: "GVG",
    fullName: "Gerichtsverfassungsgesetz",
    url: "https://www.gesetze-im-internet.de/gvg/",
  },
  "EnEV": {
    shortName: "EnEV",
    fullName: "Energieeinsparverordnung",
    url: "https://www.gesetze-im-internet.de/enev_2007/",
  },
  "GEG": {
    shortName: "GEG",
    fullName: "Gebäudeenergiegesetz",
    url: "https://www.gesetze-im-internet.de/geg/",
  },
  "BauGB": {
    shortName: "BauGB",
    fullName: "Baugesetzbuch",
    url: "https://www.gesetze-im-internet.de/bbaug/",
  },
  "BauNVO": {
    shortName: "BauNVO",
    fullName: "Baunutzungsverordnung",
    url: "https://www.gesetze-im-internet.de/baunvo/",
  },
  "HOAI": {
    shortName: "HOAI",
    fullName: "Honorarordnung für Architekten und Ingenieure",
    url: "https://www.gesetze-im-internet.de/hoai_2013/",
  },
  "VOB": {
    shortName: "VOB",
    fullName: "Vergabe- und Vertragsordnung für Bauleistungen",
    url: "https://www.din.de/de/mitwirken/normenausschuesse/nabau/veroeffentlichungen/wdc-beuth:din21:68786512",
  },
  "AGB": {
    shortName: "AGB",
    fullName: "Allgemeine Geschäftsbedingungen",
    url: "https://www.gesetze-im-internet.de/bgb/__305.html",
  },
  "DSGVO": {
    shortName: "DSGVO",
    fullName: "Datenschutz-Grundverordnung",
    url: "https://dsgvo-gesetz.de/",
  },
  "BDSG": {
    shortName: "BDSG",
    fullName: "Bundesdatenschutzgesetz",
    url: "https://www.gesetze-im-internet.de/bdsg_2018/",
  },
};

/**
 * Get law reference by short name
 */
export function getLawReference(shortName: string): LawReference | undefined {
  return lawReferences[shortName];
}

/**
 * Generate a link component for a law reference
 */
export function getLawLink(shortName: string): string {
  const ref = getLawReference(shortName);
  if (!ref) return shortName;
  
  return `<a href="${ref.url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline font-medium" title="${ref.fullName}">${ref.shortName}</a>`;
}

/**
 * Replace law references in text with links
 */
export function linkifyLaws(text: string): string {
  let result = text;
  
  // Sort by length (longest first) to avoid partial matches
  const sortedKeys = Object.keys(lawReferences).sort((a, b) => b.length - a.length);
  
  for (const key of sortedKeys) {
    const ref = lawReferences[key];
    // Create a regex that matches the law reference but not if it's already in a link
    const regex = new RegExp(`(?<!href=")\\b${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
    result = result.replace(regex, getLawLink(key));
  }
  
  return result;
}

/**
 * Component-friendly version: returns JSX-safe object
 */
export function getLawLinkData(shortName: string): { text: string; url: string; title: string } | null {
  const ref = getLawReference(shortName);
  if (!ref) return null;
  
  return {
    text: ref.shortName,
    url: ref.url,
    title: ref.fullName,
  };
}
