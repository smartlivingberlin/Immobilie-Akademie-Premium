# DATEV-Export — Spezifikation (Phase B)

Stand: Juni 2026 · Verwalter-Rechner / Rechenpraxis

## Ziel

Schnittstelle zur Treuhand-Buchhaltung: Hausverwaltung erfasst Buchungen, Steuerberater importiert in DATEV.

**Wichtig:** DATEV-Buchungsstapel setzen echte Buchungssätze voraus. Stammdaten-CSV allein reicht für Phase A.

## Phasen

| Phase | Inhalt | Status |
|-------|--------|--------|
| **A** | Stammdaten-CSV (Objekte, Einheiten) | ✅ `GET /api/verwalter/export/stammdaten-csv` |
| **B** | Hausgeld-Buchungen light + EXTF Buchungsstapel | ✅ Live |
| **C** | DATEV-Connect API, SKR-Auto-Zuordnung | Später |

## Phase A — Stammdaten-CSV (jetzt)

**Endpoint:** `GET /api/verwalter/export/stammdaten-csv` (Auth erforderlich)

**Spalten:**

| Spalte | Beschreibung |
|--------|--------------|
| objekt_id | Interne ID |
| weg_name | WEG-Bezeichnung |
| adresse | Straße |
| plz | PLZ |
| ort | Ort |
| verwalter_name | Verwaltung |
| einheit_nr | Einheitennummer |
| mea | Miteigentumsanteil |
| eigentuemer | Eigentümername |
| flaeche_qm | Wohnfläche optional |

**Encoding:** UTF-8 mit BOM (Excel-kompatibel), Trennzeichen `;`

**Nutzung:** Onboarding in Treuhand-Software, keine Buchungen.

## Phase B — Buchungsmodul (vor DATEV-Export)

Neue Entität `VerwalterBuchung` (File-Store oder Drizzle):

```typescript
type VerwalterBuchung = {
  id: string;
  objektId: string;
  datum: string;           // YYYY-MM-DD
  betrag: number;          // positiv = Soll
  sollKonto: string;       // z.B. "1200"
  habenKonto: string;      // z.B. "8400"
  buchungstext: string;
  belegNr?: string;
  einheitId?: string;
  periode: string;         // z.B. "2026-01"
};
```

**UI:** `/app/verwalter/buchungen` — manuelle Erfassung pro Objekt/Monat. ✅

**API:**
- `GET/POST/PUT/DELETE /api/verwalter/buchungen`
- `GET /api/verwalter/export/datev-buchungen?objektId=&periode=`

**Validierung:**
- Soll/Haben-Konten nicht leer
- Betrag > 0
- Datum innerhalb Periode

## Phase B — DATEV EXTF Buchungsstapel (CSV)

Format: [DATEV-Formatbeschreibung Buchungsstapel](https://www.datev.de) — vereinfachte Variante.

**Pflichtfelder pro Zeile (Minimum):**

| Feld | DATEV-Feld | Beispiel |
|------|------------|----------|
| Umsatz | Umsatz | 150,00 |
| Soll/Haben | S/H | S |
| Konto | Konto | 1200 |
| Gegenkonto | Gegenkonto | 8400 |
| BU-Schlüssel | BU | (leer oder 0) |
| Belegdatum | Belegdatum | 0106 |
| Buchungstext | Buchungstext | Hausgeld WE 3 |

**Endpoint:** `GET /api/verwalter/export/datev-buchungen?objektId=&periode=2026-01` ✅

**Dateiname:** `EXTF_Buchungen_{objektId}_{periode}.csv`

## Kontenrahmen (Empfehlung SKR03)

| Konto | Bedeutung (WEG) |
|-------|-----------------|
| 1200 | Bank |
| 1400 | Forderungen Eigentümer |
| 8400 | Erlöse Hausgeld |
| 4970 | Nebenkosten |

*Hinweis: Kontenrahmen je Mandant unterschiedlich — konfigurierbar in Phase C.*

## Was wir bewusst nicht exportieren (Phase A/B)

- Keine fiktiven Buchungen aus Rechenpraxis-Übungsfällen
- Kein DATEV-Connect ohne echte Buchungshistorie
- Keine Steuerberatung / keine Kontenempfehlung als Rechtsberatung

## Migration File-Store → DB

Wenn Buchungsvolumen oder Team-Zugang steigt:

1. Drizzle-Migration `verwalter_buchungen` (neue Tabelle, nicht `schema.ts` patchen wenn gesperrt)
2. Import aus `data/verwalter-objekte/` und `data/verwalter-vorgaenge/`
3. API-Verträge unverändert lassen

## Nächste Implementierungsschritte

1. ✅ Stammdaten-CSV
2. ✅ Buchungs-Store + CRUD-API (`data/verwalter-buchungen/`)
3. ✅ Buchungs-UI `/app/verwalter/buchungen`
4. ✅ EXTF-Generator aus `listBuchungen(objektId, periode)`
5. Nutzer-Test mit 1 Steuerberater (5 Buchungen importieren)

---

*Keine Rechts- oder Steuerberatung. DATEV ist eingetragenes Markenzeichen der DATEV eG.*
