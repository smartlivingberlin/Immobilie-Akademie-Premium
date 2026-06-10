import { describe, expect, it } from "vitest";
import { objektToVorlageDefaults } from "./verwalterObjektTypes";

describe("objektToVorlageDefaults", () => {
  it("mappt Stammdaten auf Vorlagen-Felder", () => {
    const d = objektToVorlageDefaults({
      id: "1",
      name: "WEG Park",
      adresse: "Park 1",
      plz: "10115",
      ort: "Berlin",
      einheitenAnzahl: 10,
      verwalterName: "HV GmbH",
      verwalterAdresse: "HV Str. 2",
      kontaktEmail: "a@b.de",
      einheiten: [],
      createdAt: "",
      updatedAt: "",
    });
    expect(d.wegName).toBe("WEG Park");
    expect(d.verwalterName).toBe("HV GmbH");
    expect(d.objektAdresse).toContain("Berlin");
  });
});
