import { describe, expect, it, afterEach } from "vitest";
import { existsSync, rmSync } from "fs";
import { join } from "path";
import { buildVerwalterAssistentPrompt } from "./verwalterAssistentContext";
import { createObjekt } from "./verwalterObjektStore";

const TEST_USER = 999010;
const objFile = join(process.cwd(), "data", "verwalter-objekte", `user-${TEST_USER}.json`);

describe("verwalterAssistentContext", () => {
  afterEach(() => {
    if (existsSync(objFile)) rmSync(objFile);
  });

  it("enthält Wissensbasis und Objekt-Kontext", async () => {
    const obj = await createObjekt(TEST_USER, {
      name: "WEG Assistent-Test",
      adresse: "A",
      plz: "1",
      ort: "B",
      einheitenAnzahl: 2,
      verwalterName: "V",
      verwalterAdresse: "V",
    });
    const prompt = await buildVerwalterAssistentPrompt(TEST_USER, {
      seite: "/app/verwalter/buchungen",
      objektId: obj.id,
    });
    expect(prompt).toContain("Soll und Haben");
    expect(prompt).toContain("WEG Assistent-Test");
    expect(prompt).toContain("1200");
  });
});
