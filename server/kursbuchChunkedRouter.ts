import { Router } from "express";
import { requireAuth } from "./authMiddleware";
import { parseModuleDayLessons } from "./moduleDayExtractor";
import { readKursbuchChunkedCache, writeKursbuchChunkedCache } from "./generatorFileCache";

const router = Router();

const MODULE_NAMES: Record<number, string> = {
  1: "Einführung in die Immobilienwirtschaft",
  2: "Immobilienmakler §34c GewO",
  3: "WEG-Verwaltung & Mietrecht",
  4: "Gutachter & Sachverständiger",
  5: "Darlehensvermittler §34i GewO",
};

const CHUNK_SIZE = 8;
const TOKENS_PER_CHUNK = 4000;

const FORMAT_INSTRUCTIONS: Record<string, string> = {
  kursbuch:
    "Erstelle professionelle KURSBUCH-Kapitel aus den Lerntagen. Pro Lerntag mindestens ein Unterkapitel mit Theorie, Praxisbeispiel (Deutschland) und Merkkasten. Markdown mit ## und ###. Nichts kürzen.",
  zusammenfassung:
    "Erstelle kompakte LERNZUSAMMENFASSUNG-Abschnitte: Kernbegriffe, Paragraphen, Merksätze. Markdown mit ## und ###.",
  skript:
    "Erstelle LERNKONTROLL-SKRIPT-Abschnitte: Frage-Antwort-Paare mit Musterlösungen und Rechenwegen. Markdown mit ## und ###.",
};

async function askClaude(systemPrompt: string, question: string, maxTokens: number): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY fehlt");

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5",
      max_tokens: maxTokens,
      system: systemPrompt,
      messages: [{ role: "user", content: question }],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Claude Error: ${err}`);
  }

  const data = await response.json();
  return data.content?.[0]?.text || "";
}

function chunkArray<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

router.post("/api/ai/generate-kursbuch-chunked", requireAuth, async (req, res) => {
  try {
    const moduleId = Number(req.body?.moduleId);
    const format = String(req.body?.format || "kursbuch");
    const forceRegenerate = Boolean(req.body?.forceRegenerate);

    if (!moduleId || moduleId < 1 || moduleId > 5) {
      return res.status(400).json({ error: "moduleId 1–5 erforderlich" });
    }

    if (!forceRegenerate) {
      const cached = readKursbuchChunkedCache(moduleId, format);
      if (cached) return res.json(cached);
    }

    const lessons = parseModuleDayLessons(moduleId);
    if (lessons.length === 0) {
      return res.status(404).json({ error: "Keine Lerntage für dieses Modul gefunden" });
    }

    const moduleName = MODULE_NAMES[moduleId];
    const formatHint = FORMAT_INSTRUCTIONS[format] || FORMAT_INSTRUCTIONS.kursbuch;
    const dayChunks = chunkArray(lessons, CHUNK_SIZE);
    const parts: string[] = [];
    const totalChunks = dayChunks.length;

    for (let i = 0; i < dayChunks.length; i++) {
      const chunk = dayChunks[i];
      const dayBlock = chunk
        .map((l) => `### Tag ${l.dayNumber}: ${l.title}\n\n${l.content}`)
        .join("\n\n---\n\n");

      const positionHint =
        i === 0
          ? "Dies ist der ERSTE Abschnitt: Beginne mit einem kurzen Vorwort und den Lernzielen."
          : i === totalChunks - 1
            ? "Dies ist der LETZTE Abschnitt: Schließe mit Zusammenfassung und Prüfungsvorbereitung ab."
            : `Mittelabschnitt ${i + 1} von ${totalChunks}.`;

      const prompt = [
        `Modul: ${moduleName}`,
        formatHint,
        positionHint,
        `Verarbeite ALLE ${chunk.length} Lerntage in diesem Block vollständig.`,
        "",
        "LERNINHALTE:",
        dayBlock,
        "",
        "Anforderungen: IHK-Niveau, Gesetze korrekt, verständlich für Quereinsteiger.",
      ].join("\n");

      const section = await askClaude(
        "Du bist erfahrener IHK-Dozent und Fachautor für Immobilienwirtschaft in Deutschland.",
        prompt,
        TOKENS_PER_CHUNK,
      );
      parts.push(section.trim());
    }

    const content = `# ${format === "zusammenfassung" ? "Lernzusammenfassung" : format === "skript" ? "Lernkontroll-Skript" : "Kursbuch"}: ${moduleName}

> KI-generiert (Chunked, ${lessons.length} Lerntage in ${totalChunks} Blöcken)

${parts.join("\n\n---\n\n")}
`;

    const payload = {
      success: true,
      content,
      moduleId,
      moduleName,
      format,
      daysExtracted: lessons.length,
      chunksProcessed: totalChunks,
      generatedAt: new Date().toISOString(),
      fromCache: false,
      chunked: true,
    };

    writeKursbuchChunkedCache(moduleId, format, payload);
    res.json(payload);
  } catch (e: any) {
    res.status(500).json({ error: e.message || "Chunked-Generierung fehlgeschlagen" });
  }
});

export { router as kursbuchChunkedRouter };
