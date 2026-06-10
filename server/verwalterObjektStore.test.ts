import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { existsSync, rmSync } from "fs";
import { join } from "path";
import {
  createObjekt,
  deleteObjekt,
  getObjekt,
  listObjekte,
  updateObjekt,
} from "./verwalterObjektStore";

const TEST_USER = 999001;
const userFile = join(process.cwd(), "data", "verwalter-objekte", `user-${TEST_USER}.json`);

describe("verwalterObjektStore", () => {
  afterEach(() => {
    if (existsSync(userFile)) rmSync(userFile);
  });

  it("erstellt und listet Objekte", () => {
    const obj = createObjekt(TEST_USER, {
      name: "WEG Teststraße",
      adresse: "Test 1",
      plz: "10115",
      ort: "Berlin",
      einheitenAnzahl: 8,
      verwalterName: "Verwaltung GmbH",
      verwalterAdresse: "Berlin",
    });
    expect(obj.id).toBeTruthy();
    expect(listObjekte(TEST_USER)).toHaveLength(1);
    expect(getObjekt(TEST_USER, obj.id)?.name).toBe("WEG Teststraße");
  });

  it("aktualisiert und löscht", () => {
    const obj = createObjekt(TEST_USER, {
      name: "WEG A",
      adresse: "A",
      plz: "1",
      ort: "B",
      einheitenAnzahl: 1,
      verwalterName: "V",
      verwalterAdresse: "V",
    });
    updateObjekt(TEST_USER, obj.id, { name: "WEG B" });
    expect(getObjekt(TEST_USER, obj.id)?.name).toBe("WEG B");
    expect(deleteObjekt(TEST_USER, obj.id)).toBe(true);
    expect(listObjekte(TEST_USER)).toHaveLength(0);
  });
});
