import { Router } from "express";
import { requireAuth } from "./authMiddleware";
import { jsPDF } from "jspdf";
import { getDb } from "./db";
import { users } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const certificateExportRouter = Router();

const MODULE_NAMES: Record<number, string> = {
  1: "Modul 1: Einführung & Grundlagen",
  2: "Modul 2: Maklerrecht & §34c GewO",
  3: "Modul 3: Verwaltung (WEG & Miet)",
  4: "Modul 4: Wertermittlung & Gutachten",
  5: "Modul 5: Finanzierung & §34i",
};

certificateExportRouter.get("/api/certificate/:moduleId", requireAuth, async (req: any, res: any) => {
  const moduleId = parseInt(req.params.moduleId);
  const userId = req.currentUser.id;

  if (isNaN(moduleId) || !MODULE_NAMES[moduleId]) {
    return res.status(400).json({ error: "Ungültiges Modul" });
  }

  try {
    const db = await getDb();
    const result = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    const user = result[0];

    if (!user) {
      return res.status(404).json({ error: "Nutzer nicht gefunden" });
    }

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Background
    doc.setFillColor(245, 247, 250);
    doc.rect(0, 0, pageWidth, pageHeight, "F");

    // Border
    doc.setDrawColor(37, 99, 235);
    doc.setLineWidth(2);
    doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

    // Header
    doc.setFontSize(32);
    doc.setTextColor(15, 23, 42);
    doc.setFont("helvetica", "bold");
    doc.text("TEILNAHMEBESTÄTIGUNG", pageWidth / 2, 40, { align: "center" });

    doc.setFontSize(14);
    doc.setTextColor(71, 85, 105);
    doc.setFont("helvetica", "normal");
    doc.text("Immobilien Akademie Smart", pageWidth / 2, 50, { align: "center" });

    // Main Content
    doc.setFontSize(16);
    doc.setTextColor(51, 65, 85);
    doc.text("Hiermit wird bestätigt, dass", pageWidth / 2, 75, { align: "center" });

    doc.setFontSize(24);
    doc.setTextColor(37, 99, 235);
    doc.setFont("helvetica", "bold");
    doc.text(user.name || "Teilnehmer", pageWidth / 2, 90, { align: "center" });

    doc.setFontSize(16);
    doc.setTextColor(51, 65, 85);
    doc.setFont("helvetica", "normal");
    doc.text("erfolgreich am folgenden Modul teilgenommen hat:", pageWidth / 2, 105, { align: "center" });

    doc.setFontSize(20);
    doc.setTextColor(37, 99, 235);
    doc.setFont("helvetica", "bold");
    doc.text(MODULE_NAMES[moduleId], pageWidth / 2, 120, { align: "center" });

    // Footer
    const dateStr = new Date().toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    doc.setFontSize(12);
    doc.setTextColor(100, 116, 139);
    doc.setFont("helvetica", "normal");
    doc.text(`Ausgestellt am: ${dateStr}`, pageWidth / 2, 175, { align: "center" });

    const disclaimerText = "Diese Bescheinigung dokumentiert die Bearbeitung portalinterner Lerneinheiten auf immobilien-akademie-smart.de. Sie ist kein behördlicher, IHK- oder prüfungsrechtlicher Nachweis.";
    doc.setFontSize(8);
    const splitDisclaimer = doc.splitTextToSize(disclaimerText, pageWidth - 40);
    doc.text(splitDisclaimer, pageWidth / 2, pageHeight - 20, { align: "center" });

    const pdfBuffer = Buffer.from(doc.output("arraybuffer"));
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="Teilnahmebestaetigung_Modul${moduleId}.pdf"`);
    res.send(pdfBuffer);
  } catch (error) {
    console.error("[CertificateExport] Error:", error);
    res.status(500).json({ error: "PDF konnte nicht generiert werden" });
  }
});
