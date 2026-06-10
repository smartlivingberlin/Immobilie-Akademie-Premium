/** Event-Bus für Verwalter-Automatisierung (P0 Fundament). */

export type VerwalterEventStatus = "neu" | "verarbeitet" | "archiviert";

export type VerwalterEventTyp =
  | "vorgang.angelegt"
  | "frist.vorgang_angelegt"
  | "fristen.batch_angelegt"
  | "freigabe.angelegt"
  | "email.eingegangen"
  | "email.vorgang_angelegt"
  | "etv.workflow_gestartet"
  | "etv.phase_fortgeschritten"
  | "etv.beschluss_angelegt"
  | "system.hinweis";

export type VerwalterEvent = {
  id: string;
  objektId?: string;
  vorgangId?: string;
  typ: VerwalterEventTyp;
  payload?: Record<string, unknown>;
  status: VerwalterEventStatus;
  createdAt: string;
  updatedAt: string;
};

export type VerwalterFreigabeStatus = "ausstehend" | "freigegeben" | "abgelehnt";

export type VerwalterFreigabeKind = "brief_entwurf" | "mail_entwurf" | "buchung_vorschlag";

export type VerwalterFreigabe = {
  id: string;
  objektId?: string;
  vorgangId?: string;
  kind: VerwalterFreigabeKind;
  titel: string;
  payload: Record<string, unknown>;
  status: VerwalterFreigabeStatus;
  createdAt: string;
  updatedAt: string;
};

export const VERWALTER_FREIGABE_KIND_LABELS: Record<VerwalterFreigabeKind, string> = {
  brief_entwurf: "Brief-Entwurf",
  mail_entwurf: "E-Mail-Entwurf",
  buchung_vorschlag: "Buchungsvorschlag",
};
