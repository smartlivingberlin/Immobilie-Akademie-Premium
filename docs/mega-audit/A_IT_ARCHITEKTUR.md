# Teil A — IT-Architektur & Softwareentwicklung

**Rolle:** Senior Software-Architekt + Backend-Entwickler  
**Stand:** 2026-06-11 · HEAD `fcb7ac5`

---

## A1. Architektur-Konsistenz

### Trennung Hauptportal / Admin / Verwalter

| Aspekt | Hauptportal | Admin | Verwalter | Bewertung |
|--------|-------------|-------|-----------|-----------|
| Routes | `client/src/App.tsx` ~100 `<Route>` | `/admin/*` via `AdminRoute` | `/app/verwalter/*` via `RechenpraxisProductLayout` | ⚠️ gemeinsame `App.tsx` |
| API | tRPC `server/routers.ts` + REST `/api/*` | `/api/admin/*` | `/api/verwalter/*` `verwalterRouter.ts` | ⚠️ REST-Mix |
| Auth | `requireAuth` Session JWT | `requireAdmin` | `requireVerwalterAuth` + Tools-Gating | ✅ getrennte Middleware |
| DB | Drizzle + raw SQL | gleiche MySQL | `verwalter_*` Tabellen + Stores | ⚠️ Dual-Pattern |

**Vermischungen (belegt):**
- `client/src/App.tsx` — alle drei Produkte in einer SPA (464 Zeilen)
- `server/_core/index.ts` — mountet Auth, Stripe, AI, Verwalter, Owner in einem Express-App
- `shared/claims.ts`, `shared/kiFairUse.ts` — geteilte Konstanten über Produktgrenzen

**Fazit:** ⚠️ Logische Trennung über Middleware/Routes vorhanden, aber **kein Repo-/Service-Split**. Verwalter ist Sub-Produkt im Monorepo (bewusst, `docs/VERWALTER_INDEPENDENCE_PLAN.md`).

### Monolithen-Bestandsaufnahme

#### `server/db.ts` — 1312 Zeilen (VERBOTEN zu ändern)

Geschätzte Bereiche (grep `export async function` / `export function`):
- User CRUD, Module-Access
- Video-Tutorials + Progress
- Exam-Sessions, Certificates
- Learning-Logs, AZAV-Tabellen
- Whitelabel, Chat
- Presentation-Codes (raw SQL)
- Open Questions

**Risiko:** ⚠️ Hohe Kopplung; Änderungen an einem Bereich riskieren Regression in anderen.

#### `server/routers.ts` — 1162 Zeilen

Enthält inline: `auth`, `whitelabel`, `aiAssistant`, `modules`, `adminUsers`, `account`, `progress`, `adminCodes`, `presentationCode`, `adminQuestions` — plus Imports von `examRouter`, `azavRouter`, `videoRouter`, etc.

**Risiko:** ⚠️ tRPC-God-Router; schwer zu navigieren für neue Entwickler.

---

## A2. Datenbank-Konsistenz

### schema.ts vs. Migrationen

| Quelle | Anzahl Tabellen |
|--------|-----------------|
| `drizzle/schema.ts` | 29 |
| Migrationen (unique CREATE) | 44 |
| Nur in Migrationen (aktiv) | **16** (+ `monitoring_log` mehrfach) |
| Nur in Schema | **1** (`spaced_repetition`) |

**Orphan-Tabellen (Migration-only, alle in `server/` per raw SQL genutzt):**
`glossar_terms`, `trial_leads`, `presentation_codes`, `monitoring_log`, `portal_settings`, `pending_purchases`, `referral_rewards`, `ki_daily_usage`, `access_expiry_reminders`, `schema_migrations`, `partner_payout_*`, `verwalter_events`, `verwalter_freigaben`, `verwalter_inbox_messages`

**Beleg:** Subagent-Schema-Audit 2026-06-11; Beispiel `verwalterInboxStore.ts:58-175`.

### `db.execute(sql\`` Scan

```bash
grep -rn 'db.execute(sql`' server/ shared/
# Ergebnis: 0 Treffer (2026-06-11)
```

✅ Kein verbotenes esbuild-Backtick-Pattern gefunden.

### Foreign Keys

❌ **Keine FK-Constraints** in `drizzle/schema.ts` (0× `.references()`).  
❌ Keine FK in SQL-Migrationen.  
⚠️ 20+ Tabellen mit `userId` — nur Index, keine referentielle Integrität.

Beleg: `drizzle/schema.ts:36-50` (`spacedRepetition.userId` ohne `.references`).

---

## A3. API-Konsistenz

### Umfang (Inventur 2026-06-11)

| Typ | Anzahl | Validierung |
|-----|--------|-------------|
| REST Endpoints | ~155 | Meist manuell, wenig Zod |
| tRPC Procedures | ~86 | Zod in exam/videos/azav; **Cast-Validierung** in adminUsers/progress |
| Verwalter REST | 45 | Manuell in `verwalterRouter.ts` |

### Kritische Befunde

| Befund | Schwere | Beleg |
|--------|---------|-------|
| `quiz.*` tRPC **public** — volle `questionBank` inkl. Antworten | ❌ Hoch | `server/quizRouter.ts:7` |
| Stripe Checkout **public** (kein `requireAuth`) | ⚠️ Mittel | `server/stripe.ts:318` |
| Doppelte `/api/admin/ki-stats` | ⚠️ Niedrig | `kiStatsRoute.ts:62` + `ragTutor.ts:316` |
| Verwalter Inbox Webhook: Secret-Header statt User-Auth | ✅ Design | `verwalterRouter.ts:501` |

### Naming REST vs tRPC

⚠️ Inkonsistent: Lernfortschritt über tRPC (`progress.*`), Verwalter komplett REST (`/api/verwalter/*`), KI gemischt (`/api/ai/*` REST + `aiAssistant` tRPC). Wartbarkeit leidet, aber funktional.

---

## A4. Error-Handling

| Prüfung | Ergebnis |
|---------|----------|
| `grep 'app.use((err' server/` | **0 Treffer** ❌ |
| Sentry.init | ✅ `server/_core/index.ts:3`, `client/src/main.tsx:5` — **aktiv nur mit DSN-ENV** |
| Strukturiertes Logging | ✅ `server/_core/logger.ts` in HealthWatcher, Stripe |

⚠️ Kein zentraler Express-Error-Handler — Fehlerformate vermutlich uneinheitlich pro Route.

---

## A5. Dependency-Audit

### `pnpm audit` (2026-06-11)
✅ **No known vulnerabilities found**

### `pnpm outdated`
⚠️ Viele Patch-Updates (Radix, etc.); keine >2 Major hinter Latest im sichtbaren Ausschnitt. `@types/jspdf` als Deprecated markiert.

### `npx depcheck` (2026-06-11)

**Unused dependencies (Auszug):** `@fontsource/fraunces`, `@fontsource/inter`, `framer-motion`, `multer`, `next-themes`, `node-fpdf`, `@stripe/stripe-js`, …

⚠️ Teilweise False-Positives möglich (dynamische Imports, CSS-Font-Imports).

---

## A6. Code-Duplikation

### `npx jscpd` (2026-06-11)

| Metrik | Wert |
|--------|------|
| Dateien analysiert | 591 |
| Klone gefunden | **123** |
| Duplizierte Zeilen | 1891 (**1.43%**) |
| TS-Duplikation | 750 Zeilen (1.03%) |
| TSX-Duplikation | 1122 Zeilen (2.40%) |

**Top-Duplikate (Auszug):**

| Datei A | Datei B | Zeilen |
|---------|---------|--------|
| `server/verwalterRouter.ts:456-471` | `server/verwalterRouter.ts:516-531` | 16 |
| `server/verwalterRouter.ts:661-672` | `server/verwalterRouter.ts:683-694` | 12 |
| `server/videoRouter.ts:111-126` | `server/videoRouter.ts:169-182` | 16 |
| `shared/verwalterBuchungPlausibilitaet.test.ts` | `shared/verwalterMonatsabschluss.test.ts` | 16 |

Manuelle Stichprobe:
- ⚠️ Mehrere `askClaude` Implementierungen: `ragTutor.ts:104`, `kursbuchChunkedRouter.ts:29`, `kursbuchLlm.ts`
- ⚠️ Auth-Checks dupliziert REST (`requireAuth`) vs tRPC (`protectedProcedure`)

---

## A7. Branch-/PR-Hygiene

### Offene PRs: **13** (2026-06-11)

| PR | Alter (Tage) | LoC (+/-) | Draft |
|----|--------------|-----------|-------|
| #191 | ~0.5 | +357 | Nein |
| #167 | ~1 | +245/-34 | Ja |
| #155 | ~2 | +472 | Ja |
| #154 | ~2 | **+14492/-1105** | Ja |
| #136 | ~3 | +406 | Nein |
| … | … | … | … |

❌ **PR #154** — 14k LoC: Merge-Risiko **Hoch**

### CI-Runs
✅ Letzte 5 Runs auf `main`: **success** (gh run list 2026-06-10)

---

*Weiter: [D_SECURITY_COMPLIANCE.md](./D_SECURITY_COMPLIANCE.md)*
