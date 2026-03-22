import { useState } from "react";
import { Sparkles, Loader2, CheckCircle, BookOpen, Star } from "lucide-react";

const FALLSTUDIEN = [
  {
    id: 1,
    modul: 2,
    titel: "Familie Müller kauft eine Eigentumswohnung",
    schwierigkeit: "medium",
    aufgabe: `Familie Müller möchte eine 3-Zimmer-Eigentumswohnung in Berlin-Mitte kaufen. Die Wohnung kostet 450.000 EUR. Sie beauftragen Sie als Makler.

Beantworten Sie folgende Fragen:
1. Welche Unterlagen benötigen Sie als Makler vor der Vermarktung?
2. Wie hoch ist Ihre maximale Courtage und wer zahlt diese?
3. Welche Pflichtangaben müssen im Exposé enthalten sein?
4. Was müssen Sie nach dem GwG beachten?
5. Welche Schritte sind bis zum Notartermin nötig?`,
    musterantwort: `1. Grundbuchauszug, Teilungserklärung, Energieausweis, letzte 3 Hausgeldabrechnungen, Wirtschaftsplan, Protokoll letzte ETV
2. Max. 3,57% inkl. MwSt. vom Käufer (seit 2020 max. 50% der Gesamtcourtage wenn Verkäufer Auftraggeber)
3. Energieausweis-Pflichtangaben nach GEG: Art, Energieträger, Baujahr, Energiekennwert, Effizienzklasse
4. GwG: Identifizierung beider Vertragsparteien, Risikoanalyse, bei Verdacht Meldung an FIU
5. Reservierungsvereinbarung, Finanzierungsbestätigung, Notartermin vereinbaren, Kaufvertragsentwurf prüfen`,
  },
  {
    id: 2,
    modul: 3,
    titel: "WEG-Streit: Sondereigentum oder Gemeinschaftseigentum?",
    schwierigkeit: "hard",
    aufgabe: `In einer WEG mit 12 Einheiten möchte Eigentümer Herr Bauer auf eigene Kosten seine Balkontür gegen eine Terrassentür austauschen. Die anderen Eigentümer sind dagegen.

Beantworten Sie:
1. Ist die Balkontür Sonder- oder Gemeinschaftseigentum?
2. Darf Herr Bauer die Änderung ohne Beschluss vornehmen?
3. Welchen Beschluss bräuchte er und welche Mehrheit ist nötig?
4. Was sind die Konsequenzen wenn er es ohne Beschluss macht?
5. Als Verwalter — was empfehlen Sie der Gemeinschaft?`,
    musterantwort: `1. Balkontür ist Gemeinschaftseigentum (Außenfassade, §5 WEG) — nur das Innere der Wohnung ist Sondereigentum
2. Nein — bauliche Veränderungen am Gemeinschaftseigentum brauchen Beschluss (§20 WEG)
3. Einfacher Mehrheitsbeschluss reicht für privilegierte Maßnahmen; sonst qualifizierte Mehrheit (2/3 + 50% MEA)
4. Beseitigungsanspruch der Gemeinschaft, Schadensersatz, Kosten trägt Herr Bauer allein
5. ETV einberufen, Beschluss fassen, Kosten-Nutzen klären, Architekten für Planung beauftragen`,
  },
  {
    id: 3,
    modul: 4,
    titel: "Verkehrswertermittlung Mehrfamilienhaus",
    schwierigkeit: "hard",
    aufgabe: `Sie sollen den Verkehrswert eines Mehrfamilienhauses in Berlin ermitteln.
Angaben: Baujahr 1985, 6 Wohnungen, Gesamtmietfläche 480 qm, Jahresnettomiete 57.600 EUR, Bewirtschaftungskosten 25%, Liegenschaftszinssatz 3,5%, Restnutzungsdauer 35 Jahre, Bodenwert 280.000 EUR.

Aufgabe:
1. Welches Verfahren ist hier anzuwenden und warum?
2. Berechnen Sie den Reinertrag
3. Berechnen Sie den Barwertfaktor (Vervielfältiger)
4. Berechnen Sie den Ertragswert
5. Was ist der Verkehrswert (gerundet)?`,
    musterantwort: `1. Ertragswertverfahren — da vermietetes Renditeobjekt, Ertrag steht im Vordergrund
2. Rohertrag 57.600 EUR × (1 - 0,25) = Reinertrag 43.200 EUR
3. Barwertfaktor = [1 - (1+0,035)^-35] / 0,035 = [1 - 0,2965] / 0,035 = 20,09
4. Gebäudeertragswert = 43.200 × 20,09 = 867.888 EUR; Ertragswert = 867.888 + 280.000 = 1.147.888 EUR
5. Verkehrswert gerundet: 1.150.000 EUR`,
  },
];

export default function Fallstudien() {
  const [selected, setSelected] = useState(FALLSTUDIEN[0]);
  const [antwort, setAntwort] = useState("");
  const [loading, setLoading] = useState(false);
  const [bewertung, setBewertung] = useState<{note: string; punkte: number; feedback: string; staerken: string; verbesserungen: string} | null>(null);

  const bewerten = async () => {
    if (!antwort.trim() || antwort.length < 50) return;
    setLoading(true);
    setBewertung(null);
    try {
      const res = await fetch("/api/ai/bewerte-fallstudie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          aufgabe: selected.aufgabe,
          musterantwort: selected.musterantwort,
          nutzerAntwort: antwort,
          modul: selected.modul,
        }),
      });
      const data = await res.json();
      if (data.success) setBewertung(data.bewertung);
    } catch {}
    finally { setLoading(false); }
  };

  const NOTE_COLORS: Record<string, string> = {
    "Sehr gut": "#059669", "Gut": "#2563eb", "Befriedigend": "#d97706",
    "Ausreichend": "#f59e0b", "Mangelhaft": "#dc2626",
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 20px" }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>Fallstudien & Praxisaufgaben</h1>
        <p style={{ color: "#64748b", marginTop: 4, fontSize: 14 }}>Praxisnahe IHK-Fälle lösen — KI bewertet deine Antwort mit Note und Feedback</p>
      </div>

      {/* Fallstudie wählen */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 20 }}>
        {FALLSTUDIEN.map(f => (
          <div key={f.id} onClick={() => { setSelected(f); setAntwort(""); setBewertung(null); }}
            style={{ padding: "12px 14px", borderRadius: 10, cursor: "pointer", border: `0.5px solid ${selected.id === f.id ? "#2563eb" : "#e2e8f0"}`,
              background: selected.id === f.id ? "#eff6ff" : "#fff" }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: "#94a3b8", marginBottom: 4, textTransform: "uppercase" }}>
              M{f.modul} · {f.schwierigkeit}
            </div>
            <div style={{ fontSize: 12, fontWeight: 500, color: selected.id === f.id ? "#1d4ed8" : "#374151", lineHeight: 1.4 }}>{f.titel}</div>
          </div>
        ))}
      </div>

      {/* Aufgabe */}
      <div style={{ background: "#f8fafc", border: "0.5px solid #e2e8f0", borderRadius: 12, padding: "16px 18px", marginBottom: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 8 }}>Aufgabe</div>
        <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{selected.aufgabe}</div>
      </div>

      {/* Antwort-Eingabe */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Deine Antwort:</div>
        <textarea
          value={antwort}
          onChange={e => setAntwort(e.target.value)}
          placeholder="Schreibe deine vollständige Antwort hier... (mindestens 50 Zeichen)"
          style={{ width: "100%", minHeight: 180, padding: "12px 14px", border: "0.5px solid #e2e8f0", borderRadius: 10, fontSize: 13, lineHeight: 1.7, resize: "vertical", fontFamily: "inherit" }}
        />
        <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }}>{antwort.length} Zeichen</div>
      </div>

      <button onClick={bewerten} disabled={loading || antwort.length < 50}
        style={{ width: "100%", padding: 13, background: loading || antwort.length < 50 ? "#94a3b8" : "#7c3aed", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: loading || antwort.length < 50 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 20 }}>
        {loading ? <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} /> : <Sparkles size={18} />}
        {loading ? "KI bewertet deine Antwort..." : "Antwort von KI bewerten lassen"}
      </button>

      {/* Bewertung */}
      {bewertung && (
        <div style={{ background: "#fff", border: "0.5px solid #e2e8f0", borderRadius: 12, overflow: "hidden" }}>
          <div style={{ padding: "16px 18px", borderBottom: "0.5px solid #f1f5f9", display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 56, height: 56, borderRadius: 12, background: (NOTE_COLORS[bewertung.note] || "#374151") + "15", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: NOTE_COLORS[bewertung.note] || "#374151" }}>{bewertung.punkte}</div>
              <div style={{ fontSize: 9, color: "#94a3b8" }}>/ 100</div>
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: NOTE_COLORS[bewertung.note] || "#374151" }}>{bewertung.note}</div>
              <div style={{ fontSize: 12, color: "#64748b" }}>IHK-Bewertung</div>
            </div>
          </div>
          <div style={{ padding: "16px 18px" }}>
            <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.7, marginBottom: 14 }}>{bewertung.feedback}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div style={{ padding: "10px 12px", background: "#f0fdf4", borderRadius: 8, border: "0.5px solid #bbf7d0" }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#166534", marginBottom: 4 }}>Stärken</div>
                <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.6 }}>{bewertung.staerken}</div>
              </div>
              <div style={{ padding: "10px 12px", background: "#fff7ed", borderRadius: 8, border: "0.5px solid #fed7aa" }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#9a3412", marginBottom: 4 }}>Verbesserungen</div>
                <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.6 }}>{bewertung.verbesserungen}</div>
              </div>
            </div>
          </div>
        </div>
      )}
      <style>{"@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }"}</style>
    </div>
  );
}
