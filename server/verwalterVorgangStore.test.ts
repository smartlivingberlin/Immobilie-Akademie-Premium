import { describe, expect, it, afterEach } from "vitest";
import { existsSync, rmSync } from "fs";
import { join } from "path";
import {
  countOpenVorgaenge,
  countOverdueVorgaenge,
  createVorgang,
  deleteVorgang,
  deleteVorgaengeByObjekt,
  getVorgang,
  listVorgaenge,
  updateVorgang,
} from "./verwalterVorgangStore";

const TEST_USER = 999002;
const userFile = join(process.cwd(), "data", "verwalter-vorgaenge", `user-${TEST_USER}.json`);

describe("verwalterVorgangStore", () => {
  afterEach(() => {
    if (existsSync(userFile)) rmSync(userFile);
  });

  it("erstellt, listet und filtert nach Objekt", async () => {
    const v = await createVorgang(TEST_USER, {
      objektId: "obj-1",
      objektName: "WEG A",
      typ: "mahnung",
      titel: "Mahnung Stufe 1",
      faelligAm: "2030-01-01",
    });
    expect(v.id).toBeTruthy();
    expect(await listVorgaenge(TEST_USER)).toHaveLength(1);
    expect(await listVorgaenge(TEST_USER, "obj-1")).toHaveLength(1);
    expect(await listVorgaenge(TEST_USER, "other")).toHaveLength(0);
  });

  it("aktualisiert Status und zählt offen/überfällig", async () => {
    const v = await createVorgang(TEST_USER, {
      objektId: "obj-1",
      objektName: "WEG A",
      typ: "etv",
      titel: "ETV 2026",
      faelligAm: "2020-01-01",
    });
    expect(await countOpenVorgaenge(TEST_USER)).toBe(1);
    expect(await countOverdueVorgaenge(TEST_USER)).toBe(1);

    await updateVorgang(TEST_USER, v.id, { status: "erledigt" });
    expect((await getVorgang(TEST_USER, v.id))?.status).toBe("erledigt");
    expect(await countOpenVorgaenge(TEST_USER)).toBe(0);
    expect(await countOverdueVorgaenge(TEST_USER)).toBe(0);
  });

  it("löscht einzeln und kaskadiert nach Objekt", async () => {
    await createVorgang(TEST_USER, {
      objektId: "obj-del",
      objektName: "WEG Del",
      typ: "schaden",
      titel: "Wasserschaden",
    });
    await createVorgang(TEST_USER, {
      objektId: "obj-del",
      objektName: "WEG Del",
      typ: "nk",
      titel: "NK 2025",
    });
    expect(await deleteVorgaengeByObjekt(TEST_USER, "obj-del")).toBe(2);
    expect(await listVorgaenge(TEST_USER)).toHaveLength(0);

    const v = await createVorgang(TEST_USER, {
      objektId: "x",
      objektName: "X",
      typ: "sonstiges",
      titel: "Test",
    });
    expect(await deleteVorgang(TEST_USER, v.id)).toBe(true);
    expect(await listVorgaenge(TEST_USER)).toHaveLength(0);
  });
});
