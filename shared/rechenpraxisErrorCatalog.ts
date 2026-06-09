/** Regelbasiertes Feedback bei falscher Rechenpraxis-Antwort (ohne KI-Kosten) */

export interface RechenpraxisSchrittInput {
  formel: string;
  korrekt: number;
  toleranz?: number;
  einheit: string;
  variablen: { kuerzel: string; bedeutung: string; wert?: string }[];
}

export interface RechenpraxisErrorFeedback {
  message: string;
  hint?: string;
  moduleHref?: string;
  moduleLabel?: string;
}

const BEREICH_MODULE: Record<string, { href: string; label: string }> = {
  "Maklercourtage & Provision": { href: "/modul/5", label: "Modul 5: §34i" },
  "Mietrendite & Kaufpreisfaktor": { href: "/modul/4", label: "Modul 4: Bewertung" },
  "Annuität & Tilgung": { href: "/modul/5", label: "Modul 5: §34i" },
  "Kaufnebenkosten": { href: "/modul/4", label: "Modul 4: Bewertung" },
  "WEG-Hausgeld & Abrechnung": { href: "/modul/3", label: "Modul 3: WEG-Verwalter" },
  "Wertermittlung": { href: "/modul/4", label: "Modul 4: Bewertung" },
  "AfA & Steuervorteile": { href: "/modul/4", label: "Modul 4: Bewertung" },
};

function parseNumericInput(raw: string): number {
  const cleaned = raw.trim().replace(/\s/g, "").replace(/\./g, (m, offset, s) => {
    const after = s.slice(offset + 1);
    return after.length === 3 && /^\d{3}/.test(after) ? "" : m;
  }).replace(",", ".");
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : NaN;
}

function parseVariableValue(wert?: string): number | null {
  if (!wert) return null;
  const match = wert.replace(/\s/g, "").match(/-?[\d.,]+/);
  if (!match) return null;
  const n = parseNumericInput(match[0]);
  return Number.isFinite(n) ? n : null;
}

function within(a: number, b: number, tol: number): boolean {
  return Math.abs(a - b) <= Math.max(tol, Math.abs(b) * 0.005);
}

type Pattern = {
  test: (eingabe: number, korrekt: number, tol: number) => boolean;
  message: string;
  hint?: string;
};

function buildPatterns(schritt: RechenpraxisSchrittInput): Pattern[] {
  const patterns: Pattern[] = [
    {
      test: (e, k, t) => within(e * 100, k, t) || within(e / 100, k, t),
      message: "Prozent und Dezimalzahl könnten vertauscht sein.",
      hint: "3,57 % als Dezimalzahl = 0,0357 — nicht 3,57.",
    },
    {
      test: (e, k, t) => within(e * 10, k, t) || within(e / 10, k, t),
      message: "Ein Komma könnte verschoben sein (Faktor 10).",
      hint: "Prüfen Sie, ob Sie mit Tausendern oder Zehnern gerechnet haben.",
    },
    {
      test: (e, k, t) => schritt.einheit === "€" && (within(e * 12, k, t) || within(e / 12, k, t)),
      message: "Monats- und Jahresbetrag könnten verwechselt sein.",
      hint: "Jahresbetrag ÷ 12 = Monatsbetrag (und umgekehrt).",
    },
    {
      test: (e, k, t) => within(e * 1.19, k, t) || within(e / 1.19, k, t),
      message: "Mehrwertsteuer (19 %) könnte fehlen oder doppelt sein.",
      hint: "Netto × 1,19 = Brutto · Brutto ÷ 1,19 = Netto.",
    },
    {
      test: (e, k, t) => within(e * 1.0357, k, t) || within(e / 1.0357, k, t),
      message: "Courtage brutto/netto könnte verwechselt sein.",
      hint: "Üblicher Provisionssatz: 3,57 % brutto (3 % netto + MwSt).",
    },
    {
      test: (e, k, t) => within(-e, k, t),
      message: "Das Vorzeichen könnte falsch sein.",
      hint: "Kosten und Guthaben haben unterschiedliche Vorzeichen.",
    },
  ];

  for (const v of schritt.variablen) {
    const val = parseVariableValue(v.wert);
    if (val === null) continue;
    patterns.push({
      test: (e, k, t) => e !== k && within(e, val, t),
      message: `Sie haben vermutlich nur „${v.kuerzel}" (${v.bedeutung}) übernommen.`,
      hint: "Setzen Sie den Wert in die Formel ein — nicht nur ablesen.",
    });
  }

  return patterns;
}

export function getWrongAnswerFeedback(
  schritt: RechenpraxisSchrittInput,
  rawInput: string,
  bereich?: string,
): RechenpraxisErrorFeedback {
  const eingabe = parseNumericInput(rawInput);
  const korrekt = schritt.korrekt;
  const tol = schritt.toleranz ?? 0.01;
  const moduleInfo = bereich ? BEREICH_MODULE[bereich] : undefined;

  if (Number.isNaN(eingabe)) {
    return {
      message: "Bitte geben Sie eine Zahl ein (Komma oder Punkt als Dezimaltrennzeichen).",
      moduleHref: moduleInfo?.href,
      moduleLabel: moduleInfo?.label,
    };
  }

  for (const pattern of buildPatterns(schritt)) {
    if (pattern.test(eingabe, korrekt, tol)) {
      return {
        message: pattern.message,
        hint: pattern.hint,
        moduleHref: moduleInfo?.href,
        moduleLabel: moduleInfo?.label,
      };
    }
  }

  const diff = Math.abs(eingabe - korrekt);
  const relDiff = korrekt !== 0 ? diff / Math.abs(korrekt) : diff;

  if (relDiff < 0.15) {
    return {
      message: "Sie sind nah dran — prüfen Sie Rundung und die letzte Rechenoperation.",
      hint: schritt.formel ? `Formel: ${schritt.formel}` : undefined,
      moduleHref: moduleInfo?.href,
      moduleLabel: moduleInfo?.label,
    };
  }

  return {
    message: "Das Ergebnis weicht deutlich ab. Arbeiten Sie die Formel Schritt für Schritt durch.",
    hint: "Nutzen Sie den Tipp oder fragen Sie den KI-Assistenten, wenn Sie nicht weiterkommen.",
    moduleHref: moduleInfo?.href,
    moduleLabel: moduleInfo?.label,
  };
}
