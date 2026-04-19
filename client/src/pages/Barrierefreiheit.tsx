export default function Barrierefreiheit() {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px",
      fontFamily: "'Inter', sans-serif" }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, color: "#0f172a", marginBottom: 8 }}>
        Erklärung zur Barrierefreiheit
      </h1>
      <p style={{ color: "#64748b", marginBottom: 32 }}>
        Stand: April 2026 | Immobilien Akademie Smart
      </p>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", marginBottom: 12 }}>
          Konformitätsstatus
        </h2>
        <p style={{ color: "#475569", lineHeight: 1.7 }}>
          Dieses Portal bemüht sich um die Einhaltung der 
          <strong> WCAG 2.2 Stufe AA</strong> gemäß dem 
          Barrierefreiheitsstärkungsgesetz (BFSG) und dem 
          EU Accessibility Act.
        </p>
        <div style={{ background: "#fef9c3", border: "1px solid #fde047",
          borderRadius: 10, padding: 16, marginTop: 12 }}>
          <p style={{ color: "#713f12", fontSize: 14, margin: 0 }}>
            <strong>Teilweise konform:</strong> Das Portal erfüllt teilweise 
            die Anforderungen der WCAG 2.2 AA. Bekannte Einschränkungen 
            werden kontinuierlich behoben.
          </p>
        </div>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", marginBottom: 12 }}>
          Bekannte Einschränkungen
        </h2>
        <ul style={{ color: "#475569", lineHeight: 1.8, paddingLeft: 20 }}>
          <li>Dark Mode: noch nicht vollständig implementiert</li>
          <li>Einige Diagramme enthalten keine Textalternative</li>
          <li>Audio-Player: Untertitel für Video-Inhalte in Vorbereitung</li>
        </ul>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", marginBottom: 12 }}>
          Umgesetzte Maßnahmen
        </h2>
        <ul style={{ color: "#475569", lineHeight: 1.8, paddingLeft: 20 }}>
          <li>✅ Tastaturnavigation vollständig nutzbar</li>
          <li>✅ ARIA-Labels auf allen interaktiven Elementen</li>
          <li>✅ Fokus-Indikatoren sichtbar (outline: 3px solid #2563eb)</li>
          <li>✅ Sprachattribut gesetzt (lang="de")</li>
          <li>✅ Skip-Link "Zum Hauptinhalt" vorhanden</li>
          <li>✅ prefers-reduced-motion wird respektiert</li>
          <li>✅ Touch-Targets min. 44×44px</li>
          <li>✅ Kontrastverhältnis mind. 4.5:1 (WCAG AA)</li>
        </ul>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", marginBottom: 12 }}>
          Feedback & Kontakt
        </h2>
        <p style={{ color: "#475569", lineHeight: 1.7 }}>
          Wenn Sie Barrieren auf unserem Portal feststellen, kontaktieren Sie uns:
        </p>
        <p style={{ marginTop: 12 }}>
          <a href="mailto:support@immobilien-akademie-smart.de"
             style={{ color: "#2563eb", fontWeight: 600 }}>
            support@immobilien-akademie-smart.de
          </a>
          <br />
          <span style={{ color: "#64748b", fontSize: 14 }}>
            Antwort innerhalb von 5 Werktagen
          </span>
        </p>
      </section>

      <section>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", marginBottom: 12 }}>
          Durchsetzungsverfahren
        </h2>
        <p style={{ color: "#475569", lineHeight: 1.7, fontSize: 14 }}>
          Gemäß BFSG können Sie sich bei der zuständigen Durchsetzungsstelle 
          beschweren. Zuständige Stelle für private Anbieter: 
          Marktüberwachungsbehörden der Bundesländer.
        </p>
      </section>
    </div>
  );
}
