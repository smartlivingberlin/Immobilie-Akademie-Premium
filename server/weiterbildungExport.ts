import { Router } from "express";
import { jsPDF } from "jspdf";
import { requireAuth } from "./authMiddleware";
import { getDb } from "./db";
import { users } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import {
  aggregateWeiterbildungLogs,
  defaultWeiterbildungDateRange,
  WEITERBILDUNG_DISCLAIMER,
  type LearningLogRow,
  type WeiterbildungSummary,
} from "../shared/weiterbildung";
import { hasWeiterbildungsnachweisAccess } from "../shared/compliance";
import { getUserPortalFields } from "./accessExpiry";

export const weiterbildungExportRouter = Router();

async function assertWeiterbildungsnachweisAccess(userId: number): Promise<void> {
  const db = await getDb();
  const userRows = await db.select({
    role: users.role,
    enabledModules: users.enabledModules,
  }).from(users).where(eq(users.id, userId)).limit(1);
  const row = userRows[0];
  if (!row) throw new Error("Nutzer nicht gefunden");
  const portal = await getUserPortalFields(db, userId);
  if (!hasWeiterbildungsnachweisAccess({ ...row, ...portal })) {
    throw new Error("Weiterbildungsnachweis erfordert Modulzugang oder Compliance-Abo");
  }
}

async function loadUserReport(
  userId: number,
  startDate?: string,
  endDate?: string,
): Promise<{ user: { name: string; email: string }; summary: WeiterbildungSummary }> {
  const defaults = defaultWeiterbildungDateRange();
  const von = startDate || defaults.startDate;
  const bis = endDate || defaults.endDate;

  const db = await getDb();
  const userRows = await db.select({ name: users.name, email: users.email })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  const user = userRows[0];
  if (!user) throw new Error("Nutzer nicht gefunden");

  const [rawLogs] = await db.$client.query(
    `SELECT moduleId, dayId, openedAt, closedAt, durationSeconds, completed
     FROM learning_logs
     WHERE userId = ?
     ORDER BY openedAt ASC`,
    [userId],
  ) as unknown as [LearningLogRow[]];

  const logs = rawLogs || [];
  const summary = aggregateWeiterbildungLogs(logs, von, bis);
  return { user: { name: user.name || "Teilnehmer", email: user.email || "" }, summary };
}

function buildWeiterbildungPdf(
  user: { name: string; email: string },
  summary: WeiterbildungSummary,
): Buffer {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageW = 210;
  const margin = 18;
  let y = 20;

  const ensureSpace = (needed: number) => {
    if (y + needed > 275) {
      doc.addPage();
      y = 20;
    }
  };

  const line = (text: string, size = 10, bold = false, color: [number, number, number] = [30, 41, 59]) => {
    doc.setFontSize(size);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setTextColor(color[0], color[1], color[2]);
    const lines = doc.splitTextToSize(text, pageW - 2 * margin);
    ensureSpace(lines.length * (size * 0.42) + 2);
    doc.text(lines, margin, y);
    y += lines.length * (size * 0.42) + 2;
  };

  // Header
  doc.setFillColor(15, 39, 68);
  doc.rect(0, 0, pageW, 38, "F");
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("Weiterbildungsnachweis", margin, 14);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("Immobilien Akademie Smart · §34c GewO / §15b MaBV", margin, 22);
  doc.text("Erstellt: " + new Date().toLocaleString("de-DE"), margin, 30);
  y = 48;

  line("Teilnehmer", 11, true, [15, 39, 68]);
  line(`${user.name} · ${user.email}`, 10);
  line(`Berichtszeitraum: ${summary.zeitraum.von} bis ${summary.zeitraum.bis}`, 10);
  y += 2;

  line("Zusammenfassung", 11, true, [15, 39, 68]);
  line(
    `Nachgewiesene Lernzeit: ${summary.gesamtStunden} Zeitstunden (${summary.gesamtMinuten} Minuten) · ` +
    `${summary.gesamtSitzungen} Lerneinheiten · ${summary.aktiveTage} aktive Tage`,
    10,
  );
  line(
    `Gesetzliche Pflicht: ${summary.pflichtStunden} Zeitstunden in ${3} Kalenderjahren (§34c Abs. 2a GewO i.V.m. §15b MaBV)`,
    9,
  );

  const statusColor: [number, number, number] = summary.pflichtErfuellt ? [21, 128, 61] : [180, 83, 9];
  line(
    summary.pflichtErfuellt
      ? `✓ Mindestumfang im Berichtszeitraum erreicht (${summary.gesamtStunden}h ≥ ${summary.pflichtStunden}h)`
      : `○ Noch ${Math.max(0, Math.round((summary.pflichtStunden - summary.gesamtStunden) * 10) / 10)} Zeitstunden bis zur 20h-Pflicht`,
    10,
    true,
    statusColor,
  );
  y += 3;

  if (summary.moduleBreakdown.length > 0) {
    line("Modulübersicht", 11, true, [15, 39, 68]);
    for (const mod of summary.moduleBreakdown) {
      line(`• ${mod.label}: ${mod.stunden}h (${mod.sitzungen} Einheiten, ${mod.abgeschlossen} abgeschlossen)`, 9);
    }
    y += 2;
  }

  if (summary.tagesNachweis.length > 0) {
    line("Tagesnachweis (Lernzeitprotokoll)", 11, true, [15, 39, 68]);
    line("Datum        | Min | Std | Einheiten | Module", 8, true);
    for (const tag of summary.tagesNachweis) {
      line(
        `${tag.datum}  | ${String(tag.minuten).padStart(3)} | ${String(tag.stunden).padStart(4)} | ${tag.sitzungen}         | ${tag.module}`,
        8,
      );
    }
    y += 3;
  } else {
    line("Keine Lernaktivität im gewählten Zeitraum protokolliert.", 10, false, [100, 116, 139]);
    y += 3;
  }

  ensureSpace(30);
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, y, pageW - margin, y);
  y += 5;
  line("Rechtlicher Hinweis", 9, true, [100, 116, 139]);
  line(WEITERBILDUNG_DISCLAIMER, 7, false, [100, 116, 139]);

  line("Anbieter: Immobilien Akademie Smart · Alisad Gadyri · Durlacher Str. 36 · 10715 Berlin", 7, false, [100, 116, 139]);
  line("info@immobilien-akademie-smart.de · immobilien-akademie-smart.de", 7, false, [100, 116, 139]);

  return Buffer.from(doc.output("arraybuffer"));
}

weiterbildungExportRouter.get("/api/user/weiterbildungsnachweis", requireAuth, async (req: any, res) => {
  try {
    await assertWeiterbildungsnachweisAccess(req.currentUser.id);
    const { startDate, endDate } = req.query as { startDate?: string; endDate?: string };
    const report = await loadUserReport(req.currentUser.id, startDate, endDate);
    res.json({
      nutzer: report.user,
      ...report.summary,
      hinweis: WEITERBILDUNG_DISCLAIMER,
      erstelltAm: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("[Weiterbildungsnachweis] JSON error:", error);
    res.status(500).json({ error: error.message || "Bericht konnte nicht erstellt werden" });
  }
});

weiterbildungExportRouter.get("/api/user/weiterbildungsnachweis/pdf", requireAuth, async (req: any, res) => {
  try {
    await assertWeiterbildungsnachweisAccess(req.currentUser.id);
    const { startDate, endDate } = req.query as { startDate?: string; endDate?: string };
    const report = await loadUserReport(req.currentUser.id, startDate, endDate);
    const pdf = buildWeiterbildungPdf(report.user, report.summary);
    const filename = `Weiterbildungsnachweis_${report.summary.zeitraum.von}_${report.summary.zeitraum.bis}.pdf`;
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.send(pdf);
  } catch (error: any) {
    console.error("[Weiterbildungsnachweis] PDF error:", error);
    res.status(500).json({ error: error.message || "PDF konnte nicht generiert werden" });
  }
});
