/** Vorgangs-Tracker — CRM light (Phase B). */

export type VorgangTyp =
  | "mahnung"
  | "etv"
  | "schaden"
  | "beschluss"
  | "instandhaltung"
  | "nk"
  | "sonstiges";

export type VorgangStatus = "offen" | "in_bearbeitung" | "wartend" | "erledigt";

export type VerwalterVorgang = {
  id: string;
  objektId: string;
  objektName: string;
  typ: VorgangTyp;
  titel: string;
  beschreibung?: string;
  status: VorgangStatus;
  faelligAm?: string;
  relatedVorlageSlug?: string;
  createdAt: string;
  updatedAt: string;
};

export const VORGANG_TYP_LABELS: Record<VorgangTyp, string> = {
  mahnung: "Mahnung",
  etv: "Eigentümerversammlung",
  schaden: "Schaden",
  beschluss: "Beschluss",
  instandhaltung: "Instandhaltung",
  nk: "Nebenkosten",
  sonstiges: "Sonstiges",
};

export const VORGANG_STATUS_LABELS: Record<VorgangStatus, string> = {
  offen: "Offen",
  in_bearbeitung: "In Bearbeitung",
  wartend: "Wartend",
  erledigt: "Erledigt",
};

export const VORGANG_STATUS_ORDER: VorgangStatus[] = [
  "offen",
  "in_bearbeitung",
  "wartend",
  "erledigt",
];

/** Empfohlene Vorlage pro Vorgangstyp */
export const VORGANG_TYP_VORLAGE: Partial<Record<VorgangTyp, string>> = {
  mahnung: "mahnung-stufe1",
  etv: "etv-einladung",
  schaden: "versicherungsschaden",
  beschluss: "beschluss-hinweis",
  instandhaltung: "instandhaltung-protokoll",
  nk: "nk-erklaerung",
};

export function isVorgangOverdue(v: VerwalterVorgang): boolean {
  if (!v.faelligAm || v.status === "erledigt") return false;
  const due = new Date(v.faelligAm);
  if (Number.isNaN(due.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return due < today;
}
