# AGENTS.md — Jules Steuerungsdatei
# Jules liest diese Datei automatisch bei jedem Task.

## ABSOLUT VERBOTENE DATEIEN — NIEMALS AENDERN

drizzle/schema.ts
server/db.ts
server/ragTutor.ts
server/_core/context.ts
server/_core/sdk.ts
client/src/pages/modules/Module6.tsx
client/src/pages/modules/Module7.tsx
client/src/pages/modules/Module8.tsx

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
