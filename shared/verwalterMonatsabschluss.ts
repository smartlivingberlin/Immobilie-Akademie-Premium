/** Monatsabschluss-Checkliste WEG — geführter Workflow. */

import { hatPlausibilitaetsFehler, pruefeBuchungen } from "./verwalterBuchungPlausibilitaet";
import type { VerwalterBuchung } from "./verwalterBuchungTypes";
import type { VerwalterObjekt } from "./verwalterObjektTypes";

export type AbschlussStatus = "ok" | "offen" | "warnung";

export type AbschlussSchritt = {
  id: string;
  titel: string;
  beschreibung: string;
  status: AbschlussStatus;
  href?: string;
};

export function buildMonatsabschluss(opts: {
  objekt: VerwalterObjekt;
  buchungen: VerwalterBuchung[];
  periode: string;
  openVorgaenge: number;
  overdueVorgaenge: number;
}): AbschlussSchritt[] {
  const { objekt, buchungen, periode, openVorgaenge, overdueVorgaenge } = opts;
  const plausi = pruefeBuchungen(buchungen, objekt, periode);
  const fehler = hatPlausibilitaetsFehler(plausi);
  const warnungen = plausi.filter((p) => p.level === "warn").length;

  const stammdatenOk = objekt.einheiten.length > 0 || objekt.einheitenAnzahl > 0;
  const buchungenOk = buchungen.length > 0 && !fehler;

  return [
    {
      id: "stammdaten",
      titel: "1. Stammdaten prüfen",
      beschreibung: stammdatenOk
        ? `${objekt.einheiten.length || objekt.einheitenAnzahl} Einheit(en) erfasst.`
        : "Einheiten im Objekt pflegen — Basis für Hausgeld und MEA.",
      status: stammdatenOk ? "ok" : "offen",
      href: "/app/verwalter/objekte",
    },
    {
      id: "buchungen",
      titel: "2. Buchungen erfassen",
      beschreibung:
        buchungen.length > 0
          ? `${buchungen.length} Buchung(en) in ${periode}.`
          : "Hausgeld, Forderungen und NK für den Monat buchen.",
      status: buchungenOk ? "ok" : buchungen.length > 0 && fehler ? "warnung" : "offen",
      href: "/app/verwalter/buchungen",
    },
    {
      id: "plausibilitaet",
      titel: "3. Plausibilität prüfen",
      beschreibung: fehler
        ? "Fehler in Buchungen — vor DATEV-Export beheben."
        : warnungen > 0
          ? `${warnungen} Hinweis(e) — kurz prüfen.`
          : "Keine Auffälligkeiten.",
      status: fehler ? "warnung" : warnungen > 0 ? "warnung" : buchungen.length > 0 ? "ok" : "offen",
    },
    {
      id: "vorgaenge",
      titel: "4. Offene Vorgänge",
      beschreibung:
        overdueVorgaenge > 0
          ? `${overdueVorgaenge} überfällige Vorgänge — zuerst bearbeiten.`
          : openVorgaenge > 0
            ? `${openVorgaenge} offene Vorgänge im Kanban.`
            : "Keine offenen Vorgänge.",
      status: overdueVorgaenge > 0 ? "warnung" : "ok",
      href: "/app/verwalter/vorgaenge",
    },
    {
      id: "datev",
      titel: "5. DATEV-Export",
      beschreibung: buchungenOk
        ? "Buchungsstapel an Steuerberater/Treuhand senden."
        : "Erst Buchungen vollständig und fehlerfrei erfassen.",
      status: buchungenOk ? "ok" : "offen",
      href: "/app/verwalter/buchungen",
    },
  ];
}

export function abschlussFortschritt(schritte: AbschlussSchritt[]): number {
  const done = schritte.filter((s) => s.status === "ok").length;
  return Math.round((done / schritte.length) * 100);
}
