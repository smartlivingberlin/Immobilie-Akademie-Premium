/**
 * Multi-Provider LLM für Kursbuch-Pipeline.
 * Reihenfolge: Gemini (kostenlos) → Groq (kostenlos) → Claude Haiku (Fallback).
 */
export type LlmResult = {
  text: string;
  complete: boolean;
  stopReason: string;
  provider: "gemini" | "groq" | "claude" | "none";
};

type Message = { role: "user" | "assistant"; content: string };

type ProviderId = "gemini" | "groq" | "claude";

const PROVIDER_ORDER: ProviderId[] = ["gemini", "groq", "claude"];

function resolveProviders(): ProviderId[] {
  const available: ProviderId[] = [];
  if (process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY) available.push("gemini");
  if (process.env.GROQ_API_KEY) available.push("groq");
  if (process.env.ANTHROPIC_API_KEY) available.push("claude");
  return PROVIDER_ORDER.filter((p) => available.includes(p));
}

function geminiKey(): string | undefined {
  return process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY;
}

async function callGemini(
  systemPrompt: string,
  messages: Message[],
  maxTokens: number,
): Promise<{ text: string; stopReason: string }> {
  const apiKey = geminiKey();
  if (!apiKey) throw new Error("GEMINI_API_KEY fehlt");

  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents,
        generationConfig: { temperature: 0.3, maxOutputTokens: maxTokens },
      }),
    },
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Gemini Error: ${err}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
  const finishReason = data.candidates?.[0]?.finishReason || "STOP";
  const stopReason = finishReason === "MAX_TOKENS" ? "max_tokens" : "end_turn";
  return { text, stopReason };
}

async function callGroq(
  systemPrompt: string,
  messages: Message[],
  maxTokens: number,
): Promise<{ text: string; stopReason: string }> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY fehlt");

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      max_tokens: maxTokens,
      temperature: 0.3,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Groq Error: ${err}`);
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content || "";
  const finishReason = data.choices?.[0]?.finish_reason || "stop";
  const stopReason = finishReason === "length" ? "max_tokens" : "end_turn";
  return { text, stopReason };
}

async function callClaude(
  systemPrompt: string,
  messages: Message[],
  maxTokens: number,
): Promise<{ text: string; stopReason: string }> {
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
      messages,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Claude Error: ${err}`);
  }

  const data = await response.json();
  const text = data.content?.[0]?.text || "";
  const stopReason = data.stop_reason || "end_turn";
  return { text, stopReason };
}

async function callProvider(
  provider: ProviderId,
  systemPrompt: string,
  messages: Message[],
  maxTokens: number,
): Promise<{ text: string; stopReason: string }> {
  switch (provider) {
    case "gemini":
      return callGemini(systemPrompt, messages, maxTokens);
    case "groq":
      return callGroq(systemPrompt, messages, maxTokens);
    case "claude":
      return callClaude(systemPrompt, messages, maxTokens);
  }
}

/** Ein Provider mit Fortsetzung bei max_tokens */
async function askProviderWithContinuation(
  provider: ProviderId,
  systemPrompt: string,
  userPrompt: string,
  maxTokens: number,
  maxContinuations: number,
): Promise<LlmResult> {
  let text = "";
  let messages: Message[] = [{ role: "user", content: userPrompt }];
  let continuations = 0;
  let stopReason = "end_turn";

  while (true) {
    const chunk = await callProvider(provider, systemPrompt, messages, maxTokens);
    text += chunk.text;
    stopReason = chunk.stopReason;

    if (stopReason !== "max_tokens" || continuations >= maxContinuations) {
      return {
        text,
        complete: stopReason !== "max_tokens",
        stopReason,
        provider,
      };
    }

    continuations++;
    const tail = text.slice(-600);
    messages = [
      { role: "user", content: userPrompt },
      { role: "assistant", content: text },
      {
        role: "user",
        content: `Setze den Text exakt fort — keine Wiederholung, nahtlos:\n...${tail}`,
      },
    ];
  }
}

/** Multi-Provider mit Fallback und Fortsetzung */
export async function askLlmWithContinuation(
  systemPrompt: string,
  userPrompt: string,
  maxTokens: number,
  maxContinuations = 5,
): Promise<LlmResult> {
  const providers = resolveProviders();
  if (providers.length === 0) {
    throw new Error(
      "Kein KI-Provider konfiguriert. Setze GEMINI_API_KEY, GROQ_API_KEY oder ANTHROPIC_API_KEY.",
    );
  }

  let lastError: Error | null = null;
  for (const provider of providers) {
    try {
      const result = await askProviderWithContinuation(
        provider,
        systemPrompt,
        userPrompt,
        maxTokens,
        maxContinuations,
      );
      if (result.text.trim().length > 0) return result;
    } catch (e) {
      lastError = e as Error;
      console.error(
        JSON.stringify({
          level: "warn",
          msg: "[kursbuchLlm] Provider fehlgeschlagen",
          provider,
          error: (e as Error).message,
        }),
      );
    }
  }

  throw lastError || new Error("Alle KI-Provider fehlgeschlagen");
}

export function getLlmProviderStatus(): {
  gemini: boolean;
  groq: boolean;
  claude: boolean;
  primary: ProviderId | "none";
} {
  const gemini = Boolean(geminiKey());
  const groq = Boolean(process.env.GROQ_API_KEY);
  const claude = Boolean(process.env.ANTHROPIC_API_KEY);
  const order = resolveProviders();
  return {
    gemini,
    groq,
    claude,
    primary: order[0] ?? "none",
  };
}
