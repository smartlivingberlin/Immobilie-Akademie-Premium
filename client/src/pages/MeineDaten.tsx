import { useState, useEffect } from "react";
import { Link } from "wouter";

interface UserData {
  exportDate: string;
  user: any;
  learningProgress: any[];
  examHistory: any[];
  certificates: any[];
  aiConversations: { count: number; sessions: any[] };
  spacedRepetition: any[];
}

export default function MeineDaten() {
  const [data, setData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/user/my-data", { credentials: "include" })
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => { setError("Daten konnten nicht geladen werden."); setLoading(false); });
  }, []);

  const handleExport = async () => {
    setExporting(true);
    try {
      const res = await fetch("/api/user/export", { credentials: "include" });
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `meine_daten_${new Date().toISOString().slice(0,10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch { setError("Export fehlgeschlagen."); }
    setExporting(false);
  };

  const s = {
    page: { padding: "40px 24px", maxWidth: 800, margin: "0 auto",
      fontFamily: "'Inter', sans-serif", background: "var(--color-bg)",
      minHeight: "100vh", color: "var(--color-text)" },
    card: { background: "var(--color-card)", border: "1px solid var(--color-border)",
      borderRadius: 16, padding: "24px", marginBottom: 20 },
    h1: { fontSize: 28, fontWeight: 800, color: "var(--color-text)",
      margin: "0 0 6px", letterSpacing: "-0.02em" },
    h2: { fontSize: 16, fontWeight: 700, color: "var(--color-text)",
      margin: "0 0 16px", display: "flex", alignItems: "center", gap: 8 },
    row: { display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "10px 0", borderBottom: "1px solid var(--color-border)" },
    label: { fontSize: 13, color: "var(--color-text-muted)", fontWeight: 500 },
    value: { fontSize: 13, fontWeight: 600, color: "var(--color-text)" },
    badge: (n: number) => ({
      background: n > 0 ? "#dbeafe" : "#f1f5f9",
      color: n > 0 ? "#1d4ed8" : "#64748b",
      fontSize: 12, fontWeight: 700,
      padding: "2px 10px", borderRadius: 100,
    }),
  };

  if (loading) return (
    <div style={{ ...s.page, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "var(--color-text-muted)" }}>Daten werden geladen...</p>
    </div>
  );

  if (error) return (
    <div style={s.page}>
      <p style={{ color: "#dc2626" }}>{error}</p>
      <Link href="/statistiken"><a style={{ color: "#2563eb" }}>← Zurück</a></Link>
    </div>
  );

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <Link href="/statistiken">
          <a style={{ color: "var(--color-text-muted)", fontSize: 13, textDecoration: "none" }}>
            ← Zurück zum Dashboard
          </a>
        </Link>
        <h1 style={{ ...s.h1, marginTop: 16 }}>🔐 Meine Daten</h1>
        <p style={{ color: "var(--color-text-muted)", fontSize: 14, margin: "6px 0 0" }}>
          Auskunft gemäß <strong>Art. 15 DSGVO</strong> — alle über dich gespeicherten Daten
        </p>
      </div>

      {/* Export-Button */}
      <div style={{
        background: "linear-gradient(135deg, #eff6ff, #e0e7ff)",
        border: "1px solid #bfdbfe", borderRadius: 16, padding: 20,
        marginBottom: 24, display: "flex", justifyContent: "space-between",
        alignItems: "center", flexWrap: "wrap", gap: 12,
      }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#1e3a8a" }}>
            📤 Daten exportieren (Art. 20 DSGVO)
          </div>
          <div style={{ fontSize: 13, color: "#3730a3", marginTop: 4 }}>
            Download als JSON-Datei — alle deine Daten in maschinenlesbarem Format
          </div>
        </div>
        <button
          onClick={handleExport}
          disabled={exporting}
          style={{
            background: exporting ? "#94a3b8" : "#2563eb",
            color: "white", border: "none", borderRadius: 10,
            padding: "10px 20px", fontSize: 13, fontWeight: 700,
            cursor: exporting ? "not-allowed" : "pointer",
            transition: "background 0.2s",
          }}
        >
          {exporting ? "Wird exportiert..." : "⬇️ Meine Daten herunterladen"}
        </button>
      </div>

      {/* Account-Daten */}
      <div style={s.card}>
        <h2 style={s.h2}>👤 Account-Daten</h2>
        {[
          { l: "Name", v: data?.user?.name || "—" },
          { l: "E-Mail", v: data?.user?.email || "—" },
          { l: "Rolle", v: data?.user?.role || "user" },
          { l: "Registriert am", v: data?.user?.createdAt
            ? new Date(data.user.createdAt).toLocaleDateString("de-DE") : "—" },
          { l: "Letzter Login", v: data?.user?.lastSignedIn
            ? new Date(data.user.lastSignedIn).toLocaleDateString("de-DE") : "—" },
          { l: "Freigeschaltete Module", v: data?.user?.enabledModules || "keine" },
        ].map(({ l, v }) => (
          <div key={l} style={s.row}>
            <span style={s.label}>{l}</span>
            <span style={s.value}>{String(v)}</span>
          </div>
        ))}
      </div>

      {/* Lernfortschritt */}
      <div style={s.card}>
        <h2 style={s.h2}>
          📚 Lernfortschritt
          <span style={s.badge(data?.learningProgress?.length || 0)}>
            {data?.learningProgress?.length || 0} Einträge
          </span>
        </h2>
        <div style={s.row}>
          <span style={s.label}>Abgeschlossene Lerntage</span>
          <span style={s.value}>
            {data?.learningProgress?.filter((l: any) => l.completed).length || 0}
          </span>
        </div>
        <div style={s.row}>
          <span style={s.label}>Gesamte Lernzeit</span>
          <span style={s.value}>
            {Math.round((data?.learningProgress?.reduce(
              (s: number, l: any) => s + (l.durationSeconds || 0), 0) || 0) / 3600)}h
          </span>
        </div>
        <div style={{ ...s.row, borderBottom: "none" }}>
          <span style={s.label}>Genutzte Module</span>
          <span style={s.value}>
            {[...new Set(data?.learningProgress?.map((l: any) => l.moduleId))].join(", ") || "—"}
          </span>
        </div>
      </div>

      {/* Prüfungen */}
      <div style={s.card}>
        <h2 style={s.h2}>
          📝 Prüfungsverläufe
          <span style={s.badge(data?.examHistory?.length || 0)}>
            {data?.examHistory?.length || 0} Prüfungen
          </span>
        </h2>
        {data?.examHistory?.length === 0 && (
          <p style={{ color: "var(--color-text-muted)", fontSize: 13 }}>
            Noch keine Prüfungen abgelegt.
          </p>
        )}
        {data?.examHistory?.slice(0, 5).map((e: any, i: number) => (
          <div key={i} style={s.row}>
            <span style={s.label}>
              Modul {e.moduleId} —{" "}
              {e.startedAt ? new Date(e.startedAt).toLocaleDateString("de-DE") : "—"}
            </span>
            <span style={s.value}>
              {e.score}/{e.totalQuestions} Punkte
            </span>
          </div>
        ))}
      </div>

      {/* Zertifikate */}
      <div style={s.card}>
        <h2 style={s.h2}>
          🏆 Zertifikate
          <span style={s.badge(data?.certificates?.length || 0)}>
            {data?.certificates?.length || 0}
          </span>
        </h2>
        {data?.certificates?.length === 0 ? (
          <p style={{ color: "var(--color-text-muted)", fontSize: 13 }}>
            Noch keine Zertifikate erhalten.
          </p>
        ) : data?.certificates?.map((c: any, i: number) => (
          <div key={i} style={s.row}>
            <span style={s.label}>Modul {c.moduleId}</span>
            <span style={s.value}>Score: {c.score}%</span>
          </div>
        ))}
      </div>

      {/* KI-Gespräche */}
      <div style={s.card}>
        <h2 style={s.h2}>
          🤖 KI-Tutor Gespräche
          <span style={s.badge(data?.aiConversations?.count || 0)}>
            {data?.aiConversations?.count || 0}
          </span>
        </h2>
        <div style={s.row}>
          <span style={s.label}>Gespeicherte Gespräche</span>
          <span style={s.value}>{data?.aiConversations?.count || 0}</span>
        </div>
        <div style={{ ...s.row, borderBottom: "none" }}>
          <span style={s.label}>Inhalt der Gespräche</span>
          <span style={s.value}>In Export enthalten</span>
        </div>
      </div>

      {/* Rechte-Info */}
      <div style={{
        background: "#fffbeb", border: "1px solid #fde68a",
        borderRadius: 14, padding: 20, marginBottom: 20,
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#92400e", margin: "0 0 10px" }}>
          ⚖️ Deine DSGVO-Rechte
        </h3>
        <ul style={{ fontSize: 13, color: "#78350f", lineHeight: 1.8,
          paddingLeft: 16, margin: 0 }}>
          <li><strong>Art. 15</strong> — Auskunft: Diese Seite zeigt dir alle gespeicherten Daten</li>
          <li><strong>Art. 16</strong> — Berichtigung: Kontaktiere uns bei falschen Daten</li>
          <li><strong>Art. 17</strong> — Löschung: Konto löschen unter /konto-loeschen</li>
          <li><strong>Art. 20</strong> — Export: "Meine Daten herunterladen" oben</li>
        </ul>
      </div>

      {/* Konto löschen Link */}
      <div style={{
        background: "#fff1f2", border: "1px solid #fecdd3",
        borderRadius: 14, padding: 20,
        display: "flex", justifyContent: "space-between",
        alignItems: "center", flexWrap: "wrap", gap: 12,
      }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#be123c" }}>
            🗑️ Konto löschen (Art. 17 DSGVO)
          </div>
          <div style={{ fontSize: 12, color: "#9f1239", marginTop: 4 }}>
            Löscht alle deine Daten dauerhaft. Nicht rückgängig machbar.
          </div>
        </div>
        <Link href="/konto-loeschen">
          <a style={{
            background: "white", color: "#dc2626",
            border: "2px solid #dc2626", borderRadius: 10,
            padding: "8px 18px", fontSize: 13, fontWeight: 700,
            textDecoration: "none",
          }}>
            Konto löschen →
          </a>
        </Link>
      </div>

      <p style={{ color: "var(--color-text-muted)", fontSize: 11, marginTop: 24, textAlign: "center" }}>
        Datenabfrage: {data?.exportDate ? new Date(data.exportDate).toLocaleString("de-DE") : "—"} |
        Kontakt: support@immobilien-akademie-smart.de
      </p>
    </div>
  );
}
