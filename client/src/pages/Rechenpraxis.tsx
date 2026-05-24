import { useState, useRef, useEffect, useMemo } from "react";
import { Calculator, ChevronRight, ChevronDown, Send, RotateCcw, CheckCircle2, ArrowLeft, BookOpen, Lightbulb, MessageCircle } from "lucide-react";
import { LoadingHandler } from "@/components/LoadingHandler";
import { SkeletonCard } from "@/components/ui/SkeletonCard";
import { SkeletonText } from "@/components/ui/SkeletonText";

// ─── TYPEN ───────────────────────────────────────────────────────────────────

interface Schritt {
  nr: number;
  kontext: string;
  formel: string;
  variablen: { kuerzel: string; bedeutung: string; wert?: string }[];
  aufgabe: string;
  einheit: string;
  korrekt: number;
  toleranz?: number;
  tipp: string;
}

interface Aufgabe {
  id: number;
  bereich: string;
  titel: string;
  berufssituation: string;
  was_lerne_ich: string;
  schritte: Schritt[];
  abschluss: string;
  gesetze: string[];
  praxistipp: string;
}

// ─── AUFGABEN-DATEN ──────────────────────────────────────────────────────────


// ─── AUFGABEN-DATEN (lazy geladen) ───────────────────────────────────────────
// BEREICHE wird dynamisch aus AUFGABEN-State berechnet

// ─── KI-ASSISTENT ────────────────────────────────────────────────────────────

interface KiNachricht { rolle: "user" | "assistant"; text: string }

function KiAssistent({ aufgabe }: { aufgabe: Aufgabe }) {
  const [offen, setOffen] = useState(false);
  const [nachrichten, setNachrichten] = useState<KiNachricht[]>([]);
  const [eingabe, setEingabe] = useState("");
  const [laden, setLaden] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [nachrichten]);

  const sende = async () => {
    if (!eingabe.trim() || laden) return;
    const frage = eingabe.trim();
    setEingabe("");
    setNachrichten(prev => [...prev, { rolle: "user", text: frage }]);
    setLaden(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `Du bist ein geduldiger Lern-Assistent für Immobilienwirtschaft. Du erklärst Konzepte für Quereinsteiger — einfach, klar, ohne Fachjargon. Aktuelle Aufgabe: "${aufgabe.titel}" im Bereich "${aufgabe.bereich}". Kontext: ${aufgabe.berufssituation}. Antworte auf Deutsch, max. 4 Sätze, verständlich für absolute Anfänger.`,
          messages: [
            ...nachrichten.map(n => ({ role: n.rolle === "user" ? "user" : "assistant", content: n.text })),
            { role: "user", content: frage }
          ]
        })
      });
      const data = await res.json();
      const antwort = data.content?.[0]?.text || "Entschuldigung, ich konnte keine Antwort generieren.";
      setNachrichten(prev => [...prev, { rolle: "assistant", text: antwort }]);
    } catch {
      setNachrichten(prev => [...prev, { rolle: "assistant", text: "Verbindungsfehler. Bitte versuche es erneut." }]);
    }
    setLaden(false);
  };

  return (
    <div style={{ border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-lg)", overflow: "hidden" }}>
      <button onClick={() => setOffen(!offen)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.875rem 1.25rem", background: "var(--color-background-secondary)", border: "none", cursor: "pointer", color: "var(--color-text-primary)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <MessageCircle size={16} style={{ color: "var(--color-text-info)" }} aria-hidden="true" />
          <span style={{ fontSize: 14, fontWeight: 500 }}>Frage stellen — KI-Assistent</span>
          {nachrichten.length > 0 && <span style={{ fontSize: 11, background: "var(--color-background-info)", color: "var(--color-text-info)", borderRadius: "var(--border-radius-md)", padding: "2px 8px" }}>{nachrichten.filter(n => n.rolle === "user").length} Fragen</span>}
        </div>
        <ChevronDown size={16} style={{ transform: offen ? "rotate(180deg)" : "none", transition: "transform 0.2s", color: "var(--color-text-secondary)" }} aria-hidden="true" />
      </button>

      {offen && (
        <div style={{ padding: "1rem 1.25rem" }}>
          {nachrichten.length === 0 && (
            <p style={{ fontSize: 13, color: "var(--color-text-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
              Haben Sie eine Frage zur Formel, zum Rechenweg oder zum Hintergrund? Fragen Sie einfach — ich erkläre es verständlich.
            </p>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: nachrichten.length > 0 ? "1rem" : 0, maxHeight: 300, overflowY: "auto" }}>
            {nachrichten.map((n, i) => (
              <div key={i} style={{ display: "flex", justifyContent: n.rolle === "user" ? "flex-end" : "flex-start" }}>
                <div style={{ maxWidth: "85%", padding: "10px 14px", borderRadius: "var(--border-radius-md)", background: n.rolle === "user" ? "var(--color-background-info)" : "var(--color-background-secondary)", fontSize: 14, lineHeight: 1.6, color: "var(--color-text-primary)" }}>
                  {n.text}
                </div>
              </div>
            ))}
            {laden && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{ padding: "10px 14px", borderRadius: "var(--border-radius-md)", background: "var(--color-background-secondary)", fontSize: 14, color: "var(--color-text-tertiary)" }}>
                  Denke nach...
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <input value={eingabe} onChange={e => setEingabe(e.target.value)} onKeyDown={e => e.key === "Enter" && sende()} placeholder="Ihre Frage..." style={{ flex: 1, fontSize: 14 }} />
            <button onClick={sende} disabled={!eingabe.trim() || laden} style={{ padding: "8px 14px", borderRadius: "var(--border-radius-md)", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 14 }}>
              <Send size={14} aria-hidden="true" /> Senden
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── AUFGABEN-ANSICHT ─────────────────────────────────────────────────────────

function AufgabenAnsicht({ aufgabe, onZurueck }: { aufgabe: Aufgabe; onZurueck: () => void }) {
  const [antworten, setAntworten] = useState<Record<number, string>>({});
  const [status, setStatus] = useState<Record<number, "offen" | "richtig" | "falsch">>({});
  const [zeigeMusser, setZeigeMusser] = useState<Record<number, boolean>>({});
  const [abgeschlossen, setAbgeschlossen] = useState(false);

  const alleRichtig = aufgabe.schritte.every(s => status[s.nr] === "richtig");

  useEffect(() => {
    if (alleRichtig && !abgeschlossen) setAbgeschlossen(true);
  }, [alleRichtig]);

  const pruefe = (schritt: Schritt) => {
    const eingabe = parseFloat(antworten[schritt.nr]?.replace(",", ".").replace(/\./g, match => match) || "0");
    const toleranz = schritt.toleranz ?? 0.01;
    const diff = Math.abs(eingabe - schritt.korrekt);
    const ok = toleranz === 0 ? eingabe === schritt.korrekt : diff <= Math.max(toleranz, Math.abs(schritt.korrekt) * 0.005);
    setStatus(prev => ({ ...prev, [schritt.nr]: ok ? "richtig" : "falsch" }));
  };

  const reset = () => {
    setAntworten({});
    setStatus({});
    setZeigeMusser({});
    setAbgeschlossen(false);
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <button onClick={onZurueck} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--color-text-secondary)", background: "none", border: "none", cursor: "pointer", marginBottom: "1.5rem", padding: 0 }}>
        <ArrowLeft size={14} aria-hidden="true" /> Zurück zur Übersicht
      </button>

      <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-lg)", overflow: "hidden", marginBottom: "1rem" }}>
        <div style={{ padding: "1.25rem", background: "var(--color-background-secondary)", borderBottom: "0.5px solid var(--color-border-tertiary)" }}>
          <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>{aufgabe.bereich}</div>
          <h2 style={{ fontSize: 20, fontWeight: 500, marginBottom: "0.75rem", color: "var(--color-text-primary)" }}>{aufgabe.titel}</h2>
          <div style={{ borderLeft: "2px solid var(--color-border-secondary)", paddingLeft: "1rem", fontSize: 15, color: "var(--color-text-secondary)", lineHeight: 1.7, borderRadius: 0 }}>{aufgabe.berufssituation}</div>
        </div>

        <div style={{ padding: "1.25rem", borderBottom: "0.5px solid var(--color-border-tertiary)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.5rem" }}>
            <BookOpen size={15} style={{ color: "var(--color-text-info)" }} aria-hidden="true" />
            <span style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Was lerne ich hier?</span>
          </div>
          <p style={{ fontSize: 14, color: "var(--color-text-secondary)", lineHeight: 1.7, margin: 0 }}>{aufgabe.was_lerne_ich}</p>
        </div>

        <div style={{ padding: "1.25rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {aufgabe.schritte.map((schritt) => {
              const st = status[schritt.nr] || "offen";
              const borderColor = st === "richtig" ? "var(--color-border-success)" : st === "falsch" ? "var(--color-border-danger)" : "var(--color-border-tertiary)";
              return (
                <div key={schritt.nr} style={{ border: `0.5px solid ${borderColor}`, borderRadius: "var(--border-radius-lg)", overflow: "hidden", transition: "border-color 0.2s" }}>
                  <div style={{ padding: "1rem 1.25rem", background: "var(--color-background-secondary)", borderBottom: `0.5px solid ${borderColor}` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "0.5rem" }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: st === "richtig" ? "var(--color-background-success)" : "var(--color-background-tertiary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {st === "richtig" ? <CheckCircle2 size={16} style={{ color: "var(--color-text-success)" }} /> : <span style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-secondary)" }}>{schritt.nr}</span>}
                      </div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--color-text-info)", background: "var(--color-background-info)", padding: "3px 10px", borderRadius: "var(--border-radius-md)" }}>{schritt.formel}</div>
                    </div>
                    <p style={{ fontSize: 14, color: "var(--color-text-secondary)", lineHeight: 1.7, margin: 0 }}>{schritt.kontext}</p>
                  </div>

                  {schritt.variablen.length > 0 && (
                    <div style={{ padding: "0.75rem 1.25rem", borderBottom: `0.5px solid var(--color-border-tertiary)` }}>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {schritt.variablen.map((v, vi) => (
                          <div key={vi} style={{ display: "flex", alignItems: "center", gap: 6, background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", padding: "4px 10px" }}>
                            <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 500, color: "var(--color-text-primary)" }}>{v.kuerzel}</span>
                            <span style={{ fontSize: 12, color: "var(--color-text-tertiary)" }}>=</span>
                            <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>{v.wert ? `${v.bedeutung} (${v.wert})` : v.bedeutung}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div style={{ padding: "1rem 1.25rem" }}>
                    <p style={{ fontSize: 15, fontWeight: 500, color: "var(--color-text-primary)", marginBottom: "0.75rem" }}>{schritt.aufgabe}</p>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                      <input
                        type="text"
                        value={antworten[schritt.nr] || ""}
                        onChange={e => { setAntworten(prev => ({ ...prev, [schritt.nr]: e.target.value })); setStatus(prev => ({ ...prev, [schritt.nr]: "offen" })); }}
                        onKeyDown={e => e.key === "Enter" && pruefe(schritt)}
                        placeholder="Ihre Berechnung..."
                        disabled={st === "richtig"}
                        style={{ width: 160, fontFamily: "var(--font-mono)", fontSize: 15, borderColor: st === "falsch" ? "var(--color-border-danger)" : st === "richtig" ? "var(--color-border-success)" : undefined }}
                      />
                      {schritt.einheit && <span style={{ fontSize: 14, color: "var(--color-text-secondary)" }}>{schritt.einheit}</span>}
                      <button onClick={() => pruefe(schritt)} disabled={st === "richtig" || !antworten[schritt.nr]} style={{ fontSize: 14, padding: "8px 16px", borderRadius: "var(--border-radius-md)", cursor: "pointer" }}>
                        Prüfen
                      </button>
                      <button onClick={() => setZeigeMusser(prev => ({ ...prev, [schritt.nr]: !prev[schritt.nr] }))} style={{ fontSize: 13, padding: "8px 12px", borderRadius: "var(--border-radius-md)", cursor: "pointer", color: "var(--color-text-secondary)" }}>
                        {zeigeMusser[schritt.nr] ? "Tipp ausblenden" : "Tipp anzeigen"}
                      </button>
                    </div>

                    {st === "falsch" && (
                      <div style={{ marginTop: "0.75rem", display: "flex", alignItems: "flex-start", gap: 8, padding: "10px 14px", background: "var(--color-background-danger)", borderRadius: "var(--border-radius-md)" }}>
                        <Lightbulb size={15} style={{ color: "var(--color-text-danger)", flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
                        <span style={{ fontSize: 13, color: "var(--color-text-danger)", lineHeight: 1.6 }}>Noch nicht ganz. Überprüfen Sie Ihre Rechnung. Nutzen Sie den Tipp wenn Sie nicht weiterkommen.</span>
                      </div>
                    )}

                    {st === "richtig" && (
                      <div style={{ marginTop: "0.75rem", display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: "var(--color-background-success)", borderRadius: "var(--border-radius-md)" }}>
                        <CheckCircle2 size={15} style={{ color: "var(--color-text-success)" }} aria-hidden="true" />
                        <span style={{ fontSize: 13, color: "var(--color-text-success)", fontWeight: 500 }}>Richtig!</span>
                      </div>
                    )}

                    {zeigeMusser[schritt.nr] && (
                      <div style={{ marginTop: "0.75rem", padding: "10px 14px", background: "var(--color-background-warning)", borderRadius: "var(--border-radius-md)", fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--color-text-warning)" }}>
                        {schritt.tipp}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {abgeschlossen && (
        <div style={{ background: "var(--color-background-success)", border: "0.5px solid var(--color-border-success)", borderRadius: "var(--border-radius-lg)", padding: "1.25rem", marginBottom: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.75rem" }}>
            <CheckCircle2 size={18} style={{ color: "var(--color-text-success)" }} aria-hidden="true" />
            <span style={{ fontSize: 15, fontWeight: 500, color: "var(--color-text-success)" }}>Aufgabe abgeschlossen</span>
          </div>
          <p style={{ fontSize: 14, color: "var(--color-text-secondary)", lineHeight: 1.7, marginBottom: "0.75rem" }}>{aufgabe.abschluss}</p>
          <div style={{ padding: "10px 14px", background: "var(--color-background-primary)", borderRadius: "var(--border-radius-md)", fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.6, marginBottom: "0.75rem" }}>
            <strong style={{ color: "var(--color-text-primary)" }}>Praxistipp:</strong> {aufgabe.praxistipp}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {aufgabe.gesetze.map(g => (
              <span key={g} style={{ fontFamily: "var(--font-mono)", fontSize: 11, padding: "3px 10px", background: "var(--color-background-warning)", color: "var(--color-text-warning)", borderRadius: "var(--border-radius-md)" }}>{g}</span>
            ))}
          </div>
        </div>
      )}

      <KiAssistent aufgabe={aufgabe} />

      <div style={{ display: "flex", gap: 8, marginTop: "1rem" }}>
        <button onClick={reset} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, padding: "8px 14px", borderRadius: "var(--border-radius-md)", cursor: "pointer", color: "var(--color-text-secondary)" }}>
          <RotateCcw size={14} aria-hidden="true" /> Zurücksetzen
        </button>
      </div>
    </div>
  );
}

// ─── HAUPTSEITE ───────────────────────────────────────────────────────────────

export default function Rechenpraxis() {
  const [AUFGABEN, setAUFGABEN] = useState<Aufgabe[]>([]);
  const [aufgabenGeladen, setAufgabenGeladen] = useState(false);
  const BEREICHE = useMemo(() => [...new Set(AUFGABEN.map(a => a.bereich))], [AUFGABEN]);

  useEffect(() => {
    fetch("/data/rechenpraxis.json")
      .then(r => r.json())
      .then((data: Aufgabe[]) => {
        setAUFGABEN(data);
        setAufgabenGeladen(true);
      })
      .catch(err => console.error("Rechenpraxis-Daten konnten nicht geladen werden:", err));
  }, []);
  const [aktiveAufgabe, setAktiveAufgabe] = useState<Aufgabe | null>(null);
  const [aktiverBereich, setAktiverBereich] = useState<string>("alle");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulierte Ladezeit
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const gefilterteAufgaben = aktiverBereich === "alle" ? AUFGABEN : AUFGABEN.filter(a => a.bereich === aktiverBereich);

  const practiceSkeleton = (
    <div className="space-y-6 max-w-[900px] mx-auto p-4">
      <SkeletonCard />
      <div className="flex gap-2 mb-8">
        {[1,2,3,4].map(i => <div key={i} className="h-8 w-20 bg-slate-200 animate-pulse rounded-md" />)}
      </div>
      <div className="space-y-3">
        {[1,2,3,4,5].map(i => <SkeletonCard key={i} />)}
      </div>
    </div>
  );

  return (
    <LoadingHandler
      isLoading={isLoading}
      skeleton={practiceSkeleton}
    >
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem 1rem" }}>
        {!aktiveAufgabe ? (
          <>
            <div style={{ marginBottom: "2rem" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "var(--color-background-info)", color: "var(--color-text-info)", fontSize: 12, fontWeight: 500, padding: "4px 12px", borderRadius: "var(--border-radius-md)", marginBottom: "1rem" }}>
                <Calculator size={14} aria-hidden="true" /> Rechenpraxis · KI-gestützt
              </div>
              <h1 style={{ fontSize: 22, fontWeight: 500, marginBottom: "0.5rem", color: "var(--color-text-primary)" }}>Rechenpraxis Immobilienwirtschaft</h1>
              <p style={{ fontSize: 15, color: "var(--color-text-secondary)", lineHeight: 1.7, maxWidth: 600 }}>
                Schritt-für-Schritt-Rechenübungen für den Berufsalltag. Jede Aufgabe erklärt warum gerechnet wird — nicht nur wie. Mit KI-Assistent für Ihre Fragen.
              </p>
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "1.5rem" }}>
              <button onClick={() => setAktiverBereich("alle")} style={{ fontSize: 13, padding: "6px 14px", borderRadius: "var(--border-radius-md)", cursor: "pointer", background: aktiverBereich === "alle" ? "var(--color-text-primary)" : undefined, color: aktiverBereich === "alle" ? "var(--color-background-primary)" : "var(--color-text-secondary)", border: aktiverBereich === "alle" ? "none" : undefined }}>
                Alle ({AUFGABEN.length})
              </button>
              {BEREICHE.map(b => (
                <button key={b} onClick={() => setAktiverBereich(b)} style={{ fontSize: 13, padding: "6px 14px", borderRadius: "var(--border-radius-md)", cursor: "pointer", background: aktiverBereich === b ? "var(--color-text-primary)" : undefined, color: aktiverBereich === b ? "var(--color-background-primary)" : "var(--color-text-secondary)", border: aktiverBereich === b ? "none" : undefined }}>
                  {b} ({AUFGABEN.filter(a => a.bereich === b).length})
                </button>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {gefilterteAufgaben.map(aufgabe => (
                <button key={aufgabe.id} onClick={() => setAktiveAufgabe(aufgabe)} style={{ display: "flex", alignItems: "flex-start", gap: 16, padding: "1rem 1.25rem", background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-lg)", cursor: "pointer", textAlign: "left", transition: "border-color 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--color-border-secondary)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--color-border-tertiary)")}>
                  <Calculator size={18} style={{ color: "var(--color-text-info)", flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 500, color: "var(--color-text-primary)", marginBottom: 4 }}>{aufgabe.titel}</div>
                    <div style={{ fontSize: 13, color: "var(--color-text-secondary)", marginBottom: 6, lineHeight: 1.5 }}>{aufgabe.berufssituation.slice(0, 120)}...</div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 11, background: "var(--color-background-info)", color: "var(--color-text-info)", padding: "2px 8px", borderRadius: "var(--border-radius-md)" }}>{aufgabe.bereich}</span>
                      <span style={{ fontSize: 11, color: "var(--color-text-tertiary)" }}>{aufgabe.schritte.length} Schritte</span>
                    </div>
                  </div>
                  <ChevronRight size={16} style={{ color: "var(--color-text-tertiary)", flexShrink: 0, marginTop: 4 }} aria-hidden="true" />
                </button>
              ))}
            </div>
          </>
        ) : (
          <AufgabenAnsicht aufgabe={aktiveAufgabe} onZurueck={() => setAktiveAufgabe(null)} />
        )}
    </div>
    </LoadingHandler>
  );
}
