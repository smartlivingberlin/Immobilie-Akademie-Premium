import type { jsPDF } from "jspdf";
// Certificate Generator using jsPDF
// Generates professional PDF certificates for completed modules

import type { CertificateData } from "./progressTracking";

export interface CertificateOptions {
  userName: string;
  certificateData: CertificateData;
}

export async function generateCertificatePDF(options: CertificateOptions): Promise<void> {
  const { userName, certificateData } = options;
  
  // Create PDF in landscape A4 format
  const { jsPDF: JsPDF } = await import("jspdf");
  const doc = new JsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Colors
  const primaryColor = "#1e40af"; // Blue-700
  const secondaryColor = "#64748b"; // Slate-500
  const accentColor = "#3b82f6"; // Blue-500

  // Draw decorative border
  doc.setDrawColor(primaryColor);
  doc.setLineWidth(2);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);
  
  doc.setDrawColor(accentColor);
  doc.setLineWidth(0.5);
  doc.rect(12, 12, pageWidth - 24, pageHeight - 24);

  // Add decorative corner elements
  drawCornerDecoration(doc, 15, 15, primaryColor);
  drawCornerDecoration(doc, pageWidth - 15, 15, primaryColor, true);
  drawCornerDecoration(doc, 15, pageHeight - 15, primaryColor, false, true);
  drawCornerDecoration(doc, pageWidth - 15, pageHeight - 15, primaryColor, true, true);

  // Title
  doc.setFontSize(36);
  doc.setTextColor(primaryColor);
  doc.setFont("helvetica", "bold");
  const title = "Teilnahmezertifikat";
  const titleWidth = doc.getTextWidth(title);
  doc.text(title, (pageWidth - titleWidth) / 2, 40);

  // Subtitle
  doc.setFontSize(14);
  doc.setTextColor(secondaryColor);
  doc.setFont("helvetica", "normal");
  const subtitle = "Immobilien-Bildungsportal";
  const subtitleWidth = doc.getTextWidth(subtitle);
  doc.text(subtitle, (pageWidth - subtitleWidth) / 2, 50);

  // Divider line
  doc.setDrawColor(accentColor);
  doc.setLineWidth(0.5);
  doc.line(pageWidth / 4, 55, (pageWidth * 3) / 4, 55);

  // Certificate text
  doc.setFontSize(16);
  doc.setTextColor("#000000");
  doc.setFont("helvetica", "normal");
  const certText1 = "Hiermit wird bescheinigt, dass";
  const certText1Width = doc.getTextWidth(certText1);
  doc.text(certText1, (pageWidth - certText1Width) / 2, 70);

  // User name (highlighted)
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(primaryColor);
  const userNameWidth = doc.getTextWidth(userName);
  doc.text(userName, (pageWidth - userNameWidth) / 2, 85);

  // Module completion text
  doc.setFontSize(16);
  doc.setFont("helvetica", "normal");
  doc.setTextColor("#000000");
  const certText2 = "erfolgreich das Lernmodul";
  const certText2Width = doc.getTextWidth(certText2);
  doc.text(certText2, (pageWidth - certText2Width) / 2, 100);

  // Module name
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(accentColor);
  const moduleNameWidth = doc.getTextWidth(certificateData.moduleName);
  doc.text(certificateData.moduleName, (pageWidth - moduleNameWidth) / 2, 112);

  // Completion text
  doc.setFontSize(16);
  doc.setFont("helvetica", "normal");
  doc.setTextColor("#000000");
  const certText3 = "abgeschlossen hat.";
  const certText3Width = doc.getTextWidth(certText3);
  doc.text(certText3, (pageWidth - certText3Width) / 2, 124);

  // Statistics box
  const boxY = 135;
  const boxHeight = 30;
  doc.setFillColor(245, 247, 250); // Light gray background
  doc.roundedRect(pageWidth / 4, boxY, pageWidth / 2, boxHeight, 3, 3, "F");

  doc.setFontSize(11);
  doc.setTextColor(secondaryColor);
  doc.setFont("helvetica", "normal");

  const stats = [
    `Abgeschlossene Tage: ${certificateData.daysCompleted} von ${certificateData.totalDays}`,
    `Fortschritt: ${certificateData.completionPercentage}%`,
    `Lernzeit: ${Math.round(certificateData.totalTimeSpent / 60)} Stunden`,
  ];

  const statsStartX = pageWidth / 4 + 10;
  let statsY = boxY + 10;
  stats.forEach((stat) => {
    doc.text(stat, statsStartX, statsY);
    statsY += 7;
  });

  // Date and location
  doc.setFontSize(12);
  doc.setTextColor("#000000");
  doc.setFont("helvetica", "normal");
  
  const completionDate = new Date(certificateData.completedAt);
  const dateStr = completionDate.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  
  const dateText = `Ausgestellt am: ${dateStr}`;
  doc.text(dateText, pageWidth / 2 - 50, pageHeight - 35);

  // Signature line
  doc.setLineWidth(0.5);
  doc.setDrawColor(secondaryColor);
  doc.line(pageWidth / 2 + 20, pageHeight - 25, pageWidth / 2 + 80, pageHeight - 25);
  
  doc.setFontSize(10);
  doc.setTextColor(secondaryColor);
  const signatureText = "Unterschrift der Kursleitung";
  doc.text(signatureText, pageWidth / 2 + 28, pageHeight - 20);

  // Footer
  doc.setFontSize(9);
  doc.setTextColor(secondaryColor);
  doc.setFont("helvetica", "italic");
  const footer = "Dieses Zertifikat bestätigt die erfolgreiche Teilnahme am Online-Lernprogramm.";
  const footerWidth = doc.getTextWidth(footer);
  doc.text(footer, (pageWidth - footerWidth) / 2, pageHeight - 8);

  // Add certificate ID (for verification)
  const certId = generateCertificateId(certificateData);
  doc.setFontSize(8);
  doc.setTextColor(secondaryColor);
  doc.text(`Zertifikat-ID: ${certId}`, 15, pageHeight - 5);

  // Save the PDF
  const fileName = `Zertifikat_Modul${certificateData.moduleId}_${userName.replace(/\s+/g, "_")}.pdf`;
  doc.save(fileName);
}

// Draw decorative corner element
function drawCornerDecoration(
  doc: jsPDF,
  x: number,
  y: number,
  color: string,
  flipX: boolean = false,
  flipY: boolean = false
): void {
  doc.setDrawColor(color);
  doc.setLineWidth(1);
  
  const size = 8;
  const xDir = flipX ? -1 : 1;
  const yDir = flipY ? -1 : 1;
  
  // Draw L-shaped corner decoration
  doc.line(x, y, x + xDir * size, y);
  doc.line(x, y, x, y + yDir * size);
  
  // Add small diagonal accent
  doc.setLineWidth(0.5);
  doc.line(x + xDir * 2, y + yDir * 2, x + xDir * 5, y + yDir * 5);
}

// Generate unique certificate ID
function generateCertificateId(data: CertificateData): string {
  const date = new Date(data.completedAt);
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const moduleId = data.moduleId.toString().padStart(2, "0");
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  
  return `IB${year}${month}M${moduleId}-${random}`;
}

// Preview certificate data (for UI display before download)
export async function getCertificatePreviewData(options: CertificateOptions): Promise<{
  userName: string;
  moduleName: string;
  completionDate: string;
  certificateId: string;
  stats: {
    daysCompleted: string;
    completionPercentage: string;
    totalTimeSpent: string;
  };
}> {
  const { userName, certificateData } = options;
  
  const completionDate = new Date(certificateData.completedAt).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  
  const certificateId = generateCertificateId(certificateData);
  
  return {
    userName,
    moduleName: certificateData.moduleName,
    completionDate,
    certificateId,
    stats: {
      daysCompleted: `${certificateData.daysCompleted} von ${certificateData.totalDays}`,
      completionPercentage: `${certificateData.completionPercentage}%`,
      totalTimeSpent: `${Math.round(certificateData.totalTimeSpent / 60)} Stunden`,
    },
  };
}
