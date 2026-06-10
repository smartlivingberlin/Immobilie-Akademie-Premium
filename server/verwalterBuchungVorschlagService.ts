import { askLlmWithContinuation } from "./kursbuchLlm";
import type { VerwalterObjekt } from "../shared/verwalterObjektTypes";
import {
  parseBuchungFreitext,
  parseKiBuchungJson,
  type BuchungVorschlag,
} from "../shared/verwalterBuchungVorschlag";
import { SKR03_WEG_KONTEN } from "../shared/verwalterBuchungTypes";

export async function suggestBuchung(
  text: string,
  objekt: VerwalterObjekt,
  periode: string,
): Promise<BuchungVorschlag | null> {
  const regel = parseBuchungFreitext(text, objekt);
  if (regel) return regel;

  const konten = SKR03_WEG_KONTEN.map((k) => `${k.konto}=${k.label}`).join(", ");
  const einheiten = objekt.einheiten.map((e) => `${e.nummer}${e.eigentuemerName ? ` (${e.eigentuemerName})` : ""}`).join(", ");

  const prompt = `Nutzer-Eingabe: "${text}"
WEG: ${objekt.name}
Periode: ${periode}
Einheiten: ${einheiten || "keine"}

Erzeuge EINE Buchungszeile als JSON (nur JSON, kein Markdown):
{
  "betrag": number,
  "sollKonto": "string",
  "habenKonto": "string",
  "buchungstext": "string",
  "einheitNr": "optional",
  "erklaerung": "1 Satz laienverständlich"
}

SKR03-Vorschläge: ${konten}
Typisch Hausgeld-Eingang: Soll 1200, Haben 8400.`;

  const result = await askLlmWithContinuation(
    "Du bist Buchungs-Assistent für WEG-Hausverwaltung. Antworte NUR mit gültigem JSON. Keine Steuerberatung.",
    prompt,
    800,
    1,
  );

  const parsed = parseKiBuchungJson(result.text);
  if (!parsed) return null;

  if (parsed.einheitNr && !parsed.einheitId) {
    const hit = objekt.einheiten.find((e) => e.nummer === parsed.einheitNr);
    if (hit) parsed.einheitId = hit.id;
  }

  return parsed;
}
