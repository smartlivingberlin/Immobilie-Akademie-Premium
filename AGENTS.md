# AGENTS.md — Jules Steuerungsdatei
# Jules liest diese Datei automatisch bei jedem Task.

## ABSOLUT VERBOTENE DATEIEN — NIEMALS AENDERN

drizzle/schema.ts
server/db.ts
server/ragTutor.ts
server/_core/context.ts
server/_core/sdk.ts

Wenn dein Plan eine dieser Dateien beruehrt: Aendere den Plan.
Wenn es technisch unmoeglich ist ohne diese Dateien: Brich den Task ab und berichte warum.

## KRITISCHE KORREKTUREN DIE NIEMALS UEBERSCHRIEBEN WERDEN DUERFEN

server/ragTutor.ts:
- Korrekter Modellname: claude-haiku-4-5
- NIEMALS: claude-haiku-4-5-20251001

drizzle/schema.ts:
- Enthaelt manuelle Type-Exports am Ende der Datei
- Diese Exports NIEMALS entfernen oder veraendern

## PFLICHTPRUEFUNG VOR PR-ERSTELLUNG

1. Fuehre aus: npx tsc --noEmit --skipLibCheck
2. Ergebnis muss sein: 0 errors
3. Pruefe: keine verbotene Datei geaendert
4. Pruefe: Module6/7/8 existieren nicht
5. Nur wenn alle 4 Punkte OK: PR erstellen

## STACK

React 19, Vite 5, TypeScript, Express 4.21.2, tRPC, MySQL 9.4, Drizzle ORM, Tailwind CSS 4, pnpm

## Multi-Agent-Prozess

- GitHub ist die Wahrheit.
- `main` ist geschützt und wird nie direkt beschrieben.
- Jede Änderung läuft über Issue/Task → Branch → Draft-PR → CI → Review → Merge-Entscheidung.
- Kein Agent darf Railway, Production, Datenbank, Secrets oder Deploys ändern, außer der Nutzer gibt es ausdrücklich frei.
- Cursor arbeitet primär an Feature-/UI-/Multi-File-Branches.
- Codex arbeitet primär read-only, als Reviewer, CI-Analyst, Audit-Agent oder Mini-Fix-Agent.
- Codex darf in fremde PR-Branches nur pushen, wenn der Nutzer es ausdrücklich erlaubt.
- Nie zwei Agenten gleichzeitig an derselben Datei oder demselben Kernbereich.
- `server/_core/index.ts` darf maximal in einem offenen PR gleichzeitig verändert werden.
- Security-/Config-Fixes bleiben klein, idealerweise 1–3 Dateien.
- Erst read-only Analyse, dann Code.
- Obsolete Branches werden geschlossen statt blind rebased.
- Deploy ist immer ein separater Schritt nach Merge.
- Prozess-Freigabe ist keine Merge-Freigabe.
- Merge-Freigabe ist keine Deploy-Freigabe.
- Jeder PR braucht eigene Prüfung, CI-Bewertung und ausdrückliche Freigabe.

## Merge-Gates

Harte Gates:

- Typecheck / tsc
- Build
- Tests
- Docker-Build, falls production-relevant

Separat zu bewerten:

- `pnpm audit`, wenn der PR die Schwachstelle nicht verursacht
- E2E/Stripe/Smoke, wenn Secrets oder Testumgebung fehlen
- externe/flaky Checks
