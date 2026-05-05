import { KURSE } from "@/pages/kurs/KursLanding";
import { Link } from "wouter";

const SLUGS = [
  "modul-1-immobilien-grundkurs",
  "modul-2-makler-34c",
  "modul-3-weg-verwalter",
  "modul-4-gutachter",
  "modul-5-34i-darlehensvermittler",
] as const;

const LIVE_URL = "https://immobilie-akademie-premium-production.up.railway.app";

export default function LandingPageAdmin() {
  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 20px" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: 28, fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>
          Landing Pages
        </h1>
        <p style={{ color: "#64748b", fontSize: 14, margin: 0 }}>
          5 Kurs-Landing-Pages — alle öffentlich erreichbar unter <code>/kurs/[slug]</code>
        </p>
      </div>

      <div style={{ display: "grid", gap: 14 }}>
        {SLUGS.map((slug) => {
          const kurs = KURSE[slug];
          if (!kurs) return null;
          const liveUrl = `${LIVE_URL}/kurs/${slug}`;
          const localUrl = `/kurs/${slug}`;
          return (
            <div key={slug} style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 14, padding: "20px 24px", display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 20, alignItems: "center" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 36 }}>{kurs.emoji}</div>
                <div style={{ background: "#dcfce7", color: "#166534", borderRadius: 20, padding: "2px 8px", fontSize: 10, fontWeight: 700, marginTop: 4 }}>LIVE</div>
              </div>
              <div>
                <div style={{ fontWeight: 700, color: "#0f172a", fontSize: 15, marginBottom: 4 }}>{kurs.titel}</div>
                <div style={{ fontSize: 12, color: "#64748b", marginBottom: 6 }}>
                  {kurs.tage} Lerntage · {kurs.ue} UE · {kurs.preis} €
                </div>
                <code style={{ fontSize: 11, color: "#94a3b8" }}>{liveUrl}</code>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 140 }}>
                <Link href={localUrl}>
                  <button style={{ width: "100%", background: "#2563eb", color: "white", border: "none", borderRadius: 8, padding: "8px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                    Vorschau
                  </button>
                </Link>
                <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                  <button style={{ width: "100%", background: "#f8fafc", color: "#374151", border: "1px solid #e2e8f0", borderRadius: 8, padding: "8px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                    Live öffnen
                  </button>
                </a>
                <button onClick={() => navigator.clipboard.writeText(liveUrl)}
                  style={{ width: "100%", background: "#f8fafc", color: "#374151", border: "1px solid #e2e8f0", borderRadius: 8, padding: "8px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                  URL kopieren
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 28, background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 12, padding: "16px 20px" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 8 }}>Gesamtübersicht</div>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {([["5", "Landing Pages"], [String(Object.values(KURSE).reduce((s, k) => s + k.ue, 0)), "Gesamt UE"], ["149–699 €", "Preisspanne"], ["Alle live", "Status"]] as [string,string][]).map(([value, label]) => (
            <div key={label}>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#0f172a", fontFamily: "Fraunces, Georgia, serif" }}>{value}</div>
              <div style={{ fontSize: 11, color: "#94a3b8" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
