import { useState } from "react";
import { scaledFontSize as fz } from "@/lib/a11yFont";
import { trpc } from "@/lib/trpc";
import { CheckCircle, ChevronDown, ChevronUp, BookOpen, Calculator, FileText, Scale, Loader2 } from "lucide-react";

const MODULE_NAMES: Record<number, string> = {
  1: "Einführung", 2: "Makler §34c", 3: "WEG & Mietrecht", 4: "Gutachter", 5: "Darlehen §34i",
};

const FALLSTUDIEN_LOESUNGEN = [
  {
    id: 1, modul: 2, titel: "Familie Müller — Eigentumswohnung",
    aufgabe: "Makler-Unterlagen, Courtage, Exposé-Pflichten, GwG, Notartermin",
    loesung: `1. UNTERLAGEN: Grundbuchauszug, Teilungserklärung, Energieausweis, letzte 3 Hausgeldabrechnungen, Wirtschaftsplan, ETV-Protokoll
2. COURTAGE: Max. 3,57% inkl. MwSt. vom Käufer. Seit 23.12.2020 max. 50% der Gesamtcourtage wenn Verkäufer Auftraggeber (§656c BGB)
3. EXPOSÉ-PFLICHTEN (GEG §87): Energieausweis-Art, Energieträger, Baujahr, Energiekennwert kWh/m²a, Effizienzklasse A+-H
4. GwG: Identifizierung beider Parteien (Personalausweis), Risikoanalyse, bei Verdacht Meldung an FIU (§43 GwG)
5. NOTARTERMIN: Reservierungsvereinbarung → Finanzierungsbestätigung → Notartermin → Kaufvertragsentwurf 14 Tage vorher → Beurkundung → Auflassungsvormerkung → Kaufpreis → Eigentumsumschreibung`,
    rechenweg: "Courtage: 450.000 × 3,57% = 16.065 EUR inkl. MwSt.",
    paragraph: "§656a-c BGB, §87 GEG, §43 GwG",
  },
  {
    id: 2, modul: 3, titel: "WEG-Streit: Balkontür",
    aufgabe: "Sonder- vs. Gemeinschaftseigentum, Beschluss, Konsequenzen",
    loesung: `1. Balkontür = GEMEINSCHAFTSEIGENTUM (Außenfassade, §5 Abs. 1 WEG). Nur Wohnungsinneres ist Sondereigentum.
2. Nein — §20 WEG: bauliche Veränderungen am Gemeinschaftseigentum nur mit Beschluss
3. Einfacher Mehrheitsbeschluss für privilegierte Maßnahmen (§20 Abs. 2 WEG), sonst qualifizierte Mehrheit (2/3 der abgegebenen Stimmen UND mehr als 50% der MEA)
4. Beseitigungsanspruch der Gemeinschaft (§1004 BGB analog), Schadensersatz, Kosten trägt Herr Bauer allein
5. EMPFEHLUNG: ETV einberufen, Tagesordnungspunkt aufnehmen, Architektenangebot einholen, abstimmen`,
    rechenweg: "MEA-Berechnung: 1/12 = 8,33% Miteigentumsanteil bei gleichmäßiger Aufteilung auf 12 Einheiten",
    paragraph: "§5 WEG, §20 WEG, §1004 BGB",
  },
  {
    id: 3, modul: 4, titel: "Ertragswertverfahren MFH",
    aufgabe: "Ertragswertverfahren, Reinertrag, Barwertfaktor, Verkehrswert",
    loesung: `1. VERFAHREN: Ertragswertverfahren (ImmoWertV 2021) — vermietetes Renditeobjekt, Ertrag steht im Vordergrund
2. REINERTRAG: Rohertrag 57.600 × (1 - 0,25) = 43.200 EUR
3. BARWERTFAKTOR: [1 - (1 + 0,035)^-35] / 0,035 = [1 - 0,2965] / 0,035 = 20,09
4. ERTRAGSWERT: 43.200 × 20,09 = 867.888 + Bodenwert 280.000 = 1.147.888 EUR
5. VERKEHRSWERT: gerundet 1.150.000 EUR`,
    rechenweg: `Rohertrag: 57.600 EUR
- Bewirtschaftungskosten (25%): 14.400 EUR
= Reinertrag: 43.200 EUR
× Vervielfältiger (n=35, i=3,5%): 20,09
= Gebäudeertragswert: 867.888 EUR
+ Bodenwert: 280.000 EUR
= Ertragswert: 1.147.888 EUR → gerundet 1.150.000 EUR`,
    paragraph: "§§17-20 ImmoWertV 2021",
  },
  {
    id: 4, modul: 1, titel: "Grundbuch Erstkäufer",
    aufgabe: "Grundbuch-Aufbau, Auflassungsvormerkung, öffentlicher Glaube",
    loesung: `1. Öffentliches Register beim Amtsgericht (§873 BGB), dokumentiert alle dinglichen Rechtsverhältnisse
2. Abt. I: Eigentümer | Abt. II: Lasten/Beschränkungen (Wegerechte, Vorkaufsrechte, Reallast) | Abt. III: Grundpfandrechte
3. Prüfen: Ist Verkäufer wirklich Eigentümer? Lasten/Schulden? Wegerechte? Vormerkungen anderer Käufer?
4. Auflassungsvormerkung (§883 BGB): Sichert Anspruch des Käufers nach Kaufvertrag bis Eigentumsumschreibung
5. Öffentlicher Glaube (§892 BGB): Gutgläubiger Erwerber ist geschützt wenn er auf Grundbuchinhalt vertraut`,
    rechenweg: "Grunderwerbsteuer Berlin: Kaufpreis × 6% = Nebenkosten-Berechnung relevant",
    paragraph: "§873, §883, §892 BGB; GBO",
  },
  {
    id: 5, modul: 5, titel: "Frau Schmidt Finanzierungsberatung",
    aufgabe: "LTV, Nominalzins vs. Effektivzins, Tilgung, KfW, Grundschuld",
    loesung: `1. Finanzierungsbedarf: 350.000 - 70.000 = 280.000 EUR | LTV = 280.000/350.000 = 80% (noch bankfähig, unter 80% bevorzugt)
2. Nominalzins: reiner Zinssatz | Effektiver Jahreszins: Nominalzins + alle Kosten/Gebühren → Pflichtangabe nach PAngV §6
3. Annuität: 280.000 × (3,5% + 2%) / 12 = 1.283 EUR/Monat | Laufzeit ca. 30 Jahre
4. KfW 124 (bis 100.000 EUR), KfW 261 (Energieeffizienz), KfW 300 (Wohneigentum für Familien)
5. Grundschuld §1191 BGB: nicht akzessorisch (bleibt nach Tilgung bestehen), Abt. III Grundbuch, Sicherungsabrede nötig`,
    rechenweg: `Annuität = Darlehen × (Zins + Tilgung)
280.000 × 5,5% = 15.400 EUR/Jahr
15.400 / 12 = 1.283 EUR/Monat
Tragbarkeit: 1.283 / 3.500 = 36,7% (Faustregel: max. 35-40%)`,
    paragraph: "§6 PAngV, §1191 BGB, §34i GewO",
  },
];

const EXPOSE_MUSTERLOESUNG = `BEISPIEL-EXPOSÉ — 3-Zimmer-Wohnung Berlin-Mitte

ANGEBOT: Moderne Eigentumswohnung in begehrter Citylage
Preis: 485.000 EUR | Provision: 3,57% inkl. MwSt. zzgl. Notarkosten und Grunderwerbsteuer

OBJEKTBESCHREIBUNG:
Gepflegte 3-Zimmer-Eigentumswohnung im 3. Obergeschoss eines 5-stöckigen Gebäudes mit Aufzug. Die kernsanierte Wohnung (Sanierung 2018) überzeugt durch einen modernen Grundriss mit großem Wohnzimmer, zwei Schlafzimmern und zeitgemäßer Küche.

AUSSTATTUNG: Balkon · Einbauküche · Tiefgaragenstellplatz · Aufzug

LAGE: Berlin-Mitte, fußläufig zum Hackeschen Markt. Optimale ÖPNV-Anbindung (S-Bahn, U-Bahn), Restaurants und Einkaufsmöglichkeiten direkt vor der Tür.

ENERGIEAUSWEIS (Pflichtangaben nach §87 GEG):
Art: Bedarfsausweis | Energieträger: Fernwärme | Baujahr: 1987
Energiekennwert: 85 kWh/(m²·a) | Energieeffizienzklasse: C

WEITERE ANGABEN:
Wohnfläche: 78 m² | Zimmer: 3 | Etage: 3. OG
Baujahr: 1987 (kernsaniert 2018)

PROVISION: 3,57% inkl. gesetzlicher MwSt. vom Kaufpreis trägt der Käufer.

RECHTLICHER HINWEIS: Diese Angaben basieren auf Informationen des Verkäufers. Eine Haftung wird nicht übernommen.`;

const BGH_URTEILE = [
  {
    id: 1, modul: 2, aktenzeichen: "BGH III ZR 269/14",
    titel: "Maklercourtage — Doppeltätigkeit",
    datum: "2015-03-19",
    leitsatz: "Ein Makler der für beide Seiten tätig wird verliert seinen Provisionsanspruch wenn er die Interessen einer Seite bevorzugt.",
    vereinfacht: "Ein Makler kann nicht gleichzeitig für Käufer UND Verkäufer Provision verlangen wenn er dabei eine Seite bevorzugt. Das nennt man unzulässige Doppeltätigkeit.",
    praxisbeispiel: "Makler Müller vertritt Verkäufer Schmidt und verhandelt gleichzeitig für Käufer Weber. Er sagt dem Käufer nicht dass der Verkäufer auch 50.000 EUR weniger akzeptieren würde. → Makler verliert Courtage.",
    prüfungsrelevanz: "Hoch — häufig in IHK-Prüfungen als Fallstudie",
  },
  {
    id: 2, modul: 2, aktenzeichen: "BGH I ZR 201/13",
    titel: "Widerruf des Maklervertrags bei Fernabsatz",
    datum: "2014-11-06",
    leitsatz: "Maklerverträge die per E-Mail oder Telefon geschlossen werden sind Fernabsatzverträge mit 14-tägigem Widerrufsrecht.",
    vereinfacht: "Wenn ein Kunde den Maklervertrag online oder per Telefon unterschreibt, hat er 14 Tage Widerrufsrecht. Der Makler MUSS ihn darüber belehren.",
    praxisbeispiel: "Kunde schickt ausgefülltes Maklerformular per E-Mail zurück. Makler vergisst Widerrufsbelehrung. Kunde widerruft nach 3 Wochen → trotzdem wirksam, weil Widerrufsfrist nicht läuft.",
    prüfungsrelevanz: "Mittel — relevant für §656a BGB und Fernabsatzrecht",
  },
  {
    id: 3, modul: 3, aktenzeichen: "BGH V ZR 44/18",
    titel: "Kostenverteilung Sondereigentum WEG",
    datum: "2019-02-08",
    leitsatz: "Instandhaltungskosten die ausschließlich das Sondereigentum betreffen trägt der jeweilige Sondereigentümer allein.",
    vereinfacht: "Was nur in deiner Wohnung kaputt ist, zahlst du selbst. Was alle betrifft (Dach, Fassade, Treppenhaus) zahlen alle gemeinsam.",
    praxisbeispiel: "Wohnungseigentümer Bauer hat einen Wasserrohrbruch in seiner Küche. Das Rohr liegt komplett in seinem Sondereigentum. → Er zahlt die Reparatur allein, nicht die WEG.",
    prüfungsrelevanz: "Hoch — Kernthema WEG-Verwaltung",
  },
  {
    id: 4, modul: 5, aktenzeichen: "BGH XI ZR 388/17",
    titel: "Vorfälligkeitsentschädigung — Berechnung",
    datum: "2019-01-22",
    leitsatz: "Die Vorfälligkeitsentschädigung darf nur den tatsächlich entstandenen Schaden der Bank ausgleichen und muss transparent berechnet werden.",
    vereinfacht: "Wenn du dein Darlehen früher zurückzahlst, darf die Bank nur den echten Zinsschaden verlangen. Sie muss die Berechnung erklären — versteckte Gebühren sind unzulässig.",
    praxisbeispiel: "Frau Klein löst ihr Hypothekendarlehen 5 Jahre früher ab. Bank verlangt 18.000 EUR Vorfälligkeitsentschädigung. Frau Klein lässt es prüfen → Bank hatte zu viel berechnet und muss 3.000 EUR zurückzahlen.",
    prüfungsrelevanz: "Mittel — relevant für §34i Darlehensvermittlung",
  },
  {
    id: 5, modul: 4, aktenzeichen: "BGH V ZR 4/14",
    titel: "Sachmangel beim Immobilienkauf",
    datum: "2014-06-27",
    leitsatz: "Der Verkäufer muss alle ihm bekannten Mängel offenbaren. Ein arglistiges Verschweigen führt zur Anfechtbarkeit des Kaufvertrags.",
    vereinfacht: "Wer eine Immobilie verkauft und einen bekannten Mangel verschweigt (z.B. Schimmel, Feuchtigkeitsschäden) handelt arglistig. Der Käufer kann den Kauf rückgängig machen.",
    praxisbeispiel: "Verkäufer weiß von Schimmel im Keller, sagt es nicht. Käufer entdeckt es nach 6 Monaten. → Käufer kann wegen arglistiger Täuschung anfechten (§123 BGB), auch wenn AGB 'gekauft wie gesehen' sagt.",
    prüfungsrelevanz: "Hoch — Kaufrecht, relevant für Makler und Gutachter",
  },
];

export default function DozentenLoesungen() {
  const [aktiveTab, setAktiveTab] = useState<"fallstudien"|"expose"|"bgh"|"quiz">("fallstudien");
  const [offeneItems, setOffeneItems] = useState<number[]>([]);
  const [modulFilter, setModulFilter] = useState(0);

  const toggleItem = (id: number) => {
    setOffeneItems(p => p.includes(id) ? p.filter(i => i !== id) : [...p, id]);
  };

  const { data: questionsData, isLoading } = trpc.adminQuestions.list.useQuery({
    moduleId: modulFilter || undefined, limit: 50, offset: 0,
  });

  const gefilterteFallstudien = modulFilter ? FALLSTUDIEN_LOESUNGEN.filter(f => f.modul === modulFilter) : FALLSTUDIEN_LOESUNGEN;
  const gefilterteUrteile = modulFilter ? BGH_URTEILE.filter(b => b.modul === modulFilter) : BGH_URTEILE;

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "24px 20px" }}>
      <div style={{ marginBottom: 20, display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: fz(24), fontWeight: 700, color: "#0f172a", margin: 0 }}>Dozenten-Lösungsübersicht</h1>
          <p style={{ color: "#64748b", marginTop: 4, fontSize: fz(14) }}>Musterlösungen, Rechenwege, BGH-Urteile und Praxisbeispiele für alle Bereiche</p>
        </div>
        <div style={{ padding: "5px 12px", background: "#fef3c7", borderRadius: 8, border: "0.5px solid #fcd34d", fontSize: fz(11), color: "#92400e" }}>
          🔒 Nur für Dozenten
        </div>
      </div>

      {/* Modul Filter */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {[0,1,2,3,4,5].map(m => (
          <button key={m} onClick={() => setModulFilter(m)}
            style={{ padding: "5px 12px", borderRadius: 20, border: "0.5px solid", fontSize: fz(11), fontWeight: 500, cursor: "pointer",
              background: modulFilter === m ? "#0f172a" : "transparent",
              color: modulFilter === m ? "#fff" : "#64748b",
              borderColor: modulFilter === m ? "#0f172a" : "#e2e8f0" }}>
            {m === 0 ? "Alle Module" : `M${m}: ${MODULE_NAMES[m]}`}
          </button>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 16, borderBottom: "0.5px solid #e2e8f0", paddingBottom: 0 }}>
        {[
          { id: "fallstudien", label: "Fallstudien", icon: FileText },
          { id: "expose", label: "Exposé-Trainer", icon: FileText },
          { id: "bgh", label: "BGH-Urteile", icon: Scale },
          { id: "quiz", label: "Quiz-Fragen", icon: BookOpen },
        ].map(t => (
          <button key={t.id} onClick={() => setAktiveTab(t.id as any)}
            style={{ padding: "8px 16px", border: "none", borderBottom: `2px solid ${aktiveTab === t.id ? "#2563eb" : "transparent"}`, background: "transparent", fontSize: fz(13), fontWeight: aktiveTab === t.id ? 600 : 400, color: aktiveTab === t.id ? "#2563eb" : "#64748b", cursor: "pointer" }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* FALLSTUDIEN */}
      {aktiveTab === "fallstudien" && (
        <div>
          {gefilterteFallstudien.map(f => (
            <div key={f.id} style={{ background: "#fff", border: "0.5px solid #e2e8f0", borderRadius: 12, marginBottom: 10, overflow: "hidden" }}>
              <div onClick={() => toggleItem(f.id)}
                style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", cursor: "pointer", background: offeneItems.includes(f.id) ? "#f8fafc" : "#fff" }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: fz(11), fontWeight: 700, color: "#2563eb" }}>M{f.modul}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: fz(13), fontWeight: 500, color: "#0f172a" }}>{f.titel}</div>
                  <div style={{ fontSize: fz(11), color: "#94a3b8" }}>{f.aufgabe}</div>
                </div>
                <div style={{ fontSize: fz(10), padding: "2px 8px", background: "#f0fdf4", color: "#166534", borderRadius: 20 }}>{f.paragraph}</div>
                {offeneItems.includes(f.id) ? <ChevronUp size={16} color="#64748b" /> : <ChevronDown size={16} color="#64748b" />}
              </div>
              {offeneItems.includes(f.id) && (
                <div style={{ padding: "0 16px 16px", borderTop: "0.5px solid #f1f5f9" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
                    <div style={{ padding: "12px 14px", background: "#f0fdf4", borderRadius: 10, border: "0.5px solid #bbf7d0" }}>
                      <div style={{ fontSize: fz(11), fontWeight: 600, color: "#166534", marginBottom: 6 }}>✅ Musterlösung</div>
                      <div style={{ fontSize: fz(12), color: "#374151", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{f.loesung}</div>
                    </div>
                    <div>
                      <div style={{ padding: "12px 14px", background: "#eff6ff", borderRadius: 10, border: "0.5px solid #bfdbfe", marginBottom: 8 }}>
                        <div style={{ fontSize: fz(11), fontWeight: 600, color: "#1d4ed8", marginBottom: 6 }}>🔢 Rechenweg</div>
                        <div style={{ fontSize: fz(12), color: "#374151", lineHeight: 1.7, whiteSpace: "pre-wrap", fontFamily: "monospace" }}>{f.rechenweg}</div>
                      </div>
                      <div style={{ padding: "10px 12px", background: "#faf5ff", borderRadius: 10, border: "0.5px solid #e9d5ff" }}>
                        <div style={{ fontSize: fz(11), fontWeight: 600, color: "#6d28d9", marginBottom: 4 }}>⚖️ Relevante Paragraphen</div>
                        <div style={{ fontSize: fz(12), color: "#374151" }}>{f.paragraph}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* EXPOSÉ */}
      {aktiveTab === "expose" && (
        <div style={{ background: "#fff", border: "0.5px solid #e2e8f0", borderRadius: 12, overflow: "hidden" }}>
          <div style={{ padding: "14px 16px", borderBottom: "0.5px solid #f1f5f9", background: "#f8fafc" }}>
            <div style={{ fontSize: fz(13), fontWeight: 600, color: "#374151" }}>Muster-Exposé mit allen GEG-Pflichtangaben</div>
            <div style={{ fontSize: fz(11), color: "#94a3b8" }}>Übung 1: 3-Zimmer-Wohnung Berlin-Mitte · Alle 10 Pflichtangaben enthalten</div>
          </div>
          <div style={{ padding: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 6, marginBottom: 14 }}>
              {["Energieausweis-Typ ✅", "Energieträger ✅", "Baujahr ✅", "Energiekennwert ✅", "Effizienzklasse ✅", "Courtage+MwSt ✅", "Wohnfläche ✅", "Kaufpreis ✅", "Lage ✅", "Objektbeschreibung ✅"].map(p => (
                <div key={p} style={{ padding: "4px 8px", background: "#f0fdf4", border: "0.5px solid #bbf7d0", borderRadius: 6, fontSize: fz(10), color: "#166534", textAlign: "center" }}>{p}</div>
              ))}
            </div>
            <pre style={{ fontSize: fz(12), color: "#374151", lineHeight: 1.8, whiteSpace: "pre-wrap", background: "#f8fafc", padding: 16, borderRadius: 10, border: "0.5px solid #e2e8f0" }}>{EXPOSE_MUSTERLOESUNG}</pre>
          </div>
        </div>
      )}

      {/* BGH URTEILE */}
      {aktiveTab === "bgh" && (
        <div>
          {gefilterteUrteile.map(u => (
            <div key={u.id} style={{ background: "#fff", border: "0.5px solid #e2e8f0", borderRadius: 12, marginBottom: 10, overflow: "hidden" }}>
              <div onClick={() => toggleItem(u.id + 100)}
                style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", cursor: "pointer" }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "#faf5ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: fz(11), fontWeight: 700, color: "#7c3aed" }}>M{u.modul}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: fz(13), fontWeight: 500, color: "#0f172a" }}>{u.titel}</div>
                  <div style={{ fontSize: fz(11), color: "#94a3b8" }}>{u.aktenzeichen} · {u.datum}</div>
                </div>
                <div style={{ fontSize: fz(10), padding: "2px 8px", background: u.prüfungsrelevanz === "Hoch" ? "#fef2f2" : "#fef3c7", color: u.prüfungsrelevanz === "Hoch" ? "#991b1b" : "#92400e", borderRadius: 20 }}>{u.prüfungsrelevanz}</div>
                {offeneItems.includes(u.id + 100) ? <ChevronUp size={16} color="#64748b" /> : <ChevronDown size={16} color="#64748b" />}
              </div>
              {offeneItems.includes(u.id + 100) && (
                <div style={{ padding: "0 16px 16px", borderTop: "0.5px solid #f1f5f9" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
                    <div>
                      <div style={{ padding: "12px 14px", background: "#f8fafc", borderRadius: 10, border: "0.5px solid #e2e8f0", marginBottom: 8 }}>
                        <div style={{ fontSize: fz(11), fontWeight: 600, color: "#374151", marginBottom: 6 }}>⚖️ Offizieller Leitsatz</div>
                        <div style={{ fontSize: fz(12), color: "#374151", lineHeight: 1.6, fontStyle: "italic" }}>{u.leitsatz}</div>
                      </div>
                      <div style={{ padding: "12px 14px", background: "#eff6ff", borderRadius: 10, border: "0.5px solid #bfdbfe" }}>
                        <div style={{ fontSize: fz(11), fontWeight: 600, color: "#1d4ed8", marginBottom: 6 }}>💬 Einfach erklärt</div>
                        <div style={{ fontSize: fz(12), color: "#374151", lineHeight: 1.6 }}>{u.vereinfacht}</div>
                      </div>
                    </div>
                    <div style={{ padding: "12px 14px", background: "#f0fdf4", borderRadius: 10, border: "0.5px solid #bbf7d0" }}>
                      <div style={{ fontSize: fz(11), fontWeight: 600, color: "#166534", marginBottom: 6 }}>📋 Praxisbeispiel</div>
                      <div style={{ fontSize: fz(12), color: "#374151", lineHeight: 1.6 }}>{u.praxisbeispiel}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* QUIZ FRAGEN */}
      {aktiveTab === "quiz" && (
        <div>
          {isLoading ? (
            <div style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}>
              <Loader2 size={28} style={{ animation: "spin 1s linear infinite", margin: "0 auto 8px", display: "block" }} />
              Lade Prüfungsfragen...
            </div>
          ) : (questionsData?.questions || []).length === 0 ? (
            <div style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}>Keine Fragen für dieses Modul</div>
          ) : (
            (questionsData?.questions || []).map((q: any) => {
              let options: Record<string, string> = {};
              try { options = JSON.parse(q.options); } catch {}
              return (
                <div key={q.id} style={{ background: "#fff", border: "0.5px solid #e2e8f0", borderRadius: 10, marginBottom: 8, overflow: "hidden" }}>
                  <div onClick={() => toggleItem(q.id + 1000)}
                    style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 14px", cursor: "pointer" }}>
                    <div style={{ width: 24, height: 24, borderRadius: 6, background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: fz(10), fontWeight: 700, color: "#64748b", flexShrink: 0 }}>M{q.moduleId}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: fz(13), color: "#374151", lineHeight: 1.5 }}>{q.questionText}</div>
                      <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                        <span style={{ fontSize: fz(10), padding: "1px 6px", background: "#e2e8f0", color: "#374151", borderRadius: 20 }}>{q.difficulty}</span>
                        <span style={{ fontSize: fz(10), padding: "1px 6px", background: "#e2e8f0", color: "#374151", borderRadius: 20 }}>{q.category}</span>
                      </div>
                    </div>
                    <div style={{ fontSize: fz(11), padding: "2px 8px", background: "#f0fdf4", color: "#166534", borderRadius: 6, fontWeight: 600, flexShrink: 0 }}>
                      ✓ {q.correctAnswer}
                    </div>
                    {offeneItems.includes(q.id + 1000) ? <ChevronUp size={14} color="#64748b" /> : <ChevronDown size={14} color="#64748b" />}
                  </div>
                  {offeneItems.includes(q.id + 1000) && (
                    <div style={{ padding: "0 14px 14px", borderTop: "0.5px solid #f1f5f9" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginTop: 10, marginBottom: 10 }}>
                        {Object.entries(options).map(([key, val]) => (
                          <div key={key} style={{ padding: "6px 10px", borderRadius: 6, fontSize: fz(12),
                            background: key === q.correctAnswer ? "#f0fdf4" : "#f8fafc",
                            border: `0.5px solid ${key === q.correctAnswer ? "#86efac" : "#e2e8f0"}`,
                            color: key === q.correctAnswer ? "#166534" : "#374151",
                            fontWeight: key === q.correctAnswer ? 600 : 400 }}>
                            {key === q.correctAnswer ? "✓ " : ""}{key}: {val as string}
                          </div>
                        ))}
                      </div>
                      {q.explanation && (
                        <div style={{ padding: "10px 12px", background: "#eff6ff", borderRadius: 8, border: "0.5px solid #bfdbfe", fontSize: fz(12), color: "#1d4ed8", lineHeight: 1.6 }}>
                          💡 <strong>Erklärung:</strong> {q.explanation}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
      <style>{"@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}"}</style>
    </div>
  );
}
