/** Erkennung Buchungs-Anfragen im Assistenten-Chat. */

export function looksLikeBuchungsAnfrage(text: string): boolean {
  const t = text.trim();
  if (t.length < 4) return false;
  const hasAmount = /\d+[,.]?\d*\s*(?:€|eur|euro)?/i.test(t) || /\d+\s*(?:€|eur|euro)/i.test(t);
  const hasBookingKeyword =
    /hausgeld|haus\s*geld|buchung|buchen|eingang|zahlung|überweisung|ueberweisung|nk\b|nebenkosten|mahnung|forderung|rückstand|rueckstand|betrag/i.test(
      t,
    );
  const explicit =
    /buchung\s+(anlegen|erstellen|erfassen)|lege\s+(eine\s+)?buchung|konto\s+\d{4}/i.test(t);
  return explicit || (hasAmount && hasBookingKeyword) || (hasBookingKeyword && /\d/.test(t));
}
