/** E-Mail-Inbox für Verwalter (P2 — eingehende Mails → Vorgänge). */

export type InboxMessageStatus = "neu" | "zugeordnet" | "vorgang" | "archiviert";

export type InboxVorgangTypVorschlag =
  | "schaden"
  | "mahnung"
  | "etv"
  | "beschluss"
  | "instandhaltung"
  | "nk"
  | "sonstiges";

export type VerwalterInboxMessage = {
  id: string;
  messageId?: string;
  fromEmail: string;
  fromName?: string;
  subject: string;
  bodyText?: string;
  bodyHtml?: string;
  objektId?: string;
  einheitId?: string;
  vorgangId?: string;
  vorgangTypVorschlag?: InboxVorgangTypVorschlag;
  status: InboxMessageStatus;
  createdAt: string;
  updatedAt: string;
};

export const INBOX_STATUS_LABELS: Record<InboxMessageStatus, string> = {
  neu: "Neu",
  zugeordnet: "Objekt zugeordnet",
  vorgang: "Als Vorgang angelegt",
  archiviert: "Archiviert",
};

export type InboundEmailPayload = {
  messageId?: string;
  from: string;
  fromName?: string;
  subject: string;
  text?: string;
  html?: string;
  to?: string;
};
