/** Einfache Keyword-Klassifikation für eingehende E-Mails. */

import type { InboxVorgangTypVorschlag } from "./verwalterInboxTypes";

const RULES: { typ: InboxVorgangTypVorschlag; patterns: RegExp[] }[] = [
  { typ: "schaden", patterns: [/schaden/i, /wasserschaden/i, /versicherung/i, /defekt/i] },
  { typ: "mahnung", patterns: [/mahnung/i, /rückstand/i, /hausgeld/i, /zahlung/i] },
  { typ: "etv", patterns: [/eigentümerversammlung/i, /\betv\b/i, /versammlung/i, /tagesordnung/i] },
  { typ: "beschluss", patterns: [/beschluss/i, /anfechtung/i] },
  { typ: "instandhaltung", patterns: [/instandhaltung/i, /sanierung/i, /reparatur/i, /wartung/i] },
  { typ: "nk", patterns: [/nebenkosten/i, /\bnk\b/i, /betriebskosten/i, /abrechnung/i] },
];

export function classifyInboxEmail(subject: string, body: string): InboxVorgangTypVorschlag {
  const text = `${subject}\n${body}`;
  for (const rule of RULES) {
    if (rule.patterns.some((p) => p.test(text))) return rule.typ;
  }
  return "sonstiges";
}

export function buildVorgangTitelFromEmail(
  typ: InboxVorgangTypVorschlag,
  subject: string,
): string {
  const clean = subject.trim().slice(0, 120) || "E-Mail ohne Betreff";
  const prefix: Record<InboxVorgangTypVorschlag, string> = {
    schaden: "Schaden",
    mahnung: "Zahlung",
    etv: "ETV",
    beschluss: "Beschluss",
    instandhaltung: "Instandhaltung",
    nk: "Nebenkosten",
    sonstiges: "E-Mail",
  };
  return `${prefix[typ]} — ${clean}`;
}
