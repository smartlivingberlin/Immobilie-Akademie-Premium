/** Proaktive Guide-Hinweise pro Seite — nimmt Unsicherheit, ohne zu nerven. */

export type GuideStep = {
  id: string;
  titel: string;
  text: string;
  aktion?: { label: string; href: string };
};

export const VERWALTER_GUIDE_BY_PATH: Record<string, GuideStep> = {
  "/rechenpraxis": {
    id: "guide-rechenpraxis",
    titel: "Tipp: Rechenpraxis",
    text: "Wählen Sie eine Aufgabe und nutzen Sie den KI-Assistent unter der Aufgabe — er erklärt Formeln verständlich.",
  },
  "/app/verwalter/objekte": {
    id: "guide-objekte",
    titel: "Erst Objekt, dann alles andere",
    text: "Legen Sie zuerst Ihr WEG mit Einheiten an. Stammdaten werden in Vorlagen, Vorgängen und Buchungen automatisch genutzt.",
    aktion: { label: "Neues Objekt", href: "/app/verwalter/objekte" },
  },
  "/app/verwalter/buchungen": {
    id: "guide-buchungen",
    titel: "Buchungen Schritt für Schritt",
    text: "Nutzen Sie die Vorlagen-Buttons (Hausgeld, Forderung, NK). Unsicher bei Konten? Fragen Sie den Assistenten unten rechts — oder klären Sie Konten mit Ihrem Steuerberater.",
    aktion: { label: "Assistent öffnen", href: "#assistent" },
  },
  "/app/verwalter/vorgaenge": {
    id: "guide-vorgaenge",
    titel: "Vorgänge = Ihre To-do-Liste",
    text: "Mahnung, ETV, Schaden — alles als Karte im Kanban. Überfällige Vorgänge werden rot markiert.",
    aktion: { label: "Aus Frist anlegen", href: "/app/verwalter/fristen" },
  },
  "/app/verwalter/fristen": {
    id: "guide-fristen",
    titel: "Fristen nicht vergessen",
    text: "Wählen Sie Objekt + Stichtag, dann „Vorgang anlegen“ — die Frist landet direkt in Ihrem Kanban mit Fälligkeitsdatum.",
    aktion: { label: "Zum Kanban", href: "/app/verwalter/vorgaenge" },
  },
  "/app/verwalter/vorlagen": {
    id: "guide-vorlagen",
    titel: "Briefe schneller schreiben",
    text: "Vorlage öffnen → Objekt wählen → Felder ausfüllen → optional KI-Brief verfeinern → PDF exportieren.",
  },
};

export function getGuideForPath(path: string): GuideStep | null {
  if (VERWALTER_GUIDE_BY_PATH[path]) return VERWALTER_GUIDE_BY_PATH[path];
  if (path.startsWith("/app/verwalter/vorlagen/")) {
    return {
      id: "guide-vorlage-detail",
      titel: "Vorlage ausfüllen",
      text: "Pflichtfelder ausfüllen. Mit KI-Brief können Sie den Text professionell formulieren lassen — Entwurf trotzdem prüfen.",
    };
  }
  return null;
}

export type Szenario = {
  id: string;
  titel: string;
  beschreibung: string;
  icon: string;
  dauer: string;
  schritte: Array<{
    nr: number;
    titel: string;
    beschreibung: string;
    href: string;
    aktion: string;
  }>;
};

export const VERWALTER_SZENARIEN: Szenario[] = [
  {
    id: "etv-vorbereiten",
    titel: "ETV vorbereiten",
    beschreibung: "Einladung, Tagesordnung, Protokoll — Schritt für Schritt.",
    icon: "Users",
    dauer: "20 Min",
    schritte: [
      {
        nr: 1,
        titel: "Objekt prüfen",
        beschreibung: "Stammdaten und Einheiten vollständig?",
        href: "/app/verwalter/objekte",
        aktion: "Objekte öffnen",
      },
      {
        nr: 2,
        titel: "Frist anlegen",
        beschreibung: "ETV-Frist im Kanban erstellen (6-Wochen-Regel).",
        href: "/app/verwalter/fristen",
        aktion: "Fristen öffnen",
      },
      {
        nr: 3,
        titel: "Einladung erstellen",
        beschreibung: "Vorlage ETV-Einladung ausfüllen und versenden.",
        href: "/app/verwalter/vorlagen",
        aktion: "Vorlagen öffnen",
      },
      {
        nr: 4,
        titel: "ETV durchführen",
        beschreibung: "Beschlüsse, Abstimmungen, Protokoll.",
        href: "/app/verwalter/etv",
        aktion: "ETV öffnen",
      },
    ],
  },
  {
    id: "mahnung-starten",
    titel: "Mahnverfahren starten",
    beschreibung: "Rückstand prüfen, Mahnung erstellen, KI-Brief.",
    icon: "Scale",
    dauer: "10 Min",
    schritte: [
      {
        nr: 1,
        titel: "Rückstand prüfen",
        beschreibung: "Offene Buchungen und Zahlungsrückstände.",
        href: "/app/verwalter/buchungen",
        aktion: "Buchungen öffnen",
      },
      {
        nr: 2,
        titel: "Mahnung erstellen",
        beschreibung: "Stufe 1, 2 oder 3 — Vorlage auswählen.",
        href: "/app/verwalter/mahnwesen",
        aktion: "Mahnwesen öffnen",
      },
      {
        nr: 3,
        titel: "KI-Brief verfeinern",
        beschreibung: "Optional: Brief mit KI professionell formulieren.",
        href: "/app/verwalter/vorlagen",
        aktion: "Vorlagen öffnen",
      },
    ],
  },
  {
    id: "jahresabrechnung",
    titel: "Jahresabrechnung vorbereiten",
    beschreibung: "Buchungen, DATEV-Export, Abrechnung erstellen.",
    icon: "BookOpen",
    dauer: "30 Min",
    schritte: [
      {
        nr: 1,
        titel: "Buchungen prüfen",
        beschreibung: "Vollständigkeit und Plausibilität der Buchungen.",
        href: "/app/verwalter/buchungen",
        aktion: "Buchungen öffnen",
      },
      {
        nr: 2,
        titel: "DATEV-Export",
        beschreibung: "CSV-Export für Steuerberater erstellen.",
        href: "/app/verwalter/buchungen",
        aktion: "Buchungen öffnen",
      },
      {
        nr: 3,
        titel: "Abrechnung erstellen",
        beschreibung: "Vorlage Jahresabrechnung ausfüllen.",
        href: "/app/verwalter/vorlagen",
        aktion: "Vorlagen öffnen",
      },
    ],
  },
  {
    id: "neues-objekt",
    titel: "Neues Objekt aufnehmen",
    beschreibung: "Stammdaten, Einheiten, erste Vorlage.",
    icon: "Database",
    dauer: "15 Min",
    schritte: [
      {
        nr: 1,
        titel: "Objekt anlegen",
        beschreibung: "Name, Adresse, WEG-Stammdaten eingeben.",
        href: "/app/verwalter/objekte",
        aktion: "Objekte öffnen",
      },
      {
        nr: 2,
        titel: "Erste Vorlage",
        beschreibung: "Verwaltervertrag oder Willkommensbrief.",
        href: "/app/verwalter/vorlagen",
        aktion: "Vorlagen öffnen",
      },
      {
        nr: 3,
        titel: "Ersten Vorgang anlegen",
        beschreibung: "z.B. Übergabe oder erste ETV planen.",
        href: "/app/verwalter/vorgaenge",
        aktion: "Vorgänge öffnen",
      },
    ],
  },
];
