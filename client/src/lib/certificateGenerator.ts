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

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Colors
  const primaryColor = "#1e40af"; // Blue-700
  const secondaryColor = "#64748b"; // Slate-500
  const accentColor = "#3b82f6"; // Blue-500

  // Draw decorative border
  pdf.setDrawColor(primaryColor);
  pdf.setLineWidth(2);
  pdf.rect(10, 10, pageWidth - 20, pageHeight - 20);
  
  pdf.setDrawColor(accentColor);
  pdf.setLineWidth(0.5);
  pdf.rect(12, 12, pageWidth - 24, pageHeight - 24);

  // Add decorative corner elements
  drawCornerDecoration(pdf, 15, 15, primaryColor);
  drawCornerDecoration(pdf, pageWidth - 15, 15, primaryColor, true);
  drawCornerDecoration(pdf, 15, pageHeight - 15, primaryColor, false, true);
  drawCornerDecoration(pdf, pageWidth - 15, pageHeight - 15, primaryColor, true, true);

  // Title
  pdf.setFontSize(36);
  pdf.setTextColor(primaryColor);
  pdf.setFont("helvetica", "bold");
  const title = "Teilnahmezertifikat";
  const titleWidth = pdf.getTextWidth(title);
  pdf.text(title, (pageWidth - titleWidth) / 2, 40);

  // Subtitle
  pdf.setFontSize(14);
  pdf.setTextColor(secondaryColor);
  pdf.setFont("helvetica", "normal");
  const subtitle = "Immobilien-Bildungsportal";
  const subtitleWidth = pdf.getTextWidth(subtitle);
  pdf.text(subtitle, (pageWidth - subtitleWidth) / 2, 50);

  // Divider line
  pdf.setDrawColor(accentColor);
  pdf.setLineWidth(0.5);
  pdf.line(pageWidth / 4, 55, (pageWidth * 3) / 4, 55);

  // Certificate text
  pdf.setFontSize(16);
  pdf.setTextColor("#000000");
  pdf.setFont("helvetica", "normal");
  const certText1 = "Hiermit wird bescheinigt, dass";
  const certText1Width = pdf.getTextWidth(certText1);
  pdf.text(certText1, (pageWidth - certText1Width) / 2, 70);

  // User name (highlighted)
  pdf.setFontSize(24);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(primaryColor);
  const userNameWidth = pdf.getTextWidth(userName);
  pdf.text(userName, (pageWidth - userNameWidth) / 2, 85);

  // Module completion text
  pdf.setFontSize(16);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor("#000000");
  const certText2 = "erfolgreich das Lernmodul";
  const certText2Width = pdf.getTextWidth(certText2);
  pdf.text(certText2, (pageWidth - certText2Width) / 2, 100);

  // Module name
  pdf.setFontSize(18);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(accentColor);
  const moduleNameWidth = pdf.getTextWidth(certificateData.moduleName);
  pdf.text(certificateData.moduleName, (pageWidth - moduleNameWidth) / 2, 112);

  // Completion text
  pdf.setFontSize(16);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor("#000000");
  const certText3 = "abgeschlossen hat.";
  const certText3Width = pdf.getTextWidth(certText3);
  pdf.text(certText3, (pageWidth - certText3Width) / 2, 124);

  // Statistics box
  const boxY = 135;
  const boxHeight = 30;
  pdf.setFillColor(245, 247, 250); // Light gray background
  pdf.roundedRect(pageWidth / 4, boxY, pageWidth / 2, boxHeight, 3, 3, "F");

  pdf.setFontSize(11);
  pdf.setTextColor(secondaryColor);
  pdf.setFont("helvetica", "normal");

  const stats = [
    `Abgeschlossene Tage: ${certificateData.daysCompleted} von ${certificateData.totalDays}`,
    `Fortschritt: ${certificateData.completionPercentage}%`,
    `Lernzeit: ${Math.round(certificateData.totalTimeSpent / 60)} Stunden`,
  ];

  const statsStartX = pageWidth / 4 + 10;
  let statsY = boxY + 10;
  stats.forEach((stat) => {
    pdf.text(stat, statsStartX, statsY);
    statsY += 7;
  });

  // Date and location
  pdf.setFontSize(12);
  pdf.setTextColor("#000000");
  pdf.setFont("helvetica", "normal");
  
  const completionDate = new Date(certificateData.completedAt);
  const dateStr = completionDate.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  
  const dateText = `Ausgestellt am: ${dateStr}`;
  pdf.text(dateText, pageWidth / 2 - 50, pageHeight - 35);

  // Signature line
  pdf.setLineWidth(0.5);
  pdf.setDrawColor(secondaryColor);
  pdf.line(pageWidth / 2 + 20, pageHeight - 25, pageWidth / 2 + 80, pageHeight - 25);
  
  pdf.setFontSize(10);
  pdf.setTextColor(secondaryColor);
  const signatureText = "Unterschrift der Kursleitung";
  pdf.text(signatureText, pageWidth / 2 + 28, pageHeight - 20);

  // Footer
  pdf.setFontSize(9);
  pdf.setTextColor(secondaryColor);
  pdf.setFont("helvetica", "italic");
  const footer = "Dieses Zertifikat bestätigt die erfolgreiche Teilnahme am Online-Lernprogramm.";
  const footerWidth = pdf.getTextWidth(footer);
  pdf.text(footer, (pageWidth - footerWidth) / 2, pageHeight - 8);

  // Add certificate ID (for verification)
  const certId = generateCertificateId(certificateData);
  pdf.setFontSize(8);
  pdf.setTextColor(secondaryColor);
  pdf.text(`Zertifikat-ID: ${certId}`, 15, pageHeight - 5);

  // Save the PDF
  const fileName = `Zertifikat_Modul${certificateData.moduleId}_${userName.replace(/\s+/g, "_")}.pdf`;
  pdf.save(fileName);
}

// Draw decorative corner element
function drawCornerDecoration(
  pdf: jsPDF,
  x: number,
  y: number,
  color: string,
  flipX: boolean = false,
  flipY: boolean = false
): Promise<void> {
  pdf.setDrawColor(color);
  pdf.setLineWidth(1);
  
  const size = 8;
  const xDir = flipX ? -1 : 1;
  const yDir = flipY ? -1 : 1;
  
  // Draw L-shaped corner decoration
  pdf.line(x, y, x + xDir * size, y);
  pdf.line(x, y, x, y + yDir * size);
  
  // Add small diagonal accent
  pdf.setLineWidth(0.5);
  pdf.line(x + xDir * 2, y + yDir * 2, x + xDir * 5, y + yDir * 5);
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
export async function getCertificatePreviewData(options: CertificateOptions): {
  userName: string;
  moduleName: string;
  completionDate: string;
  certificateId: string;
  stats: {
    daysCompleted: string;
    completionPercentage: string;
    totalTimeSpent: string;
  };
} {
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
