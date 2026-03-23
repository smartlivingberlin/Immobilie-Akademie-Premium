import { useState } from "react";
import { Sparkles, Loader2, CheckCircle, XCircle, AlertTriangle, FileText } from "lucide-react";

const UEBUNGEN = [
  {
    id: 1,
    titel: "3-Zimmer-Wohnung Berlin-Mitte",
    schwierigkeit: "easy",
    immobilienDaten: `Objekt: Eigentumswohnung
Lage: Berlin-Mitte, Nähe Hackescher Markt
Wohnfläche: 78 qm
Zimmer: 3 (Wohnzimmer, 2 Schlafzimmer)
Etage: 3. OG von 5, mit Aufzug
Baujahr: 1987, kernsaniert 2018
Energieausweis: Bedarfsausweis, Energieträger Fernwärme
Energiekennwert: 85 kWh/m²a, Effizienzklasse C
Kaufpreis: 485.000 EUR
Ihre Courtage: 3,57% inkl. MwSt. vom Käufer
Besonderheiten: Balkon, Einbauküche, Tiefgaragenstellplatz`,
    hinweis: "Achte besonders auf alle GEG-Pflichtangaben und die korrekte Courtage-Angabe mit MwSt."
  },
  {
    id: 2,
    titel: "Einfamilienhaus Berlin-Zehlendorf",
    schwierigkeit: "medium",
    immobilienDaten: `Objekt: Freistehendes Einfamilienhaus
Lage: Berlin-Zehlendorf, ruhige Seitenstraße
Wohnfläche: 165 qm, Grundstück 620 qm
Zimmer: 5 + Arbeitszimmer
Baujahr: 1972, Dach erneuert 2020
Energieausweis: Verbrauchsausweis, Heizöl
Energiekennwert: 187 kWh/m²a, Effizienzklasse F
Kaufpreis: 890.000 EUR
Ihre Courtage: 3,57% inkl. MwSt. geteilt (Verkäufer und Käufer je 50%)
Besonderheiten: Garage, Keller, Garten, Kamin`,
    hinweis: "Bei Effizienzklasse F muss die Sanierungspflicht nach GEG erwähnt werden. Courtage-Teilung beachten."
  },
  {
    id: 3,
    titel: "Gewerbefläche Berlin-Kreuzberg",
    schwierigkeit: "hard",
    immobilienDaten: `Objekt: Ladenfläche/Büro im EG
Lage: Berlin-Kreuzberg, Belebte Hauptstraße
Fläche: 120 qm + 30 qm Lager
Baujahr: 1965, keine Kernsanierung
Energieausweis: Bedarfsausweis Nichtwohngebäude
Energiekennwert: 240 kWh/m²a, Effizienzklasse G
Nettokaltmiete: 2.800 EUR/Monat
Ihre Provision: 3 Nettokaltmieten + MwSt. vom Mieter
Besonderheiten: Schaufenster, Rollläden, WC, separater Eingang`,
    hinweis: "Gewerbefläche hat andere Regeln als Wohnraum. Bestellerprinzip gilt hier NICHT — Mieter zahlt Provision."
  },
];

const PFLICHT_LABELS: Record<string, string> = {
  energieausweis_typ: "Energieausweis-Typ",
  energietraeger: "Energieträger",
  baujahr: "Baujahr",
  energiekennwert: "Energiekennwert (kWh/m²a)",
  effizienzklasse: "Effizienzklasse (A+ bis H)",
  courtage: "Courtage inkl. MwSt.",
  wohnflaeche: "Wohn-/Nutzfläche (qm)",
  preis: "Kaufpreis oder Miete",
  lage: "Lage/Stadtteil",
  objektbeschreibung: "Objektbeschreibung",
};

export default function ExposeTrainer() {
  const [selected, setSelected] = useState(UEBUNGEN[0]);
  const [expose, setExpose] = useState("");
  const [loading, setLoading] = useState(false);
  const [bewertung, setBewertung] = useState<any>(null);
  const [showMuster, setShowMuster] = useState(false);

  const bewerten = async () => {
    if (expose.length < 50) return;
    setLoading(true);
    setBewertung(null);
    try {
      const res = await fetch("/api/ai/bewerte-expose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expose, immobilienDaten: selected.immobilienDaten }),
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

  const pflichtCount = bewertung ? Object.values(bewertung.pflichtangaben).filter(Boolean).length : 0;

  return (
    <div style={{ maxWidth: 950, margin: "0 auto", padding: "24px 20px" }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>Exposé-Trainer</h1>
        <p style={{ color: "#64748b", marginTop: 4, fontSize: 14 }}>Schreibe ein vollständiges Makler-Exposé — KI prüft alle 10 GEG-Pflichtangaben einzeln</p>
      </div>

      {/* Übung wählen */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 16 }}>
        {UEBUNGEN.map(u => (
          <div key={u.id} onClick={() => { setSelected(u); setExpose(""); setBewertung(null); setShowMuster(false); }}
            style={{ padding: "12px 14px", borderRadius: 10, cursor: "pointer",
              border: `0.5px solid ${selected.id === u.id ? "#2563eb" : "#e2e8f0"}`,
              background: selected.id === u.id ? "#eff6ff" : "#fff" }}>
            <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", marginBottom: 3 }}>
              Übung {u.id} · {u.schwierigkeit}
            </div>
            <div style={{ fontSize: 12, fontWeight: 500, color: selected.id === u.id ? "#1d4ed8" : "#374151" }}>{u.titel}</div>
          </div>
        ))}
      </div>

      {/* Immobilien-Daten */}
      <div style={{ background: "#f8fafc", border: "0.5px solid #e2e8f0", borderRadius: 12, padding: "14px 16px", marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".06em" }}>Immobilien-Daten für dein Exposé</div>
          <div style={{ fontSize: 11, padding: "2px 10px", background: "#fef3c7", color: "#92400e", borderRadius: 20, fontWeight: 500 }}>💡 {selected.hinweis}</div>
        </div>
        <pre style={{ fontSize: 12, color: "#374151", lineHeight: 1.7, margin: 0, fontFamily: "inherit", whiteSpace: "pre-wrap" }}>{selected.immobilienDaten}</pre>
      </div>

      {/* Exposé Eingabe */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
          Dein Exposé: <span style={{ fontWeight: 400, color: "#94a3b8" }}>({expose.length} Zeichen — mind. 200 für gutes Exposé)</span>
        </div>
        <textarea value={expose} onChange={e => setExpose(e.target.value)}
          placeholder={`Schreibe hier dein vollständiges Exposé für "${selected.titel}"...

Achte auf alle Pflichtangaben:
- Energieausweis-Typ und -Daten (GEG)
- Courtage mit MwSt.
- Wohnfläche, Preis, Lage
- Objektbeschreibung`}
          style={{ width: "100%", minHeight: 220, padding: "12px 14px", border: "0.5px solid #e2e8f0", borderRadius: 10, fontSize: 13, lineHeight: 1.7, resize: "vertical", fontFamily: "inherit" }}
        />
      </div>

      <button onClick={bewerten} disabled={loading || expose.length < 50}
        style={{ width: "100%", padding: 13, background: loading || expose.length < 50 ? "#94a3b8" : "#2563eb", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: loading || expose.length < 50 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 20 }}>
        {loading ? <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} /> : <Sparkles size={18} />}
        {loading ? "KI prüft alle Pflichtangaben..." : "Exposé von KI prüfen lassen"}
      </button>

      {/* Bewertung */}
      {bewertung && (
        <div style={{ background: "#fff", border: "0.5px solid #e2e8f0", borderRadius: 12, overflow: "hidden", marginBottom: 16 }}>
          {/* Score */}
          <div style={{ padding: "16px 18px", borderBottom: "0.5px solid #f1f5f9", display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 60, height: 60, borderRadius: 12, background: (NOTE_COLORS[bewertung.gesamtnote] || "#374151") + "15", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: NOTE_COLORS[bewertung.gesamtnote] || "#374151" }}>{bewertung.punkte}</div>
              <div style={{ fontSize: 9, color: "#94a3b8" }}>/ 100</div>
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, color: NOTE_COLORS[bewertung.gesamtnote] || "#374151" }}>{bewertung.gesamtnote}</div>
              <div style={{ fontSize: 12, color: "#64748b" }}>{pflichtCount} / 10 Pflichtangaben vorhanden</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ height: 8, background: "#f1f5f9", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", background: NOTE_COLORS[bewertung.gesamtnote] || "#374151", borderRadius: 4, width: `${pflichtCount * 10}%`, transition: "width 0.5s" }} />
              </div>
              <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 3 }}>Pflichtangaben-Checkliste</div>
            </div>
          </div>

          {/* Checkliste */}
          <div style={{ padding: "14px 18px", borderBottom: "0.5px solid #f1f5f9" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 10 }}>GEG Pflichtangaben-Checkliste</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
              {Object.entries(bewertung.pflichtangaben).map(([key, val]) => (
                <div key={key} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", borderRadius: 7,
                  background: val ? "#f0fdf4" : "#fef2f2",
                  border: `0.5px solid ${val ? "#bbf7d0" : "#fecaca"}` }}>
                  {val ? <CheckCircle size={14} color="#059669" /> : <XCircle size={14} color="#dc2626" />}
                  <span style={{ fontSize: 12, color: val ? "#166534" : "#991b1b", fontWeight: val ? 400 : 500 }}>
                    {PFLICHT_LABELS[key] || key}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Feedback */}
          <div style={{ padding: "14px 18px" }}>
            <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.7, marginBottom: 12 }}>{bewertung.feedback}</div>
            {bewertung.fehlendeAngaben?.length > 0 && (
              <div style={{ padding: "10px 12px", background: "#fff7ed", borderRadius: 8, border: "0.5px solid #fed7aa", marginBottom: 10 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#9a3412", marginBottom: 5, display: "flex", alignItems: "center", gap: 5 }}>
                  <AlertTriangle size={12} /> Fehlende Pflichtangaben
                </div>
                {bewertung.fehlendeAngaben.map((f: string, i: number) => (
                  <div key={i} style={{ fontSize: 12, color: "#92400e", marginBottom: 2 }}>• {f}</div>
                ))}
              </div>
            )}
            {bewertung.rechtlicheRisiken && (
              <div style={{ padding: "10px 12px", background: "#fef2f2", borderRadius: 8, border: "0.5px solid #fecaca", marginBottom: 10 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#991b1b", marginBottom: 5 }}>⚖️ Rechtliche Risiken</div>
                <div style={{ fontSize: 12, color: "#7f1d1d" }}>{bewertung.rechtlicheRisiken}</div>
              </div>
            )}
            <div style={{ padding: "10px 12px", background: "#f0fdf4", borderRadius: 8, border: "0.5px solid #bbf7d0" }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#166534", marginBottom: 5 }}>✨ Verbesserungsvorschläge</div>
              <div style={{ fontSize: 12, color: "#14532d" }}>{bewertung.verbesserungen}</div>
            </div>
          </div>
        </div>
      )}
      <style>{"@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}"}</style>
    </div>
  );
}
