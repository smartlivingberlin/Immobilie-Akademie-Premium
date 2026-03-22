import { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw, CheckCircle, XCircle, Sparkles } from "lucide-react";

const KARTEN: Record<number, {frage: string; antwort: string; kategorie: string}[]> = {
  1: [
    { frage: "Was ist der Verkehrswert einer Immobilie?", antwort: "Der im gewöhnlichen Geschäftsverkehr erzielbare Preis zum Wertermittlungsstichtag (§194 BauGB) — ohne Rücksicht auf ungewöhnliche oder persönliche Verhältnisse.", kategorie: "Bewertung" },
    { frage: "Was regelt das Grundbuch?", antwort: "Eigentumsverhältnisse (Abt. I), Lasten und Beschränkungen (Abt. II), Grundpfandrechte wie Grundschulden und Hypotheken (Abt. III).", kategorie: "Grundbuch" },
    { frage: "Was ist eine Auflassung?", antwort: "Die dingliche Einigung über den Eigentumsübergang an einem Grundstück (§925 BGB) — muss notariell beurkundet werden.", kategorie: "Kaufrecht" },
    { frage: "Was ist der Unterschied zwischen Grundschuld und Hypothek?", antwort: "Grundschuld ist nicht akzessorisch (bleibt nach Tilgung bestehen), Hypothek ist akzessorisch (erlischt mit der Forderung). Grundschuld wird häufiger verwendet.", kategorie: "Finanzierung" },
    { frage: "Was bedeutet GEG?", antwort: "Gebäudeenergiegesetz — regelt energetische Anforderungen an Gebäude. Pflicht zum Energieausweis bei Verkauf/Vermietung mit Pflichtangaben im Exposé.", kategorie: "Recht" },
  ],
  2: [
    { frage: "Was regelt §34c GewO?", antwort: "Erlaubnispflicht für Immobilienmakler, Darlehensvermittler, Bauträger und Baubetreuer. Behördliche Erlaubnis der zuständigen Behörde erforderlich.", kategorie: "Maklerrecht" },
    { frage: "Was ist das Bestellerprinzip?", antwort: "Wer den Makler bestellt (beauftragt), zahlt. Bei Wohnraumvermietung: Vermieter zahlt. Bei Kauf: Käufer max. 50% der Gesamtcourtage (seit 23.12.2020).", kategorie: "Courtage" },
    { frage: "Wann entsteht der Provisionsanspruch?", antwort: "Mit dem wirksamen Abschluss des Hauptvertrags (Kauf oder Miete) durch Nachweis oder Vermittlung des Maklers (§652 BGB).", kategorie: "Maklerrecht" },
    { frage: "Was ist ein qualifizierter Alleinauftrag?", antwort: "Auftraggeber schaltet keine anderen Makler ein UND verpflichtet sich, eigene Interessenten an den Makler zu verweisen. Stärkste Form des Alleinauftrags.", kategorie: "Auftrag" },
    { frage: "Welche Versicherung muss ein Makler nach MaBV haben?", antwort: "Vermögensschaden-Haftpflichtversicherung. Mindestdeckung: 500.000 EUR pro Schadensfall, 1.000.000 EUR pro Jahr.", kategorie: "MaBV" },
    { frage: "Was bedeutet Textform nach §656a BGB?", antwort: "Maklervertrag über Wohnungskauf muss in Textform geschlossen werden (z.B. E-Mail). Gilt seit 23.12.2020. Mündlich ist nicht ausreichend.", kategorie: "Maklervertrag" },
  ],
  3: [
    { frage: "Was ist Sondereigentum in einer WEG?", antwort: "Das ausschließliche Eigentum an einer Wohnung oder Räumen (§5 WEG). Alles was dauerhaft verändert werden kann ohne Auswirkung auf Gemeinschaft.", kategorie: "WEG" },
    { frage: "Was ist Gemeinschaftseigentum?", antwort: "Grundstück, tragende Wände, Dach, Fassade, Treppenhaus, Heizung, Leitungen außerhalb der Wohnung. Alle Eigentümer sind gemeinschaftlich berechtigt.", kategorie: "WEG" },
    { frage: "Welche Kosten sind NICHT umlagefähig?", antwort: "Verwaltungskosten, Instandhaltungsrücklage, Kosten für Leerstände. Nur die in §2 BetrKV aufgeführten Betriebskosten sind umlagefähig.", kategorie: "Betriebskosten" },
    { frage: "Wie lange hat der Vermieter für die Nebenkostenabrechnung Zeit?", antwort: "12 Monate nach Ende des Abrechnungszeitraums. Danach kann er keine Nachzahlung mehr verlangen (§556 Abs. 3 BGB).", kategorie: "Mietrecht" },
    { frage: "Was ist die Erhaltungsrücklage?", antwort: "Zweckgebundene Rücklage der WEG für künftige Instandhaltung am Gemeinschaftseigentum. Früher Instandhaltungsrücklage. Pflicht nach §19 WEG.", kategorie: "WEG" },
  ],
  4: [
    { frage: "Welche 3 Wertermittlungsverfahren gibt es?", antwort: "1. Vergleichswertverfahren (EW, EFH) | 2. Ertragswertverfahren (Renditeobjekte) | 3. Sachwertverfahren (Eigennutzung)", kategorie: "Bewertung" },
    { frage: "Was ist der Liegenschaftszinssatz?", antwort: "Der Zinssatz mit dem der Verkehrswert von Grundstücken marktüblich verzinst wird. Kerngröße im Ertragswertverfahren. Wird vom Gutachterausschuss ermittelt.", kategorie: "Ertragswert" },
    { frage: "Wie berechnet sich der Reinertrag?", antwort: "Reinertrag = Rohertrag (Jahresnettomiete) minus Bewirtschaftungskosten (Verwaltung, Instandhaltung, Mietausfall, Betriebskosten nicht umlagefähig). Typisch 20-30% Abzug.", kategorie: "Ertragswert" },
    { frage: "Was sind Bodenrichtwerte?", antwort: "Durchschnittliche Lagewerte des Bodens je qm für Grundstücke in einer Lage. Werden vom Gutachterausschuss aus Kaufpreissammlung ermittelt. BORIS-Portal.", kategorie: "Bodenwert" },
  ],
  5: [
    { frage: "Was regelt §34i GewO?", antwort: "Erlaubnispflicht für Immobiliendarlehensvermittler. Anforderungen: Sachkunde (IHK), Berufshaftpflicht, geordnete Vermögensverhältnisse.", kategorie: "Zulassung" },
    { frage: "Was ist ein Annuitätendarlehen?", antwort: "Darlehen mit gleichbleibenden monatlichen Raten (Annuität) aus Zins + Tilgung. Zinsanteil sinkt, Tilgungsanteil steigt. Häufigste Darlehensform.", kategorie: "Darlehensarten" },
    { frage: "Was ist die Vorfälligkeitsentschädigung?", antwort: "Entschädigung der Bank für entgangene Zinsen bei vorzeitiger Kreditkündigung während der Zinsbindung. Berechnung: Differenz zwischen Vertragszins und aktuellem Marktzins.", kategorie: "Finanzierung" },
    { frage: "Was ist der effektive Jahreszins?", antwort: "Gesamtkosten des Kredits pro Jahr in Prozent. Enthält Nominalzins + alle Gebühren. Pflichtangabe nach PAngV. Ermöglicht echten Angebotsvergleich.", kategorie: "Kosten" },
    { frage: "Was ist eine Grundschuld?", antwort: "Dingliches Sicherungsrecht an einer Immobilie (§1191 BGB). Nicht akzessorisch — bleibt nach Tilgung bestehen. Kann für neue Kredite wiederverwendet werden.", kategorie: "Sicherheiten" },
  ],
};

export default function Flashcards() {
  const [modul, setModul] = useState(1);
  const [index, setIndex] = useState(0);
  const [flip, setFlip] = useState(false);
  const [bekannt, setBekannt] = useState<number[]>([]);
  const [unbekannt, setUnbekannt] = useState<number[]>([]);

  const karten = KARTEN[modul] || [];
  const karte = karten[index];
  const fortschritt = karten.length > 0 ? Math.round(((bekannt.length + unbekannt.length) / karten.length) * 100) : 0;

  const next = (known: boolean) => {
    if (known) setBekannt(p => [...p, index]);
    else setUnbekannt(p => [...p, index]);
    setFlip(false);
    setTimeout(() => setIndex(i => Math.min(i + 1, karten.length - 1)), 150);
  };

  const reset = () => { setIndex(0); setFlip(false); setBekannt([]); setUnbekannt([]); };

  const MODULE_NAMES: Record<number, string> = {
    1: "Einführung", 2: "Makler §34c", 3: "WEG & Mietrecht", 4: "Gutachter", 5: "Darlehen §34i",
  };

  const fertig = bekannt.length + unbekannt.length >= karten.length;

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "24px 20px" }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>Lernkarten</h1>
        <p style={{ color: "#64748b", marginTop: 4, fontSize: 14 }}>Klicke auf die Karte zum Umdrehen — bewertet ob du es wusstest</p>
      </div>

      {/* Modul-Auswahl */}
      <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
        {[1,2,3,4,5].map(m => (
          <button key={m} onClick={() => { setModul(m); reset(); }}
            style={{ padding: "6px 14px", borderRadius: 20, border: "0.5px solid", fontSize: 12, fontWeight: 500, cursor: "pointer",
              background: modul === m ? "#2563eb" : "transparent",
              color: modul === m ? "#fff" : "#64748b",
              borderColor: modul === m ? "#2563eb" : "#e2e8f0" }}>
            M{m} — {MODULE_NAMES[m]}
          </button>
        ))}
      </div>

      {/* Fortschritt */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#64748b", marginBottom: 4 }}>
          <span>{bekannt.length + unbekannt.length} / {karten.length} Karten</span>
          <span style={{ display: "flex", gap: 12 }}>
            <span style={{ color: "#059669" }}>✓ {bekannt.length} gewusst</span>
            <span style={{ color: "#dc2626" }}>✗ {unbekannt.length} nicht gewusst</span>
          </span>
        </div>
        <div style={{ height: 6, background: "#f1f5f9", borderRadius: 3, overflow: "hidden" }}>
          <div style={{ height: "100%", background: "#2563eb", borderRadius: 3, width: `${fortschritt}%`, transition: "width 0.3s" }} />
        </div>
      </div>

      {fertig ? (
        <div style={{ textAlign: "center", padding: "40px 20px", background: "#fff", border: "0.5px solid #e2e8f0", borderRadius: 16 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>Alle Karten geschafft!</div>
          <div style={{ fontSize: 14, color: "#64748b", marginBottom: 20 }}>
            {bekannt.length} von {karten.length} gewusst ({Math.round(bekannt.length/karten.length*100)}%)
          </div>
          <button onClick={reset} style={{ padding: "10px 24px", background: "#2563eb", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}>
            <RotateCcw size={16} /> Nochmal üben
          </button>
        </div>
      ) : karte ? (
        <div>
          {/* Karte */}
          <div onClick={() => setFlip(f => !f)}
            style={{ minHeight: 220, background: "#fff", border: `1.5px solid ${flip ? "#7c3aed" : "#e2e8f0"}`, borderRadius: 16, padding: "28px 24px", cursor: "pointer", transition: "border-color 0.2s", marginBottom: 16, position: "relative" }}>
            <div style={{ position: "absolute", top: 12, right: 14, fontSize: 10, color: "#94a3b8", fontWeight: 500 }}>
              {flip ? "ANTWORT" : "FRAGE"} · {karte.kategorie}
            </div>
            <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 12, marginTop: 8 }}>
              Karte {index + 1} von {karten.length}
            </div>
            {!flip ? (
              <div style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", lineHeight: 1.5 }}>{karte.frage}</div>
            ) : (
              <div style={{ fontSize: 14, color: "#374151", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{karte.antwort}</div>
            )}
            {!flip && <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", fontSize: 11, color: "#94a3b8" }}>Klicken zum Umdrehen</div>}
          </div>

          {/* Bewertung-Buttons */}
          {flip && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <button onClick={() => next(false)}
                style={{ padding: "12px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 14, fontWeight: 600, color: "#dc2626" }}>
                <XCircle size={18} /> Nicht gewusst
              </button>
              <button onClick={() => next(true)}
                style={{ padding: "12px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 14, fontWeight: 600, color: "#059669" }}>
                <CheckCircle size={18} /> Gewusst!
              </button>
            </div>
          )}

          {!flip && (
            <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
              <button onClick={() => { setFlip(false); setIndex(i => Math.max(0, i-1)); }}
                disabled={index === 0}
                style={{ padding: "8px 16px", border: "0.5px solid #e2e8f0", borderRadius: 8, background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#64748b", opacity: index === 0 ? 0.4 : 1 }}>
                <ChevronLeft size={14} /> Zurück
              </button>
              <button onClick={() => { setFlip(false); setIndex(i => Math.min(i+1, karten.length-1)); }}
                disabled={index === karten.length - 1}
                style={{ padding: "8px 16px", border: "0.5px solid #e2e8f0", borderRadius: 8, background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#64748b", opacity: index === karten.length-1 ? 0.4 : 1 }}>
                Weiter <ChevronRight size={14} />
              </button>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
