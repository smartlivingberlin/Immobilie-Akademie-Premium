/** §15b MaBV / §34c Abs. 2a GewO — gesetzliche Weiterbildungspflicht */
export const MABV_PFlicht_STUNDEN = 20;
export const MABV_ZEITRAUM_JAHRE = 3;

export const MODULE_LABELS: Record<number, string> = {
  1: "Modul 1: Immobilien-Grundlagen",
  2: "Modul 2: Immobilienmakler §34c GewO",
  3: "Modul 3: WEG- und Mietverwaltung",
  4: "Modul 4: Wertermittlung & Gutachten",
  5: "Modul 5: Darlehensvermittlung §34i GewO",
};

export interface LearningLogRow {
  moduleId: number;
  dayId: number;
  openedAt: string | Date | null;
  closedAt?: string | Date | null;
  durationSeconds: number;
  completed: boolean | number;
}

export interface TagesNachweisEntry {
  datum: string;
  sitzungen: number;
  minuten: number;
  stunden: number;
  module: string;
  abgeschlossen: number;
}

export interface ModuleBreakdownEntry {
  moduleId: number;
  label: string;
  sitzungen: number;
  minuten: number;
  stunden: number;
  abgeschlossen: number;
}

export interface WeiterbildungSummary {
  zeitraum: { von: string; bis: string };
  gesamtSitzungen: number;
  gesamtMinuten: number;
  gesamtStunden: number;
  aktiveTage: number;
  abgeschlosseneEinheiten: number;
  pflichtStunden: number;
  pflichtErfuellt: boolean;
  fortschrittProzent: number;
  tagesNachweis: TagesNachweisEntry[];
  moduleBreakdown: ModuleBreakdownEntry[];
  sessions: Array<{
    datum: string;
    moduleId: number;
    dayId: number;
    minuten: number;
    abgeschlossen: boolean;
  }>;
}

export function defaultWeiterbildungDateRange(reference = new Date()): { startDate: string; endDate: string } {
  const end = new Date(reference);
  const start = new Date(reference);
  start.setFullYear(start.getFullYear() - MABV_ZEITRAUM_JAHRE);
  return {
    startDate: toDateString(start),
    endDate: toDateString(end),
  };
}

function toDateString(d: Date): string {
  return d.toISOString().split("T")[0];
}

function logDate(log: LearningLogRow): string | null {
  if (!log.openedAt) return null;
  return toDateString(new Date(log.openedAt));
}

export function aggregateWeiterbildungLogs(
  logs: LearningLogRow[],
  startDate: string,
  endDate: string,
): WeiterbildungSummary {
  const filtered = logs.filter((log) => {
    const tag = logDate(log);
    return tag !== null && tag >= startDate && tag <= endDate;
  });

  const tage: Record<string, { sitzungen: number; sekunden: number; module: Set<string>; abgeschlossen: number }> = {};
  const moduleStats: Record<number, { sekunden: number; sitzungen: number; abgeschlossen: number }> = {};

  let totalSeconds = 0;
  let abgeschlosseneEinheiten = 0;

  const sessions = filtered.map((log) => {
    const sekunden = log.durationSeconds || 0;
    totalSeconds += sekunden;
    const completed = Boolean(log.completed);
    if (completed) abgeschlosseneEinheiten++;

    const tag = logDate(log) || "unbekannt";
    if (!tage[tag]) {
      tage[tag] = { sitzungen: 0, sekunden: 0, module: new Set(), abgeschlossen: 0 };
    }
    tage[tag].sitzungen++;
    tage[tag].sekunden += sekunden;
    tage[tag].module.add(`M${log.moduleId} Tag ${log.dayId}`);
    if (completed) tage[tag].abgeschlossen++;

    if (!moduleStats[log.moduleId]) {
      moduleStats[log.moduleId] = { sekunden: 0, sitzungen: 0, abgeschlossen: 0 };
    }
    moduleStats[log.moduleId].sekunden += sekunden;
    moduleStats[log.moduleId].sitzungen++;
    if (completed) moduleStats[log.moduleId].abgeschlossen++;

    return {
      datum: tag,
      moduleId: log.moduleId,
      dayId: log.dayId,
      minuten: Math.round(sekunden / 60),
      abgeschlossen: completed,
    };
  });

  const gesamtMinuten = Math.round(totalSeconds / 60);
  const gesamtStunden = Math.round((totalSeconds / 3600) * 10) / 10;
  const fortschrittProzent = Math.min(100, Math.round((gesamtStunden / MABV_PFlicht_STUNDEN) * 100));

  const tagesNachweis: TagesNachweisEntry[] = Object.entries(tage)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([datum, t]) => ({
      datum,
      sitzungen: t.sitzungen,
      minuten: Math.round(t.sekunden / 60),
      stunden: Math.round((t.sekunden / 3600) * 10) / 10,
      module: Array.from(t.module).join(", "),
      abgeschlossen: t.abgeschlossen,
    }));

  const moduleBreakdown: ModuleBreakdownEntry[] = Object.entries(moduleStats)
    .map(([moduleId, stats]) => ({
      moduleId: Number(moduleId),
      label: MODULE_LABELS[Number(moduleId)] || `Modul ${moduleId}`,
      sitzungen: stats.sitzungen,
      minuten: Math.round(stats.sekunden / 60),
      stunden: Math.round((stats.sekunden / 3600) * 10) / 10,
      abgeschlossen: stats.abgeschlossen,
    }))
    .sort((a, b) => a.moduleId - b.moduleId);

  return {
    zeitraum: { von: startDate, bis: endDate },
    gesamtSitzungen: filtered.length,
    gesamtMinuten,
    gesamtStunden,
    aktiveTage: Object.keys(tage).length,
    abgeschlosseneEinheiten,
    pflichtStunden: MABV_PFlicht_STUNDEN,
    pflichtErfuellt: gesamtStunden >= MABV_PFlicht_STUNDEN,
    fortschrittProzent,
    tagesNachweis,
    moduleBreakdown,
    sessions,
  };
}

export const WEITERBILDUNG_DISCLAIMER =
  "Dieser Nachweis dokumentiert die auf immobilien-akademie-smart.de absolvierte Lernzeit " +
  "auf Basis serverseitig protokollierter Lerneinheiten. Er dient als Grundlage für Ihre " +
  "eigene Dokumentation gegenüber Aufsichtsbehörden oder Auftraggebern. Die Anerkennung im " +
  "Einzelfall obliegt dem Nachweisenden gemäß § 15b Abs. 1 Satz 4 MaBV. Dieses Dokument " +
  "ersetzt keine behördliche Erlaubnis und keine IHK-Zertifizierung.";
