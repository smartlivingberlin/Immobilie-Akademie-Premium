import { describe, expect, it, afterEach } from "vitest";
import { existsSync, rmSync } from "fs";
import { join } from "path";
import {
  createBuchung,
  deleteBuchung,
  deleteBuchungenByObjekt,
  listBuchungen,
  updateBuchung,
} from "./verwalterBuchungStore";

const TEST_USER = 999003;
const userFile = join(process.cwd(), "data", "verwalter-buchungen", `user-${TEST_USER}.json`);

describe("verwalterBuchungStore", () => {
  afterEach(() => {
    if (existsSync(userFile)) rmSync(userFile);
  });

  it("erstellt und filtert Buchungen", async () => {
    const b = await createBuchung(TEST_USER, {
      objektId: "obj-1",
      objektName: "WEG A",
      datum: "2026-01-15",
      betrag: 250,
      sollKonto: "1200",
      habenKonto: "8400",
      buchungstext: "Hausgeld WE 1",
    });
    expect(b.periode).toBe("2026-01");
    expect(await listBuchungen(TEST_USER, { objektId: "obj-1", periode: "2026-01" })).toHaveLength(1);
    expect(await listBuchungen(TEST_USER, { periode: "2026-02" })).toHaveLength(0);
  });

  it("aktualisiert und löscht", async () => {
    const b = await createBuchung(TEST_USER, {
      objektId: "obj-1",
      objektName: "WEG A",
      datum: "2026-02-01",
      betrag: 100,
      sollKonto: "1200",
      habenKonto: "8400",
      buchungstext: "Test",
    });
    await updateBuchung(TEST_USER, b.id, { betrag: 150 });
    expect((await listBuchungen(TEST_USER))[0].betrag).toBe(150);
    expect(await deleteBuchung(TEST_USER, b.id)).toBe(true);
    expect(await listBuchungen(TEST_USER)).toHaveLength(0);
  });

  it("kaskadiert Löschen nach Objekt", async () => {
    await createBuchung(TEST_USER, {
      objektId: "del-obj",
      objektName: "X",
      datum: "2026-03-01",
      betrag: 50,
      sollKonto: "1200",
      habenKonto: "8400",
      buchungstext: "A",
    });
    expect(await deleteBuchungenByObjekt(TEST_USER, "del-obj")).toBe(1);
  });
});
