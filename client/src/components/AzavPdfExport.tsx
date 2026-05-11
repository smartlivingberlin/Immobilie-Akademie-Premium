import { useState } from "react";

interface AzavPdfProps {
  ownerKey: string;
}

export function AzavPdfExport({ ownerKey }: AzavPdfProps) {
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const generatePdf = async () => {
    setLoading(true);
    try {
      // Daten vom Server holen
      const params = new URLSearchParams({ key: ownerKey });
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);

      const res = await fetch(`/api/owner/azav-report?${params}`, {
        credentials: "include",
        headers: { "x-owner-key": ownerKey }
      });
      const data = await res.json();

      if (data.error) {
        alert("Fehler: " + data.error);
        return;
      }

      // jsPDF dynamisch laden
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

      const pageW = 210;
      const margin = 20;
      let y = 20;

      // Hilfsfunktionen
      const addLine = (text: string, fontSize = 10, bold = false, color = [0,0,0] as [number,number,number]) => {
        doc.setFontSize(fontSize);
        doc.setFont("helvetica", bold ? "bold" : "normal");
        doc.setTextColor(color[0], color[1], color[2]);
        const lines = doc.splitTextToSize(text, pageW - 2 * margin);
        if (y + lines.length * (fontSize * 0.4) > 280) {
          doc.addPage();
          y = 20;
        }
        doc.text(lines, margin, y);
        y += lines.length * (fontSize * 0.4 + 1) + 1;
      };

      const addSpacer = (h = 4) => { y += h; };

      const addHLine = (color = [200,200,200] as [number,number,number]) => {
        doc.setDrawColor(color[0], color[1], color[2]);
        doc.line(margin, y, pageW - margin, y);
        y += 4;
      };

      // ── HEADER ──────────────────────────────────────────
      doc.setFillColor(15, 39, 68);
      doc.rect(0, 0, pageW, 35, "F");
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(255, 255, 255);
      doc.text("AZAV-Anwesenheitsbericht", margin, 15);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("Immobilien Akademie Smart | IHK-Vorbereitung §34c/§34i", margin, 22);
      doc.setFontSize(8);
      doc.text("Gemäß §§ 176-180 SGB III | Erstellt: " + new Date().toLocaleString("de-DE"), margin, 29);
      y = 45;

      // ── META INFO ─────────────────────────────────────
      addLine("Berichtszeitraum", 11, true, [15,39,68]);
      addLine("Von: " + (data.zeitraum?.von || "alle Daten") + "  |  Bis: " + (data.zeitraum?.bis || "heute"), 10);
      addLine("Gesamtnutzer im Bericht: " + data.gesamtNutzer, 10);
      addLine("Erstellt am: " + new Date(data.berichtDatum).toLocaleString("de-DE"), 10);
      addSpacer();
      addHLine([15,39,68]);

      // ── PRO NUTZER ────────────────────────────────────
      for (const bericht of (data.berichte || [])) {
        const n = bericht.nutzer || {};
        const z = bericht.zusammenfassung || {};
        const k = bericht.azavKonformitaet || {};

        // Nutzer-Header
        doc.setFillColor(240, 249, 255);
        doc.rect(margin - 2, y - 2, pageW - 2 * margin + 4, 14, "F");
        addLine("Lernender: " + (n.name || "—"), 12, true, [15,39,68]);
        addLine("E-Mail: " + (n.email || "—") + "  |  Freigeschaltete Module: " + (n.module || "—"), 9, false, [100,116,139]);
        addSpacer(2);

        // Zusammenfassung
        addLine("Zusammenfassung", 10, true);
        addLine("Gesamtsitzungen: " + (z.gesamtSitzungen || 0) +
          "  |  Aktive Tage: " + (z.aktiveTage || 0) +
          "  |  Gesamtzeit: " + (z.gesamtStunden || 0) + "h" +
          "  |  Unterrichtseinheiten: " + (z.gesamtUE || 0) + " UE", 9);
        addLine("Abgeschlossene Einheiten: " + (z.abgeschlosseneEinheiten || 0), 9);
        addSpacer(2);

        // AZAV-Status
        const azavOk = k.nachweisVorhanden;
        doc.setFillColor(azavOk ? 220 : 254, azavOk ? 252 : 226, azavOk ? 231 : 226);
        doc.rect(margin - 2, y - 2, pageW - 2 * margin + 4, 8, "F");
        addLine(
          azavOk
            ? "✓ AZAV-konformer Nachweis vorhanden | Zeitraum: " + k.zeitraumVon + " bis " + k.zeitraumBis
            : "⚠ Kein Lernnachweis vorhanden",
          9, true,
          azavOk ? [21,128,61] : [220,38,38]
        );
        addSpacer(2);

        // Tagesnachweis Tabelle
        if (bericht.tagesNachweis?.length > 0) {
          addLine("Tagesnachweis (Anwesenheitsprotokoll):", 10, true);
          addSpacer(1);

          // Tabellen-Header
          doc.setFillColor(30, 58, 92);
          doc.rect(margin, y, pageW - 2 * margin, 6, "F");
          doc.setFontSize(8);
          doc.setFont("helvetica", "bold");
          doc.setTextColor(255, 255, 255);
          doc.text("Datum", margin + 2, y + 4);
          doc.text("Lernzeit", margin + 32, y + 4);
          doc.text("UE", margin + 55, y + 4);
          doc.text("Module/Tage", margin + 65, y + 4);
          doc.text("Abgeschl.", margin + 130, y + 4);
          y += 7;

          // Tabellenzeilen
          for (let i = 0; i < bericht.tagesNachweis.length; i++) {
            const t = bericht.tagesNachweis[i];
            if (y > 275) { doc.addPage(); y = 20; }
            if (i % 2 === 0) {
              doc.setFillColor(248, 250, 252);
              doc.rect(margin, y - 1, pageW - 2 * margin, 5.5, "F");
            }
            doc.setFontSize(8);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(0, 0, 0);
            doc.text(String(t.datum || ""), margin + 2, y + 3);
            doc.text(String(t.lernzeit || "0 Min"), margin + 32, y + 3);
            doc.text(String(t.ue || 0), margin + 55, y + 3);
            doc.text(String((t.module || "").slice(0, 40)), margin + 65, y + 3);
            doc.text(String(t.abgeschlossen || 0), margin + 130, y + 3);
            y += 5.5;
          }
        }

        addSpacer(6);
        addHLine();
      }

      // ── FOOTER ────────────────────────────────────────
      if (y > 260) { doc.addPage(); y = 20; }
      addSpacer(4);
      doc.setFillColor(248, 250, 252);
      doc.rect(margin - 2, y - 2, pageW - 2 * margin + 4, 20, "F");
      addLine("Rechtlicher Hinweis", 9, true, [100,116,139]);
      addLine(data.hinweis || "Dieser Bericht dient als Grundlage für AZAV-Anwesenheitsnachweise gemäß §§ 176-180 SGB III", 8, false, [100,116,139]);
      addSpacer(2);
      addLine("Immobilien Akademie Smart | Alisad Gadyri | Berlin", 8, false, [150,150,150]);

      // Seitenzahlen
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text("Seite " + i + " von " + pageCount, pageW - margin - 20, 287);
      }

      // PDF herunterladen
      const filename = "AZAV_Bericht_" + new Date().toISOString().split("T")[0] + ".pdf";
      doc.save(filename);

    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      alert("PDF-Fehler: " + message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{background:"#f0fdf4",border:"1px solid #86efac",borderRadius:12,padding:"20px 24px"}}>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
        <span style={{fontSize:28}}>📄</span>
        <div>
          <div style={{fontSize:15,fontWeight:800,color:"#15803d"}}>AZAV-Bericht als PDF exportieren</div>
          <div style={{fontSize:12,color:"#16a34a"}}>Offizieller Anwesenheitsnachweis gemäß §§ 176-180 SGB III</div>
        </div>
      </div>
      <div style={{display:"flex",gap:12,marginBottom:16,flexWrap:"wrap"}}>
        <div>
          <label style={{fontSize:11,color:"#166534",fontWeight:600,display:"block",marginBottom:4}}>Von (optional)</label>
          <input type="date" value={startDate} onChange={e=>setStartDate(e.target.value)}
            style={{border:"1px solid #86efac",borderRadius:8,padding:"6px 10px",fontSize:12,background:"white"}} />
        </div>
        <div>
          <label style={{fontSize:11,color:"#166534",fontWeight:600,display:"block",marginBottom:4}}>Bis (optional)</label>
          <input type="date" value={endDate} onChange={e=>setEndDate(e.target.value)}
            style={{border:"1px solid #86efac",borderRadius:8,padding:"6px 10px",fontSize:12,background:"white"}} />
        </div>
      </div>
      <button onClick={generatePdf} disabled={loading}
        style={{background:"linear-gradient(135deg,#16a34a,#15803d)",color:"white",border:"none",
          borderRadius:10,padding:"12px 24px",fontSize:14,fontWeight:700,cursor:loading?"not-allowed":"pointer",
          boxShadow:"0 4px 14px rgba(22,163,74,0.4)",opacity:loading?0.7:1}}>
        {loading ? "⏳ PDF wird erstellt..." : "📥 PDF herunterladen"}
      </button>
      <div style={{fontSize:11,color:"#166534",marginTop:8}}>
        Das PDF enthält: Deckblatt, Tagesnachweis pro Nutzer, UE-Berechnung, gesetzliche Hinweise, Seitenzahlen
      </div>
    </div>
  );
}
