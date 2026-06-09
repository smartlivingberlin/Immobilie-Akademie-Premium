import { scaledFontSize as fz } from "@/lib/a11yFont";

/** Platzhalter im Videos-Tab, bis Live-Webinar-Aufzeichnungen eingestellt sind. */
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
      <p style={{ fontWeight: 700, color: "#7c3aed", marginBottom: 6, fontSize: fz(16) }}>
        Video-Tutorials — demnächst verfügbar
      </p>
      <p style={{ fontSize: fz(13), color: "#94a3b8", lineHeight: 1.6, margin: 0 }}>
        Die Live-Webinar-Aufzeichnungen werden nach Start der ersten Staffel (demnächst verfügbar) hier
        eingestellt. Bis dahin steht der KI-Tutor 24/7 zur Verfügung.
      </p>
    </div>
  );
}
