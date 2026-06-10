import { describe, expect, it } from "vitest";
import {
  VERWALTER_VORLAGEN,
  getVorlageBySlug,
  renderVorlageBody,
} from "./verwalterVorlagen";

describe("verwalterVorlagen", () => {
  it("enthält 20 Vorlagen", () => {
    expect(VERWALTER_VORLAGEN.length).toBe(20);
  });

  it("getVorlageBySlug findet ETV-Einladung", () => {
    const v = getVorlageBySlug("etv-einladung");
    expect(v?.title).toMatch(/Eigentümerversammlung/i);
  });

  it("renderVorlageBody ersetzt Platzhalter", () => {
    const body = renderVorlageBody("Hallo {{name}}", { name: "Müller" });
    expect(body).toBe("Hallo Müller");
  });
});
