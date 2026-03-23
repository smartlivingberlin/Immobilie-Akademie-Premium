import { useState, useRef, useEffect, useCallback } from "react";
import { Upload, Highlighter, Trash2, Download, FileText, Loader2, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";

interface Markierung {
  id: string;
  seite: number;
  text: string;
  farbe: string;
  x: number;
  y: number;
  breite: number;
  hoehe: number;
  kommentar?: string;
  erstellt: string;
}

const FARBEN = [
  { id: "gelb", hex: "#FEF08A", label: "Gelb — Wichtig" },
  { id: "gruen", hex: "#86EFAC", label: "Grün — Verstanden" },
  { id: "rot", hex: "#FCA5A5", label: "Rot — Unklar" },
  { id: "blau", hex: "#93C5FD", label: "Blau — Paragraph" },
];

export default function DokumentViewer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [aktiveSeite, setAktiveSeite] = useState(1);
  const [gesamtSeiten, setGesamtSeiten] = useState(0);
  const [zoom, setZoom] = useState(1.4);
  const [loading, setLoading] = useState(false);
  const [aktiveFarbe, setAktiveFarbe] = useState("gelb");
  const [markierungen, setMarkierungen] = useState<Markierung[]>([]);
  const [auswahl, setAuswahl] = useState<{x: number; y: number; breite: number; hoehe: number} | null>(null);
  const [ziehtAuswahl, setZiehtAuswahl] = useState(false);
  const [startPunkt, setStartPunkt] = useState({x: 0, y: 0});
  const [gewaehlteMarkierung, setGewaehlteMarkierung] = useState<string | null>(null);
  const [kommentarText, setKommentarText] = useState("");
  const [dateiName, setDateiName] = useState("");
  const [renderTask, setRenderTask] = useState<any>(null);

  const ladeSeite = useCallback(async (doc: any, seitenNr: number, zoomFaktor: number) => {
    if (!canvasRef.current || !doc) return;
    try {
      if (renderTask) { try { renderTask.cancel(); } catch {} }
      const seite = await doc.getPage(seitenNr);
      const viewport = seite.getViewport({ scale: zoomFaktor });
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      const task = seite.render({ canvasContext: ctx, viewport });
      setRenderTask(task);
      await task.promise;
      // Markierungen zeichnen
      const seitenMarkierungen = markierungen.filter(m => m.seite === seitenNr);
      for (const m of seitenMarkierungen) {
        ctx.fillStyle = FARBEN.find(f => f.id === m.farbe)?.hex + "88" || "#FEF08A88";
        ctx.fillRect(m.x, m.y, m.breite, m.hoehe);
        if (m.id === gewaehlteMarkierung) {
          ctx.strokeStyle = "#2563eb";
          ctx.lineWidth = 2;
          ctx.strokeRect(m.x, m.y, m.breite, m.hoehe);
        }
      }
    } catch (e: any) {
      if (e?.name !== "RenderingCancelledException") console.error(e);
    }
  }, [markierungen, gewaehlteMarkierung, renderTask]);

  useEffect(() => {
    if (pdfDoc) ladeSeite(pdfDoc, aktiveSeite, zoom);
  }, [pdfDoc, aktiveSeite, zoom, markierungen, gewaehlteMarkierung]);

  const ladePDF = async (datei: File) => {
    setLoading(true);
    setDateiName(datei.name);
    setMarkierungen([]);
    setAktiveSeite(1);
    try {
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.5.207/pdf.worker.min.mjs`;
      const arrayBuffer = await datei.arrayBuffer();
      const doc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      setPdfDoc(doc);
      setGesamtSeiten(doc.numPages);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const datei = e.dataTransfer.files[0];
    if (datei?.type === "application/pdf") ladePDF(datei);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const datei = e.target.files?.[0];
    if (datei) ladePDF(datei);
  };

  const getCanvasPos = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
  };

  const mouseDown = (e: React.MouseEvent) => {
    if (!pdfDoc) return;
    const pos = getCanvasPos(e);
    setZiehtAuswahl(true);
    setStartPunkt(pos);
    setAuswahl(null);
  };

  const mouseMove = (e: React.MouseEvent) => {
    if (!ziehtAuswahl) return;
    const pos = getCanvasPos(e);
    setAuswahl({
      x: Math.min(startPunkt.x, pos.x),
      y: Math.min(startPunkt.y, pos.y),
      breite: Math.abs(pos.x - startPunkt.x),
      hoehe: Math.abs(pos.y - startPunkt.y),
    });
  };

  const mouseUp = () => {
    setZiehtAuswahl(false);
    if (auswahl && auswahl.breite > 10 && auswahl.hoehe > 5) {
      const neueMarkierung: Markierung = {
        id: Date.now().toString(),
        seite: aktiveSeite,
        text: "",
        farbe: aktiveFarbe,
        x: auswahl.x,
        y: auswahl.y,
        breite: auswahl.breite,
        hoehe: auswahl.hoehe,
        erstellt: new Date().toLocaleString("de-DE"),
      };
      setMarkierungen(p => [...p, neueMarkierung]);
      setGewaehlteMarkierung(neueMarkierung.id);
      setAuswahl(null);
    }
  };

  const loescheMarkierung = (id: string) => {
    setMarkierungen(p => p.filter(m => m.id !== id));
    if (gewaehlteMarkierung === id) setGewaehlteMarkierung(null);
  };

  const speichereKommentar = () => {
    if (!gewaehlteMarkierung) return;
    setMarkierungen(p => p.map(m => m.id === gewaehlteMarkierung ? { ...m, kommentar: kommentarText } : m));
    setKommentarText("");
  };

  const exportiereMarkierungen = () => {
    const text = markierungen.map(m =>
      `Seite ${m.seite} | ${FARBEN.find(f => f.id === m.farbe)?.label} | ${m.erstellt}${m.kommentar ? " | " + m.kommentar : ""}`
    ).join("\n");
    const blob = new Blob(["MARKIERUNGEN — " + dateiName + "\n" + "=".repeat(50) + "\n\n" + text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Markierungen_${dateiName}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const gewaehlteM = markierungen.find(m => m.id === gewaehlteMarkierung);

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 20px" }}>
      <div style={{ marginBottom: 16 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>Dokument-Viewer</h1>
        <p style={{ color: "#64748b", marginTop: 4, fontSize: 14 }}>PDF hochladen — Textstellen mit Farben markieren — Kommentare hinzufügen</p>
      </div>

      {!pdfDoc ? (
        <div onDrop={onDrop} onDragOver={e => e.preventDefault()}
          style={{ border: "2px dashed #e2e8f0", borderRadius: 16, padding: "60px 20px", textAlign: "center", cursor: "pointer", background: "#f8fafc" }}
          onClick={() => document.getElementById("pdf-input")?.click()}>
          <input id="pdf-input" type="file" accept=".pdf" onChange={onFileChange} style={{ display: "none" }} />
          {loading ? (
            <div>
              <Loader2 size={40} style={{ animation: "spin 1s linear infinite", color: "#94a3b8", margin: "0 auto 12px", display: "block" }} />
              <div style={{ fontSize: 15, color: "#64748b" }}>PDF wird geladen...</div>
            </div>
          ) : (
            <div>
              <FileText size={48} color="#94a3b8" style={{ margin: "0 auto 16px", display: "block" }} />
              <div style={{ fontSize: 17, fontWeight: 600, color: "#374151", marginBottom: 8 }}>PDF hier ablegen oder klicken</div>
              <div style={{ fontSize: 13, color: "#94a3b8" }}>Unterstützt: Gesetze, BGH-Urteile, Lernmaterialien, Skripte</div>
            </div>
          )}
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 14 }}>
          {/* PDF Canvas */}
          <div>
            {/* Toolbar */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: "#fff", border: "0.5px solid #e2e8f0", borderRadius: "10px 10px 0 0", flexWrap: "wrap" }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: "#374151", flex: 1 }}>📄 {dateiName}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <button onClick={() => setAktiveSeite(p => Math.max(1, p - 1))} disabled={aktiveSeite === 1}
                  style={{ padding: 5, border: "0.5px solid #e2e8f0", borderRadius: 6, background: "#fff", cursor: "pointer", opacity: aktiveSeite === 1 ? 0.4 : 1 }}>
                  <ChevronLeft size={14} />
                </button>
                <span style={{ fontSize: 12, color: "#374151", padding: "0 8px" }}>{aktiveSeite} / {gesamtSeiten}</span>
                <button onClick={() => setAktiveSeite(p => Math.min(gesamtSeiten, p + 1))} disabled={aktiveSeite === gesamtSeiten}
                  style={{ padding: 5, border: "0.5px solid #e2e8f0", borderRadius: 6, background: "#fff", cursor: "pointer", opacity: aktiveSeite === gesamtSeiten ? 0.4 : 1 }}>
                  <ChevronRight size={14} />
                </button>
              </div>
              <div style={{ display: "flex", gap: 4 }}>
                <button onClick={() => setZoom(z => Math.max(0.5, z - 0.2))}
                  style={{ padding: 5, border: "0.5px solid #e2e8f0", borderRadius: 6, background: "#fff", cursor: "pointer" }}>
                  <ZoomOut size={14} />
                </button>
                <span style={{ fontSize: 11, color: "#64748b", padding: "5px 6px" }}>{Math.round(zoom * 100)}%</span>
                <button onClick={() => setZoom(z => Math.min(3, z + 0.2))}
                  style={{ padding: 5, border: "0.5px solid #e2e8f0", borderRadius: 6, background: "#fff", cursor: "pointer" }}>
                  <ZoomIn size={14} />
                </button>
              </div>
              <button onClick={() => { setPdfDoc(null); setMarkierungen([]); setDateiName(""); }}
                style={{ padding: "5px 10px", border: "0.5px solid #e2e8f0", borderRadius: 6, background: "#fff", cursor: "pointer", fontSize: 11, color: "#64748b" }}>
                Anderes PDF
              </button>
            </div>

            {/* Farbauswahl */}
            <div style={{ display: "flex", gap: 6, padding: "8px 14px", background: "#f8fafc", border: "0.5px solid #e2e8f0", borderLeft: "0.5px solid #e2e8f0", borderRight: "0.5px solid #e2e8f0" }}>
              <span style={{ fontSize: 11, color: "#64748b", display: "flex", alignItems: "center", gap: 4 }}>
                <Highlighter size={13} /> Markierfarbe:
              </span>
              {FARBEN.map(f => (
                <button key={f.id} onClick={() => setAktiveFarbe(f.id)} title={f.label}
                  style={{ width: 24, height: 24, borderRadius: 6, background: f.hex, border: `2px solid ${aktiveFarbe === f.id ? "#0f172a" : "transparent"}`, cursor: "pointer" }} />
              ))}
              <span style={{ fontSize: 11, color: "#94a3b8", marginLeft: 8 }}>Ziehe auf der Seite um zu markieren</span>
            </div>

            {/* Canvas */}
            <div ref={containerRef} style={{ overflow: "auto", border: "0.5px solid #e2e8f0", borderRadius: "0 0 10px 10px", background: "#f1f5f9", maxHeight: "75vh", position: "relative" }}>
              <canvas ref={canvasRef}
                onMouseDown={mouseDown} onMouseMove={mouseMove} onMouseUp={mouseUp}
                style={{ display: "block", margin: "16px auto", cursor: "crosshair", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", maxWidth: "100%" }} />
            </div>
          </div>

          {/* Seitenleiste */}
          <div>
            {/* Gewählte Markierung */}
            {gewaehlteM && (
              <div style={{ background: "#fff", border: "0.5px solid #e2e8f0", borderRadius: 10, padding: 12, marginBottom: 10 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#374151", marginBottom: 8 }}>Markierung bearbeiten</div>
                <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
                  {FARBEN.map(f => (
                    <button key={f.id} onClick={() => setMarkierungen(p => p.map(m => m.id === gewaehlteM.id ? { ...m, farbe: f.id } : m))}
                      style={{ width: 20, height: 20, borderRadius: 4, background: f.hex, border: `2px solid ${gewaehlteM.farbe === f.id ? "#0f172a" : "transparent"}`, cursor: "pointer" }} />
                  ))}
                </div>
                <textarea value={kommentarText} onChange={e => setKommentarText(e.target.value)}
                  placeholder="Kommentar hinzufügen..."
                  style={{ width: "100%", padding: "6px 8px", border: "0.5px solid #e2e8f0", borderRadius: 6, fontSize: 12, minHeight: 60, resize: "none", fontFamily: "inherit" }} />
                {gewaehlteM.kommentar && (
                  <div style={{ fontSize: 11, color: "#64748b", marginTop: 4, padding: "4px 8px", background: "#f8fafc", borderRadius: 6 }}>
                    💬 {gewaehlteM.kommentar}
                  </div>
                )}
                <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                  <button onClick={speichereKommentar}
                    style={{ flex: 1, padding: "5px 8px", background: "#2563eb", color: "#fff", border: "none", borderRadius: 6, fontSize: 11, cursor: "pointer" }}>
                    Speichern
                  </button>
                  <button onClick={() => loescheMarkierung(gewaehlteM.id)}
                    style={{ padding: "5px 8px", background: "#fef2f2", color: "#dc2626", border: "0.5px solid #fecaca", borderRadius: 6, fontSize: 11, cursor: "pointer" }}>
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            )}

            {/* Alle Markierungen */}
            <div style={{ background: "#fff", border: "0.5px solid #e2e8f0", borderRadius: 10, overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderBottom: "0.5px solid #f1f5f9" }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#374151" }}>Markierungen ({markierungen.length})</div>
                {markierungen.length > 0 && (
                  <button onClick={exportiereMarkierungen}
                    style={{ display: "flex", alignItems: "center", gap: 4, padding: "3px 8px", background: "#f8fafc", border: "0.5px solid #e2e8f0", borderRadius: 6, fontSize: 10, cursor: "pointer", color: "#374151" }}>
                    <Download size={10} /> Export
                  </button>
                )}
              </div>
              <div style={{ maxHeight: 400, overflowY: "auto" }}>
                {markierungen.length === 0 ? (
                  <div style={{ padding: 20, textAlign: "center", color: "#94a3b8", fontSize: 12 }}>
                    Noch keine Markierungen.<br />Ziehe auf der PDF-Seite.
                  </div>
                ) : (
                  markierungen.map(m => (
                    <div key={m.id} onClick={() => { setGewaehlteMarkierung(m.id); setAktiveSeite(m.seite); setKommentarText(m.kommentar || ""); }}
                      style={{ padding: "8px 12px", borderBottom: "0.5px solid #f1f5f9", cursor: "pointer",
                        background: gewaehlteMarkierung === m.id ? "#f8fafc" : "#fff" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{ width: 10, height: 10, borderRadius: 3, background: FARBEN.find(f => f.id === m.farbe)?.hex, flexShrink: 0 }} />
                        <span style={{ fontSize: 11, color: "#374151" }}>Seite {m.seite}</span>
                        <span style={{ fontSize: 10, color: "#94a3b8", marginLeft: "auto" }}>{m.erstellt}</span>
                      </div>
                      {m.kommentar && <div style={{ fontSize: 11, color: "#64748b", marginTop: 3, marginLeft: 16 }}>{m.kommentar}</div>}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <style>{"@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}"}</style>
    </div>
  );
}
