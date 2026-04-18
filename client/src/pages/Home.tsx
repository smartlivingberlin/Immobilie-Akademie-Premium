import { Link } from "wouter";
import { SEO } from "@/components/SEO";
import { TrialForm } from "@/components/TrialForm";

// ── Daten ────────────────────────────────────────────────────
const STATS = [
  { zahl: "855+", label: "IHK-Prüfungsfragen", sub: "geprüft & aktuell" },
  { zahl: "240", label: "Strukturierte Lerntage", sub: "5 vollständige Module" },
  { zahl: "3", label: "KI-Modelle", sub: "Claude · Gemini · Groq" },
  { zahl: "24/7", label: "Tutor verfügbar", sub: "keine Wartezeiten" },
];

const MODULE_DATA = [
  {
    id: 1, emoji: "🏠", farbe: "#2563eb", bgFarbe: "#dbeafe",
    slug: "modul-1-immobilien-grundkurs",
    name: "Modul 1: Immobilien-Grundkurs",
    kurz: "Das Fundament",
    preis: 149,
    tage: 20, ue: 160,
    headline: "Das Fundament jeder Immobilienkarriere",
    beschreibung: "Grundstücks- und Immobilienrecht, Marktkunde, Grundbuch, Baurecht, Wertermittlung — alles was jeder Immobilienfachmann wissen muss. Pflichtbasis für alle weiteren Module.",
    inhalte: ["§ 94 BGB: Grundstücke & Gebäude", "Grundbuch lesen & verstehen", "Baurecht & Bebauungsplan", "Immobilienmarkt & Akteure", "Erste Wertermittlung", "IHK-Prüfungssimulation"],
    fuer: "Quereinsteiger, Auszubildende, Interessierte",
    keywords: "Immobilien Grundkurs, Grundbuch lernen, Immobilienrecht Einsteiger",
  },
  {
    id: 2, emoji: "🔑", farbe: "#b45309", bgFarbe: "#fef3c7",
    slug: "modul-2-makler-34c",
    name: "Modul 2: Immobilienmakler §34c GewO",
    kurz: "Die Lizenz zum Vermitteln",
    preis: 499,
    tage: 60, ue: 480,
    headline: "Die IHK-Sachkundeprüfung §34c GewO bestehen",
    beschreibung: "Maklerrecht, Provision, Exposé-Pflichten, Kaufvertrag, Geldwäschegesetz, Bestellerprinzip — alles für die IHK-Sachkundeprüfung. Mit 300+ spezifischen Prüfungsfragen und geplanten Live-Webinaren (ab Sommer 2026).",
    inhalte: ["§34c GewO Erlaubnis & Voraussetzungen", "Maklervertrag & Provisionsrecht", "Bestellerprinzip seit 2020", "GwG: Geldwäscheprävention", "Exposé-Pflichtangaben EnEV/GEG", "Kaufvertragsrecht & Notar", "DSGVO im Maklerbetrieb", "300+ IHK-Prüfungsfragen"],
    fuer: "Angehende Makler, Quereinsteiger in die Vermittlung",
    keywords: "§34c GewO Prüfung, Immobilienmakler IHK, Makler Sachkunde, Makler Lizenz",
  },
  {
    id: 3, emoji: "🏢", farbe: "#4338ca", bgFarbe: "#e0e7ff",
    slug: "modul-3-weg-verwalter",
    name: "Modul 3: WEG-Verwalter & Mietrecht",
    kurz: "Professionelle Hausverwaltung",
    preis: 699,
    tage: 80, ue: 640,
    headline: "WEG-Reform 2020 & Mietrecht meistern",
    beschreibung: "WEG-Modernisierungsgesetz 2020, Eigentümerversammlung, Jahresabrechnung, Nebenkostenabrechnung, Mietrecht §535ff BGB, Verwaltervertrag — die umfassendste WEG-Ausbildung online.",
    inhalte: ["WEMoG 2020: Alle Änderungen", "Eigentümerversammlung leiten", "Wirtschaftsplan & Jahresabrechnung", "Erhaltungsrücklage verwalten", "Nebenkostenabrechnung §2 BetrKV", "Mietrecht §535ff BGB", "Verwaltervertrag & Haftung", "Pflichtweiterbildung §26a WEG"],
    fuer: "Angehende Verwalter, Makler mit Verwaltungsmandat",
    keywords: "WEG Verwalter Ausbildung, Hausverwaltung lernen, Wohnungseigentum Kurs, §26a WEG",
  },
  {
    id: 4, emoji: "📊", farbe: "#059669", bgFarbe: "#d1fae5",
    slug: "modul-4-gutachter",
    name: "Modul 4: Immobilienbewertung & Gutachter",
    kurz: "Werte ermitteln wie ein Profi",
    preis: 399,
    tage: 40, ue: 320,
    headline: "Alle 3 Wertermittlungsverfahren nach ImmoWertV 2021",
    beschreibung: "Vergleichswertverfahren, Ertragswertverfahren, Sachwertverfahren — methodisch und praxisnah. Mit HypZert-Vorbereitung, Beleihungswertermittlung und realen Berechnungsübungen.",
    inhalte: ["ImmoWertV 2021 vollständig", "Vergleichswertverfahren", "Ertragswertverfahren & Liegenschaftszins", "Sachwertverfahren & Alterswertminderung", "Beleihungswert für Banken", "HypZert-Vorbereitung", "Gutachtenaufbau & Rechtssicherheit", "Rechnerische Übungsaufgaben"],
    fuer: "Makler, Banker, Sachverständige, HypZert-Kandidaten",
    keywords: "Immobilienbewertung Kurs, ImmoWertV 2021, Gutachter Ausbildung, Sachwert Ertragswert",
  },
  {
    id: 5, emoji: "💶", farbe: "#7c3aed", bgFarbe: "#ede9fe",
    slug: "modul-5-34i-darlehensvermittler",
    name: "Modul 5: Darlehensvermittler §34i GewO",
    kurz: "Finanzierung als Karriere",
    preis: 499,
    tage: 40, ue: 320,
    headline: "Die IHK-Sachkundeprüfung §34i GewO bestehen",
    beschreibung: "Annuitätendarlehen, KfW-Förderprogramme 2025, ESIS-Merkblatt, EU-Wohnimmobilienkreditrichtlinie (EU-WIKR), Tilgungsstrategien — für die Lizenz als Immobilienfinanzierungsberater.",
    inhalte: ["§34i GewO Erlaubnisvoraussetzungen", "Annuitätendarlehen berechnen", "KfW-Programme 2025 aktuell", "EU-WIKR & ESIS-Merkblatt", "Beleihungsauslauf & Eigenkapital", "Zinsbindung & Prolongation", "Sondertilgungsrechte §489 BGB", "EU-konforme Beratungsprotokolle"],
    fuer: "Makler mit Finanzierungsmandat, Bankmitarbeiter, Quereinsteiger",
    keywords: "§34i GewO Prüfung, Darlehensvermittler IHK, Immobilienfinanzierung Kurs, KfW 2025",
  },
];

const PAKETE = [
  { id: "starter", name: "Starter-Paket", module: [1,2], preis: 549, einzeln: 648, tag: null, farbe: "#2563eb", emoji: "⚡" },
  { id: "verwalter", name: "Verwalter-Paket", module: [1,3], preis: 749, einzeln: 848, tag: null, farbe: "#4338ca", emoji: "🏢" },
  { id: "gutachter", name: "Gutachter-Paket", module: [1,2,4], preis: 999, einzeln: 1047, tag: null, farbe: "#059669", emoji: "📊" },
  { id: "makler-plus", name: "Makler-Plus", module: [1,2,5], preis: 1049, einzeln: 1147, tag: "Doppellizenz", farbe: "#7c3aed", emoji: "🎯" },
  { id: "profi", name: "Immobilienprofi", module: [1,2,3], preis: 1199, einzeln: 1347, tag: "Empfohlen", farbe: "#dc2626", emoji: "⭐" },
  { id: "komplett", name: "Komplett-Ausbildung", module: [1,2,3,4,5], preis: 1955, einzeln: 2245, tag: "Bestes Preis-Leistungs", farbe: "#d4a853", emoji: "👑" },
];

const USPS = [
  { icon: "📋", titel: "855+ IHK-orientierte Übungsfragen", text: "Alle Fragen am IHK-Format orientiert (Multiple Choice, 4 Optionen). Mit ausführlicher Erklärung warum A richtig und B falsch ist." },
  { icon: "📋", titel: "855+ IHK-orientierte Übungsfragen", text: "Alle Fragen am IHK-Format orientiert (Multiple Choice, 4 Optionen). Mit ausführlicher Erklärung warum A richtig und B falsch ist." },
  { icon: "🔬", titel: "Praxis-Lab & Dokumentenarbeit", text: "Offene Fragen mit KI-Bewertung. Echte Muster-Grundbuchauszüge, Kaufverträge, WEG-Protokolle zum Analysieren." },
  { icon: "📅", titel: "240 strukturierte Lerntage", text: "Kein Chaos, kein Raten. Täglich 30-45 Minuten, klarer Aufbau, messbarer Fortschritt. Wie ein Stundenplan — nur flexibler." },
  { icon: "🏆", titel: "IHK-Prüfungssimulation", text: "IHK-orientiertes Prüfungsformat mit Zeitdruck, Auswertung und Schwächenanalyse. Weißt genau ob du bereit bist." },
  { icon: "📱", titel: "100% digital, 100% flexibel", text: "Browser auf PC, Mac, Tablet, Smartphone. Kein Download, kein Installationsaufwand. Überall lernen wo du bist." },
  { icon: "🔒", titel: "DSGVO-konform & sicher", text: "Server in der EU, verschlüsselte Verbindung, keine Datenweitergabe an Dritte. Geprüfte Datensicherheit." },
  { icon: "♾️", titel: "Lebenslanger Zugang", text: "Einmal kaufen, immer nutzen. Keine Abo-Falle, keine Verlängerungsgebühren. Das Material steht dir dauerhaft zur Verfügung." },
];

const FAQ_ITEMS = [
  { f: "Wie unterscheidet sich die Immobilien Akademie Smart von anderen Anbietern?", a: "Drei Alleinstellungsmerkmale: (1) Drei KI-Modelle als 24/7-Tutor. (2) 855+ IHK-orientierte Übungsfragen mit Erklärungen. (3) Praxis-Lab mit offenen Fragen und echter Dokumentenarbeit." },
  { f: "Bin ich nach dem Kurs wirklich auf die IHK-Prüfung vorbereitet?", a: "Ja — das ist unser Hauptziel. Die Prüfungssimulation ist eng am IHK-Format orientiert (Multiple Choice, 72 Fragen, Zeitlimit). Die offenen Fragen trainieren schriftliche Begründungsaufgaben. Unsere Inhalte orientieren sich am IHK-Stoffkatalog für §34c und §34i GewO." },
  { f: "Kann ich mehrere Module gleichzeitig belegen?", a: "Ja. Du kannst alle Module gleichzeitig kaufen (Komplett-Paket spart 290 EUR) oder einzeln nacheinander. Empfohlen: Modul 1 zuerst als Basis, dann die Fachmodule." },
  { f: "Wann ist die Weiterbildungspflicht nach MaBV relevant?", a: "Wenn du bereits §34c-Lizenz hast, musst du alle 3 Jahre 20 Stunden Weiterbildung nachweisen (§15b MaBV). Die Inhalte von Modul 1 + 2 decken die relevanten Themen ab. Für den offiziellen Nachweis gegenüber der IHK ist nach ZFU-Zulassung (beantragt) ein anerkanntes Zertifikat erforderlich." },
  { f: "Kann ich das Portal über Bildungsgutschein oder Förderung finanzieren?", a: "Nach Abschluss unserer AZAV-Zertifizierung (in Vorbereitung) wird das Portal vollständig über Bildungsgutscheine der Bundesagentur für Arbeit förderbar. Selbstzahler können die Kosten steuerlich als Weiterbildungskosten absetzen." },
  { f: "Gibt es Live-Webinare?", a: "Live-Webinare sind ab Staffel 1 (geplant: Sommer 2026) geplant. Bis dahin steht der KI-Tutor 24/7 zur Verfügung — er beantwortet jede Fachfrage sofort, ohne Wartezeit." },
];

const s: Record<string, React.CSSProperties> = {
  page: { background: "#f8fafc", fontFamily: "'DM Sans', system-ui, sans-serif" },
  // Hero
  hero: { background: "linear-gradient(135deg, #0c1220 0%, #1a2540 50%, #0f172a 100%)", padding: "80px 20px 100px", position: "relative", overflow: "hidden" },
  heroBadge: { display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(37,99,235,0.2)", border: "1px solid rgba(96,165,250,0.3)", borderRadius: 20, padding: "6px 16px", fontSize: 12, fontWeight: 700, color: "#93c5fd", letterSpacing: "0.08em", marginBottom: 24 },
  heroH1: { fontSize: "clamp(32px,5vw,60px)", fontWeight: 900, color: "#f8fafc", lineHeight: 1.15, marginBottom: 20, letterSpacing: "-0.02em" },
  heroSub: { fontSize: "clamp(16px,2vw,20px)", color: "#94a3b8", lineHeight: 1.6, maxWidth: 580, marginBottom: 36 },
  btn: { display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg, #2563eb, #7c3aed)", color: "white", border: "none", borderRadius: 12, padding: "14px 28px", fontSize: 16, fontWeight: 700, cursor: "pointer", textDecoration: "none" },
  btnGhost: { display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: "#94a3b8", border: "1px solid rgba(148,163,184,0.3)", borderRadius: 12, padding: "14px 28px", fontSize: 15, fontWeight: 600, cursor: "pointer", textDecoration: "none" },
  // Sections
  section: { padding: "80px 20px" },
  sectionAlt: { padding: "80px 20px", background: "white" },
  inner: { maxWidth: 1200, margin: "0 auto" },
  sectionLabel: { fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", color: "#2563eb", textTransform: "uppercase" as const, marginBottom: 12 },
  sectionH2: { fontSize: "clamp(26px,4vw,42px)", fontWeight: 800, color: "#0f172a", lineHeight: 1.2, marginBottom: 16 },
  sectionSub: { fontSize: 17, color: "#64748b", lineHeight: 1.7, maxWidth: 600 },
  // Cards
  card: { background: "white", border: "1px solid #e2e8f0", borderRadius: 16, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.05)" },
};

import { useSocialProof } from "@/hooks/useSocialProof";

export default function Home() {
  const stats = useSocialProof();

  return (
    <div style={s.page}>
      <SEO
        title="Immobilien Akademie Smart — IHK §34c §34i WEG-Verwalter Online-Vorbereitung"
        description="Umfassende Online-Vorbereitung für IHK-Sachkundeprüfungen. §34c Makler, §34i Darlehensvermittler, WEG-Verwalter, Gutachter. 855+ Prüfungsfragen, KI-Tutor, 240 Lerntage. Ab 149 EUR inkl. MwSt."
        keywords="§34c GewO Prüfung, §34i GewO Kurs, WEG Verwalter Ausbildung, Immobilienmakler IHK, Darlehensvermittler Sachkunde, Immobilien Weiterbildung online, IHK Sachkundeprüfung vorbereitung"
      />

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section style={s.hero}>
        {/* Hintergrund-Gitter */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(37,99,235,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.05) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
        
        <div style={{ ...s.inner, position: "relative" }}>
          <div style={{ maxWidth: 740 }}>
            <div style={s.heroBadge}>
              🎓 IHK-konforme Online-Vorbereitung · Deutschland
            </div>
            <h1 style={s.heroH1}>
              Deine IHK-Lizenz für<br />
              <span style={{ background: "linear-gradient(135deg, #60a5fa, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                die Immobilienwirtschaft
              </span>
            </h1>
            <p style={s.heroSub}>
              §34c Makler · §34i Darlehensvermittler · WEG-Verwalter · Gutachter — 
              alle 5 Berufsbilder in einem Portal. Mit KI-Tutor, 855+ Prüfungsfragen
              und strukturierten 240 Lerntagen.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 48 }}>
              <Link href="/kurs/modul-1-immobilien-grundkurs">
                <a style={s.btn}>24h kostenlos testen →</a>
              </Link>
              <Link href="/kurse">
                <a style={s.btnGhost}>Alle Module ansehen</a>
              </Link>
            </div>

            {/* Trust-Zeile */}
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              {["✓ IHK-Prüfungsformat", "✓ KI-Tutor 24/7", "✓ Lebenslanger Zugang", "✓ 24h Trial verfügbar"].map(t => (
                <span key={t} style={{ fontSize: 13, color: "#64748b", fontWeight: 500 }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────────────── */}
      <section style={{ ...s.sectionAlt, padding: "48px 20px" }}>
        <div style={{ ...s.inner, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
          {STATS.map(stat => (
            <div key={stat.label} style={{ textAlign: "center", padding: "20px 12px" }}>
              <div style={{ fontSize: 44, fontWeight: 900, color: "#2563eb", lineHeight: 1, marginBottom: 6 }}>
                {stat.zahl}
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", marginBottom: 2 }}>{stat.label}</div>
              <div style={{ fontSize: 12, color: "#94a3b8" }}>{stat.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ALLE 5 MODULE ──────────────────────────────────────── */}
      <section style={s.section}>
        <div style={s.inner}>
          <div style={{ marginBottom: 48 }}>
            <div style={s.sectionLabel}>5 Berufsbilder · 1 Portal</div>
            <h2 style={s.sectionH2}>Welche Lizenz willst du?</h2>
            <p style={s.sectionSub}>
              Vom Grundkurs bis zur Komplett-Ausbildung — jedes Modul ist 
              für sich vollständig und IHK-prüfungsrelevant.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {MODULE_DATA.map((m, i) => (
              <div key={m.id} style={{
                ...s.card,
                display: "grid",
                gridTemplateColumns: "auto 1fr auto",
                gap: 24,
                alignItems: "start",
                borderLeft: `4px solid ${m.farbe}`,
              }}>
                {/* Nummer + Emoji */}
                <div style={{ textAlign: "center", minWidth: 64 }}>
                  <div style={{ fontSize: 40, marginBottom: 4 }}>{m.emoji}</div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: m.farbe, letterSpacing: "0.1em" }}>
                    M{m.id}
                  </div>
                </div>

                {/* Inhalt */}
                <div>
                  <div style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 11, background: m.bgFarbe, color: m.farbe, padding: "3px 10px", borderRadius: 6, fontWeight: 700 }}>
                      {m.tage} Tage · {m.ue} UE
                    </span>
                    <span style={{ fontSize: 11, color: "#94a3b8" }}>{m.fuer}</span>
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 800, color: "#0f172a", marginBottom: 6 }}>{m.name}</h3>
                  <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.6, marginBottom: 12 }}>{m.beschreibung}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {m.inhalte.slice(0, 4).map(inhalt => (
                      <span key={inhalt} style={{ fontSize: 11, background: "#f8fafc", border: "1px solid #e2e8f0", color: "#475569", padding: "3px 10px", borderRadius: 6 }}>
                        ✓ {inhalt}
                      </span>
                    ))}
                    {m.inhalte.length > 4 && (
                      <span style={{ fontSize: 11, color: "#94a3b8" }}>+{m.inhalte.length - 4} weitere</span>
                    )}
                  </div>
                </div>

                {/* Preis + CTA */}
                <div style={{ textAlign: "right", minWidth: 140 }}>
                  <div style={{ fontSize: 32, fontWeight: 900, color: "#0f172a", marginBottom: 2 }}>{m.preis} €</div>
                  <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 12 }}>Einmalzahlung</div>
                  <Link href={`/kurs/${m.slug}`}>
                    <a style={{
                      display: "block", background: m.farbe, color: "white",
                      borderRadius: 10, padding: "10px 16px", fontSize: 13,
                      fontWeight: 700, textDecoration: "none", textAlign: "center",
                      marginBottom: 6,
                    }}>
                      Kurs kaufen →
                    </a>
                  </Link>
                  <Link href={`/kurs/${m.slug}`}>
                    <a style={{ fontSize: 12, color: "#64748b", textDecoration: "none" }}>
                      Details ansehen
                    </a>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAKETE ─────────────────────────────────────────────── */}
      <section style={{ ...s.sectionAlt }}>
        <div style={s.inner}>
          <div style={{ marginBottom: 48 }}>
            <div style={s.sectionLabel}>Kombinations-Angebote</div>
            <h2 style={s.sectionH2}>Mehrere Module — weniger zahlen</h2>
            <p style={s.sectionSub}>
              Kombiniere die richtigen Module für dein Karriereziel und spare bis zu 290 EUR.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginBottom: 24 }}>
            {PAKETE.map(p => {
              const ersparnis = p.einzeln - p.preis;
              const pct = Math.round(ersparnis / p.einzeln * 100);
              const stats = useSocialProof();

  return (
                <div key={p.id} style={{
                  ...s.card,
                  border: p.tag === "Empfohlen" ? `2px solid ${p.farbe}` : "1px solid #e2e8f0",
                  position: "relative",
                  boxShadow: p.tag === "Empfohlen" ? `0 8px 32px ${p.farbe}25` : s.card.boxShadow,
                }}>
                  {p.tag && (
                    <div style={{
                      position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)",
                      background: p.farbe, color: "white", borderRadius: 20,
                      padding: "3px 14px", fontSize: 11, fontWeight: 800, whiteSpace: "nowrap",
                    }}>{p.tag}</div>
                  )}
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{p.emoji}</div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: "#0f172a", marginBottom: 4 }}>{p.name}</h3>
                  <div style={{ fontSize: 12, color: "#64748b", marginBottom: 16 }}>
                    {p.module.map(m => `M${m}`).join(" + ")} · {p.module.length} Module
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                      <span style={{ fontSize: 32, fontWeight: 900, color: "#0f172a" }}>
                        {p.preis.toLocaleString("de-DE")} €
                      </span>
                      <span style={{ fontSize: 13, color: "#94a3b8", textDecoration: "line-through" }}>
                        {p.einzeln.toLocaleString("de-DE")} €
                      </span>
                    </div>
                    <div style={{ fontSize: 12, color: "#059669", fontWeight: 700 }}>
                      Du sparst {ersparnis} € ({pct}% Rabatt)
                    </div>
                  </div>
                  <Link href="/pakete">
                    <a style={{
                      display: "block", background: p.farbe, color: "white",
                      borderRadius: 10, padding: "10px", fontSize: 13,
                      fontWeight: 700, textDecoration: "none", textAlign: "center",
                    }}>
                      Paket kaufen →
                    </a>
                  </Link>
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: "center" }}>
            <Link href="/pakete">
              <a style={{ fontSize: 14, color: "#2563eb", fontWeight: 600, textDecoration: "none" }}>
                Alle 6 Pakete vergleichen →
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* ── USPs ───────────────────────────────────────────────── */}
      <section style={s.section}>
        <div style={s.inner}>
          <div style={{ marginBottom: 48 }}>
            <div style={s.sectionLabel}>Warum Immobilien Akademie Smart</div>
            <h2 style={s.sectionH2}>Das gibt es kein zweites Mal</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            {USPS.map(u => (
              <div key={u.titel} style={{ ...s.card, padding: 24 }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{u.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "#0f172a", marginBottom: 8 }}>{u.titel}</h3>
                <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, margin: 0 }}>{u.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STORYTELLING LERNWEG ───────────────────────────────── */}
      <section style={{ ...s.sectionAlt }}>
        <div style={s.inner}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 40, alignItems: "center" }}>
            <div>
              <div style={s.sectionLabel}>So funktioniert es</div>
              <h2 style={s.sectionH2}>Von Null zur IHK-Prüfung in 48 Tagen</h2>
              <p style={{ fontSize: 16, color: "#475569", lineHeight: 1.7, marginBottom: 32 }}>
                Kein Präsenzkurs, keine festen Zeiten, keine 2.000 EUR Seminargebühr. 
                Lerne wenn du willst, so schnell du willst — mit KI die immer da ist.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[
                  { schritt: "01", titel: "Modul kaufen & sofort loslegen", text: "Kauf abschließen → Account erstellt → Modul freigeschaltet. Noch am selben Tag mit Lernen beginnen." },
                  { schritt: "02", titel: "Täglich 30-45 Minuten lernen", text: "Jeden Tag ein strukturierter Lerntag: Theorie, Rechtsnormen, Praxis-Aufgaben, Quiz. Der KI-Tutor erklärt alles." },
                  { schritt: "03", titel: "Praxis-Lab: Offene Fragen üben", text: "Freitext-Antworten schreiben, KI bewertet sofort. Echte Musterdokumente analysieren. IHK-Prüfungsreife entwickeln." },
                  { schritt: "04", titel: "Prüfungssimulation & IHK anmelden", text: "Vollständige Probeprüfung im IHK-Format. Score prüfen, Lücken schließen, echte Prüfung bestehen." },
                ].map(s2 => (
                  <div key={s2.schritt} style={{ display: "flex", gap: 16 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: "#dbeafe", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "#2563eb", flexShrink: 0 }}>
                      {s2.schritt}
                    </div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", marginBottom: 3 }}>{s2.titel}</div>
                      <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.5 }}>{s2.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trial-Formular */}
            <div style={{ ...s.card, background: "linear-gradient(135deg, #0f172a, #1e293b)", border: "none" }}>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: "white", marginBottom: 8 }}>
                24h kostenlos testen
              </h3>
              <p style={{ fontSize: 14, color: "#94a3b8", marginBottom: 24, lineHeight: 1.6 }}>
                24h Testzugang — alle Module testen, ohne Kreditkarte.
              </p>
              <TrialForm />
              <p style={{ fontSize: 11, color: "#64748b", marginTop: 16, textAlign: "center" }}>
                Kein Abo · Keine Kreditkarte · Einmalzahlung
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ZIELGRUPPEN ───────────────────────────────────────── */}
      <section style={s.section}>
        <div style={s.inner}>
          <div style={{ marginBottom: 48 }}>
            <div style={s.sectionLabel}>Für wen ist das Portal?</div>
            <h2 style={s.sectionH2}>Dein Karriereziel — unser Programm</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {[
              { ziel: "Du willst Makler werden", text: "§34c GewO Erlaubnis benötigt IHK-Sachkundeprüfung. Modul 1 + 2 bereiten dich vollständig vor. Starter-Paket: 549 EUR inkl. MwSt..", empfehlung: "Starter-Paket", href: "/pakete", icon: "🔑" },
              { ziel: "Du willst WEG-Verwalter werden", text: "WEMoG 2020 hat neue Anforderungen gebracht. Modul 3 deckt alles ab — inkl. Pflichtweiterbildung §26a WEG.", empfehlung: "Verwalter-Paket", href: "/pakete", icon: "🏢" },
              { ziel: "Du willst Immobilienfinanzierer werden", text: "§34i GewO IHK-Sachkunde für Darlehensvermittler. Modul 5 bereitet gezielt vor — inkl. KfW 2025.", empfehlung: "Modul 5", href: "/kurs/modul-5-34i-darlehensvermittler", icon: "💶" },
              { ziel: "Du hast bereits §34c und willst Wert ermitteln", text: "ImmoWertV 2021, alle 3 Verfahren, HypZert-Vorbereitung. Modul 4 macht dich zum Gutachten-Profi.", empfehlung: "Gutachter-Paket", href: "/pakete", icon: "📊" },
              { ziel: "Du willst alle Lizenzen", text: "Makler + Verwalter + Gutachter + Finanzierung. Die Komplett-Ausbildung ist das vollständigste Immobilien-Bildungspaket am Markt.", empfehlung: "Komplett 1.955 €", href: "/pakete", icon: "👑" },
              { ziel: "Du erfüllst MaBV-Weiterbildungspflicht", text: "Als bestehender §34c-Makler brauchst du alle 3 Jahre 20 Stunden. Modul 1 bereitet auf die MaBV-Pflichtweiterbildung vor.", empfehlung: "Modul 1: 149 €", href: "/kurs/modul-1-immobilien-grundkurs", icon: "📋" },
            ].map(z => (
              <div key={z.ziel} style={{ ...s.card, padding: 24 }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{z.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "#0f172a", marginBottom: 8 }}>{z.ziel}</h3>
                <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, marginBottom: 16 }}>{z.text}</p>
                <Link href={z.href}>
                  <a style={{ fontSize: 13, color: "#2563eb", fontWeight: 700, textDecoration: "none" }}>
                    → {z.empfehlung}
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────── */}
      <section style={{ ...s.sectionAlt }}>
        <div style={s.inner}>
          <div style={{ marginBottom: 48 }}>
            <div style={s.sectionLabel}>Häufige Fragen</div>
            <h2 style={s.sectionH2}>Alles was du wissen musst</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 800 }}>
            {FAQ_ITEMS.map(item => (
              <details key={item.f} style={{ ...s.card, padding: 0, overflow: "hidden" }}>
                <summary style={{ padding: "18px 24px", cursor: "pointer", fontSize: 15, fontWeight: 700, color: "#0f172a", listStyle: "none", display: "flex", justifyContent: "space-between" }}>
                  {item.f}
                  <span style={{ color: "#2563eb", flexShrink: 0, marginLeft: 12 }}>+</span>
                </summary>
                <div style={{ padding: "0 24px 18px", fontSize: 14, color: "#475569", lineHeight: 1.7, borderTop: "1px solid #f1f5f9" }}>
                  <div style={{ marginTop: 12 }}>{item.a}</div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────────── */}
      <section style={{ background: "linear-gradient(135deg, #0f172a, #1e3a5f)", padding: "80px 20px" }}>
        <div style={{ ...s.inner, textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, color: "white", marginBottom: 16 }}>
            Deine IHK-Lizenz wartet
          </h2>
          <p style={{ fontSize: 17, color: "#94a3b8", marginBottom: 36, maxWidth: 500, margin: "0 auto 36px" }}>
            Starte heute mit dem 24h-Testzugang. Kein Abo, keine Kreditkarte.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/kurs/modul-1-immobilien-grundkurs">
              <a style={s.btn}>24h kostenlos testen →</a>
            </Link>
            <Link href="/kurse">
              <a style={s.btnGhost}>Alle Module & Preise</a>
            </Link>
          </div>
          <p style={{ fontSize: 12, color: "#64748b", marginTop: 24 }}>
            Berlin · Deutschland · DSGVO-konform · SSL-verschlüsselt
          </p>
        </div>
      </section>
    </div>
  );
}
