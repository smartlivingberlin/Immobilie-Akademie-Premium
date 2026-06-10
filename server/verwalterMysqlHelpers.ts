export function tsToIso(v: Date | string | null | undefined): string {
  if (!v) return new Date().toISOString();
  if (typeof v === "string") return v.includes("T") ? v : `${v}T00:00:00.000Z`;
  return v.toISOString();
}

export function dateToYmd(v: Date | string | null | undefined): string | undefined {
  if (!v) return undefined;
  if (typeof v === "string") return v.slice(0, 10);
  return v.toISOString().slice(0, 10);
}

export function parseBetrag(v: string | number | null | undefined): number {
  if (typeof v === "number") return v;
  if (v == null) return 0;
  const n = parseFloat(String(v).replace(",", "."));
  return Number.isFinite(n) ? n : 0;
}
