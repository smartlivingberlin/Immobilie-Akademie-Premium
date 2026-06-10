/** Fristen-Checkliste — alle Vorgänge auf einmal anlegen (Terminal + API). */

import { FRISTEN_CHECKLISTE, type FristItem } from "./verwalterFristen";
import { fristToVorgangInput } from "./verwalterFristVorgang";

export function resolveFristBatchItems(fristIds?: string[]): FristItem[] {
  if (!fristIds?.length) return FRISTEN_CHECKLISTE;
  const set = new Set(fristIds);
  return FRISTEN_CHECKLISTE.filter((f) => set.has(f.id));
}

export function buildFristBatchVorgaenge(
  objektId: string,
  startDate: string,
  fristIds?: string[],
): ReturnType<typeof fristToVorgangInput>[] {
  return resolveFristBatchItems(fristIds).map((frist) =>
    fristToVorgangInput(frist, { objektId, startDate }),
  );
}
