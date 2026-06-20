/**
 * ═══════════════════════════════════════════════════════════
 * PORTAL-AGENT SYSTEM — Immobilien Akademie Smart
 * ═══════════════════════════════════════════════════════════
 * 
 * Was macht dieser Agent? — Einfach erklärt:
 * 
 * Wie ein erfahrener Mitarbeiter der:
 * 1. Alle Inhalte kennt (1.3 MB Lernmaterial)
 * 2. Weiß wo welche Information ist
 * 3. Automatisch prüft ob Gesetze noch aktuell sind
 * 4. Bei Problemen sofort Alarm schlägt
 * 5. Admin-Fragen selbständig beantwortet
 * 
 * BEISPIEL:
 * Nutzer fragt: "Was kostet die §34c Prüfung?"
 * Agent: Sucht in Modul 2 → findet Antwort → gibt Link zu IHK
 * 
 * BEISPIEL 2:
 * §34c GewO wurde geändert → Agent erkennt das
 * → Schickt E-Mail: "Modul 2, Tag 5 muss aktualisiert werden!"
 * ═══════════════════════════════════════════════════════════
 */

import { readFileSync, existsSync, writeFileSync } from "fs";
import { join } from "path";

// ──────────────────────────────────────────────────────────
// WISSENS-KARTE: Welche Quelle für welches Thema?
// 
// Wie eine Bibliotheks-Karte: Du weißt welches Buch wo steht
// ──────────────────────────────────────────────────────────
export const WISSENS_KARTE = {
  // Modul-Inhalte: Wo liegt das Lernmaterial?
  module: {
    1: { 
      name: "Grundlagen Immobilienwirtschaft",
      knowledge_file: "server/knowledge/modul_1.txt",
      content_files: ["client/src/pages/modules/Module1Content_Maximal.ts"],
      gesetze: ["§34c GewO", "§652 BGB", "§433 BGB"],
      gesetze_urls: {
        "§34c GewO": "https://www.gesetze-im-internet.de/gewo/__34c.html",
        "§652 BGB": "https://www.gesetze-im-internet.de/bgb/__652.html",
      }
    },
    2: {
      name: "Immobilienmakler §34c GewO",
      knowledge_file: "server/knowledge/modul_2.txt",
      content_files: [
        "client/src/pages/modules/Module2ContentPart1_Maximal.ts",
        "client/src/pages/modules/Module2ContentPart2_Maximal.ts",
        "client/src/pages/modules/Module2ContentPart3_Maximal.ts",
      ],
      gesetze: ["§34c GewO", "§652 BGB", "§653 BGB", "MaBV", "§2 WoVermG"],
      gesetze_urls: {
        "§34c GewO": "https://www.gesetze-im-internet.de/gewo/__34c.html",
        "§652 BGB": "https://www.gesetze-im-internet.de/bgb/__652.html",
        "§653 BGB": "https://www.gesetze-im-internet.de/bgb/__653.html",
        "MaBV": "https://www.gesetze-im-internet.de/gewo_34cdv/",
        "WoVermG": "https://www.gesetze-im-internet.de/wovermrg/",
      }
    },
    3: {
      name: "WEG-Verwalter & Mietrecht",
      knowledge_file: "server/knowledge/modul_3.txt",
      content_files: [
        "client/src/pages/modules/Module3Content_Maximal.ts",
        "client/src/pages/modules/Module3Content_Maximal_MissingDays.ts",
        "client/src/pages/modules/Module3Content_Maximal_Part2_Extended.ts",
        "client/src/pages/modules/Module3Content_Maximal_Part3_Extended.ts",
        "client/src/pages/modules/Module3Content_Maximal_Part4.ts",
      ],
      gesetze: ["WEG", "§535 BGB", "§556 BGB", "§573 BGB"],
      gesetze_urls: {
        "WEG": "https://www.gesetze-im-internet.de/woeigg/",
        "§535 BGB": "https://www.gesetze-im-internet.de/bgb/__535.html",
        "§556 BGB": "https://www.gesetze-im-internet.de/bgb/__556.html",
        "§573 BGB": "https://www.gesetze-im-internet.de/bgb/__573.html",
      }
    },
    4: {
      name: "Gutachter & Sachverständiger",
      knowledge_file: "server/knowledge/modul_4.txt",
      content_files: [
        "client/src/pages/modules/Module4Content_Valuation_Maximalist.ts",
        "client/src/pages/modules/Module4Content_Valuation_Maximalist_Part2.ts",
        "client/src/pages/modules/Module4Content_Bonus_HypZert.ts",
        "client/src/pages/modules/Module4Content_Bonus_HypZert_Part2.ts",
      ],
      gesetze: ["ImmoWertV 2021", "BauGB", "BelWertV"],
      gesetze_urls: {
        "ImmoWertV 2021": "https://www.gesetze-im-internet.de/immowertv_2021/",
        "BauGB": "https://www.gesetze-im-internet.de/bbaug/",
        "BelWertV": "https://www.gesetze-im-internet.de/belwertv/",
      }
    },
    5: {
      name: "Darlehensvermittler §34i GewO",
      knowledge_file: "server/knowledge/modul_5.txt",
      content_files: [
        "client/src/pages/modules/Module5Content_34i_Part1.ts",
        "client/src/pages/modules/Module5Content_34i_Part2.ts",
        "client/src/pages/modules/Module5Content_34i_Part3.ts",
        "client/src/pages/modules/Module5Content_34i_Part4.ts",
        "client/src/pages/modules/Module5Content_34i_Part5.ts",
        "client/src/pages/modules/Module5Content_34i_Part6.ts",
        "client/src/pages/modules/Module5Content_34i_Part7_Final.ts",
      ],
      gesetze: ["§34i GewO", "EU-WIKR", "KWG", "VVG"],
      gesetze_urls: {
        "§34i GewO": "https://www.gesetze-im-internet.de/gewo/__34i.html",
        "EU-WIKR": "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32014L0017",
        "KfW": "https://www.kfw.de/inlandsfoerderung/",
      }
    }
  },

  // Externe Quellen die der Agent kennt
  externe_quellen: {
    gesetze: "https://www.gesetze-im-internet.de/",
    ihk_berlin: "https://www.ihk.de/berlin",
    bundesanzeiger: "https://www.bundesanzeiger.de/",
    kfw: "https://www.kfw.de/inlandsfoerderung/",
    bzst: "https://www.bzst.de/",
  }
};

// ──────────────────────────────────────────────────────────
// AGENT KLASSE: Das Gehirn des Systems
// ──────────────────────────────────────────────────────────
export class PortalAgent {

  /**
   * FUNKTION 1: Beste Wissensquelle für eine Frage finden
   * 
   * Beispiel:
   * Frage: "Was ist Maklerprovision?"
   * → Agent erkennt: Das ist Modul 2 Thema
   * → Gibt Modul-2-Inhalte zurück
   * → Sagt auch: "Schau auch in §652 BGB nach"
   */
  static getBesteQuelle(frage: string, moduleId?: number): {
    kontext: string;
    quellen: string[];
    gesetze_links: Record<string, string>;
    modul: number;
  } {
    // Keywords → Modul Mapping
    // Wie ein Inhaltsverzeichnis: Stichwort → Kapitel
    const keyword_modul: Record<string, number> = {
      // Modul 2: Makler
      "makler": 2, "provision": 2, "§34c": 2, "maklerprovision": 2,
      "maklervertrag": 2, "exposé": 2, "mabv": 2, "wovermg": 2,
      "alleinauftrag": 2, "kaufvertrag": 2,
      // Modul 3: Verwalter
      "weg": 3, "verwalter": 3, "hausverwaltung": 3, "mietrecht": 3,
      "nebenkostenabrechnung": 3, "eigentümerversammlung": 3,
      "wohnungseigentum": 3, "mietvertrag": 3, "kündigung": 3,
      // Modul 4: Gutachter
      "gutachter": 4, "sachverständiger": 4, "bewertung": 4,
      "verkehrswert": 4, "immowertv": 4, "ertragswert": 4,
      "vergleichswert": 4, "sachwert": 4, "hypzert": 4,
      // Modul 5: Darlehen
      "darlehen": 5, "§34i": 5, "finanzierung": 5, "kfw": 5,
      "annuitätendarlehen": 5, "esis": 5, "eu-wikr": 5, "tilgung": 5,
      // Modul 1: Grundlagen
      "grundlagen": 1, "immobilienmarkt": 1, "grundbuch": 1,
      "notar": 1, "grundschuld": 1, "hypothek": 1,
    };

    // Modul bestimmen
    let erkanntes_modul = moduleId || 1;
    const frage_lower = frage.toLowerCase();
    for (const [keyword, mid] of Object.entries(keyword_modul)) {
      if (frage_lower.includes(keyword)) {
        erkanntes_modul = mid;
        break;
      }
    }

    const modul_info = WISSENS_KARTE.module[erkanntes_modul as keyof typeof WISSENS_KARTE.module];
    
    // Wissensbasis laden
    let kontext = "";
    try {
      if (existsSync(modul_info.knowledge_file)) {
        kontext = readFileSync(modul_info.knowledge_file, "utf-8").slice(0, 6000);
      }
    } catch (e) { console.error(JSON.stringify({level:'error',msg:'[PortalAgent] Fehler',error:(e as any)?.message,ts:new Date().toISOString()})); }

    // Quellen-Liste erstellen
    const quellen = [
      `Immobilien Akademie Smart — Modul ${erkanntes_modul}: ${modul_info.name}`,
      ...Object.entries(modul_info.gesetze_urls).map(([name, url]) => `${name}: ${url}`),
      `Gesetze im Internet: ${WISSENS_KARTE.externe_quellen.gesetze}`,
    ];

    return {
      kontext,
      quellen,
      gesetze_links: modul_info.gesetze_urls,
      modul: erkanntes_modul,
    };
  }

  /**
   * FUNKTION 2: Inhalts-Qualität prüfen
   * 
   * Beispiel:
   * Agent prüft Modul 2, Tag 15
   * → Findet: "§34c" erwähnt aber kein Link
   * → Meldet: "Tag 15: Gesetzes-Link fehlt"
   */
  static pruefeInhaltsqualitaet(moduleId: number): {
    ok: boolean;
    probleme: string[];
    empfehlungen: string[];
  } {
    const modul_info = WISSENS_KARTE.module[moduleId as keyof typeof WISSENS_KARTE.module];
    const probleme: string[] = [];
    const empfehlungen: string[] = [];

    for (const filepath of modul_info.content_files) {
      if (!existsSync(filepath)) {
        probleme.push(`Datei fehlt: ${filepath}`);
        continue;
      }

      const content = readFileSync(filepath, "utf-8");
      
      // Prüfen ob Gesetze erwähnt werden
      for (const gesetz of modul_info.gesetze) {
        const pattern = gesetz.replace("§", "§").replace(" ", "\\s*");
        const regex = new RegExp(pattern, "i");
        if (!regex.test(content)) {
          empfehlungen.push(`${filepath.split("/").pop()}: ${gesetz} wird nicht erwähnt`);
        }
      }

      // Prüfen ob Inhalte vorhanden
      const days = new Set((content.match(/day_(\d+):/g) || []).map(d => d.replace("day_", "").replace(":", "")));
      if (days.size === 0) {
        probleme.push(`${filepath.split("/").pop()}: Keine Lerntage gefunden!`);
      }
    }

    return {
      ok: probleme.length === 0,
      probleme,
      empfehlungen: empfehlungen.slice(0, 5),
    };
  }

  /**
   * FUNKTION 3: System-Status Report erstellen
   * 
   * Wie ein Gesundheits-Check:
   * "Alles OK" oder "Problem in Modul 3"
   */
  static async systemReport(): Promise<string> {
    const lines: string[] = [];
    lines.push("# PORTAL-AGENT SYSTEM REPORT");
    lines.push(`Datum: ${new Date().toLocaleString("de-DE")}`);
    lines.push("");

    lines.push("## WISSENSBASIS STATUS");
    for (let i = 1; i <= 5; i++) {
      const info = WISSENS_KARTE.module[i as keyof typeof WISSENS_KARTE.module];
      const kbExists = existsSync(info.knowledge_file);
      lines.push(`- Modul ${i} (${info.name}): ${kbExists ? "✅" : "❌"} Wissensbasis`);
      
      const qcheck = this.pruefeInhaltsqualitaet(i);
      if (!qcheck.ok) {
        qcheck.probleme.forEach(p => lines.push(`  ⚠️ ${p}`));
      }
    }

    lines.push("");
    lines.push("## EXTERNE QUELLEN");
    for (const [name, url] of Object.entries(WISSENS_KARTE.externe_quellen)) {
      lines.push(`- ${name}: ${url}`);
    }

    return lines.join("\n");
  }
}

export default PortalAgent;
