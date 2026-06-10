/** Wissensbasis für den Verwalter-Assistenten — laienverständlich, keine Rechtsberatung. */

import { SKR03_WEG_KONTEN } from "./verwalterBuchungTypes";

export const VERWALTER_ASSISTENT_ROLLE = `Du bist der Verwalter-Assistent im Produkt „Verwalter-Rechner“.
Zielgruppe: Hausverwaltungs-Mitarbeiter, Quereinsteiger, Bürokräfte ohne Buchhaltungs-Ausbildung.

Dein Stil:
- Geduldig, Schritt für Schritt, ohne Herablassung
- Kurze Absätze, Aufzählungen wenn hilfreich
- Fachbegriffe sofort in Klammern erklären
- Bei Unsicherheit: „Mit Steuerberater abstimmen“ — keine verbindliche Steuer-/Rechtsberatung
- Beziehe dich auf die MITGELIEFERTEN Nutzerdaten (Objekte, Vorgänge, Buchungen), wenn vorhanden
- Schlage konkrete nächste Klicks im System vor (z. B. „Unter Buchungen → Hausgeld-Vorlage“)`;

export const SKR03_LAIEN_ERKLAERUNG = `
## Soll und Haben — einfach erklärt
- Jede Buchung hat zwei Seiten: **Soll** (wohin der Betrag „geht“) und **Haben** (woher er „kommt“).
- Beispiel Hausgeld-Eingang: Geld kommt auf die **Bank** (Soll 1200) und ist **Erlös** (Haben 8400).
- Beispiel offene Forderung: Eigentümer schuldet noch → **Forderung** (Soll 1400) an **Erlös** (Haben 8400).

## SKR03 — häufige WEG-Konten (Vorschlag)
${SKR03_WEG_KONTEN.map((k) => `- ${k.konto}: ${k.label}`).join("\n")}

Wichtig: Der Kontenrahmen kann je Mandant abweichen. Vor dem DATEV-Export mit dem Steuerberater klären.
`.trim();

export const VERWALTER_WORKFLOWS = `
## Typische Abläufe im Verwalter-Rechner

1. **Objekt anlegen** → Stammdaten, Einheiten, MEA
2. **Vorgang aus Frist** → Fristen-Checkliste → „Vorgang anlegen“ → Kanban
3. **Brief schreiben** → Vorlagen → KI-Brief → PDF
4. **Buchung erfassen** → Buchungen → Vorlage wählen → DATEV-Export
5. **Rechenpraxis** → Formeln üben mit KI-Erklärung

## DATEV-Export
- Erst Buchungen im Monat erfassen, dann „DATEV-Export“ für die Periode
- CSV an Treuhand/Steuerberater — nicht selbst als „fertige Buchhaltung“ betrachten
`.trim();

export function buildAssistentKnowledgeBlock(): string {
  return [SKR03_LAIEN_ERKLAERUNG, VERWALTER_WORKFLOWS].join("\n\n");
}

/** Vorgeschlagene Fragen pro Seite */
export const ASSISTENT_VORSCHLAEGE: Record<string, string[]> = {
  "/rechenpraxis": [
    "Wie erkläre ich diese Aufgabe einem Quereinsteiger?",
    "Welche Formel brauche ich hier?",
  ],
  "/app/verwalter/objekte": [
    "Was sind MEA und wozu brauche ich sie?",
    "Wie lege ich Einheiten richtig an?",
  ],
  "/app/verwalter/buchungen": [
    "Was bedeutet Soll 1200 und Haben 8400?",
    "Wann buche ich Forderung statt Bank?",
    "Wie funktioniert der Monatsabschluss?",
    "Warum blockiert der DATEV-Export?",
  ],
  "/app/verwalter/vorgaenge": [
    "Wann lege ich einen Vorgang an?",
    "Was bedeutet der Status ‚Wartend‘?",
  ],
  "/app/verwalter/fristen": [
    "Was ist die ETV-Einladungsfrist?",
    "Wie lege ich aus einer Frist einen Vorgang an?",
  ],
  "/app/verwalter/vorlagen": [
    "Welche Vorlage für eine Mahnung?",
    "Was macht der KI-Brief?",
  ],
};

export function getAssistentVorschlaege(seite: string): string[] {
  if (ASSISTENT_VORSCHLAEGE[seite]) return ASSISTENT_VORSCHLAEGE[seite];
  for (const [path, items] of Object.entries(ASSISTENT_VORSCHLAEGE)) {
    if (seite.startsWith(path)) return items;
  }
  return [
    "250 Euro Hausgeld WE 1",
    "Was soll ich als Erstes tun?",
    "Erkläre Soll und Haben bei Hausgeld",
  ];
}
