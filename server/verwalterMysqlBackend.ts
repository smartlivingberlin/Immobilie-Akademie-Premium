import { and, eq, sql } from "drizzle-orm";
import {
  verwalterBuchungen,
  verwalterObjekte,
  verwalterVorgaenge,
} from "../drizzle/schema";
import type { BuchungInput, VerwalterBuchung } from "../shared/verwalterBuchungTypes";
import { periodeFromDatum, validateBuchungInput } from "../shared/verwalterBuchungTypes";
import type { VerwalterEinheit, VerwalterObjekt } from "../shared/verwalterObjektTypes";
import {
  isVorgangOverdue,
  type VerwalterVorgang,
  type VorgangStatus,
  type VorgangTyp,
} from "../shared/verwalterVorgangTypes";
import { dateToYmd, parseBetrag, tsToIso } from "./verwalterMysqlHelpers";

async function db() {
  const { getDb } = await import("./db");
  const conn = await getDb();
  if (!conn) throw new Error("MySQL nicht verfügbar");
  return conn;
}

function parseEinheiten(json: string): VerwalterEinheit[] {
  try {
    const arr = JSON.parse(json) as VerwalterEinheit[];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function rowToObjekt(row: typeof verwalterObjekte.$inferSelect): VerwalterObjekt {
  return {
    id: row.id,
    name: row.name,
    adresse: row.adresse,
    plz: row.plz,
    ort: row.ort,
    einheitenAnzahl: row.einheitenAnzahl,
    verwalterName: row.verwalterName,
    verwalterAdresse: row.verwalterAdresse,
    kontaktEmail: row.kontaktEmail ?? undefined,
    kontaktTelefon: row.kontaktTelefon ?? undefined,
    notizen: row.notizen ?? undefined,
    einheiten: parseEinheiten(row.einheitenJson),
    createdAt: tsToIso(row.createdAt),
    updatedAt: tsToIso(row.updatedAt),
  };
}

function rowToVorgang(row: typeof verwalterVorgaenge.$inferSelect): VerwalterVorgang {
  return {
    id: row.id,
    objektId: row.objektId,
    objektName: row.objektName,
    typ: row.typ as VorgangTyp,
    titel: row.titel,
    beschreibung: row.beschreibung ?? undefined,
    status: row.status as VorgangStatus,
    faelligAm: row.faelligAm ?? undefined,
    relatedVorlageSlug: row.relatedVorlageSlug ?? undefined,
    createdAt: tsToIso(row.createdAt),
    updatedAt: tsToIso(row.updatedAt),
  };
}

function rowToBuchung(row: typeof verwalterBuchungen.$inferSelect): VerwalterBuchung {
  return {
    id: row.id,
    objektId: row.objektId,
    objektName: row.objektName,
    datum: dateToYmd(row.datum) ?? row.datum,
    betrag: parseBetrag(row.betrag),
    sollKonto: row.sollKonto,
    habenKonto: row.habenKonto,
    buchungstext: row.buchungstext,
    belegNr: row.belegNr ?? undefined,
    einheitId: row.einheitId ?? undefined,
    einheitNr: row.einheitNr ?? undefined,
    periode: row.periode,
    createdAt: tsToIso(row.createdAt),
    updatedAt: tsToIso(row.updatedAt),
  };
}

// ── Import helpers ───────────────────────────────────────────

export async function countObjekteForUser(userId: number): Promise<number> {
  const conn = await db();
  const rows = await conn
    .select({ c: sql<number>`count(*)` })
    .from(verwalterObjekte)
    .where(eq(verwalterObjekte.userId, userId));
  return Number(rows[0]?.c ?? 0);
}

export async function insertObjekteFromFile(userId: number, objekte: VerwalterObjekt[]): Promise<void> {
  const conn = await db();
  if (objekte.length === 0) return;
  await conn.insert(verwalterObjekte).values(
    objekte.map((o) => ({
      id: o.id,
      userId,
      name: o.name,
      adresse: o.adresse,
      plz: o.plz,
      ort: o.ort,
      einheitenAnzahl: o.einheitenAnzahl,
      verwalterName: o.verwalterName,
      verwalterAdresse: o.verwalterAdresse,
      kontaktEmail: o.kontaktEmail ?? null,
      kontaktTelefon: o.kontaktTelefon ?? null,
      notizen: o.notizen ?? null,
      einheitenJson: JSON.stringify(o.einheiten ?? []),
      createdAt: new Date(o.createdAt),
      updatedAt: new Date(o.updatedAt),
    })),
  );
}

export async function insertVorgaengeFromFile(userId: number, vorgaenge: VerwalterVorgang[]): Promise<void> {
  const conn = await db();
  if (vorgaenge.length === 0) return;
  await conn.insert(verwalterVorgaenge).values(
    vorgaenge.map((v) => ({
      id: v.id,
      userId,
      objektId: v.objektId,
      objektName: v.objektName,
      typ: v.typ,
      titel: v.titel,
      beschreibung: v.beschreibung ?? null,
      status: v.status,
      faelligAm: v.faelligAm ?? null,
      relatedVorlageSlug: v.relatedVorlageSlug ?? null,
      createdAt: new Date(v.createdAt),
      updatedAt: new Date(v.updatedAt),
    })),
  );
}

export async function insertBuchungenFromFile(userId: number, buchungen: VerwalterBuchung[]): Promise<void> {
  const conn = await db();
  if (buchungen.length === 0) return;
  await conn.insert(verwalterBuchungen).values(
    buchungen.map((b) => ({
      id: b.id,
      userId,
      objektId: b.objektId,
      objektName: b.objektName,
      datum: b.datum,
      betrag: b.betrag.toFixed(2),
      sollKonto: b.sollKonto,
      habenKonto: b.habenKonto,
      buchungstext: b.buchungstext,
      belegNr: b.belegNr ?? null,
      einheitId: b.einheitId ?? null,
      einheitNr: b.einheitNr ?? null,
      periode: b.periode,
      createdAt: new Date(b.createdAt),
      updatedAt: new Date(b.updatedAt),
    })),
  );
}

// ── Objekte ──────────────────────────────────────────────────

export async function listObjekteMysql(userId: number): Promise<VerwalterObjekt[]> {
  const conn = await db();
  const rows = await conn.select().from(verwalterObjekte).where(eq(verwalterObjekte.userId, userId));
  return rows.map(rowToObjekt).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function getObjektMysql(userId: number, id: string): Promise<VerwalterObjekt | null> {
  const conn = await db();
  const rows = await conn
    .select()
    .from(verwalterObjekte)
    .where(and(eq(verwalterObjekte.userId, userId), eq(verwalterObjekte.id, id)))
    .limit(1);
  return rows[0] ? rowToObjekt(rows[0]) : null;
}

export async function createObjektMysql(
  userId: number,
  input: Omit<VerwalterObjekt, "id" | "createdAt" | "updatedAt" | "einheiten"> & {
    einheiten?: VerwalterEinheit[];
  },
  id: string,
): Promise<VerwalterObjekt> {
  const now = new Date();
  const conn = await db();
  await conn.insert(verwalterObjekte).values({
    id,
    userId,
    name: input.name,
    adresse: input.adresse,
    plz: input.plz,
    ort: input.ort,
    einheitenAnzahl: input.einheitenAnzahl,
    verwalterName: input.verwalterName,
    verwalterAdresse: input.verwalterAdresse,
    kontaktEmail: input.kontaktEmail ?? null,
    kontaktTelefon: input.kontaktTelefon ?? null,
    notizen: input.notizen ?? null,
    einheitenJson: JSON.stringify(input.einheiten ?? []),
    createdAt: now,
    updatedAt: now,
  });
  const created = await getObjektMysql(userId, id);
  if (!created) throw new Error("Objekt konnte nicht gespeichert werden");
  return created;
}

export async function updateObjektMysql(
  userId: number,
  id: string,
  patch: Partial<Omit<VerwalterObjekt, "id" | "createdAt">>,
): Promise<VerwalterObjekt | null> {
  const existing = await getObjektMysql(userId, id);
  if (!existing) return null;

  const merged = { ...existing, ...patch, updatedAt: new Date().toISOString() };
  const conn = await db();
  await conn
    .update(verwalterObjekte)
    .set({
      name: merged.name,
      adresse: merged.adresse,
      plz: merged.plz,
      ort: merged.ort,
      einheitenAnzahl: merged.einheitenAnzahl,
      verwalterName: merged.verwalterName,
      verwalterAdresse: merged.verwalterAdresse,
      kontaktEmail: merged.kontaktEmail ?? null,
      kontaktTelefon: merged.kontaktTelefon ?? null,
      notizen: merged.notizen ?? null,
      einheitenJson: JSON.stringify(merged.einheiten ?? []),
      updatedAt: new Date(),
    })
    .where(and(eq(verwalterObjekte.userId, userId), eq(verwalterObjekte.id, id)));

  return getObjektMysql(userId, id);
}

export async function deleteObjektMysql(userId: number, id: string): Promise<boolean> {
  const existing = await getObjektMysql(userId, id);
  if (!existing) return false;
  const conn = await db();
  await conn
    .delete(verwalterObjekte)
    .where(and(eq(verwalterObjekte.userId, userId), eq(verwalterObjekte.id, id)));
  return true;
}

// ── Vorgänge ─────────────────────────────────────────────────

export async function listVorgaengeMysql(userId: number, objektId?: string): Promise<VerwalterVorgang[]> {
  const conn = await db();
  const rows = await conn.select().from(verwalterVorgaenge).where(eq(verwalterVorgaenge.userId, userId));
  let list = rows.map(rowToVorgang);
  if (objektId) list = list.filter((v) => v.objektId === objektId);
  return list.sort((a, b) => {
    const da = a.faelligAm || a.updatedAt;
    const db = b.faelligAm || b.updatedAt;
    return da.localeCompare(db);
  });
}

export async function getVorgangMysql(userId: number, id: string): Promise<VerwalterVorgang | null> {
  const conn = await db();
  const rows = await conn
    .select()
    .from(verwalterVorgaenge)
    .where(and(eq(verwalterVorgaenge.userId, userId), eq(verwalterVorgaenge.id, id)))
    .limit(1);
  return rows[0] ? rowToVorgang(rows[0]) : null;
}

export async function createVorgangMysql(
  userId: number,
  input: {
    objektId: string;
    objektName: string;
    typ: VorgangTyp;
    titel: string;
    beschreibung?: string;
    status?: VorgangStatus;
    faelligAm?: string;
    relatedVorlageSlug?: string;
  },
  id: string,
): Promise<VerwalterVorgang> {
  const now = new Date();
  const conn = await db();
  await conn.insert(verwalterVorgaenge).values({
    id,
    userId,
    objektId: input.objektId,
    objektName: input.objektName,
    typ: input.typ,
    titel: input.titel.trim(),
    beschreibung: input.beschreibung?.trim() ?? null,
    status: input.status ?? "offen",
    faelligAm: input.faelligAm ?? null,
    relatedVorlageSlug: input.relatedVorlageSlug ?? null,
    createdAt: now,
    updatedAt: now,
  });
  const created = await getVorgangMysql(userId, id);
  if (!created) throw new Error("Vorgang konnte nicht gespeichert werden");
  return created;
}

export async function updateVorgangMysql(
  userId: number,
  id: string,
  patch: Partial<Omit<VerwalterVorgang, "id" | "createdAt">>,
): Promise<VerwalterVorgang | null> {
  const existing = await getVorgangMysql(userId, id);
  if (!existing) return null;
  const merged = { ...existing, ...patch, updatedAt: new Date().toISOString() };
  const conn = await db();
  await conn
    .update(verwalterVorgaenge)
    .set({
      objektId: merged.objektId,
      objektName: merged.objektName,
      typ: merged.typ,
      titel: merged.titel,
      beschreibung: merged.beschreibung ?? null,
      status: merged.status,
      faelligAm: merged.faelligAm ?? null,
      relatedVorlageSlug: merged.relatedVorlageSlug ?? null,
      updatedAt: new Date(),
    })
    .where(and(eq(verwalterVorgaenge.userId, userId), eq(verwalterVorgaenge.id, id)));
  return getVorgangMysql(userId, id);
}

export async function deleteVorgangMysql(userId: number, id: string): Promise<boolean> {
  const existing = await getVorgangMysql(userId, id);
  if (!existing) return false;
  const conn = await db();
  await conn
    .delete(verwalterVorgaenge)
    .where(and(eq(verwalterVorgaenge.userId, userId), eq(verwalterVorgaenge.id, id)));
  return true;
}

export async function deleteVorgaengeByObjektMysql(userId: number, objektId: string): Promise<number> {
  const before = await listVorgaengeMysql(userId, objektId);
  if (before.length === 0) return 0;
  const conn = await db();
  await conn
    .delete(verwalterVorgaenge)
    .where(and(eq(verwalterVorgaenge.userId, userId), eq(verwalterVorgaenge.objektId, objektId)));
  return before.length;
}

export async function countOpenVorgaengeMysql(userId: number): Promise<number> {
  const list = await listVorgaengeMysql(userId);
  return list.filter((v) => v.status !== "erledigt").length;
}

export async function countOverdueVorgaengeMysql(userId: number): Promise<number> {
  const list = await listVorgaengeMysql(userId);
  return list.filter((v) => isVorgangOverdue(v)).length;
}

// ── Buchungen ────────────────────────────────────────────────

export async function listBuchungenMysql(
  userId: number,
  opts?: { objektId?: string; periode?: string },
): Promise<VerwalterBuchung[]> {
  const conn = await db();
  const rows = await conn.select().from(verwalterBuchungen).where(eq(verwalterBuchungen.userId, userId));
  let list = rows.map(rowToBuchung);
  if (opts?.objektId) list = list.filter((b) => b.objektId === opts.objektId);
  if (opts?.periode) list = list.filter((b) => b.periode === opts.periode);
  return list.sort((a, b) => b.datum.localeCompare(a.datum) || b.createdAt.localeCompare(a.createdAt));
}

export async function getBuchungMysql(userId: number, id: string): Promise<VerwalterBuchung | null> {
  const conn = await db();
  const rows = await conn
    .select()
    .from(verwalterBuchungen)
    .where(and(eq(verwalterBuchungen.userId, userId), eq(verwalterBuchungen.id, id)))
    .limit(1);
  return rows[0] ? rowToBuchung(rows[0]) : null;
}

export async function createBuchungMysql(
  userId: number,
  input: BuchungInput & { objektName: string; einheitNr?: string },
  id: string,
): Promise<VerwalterBuchung> {
  const periode = input.periode || periodeFromDatum(input.datum);
  const err = validateBuchungInput({ ...input, periode });
  if (err) throw new Error(err);

  const now = new Date();
  const conn = await db();
  await conn.insert(verwalterBuchungen).values({
    id,
    userId,
    objektId: input.objektId,
    objektName: input.objektName,
    datum: input.datum,
    betrag: (Math.round(input.betrag * 100) / 100).toFixed(2),
    sollKonto: input.sollKonto.trim(),
    habenKonto: input.habenKonto.trim(),
    buchungstext: input.buchungstext.trim(),
    belegNr: input.belegNr?.trim() || null,
    einheitId: input.einheitId || null,
    einheitNr: input.einheitNr ?? null,
    periode,
    createdAt: now,
    updatedAt: now,
  });
  const created = await getBuchungMysql(userId, id);
  if (!created) throw new Error("Buchung konnte nicht gespeichert werden");
  return created;
}

export async function updateBuchungMysql(
  userId: number,
  id: string,
  patch: Partial<BuchungInput>,
): Promise<VerwalterBuchung | null> {
  const current = await getBuchungMysql(userId, id);
  if (!current) return null;

  const merged: BuchungInput = {
    objektId: current.objektId,
    datum: patch.datum ?? current.datum,
    betrag: patch.betrag ?? current.betrag,
    sollKonto: patch.sollKonto ?? current.sollKonto,
    habenKonto: patch.habenKonto ?? current.habenKonto,
    buchungstext: patch.buchungstext ?? current.buchungstext,
    belegNr: patch.belegNr ?? current.belegNr,
    einheitId: patch.einheitId ?? current.einheitId,
    periode: patch.periode ?? periodeFromDatum(patch.datum ?? current.datum),
  };
  const err = validateBuchungInput(merged);
  if (err) throw new Error(err);

  const conn = await db();
  await conn
    .update(verwalterBuchungen)
    .set({
      datum: merged.datum!,
      betrag: (Math.round(merged.betrag * 100) / 100).toFixed(2),
      sollKonto: merged.sollKonto.trim(),
      habenKonto: merged.habenKonto.trim(),
      buchungstext: merged.buchungstext.trim(),
      belegNr: merged.belegNr?.trim() || null,
      einheitId: merged.einheitId || null,
      periode: merged.periode!,
      updatedAt: new Date(),
    })
    .where(and(eq(verwalterBuchungen.userId, userId), eq(verwalterBuchungen.id, id)));

  return getBuchungMysql(userId, id);
}

export async function deleteBuchungMysql(userId: number, id: string): Promise<boolean> {
  const existing = await getBuchungMysql(userId, id);
  if (!existing) return false;
  const conn = await db();
  await conn
    .delete(verwalterBuchungen)
    .where(and(eq(verwalterBuchungen.userId, userId), eq(verwalterBuchungen.id, id)));
  return true;
}

export async function deleteBuchungenByObjektMysql(userId: number, objektId: string): Promise<number> {
  const before = await listBuchungenMysql(userId, { objektId });
  if (before.length === 0) return 0;
  const conn = await db();
  await conn
    .delete(verwalterBuchungen)
    .where(and(eq(verwalterBuchungen.userId, userId), eq(verwalterBuchungen.objektId, objektId)));
  return before.length;
}
