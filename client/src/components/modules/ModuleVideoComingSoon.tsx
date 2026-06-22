import { scaledFontSize as fz } from "@/lib/a11yFont";

/** Platzhalter im Videos-Tab mit ehrlicher Rahmung bis Live-Webinar-Aufzeichnungen verfügbar sind. */
export function ModuleVideoComingSoon() {
  return (
    <div
      className="learning-text-scale"
      style={{
        background: "#faf5ff",
        border: "1px solid #e9d5ff",
        borderRadius: 12,
        padding: "24px",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: fz(40), marginBottom: 12 }} aria-hidden>
        🎬
      </div>
      <h3
        style={{
          fontWeight: 700,
          color: "#7c3aed",
          margin: "0 0 12px",
          fontSize: fz(16),
        }}
      >
        Video-Tutorials
      </h3>
      <p style={{ fontSize: fz(13), color: "#64748b", lineHeight: 1.6, margin: "0 0 10px" }}>
        Die ersten Video-Aufzeichnungen entstehen im Rahmen der Live-Webinar-Staffel und werden hier
        ergänzt, sobald sie verfügbar sind.
      </p>
      <p style={{ fontSize: fz(13), color: "#94a3b8", lineHeight: 1.6, margin: 0 }}>
        Alle Lerninhalte — Theorie, Rechtsgrundlagen, Praxisaufgaben, Quiz und KI-Tutor — stehen
        bereits vollständig zur Verfügung.
      </p>
    </div>
  );
}
