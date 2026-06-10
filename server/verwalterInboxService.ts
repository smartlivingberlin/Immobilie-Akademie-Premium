import {
  buildVorgangTitelFromEmail,
  classifyInboxEmail,
} from "../shared/verwalterInboxClassifier";
import { isVerwalterInboxEnabled } from "../shared/verwalterFeatureFlags";
import type { InboundEmailPayload, VerwalterInboxMessage } from "../shared/verwalterInboxTypes";
import type { VerwalterVorgang } from "../shared/verwalterVorgangTypes";
import { listObjekte } from "./verwalterObjektStore";
import { createVorgang } from "./verwalterVorgangStore";
import { appendVerwalterEvent, createVerwalterFreigabe } from "./verwalterEventStore";
import {
  createInboxMessage,
  getInboxMessage,
  updateInboxMessage,
} from "./verwalterInboxStore";

function parseFromAddress(from: string): { email: string; name?: string } {
  const trimmed = from.trim();
  const match = trimmed.match(/^(.+?)\s*<([^>]+)>$/);
  if (match) {
    return { name: match[1].trim().replace(/^"|"$/g, ""), email: match[2].trim().toLowerCase() };
  }
  return { email: trimmed.toLowerCase() };
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function assertInboxEnabled(): void {
  if (!isVerwalterInboxEnabled()) {
    throw new Error("E-Mail-Inbox ist deaktiviert (VERWALTER_INBOX_ENABLED=0)");
  }
}

async function matchObjektBySender(
  userId: number,
  fromEmail: string,
): Promise<{ objektId?: string; einheitId?: string }> {
  const email = normalizeEmail(fromEmail);
  const objekte = await listObjekte(userId);
  for (const obj of objekte) {
    if (obj.kontaktEmail && normalizeEmail(obj.kontaktEmail) === email) {
      return { objektId: obj.id };
    }
    for (const einheit of obj.einheiten) {
      if (einheit.kontaktEmail && normalizeEmail(einheit.kontaktEmail) === email) {
        return { objektId: obj.id, einheitId: einheit.id };
      }
    }
  }
  return {};
}

export async function ingestInboundEmail(
  userId: number,
  payload: InboundEmailPayload,
): Promise<VerwalterInboxMessage> {
  assertInboxEnabled();
  if (!payload.from?.trim()) throw new Error("from erforderlich");
  if (!payload.subject?.trim()) throw new Error("subject erforderlich");

  const parsed = parseFromAddress(payload.from);
  const bodyText = payload.text?.trim() || stripHtml(payload.html || "");
  const vorgangTypVorschlag = classifyInboxEmail(payload.subject, bodyText);
  const match = await matchObjektBySender(userId, parsed.email);

  const message = await createInboxMessage(userId, {
    messageId: payload.messageId,
    fromEmail: parsed.email,
    fromName: payload.fromName || parsed.name,
    subject: payload.subject.trim(),
    bodyText: bodyText || undefined,
    bodyHtml: payload.html,
    objektId: match.objektId,
    einheitId: match.einheitId,
    vorgangTypVorschlag,
    status: match.objektId ? "zugeordnet" : "neu",
  });

  try {
    await appendVerwalterEvent(userId, {
      typ: "email.eingegangen",
      objektId: message.objektId,
      payload: {
        inboxId: message.id,
        from: message.fromEmail,
        subject: message.subject,
        vorgangTypVorschlag,
      },
    });
  } catch {
    /* optional */
  }

  return message;
}

function stripHtml(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export async function createVorgangFromInbox(
  userId: number,
  inboxId: string,
  opts?: { objektId?: string; typ?: VerwalterInboxMessage["vorgangTypVorschlag"] },
): Promise<{ message: VerwalterInboxMessage; vorgang: VerwalterVorgang; freigabeId?: string }> {
  assertInboxEnabled();

  const message = await getInboxMessage(userId, inboxId);
  if (!message) throw new Error("Inbox-Nachricht nicht gefunden");
  if (message.vorgangId) throw new Error("Bereits als Vorgang angelegt");

  const objektId = opts?.objektId || message.objektId;
  if (!objektId) throw new Error("objektId erforderlich — zuerst Objekt zuordnen");

  const objekte = await listObjekte(userId);
  const obj = objekte.find((o) => o.id === objektId);
  if (!obj) throw new Error("Objekt nicht gefunden");

  const typ = opts?.typ || message.vorgangTypVorschlag || "sonstiges";
  const titel = buildVorgangTitelFromEmail(typ, message.subject);
  const snippet = (message.bodyText || "").slice(0, 2000);

  const vorgang = await createVorgang(userId, {
    objektId: obj.id,
    objektName: obj.name,
    typ,
    titel,
    beschreibung: [
      `Quelle: E-Mail-Inbox`,
      `Von: ${message.fromName ? `${message.fromName} ` : ""}<${message.fromEmail}>`,
      `Betreff: ${message.subject}`,
      "",
      snippet || "(kein Textinhalt)",
    ].join("\n"),
    status: "offen",
  });

  let freigabeId: string | undefined;
  if (snippet) {
    const freigabe = await createVerwalterFreigabe(userId, {
      kind: "mail_entwurf",
      titel: `Antwort: ${message.subject.slice(0, 80)}`,
      objektId: obj.id,
      vorgangId: vorgang.id,
      payload: {
        to: message.fromEmail,
        subject: `Re: ${message.subject}`,
        text: `Sehr geehrte Damen und Herren,\n\nvielen Dank für Ihre Nachricht vom ${new Date(message.createdAt).toLocaleDateString("de-DE")}.\n\n[Ihre Antwort hier]\n\nMit freundlichen Grüßen\n${obj.verwalterName}`,
        inboxId: message.id,
      },
    });
    freigabeId = freigabe.id;
  }

  const updated = await updateInboxMessage(userId, inboxId, {
    objektId,
    vorgangId: vorgang.id,
    status: "vorgang",
    vorgangTypVorschlag: typ,
  });
  if (!updated) throw new Error("Inbox-Status konnte nicht aktualisiert werden");

  try {
    await appendVerwalterEvent(userId, {
      typ: "email.vorgang_angelegt",
      objektId: obj.id,
      vorgangId: vorgang.id,
      payload: { inboxId: message.id, freigabeId },
    });
  } catch {
    /* optional */
  }

  return { message: updated, vorgang, freigabeId };
}

export async function assignInboxObjekt(
  userId: number,
  inboxId: string,
  objektId: string,
  einheitId?: string,
): Promise<VerwalterInboxMessage> {
  assertInboxEnabled();
  const updated = await updateInboxMessage(userId, inboxId, {
    objektId,
    einheitId: einheitId ?? null,
    status: "zugeordnet",
  });
  if (!updated) throw new Error("Inbox-Nachricht nicht gefunden");
  return updated;
}
