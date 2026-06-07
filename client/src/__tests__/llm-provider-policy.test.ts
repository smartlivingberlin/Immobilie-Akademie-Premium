import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

const repoRoot = path.basename(process.cwd()) === "client"
  ? path.resolve(process.cwd(), "..")
  : process.cwd();

const llmSource = readFileSync(
  path.join(repoRoot, "server/_core/llm.ts"),
  "utf-8"
);

describe("LLM provider policy", () => {
  it("does not route Anthropic through the OpenAI-compatible adapter", () => {
    expect(llmSource).not.toContain("https://api.anthropic.com/v1/messages");
    expect(llmSource).toContain("Anthropic wird in separaten SDK-Routen genutzt");
  });

  it("uses provider-specific model configuration instead of one hardcoded model", () => {
    expect(llmSource).toContain("process.env.GEMINI_MODEL || DEFAULT_GEMINI_MODEL");
    expect(llmSource).toContain("process.env.OPENAI_MODEL || DEFAULT_OPENAI_MODEL");
    expect(llmSource).toContain("model: provider.model");
  });
});
