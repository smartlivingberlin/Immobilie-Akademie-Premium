export type ClaudeResult = {
  text: string;
  complete: boolean;
  stopReason: string;
};

type Message = { role: "user" | "assistant"; content: string };

export async function askClaudeWithContinuation(
  systemPrompt: string,
  userPrompt: string,
  maxTokens: number,
  maxContinuations = 2,
): Promise<ClaudeResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY fehlt");

  let text = "";
  let messages: Message[] = [{ role: "user", content: userPrompt }];
  let continuations = 0;
  let stopReason = "end_turn";

  while (true) {
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
    const chunk = data.content?.[0]?.text || "";
    stopReason = data.stop_reason || "end_turn";
    text += chunk;

    if (stopReason !== "max_tokens" || continuations >= maxContinuations) {
      return { text, complete: stopReason !== "max_tokens", stopReason };
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

/** Parallele Verarbeitung mit begrenzter Concurrency */
export async function mapWithConcurrency<T, R>(
  items: T[],
  concurrency: number,
  fn: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let next = 0;

  async function worker() {
    while (next < items.length) {
      const i = next++;
      results[i] = await fn(items[i], i);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, () => worker()),
  );
  return results;
}
