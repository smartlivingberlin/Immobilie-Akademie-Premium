/** WEG-Objekt-Stammdaten (CRM-Basis, Phase B). */

export type VerwalterEinheit = {
  id: string;
  nummer: string;
  mea: number;
  eigentuemerName?: string;
  flaecheQm?: number;
};

export type VerwalterObjekt = {
  id: string;
  name: string;
  adresse: string;
  plz: string;
  ort: string;
  einheitenAnzahl: number;
  verwalterName: string;
  verwalterAdresse: string;
  kontaktEmail?: string;
  kontaktTelefon?: string;
  notizen?: string;
  einheiten: VerwalterEinheit[];
  createdAt: string;
  updatedAt: string;
};

export function objektToVorlageDefaults(obj: VerwalterObjekt): Record<string, string> {
  return {
    wegName: obj.name,
    objektAdresse: `${obj.adresse}, ${obj.plz} ${obj.ort}`,
    verwalterName: obj.verwalterName,
    verwalterAdresse: obj.verwalterAdresse,
    kontakt: [obj.kontaktEmail, obj.kontaktTelefon].filter(Boolean).join(" · "),
  };
}
