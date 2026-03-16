/**
 * RAG-Tutor: KI antwortet aus echten Modulinhalten
 * Nutzt Gemini 2.5 Flash via bestehenden LLM-Layer
 */
import type { Express, Request, Response } from "express";

const MODULE_KNOWLEDGE: Record<string, string> = {
  "1": `MODUL 1 — Einführung Immobilienwirtschaft (20 Tage, 160 UE)
Themen: Marktüberblick Deutschland, Wohn-/Gewerbe-/Spezialimmobilien, BGB Grundlagen §433ff (Kaufvertrag), §535ff (Mietvertrag), §652 (Maklerrecht), GewO §34c/§34i/§34d, Grundbuchrecht (§873, §925 BGB), WEG-Grundlagen, öffentliches Baurecht (BauGB, BauNVO), Bauleitplanung, Bebauungsplan, Flächennutzungsplan, Marktakteure (Makler, Verwalter, Gutachter, Banken, Notare), Immobilientypen (EFH, MFH, ETW, Büro, Einzelhandel, Logistik), Grundstücksbegriff, Zubehör §97 BGB, Bestandteile §93 BGB, Beleihungswert, Verkehrswert §194 BauGB.
Prüfungsrelevanz: §34c GewO Grundlagen, Maklerrecht §652 BGB, Grundbuch, Eigentumsübertragung.`,

  "2": `MODUL 2 — Immobilienmakler §34c GewO (60 Tage, 440 UE)
Themen: §34c GewO Erlaubnisvoraussetzungen (Zuverlässigkeit, Sachkundenachweis IHK, Berufshaftpflicht €500.000, Eigenkapital), Maklervertrag (Alleinauftrag, Allgemeinauftrag, Qualifizierter Alleinauftrag), Provisionsrecht §652 BGB (Kausalität, Doppeltätigkeit, Verwirkung), Bestellerprinzip §2 WoVermG, Wohnraumvermittlungsgesetz, Immobilienbewertung: Vergleichswertverfahren (§15 ImmoWertV), Ertragswertverfahren (§17-20 ImmoWertV: Liegenschaftszinssatz, Rohertrag, Bewirtschaftungskosten, Reinertrag, Barwertfaktor), Sachwertverfahren (§21-23 ImmoWertV: Herstellungskosten, Alterswertminderung nach Ross/Normalabschreibung), Kaufvertragsrecht §311b BGB (Beurkundungspflicht beim Notar), Due Diligence, Energieausweis (GEG §79ff), GwG Geldwäschegesetz (Identifizierungspflicht, Verdachtsmeldung §43 GwG), MaBV Makler- und Bauträgerverordnung, Fernabsatz §312b BGB, Widerrufsrecht §355 BGB 14 Tage.
Prüfungsrelevanz §34c IHK: Maklerrecht, Bewertungsverfahren, Kaufvertragsrecht, GwG, MaBV.`,

  "3": `MODUL 3 — Verwalter WEG & Mietrecht (80 Tage, 528 UE)
Themen WEG: WEG-Reform 2020 (§1ff WEG), Wohnungseigentum vs. Teileigentum, Gemeinschaft der Wohnungseigentümer (§9a WEG), Verwalterbestellung (§26 WEG, max. 5 Jahre), Verwaltervertrag, Eigentümerversammlung (§23-25 WEG: Ladungsfrist 3 Wochen, Tagesordnung, Beschlussfähigkeit, einfache/qualifizierte Mehrheit, Umlaufbeschluss), Wirtschaftsplan §28 WEG (Gesamtplan, Einzelplan, Vorschüsse), Jahresabrechnung §28 Abs.2 WEG (Gesamtabrechnung, Einzelabrechnungen, Rücklagenentwicklung), Instandhaltungsrücklage/Erhaltungsrücklage §19 Abs.2 Nr.4 WEG, Sonderumlage, Beschlusssammlung §24 Abs.7 WEG, Verwalterhonorar, WEG-Verwaltungsbeirat.
Themen Mietrecht: §535ff BGB, Mietvertrag (befristet §575 BGB, unbefristet), Miethöhe (Mietspiegel, §556d BGB Mietpreisbremse, Indexmiete §557b, Staffelmiete §557a), Nebenkostenabrechnung §556 BGB (Abrechnungsfrist 12 Monate, Nachzahlung, Guthaben, umlagefähige Betriebskosten BetrKV), Schönheitsreparaturen (BGH-Rechtsprechung, unwirksame Klauseln), Kündigung (§573 ordentlich, §543 außerordentlich, Eigenbedarfskündigung §573 Abs.2 Nr.2), Wohnungsübergabe, Kaution §551 BGB (max. 3 Nettokaltmieten).
Prüfungsrelevanz: WEG-Beschlüsse, Abrechnung, Mieterhöhung, Kündigung.`,

  "4": `MODUL 4 — Gutachter & Sachverständiger (40 Tage, 264 UE)
Themen: ImmoWertV 2021 (Immobilienwertermittlungsverordnung), Verkehrswert §194 BauGB, Vergleichswertverfahren §15 ImmoWertV (Kaufpreissammlungen, Vergleichsfaktoren, Indexreihen), Ertragswertverfahren §17-20 ImmoWertV (Jahresrohertrag, Bewirtschaftungskosten 20-35%, Jahresreinertrag, Liegenschaftszinssatz 1-6%, Nutzungsdauer, Barwertfaktor Anlage 1 ImmoWertV, Bodenwert, Gebäudeertragswert), Sachwertverfahren §21-23 ImmoWertV (Normalherstellungskosten NHK 2010/2017, Brutto-Grundfläche BGF, Alterswertminderung linear/Ross, Sachwertfaktor), Besondere objektspezifische Grundstücksmerkmale (boG), Bodenrichtwerte (BORIS, Gutachterausschüsse §192ff BauGB), Liegenschaftszinssätze (Gutachterausschuss-Berichte), Grundstücksgröße, Zuschnitt, Erschließung, Bodenkontaminationen, Denkmalschutz, Erbbaurecht §1 ErbbauRG.
Prüfungsrelevanz: Alle 3 Verfahren rechnerisch, Liegenschaftszinssatz, Barwertfaktor, Sachwertfaktor.`,

  "5": `MODUL 5 — Darlehensvermittler §34i GewO (40 Tage, 304 UE)
Themen: §34i GewO Erlaubnisvoraussetzungen (IHK-Sachkundeprüfung, Berufshaftpflicht €460.000 p.a., Zuverlässigkeit), EU-Wohnimmobilienkreditrichtlinie WIKR (§491ff BGB), ESIS-Merkblatt (Europäisches Standardisiertes Merkblatt), Kreditwürdigkeitsprüfung §505a-c BGB, Beleihungswert (60-80% des Verkehrswerts), Annuitätendarlehen (Annuität = Tilgung + Zinsen, Restschuld, Tilgungsplan), Zinsbindung (5-30 Jahre), variables Darlehen, Volltilgerdarlehen, Forward-Darlehen (max. 60 Monate im Voraus), Bauspardarlehen (Ansparphase, Zuteilung, Darlehensphase), KfW-Förderprogramme (124 Wohneigentum, 153 Energieeffizient Sanieren, 270 Erneuerbare Energien), Riester-Eigenheimrente §92a EStG (Wohn-Riester), Grundschuld §1191 BGB vs. Hypothek §1113 BGB, Rangverhältnis, Grundschuldbrief vs. Buchgrundschuld, Beratungsdokumentation §18 ImmoVermV.
Prüfungsrelevanz §34i IHK: Annuitätenberechnung, ESIS, Kreditwürdigkeitsprüfung, KfW-Förderung, WIKR.`,
};

const GENERAL_KNOWLEDGE = `
ALLGEMEINE IMMOBILIENWIRTSCHAFT:
- Maklercourtage: Standardmäßig 3,57% inkl. MwSt je Seite (seit 23.12.2020 Halbteilung §656c BGB)
- Grunderwerbsteuer: Berlin 6%, Bayern 3,5%, NRW 6,5% (variiert je Bundesland)
- Notarkosten: ca. 1,5% des Kaufpreises inkl. Grundbucheintragung
- Mietrendite brutto: Jahresnettomiete / Kaufpreis × 100
- WEG-Verwaltervergütung: typisch €20-35/Einheit/Monat
- Berliner Mietspiegel 2023: Durchschnitt €7,16/m² (einfache Lage) bis €13,50/m² (gute Lage)
- Berliner Bodenrichtwerte 2024: 400-8.000 €/m² je nach Lage
- IHK-Sachkundeprüfung §34c: schriftlich 120 Min + ggf. mündlich (bei <50% schriftlich)
- IHK-Sachkundeprüfung §34i: schriftlich 120 Min, Multiple-Choice + Berechnungsaufgaben
- Widerrufsrecht Fernabsatz: 14 Tage ab Vertragsschluss §355 BGB
- Energieausweis Pflicht: bei Verkauf und Neuvermietung (GEG §80)
`;

export function registerRagTutorRoutes(app: Express) {
  app.post("/api/ai/rag-tutor", async (req: Request, res: Response) => {
    try {
      const { question, moduleId, context } = req.body;

      if (!question || question.trim().length < 3) {
        return res.status(400).json({ error: "Frage zu kurz" });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.status(503).json({ error: "KI-Service nicht konfiguriert" });
      }

      // Relevante Modulinhalte zusammenstellen
      const moduleContext = moduleId && MODULE_KNOWLEDGE[String(moduleId)]
        ? MODULE_KNOWLEDGE[String(moduleId)]
        : Object.values(MODULE_KNOWLEDGE).join("\n\n");

      const systemPrompt = `Du bist ein professioneller KI-Tutor für die Immobilien-Akademie Smart.
Du hilfst Lernenden bei der Vorbereitung auf die IHK-Sachkundeprüfungen §34c GewO (Immobilienmakler) und §34i GewO (Darlehensvermittler) sowie bei allen Themen rund um Immobilienverwaltung und -bewertung.

DEINE WISSENSBASIS:
${moduleContext}

${GENERAL_KNOWLEDGE}

VERHALTENSREGELN:
1. Antworte immer auf Deutsch, klar und verständlich — auch für Quereinsteiger ohne Vorkenntnisse
2. Bei Rechtsfragen: Nenne immer den genauen Paragraphen (§ BGB, § WEG, § GewO etc.)
3. Bei Berechnungsaufgaben: Zeige jeden Rechenschritt einzeln, erkläre jede Formel
4. Wenn die Frage über dein Wissen hinausgeht: Sage es ehrlich und empfehle die entsprechende Lerneinheit
5. Halte Antworten präzise — maximal 300 Wörter, außer bei komplexen Berechnungen
6. Beginne nicht mit "Als KI" oder ähnlichem — antworte direkt und fachlich
7. Bei Prüfungsfragen: Nenne auch häufige Fehler und Merkhilfen`;

      // Gemini API direkt aufrufen
      const geminiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: systemPrompt }] },
            contents: [
              ...(context && context.length > 0 ? context.slice(-6).map((m: any) => ({
                role: m.role === "assistant" ? "model" : "user",
                parts: [{ text: m.content }],
              })) : []),
              {
                role: "user",
                parts: [{ text: question }],
              },
            ],
            generationConfig: {
              temperature: 0.3,
              maxOutputTokens: 1024,
            },
          }),
        }
      );

      if (!geminiResponse.ok) {
        const errText = await geminiResponse.text();
        console.error("[RAG-Tutor] Gemini Error:", errText);
        return res.status(502).json({ error: "KI-Service Fehler" });
      }

      const data = await geminiResponse.json();
      const answer = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!answer) {
        return res.status(502).json({ error: "Keine Antwort erhalten" });
      }

      res.json({ answer, moduleId: moduleId || null });
    } catch (err) {
      console.error("[RAG-Tutor] Error:", err);
      res.status(500).json({ error: "Server-Fehler" });
    }
  });
}
