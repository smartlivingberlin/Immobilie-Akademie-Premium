import { listBuchungen } from "./verwalterBuchungStore";
import { listObjekte } from "./verwalterObjektStore";
import { countOpenVorgaenge, countOverdueVorgaenge, listVorgaenge } from "./verwalterVorgangStore";
import { buildAssistentKnowledgeBlock } from "../shared/verwalterAssistentKnowledge";
import { SKR03_WEG_KONTEN } from "../shared/verwalterBuchungTypes";

export type AssistentRuntimeContext = {
  seite?: string;
  objektId?: string;
};

export async function buildVerwalterAssistentPrompt(
  userId: number,
  ctx: AssistentRuntimeContext,
): Promise<string> {
  const objekte = await listObjekte(userId);
  const openV = await countOpenVorgaenge(userId);
  const overdueV = await countOverdueVorgaenge(userId);

  const lines: string[] = [
    buildAssistentKnowledgeBlock(),
    "",
    "## Aktuelle Nutzerdaten (Live)",
    `- Angemeldet als Nutzer-ID ${userId}`,
    `- WEG-Objekte: ${objekte.length}`,
    `- Offene Vorgänge: ${openV}${overdueV > 0 ? ` (${overdueV} überfällig)` : ""}`,
    `- Aktuelle Seite: ${ctx.seite || "unbekannt"}`,
  ];

  if (objekte.length > 0) {
    lines.push("", "### Objekte (Kurz)");
    for (const o of objekte.slice(0, 5)) {
      lines.push(
        `- ${o.name} (${o.einheitenAnzahl} Einheiten, ${o.einheiten.length} erfasst) — ID ${o.id}`,
      );
    }
    if (objekte.length > 5) lines.push(`- … und ${objekte.length - 5} weitere`);
  }

  const focusId = ctx.objektId || objekte[0]?.id;
  if (focusId) {
    const obj = objekte.find((o) => o.id === focusId);
    if (obj) {
      lines.push("", `### Fokus-Objekt: ${obj.name}`);
      if (obj.einheiten.length > 0) {
        lines.push(
          "Einheiten: " +
            obj.einheiten
              .slice(0, 8)
              .map((e) => `${e.nummer} (MEA ${e.mea})`)
              .join(", "),
        );
      }

      const vorgaenge = (await listVorgaenge(userId, focusId))
        .filter((v) => v.status !== "erledigt")
        .slice(0, 5);
      if (vorgaenge.length > 0) {
        lines.push("", "Offene Vorgänge:");
        for (const v of vorgaenge) {
          lines.push(`- ${v.titel} (${v.status})${v.faelligAm ? `, fällig ${v.faelligAm}` : ""}`);
        }
      }

      const now = new Date();
      const periode = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
      const buchungen = await listBuchungen(userId, { objektId: focusId, periode });
      if (buchungen.length > 0) {
        const summe = buchungen.reduce((s, b) => s + b.betrag, 0);
        lines.push("", `Buchungen ${periode}: ${buchungen.length} Posten, Summe ${summe.toFixed(2)} €`);
        for (const b of buchungen.slice(0, 5)) {
          lines.push(`- ${b.datum}: ${b.buchungstext} — ${b.betrag} € (Soll ${b.sollKonto} / Haben ${b.habenKonto})`);
        }
      } else if (ctx.seite?.includes("buchungen")) {
        lines.push("", `Keine Buchungen in ${periode} — Nutzer könnte erste Buchung anlegen.`);
      }
    }
  }

  if (ctx.seite?.includes("buchungen")) {
    lines.push(
      "",
      "### SKR03-Vorlagen im System",
      SKR03_WEG_KONTEN.map((k) => `- ${k.konto} ${k.label}`).join("\n"),
    );
  }

  return lines.join("\n");
}
