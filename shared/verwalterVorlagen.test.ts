import { describe, expect, it } from "vitest";
import {
  VERWALTER_VORLAGEN,
  getVorlageBySlug,
  renderVorlageBody,
} from "./verwalterVorlagen";

describe("verwalterVorlagen", () => {
  it("enthält 26 Vorlagen", () => {
    expect(VERWALTER_VORLAGEN.length).toBe(26);
  });

  it("getVorlageBySlug findet neue Sprint-A4-Vorlagen", () => {
    expect(getVorlageBySlug("mahnung-stufe3")?.category).toBe("mahnung");
    expect(getVorlageBySlug("etv-vertretungsvollmacht")?.category).toBe("etv");
    expect(getVorlageBySlug("nk-weg-abrechnung")?.category).toBe("nk");
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
