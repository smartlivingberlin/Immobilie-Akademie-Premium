# READ-ONLY AUDIT REPORT — 2026-05-22

**Status:** STRICT READ-ONLY AUDIT
**Datum:** 22. Mai 2026
**Prüfer:** Jules (Software Engineer Agent)

---

## 1. API-Endpunkte: Authentifizierung & Autorisierung
*   **Kritisch:** `/api/tester/verify` (Express) erlaubt die Erstellung von Admin-Accounts via OTP. Zwar ist ein OTP-Check vorhanden, aber der Endpunkt ist ungeschützt gegen Brute-Force (außer durch allgemeine Rate-Limits).
*   **Kritisch:** `/api/owner/access` basiert rein auf dem `OWNER_MAGIC_CODE`. Ein Leak dieses Codes ermöglicht administrativen Zugriff.
*   **Bypass Risiko:** `/api/tester/request` ist öffentlich erreichbar und erlaubt den Versand von OTPs an beliebige E-Mails.
*   **Fehlende Prüfung:** Einige Express-Endpunkte in `ownerRoute.ts` prüfen den `x-owner-key` im Header, nutzen aber keine standardisierte Middleware, was zu Inkonsistenzen führen kann.

## 2. Datenbank-Queries ohne LIMIT
Folgende Abfragen laden potenziell alle Datensätze einer Tabelle:
*   `server/db.ts`: `db.select().from(learningLogs).where(conditions)`
*   `server/db.ts`: `db.select().from(examAuditLog)`
*   `server/db.ts`: `db.select().from(complaints)`
*   `server/db.ts`: `db.select().from(consentLog)`
*   `server/routers.ts`: `db.select().from(learningLogs).where(...)` (im `getProgress` query)
*   `server/openQuestionsRouter.ts`: `db.select().from(openQuestions)`

## 3. TypeScript `any`-Typen
*   **Anzahl:** 477 Vorkommen von `any` im Projekt (`client/src` und `server`).
*   **Schwerpunkte:**
    *   `server/routers.ts`: Häufige Verwendung in `.input((val: any) => val as ...)` bei tRPC Routern.
    *   `server/db.ts`: Result-Typisierung von Drizzle/MySQL-Queries.
    *   Frontend Components: Typ-Casting bei Event-Handlern und API-Responses.

## 4. console.log/error im Frontend
*   **console.log:** 3 Vorkommen (eines in `main.tsx` via `queryClient` subscription).
*   **console.error:** 29 Vorkommen.
*   **Risiko:** Fehler-Logs in `main.tsx` geben API-Fehler in die Browser-Konsole aus, was potenziell interne Pfade oder Strukturen preisgibt.

## 5. Error-Boundaries
*   **Global:** Eine globale `ErrorBoundary` ist in `client/src/App.tsx` um den `Switch` gewickelt.
*   **Granularität:** Es fehlen komponenten-spezifische Error-Boundaries für isolierte UI-Bereiche (z.B. Sidebar, Dashboard-Widgets), wodurch bei einem Fehler die gesamte App abstürzt (oder das "Etwas ist schiefgelaufen" UI zeigt).

## 6. Verwaiste Routes (Orphaned Routes)
Folgende Komponenten existieren im Filesystem, sind aber nicht in `App.tsx` eingebunden:
*   `client/src/pages/admin/MediaSkriptGenerator.tsx`
*   `client/src/pages/Barrierefreiheit.tsx`
*   `client/src/pages/ComponentShowcase.tsx`

## 7. Inkonsistente Preise (Frontend vs. Backend)
*   **Starter-Paket:** Konsistent (549€).
*   **Komplett-Paket:** Konsistent (1955€).
*   **Verwalter/Gutachter:** In `stripe.ts` sind die Bundles definiert. Es fällt auf, dass das `verwalter`-Paket (M1+M3) 699€ kostet, was exakt dem Preis des Einzelmoduls 3 entspricht, welches laut Beschreibung Modul 1 bereits inkludiert. Dies führt zu Verwirrung bei der Preisdarstellung für Endkunden.

## 8. Fehlende Input-Validierung (Zod)
*   **Express Routes:** In `server/ownerRoute.ts` wird häufig direkt gecastet: `req.body as { email?: string }`. Zod-Schemas werden nur punktuell (`lock-user`, `set-modules`) eingesetzt.
*   **tRPC:** In `server/routers.ts` wird das tRPC-interne Validierungssystem oft durch `(val: any) => val as ...` umgangen, was die Type-Safety zur Laufzeit außer Kraft setzt.

## 9. Hardcoded Secrets & URLs
*   **RAG Tutor:** `server/ragTutor.ts` enthält den Fallback-String `"CHANGE_THIS_SECRET_IN_ENV"` für das `COOKIE_SECRET`.
*   **Inspect Mode:** `server/ownerRoute.ts` nutzt `"immobilien-akademie-inspect-2026"` als Hardcoded Fallback für den `INSPECT_JWT_SECRET`.
*   **API URLs:** In `client/src/main.tsx` ist `http://localhost:3002/api/trpc` hardcodiert für den Dev-Modus.
*   **Production URL:** `https://immobilie-akademie-premium-production.up.railway.app` ist in Test-Files hardcodiert.

## 10. DSGVO & Datenverarbeitung
*   **Löschlogik:** `server/routers.ts` (`deleteMyAccount`) und `server/adminUsers.ts` (`deleteUser`) enthalten umfangreiche Löschbefehle für personenbezogene Daten.
*   **Lücke:** Es fehlt eine automatisierte Löschung für `monitoring_log` Einträge, die potenziell E-Mails oder IPs enthalten könnten (muss geprüft werden, ob diese Tabelle personenbezogene Daten speichert).
*   **Audit-Logs:** `exam_audit_log` speichert alle Prüfungsversuche. Hier sollte eine definierte Aufbewahrungsfrist (Retention Policy) implementiert werden.

---
*Ende des Audit-Berichts*
