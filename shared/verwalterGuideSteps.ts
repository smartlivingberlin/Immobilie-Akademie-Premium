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
