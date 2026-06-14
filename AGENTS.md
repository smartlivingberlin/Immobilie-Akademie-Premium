# AGENTS.md — Jules Steuerungsdatei
# Jules liest diese Datei automatisch bei jedem Task.

## 🚫 ABSOLUT VERBOTENE DATEIEN — NIEMALS AENDERN

- `drizzle/schema.ts`
- `server/db.ts`
- `server/ragTutor.ts`
- `server/_core/context.ts`
- `server/_core/sdk.ts`

Wenn dein Plan eine dieser Dateien beruehrt: **Aendere den Plan.**
Wenn es technisch unmoeglich ist ohne diese Dateien: Brich den Task ab und berichte warum.

## ⚠️ KRITISCHE KORREKTUREN (NIEMALS UEBERSCHRIEBEN)

**server/ragTutor.ts:**
- Korrekter Modellname: `claude-haiku-4-5`
- NIEMALS: `claude-haiku-4-5-20251001`

**drizzle/schema.ts:**
- Enthaelt manuelle Type-Exports am Ende der Datei.
- Diese Exports NIEMALS entfernen oder veraendern.

## 🛠️ STACK & UMGEBUNG

React 19, Vite 7, TypeScript, Express 4.21.2, tRPC 11, MySQL 9.4, Drizzle ORM, Tailwind CSS 4, pnpm.

**Baseline:**
- `main` ist operativ geschuetzt (Human Review erforderlich).
- Railway Production ist mit GitHub `main` verbunden.
- **Auto-Deploy auf `main` ist aktiv** (wartet auf GitHub Actions).
- Jeder Merge in `main` kann ein Production-Deployment ausloesen.

## ✅ SICHERE VALIDIERUNGS-COMMANDS

Vor jeder PR-Erstellung/Submission muessen diese Befehle erfolgreich durchlaufen:

1. `pnpm install --frozen-lockfile`
2. `pnpm exec tsc --noEmit --skipLibCheck` (Muss 0 Fehler ergeben)
3. `pnpm build`
4. `pnpm test`
5. `PLAYWRIGHT_BASE_URL="https://immobilien-akademie-smart.de" pnpm run test:e2e:smoke`

**E2E Scripts Guide:**
- `test:e2e:smoke`: Public no-auth smoke test.
- `test:e2e:module-auth-smoke`: Authenticated module smoke (benoetigt Auth-Setup).
- `test:e2e:auth-smoke`: Auth flow smoke (erlaubt ggf. empty auth state).
- `test:e2e:stripe-guards`: Anonymous no-auth guard testing.
- `stripe-live`: Optional, nur mit Secrets moeglich.

## ❌ VERBOTENE / HIGH-RISK AKTIONEN

- Keine direkten Commits auf `main`.
- Kein Merge ohne explizite menschliche Freigabe.
- Kein manuelles Deployment ohne ausdruecklichen Auftrag.
- Keine Mutationen in Railway (Config, DB, Resources).
- Keine Mutationen in Stripe Live.
- Keine DB-Schema Migrationen oder `db:push` (Schema-Aenderungen nur nach Absprache).
- **Keine Secrets** in Prompts, Logs, Dateien oder Commits.
- Keine breiten Refactors oder "Monster PRs".

## 📦 PR DISZIPLIN

- **Small Branches:** Nur kleine, isolierte Aenderungen.
- **Atomic Topics:** Ein Thema pro PR.
- **Transparenz:** Liste im PR genau auf, welche Dateien geaendert wurden.
- **Validierung:** Liste alle durchgefuehrten Validierungs-Gates und deren Ergebnisse.
- **Keine Artefakte:** Keine `audit/` Ordner oder temporaere Analyse-Files in den PR aufnehmen.
- **Deployment-Bewusstsein:** Behandle jeden Product-Code Change als deploy-relevant (wegen Auto-Deploy).

## ⚖️ COMPLIANCE & RECHTLICHES

Aenderungen an folgenden Inhalten sind **strikt verboten** ohne explizite, quellengestuetzte menschliche Review:
- Rechtliche Texte (Impressum, AGB, Datenschutz).
- IHK / AZAV Claims.
- Foerderung (Funding) Informationen.
- Pricing & Kurs-Pakete.
- SEO Meta-Daten & Public Trust Signale.

## 🔄 MULTI-AGENT-PROZESS

- GitHub ist die "Source of Truth".
- Codex arbeitet primär read-only (Reviewer, CI-Analyst, Audit).
- Nie zwei Agenten gleichzeitig an derselben Datei oder demselben Kernbereich.
- `server/_core/index.ts` darf maximal in einem offenen PR gleichzeitig verändert werden.
- Obsolete Branches werden geschlossen statt blind rebased.
- Jeder PR braucht eigene Prüfung, CI-Bewertung und ausdrückliche Freigabe.
