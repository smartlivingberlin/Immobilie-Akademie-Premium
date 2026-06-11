# Teil E — Testing, QA & Reliability

**Rolle:** QA-Lead + SRE/DevOps  
**Stand:** 2026-06-11 · HEAD `fcb7ac5`

---

## E1. Test-Pyramide-Analyse

### Unit-/Integration-Tests (Vitest)

| Messung | Ergebnis | Beleg |
|---------|----------|-------|
| Testdateien | **89** | `pnpm test` 2026-06-11 |
| Tests gesamt | **242/242** ✅ | `pnpm test` 2026-06-11, 4.73s |
| TypeScript | **0 errors** | `tsc --noEmit` (CI + lokale Runs) |

### Verteilung nach Bereich (Datei-Zählung via `grep`, Überlappung möglich)

| Bereich | Testdateien (≈) | Anteil | Beispiele |
|---------|-----------------|--------|-----------|
| Verwalter-Suite | 28 | ~31% | `shared/verwalterFristen.test.ts`, `server/verwalterDatevExport.test.ts` |
| Stripe/B2B | 14 | ~16% | `server/stripeWebhookProcess.test.ts`, `shared/stripeLiveChecklist.test.ts` |
| Auth/Security | 11 | ~12% | `server/authCookies.test.ts`, `server/securityGuards.test.ts` |
| Module/Content | 8 | ~9% | `server/moduleContentRegistry.test.ts`, `server/module-data-guard.test.ts` |
| KI/LLM | 6 | ~7% | `server/kiFairUseGate.test.ts`, `client/src/__tests__/llm-provider-policy.test.ts` |
| Exam/Zertifikat | 4 | ~4% | `server/certificates.test.ts`, `server/ihk-timer.test.ts` |
| CI/Infra/Compliance | 5 | ~6% | `shared/ciWorkflow.test.ts`, `server/gdpr-delete-coverage.test.ts` |
| Client/UI-Policy | 10 | ~11% | `client/src/__tests__/claims-policy.test.ts` |
| Sonstige (PDF, Partner, …) | ~13 | ~14% | `server/pdf.test.ts`, `shared/partnerPayouts.test.ts` |

⚠️ **Hinweis:** Dateien können mehreren Kategorien zugeordnet sein; Prozente sind Näherungswerte, keine exakte Partition.

### E2E (Playwright)

| Metrik | Wert | Beleg |
|--------|------|-------|
| Spec-Dateien | **30** | `tests/e2e/*.spec.ts` |
| Smoke in CI | 1 Spec (`17-module-smoke-readonly`) | `package.json:14`, `ci.yml:58` |
| Stripe-Guards in CI | 4 Specs | `package.json:15`, `ci.yml:75` |
| Stripe-Live in CI | optional (`STRIPE_E2E_ENABLED`) | `ci.yml:78-84` |
| Gegen Produktion | ✅ `PLAYWRIGHT_BASE_URL: immobilien-akademie-smart.de` | `ci.yml:60` |

**CI vs. manuell:**

| Job | Required? | Beleg |
|-----|-----------|-------|
| `check` (tsc, build, test, audit) | ✅ Ja (Merge-Gate) | `ci.yml:32-35` |
| `docker-build` | ✅ Ja (`needs: check`) | `ci.yml:37-43` |
| `e2e-smoke` | ⚠️ **Nein** (`continue-on-error: true`) | `ci.yml:48` |
| `e2e-stripe` | ⚠️ **Nein** (`continue-on-error: true`) | `ci.yml:65` |

### `26-verwalter-mobile-layout.spec.ts` (2026-06-11)

❌ **Lokal fehlgeschlagen** — Login 401 (keine gültigen E2E-Credentials in Cloud-Sandbox).

```
Error: Login fehlgeschlagen: 401 {"error":"E-Mail oder Passwort falsch."}
tests/e2e/global-setup.ts:94
```

🔍 **UNVERIFIZIERT in dieser Session** — frühere Runs (User/Prod) meldeten 6/6. Wiederholung durch Alisad mit `E2E_EMAIL`/`E2E_PASSWORD` empfohlen.

### Mutation-Testing (Stryker)

🔍 **AUSSTEHEND** — `npx stryker run` auf `shared/verwalterFristen.ts` nicht ausgeführt (Zeitbudget).  
💭 Empfehlung: Stryker als P3-Maßnahme für deterministische Fristen-Logik.

---

## E2. CI/CD-Pipeline-Tiefenprüfung

### Workflows (vollständige Liste)

| Workflow | Trigger | Jobs |
|----------|---------|------|
| `.github/workflows/ci.yml` | push/PR `main` | check, docker-build, e2e-smoke, e2e-stripe |
| `.github/workflows/mysql-backup-r2.yml` | Cron (täglich) | MySQL-Dump → R2 |

### Offene PRs (2026-06-11, `gh pr list`)

| PR | Alter | +LoC | Risiko |
|----|-------|------|--------|
| #154 | ~2 Tage | **+14.492** | ❌ Hoch — Monolith-Draft |
| #167 | ~1 Tag | +245 | ⚠️ Content-Registry |
| #191 | ~0.5 Tag | +357 | Docs |
| #145–#151 | 2–3 Tage | +5–329 | Stripe/GDPR/HSTS |

**Gesamt offene PRs:** 13

### Secret-Leak-Scan

| Tool | Befehl | Ergebnis |
|------|--------|----------|
| gitleaks | `npx --yes gitleaks detect --source . --no-git -v` | ❌ executable not found (2026-06-11) |
| CI-Workflow | grep gitleaks/trufflehog | ❌ **Kein Secret-Scan in CI** |

💭 Empfehlung: `gitleaks` als CI-Step (Open Source) vor Merge.

### Module 6–8 Guard

✅ CI blockiert `modul/[678]` und `Module[678]` — `ci.yml:20-31`

---

## E3. Monitoring & Alerting

### HealthWatcher — 9 Checks (Code)

| # | Check-Name | Was wird geprüft | Beleg |
|---|------------|------------------|-------|
| 1 | `health` | `/api/health` → 200 + `"ok":true` | `HealthWatcher.ts:51-54` |
| 2 | `health_db` | `/api/health` → `"db":"connected"` | `HealthWatcher.ts:55-58` |
| 3 | `auth` | `/api/auth/me` → 401 | `HealthWatcher.ts:59` |
| 4 | `quiz_data_guard` | `/data/all-questions.json` → 403 | `HealthWatcher.ts:60` |
| 5 | `module_data_guard` | `/data/module4.json` → 403 | `HealthWatcher.ts:61` |
| 6 | `stripe_webhook` | POST `/api/stripe/webhook` → 400 | `HealthWatcher.ts:62` |
| 7 | `homepage` | `/` enthält „Immobilien Akademie Smart" | `HealthWatcher.ts:63` |
| 8 | `sitemap` | `/sitemap.xml` enthält `urlset` | `HealthWatcher.ts:64` |
| 9 | `database` | `SELECT 1` direkt auf MySQL | `HealthWatcher.ts:71-75` |

### Alerting

| Kanal | Status | Beleg |
|-------|--------|-------|
| E-Mail (Resend) | ⚠️ Nur wenn `RESEND_API_KEY` gesetzt | `HealthWatcher.ts:102` |
| monitoring_log DB | ✅ INSERT bei jedem Run | `HealthWatcher.ts:91-94` |
| Slack/Webhook | ❌ Nicht im HealthWatcher | — |

🔍 **UNVERIFIZIERT:** Ob `RESEND_API_KEY` in Railway Prod gesetzt ist (Alisad).

💭 **Empfehlung:** Kostenloses externes Uptime-Monitoring (z. B. UptimeRobot Free Tier, 50 Monitore) auf `/api/health` — ergänzt internen HealthWatcher.

---

## E4. Last-/Stress-Test (read-only)

**Tool:** `npx autocannon -c 10 -d 10 https://immobilien-akademie-smart.de/api/health`  
**Datum:** 2026-06-11

| Metrik | Wert |
|--------|------|
| p50 Latenz | **517 ms** |
| p99 Latenz | **658 ms** |
| Durchsatz | 196 req / 10s (~19.6 req/s) |
| Fehler | 0 |

⚠️ Health-Endpoint ist DB-gekoppelt; Latenz ~500ms auch ohne Last deutet auf Railway/MySQL-Roundtrip hin, nicht nur auf Stress.

**Früherer Run (Session-Handover):** p99 1195ms — Varianz zwischen Runs möglich.

---

## E5. Datenintegrität Verwalter (Stichprobe)

### CLI gegen Produktion

🔍 **Nicht in dieser Session ausgeführt** — erfordert Railway/Prod-Zugang und gültige Ops-Credentials.

**Referenz (User-Run 2026-06-10):** `verwalter-qa-pack.sh` → **17 OK, 0 FAIL** (laut Handover).

### UI-Datenpfad (Code-Verifikation)

✅ Mahnwesen-UI lädt Objekte + Vorgänge parallel:

```typescript
fetch("/api/verwalter/objekte", { credentials: "include" })
fetch("/api/verwalter/mahnwesen/vorgaenge", { credentials: "include" })
```

Beleg: `client/src/pages/verwalter/MahnwesenIndex.tsx:32-35`

✅ Mahnung Stufe 1 starten über UI (ohne CLI):

```typescript
fetch("/api/verwalter/mahnwesen/start", { method: "POST", ... })
```

Beleg: `MahnwesenIndex.tsx:70-80`

🔍 Konsistenz `openVorgaenge` vs. Listen-Länge — **UNVERIFIZIERT** ohne Live-CLI-Output.

---

*Weiter: [B_FRONTEND_UX.md](./B_FRONTEND_UX.md)*
