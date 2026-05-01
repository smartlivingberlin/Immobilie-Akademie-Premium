import { useState } from "react";
import { Link } from "wouter";
import { FileText, ChevronRight, CheckCircle2, Brain, ExternalLink } from "lucide-react";

const MODUL_NAMES: Record<number, string> = {
  1: "Grundkurs", 2: "Makler §34c", 3: "WEG-Verwalter", 4: "Gutachter", 5: "§34i",
};

interface DokumentUebung {
  id: string;
  titel: string;
  beschreibung: string;
  dokumentTyp: string;
  dokumentUrl: string;   // öffentliche Muster-PDF URL
  aufgaben: { nr: number; frage: string; punkte: number }[];
  schwierigkeit: "leicht" | "mittel" | "schwer";
  modulId: number;
}

// Muster-Dokumente von öffentlichen Quellen
const UEBUNGEN: DokumentUebung[] = [
  {
    id: "gb-1",
    modulId: 1,
    titel: "Grundbuchauszug lesen & analysieren",
    beschreibung: "Analysieren Sie einen realen Muster-Grundbuchauszug und beantworten Sie Fragen zu Eigentümer, Lasten und Grundpfandrechten.",
    dokumentTyp: "Grundbuchauszug",
    dokumentUrl: "https://www.sparkasse-leipzig.de/content/dam/myif/sksk-leipzig/work/dokumente/pdf/baufinanzierung/muster-grundbuchauszug.pdf",
    schwierigkeit: "leicht",
    aufgaben: [
      { nr: 1, frage: "Wer ist der eingetragene Eigentümer laut Abteilung I?", punkte: 2 },
      { nr: 2, frage: "Welche Lasten und Beschränkungen sind in Abteilung II eingetragen? Erklären Sie deren Bedeutung.", punkte: 3 },
      { nr: 3, frage: "Welche Grundpfandrechte stehen in Abteilung III und was bedeuten sie für einen Käufer?", punkte: 3 },
      { nr: 4, frage: "Würden Sie Ihrem Kunden empfehlen, diese Immobilie zu kaufen? Begründen Sie!", punkte: 2 },
    ],
  },
  {
    id: "kv-1",
    modulId: 2,
    titel: "Kaufvertrag prüfen — Risiken erkennen",
    beschreibung: "Prüfen Sie einen Muster-Kaufvertrag auf kritische Klauseln, Haftungsrisiken und fehlende Pflichtangaben.",
    dokumentTyp: "Kaufvertrag",
    dokumentUrl: "https://www.baupilot.com/Files.ashx?File=5a12ecf8-6cb0-4b21-b009-52d3941f2a26.pdf",
    schwierigkeit: "mittel",
    aufgaben: [
      { nr: 1, frage: "Identifizieren Sie mindestens 3 wichtige Klauseln im Kaufvertrag und erklären Sie deren Bedeutung.", punkte: 3 },
      { nr: 2, frage: "Welche Gewährleistungsregelungen enthält der Vertrag? Sind diese käuferfreundlich oder verkäuferfreundlich?", punkte: 3 },
      { nr: 3, frage: "Was passiert laut Vertrag bei Zahlungsverzug des Käufers?", punkte: 2 },
      { nr: 4, frage: "Welche Fragen würden Sie als Makler vor der Unterzeichnung noch stellen?", punkte: 2 },
    ],
  },
  {
    id: "wb-1",
    modulId: 3,
    titel: "WEG-Eigentümerversammlung: Protokoll analysieren",
    beschreibung: "Analysieren Sie ein Muster-Protokoll einer Eigentümerversammlung auf Formfehler, Beschlussfähigkeit und Abstimmungsergebnisse.",
    dokumentTyp: "Versammlungsprotokoll",
    dokumentUrl: "https://www.homeday.de/de/musterdokumente/antrag-grundbuchauszug.pdf",
    schwierigkeit: "mittel",
    aufgaben: [
      { nr: 1, frage: "War die Eigentümerversammlung ordnungsgemäß einberufen? Nennen Sie die gesetzlichen Anforderungen nach WEG.", punkte: 3 },
      { nr: 2, frage: "Welche Beschlüsse wurden gefasst? Waren sie beschlussfähig (einfache oder qualifizierte Mehrheit)?", punkte: 3 },
      { nr: 3, frage: "Welche Formalfehler könnten die Beschlüsse anfechtbar machen?", punkte: 2 },
      { nr: 4, frage: "Wer hätte das Recht, diese Beschlüsse anzufechten und wie?", punkte: 2 },
    ],
  },
  {
    id: "ew-1",
    modulId: 4,
    titel: "Ertragswertermittlung durchführen",
    beschreibung: "Führen Sie eine vollständige Ertragswertermittlung für ein Mehrfamilienhaus durch. Alle notwendigen Daten sind im Dokument enthalten.",
    dokumentTyp: "Wertermittlung",
    dokumentUrl: "https://www.sparkasse-leipzig.de/content/dam/myif/sksk-leipzig/work/dokumente/pdf/baufinanzierung/muster-grundbuchauszug.pdf",
    schwierigkeit: "schwer",
    aufgaben: [
      { nr: 1, frage: "Berechnen Sie den Jahresrohertrag aus den gegebenen Mieteinnahmen.", punkte: 2 },
      { nr: 2, frage: "Ermitteln Sie den Jahresreinertrag unter Berücksichtigung der Bewirtschaftungskosten (30%).", punkte: 2 },
      { nr: 3, frage: "Bestimmen Sie den Vervielfältiger bei einem Liegenschaftszins von 4% und 35 Jahren Restnutzungsdauer.", punkte: 3 },
      { nr: 4, frage: "Berechnen Sie den Ertragswert und beurteilen Sie, ob der geforderte Kaufpreis von 850.000 EUR angemessen ist.", punkte: 3 },
    ],
  },
  {
    id: "esis-1",
    modulId: 5,
    titel: "ESIS-Merkblatt verstehen & prüfen",
    beschreibung: "Analysieren Sie ein ESIS-Merkblatt (Europäisches Standardisiertes Informationsblatt) für eine Immobilienfinanzierung.",
    dokumentTyp: "ESIS-Merkblatt",
    dokumentUrl: "https://www.homeday.de/de/musterdokumente/antrag-grundbuchauszug.pdf",
    schwierigkeit: "mittel",
    aufgaben: [
      { nr: 1, frage: "Welche Pflichtangaben muss ein ESIS-Merkblatt nach EU-WIKR enthalten? Sind alle vorhanden?", punkte: 3 },
      { nr: 2, frage: "Berechnen Sie die monatliche Rate und den effektiven Jahreszins aus den angegebenen Konditionen.", punkte: 3 },
      { nr: 3, frage: "Welche Risiken muss der Berater dem Kunden laut ESIS erläutern?", punkte: 2 },
      { nr: 4, frage: "Wann muss das ESIS-Merkblatt dem Kunden übergeben werden?", punkte: 2 },
    ],
  },
];

export default function DokumentWerkstatt({ modulId }: { modulId: number }) {
  const [aktiv, setAktiv] = useState<string | null>(null);
  const [antworten, setAntworten] = useState<Record<number, string>>({});
  const [abgegeben, setAbgegeben] = useState(false);

  const uebungen = UEBUNGEN.filter(u => u.modulId === modulId);
  const aktiveUebung = UEBUNGEN.find(u => u.id === aktiv);

  // ── LISTE ─────────────────────────────────────────────────────
  if (!aktiv) return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "24px 16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <div style={{
          width: 48, height: 48, borderRadius: 12,
          background: "linear-gradient(135deg,#0ea5e9,#2563eb)",
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <FileText size={24} color="white" />
        </div>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: 0 }}>
            Dokument-Werkstatt
          </h1>
          <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>
            {MODUL_NAMES[modulId]} · Echte Dokumente lesen & analysieren
          </p>
        </div>
      </div>

      {/* Erklärung */}
      <div style={{
        background: "#f0f9ff", border: "1px solid #bae6fd",
        borderRadius: 12, padding: "14px 18px", marginBottom: 24,
        fontSize: 13, color: "#0369a1", lineHeight: 1.6
      }}>
        <strong>So funktioniert die Werkstatt:</strong> Jede Übung zeigt ein echtes Muster-Dokument 
        aus der Immobilienpraxis. Du liest es, beantwortest Fragen — und checkst dann deine 
        Antworten mit der Musterlösung. Ideal als Ergänzung zu den Multiple-Choice-Fragen.
      </div>

      {uebungen.length === 0 ? (
        <div style={{ textAlign: "center", padding: 48, color: "#94a3b8" }}>
          Für dieses Modul noch keine Übungen vorhanden.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {uebungen.map(u => (
            <div key={u.id}
              onClick={() => { setAktiv(u.id); setAntworten({}); setAbgegeben(false); }}
              style={{
                background: "white", border: "1px solid #e2e8f0",
                borderRadius: 12, padding: "18px 20px", cursor: "pointer",
                display: "flex", alignItems: "flex-start", gap: 16,
                transition: "all 0.15s",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "#0ea5e9";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(14,165,233,0.12)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "#e2e8f0";
                e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
              }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                background: "#f0f9ff", display: "flex", alignItems: "center",
                justifyContent: "center",
              }}>
                <FileText size={22} color="#0ea5e9" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>
                  {u.titel}
                </div>
                <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.5, marginBottom: 8 }}>
                  {u.beschreibung}
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <span style={{
                    fontSize: 11, fontWeight: 700, padding: "2px 10px", borderRadius: 6,
                    background: u.schwierigkeit === "leicht" ? "#dcfce7" : u.schwierigkeit === "schwer" ? "#fee2e2" : "#fef3c7",
                    color: u.schwierigkeit === "leicht" ? "#16a34a" : u.schwierigkeit === "schwer" ? "#dc2626" : "#d97706",
                  }}>{u.schwierigkeit}</span>
                  <span style={{ fontSize: 11, color: "#64748b" }}>📄 {u.dokumentTyp}</span>
                  <span style={{ fontSize: 11, color: "#64748b" }}>{u.aufgaben.length} Aufgaben</span>
                  <span style={{ fontSize: 11, color: "#64748b" }}>
                    {u.aufgaben.reduce((s, a) => s + a.punkte, 0)} Punkte
                  </span>
                </div>
              </div>
              <ChevronRight size={18} color="#94a3b8" style={{ flexShrink: 0, marginTop: 4 }} />
            </div>
          ))}
        </div>
      )}

      {/* Link zu offenem Fragen */}
      <div style={{ marginTop: 24, textAlign: "center" }}>
      </div>
    </div>
  );

  // ── ÜBUNG ─────────────────────────────────────────────────────
  if (!aktiveUebung) return null;
  const gesamtPunkte = aktiveUebung.aufgaben.reduce((s, a) => s + a.punkte, 0);

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "16px" }}>
      {/* Topbar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <button onClick={() => setAktiv(null)}
          style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: 13 }}>
          ← Zurück zur Übersicht
        </button>
        <span style={{ fontSize: 13, color: "#94a3b8" }}>{aktiveUebung.dokumentTyp} · {gesamtPunkte} Punkte</span>
      </div>

      {/* 2-Spalten Layout: Dokument links, Fragen rechts */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "start" }}>

        {/* LINKE SPALTE: Dokument */}
        <div style={{ position: "sticky", top: 16 }}>
          <div style={{
            background: "white", border: "1px solid #e2e8f0",
            borderRadius: 12, overflow: "hidden"
          }}>
            <div style={{
              padding: "12px 16px", borderBottom: "1px solid #f1f5f9",
              display: "flex", justifyContent: "space-between", alignItems: "center"
            }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#374151" }}>
                📄 {aktiveUebung.dokumentTyp}
              </span>
              <a href={aktiveUebung.dokumentUrl} target="_blank" rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", gap: 4,
                  fontSize: 11, color: "#0ea5e9", textDecoration: "none", fontWeight: 600
                }}>
                <ExternalLink size={12} /> Vollbild öffnen
              </a>
            </div>
            <iframe
              src={aktiveUebung.dokumentUrl}
              style={{ width: "100%", height: "70vh", border: "none", display: "block" }}
              title={aktiveUebung.titel}
            />
            <div style={{ padding: "8px 16px", background: "#fafafa", fontSize: 11, color: "#94a3b8" }}>
              ⚠️ Musterdokument zu Lernzwecken · Alle Daten sind fiktiv
            </div>
          </div>
        </div>

        {/* RECHTE SPALTE: Aufgaben */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{
            background: "white", border: "1px solid #e2e8f0",
            borderRadius: 12, padding: "16px 20px"
          }}>
            <h2 style={{ fontSize: 16, fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>
              {aktiveUebung.titel}
            </h2>
            <p style={{ fontSize: 13, color: "#64748b", margin: 0, lineHeight: 1.5 }}>
              {aktiveUebung.beschreibung}
            </p>
          </div>

          {/* Aufgaben */}
          {aktiveUebung.aufgaben.map(a => (
            <div key={a.nr} style={{
              background: "white", border: "1px solid #e2e8f0",
              borderRadius: 12, padding: "16px 20px"
            }}>
              <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 6, flexShrink: 0,
                  background: abgegeben && antworten[a.nr]?.trim().length > 0 ? "#dcfce7" : "#f1f5f9",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 800,
                  color: abgegeben && antworten[a.nr]?.trim().length > 0 ? "#16a34a" : "#475569",
                }}>
                  {abgegeben && antworten[a.nr]?.trim().length > 0 ? "✓" : a.nr}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", lineHeight: 1.4 }}>
                    {a.frage}
                  </div>
                  <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>
                    {a.punkte} {a.punkte === 1 ? "Punkt" : "Punkte"}
                  </div>
                </div>
              </div>
              <textarea
                disabled={abgegeben}
                value={antworten[a.nr] ?? ""}
                onChange={e => setAntworten(prev => ({ ...prev, [a.nr]: e.target.value }))}
                rows={4}
                placeholder="Deine Antwort…"
                style={{
                  width: "100%", border: "1.5px solid #e2e8f0", borderRadius: 8,
                  padding: "10px 12px", fontSize: 13, lineHeight: 1.6,
                  resize: "vertical", outline: "none", fontFamily: "inherit",
                  background: abgegeben ? "#f8fafc" : "white",
                  boxSizing: "border-box",
                  transition: "border-color 0.15s",
                }}
                onFocus={e => { if (!abgegeben) e.target.style.borderColor = "#0ea5e9"; }}
                onBlur={e => { e.target.style.borderColor = "#e2e8f0"; }}
              />
            </div>
          ))}

          {/* Abgabe-Button */}
          {!abgegeben ? (
            <button
              onClick={() => setAbgegeben(true)}
              disabled={Object.keys(antworten).length < aktiveUebung.aufgaben.length ||
                Object.values(antworten).some(v => v.trim().length < 5)}
              style={{
                padding: "14px",
                background: Object.keys(antworten).length >= aktiveUebung.aufgaben.length
                  ? "linear-gradient(135deg,#0ea5e9,#2563eb)"
                  : "#e2e8f0",
                color: Object.keys(antworten).length >= aktiveUebung.aufgaben.length ? "white" : "#94a3b8",
                border: "none", borderRadius: 10, fontSize: 14,
                fontWeight: 700, cursor: "pointer", width: "100%",
              }}
            >
              Alle Antworten abgeben & Selbstcheck starten →
            </button>
          ) : (
            <div style={{
              background: "#f0fdf4", border: "1px solid #bbf7d0",
              borderRadius: 12, padding: "16px 20px"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <CheckCircle2 size={20} color="#16a34a" />
                <span style={{ fontSize: 15, fontWeight: 700, color: "#16a34a" }}>
                  Abgegeben! Jetzt Selbstcheck durchführen:
                </span>
              </div>
              <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: "#374151", lineHeight: 2 }}>
                <li>Vergleiche deine Antworten mit dem Dokument nochmals</li>
                <li>Nutze den <strong>KI-Tutor</strong> für tiefere Erklärungen</li>
                
              </ul>
              <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
                <button
                  onClick={() => { setAktiv(null); setAbgegeben(false); }}
                  style={{
                    flex: 1, padding: "10px", background: "#f1f5f9",
                    border: "none", borderRadius: 8, fontSize: 13,
                    fontWeight: 600, cursor: "pointer", color: "#374151"
                  }}
                >← Zur Übersicht</button>
                <button
                  onClick={() => { setAntworten({}); setAbgegeben(false); }}
                  style={{
                    flex: 1, padding: "10px",
                    background: "linear-gradient(135deg,#0ea5e9,#2563eb)",
                    border: "none", borderRadius: 8, fontSize: 13,
                    fontWeight: 700, cursor: "pointer", color: "white"
                  }}
                >🔄 Nochmal versuchen</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
