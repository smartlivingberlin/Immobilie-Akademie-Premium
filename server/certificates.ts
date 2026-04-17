import { jsPDF } from "jspdf";
import { getDb } from "./db";
import { certificates, examSessions, users } from "../drizzle/schema";
import { storagePut } from "./storage";
import { eq, and } from "drizzle-orm";
import { nanoid } from "nanoid";

/**
 * Module names mapping
 */
const MODULE_NAMES: Record<number, string> = {
  1: "Modul 1: Einführung & Grundlagen",
  2: "Modul 2: Maklerrecht & §34c GewO",
  3: "Modul 3: Verwaltung (WEG & Miet)",
  4: "Modul 4: Wertermittlung & Gutachten",
  5: "Modul 5: Finanzierung & §34i",
};

/**
 * Generate a professional PDF certificate for a passed exam
 */
export async function generateCertificatePDF(
  userName: string,
  moduleId: number,
  moduleName: string,
  score: number,
  totalQuestions: number,
  correctAnswers: number,
  completedAt: Date,
  options?: {
    azavEnabled?: boolean;
    azavLicenseNumber?: string;
    measureLicenseNumber?: string;
    certificateType?: "participation" | "exam"; // Typ A = Teilnahme, Typ B = Abschluss
  }
): Promise<{ pdfUrl: string; pdfKey: string }> {
  const azavEnabled = options?.azavEnabled ?? false;
  const certType = options?.certificateType ?? "exam";
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Background color
  doc.setFillColor(245, 247, 250);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // Border
  doc.setDrawColor(37, 99, 235);
  doc.setLineWidth(2);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

  // Inner border
  doc.setDrawColor(59, 130, 246);
  doc.setLineWidth(0.5);
  doc.rect(15, 15, pageWidth - 30, pageHeight - 30);

  // Title
  doc.setFontSize(32);
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.text("ZERTIFIKAT", pageWidth / 2, 40, { align: "center" });

  // Subtitle
  doc.setFontSize(14);
  doc.setTextColor(71, 85, 105);
  doc.setFont("helvetica", "normal");
  doc.text("Immobilien Akademie Smart", pageWidth / 2, 50, { align: "center" });

  // Divider line
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.line(40, 60, pageWidth - 40, 60);

  // Main text
  doc.setFontSize(16);
  doc.setTextColor(51, 65, 85);
  doc.setFont("helvetica", "normal");
  doc.text("Hiermit wird bescheinigt, dass", pageWidth / 2, 75, { align: "center" });

  // User name (highlighted)
  doc.setFontSize(24);
  doc.setTextColor(37, 99, 235);
  doc.setFont("helvetica", "bold");
  doc.text(userName, pageWidth / 2, 90, { align: "center" });

  // Achievement text
  doc.setFontSize(16);
  doc.setTextColor(51, 65, 85);
  doc.setFont("helvetica", "normal");
  doc.text("die Prüfung erfolgreich bestanden hat:", pageWidth / 2, 105, { align: "center" });

  // Module name (highlighted)
  doc.setFontSize(20);
  doc.setTextColor(37, 99, 235);
  doc.setFont("helvetica", "bold");
  doc.text(moduleName, pageWidth / 2, 120, { align: "center" });

  // Score box
  const boxX = pageWidth / 2 - 40;
  const boxY = 135;
  doc.setFillColor(239, 246, 255);
  doc.setDrawColor(191, 219, 254);
  doc.roundedRect(boxX, boxY, 80, 25, 3, 3, "FD");

  doc.setFontSize(14);
  doc.setTextColor(30, 64, 175);
  doc.setFont("helvetica", "bold");
  doc.text(`Ergebnis: ${score}%`, pageWidth / 2, boxY + 10, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text(`${correctAnswers} von ${totalQuestions} Fragen korrekt`, pageWidth / 2, boxY + 18, { align: "center" });

  // Date
  doc.setFontSize(12);
  doc.setTextColor(100, 116, 139);
  doc.setFont("helvetica", "normal");
  const dateStr = completedAt.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  doc.text(`Ausgestellt am: ${dateStr}`, pageWidth / 2, 175, { align: "center" });

  // Disclaimer (Pflicht auf JEDEM Zertifikat laut Protokoll Abschnitt 4.5)
  const disclaimerText =
    certType === "participation"
      ? `Typ A – Teilnahmebescheinigung: Diese Bescheinigung bestätigt die erfolgreiche Bearbeitung der Lerneinheiten auf immobilien-akademie-smart.de zur Vorbereitung auf die Sachkundeprüfung nach §34c/§34i/§26a. Sie ersetzt nicht die offizielle IHK-Prüfung. Ausgestellt von: Alisad Gadyri, IHK-Immobilienkaufmann (Berlin, 2023).`
      : `Typ B – Abschlusszertifikat: Diese Bescheinigung bestätigt den erfolgreichen Abschluss der Prüfungssimulation auf immobilien-akademie-smart.de (≥70%). Sie ersetzt nicht die offizielle IHK-Prüfung. Ausgestellt von: Alisad Gadyri, IHK-Immobilienkaufmann (Berlin, 2023).`;

  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  const splitDisclaimer = doc.splitTextToSize(disclaimerText, pageWidth - 40);
  doc.text(splitDisclaimer, pageWidth / 2, pageHeight - 25, { align: "center" });

  // Footer: AZAV nur wenn explizit aktiviert (azavEnabled = false per Standard)
  if (azavEnabled && options?.azavLicenseNumber) {
    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `Trägerzulassung: ${options.azavLicenseNumber}${options.measureLicenseNumber ? ` | Maßnahmezulassung: ${options.measureLicenseNumber}` : ""}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: "center" }
    );
  }

  // Convert to buffer
  const pdfBuffer = Buffer.from(doc.output("arraybuffer"));

  // Generate unique key
  const pdfKey = `certificates/module-${moduleId}/${nanoid()}.pdf`;

  // Upload to S3
  const pdfUrl = await storagePut(pdfKey, pdfBuffer, "application/pdf");

  return { pdfUrl, pdfKey };
}

/**
 * Create certificate record in database after successful exam
 */
export async function createCertificate(
  userId: number,
  examSessionId: number
): Promise<{ certificateId: number; pdfUrl: string } | null> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  // Get exam session details
  const [examSession] = await db
    .select()
    .from(examSessions)
    .where(eq(examSessions.id, examSessionId))
    .limit(1);

  if (!examSession) {
    throw new Error("Exam session not found");
  }

  // Check if score is >= 70%
  if (examSession.score < 70) {
    return null; // Not passed
  }

  // Check if certificate already exists
  const [existingCert] = await db
    .select()
    .from(certificates)
    .where(
      and(
        eq(certificates.userId, userId),
        eq(certificates.examSessionId, examSessionId)
      )
    )
    .limit(1);

  if (existingCert) {
    return {
      certificateId: existingCert.id,
      pdfUrl: existingCert.pdfUrl,
    };
  }

  // Get user details
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!user) {
    throw new Error("User not found");
  }

  const moduleName = MODULE_NAMES[examSession.moduleId] || `Modul ${examSession.moduleId}`;

  // Generate PDF
  const { pdfUrl, pdfKey } = await generateCertificatePDF(
    user.name || "Teilnehmer",
    examSession.moduleId,
    moduleName,
    examSession.score,
    examSession.totalQuestions,
    examSession.correctAnswers,
    examSession.completedAt || new Date()
  );

  // Save to database
  const [certificate] = await db
    .insert(certificates)
    .values({
      userId,
      examSessionId,
      moduleId: examSession.moduleId,
      moduleName,
      score: examSession.score,
      totalQuestions: examSession.totalQuestions,
      correctAnswers: examSession.correctAnswers,
      pdfUrl,
      pdfKey,
    })
    .$returningId();

  return {
    certificateId: certificate.id,
    pdfUrl,
  };
}

/**
 * Get all certificates for a user
 */
export async function getUserCertificates(userId: number) {
  const db = await getDb();
  if (!db) {
    return [];
  }
  return db
    .select()
    .from(certificates)
    .where(eq(certificates.userId, userId))
    .orderBy(certificates.issuedAt);
}

/**
 * Get certificate by exam session
 */
export async function getCertificateByExamSession(examSessionId: number) {
  const db = await getDb();
  if (!db) {
    return null;
  }
  const [certificate] = await db
    .select()
    .from(certificates)
    .where(eq(certificates.examSessionId, examSessionId))
    .limit(1);

  return certificate || null;
}
