import { describe, expect, it } from "vitest";
import { VERWALTER_FREIGABE_KIND_LABELS } from "./verwalterEventTypes";

describe("verwalterEventTypes", () => {
  it("labels all freigabe kinds", () => {
    expect(VERWALTER_FREIGABE_KIND_LABELS.brief_entwurf).toBe("Brief-Entwurf");
    expect(VERWALTER_FREIGABE_KIND_LABELS.mail_entwurf).toBe("E-Mail-Entwurf");
    expect(VERWALTER_FREIGABE_KIND_LABELS.buchung_vorschlag).toBe("Buchungsvorschlag");
  });
});
