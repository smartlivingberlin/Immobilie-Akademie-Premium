# Teil G — Marketing, SEO & Positionierung

**Rolle:** Marketing-Experte + SEO-Spezialist  
**Stand:** 2026-06-11 · HEAD `fcb7ac5`

---

## G1. SEO-Technisch

### Sitemap (`curl /sitemap.xml`, 2026-06-11)

✅ **Erreichbar**, 17 URLs, gültiges `urlset`.

| URL-Typ | Enthalten? |
|---------|------------|
| Startseite `/` | ✅ priority 1.0 |
| Kurs-Landings M1–M5 | ✅ |
| Verwalter `/verwalter-rechner`, `/fuer-verwaltungsbueros` | ✅ priority 0.95 |
| Rechtliches impressum/datenschutz/agb | ✅ |
| Auth-Bereich `/app/verwalter/*` | ❌ (bewusst) |
| `/compliance-20h` | ❌ Nicht in Sitemap |

Beleg: Live-curl 2026-06-11; Generator `server/_core/index.ts:389`

### robots.txt

```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/
Disallow: /statistiken
Disallow: /owner-dashboard
Sitemap: https://immobilien-akademie-smart.de/sitemap.xml
```

✅ Korrekt — sensible Bereiche ausgeschlossen.

### Meta-Tags Stichprobe (Code)

| Seite | Title (eindeutig?) | Description | OG |
|-------|-------------------|-------------|-----|
| `/fuer-verwaltungsbueros` | ✅ „Verwalter-Werkzeuge für Verwaltungsbüros…" | ✅ dynamisch mit Vorlagen-Count | via `SEO`-Komponente |
| `/` Home | ✅ | ✅ | `StructuredData.tsx` |
| Kurs-Landings | ✅ pro Modul | ✅ | `KursLanding.tsx` |

Beleg: `FuerVerwaltungsbuerosLanding.tsx:110-114`

### Strukturierte Daten (JSON-LD)

| Schema-Typ | Vorhanden | Beleg |
|------------|-----------|-------|
| `EducationalOrganization` | ✅ | `StructuredData.tsx:47-67` |
| `Course` | ✅ (5 Module) | `StructuredData.tsx:70-80` |
| `FAQPage` | ❌ Nicht auf Verwalter-Landing | — |

🔍 Validierung: https://validator.schema.org — **Alisad/Claude** (extern).

### Lighthouse SEO

| Seite | SEO Score |
|-------|-----------|
| `/` | **92** |
| `/app/verwalter/dashboard` | **92** |

---

## G2. Content-Marketing-Konsistenz

### Claims 854 / 855 / 4275

| Claim | Quelle | Risiko |
|-------|--------|--------|
| 854 Quiz-Fragen | Zentral `shared/claims.ts` | ✅ Nachprüfbar, Test-gesichert |
| 855+ Lerntage | Label bewusst mit „+" | ⚠️ Nutzer könnte nachzählen |
| 855 im Partner-Dashboard | Hardcoded | ⚠️ Reputationsrisiko bei Abweichung |
| 4275 nur Doku | Nicht live | ⚠️ Doku-Bereinigung empfohlen |

### `/fuer-verwaltungsbueros` Landing (PR #189 auf main)

| Kriterium | Status | Beleg |
|-----------|--------|-------|
| USP klar | ✅ „Vorlagen, Fristen & Buchungen" | `FuerVerwaltungsbuerosLanding.tsx:122-129` |
| CTA vorhanden | ✅ „Kostenlos testen", „Vorlagen ansehen", Mail | `:131-147` |
| Preis transparent | ✅ **39 €/Mo** im FAQ-Text | `:72`, Konstante `VERWALTER_TOOLS_MONTHLY_EUR = 39` in `verwalterToolsProduct.ts:5` |
| Preis im Hero sichtbar | ⚠️ **Nein** — Preis erst im FAQ-Abschnitt | UX-Einschränkung |
| Ehrliche Positionierung | ✅ „ersetzt keine Vollsoftware" | FAQ `:59-60` |

### Compliance-Landing `/compliance-20h`

✅ E2E-Test #197: `h1` + `249 €/Jahr` mit eindeutigen Selektoren — `tests/e2e/06-compliance-landing.spec.ts`

---

## G3. Wettbewerbsvergleich

🔍 **AUSSTEHEND — Claude Web-Recherche (H2/G3)**

Cursor liefert nur technische Preisanker aus Code:

| Produkt | Preis (Code) | Beleg |
|---------|--------------|-------|
| Verwalter Tools Solo | **39 €/Mo** | `verwalterToolsProduct.ts:5` |
| Rechenpraxis Solo | ab **19 €/Mo** | `FuerVerwaltungsbuerosLanding.tsx:72` |
| B2B Team | ab **199 €/Mo** | FAQ `:72` |

**Recherche-Auftrag Claude:**
1. 3 deutsche §34c-Vorbereitungs-Plattformen (Preis, Umfang)
2. 2 WEG-Verwaltungssoftware-Anbieter vs. „Werkzeugkasten 39€"

---

*Weiter: [I_STAKEHOLDER.md](./I_STAKEHOLDER.md)*
