import { askLlmWithContinuation, type LlmResult } from "./kursbuchLlm";

export type ClaudeResult = {
  text: string;
  complete: boolean;
  stopReason: string;
};

/** @deprecated Nutze askLlmWithContinuation — delegiert an Multi-Provider-Layer */
export async function askClaudeWithContinuation(
  systemPrompt: string,
  userPrompt: string,
  maxTokens: number,
  maxContinuations = 2,
): Promise<ClaudeResult> {
  const result: LlmResult = await askLlmWithContinuation(
    systemPrompt,
    userPrompt,
    maxTokens,
    maxContinuations,
  );
  return { text: result.text, complete: result.complete, stopReason: result.stopReason };
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
