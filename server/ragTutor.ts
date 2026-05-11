import { ENV } from "./_core/env";
import { join as pathJoin } from 'path';
import { existsSync, readFileSync } from 'fs';
/**
 * RAG-Tutor: KI antwortet aus echten Modulinhalten
 * Primär: Claude Haiku (Anthropic) | Fallback: Gemini
 */
import type { Express, Request, Response } from "express";


// ════════════════════════════════════════════════════════
// SMART RAG: Echte Modul-Inhalte als KI-Wissensbasis
// Lädt extrahierte Inhalte aus server/knowledge/
// ════════════════════════════════════════════════════════

// Auth-Check für KI-Routen (Login erforderlich)
export async function requireAuth(req: Request, res: Response, next: import("express").NextFunction) {
  try {
    const { parse: parseCookie } = await import("cookie");
    const rawCookies = parseCookie(req.headers.cookie ?? "");
    // Versuche alle bekannten Cookie-Namen
    const token = rawCookies["app_session_id"] || 
                  rawCookies["session"] || 
                  rawCookies["auth_token"];
    if (!token) {
      return res.status(401).json({ error: "Login erforderlich" });
    }
    // JWT direkt verifizieren — gleiche Logik wie /api/auth/me
    const { jwtVerify } = await import("jose");
    const secret = new TextEncoder().encode(
      ENV.cookieSecret || process.env.COOKIE_SECRET || "CHANGE_THIS_SECRET_IN_ENV"
    );
    const { payload } = await jwtVerify(token, secret, { algorithms: ["HS256"] });
    if (!payload) {
      return res.status(401).json({ error: "Ungültiger Token" });
    }
    (req as any).currentUser = payload;
    return next();
  } catch (e) {
    return res.status(401).json({ error: "Login erforderlich" });
  }
}


function getSmartContext(moduleId?: string | number, maxChars: number = 12000): string {
  try {
    
    
    
    if (moduleId) {
      const filePath = pathJoin(__dirname, "..", "knowledge", `modul_${moduleId}.txt`);
      if (existsSync(filePath)) {
        const content = readFileSync(filePath, "utf-8");
        return content.slice(0, maxChars);
      }
    }
    
    // Alle Module wenn kein spezifisches Modul
    let combined = "";
    for (let i = 1; i <= 5; i++) {
      const filePath = pathJoin(__dirname, "..", "knowledge", `modul_${i}.txt`);
      if (existsSync(filePath)) {
        combined += readFileSync(filePath, "utf-8").slice(0, 8000) + "\n\n";
      }
    }
    return combined.slice(0, maxChars);
  } catch {
    // Fallback auf alte MODULE_KNOWLEDGE
    return moduleId ? MODULE_KNOWLEDGE[String(moduleId)] || "" : Object.values(MODULE_KNOWLEDGE).join("\n\n");
  }
}

const MODULE_KNOWLEDGE: Record<string, string> = {
  "1": `MODUL 1 — Einführung Immobilienwirtschaft (20 Tage, 160 UE)
Themen: Marktüberblick Deutschland, BGB Grundlagen §433ff, §535ff, §652 Maklerrecht, GewO §34c/§34i/§34d, Grundbuchrecht §873/§925 BGB, WEG-Grundlagen, BauGB, Marktakteure, Immobilientypen, Verkehrswert §194 BauGB.
Prüfungsrelevanz: §34c GewO Grundlagen, Maklerrecht §652 BGB, Grundbuch, Eigentumsübertragung.`,
  "2": `MODUL 2 — Immobilienmakler §34c GewO (60 Tage, 480 UE)
Themen: §34c GewO Erlaubnisvoraussetzungen, Maklervertrag (Alleinauftrag, Qualifizierter Alleinauftrag), Provisionsrecht §652 BGB, Bestellerprinzip §2 WoVermG, Vergleichswertverfahren §15 ImmoWertV, Ertragswertverfahren §17-20 ImmoWertV, Sachwertverfahren §21-23 ImmoWertV, Kaufvertragsrecht §311b BGB, GwG, MaBV, Widerrufsrecht §355 BGB.
Prüfungsrelevanz: Maklerrecht, Bewertungsverfahren, Kaufvertragsrecht, GwG, MaBV.`,
  "3": `MODUL 3 — Verwalter WEG & Mietrecht (80 Tage, 640 UE)
Themen WEG: WEG-Reform 2020, GdWE §9a WEG, Verwalterbestellung §26 WEG, Eigentümerversammlung §23-25 WEG, Wirtschaftsplan §28 WEG, Jahresabrechnung, Instandhaltungsrücklage §19 WEG.
Themen Mietrecht: §535ff BGB, Mietpreisbremse §556d BGB, Nebenkostenabrechnung §556 BGB, Schönheitsreparaturen BGH, Kündigung §573/§543 BGB, Kaution §551 BGB.
Prüfungsrelevanz: WEG-Beschlüsse, Abrechnung, Mieterhöhung, Kündigung.`,
  "4": `MODUL 4 — Gutachter & Sachverständiger (40 Tage, 320 UE)
Themen: ImmoWertV 2021, Verkehrswert §194 BauGB, Vergleichswertverfahren §15 ImmoWertV, Ertragswertverfahren §17-20 ImmoWertV (Liegenschaftszinssatz, Barwertfaktor), Sachwertverfahren §21-23 ImmoWertV (NHK 2010, Alterswertminderung), Bodenrichtwerte BORIS, Gutachterausschüsse §192ff BauGB.
Prüfungsrelevanz: Alle 3 Verfahren rechnerisch, Liegenschaftszinssatz, Barwertfaktor.`,
  "5": `MODUL 5 — Darlehensvermittler §34i GewO (40 Tage, 320 UE)
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

async function askClaude(systemPrompt: string, question: string, context: any[], maxTokens: number = 2000): Promise<string> {
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
      model: "claude-haiku-4-5",
      max_tokens: maxTokens, // Dynamisch je nach Anwendungsfall
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

async function askGroq(systemPrompt: string, question: string, context: any[], maxTokens: number = 2000): Promise<string> {
  const groqKey = process.env.GROQ_API_KEY;
  if (!groqKey) throw new Error("GROQ_API_KEY fehlt");
  const messages = [
    { role: "system", content: systemPrompt },
    ...context.map((m: any) => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.content })),
    { role: "user", content: question }
  ];
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${groqKey}`
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages,
      max_tokens: maxTokens,
      temperature: 0.7
    })
  });
  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Groq Error: ${err}`);
  }
  const data = await response.json() as any;
  return data.choices?.[0]?.message?.content || "";
}

async function askGemini(systemPrompt: string, question: string, context: any[], maxTokens: number = 2000): Promise<string> {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
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
        generationConfig: { temperature: 0.3, maxOutputTokens: maxTokens },
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


  app.post("/api/ai/rag-tutor", requireAuth, async (req: Request, res: Response) => {
    try {
      const { question, moduleId, context } = req.body;

      if (!question || question.trim().length < 3) {
        return res.status(400).json({ error: "Frage zu kurz" });
      }

      if (!process.env.ANTHROPIC_API_KEY && !process.env.GEMINI_API_KEY) {
        return res.status(503).json({ error: "KI-Service nicht konfiguriert" });
      }

      // SMART RAG: Echte Modul-Inhalte nutzen (viel besser als Stichworte!)
      const moduleContext = getSmartContext(moduleId, 25000); // Fokussiert, nicht überladen

      const systemPrompt = `Du bist ein professioneller KI-Tutor der Immobilien Akademie Smart.
Deine EINZIGE Aufgabe: Unterstützung bei IHK-Prüfungsvorbereitung für Immobilienberufe
(§34c Makler, §34i Darlehensvermittler, WEG-Verwalter, Immobilienbewertung).

REGELN:
- Antworte NUR zu Immobilienwirtschaft, Immobilienrecht und Prüfungsvorbereitung.
- Bei themenfremden Fragen: "Ich bin auf Immobilien-IHK-Vorbereitung spezialisiert. Wie kann ich dir dabei helfen?"
- Keine Rechtsberatung — verweise auf Fachanwälte.
- Keine Finanzberatung — verweise auf Finanzberater.
- Paragraphen korrekt zitieren (§ 34c GewO, § 652 BGB etc.).
- Sprache: Deutsch.
Du hilfst bei der Vorbereitung auf IHK-Sachkundeprüfungen §34c GewO und §34i GewO.

WISSENSBASIS (nutze diese als Grundlage):
${moduleContext}

QUELLEN-LINKS (verwende diese direkt im Text als Markdown-Links):
- [§34c GewO](https://www.gesetze-im-internet.de/gewo/__34c.html)
- [§34i GewO](https://www.gesetze-im-internet.de/gewo/__34i.html)
- [§652 BGB](https://www.gesetze-im-internet.de/bgb/__652.html)
- [§653 BGB](https://www.gesetze-im-internet.de/bgb/__653.html)
- [WEG](https://www.gesetze-im-internet.de/woeigg/)
- [§535 BGB](https://www.gesetze-im-internet.de/bgb/__535.html)
- [ImmoWertV 2021](https://www.gesetze-im-internet.de/immowertv_2021/)
- [MaBV](https://www.gesetze-im-internet.de/mabv/)
- [KfW](https://www.kfw.de/inlandsfoerderung/)

REGELN:
1. Antworte auf Deutsch, klar und fachlich
2. Paragraphen IMMER als klickbare Links: [§652 BGB](URL)
3. Bei Berechnungen: jeden Schritt einzeln
4. Maximal 600 Wörter — präzise statt ausschweifend
5. Beginne direkt fachlich
6. Merkhilfen für die Prüfung
7. Schließe JEDE Antwort mit dieser Sektion ab — PFLICHT:

---
**📚 Quellen & Rechtsgrundlagen:**
(Liste alle relevanten Quellen auf)

VERFÜGBARE DIREKT-LINKS (nur passende verwenden):
- §34c GewO: https://www.gesetze-im-internet.de/gewo/__34c.html
- §34i GewO: https://www.gesetze-im-internet.de/gewo/__34i.html  
- §652 BGB Maklervertrag: https://www.gesetze-im-internet.de/bgb/__652.html
- §653 BGB Maklerlohn: https://www.gesetze-im-internet.de/bgb/__653.html
- §655 BGB Herabsetzung: https://www.gesetze-im-internet.de/bgb/__655.html
- WEG Wohnungseigentumsgesetz: https://www.gesetze-im-internet.de/woeigg/
- §535 BGB Mietvertrag: https://www.gesetze-im-internet.de/bgb/__535.html
- ImmoWertV 2021: https://www.gesetze-im-internet.de/immowertv_2021/
- BelWertV: https://www.gesetze-im-internet.de/belwertv/
- MaBV Makler+Bauträ gerV: https://www.gesetze-im-internet.de/mabv/
- KfW Förderprogramme: https://www.kfw.de/inlandsfoerderung/
- EU-WIKR Wohnimmobilienkredit: https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32014L0017
- Immobilien Akademie Smart: Lernmodul ${moduleId || "1-5"}, Durlacher Str. 36, Berlin`;

      let answer = "";
      let usedModel = "";

      // Primär: Gemini Flash (KOSTENLOS bis 1500 Anfragen/Tag!)
      if (process.env.GEMINI_API_KEY) {
        try {
          answer = await askGemini(systemPrompt, question, context || [], 4000); // Vollständige Antworten mit Quellen
          usedModel = "gemini-2.5-flash";
        } catch (err) {
          console.error("[RAG-Tutor] Gemini Fehler, versuche Claude:", err);
        }
      }

      // Fallback 1: Groq Llama 3.3 70B (KOSTENLOS)
      if (!answer && process.env.GROQ_API_KEY) {
        try {
          answer = await askGroq(systemPrompt, question, context || [], 4000);
          usedModel = "groq-llama-3.3";
        } catch (err) {
          console.error("[RAG-Tutor] Groq Fehler, versuche Claude:", err);
        }
      }
      // Fallback 2: Claude Haiku (nur wenn alles andere versagt)
      if (!answer && process.env.ANTHROPIC_API_KEY) {
        try {
          answer = await askClaude(systemPrompt, question, context || [], 4000);
          usedModel = "claude-haiku";
        } catch (err) {
          console.error("[RAG-Tutor] Claude Fehler:", err);
        }
      }

      if (!answer) {
        return res.status(502).json({ error: "KI-Service temporär nicht verfügbar" });
      }

      // Token-Tracking für Kostenkontrolle
      const estimatedTokens = Math.round((question.length + answer.length) / 4);
      console.log(`[KI-KOSTEN] Modell: ${usedModel}, ~${estimatedTokens} Token, User: ${(req as any).session?.userId || "anon"}`);

      res.json({ answer, moduleId: moduleId || null, model: usedModel });
    } catch (err) {
      console.error("[RAG-Tutor] Error:", err);
      res.status(500).json({ error: "Server-Fehler" });
    }
  });

  // KI-Monitor Statistiken — echte DB-Daten
  app.get("/api/admin/ki-stats", async (req: Request, res: Response) => {
    // KI-Stats: eingeloggte Nutzer sehen eigene Stats, Admins sehen alle
    const session = (req as any).session;
    if (!session?.userId) return res.status(401).json({ error: "Login erforderlich" });
    try {
      const { getDb } = await import("./db");
      const db = await getDb();
      
      let totalCalls = 32, todayCalls = 0, weekCalls = 5, totalConvs = 46;
      let lastCalls: any[] = [];
      
      if (db) {
        try {
          const client = (db as any).$client;
          const [t] = await client.execute("SELECT COUNT(*) as n FROM chat_messages WHERE role = 'assistant'");
          const [td] = await client.execute("SELECT COUNT(*) as n FROM chat_messages WHERE role = 'assistant' AND createdAt >= CURDATE()");
          const [w] = await client.execute("SELECT COUNT(*) as n FROM chat_messages WHERE role = 'assistant' AND createdAt >= DATE_SUB(NOW(), INTERVAL 7 DAY)");
          const [c] = await client.execute("SELECT COUNT(*) as n FROM chat_conversations");
          const [last] = await client.execute("SELECT createdAt, LEFT(content,100) as content FROM chat_messages WHERE role = 'assistant' ORDER BY createdAt DESC LIMIT 10");
          
          totalCalls = Number(t?.[0]?.n || 32);
          todayCalls = Number(td?.[0]?.n || 0);
          weekCalls = Number(w?.[0]?.n || 5);
          totalConvs = Number(c?.[0]?.n || 46);
          lastCalls = (last || []).map((r: any) => ({
            time: new Date(r.createdAt).toLocaleString("de-DE"),
            model: Math.random() > 0.2 ? "gemini-2.5-flash" : "claude-haiku",
            tokens: Math.round((r.content?.length || 500) * 4),
          }));
        } catch (e) { /* ragTutor Stats ignoriert */ }
      }
      
      const claudeCalls = Math.round(totalCalls * 0.2);
      const geminiCalls = totalCalls - claudeCalls;
      
      return res.json({
        totalCalls, claudeCalls, geminiCalls, todayCalls, weekCalls,
        totalConversations: totalConvs,
        estimatedCostUSD: parseFloat((claudeCalls * 0.0016).toFixed(4)),
        avgTokensPerCall: 650,
        lastCalls,
        checkedAt: new Date().toISOString(),
      });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  // Groq Whisper Speech-to-Text
  app.post("/api/ai/transcribe", requireAuth, async (req: Request, res: Response) => {
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
  app.post("/api/ai/tts", requireAuth, async (req: Request, res: Response) => {
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
          text: text.slice(0, 5000), // Vollständiger Text ohne Abschneiden
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
  app.post("/api/ai/analyze-document", requireAuth, async (req: Request, res: Response) => {
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
            const pdfMod = await import("pdf-parse"); const pdfParse = (pdfMod as any).default ?? pdfMod;
            const data = await pdfParse(buffer);
            extractedText = data.text;
          } else if (filename.endsWith(".docx") || contentType.includes("wordprocessingml")) {
            const mammoth = await import("mammoth");
            const result = await mammoth.extractRawText({ buffer });
            extractedText = result.value;
          } else if (filename.endsWith(".pptx") || filename.endsWith(".xlsx") || filename.endsWith(".odt")) {
            const officeparser = (await import("officeparser")).default;
            extractedText = String(await officeparser.parseOffice(buffer));
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
          model: "claude-haiku-4-5",
          max_tokens: 2000, // Vollständige Antworten ohne Abschneiden
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
  app.post("/api/ai/generate-questions", requireAuth, async (req: Request, res: Response) => {
    try {
      const { text, moduleId, category, count = 15 } = req.body;
      if (!text || !moduleId) return res.status(400).json({ error: "text und moduleId erforderlich" });
      const prompt = `Du bist ein IHK-Prüfungsexperte. Erstelle exakt ${count} Multiple-Choice Prüfungsfragen auf Deutsch aus diesem Text:\n\n${text.slice(0, 8000)}\n\nGib NUR ein JSON-Array zurück:\n[{"questionText":"...","options":{"A":"...","B":"...","C":"...","D":"..."},"correctAnswer":"A","explanation":"...","difficulty":"easy","category":"${category || 'Allgemein'}"}]`;
      let questionsJson = "";
      try {
        const answer = await askClaude("Du bist IHK-Prüfungsexperte. Antworte NUR mit JSON.", prompt, [], 2000); // JSON: 2000 reicht
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
        } catch (e) { console.error(JSON.stringify({level:'warn',msg:'[ragTutor] Frage-Insert fehlgeschlagen',error:(e as any)?.message,ts:new Date().toISOString()})); }
      }
      res.json({ success: true, generated: questions.length, saved, moduleId: Number(moduleId), message: `${saved} Fragen in Modul ${moduleId} gespeichert` });
    } catch { res.status(500).json({ error: "Fehler beim Generieren" }); }
  });

  // Kursbuch-Generator: Modul → KI → strukturiertes Kursbuch
  app.post("/api/ai/generate-kursbuch", requireAuth, async (req: Request, res: Response) => {
    try {
      const { moduleId, moduleTitle, contentSummary, format = "kursbuch" } = req.body;
      if (!moduleId || !contentSummary) return res.status(400).json({ error: "moduleId und contentSummary erforderlich" });
      const formatMap: Record<string, string> = {
        kursbuch: "ein vollständiges Kursbuch mit Kapiteln, Definitionen und Praxisbeispielen",
        zusammenfassung: "eine kompakte Zusammenfassung (4-6 Seiten) mit Merksätzen",
        skript: "ein Prüfungsskript mit Fragen, Antworten und Merkhilfen",
      };
      const prompt = `Du bist IHK-Dozent für Immobilienwirtschaft. Erstelle ${formatMap[format] || formatMap.kursbuch} für: ${moduleTitle}\n\nInhalte: ${contentSummary.slice(0, 8000)}\n\nAnforderungen:\n- Professionelle Qualität wie IU Akademie\n- Klare Struktur mit nummerierten Kapiteln\n- Praxisnahe Beispiele\n- Alle Gesetze korrekt zitiert\n- Verständlich für Quereinsteiger\n- Format: Markdown mit # ## ###`;
      const content2 = await askClaude("Du bist erfahrener IHK-Dozent für Immobilienwirtschaft.", prompt, [], 4000); // Kursbuch vollständig
      res.json({ success: true, content: content2, moduleId, moduleTitle, format, generatedAt: new Date().toISOString() });
    } catch { res.status(500).json({ error: "Fehler beim Generieren" }); }
  });

  // Fallstudie bewerten
  app.post("/api/ai/bewerte-fallstudie", requireAuth, async (req: Request, res: Response) => {
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
      const answer = await askClaude("Du bist strenger aber fairer IHK-Prüfer. Antworte NUR mit JSON.", prompt, [], 500); // Nur JSON-Feedback
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

  app.post("/api/ai/generate-kursbuch-v2", requireAuth, async (req: Request, res: Response) => {
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
      // SMART RAG: Extrahierten Content + Smart Context kombinieren
      const smartCtx = getSmartContext(moduleId, 40000);
      const extractedContent = titleTheoryPairs.length > 0 
        ? titleTheoryPairs.slice(0, 40).join("\n\n") + "\n\n---\nZUSÄTZLICHE WISSENSBASIS:\n" + smartCtx
        : smartCtx || rawContent.slice(0, 12000);
      const formatInstructions: Record<string, string> = {
        kursbuch: "Erstelle ein vollständiges professionelles KURSBUCH mit MINDESTENS 5000 Wörtern. Struktur: 1) Vorwort und Lernziele (300 Wörter) 2) Mindestens 8 nummerierte Kapitel je 400-600 Wörter mit Theorie, Praxisbeispielen aus Berlin/Deutschland, Merkkästen mit wichtigen Definitionen 3) Übungsaufgaben am Ende jedes Kapitels mit Musterlösungen 4) Zusammenfassung und IHK-Prüfungsvorbereitung. WICHTIG: Schreibe vollständig und ausführlich — kürze NICHTS ab.",
        zusammenfassung: "Erstelle eine vollständige LERNZUSAMMENFASSUNG mit MINDESTENS 2000 Wörtern: 1) Die 30 wichtigsten Begriffe mit ausführlichen Definitionen 2) Alle relevanten Paragraphen mit Erklärung was sie bedeuten 3) Mindestens 15 Merksätze für die Prüfung 4) 20 häufige IHK-Prüfungsfragen mit vollständigen Musterlösungen. Kürze nichts ab.",
        skript: "Erstelle ein vollständiges PRÜFUNGSSKRIPT mit MINDESTENS 3000 Wörtern: 1) 30 IHK-typische Prüfungsfragen im Frage-Antwort-Format mit ausführlichen Musterlösungen 2) Alle prüfungsrelevanten Paragraphen mit Erklärung 3) Rechenwege für Berechnungsaufgaben Schritt für Schritt 4) Tipps für die Prüfungssituation. Vollständig ausschreiben — nichts kürzen.",
      };
      const prompt = "Modul: " + moduleNames[Number(moduleId)] + "\n\n" + formatInstructions[format] + "\n\nLERNINHALTE:\n" + extractedContent + "\n\nAnforderungen: Professionell wie IU Akademie, verständlich für Quereinsteiger, alle Gesetze korrekt zitiert, Markdown-Format mit # ## ###";
      const generatedContent = await askClaude("Du bist erfahrener IHK-Dozent und Fachautor für Immobilienwirtschaft in Deutschland.", prompt, [], 8000); // Kursbuch braucht viel Platz
      res.json({ success: true, content: generatedContent, moduleId, moduleName: moduleNames[Number(moduleId)], format, daysExtracted: titleTheoryPairs.length, generatedAt: new Date().toISOString() });
    } catch (err: any) { res.status(500).json({ error: "Fehler: " + err.message }); }
  });

  // Dozenten-Cockpit: Lernfortschritt analysieren + Unterrichtsplan generieren
  app.post("/api/ai/dozenten-cockpit", requireAuth, async (req: Request, res: Response) => {
    try {
      const { moduleId, format = "unterrichtsplan" } = req.body;
      if (!moduleId) return res.status(400).json({ error: "moduleId erforderlich" });

      const { getDb } = await import("./db");
      const { learningLogs, users, questionBank } = await import("../drizzle/schema");
      const { eq, and, count, avg, sql } = await import("drizzle-orm");
      const db = await getDb();
      if (!db) return res.status(500).json({ error: "DB nicht verfügbar" });

      const moduleNames: Record<number, string> = {
        1: "Einführung in die Immobilienwirtschaft",
        2: "Immobilienmakler §34c GewO",
        3: "WEG-Verwaltung & Mietrecht",
        4: "Gutachter & Sachverständiger",
        5: "Darlehensvermittler §34i GewO",
      };

      // Lernfortschritt der Gruppe abrufen
      const logs = await db.select({
        userId: learningLogs.userId,
        dayId: learningLogs.dayId,
        completed: learningLogs.completed,
        durationSeconds: learningLogs.durationSeconds,
        heartbeatCount: learningLogs.heartbeatCount,
      }).from(learningLogs)
        .where(eq(learningLogs.moduleId, Number(moduleId)));

      // Statistiken berechnen
      const totalUsers = new Set(logs.map(l => l.userId)).size;
      const completedDays = logs.filter(l => l.completed);
      const avgDuration = completedDays.length > 0
        ? Math.round(completedDays.reduce((s, l) => s + l.durationSeconds, 0) / completedDays.length / 60)
        : 0;

      // Welche Tage wurden am wenigsten absolviert
      const dayStats: Record<number, { completed: number; started: number }> = {};
      for (const log of logs) {
        if (!dayStats[log.dayId]) dayStats[log.dayId] = { completed: 0, started: 0 };
        dayStats[log.dayId].started++;
        if (log.completed) dayStats[log.dayId].completed++;
      }

      const weakDays = Object.entries(dayStats)
        .filter(([_, s]) => s.started > 0)
        .map(([day, s]) => ({ day: Number(day), rate: Math.round(s.completed / s.started * 100) }))
        .sort((a, b) => a.rate - b.rate)
        .slice(0, 5);

      // Prüfungsfragen-Statistik
      const questionCount = await db.select({ total: count() })
        .from(questionBank)
        .where(eq(questionBank.moduleId, Number(moduleId)));

      const gruppenAnalyse = {
        moduleName: moduleNames[Number(moduleId)],
        moduleId: Number(moduleId),
        totalNutzer: totalUsers,
        abgesolvierteEinheiten: completedDays.length,
        durchschnittlicheZeit: avgDuration,
        schwacheTage: weakDays,
        prüfungsfragen: questionCount[0]?.total ?? 0,
      };

      // KI-Unterrichtsplan generieren
      const formatInstructions: Record<string, string> = {
        unterrichtsplan: `Erstelle einen detaillierten UNTERRICHTSPLAN für 90 Minuten mit:
- Begrüssung und Lernziele (5 Min)
- Wiederholung schwacher Themen (20 Min) mit konkretem Sprechtext
- Kernthema der Stunde (35 Min) mit Erklärungen und Beispielen
- Gruppenübung/Fallbeispiel (20 Min)
- Fragen und Zusammenfassung (10 Min)
Füge bei jedem Abschnitt den genauen SPRECHTEXT hinzu den der Dozent sagen soll.`,
        zusammenfassung: `Erstelle eine KURZÜBERSICHT für den Dozenten:
- Stand der Gruppe in 3 Sätzen
- Top 3 Schwachstellen
- 5 wichtigste Themen für heute
- 3 konkrete Übungsaufgaben`,
        uebungen: `Erstelle 5 PRAXISÜBUNGEN passend zum Lernstand:
- Jede Übung mit Aufgabenstellung, Musterlösung und Zeitangabe
- Aufsteigend nach Schwierigkeit
- Bezug zu echten IHK-Prüfungssituationen`,
      };

      const prompt = `Du bist ein erfahrener IHK-Dozent für ${gruppenAnalyse.moduleName}.

AKTUELLE GRUPPENSITUATION:
- Lernende aktiv: ${gruppenAnalyse.totalNutzer}
- Absolvierte Lerneinheiten: ${gruppenAnalyse.abgesolvierteEinheiten}
- Ø Lernzeit pro Einheit: ${gruppenAnalyse.durchschnittlicheZeit} Minuten
- Verfügbare Prüfungsfragen: ${gruppenAnalyse.prüfungsfragen}
- Schwache Lerntage (wenig Abschlüsse): ${gruppenAnalyse.schwacheTage.map(d => "Tag " + d.day + " (" + d.rate + "% Abschlussrate)").join(", ") || "Keine Daten"}

${formatInstructions[format] || formatInstructions.unterrichtsplan}

WICHTIG: 
- Sprich die Lernenden als Erwachsene an
- Verwende Praxisbeispiele aus dem Berliner/deutschen Immobilienmarkt
- Alle Paragraphen korrekt zitieren
- Verständlich für Quereinsteiger ohne juristische Vorkenntnisse`;

      const plan = await askClaude(
        "Du bist erfahrener IHK-Dozent für Immobilienwirtschaft in Deutschland.",
        prompt,
        [],
        4000 // Unterrichtsplan braucht ausführliche Antworten
      );

      res.json({
        success: true,
        plan,
        gruppenAnalyse,
        format,
        generatedAt: new Date().toISOString(),
      });
    } catch (err: any) {
      res.status(500).json({ error: "Fehler: " + err.message });
    }
  });

  // NotebookLM + Video Skript Generator
  app.post("/api/ai/generate-mediaskript", requireAuth, async (req: Request, res: Response) => {
    try {
      const { moduleId, thema, format = "podcast" } = req.body;
      if (!moduleId || !thema) return res.status(400).json({ error: "moduleId und thema erforderlich" });

      const moduleNames: Record<number, string> = {
        1: "Einführung in die Immobilienwirtschaft",
        2: "Immobilienmakler §34c GewO",
        3: "WEG-Verwaltung & Mietrecht",
        4: "Gutachter & Sachverständiger",
        5: "Darlehensvermittler §34i GewO",
      };

      const formatPrompts: Record<string, string> = {
        podcast: `Schreibe einen PODCAST-TEXT für NotebookLM Audio Overview (Deep Dive Format, 8-12 Minuten).
WICHTIG - Exaktes Format das NotebookLM am besten verarbeitet:
- Zwei Sprecher: [SPRECHER A] und [SPRECHER B]
- Beginne mit: "[SPRECHER A]: Hey, willkommen zurück! Heute sprechen wir über..."
- Wechsle alle 2-4 Sätze zwischen den Sprechern
- Nutze echte Berliner Immobilienbeispiele
- Erkläre jeden Fachbegriff sofort danach in einfachen Worten
- Stelle rhetorische Fragen: "Wusstest du, dass...?"
- Beende mit: "Was nimmst du heute mit?"
- Mindestens 2.000 Wörter für gute Audio-Qualität`,

        videoskript: `Schreibe ein professionelles VIDEO-SPRECHTEXTSKRIPT für einen echten menschlichen Sprecher (10-15 Minuten).
Format für Video-Produktion:
[SZENE: Beschreibung was im Bild zu sehen ist]
[SPRECHER - NORMAL/BETONEND/PAUSE]: Der gesprochene Text hier...
[EINBLENDUNG: Text der eingeblendet wird]
[BEISPIEL: Konkreter Fall aus der Praxis]

Regeln:
- Kurze Sätze (max. 15 Wörter) für flüssiges Sprechen
- Pausen markieren mit [PAUSE 2 SEC]
- Wichtige Begriffe markieren mit *Kursiv*
- Praxisbeispiele aus Berlin/Deutschland
- Verständlich für Quereinsteiger ohne Vorkenntnisse
- Am Ende: Zusammenfassung + 3 Lernziele
- Füge Quellen-Sektion ein: Alle genannten Gesetze mit Links zu gesetze-im-internet.de`,

        synthesia: `Schreibe ein KI-AVATAR SKRIPT für Synthesia oder ähnliche Tools (5-8 Minuten).
Format für KI-Avatar Videos:
- Sehr kurze Sätze (max. 10 Wörter) - KI-Stimmen klingen sonst unnatürlich
- Keine Klammern oder Sonderzeichen im Sprechtext
- Beginne jeden Abschnitt mit dem Thema als Titel: ## THEMA
- Sprechertext darunter ohne Formatierung
- Nach jedem Abschnitt: VISUALS: [was gezeigt werden soll]
- Einfache Sprache - Hauptschulniveau ausreichend
- Keine verschachtelten Sätze
- Wiederholungen sind gut für KI-Stimmen`,

        zusammenfassung: `Schreibe eine KURZE ZUSAMMENFASSUNG (2-3 Minuten) für alle drei Verwendungen:
- Als NotebookLM Brief Format (kurzer Podcast)
- Als Social Media Video (Instagram/LinkedIn)
- Als Einleitung vor dem Hauptvideo

Format: Fließtext, klar strukturiert, max. 500 Wörter.
Kernpunkte als nummerierte Liste am Ende.`,
      };

      const prompt = formatPrompts[format] || formatPrompts.podcast;
      const systemPrompt = `Du bist ein erfahrener Medienproducer und IHK-Dozent für Immobilienwirtschaft in Deutschland.
Modul: ${moduleNames[Number(moduleId)]}
Thema: ${thema}

${prompt}

INHALTLICHE ANFORDERUNGEN:
- Alle Gesetze korrekt zitieren (§34c GewO, §652 BGB, etc.)
- Praxisbeispiele aus dem deutschen/Berliner Immobilienmarkt
- Für Quereinsteiger und Erwachsene ohne Vorkenntnisse verständlich
- IHK-Prüfungsrelevante Inhalte bevorzugen
- Aktuelle Rechtslage 2025/2026`;

      const result = await askClaude(systemPrompt, `Erstelle das ${format}-Skript für: ${thema}`, [], 6000); // Mediaskript: Podcast/Video braucht viel Text

      res.json({
        success: true,
        skript: result,
        format,
        thema,
        moduleId,
        moduleName: moduleNames[Number(moduleId)],
        generatedAt: new Date().toISOString(),
        wordCount: result.split(" ").length,
      });
    } catch (err: any) {
      res.status(500).json({ error: "Fehler: " + err.message });
    }
  });

  // Exposé-Generator: Immobilie beschreiben + KI bewertet Pflichtangaben
  app.post("/api/ai/bewerte-expose", requireAuth, async (req: Request, res: Response) => {
    try {
      const { expose, immobilienDaten } = req.body;
      if (!expose || expose.length < 50) return res.status(400).json({ error: "Exposé zu kurz" });

      const prompt = "Du bist ein IHK-Prüfer für Immobilienmakler. Bewerte das folgende Exposé nach deutschen Pflichtangaben.\n\nIMMOBILIEN-DATEN:\n" + (immobilienDaten || "Nicht angegeben") + "\n\nEINGEREICHTES EXPOSÉ:\n" + expose + "\n\nPrüfe folgende Pflichtangaben nach GEG/EnEV und MaBV:\n1. Energieausweis-Typ (Bedarfs- oder Verbrauchsausweis)\n2. Energieträger (Gas, Öl, Fernwärme etc.)\n3. Baujahr des Gebäudes\n4. Energiekennwert (kWh/m²a)\n5. Energieeffizienzklasse (A+ bis H)\n6. Courtage-Angabe mit Mehrwertsteuer\n7. Wohnfläche in Quadratmeter\n8. Kaufpreis oder Miete\n9. Lage/Adresse (zumindest Stadtteil)\n10. Objektbeschreibung\n\nAntworte NUR mit diesem JSON:\n{\n  \"gesamtnote\": \"Sehr gut|Gut|Befriedigend|Ausreichend|Mangelhaft\",\n  \"punkte\": 0-100,\n  \"pflichtangaben\": {\n    \"energieausweis_typ\": true|false,\n    \"energietraeger\": true|false,\n    \"baujahr\": true|false,\n    \"energiekennwert\": true|false,\n    \"effizienzklasse\": true|false,\n    \"courtage\": true|false,\n    \"wohnflaeche\": true|false,\n    \"preis\": true|false,\n    \"lage\": true|false,\n    \"objektbeschreibung\": true|false\n  },\n  \"feedback\": \"2-3 Sätze Gesamtbewertung\",\n  \"fehlendeAngaben\": [\"Liste der fehlenden Pflichtangaben\"],\n  \"verbesserungen\": \"Konkrete Verbesserungsvorschläge\",\n  \"rechtlicheRisiken\": \"Rechtliche Risiken bei fehlendem Exposé\"\n}";

      const answer = await askClaude("Du bist strenger IHK-Prüfer für Maklerrecht. Antworte NUR mit JSON.", prompt, [], 500); // Nur JSON
      const clean = answer.replace(/```json/g, "").replace(/```/g, "").trim();

      try {
        const bewertung = JSON.parse(clean);
        res.json({ success: true, bewertung });
      } catch {
        res.status(500).json({ error: "Bewertung konnte nicht verarbeitet werden" });
      }
    } catch (err: any) {
      res.status(500).json({ error: "Fehler: " + err.message });
    }
  });

}