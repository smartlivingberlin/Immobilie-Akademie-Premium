/** Client-seitiger PDF-Export für Verwalter-Vorlagen (jsPDF). */
export async function downloadBriefPdf(title: string, body: string): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const margin = 20;
  const lineHeight = 6;
  const maxWidth = 170;

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  const titleLines = doc.splitTextToSize(title, maxWidth);
  doc.text(titleLines, margin, margin);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100);
  doc.text(`Erstellt am ${new Date().toLocaleDateString("de-DE")}`, margin, margin + titleLines.length * 7 + 4);

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);
  const bodyStart = margin + titleLines.length * 7 + 14;
  const paragraphs = body.split("\n");
  let y = bodyStart;

  for (const para of paragraphs) {
    if (!para.trim()) {
      y += lineHeight;
      continue;
    }
    const lines = doc.splitTextToSize(para, maxWidth);
    for (const line of lines) {
      if (y > 280) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += lineHeight;
    }
    y += 2;
  }

  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text(
    "Keine Rechtsberatung — Entwurf prüfen lassen. Immobilien Akademie Smart.",
    margin,
    290,
  );

  const safeName = title.replace(/[^a-zA-Z0-9äöüÄÖÜß_-]/g, "_").slice(0, 40);
  doc.save(`${safeName}.pdf`);
}
