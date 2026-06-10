import { describe, expect, it } from "vitest";
import { validateDayOutput } from "./kursbuchPipelineValidation";

describe("validateDayOutput", () => {
  it("akzeptiert Markdown mit Tag-Nummer", () => {
    const md = "## Tag 5: Maklerrecht\n\n".padEnd(200, "x");
    expect(validateDayOutput(md, [5])).toBe(true);
  });

  it("lehnt zu kurzen Output ab", () => {
    expect(validateDayOutput("## Tag 1", [1])).toBe(false);
  });

  it("lehnt Output ohne passende Tag-Nummer ab", () => {
    const md = "## Kapitel Einführung\n\n".padEnd(200, "y");
    expect(validateDayOutput(md, [42])).toBe(false);
  });
});
