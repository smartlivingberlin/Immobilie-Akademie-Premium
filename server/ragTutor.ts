/**
 * RAG-Tutor: KI antwortet aus echten Modulinhalten
 * Primär: Claude Haiku (Anthropic) | Fallback: Gemini
 */
import type { Express, Request, Response } from "express";

const MODULE_KNOWLEDGE: Record<string, string> = {
  "1": `MODUL 1 — Einführung Immobilienwirtschaft (20 Tage, 160 UE)
Themen: Marktüberblick Deutschland, BGB Grundlagen §433ff, §535ff, §652 Maklerrecht, GewO §34c/§34i/§34d, Grundbuchrecht §873/§925 BGB, WEG-Grundlagen, BauGB, Marktakteure, Immobilientypen, Verkehrswert §194 BauGB.
Prüfungsrelevanz: §34c GewO Grundlagen, Maklerrecht §652 BGB, Grundbuch, Eigentumsübertragung.`,
  "2": `MODUL 2 — Immobilienmakler §34c GewO (60 Tage, 440 UE)
Themen: §34c GewO Erlaubnisvoraussetzungen, Maklervertrag (Alleinauftrag, Qualifizierter Alleinauftrag), Provisionsrecht §652 BGB, Bestellerprinzip §2 WoVermG, Vergleichswertverfahren §15 ImmoWertV, Ertragswertverfahren §17-20 ImmoWertV, Sachwertverfahren §21-23 ImmoWertV, Kaufvertragsrecht §311b BGB, GwG, MaBV, Widerrufsrecht §355 BGB.
Prüfungsrelevanz: Maklerrecht, Bewertungsverfahren, Kaufvertragsrecht, GwG, MaBV.`,
  "3": `MODUL 3 — Verwalter WEG & Mietrecht (80 Tage, 528 UE)
Themen WEG: WEG-Reform 2020, GdWE §9a WEG, Verwalterbestellung §26 WEG, Eigentümerversammlung §23-25 WEG, Wirtschaftsplan §28 WEG, Jahresabrechnung, Instandhaltungsrücklage §19 WEG.
Themen Mietrecht: §535ff BGB, Mietpreisbremse §556d BGB, Nebenkostenabrechnung §556 BGB, Schönheitsreparaturen BGH, Kündigung §573/§543 BGB, Kaution §551 BGB.
Prüfungsrelevanz: WEG-Beschlüsse, Abrechnung, Mieterhöhung, Kündigung.`,
  "4": `MODUL 4 — Gutachter & Sachverständiger (40 Tage, 264 UE)
Themen: ImmoWertV 2021, Verkehrswert §194 BauGB, Vergleichswertverfahren §15 ImmoWertV, Ertragswertverfahren §17-20 ImmoWertV (Liegenschaftszinssatz, Barwertfaktor), Sachwertverfahren §21-23 ImmoWertV (NHK 2010, Alterswertminderung), Bodenrichtwerte BORIS, Gutachterausschüsse §192ff BauGB.
Prüfungsrelevanz: Alle 3 Verfahren rechnerisch, Liegenschaftszinssatz, Barwertfaktor.`,
  "5": `MODUL 5 — Darlehensvermittler §34i GewO (40 Tage, 304 UE)
Themen: §34i GewO, WIKR §491ff BGB, ESIS-Merkblatt, Kreditwürdigkeitsprüfung §505a-c BGB, Annuitätendarlehen, Zinsbindung, Forward-Darlehen, KfW-Programme 124/153/270, Grundschuld §1191 BGB, Wohn-Riester §92a EStG.
Prüfungsrelevanz: Annuitätenberechnung, ESIS, Kreditwürdigkeitsprüfung, KfW-Förderung.`,
};

const GENERAL_KNOWLEDGE = `
ALLGEMEINE IMMOBILIENWIRTSCHAFT:
- Maklercourtage: je 3,57% inkl. MwSt (§656c BGB seit 23.12.2020)
- Grunderwerbsteuer: Berlin 6%, Bayern 3,5%, NRW 6,5%
- Notarkosten: ca. 1,5% des Kaufpreises
- IHK-Sachkundeprüfung §34c: schriftlich 120 Min
- IHK-Sachkundeprüfung §34i: schriftlich 120 Min
- Widerrufsrecht: 14 Tage ab Vertragsschluss §355 BGB
- Energieausweis Pflicht: bei Verkauf und Neuvermietung (GEG §80)
`;

async function askClaude(systemPrompt: string, question: string, context: any[]): Promise<string> {
  const messages = [
    ...context.slice(-6).map((m: any) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: m.content,
    })),
    { role: "user", content: question },
  ];

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY || "",
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: systemPrompt,
      messages,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Claude Error: ${err}`);
  }

  const data = await response.json();
  return data.content?.[0]?.text || "";
}

async function askGemini(systemPrompt: string, question: string, context: any[]): Promise<string> {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: [
          ...context.slice(-6).map((m: any) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }],
          })),
          { role: "user", parts: [{ text: question }] },
        ],
        generationConfig: { temperature: 0.3, maxOutputTokens: 1024 },
      }),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Gemini Error: ${err}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
}

export function registerRagTutorRoutes(app: Express) {
  app.post("/api/ai/rag-tutor", async (req: Request, res: Response) => {
    try {
      const { question, moduleId, context } = req.body;

      if (!question || question.trim().length < 3) {
        return res.status(400).json({ error: "Frage zu kurz" });
      }

      if (!process.env.ANTHROPIC_API_KEY && !process.env.GEMINI_API_KEY) {
        return res.status(503).json({ error: "KI-Service nicht konfiguriert" });
      }

      const moduleContext = moduleId && MODULE_KNOWLEDGE[String(moduleId)]
        ? MODULE_KNOWLEDGE[String(moduleId)]
        : Object.values(MODULE_KNOWLEDGE).join("\n\n");

      const systemPrompt = `Du bist ein professioneller KI-Tutor für die Immobilien-Akademie Smart.
Du hilfst bei der Vorbereitung auf IHK-Sachkundeprüfungen §34c GewO und §34i GewO.

WISSENSBASIS:
${moduleContext}

${GENERAL_KNOWLEDGE}

REGELN:
1. Antworte immer auf Deutsch, klar und verständlich
2. Nenne immer den genauen Paragraphen (§ BGB, § WEG, § GewO)
3. Bei Berechnungen: zeige jeden Schritt einzeln
4. Maximal 300 Wörter, außer bei komplexen Berechnungen
5. Beginne direkt fachlich — kein "Als KI..."
6. Nenne Merkhilfen für die Prüfung`;

      let answer = "";
      let usedModel = "";

      // Primär: Claude Haiku
      if (process.env.ANTHROPIC_API_KEY) {
        try {
          answer = await askClaude(systemPrompt, question, context || []);
          usedModel = "claude-haiku";
        } catch (err) {
          console.error("[RAG-Tutor] Claude Fehler, versuche Gemini:", err);
        }
      }

      // Fallback: Gemini
      if (!answer && process.env.GEMINI_API_KEY) {
        try {
          answer = await askGemini(systemPrompt, question, context || []);
          usedModel = "gemini-flash";
        } catch (err) {
          console.error("[RAG-Tutor] Gemini Fehler:", err);
        }
      }

      if (!answer) {
        return res.status(502).json({ error: "KI-Service temporär nicht verfügbar" });
      }

      res.json({ answer, moduleId: moduleId || null, model: usedModel });
    } catch (err) {
      console.error("[RAG-Tutor] Error:", err);
      res.status(500).json({ error: "Server-Fehler" });
    }
  });

  // Groq Whisper Speech-to-Text
  app.post("/api/ai/transcribe", async (req: Request, res: Response) => {
    try {
      const chunks: Buffer[] = [];
      req.on("data", (chunk) => chunks.push(chunk));
      req.on("end", async () => {
        const buffer = Buffer.concat(chunks);
        const groqKey = process.env.GROQ_API_KEY;
        if (!groqKey) {
          return res.status(500).json({ error: "GROQ_API_KEY fehlt" });
        }
        const FormData = (await import("form-data")).default;
        const form = new FormData();
        form.append("file", buffer, {
          filename: "audio.webm",
          contentType: req.headers["content-type"] || "audio/webm",
        });
        form.append("model", "whisper-large-v3-turbo");
        form.append("language", "de");
        form.append("response_format", "json");
        const fetch = (await import("node-fetch")).default;
        const response = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${groqKey}`,
            ...form.getHeaders(),
          },
          body: form,
        });
        const data = await response.json() as any;
        if (data.text) {
          res.json({ transcript: data.text });
        } else {
          res.status(500).json({ error: "Transkription fehlgeschlagen", details: data });
        }
      });
    } catch (err) {
      console.error("[Whisper] Error:", err);
      res.status(500).json({ error: "Server-Fehler" });
    }
  });


  // ElevenLabs Text-to-Speech
  app.post("/api/ai/tts", async (req: Request, res: Response) => {
    try {
      const { text } = req.body;
      if (!text) return res.status(400).json({ error: "Text fehlt" });
      const apiKey = process.env.ELEVENLABS_API_KEY;
      if (!apiKey) return res.status(500).json({ error: "ELEVENLABS_API_KEY fehlt" });
      const fetch = (await import("node-fetch")).default;
      const voiceId = "pNInz6obpgDQGcFmaJgB"; // Adam - natürliche deutsche Stimme
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: "POST",
        headers: {
          "xi-api-key": apiKey,
          "Content-Type": "application/json",
          "Accept": "audio/mpeg",
        },
        body: JSON.stringify({
          text: text.slice(0, 500),
          model_id: "eleven_multilingual_v2",
          voice_settings: { stability: 0.5, similarity_boost: 0.75 }
        }),
      });
      if (!response.ok) {
        const err = await response.text();
        return res.status(500).json({ error: "ElevenLabs Fehler", details: err });
      }
      res.setHeader("Content-Type", "audio/mpeg");
      response.body?.pipe(res);
    } catch (err) {
      console.error("[TTS] Error:", err);
      res.status(500).json({ error: "Server-Fehler" });
    }
  });


  // Dokument-Upload + KI-Analyse
  app.post("/api/ai/analyze-document", async (req: Request, res: Response) => {
    try {
      const chunks: Buffer[] = [];
      req.on("data", (chunk) => chunks.push(chunk));
      req.on("end", async () => {
        const buffer = Buffer.concat(chunks);
        const contentType = req.headers["content-type"] || "";
        const filename = (req.headers["x-filename"] as string) || "document";
        let extractedText = "";

        try {
          if (contentType.includes("application/pdf") || filename.endsWith(".pdf")) {
            const pdfParse = (await import("pdf-parse")).default;
            const data = await pdfParse(buffer);
            extractedText = data.text;
          } else if (filename.endsWith(".docx") || contentType.includes("wordprocessingml")) {
            const mammoth = await import("mammoth");
            const result = await mammoth.extractRawText({ buffer });
            extractedText = result.value;
          } else if (filename.endsWith(".pptx") || filename.endsWith(".xlsx") || filename.endsWith(".odt")) {
            const officeparser = (await import("officeparser")).default;
            extractedText = await officeparser.parseOfficeAsync(buffer);
          } else if (contentType.includes("text/") || filename.endsWith(".txt") || filename.endsWith(".md")) {
            extractedText = buffer.toString("utf-8");
          } else if (contentType.includes("audio/") || filename.match(/\.(mp3|wav|webm|m4a|ogg)$/)) {
            const groqKey = process.env.GROQ_API_KEY;
            if (!groqKey) return res.status(500).json({ error: "GROQ_API_KEY fehlt" });
            const FormData = (await import("form-data")).default;
            const form = new FormData();
            form.append("file", buffer, { filename, contentType });
            form.append("model", "whisper-large-v3-turbo");
            form.append("language", "de");
            const fetch = (await import("node-fetch")).default;
            const r = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
              method: "POST",
              headers: { Authorization: `Bearer ${groqKey}`, ...form.getHeaders() },
              body: form,
            });
            const d = await r.json() as any;
            extractedText = d.text || "";
          } else {
            return res.status(400).json({ error: "Dateityp nicht unterstützt" });
          }
        } catch (parseErr) {
          console.error("[Upload] Parse Fehler:", parseErr);
          return res.status(500).json({ error: "Datei konnte nicht gelesen werden" });
        }

        if (!extractedText || extractedText.trim().length < 10) {
          return res.status(400).json({ error: "Kein Text extrahierbar" });
        }

        // Claude analysiert den Text
        const apiKey = process.env.ANTHROPIC_API_KEY;
        if (!apiKey) return res.status(500).json({ error: "ANTHROPIC_API_KEY fehlt" });
        const Anthropic = (await import("@anthropic-ai/sdk")).default;
        const client = new Anthropic({ apiKey });
        const textSnippet = extractedText.slice(0, 8000);
        const message = await client.messages.create({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 1500,
          messages: [{
            role: "user",
            content: `Du bist ein Immobilien-Experte. Analysiere dieses Dokument und erstelle:

1. **Zusammenfassung** (3-5 Sätze)
2. **Wichtigste Punkte** (5 Bullet Points)
3. **Relevanz für Immobilienrecht** (Was ist relevant für §34c/§34i GewO?)
4. **5 Prüfungsfragen** zum Inhalt mit Antworten

Dokument:
${textSnippet}`
          }]
        });
        const analysis = (message.content[0] as any).text;
        res.json({
          analysis,
          textLength: extractedText.length,
          filename,
        });
      });
    } catch (err) {
      console.error("[Upload] Error:", err);
      res.status(500).json({ error: "Server-Fehler" });
    }
  });


  // Auto-Fragen-Generator: Text → KI → question_bank DB
  app.post("/api/ai/generate-questions", async (req: Request, res: Response) => {
    try {
      const { text, moduleId, category, count = 15 } = req.body;
      if (!text || !moduleId) return res.status(400).json({ error: "text und moduleId erforderlich" });
      const prompt = `Du bist ein IHK-Prüfungsexperte. Erstelle exakt ${count} Multiple-Choice Prüfungsfragen auf Deutsch aus diesem Text:\n\n${text.slice(0, 8000)}\n\nGib NUR ein JSON-Array zurück:\n[{"questionText":"...","options":{"A":"...","B":"...","C":"...","D":"..."},"correctAnswer":"A","explanation":"...","difficulty":"easy","category":"${category || 'Allgemein'}"}]`;
      let questionsJson = "";
      try {
        const answer = await askClaude("Du bist IHK-Prüfungsexperte. Antworte NUR mit JSON.", prompt, []);
        questionsJson = answer;
      } catch {
        return res.status(500).json({ error: "KI nicht verfügbar" });
      }
      const clean2 = questionsJson.replace(/```json/g, "").replace(/```/g, "").trim();
      let questions: any[];
      try { questions = JSON.parse(clean2); } catch { return res.status(500).json({ error: "KI-Antwort ungültig" }); }
      const { getDb } = await import("./db");
      const { questionBank } = await import("../drizzle/schema");
      const { eq } = await import("drizzle-orm");
      const db = await getDb();
      if (!db) return res.status(500).json({ error: "DB nicht verfügbar" });
      let saved = 0;
      for (const q of questions) {
        try {
          await db.insert(questionBank).values({ moduleId: Number(moduleId), category: q.category || category || "Allgemein", difficulty: q.difficulty || "medium", questionText: q.questionText, options: JSON.stringify(q.options), correctAnswer: q.correctAnswer, explanation: q.explanation || "" });
          saved++;
        } catch {}
      }
      res.json({ success: true, generated: questions.length, saved, moduleId: Number(moduleId), message: `${saved} Fragen in Modul ${moduleId} gespeichert` });
    } catch { res.status(500).json({ error: "Fehler beim Generieren" }); }
  });

  // Kursbuch-Generator: Modul → KI → strukturiertes Kursbuch
  app.post("/api/ai/generate-kursbuch", async (req: Request, res: Response) => {
    try {
      const { moduleId, moduleTitle, contentSummary, format = "kursbuch" } = req.body;
      if (!moduleId || !contentSummary) return res.status(400).json({ error: "moduleId und contentSummary erforderlich" });
      const formatMap: Record<string, string> = {
        kursbuch: "ein vollständiges Kursbuch mit Kapiteln, Definitionen und Praxisbeispielen",
        zusammenfassung: "eine kompakte Zusammenfassung (4-6 Seiten) mit Merksätzen",
        skript: "ein Prüfungsskript mit Fragen, Antworten und Merkhilfen",
      };
      const prompt = `Du bist IHK-Dozent für Immobilienwirtschaft. Erstelle ${formatMap[format] || formatMap.kursbuch} für: ${moduleTitle}\n\nInhalte: ${contentSummary.slice(0, 8000)}\n\nAnforderungen:\n- Professionelle Qualität wie IU Akademie\n- Klare Struktur mit nummerierten Kapiteln\n- Praxisnahe Beispiele\n- Alle Gesetze korrekt zitiert\n- Verständlich für Quereinsteiger\n- Format: Markdown mit # ## ###`;
      const content2 = await askClaude("Du bist erfahrener IHK-Dozent für Immobilienwirtschaft.", prompt, []);
      res.json({ success: true, content: content2, moduleId, moduleTitle, format, generatedAt: new Date().toISOString() });
    } catch { res.status(500).json({ error: "Fehler beim Generieren" }); }
  });

  // Fallstudie bewerten
  app.post("/api/ai/bewerte-fallstudie", async (req: Request, res: Response) => {
    try {
      const { aufgabe, musterantwort, nutzerAntwort, modul } = req.body;
      if (!aufgabe || !nutzerAntwort) return res.status(400).json({ error: "Aufgabe und Antwort erforderlich" });
      const prompt = `Du bist ein IHK-Prüfer für Immobilienwirtschaft. Bewerte die folgende Antwort eines Prüflings.

AUFGABE:
${aufgabe}

MUSTERANTWORT (nicht zeigen):
${musterantwort}

ANTWORT DES PRÜFLINGS:
${nutzerAntwort}

Bewerte nach IHK-Maßstäben und antworte NUR mit diesem JSON:
{
  "note": "Sehr gut|Gut|Befriedigend|Ausreichend|Mangelhaft",
  "punkte": 0-100,
  "feedback": "2-3 Sätze Gesamtbewertung",
  "staerken": "Was gut war",
  "verbesserungen": "Was fehlt oder falsch ist"
}`;
      const answer = await askClaude("Du bist strenger aber fairer IHK-Prüfer. Antworte NUR mit JSON.", prompt, []);
      const clean = answer.replace(/\`\`\`json/g, "").replace(/\`\`\`/g, "").trim();
      try {
        const bewertung = JSON.parse(clean);
        res.json({ success: true, bewertung });
      } catch {
        res.status(500).json({ error: "Bewertung konnte nicht verarbeitet werden" });
      }
    } catch { res.status(500).json({ error: "Fehler bei der Bewertung" }); }
  });

  // Kursbuch aus echtem Modulinhalt generieren

  app.post("/api/ai/generate-kursbuch-v2", async (req: Request, res: Response) => {
    try {
      const { moduleId, format = "kursbuch" } = req.body;
      if (!moduleId) return res.status(400).json({ error: "moduleId erforderlich" });
      const fs = await import("fs");
      const path = await import("path");
      const contentFiles: Record<number, string[]> = {
        1: ["client/src/pages/modules/Module1Content.ts"],
        2: ["client/src/pages/modules/Module2ContentPart1_Maximal.ts","client/src/pages/modules/Module2ContentPart2_Maximal.ts"],
        3: ["client/src/pages/modules/Module3Content_Maximal.ts","client/src/pages/modules/Module3Content_Maximal_Part2_Extended.ts"],
        4: ["client/src/pages/modules/Module4Content_Maximal.ts","client/src/pages/modules/Module4Content_Valuation_Maximalist.ts"],
        5: ["client/src/pages/modules/Module5Content_34i_Complete.ts"],
      };
      const moduleNames: Record<number, string> = {
        1: "Einführung in die Immobilienwirtschaft", 2: "Immobilienmakler §34c GewO",
        3: "WEG-Verwaltung & Mietrecht", 4: "Gutachter & Sachverständiger", 5: "Darlehensvermittler §34i GewO",
      };
      const files = contentFiles[Number(moduleId)] || [];
      let rawContent = "";
      for (const file of files) {
        const filePath = path.resolve(file);
        if (fs.existsSync(filePath)) rawContent += fs.readFileSync(filePath, "utf-8").slice(0, 25000) + "\n\n";
      }
      if (!rawContent) return res.status(404).json({ error: "Modulinhalt nicht gefunden" });
      const titleTheoryPairs: string[] = [];
      const lines = rawContent.split("\n");
      let currentTitle = ""; let currentTheory = ""; let currentPractice = ""; let currentTask = "";
      for (const line of lines) {
        const tMatch = line.match(/title:\s*["\`'](.+?)["\`']/);
        const thMatch = line.match(/theory:\s*["\`'](.+?)["\`']/);
        const prMatch = line.match(/practice:\s*["\`'](.+?)["\`']/);
        const taMatch = line.match(/task:\s*["\`'](.+?)["\`']/);
        if (tMatch) { currentTitle = tMatch[1]; }
        if (thMatch) { currentTheory = thMatch[1]; }
        if (prMatch) { currentPractice = prMatch[1]; }
        if (taMatch) {
          currentTask = taMatch[1];
          if (currentTitle && currentTheory) {
            titleTheoryPairs.push("### " + currentTitle + "\nTheorie: " + currentTheory + "\nPraxis: " + currentPractice + "\nAufgabe: " + currentTask);
          }
          currentTitle = ""; currentTheory = ""; currentPractice = ""; currentTask = "";
        }
      }
      const extractedContent = titleTheoryPairs.length > 0 ? titleTheoryPairs.slice(0, 30).join("\n\n") : rawContent.slice(0, 12000);
      const formatInstructions: Record<string, string> = {
        kursbuch: "Erstelle ein vollstaendiges KURSBUCH (min. 3000 Woerter) mit: Vorwort, nummerierte Kapitel, ausfuehrliche Theorie, Praxisbeispiele, Merkkästen, Übungsaufgaben, Zusammenfassung",
        zusammenfassung: "Erstelle eine LERNZUSAMMENFASSUNG mit: 20 wichtigste Begriffe, alle Paragraphen, Merksätze, häufige Prüfungsfragen",
        skript: "Erstelle ein PRÜFUNGSSKRIPT mit: Frage-Antwort-Format, IHK-Prüfungsfragen mit Lösungen, wichtige Paragraphen",
      };
      const prompt = "Modul: " + moduleNames[Number(moduleId)] + "\n\n" + formatInstructions[format] + "\n\nLERNINHALTE:\n" + extractedContent + "\n\nAnforderungen: Professionell wie IU Akademie, verständlich für Quereinsteiger, alle Gesetze korrekt zitiert, Markdown-Format mit # ## ###";
      const generatedContent = await askClaude("Du bist erfahrener IHK-Dozent und Fachautor für Immobilienwirtschaft in Deutschland.", prompt, []);
      res.json({ success: true, content: generatedContent, moduleId, moduleName: moduleNames[Number(moduleId)], format, daysExtracted: titleTheoryPairs.length, generatedAt: new Date().toISOString() });
    } catch (err: any) { res.status(500).json({ error: "Fehler: " + err.message }); }
  });

}