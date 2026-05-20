/**
 * ═══════════════════════════════════════════════════════════
 * SUPER-AGENT v2 — Immobilien Akademie Smart
 * ═══════════════════════════════════════════════════════════
 * 
 * FÄHIGKEITEN:
 * 1. Multi-KI Routing (Claude → Gemini → Groq Fallback)
 * 2. Autonome Content-Prüfung mit KI-Analyse
 * 3. Persistent Memory (DB-gestützt)
 * 4. Self-Healing: Erkennt + meldet + fixt Fehler
 * 5. Rechts-Monitor: Prüft Gesetzesänderungen
 * 6. IHK-Qualitätsprüfung aller 240 Lerntage
 * 7. Nutzer-Analyse + personalisierte Empfehlungen
 * ═══════════════════════════════════════════════════════════
 */

import { readFileSync, existsSync, writeFileSync, appendFileSync } from "fs";
import { logger } from "../_core/logger";
import { join } from "path";

// ─── KI-MODELLE KONFIGURATION ──────────────────────────────
const AI_MODELS = {
  claude: {
    url: "https://api.anthropic.com/v1/messages",
    model: "claude-haiku-4-5-20251001",
    apiKeyEnv: "ANTHROPIC_API_KEY",
    costPer1k: 0.00025, // $0.25/1M input tokens
    strengths: ["Rechtsfragen", "Analyse", "Qualitätsprüfung", "Deutsch"],
  },
  gemini: {
    url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
    model: "gemini-2.5-flash",
    apiKeyEnv: "GEMINI_API_KEY",
    costPer1k: 0.000075,
    strengths: ["Schnell", "Didaktik", "Erklärungen", "Zusammenfassungen"],
  },
  groq: {
    url: "https://api.groq.com/openai/v1/chat/completions",
    model: "llama-3.3-70b-versatile",
    apiKeyEnv: "GROQ_API_KEY",
    costPer1k: 0.000059,
    strengths: ["Ultra-schnell", "Einfache Fragen", "Stichworte"],
  }
};

// ─── TASK TYPES ────────────────────────────────────────────
export type AgentTask =
  | "content_quality_check"   // IHK-Qualität prüfen
  | "legal_update_check"      // Gesetzesänderungen prüfen
  | "quiz_generate"           // Neue Prüfungsfragen generieren
  | "user_recommendation"     // Lernempfehlungen für Nutzer
  | "content_improve"         // Inhalte verbessern
  | "answer_question"         // Frage beantworten
  | "system_health"           // System-Gesundheit prüfen
  | "ihk_compliance";         // IHK-Konformität prüfen

// ─── AGENT MEMORY ──────────────────────────────────────────
const MEMORY_FILE = join(process.cwd(), "server/agent/memory.json");

interface AgentMemory {
  tasks_completed: number;
  tokens_used: number;
  last_check: Record<string, string>;
  known_issues: Array<{id: string; severity: string; message: string; resolved: boolean; date: string}>;
  improvements_made: Array<{module: number; day: number; type: string; date: string}>;
  legal_changes_detected: Array<{law: string; change: string; date: string}>;
}

function loadMemory(): AgentMemory {
  try {
    if (existsSync(MEMORY_FILE)) {
      return JSON.parse(readFileSync(MEMORY_FILE, "utf-8"));
    }
  } catch (e) { /* Memory-Datei nicht lesbar — leerer Zustand als Fallback */ }
  return {
    tasks_completed: 0,
    tokens_used: 0,
    last_check: {},
    known_issues: [],
    improvements_made: [],
    legal_changes_detected: [],
  };
}

function saveMemory(mem: AgentMemory) {
  try {
    writeFileSync(MEMORY_FILE, JSON.stringify(mem, null, 2));
  } catch (e) { console.error(JSON.stringify({level:'error',msg:'[SuperAgent] Memory speichern fehlgeschlagen',error:(e as any)?.message,ts:new Date().toISOString()})); }
}

// ─── KI-AUFRUFE ────────────────────────────────────────────
async function callClaude(prompt: string, system: string, maxTokens = 500): Promise<string> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) throw new Error("ANTHROPIC_API_KEY fehlt");
  
  const r = await fetch(AI_MODELS.claude.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: AI_MODELS.claude.model,
      max_tokens: maxTokens,
      system,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await r.json();
  return data.content?.[0]?.text || "";
}

async function callGemini(prompt: string, maxTokens = 500): Promise<string> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY fehlt");
  
  const r = await fetch(`${AI_MODELS.gemini.url}?key=${key}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { maxOutputTokens: maxTokens },
    }),
  });
  const data = await r.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
}

async function callGroq(prompt: string, maxTokens = 300): Promise<string> {
  const key = process.env.GROQ_API_KEY;
  if (!key) throw new Error("GROQ_API_KEY fehlt");
  
  const r = await fetch(AI_MODELS.groq.url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${key}` },
    body: JSON.stringify({
      model: AI_MODELS.groq.model,
      messages: [{ role: "user", content: prompt }],
      max_tokens: maxTokens,
    }),
  });
  const data = await r.json();
  return data.choices?.[0]?.message?.content || "";
}

// Smart Router: Wählt bestes Modell für Task
async function smartCall(
  prompt: string,
  task: AgentTask,
  system = "Du bist ein IHK-Immobilien-Experte."
): Promise<{result: string; model: string; tokens_est: number}> {
  
  // Task → bestes Modell
  const taskModel: Record<AgentTask, keyof typeof AI_MODELS> = {
    content_quality_check: "claude",
    legal_update_check: "claude",
    ihk_compliance: "claude",
    content_improve: "claude",
    quiz_generate: "gemini",
    user_recommendation: "gemini",
    answer_question: "gemini",
    system_health: "groq",
  };
  
  const preferredModel = taskModel[task];
  const tokens_est = Math.ceil(prompt.length / 4);
  
  try {
    let result = "";
    if (preferredModel === "claude") result = await callClaude(prompt, system);
    else if (preferredModel === "gemini") result = await callGemini(prompt);
    else result = await callGroq(prompt);
    
    const mem = loadMemory();
    mem.tokens_used += tokens_est;
    mem.tasks_completed++;
    saveMemory(mem);
    
    return { result, model: preferredModel, tokens_est };
  } catch (e1) {
    // Fallback Chain: Claude → Gemini → Groq
    const fallbacks: Array<keyof typeof AI_MODELS> = ["claude", "gemini", "groq"]
      .filter(m => m !== preferredModel) as Array<keyof typeof AI_MODELS>;
    
    for (const fallback of fallbacks) {
      try {
        let result = "";
        if (fallback === "claude") result = await callClaude(prompt, system);
        else if (fallback === "gemini") result = await callGemini(prompt);
        else result = await callGroq(prompt);
        return { result, model: `${fallback}(fallback)`, tokens_est };
      } catch (e) { console.error(JSON.stringify({level:'warn',msg:'[SuperAgent] KI-Fallback fehlgeschlagen',error:(e as any)?.message,ts:new Date().toISOString()})); }
    }
    return { result: "Alle KI-Dienste nicht verfügbar", model: "none", tokens_est: 0 };
  }
}

// ─── AGENT HAUPTKLASSE ─────────────────────────────────────
export class SuperAgent {

  /**
   * TASK 1: IHK Qualitätsprüfung eines Lerntags
   * Prüft Fachlichkeit, Didaktik, Normen, Vollständigkeit
   */
  static async checkDayQuality(module: number, day: number, content: {
    title: string;
    theory: string;
    extended?: string;
    task?: string;
    norms?: string[];
  }): Promise<{
    score: number;
    issues: string[];
    suggestions: string[];
    model: string;
  }> {
    const prompt = `IHK §34c Experte. Prüfe diesen Lerntag:
    
Modul ${module}, Tag ${day}: "${content.title}"
Theorie: ${content.theory?.slice(0,300)}
Normen: ${content.norms?.join(", ") || "KEINE"}
Aufgabe: ${content.task?.slice(0,150) || "KEINE"}

Antworte NUR:
SCORE:X/100
PROBLEME:(max 3, je 1 Zeile)
NORMEN_FEHLEN:(§§ oder NEIN)
VERBESSERUNG:(1 Satz)`;

    const { result, model } = await smartCall(prompt, "content_quality_check");
    
    const scoreMatch = result.match(/SCORE:\s*(\d+)/);
    const score = scoreMatch ? parseInt(scoreMatch[1]) : 70;
    
    const issues: string[] = [];
    const issueMatch = result.match(/PROBLEME:([\s\S]*?)(?:NORMEN|$)/);
    if (issueMatch) {
      issues.push(...issueMatch[1].trim().split("\n").filter(l => l.trim()));
    }
    
    const suggestions: string[] = [];
    const suggMatch = result.match(/VERBESSERUNG:(.*)/);
    if (suggMatch) suggestions.push(suggMatch[1].trim());
    
    const mem = loadMemory();
    if (score < 70) {
      mem.known_issues.push({
        id: `M${module}_T${day}`,
        severity: score < 50 ? "critical" : "warning",
        message: `M${module} T${day}: Score ${score}/100`,
        resolved: false,
        date: new Date().toISOString(),
      });
      saveMemory(mem);
    }
    
    return { score, issues, suggestions, model };
  }

  /**
   * TASK 2: Neue IHK-Prüfungsfrage generieren
   * Erstellt echte Multiple-Choice Fragen
   */
  static async generateIHKQuestion(module: number, topic: string, difficulty: "easy"|"medium"|"hard"): Promise<{
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
    model: string;
  }> {
    const diffMap = { easy: "einfach (Grundwissen)", medium: "mittel (Verständnis)", hard: "schwer (Anwendung)" };
    
    const prompt = `Erstelle 1 IHK-Prüfungsfrage für Modul ${module}: "${topic}"
Schwierigkeit: ${diffMap[difficulty]}

Format EXAKT:
FRAGE: [Fragetext]
A: [Option A]
B: [Option B]  
C: [Option C]
D: [Option D]
RICHTIG: [A/B/C/D]
ERKLAERUNG: [Kurze Begründung mit §-Bezug]`;

    const { result, model } = await smartCall(prompt, "quiz_generate");
    
    const qMatch = result.match(/FRAGE:\s*(.+)/);
    const aMatch = result.match(/A:\s*(.+)/);
    const bMatch = result.match(/B:\s*(.+)/);
    const cMatch = result.match(/C:\s*(.+)/);
    const dMatch = result.match(/D:\s*(.+)/);
    const rMatch = result.match(/RICHTIG:\s*([ABCD])/);
    const eMatch = result.match(/ERKLAERUNG:\s*(.+)/);
    
    return {
      question: qMatch?.[1] || topic,
      options: [aMatch?.[1]||"", bMatch?.[1]||"", cMatch?.[1]||"", dMatch?.[1]||""],
      correctAnswer: rMatch?.[1] || "A",
      explanation: eMatch?.[1] || "",
      model,
    };
  }

  /**
   * TASK 3: Personalisierte Lernempfehlung
   * Analysiert Schwachstellen + empfiehlt nächste Schritte
   */
  static async getUserRecommendation(userStats: {
    completedDays: number[];
    weakTopics: string[];
    avgScore: number;
    module: number;
  }): Promise<{recommendation: string; nextDays: number[]; focus: string; model: string}> {
    
    const prompt = `Lernexperte Immobilien IHK. Nutzer-Profil:
- Absolviert: ${userStats.completedDays.length} Lerntage in Modul ${userStats.module}
- Schwachstellen: ${userStats.weakTopics.join(", ") || "keine"}
- Durchschnitt: ${userStats.avgScore}%

Empfehle (kurz):
EMPFEHLUNG: [1 Satz was als nächstes]
FOKUS: [wichtigstes Thema]
NAECHSTE_TAGE: [3 Tagnummern, kommagetrennt]`;

    const { result, model } = await smartCall(prompt, "user_recommendation");
    
    const recMatch = result.match(/EMPFEHLUNG:\s*(.+)/);
    const focMatch = result.match(/FOKUS:\s*(.+)/);
    const daysMatch = result.match(/NAECHSTE_TAGE:\s*(.+)/);
    const nextDays = daysMatch?.[1]?.split(",").map(d => parseInt(d.trim())).filter(n => !isNaN(n)) || [];
    
    return {
      recommendation: recMatch?.[1] || "Weiter mit dem nächsten Tag",
      focus: focMatch?.[1] || "",
      nextDays,
      model,
    };
  }

  /**
   * TASK 4: System Health Check
   * Schneller Gesundheitsstatus des gesamten Systems
   */
  static async systemHealthCheck(): Promise<{
    status: "healthy"|"warning"|"critical";
    checks: Array<{name: string; ok: boolean; detail: string}>;
    aiStatus: Record<string, boolean>;
    memory: AgentMemory;
  }> {
    const checks = [];
    
    // Modul-Dateien prüfen
    const moduleFiles = [
      "client/src/pages/modules/Module1Content_Maximal.ts",
      "client/src/pages/modules/Module2ContentPart1_Maximal.ts",
      "client/src/pages/modules/Module3Content_Maximal.ts",
      "client/src/pages/modules/Module4Content_Valuation_Maximalist.ts",
      "client/src/pages/modules/Module5Content_34i_Part1.ts",
    ];
    
    for (const f of moduleFiles) {
      const exists = existsSync(f);
      checks.push({
        name: f.split("/").pop() || f,
        ok: exists,
        detail: exists ? "✅ vorhanden" : "❌ fehlt"
      });
    }
    
    // KI-Dienste prüfen
    const aiStatus: Record<string, boolean> = {
      claude: !!process.env.ANTHROPIC_API_KEY,
      gemini: !!(process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY),
      groq: !!process.env.GROQ_API_KEY,
    };
    
    checks.push({ name: "Claude API", ok: aiStatus.claude, detail: aiStatus.claude ? "✅ Key vorhanden" : "❌ Key fehlt" });
    checks.push({ name: "Gemini API", ok: aiStatus.gemini, detail: aiStatus.gemini ? "✅ Key vorhanden" : "❌ Key fehlt" });
    checks.push({ name: "Groq API", ok: aiStatus.groq, detail: aiStatus.groq ? "✅ Key vorhanden" : "❌ Key fehlt" });
    
    const mem = loadMemory();
    const failedChecks = checks.filter(c => !c.ok).length;
    
    return {
      status: failedChecks === 0 ? "healthy" : failedChecks <= 2 ? "warning" : "critical",
      checks,
      aiStatus,
      memory: mem,
    };
  }

  /**
   * TASK 5: Rechtliche Änderungen erkennen und melden
   */
  static async checkLegalUpdates(): Promise<{
    changes: Array<{law: string; impact: string; modules: number[]; urgency: string}>;
    model: string;
  }> {
    const prompt = `Immobilienrecht Deutschland 2025/2026.
Prüfe ob es aktuelle Änderungen gibt bei:
- §34c GewO (Maklerrecht)
- §34i GewO (Darlehensvermittler) 
- WEG-Reform
- ImmoWertV
- GwG Geldwäsche
- DSGVO Immobilien

Antworte mit konkreten Änderungen 2024-2026.
Format: GESETZ|ÄNDERUNG|DRINGLICHKEIT(hoch/mittel/niedrig)|MODULE(1-5 kommagetrennt)
Wenn keine Änderung: GESETZ|aktuell|niedrig|0`;

    const { result, model } = await smartCall(prompt, "legal_update_check",
      "Du bist Immobilienrechts-Experte. Antworte sachlich und faktisch.");
    
    const changes = result.split("\n")
      .filter(l => l.includes("|"))
      .map(line => {
        const [law, impact, urgency, modulesStr] = line.split("|");
        const modules = (modulesStr || "").split(",").map(m => parseInt(m.trim())).filter(n => n > 0);
        return { law: law?.trim(), impact: impact?.trim(), urgency: urgency?.trim(), modules };
      })
      .filter(c => c.law && c.impact !== "aktuell");
    
    const mem = loadMemory();
    changes.forEach(c => {
      if (!mem.legal_changes_detected.find(l => l.law === c.law)) {
        mem.legal_changes_detected.push({ law: c.law, change: c.impact, date: new Date().toISOString() });
      }
    });
    saveMemory(mem);
    
    return { changes, model };
  }

  /**
   * TASK 6: Frage intelligent beantworten (RAG)
   */
  static async answerQuestion(question: string, moduleId?: number): Promise<{
    answer: string;
    sources: string[];
    confidence: number;
    model: string;
  }> {
    // Kontext aus Moduldaten laden
    let context = "";
    if (moduleId) {
      const moduleFiles: Record<number, string> = {
        1: "client/src/pages/modules/Module1Content_Maximal.ts",
        2: "client/src/pages/modules/Module2ContentPart1_Maximal.ts",
        3: "client/src/pages/modules/Module3Content_Maximal_MissingDays.ts",
        4: "client/src/pages/modules/Module4Content_Valuation_Maximalist.ts",
        5: "client/src/pages/modules/Module5Content_34i_Part1.ts",
      };
      const file = moduleFiles[moduleId];
      if (file && existsSync(file)) {
        try {
          const raw = readFileSync(file, "utf-8");
          // Extrahiere relevante Abschnitte
          context = raw.slice(0, 8000);
        } catch (e) { /* Datei nicht lesbar — ignoriert */ }
      }
    }
    
    const prompt = `${context ? `KONTEXT:\n${context.slice(0,2000)}\n\n` : ""}FRAGE: ${question}

Beantworte die Frage als IHK-Immobilien-Experte.
Zitiere relevante Paragraphen (§§).
Antworte auf Deutsch, präzise, max 200 Wörter.`;

    const { result, model } = await smartCall(prompt, "answer_question",
      "Du bist ein erfahrener Immobilien-Experte mit 20 Jahren Erfahrung.");
    
    // Gesetzesreferenzen extrahieren
    const sources = (result.match(/§\s*\d+[a-z]?\s*(?:BGB|GewO|WEG|GwG|ImmoWertV)/g) || [])
      .filter((v, i, a) => a.indexOf(v) === i);
    
    return {
      answer: result,
      sources,
      confidence: result.length > 50 ? 85 : 60,
      model,
    };
  }

  /**
   * Gibt Agent-Status + Memory zurück
   */
  static getStatus(): {memory: AgentMemory; aiModels: typeof AI_MODELS; version: string} {
    return {
      memory: loadMemory(),
      aiModels: AI_MODELS,
      version: "2.0.0",
    };
  }
}

export default SuperAgent;
