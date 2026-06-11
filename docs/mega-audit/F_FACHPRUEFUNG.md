# Teil F — Immobilienwirtschaftliche Fachprüfung

**Rolle:** Immobilienexperte / IHK-Prüfungsexperte §34c/§34i/WEG  
**Stand:** 2026-06-11 · HEAD `fcb7ac5`

⚠️ **Abgrenzung:** Gesetzes-Aktualität nach 2020/2026 erfordert Web-Recherche durch Claude/Alisad. Cursor liefert **Code- und Content-Belege** aus dem Repo.

---

## F1. Fachliche Korrektheit Modul-Inhalte (Stichprobe)

### Modul-Struktur (verifiziert)

| Modul | Lerntage (Export) | Beleg |
|-------|-------------------|-------|
| M1 Grundlagen | 20 | Build-Log `exportModuleLessons` |
| M2 §34c | 60 | Build-Log |
| M3 WEG-Verwalter | 80 | Build-Log |
| M4 Gutachter | 40 | Build-Log |
| M5 §34i | 40 | Build-Log |

### Stichprobe §-Zitate im Code

| Modul | Stichprobe | §-Referenz | Bewertung |
|-------|------------|------------|-----------|
| M1 | Besitz/Eigentum | § 854 BGB, § 903 BGB | ✅ Korrekte Norm-Paare | `Module1Content_Maximal.ts:1006-1142` |
| M2 | Maklerrecht | § 34c GewO (Modul-Titel) | 🔍 Volltext-Claude | `Module2Detail.tsx` Route |
| M3 | WEG-Verwaltung | § 24 WEG in Vorlagen/Content | ✅ | `verwalterVorlagen.ts:42-43` |

### Web-Recherche-Auftrag (Claude)

🔍 Nicht durch Cursor ausgeführt:
- Gesetzesänderungen seit Content-Erstellung (WEG, GewO, BGB Mietrecht)
- Ob Modul-3-Audio/Text WEG-Reform 2020 vollständig abbildet

---

## F2. Prüfungsrelevanz

### IHK §34c Sachkundeprüfung — Abdeckung

| Aspekt | Status | Beleg |
|--------|--------|-------|
| Modul 2 dediziert §34c | ✅ 60 Lerntage | Build-Export, `StructuredData.tsx:16-18` |
| Prüfungssimulation | ✅ `/pruefung`, `examRouter` | `App.tsx:320-322` |
| IHK-Timer | ✅ Unit-Test | `server/ihk-timer.test.ts` |
| Offizielle IHK-Gliederung 1:1 | 🔍 **UNVERIFIZIERT** | Claude-Recherche nötig |

### Übungsfragen-Pool

| Quelle | Anzahl | Beleg |
|--------|--------|-------|
| Öffentlicher Quiz-Pool | **854** | `shared/claims.ts:2`, `auth.test.ts:21` |
| Modul-spezifisch | z. B. `quiz-questions-modul3.ts` | Import in `Module3Detail.tsx:15` |
| DB `question_bank` | 🔍 Row-Count nur via Prod-DB/Admin | Nicht in Sandbox verifiziert |

⚠️ `PartnerDashboard.tsx:68` zeigt „855 IHK-Fragen" — abweichend von zentraler Konstante 854.

---

## F3. Verwalter-Suite Fachliche Prüfung

### ETV-Fristenrechner (`shared/verwalterFristen.ts`)

| Frist | Norm | Tage (Code) | Korrekt? |
|-------|------|-------------|----------|
| ETV-Einladung | § 24 Abs. 2 WEG | **21** (3 Wochen) | ✅ Hardcoded | `:17-24` |
| Anfechtung Beschluss | § 46 Abs. 1 WEG | **30** (1 Monat) | ✅ | `:26-33` |
| NK-Einwendungen | § 556 Abs. 3 BGB | **365** | ✅ | `:50-56` |
| Verzug Mahnung | § 286 BGB | — | ✅ Referenz | `:67-72` |

**Berechnungsart:** ✅ **Deterministisch im Code**, nicht LLM-generiert.  
Beleg auch: `shared/verwalterEtv.test.ts`, `shared/verwalterFristen.test.ts`

### Sonderfälle — Lücken

| Sonderfall | Im Code? | Bewertung |
|------------|----------|-----------|
| Online-ETV (§ 23a WEG) | ❌ Nicht in `FRISTEN_CHECKLISTE` | ⚠️ Mittel |
| Umlaufbeschluss (§ 23 Abs. 3 WEG) | ❌ Fehlt | ⚠️ Mittel |
| Beschlussfassung ohne Versammlung | ❌ Fehlt | ⚠️ |

### Mahnwesen 3-Stufen

| Stufe | Vorlage | Prozess | Beleg |
|-------|---------|---------|-------|
| 1 | `mahnung-stufe1` | Freundliche Erinnerung | `verwalterVorlagen.ts:72-100` |
| 2 | `mahnung-stufe2` | Verzugszinsen-Hinweis | `legalHint: § 286 BGB` |
| 3 | `mahnung-stufe3` | Letzte Mahnung vor Rechtsweg | `verwalterFristen.ts:75-80` |

✅ Eskalationskette 1→2→3 getestet: `verwalterMahnwesen.test.ts:43-46`

⚠️ **Mahnbescheid-Option** (gerichtlicher Forderungsweg) — nicht als eigene Stufe modelliert. 💭 Entspricht gängiger Praxis bis Vor-Klage; optional als Hinweis-Stufe 4.

✅ **UI-Flow ohne CLI:** `MahnwesenIndex.tsx` — Formular → POST `/api/verwalter/mahnwesen/start` → Freigabe über `/app/verwalter/freigaben` (Route in `App.tsx:416+`).

### DATEV-Export (EXTF)

| Prüfung | Ergebnis | Beleg |
|---------|----------|-------|
| EXTF-Spaltenkopf | ✅ Umsatz, S/H, Konto, Gegenkonto, Belegdatum, … | `verwalterDatevExport.ts:22-31` |
| UTF-8 BOM | ✅ `\uFEFF` | `verwalterDatevExport.ts:52` |
| Betragsformat | ✅ `150,00` | `verwalterDatevExport.test.ts:25` |
| Belegdatum DDMM | ✅ `0806` für 2026-06-08 | Test `:28` |
| SKR03/SKR04 Validierung | 🔍 **Vereinfachte Variante** — Kommentar „Phase B" | `verwalterDatevExport.ts:15-16` |

⚠️ Kein vollständiger DATEV-Header (Mandant/Berater-Nr.) — für Steuerberater-Import ggf. manuelle Ergänzung nötig.

### Vorlagen §-Verweise (Stichprobe 3)

| Vorlage | §-Verweis | Aktualität |
|---------|-----------|------------|
| ETV-Einladung | § 24 WEG | 🔍 Claude: post-2020 noch gültig |
| 1. Mahnung | § 286 BGB | ✅ |
| NK-Abrechnung WEG | § 28 WEG | 🔍 Claude-Recherche |

---

*Weiter: [G_MARKETING_SEO.md](./G_MARKETING_SEO.md)*
