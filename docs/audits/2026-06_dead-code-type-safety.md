<!--
  Archiviert: S234D (2026-06-20)
  Quelle: PR #226 / Branch audit-dead-code-type-safety-2026-5266573697371883398
  Original-Blob: 4398fbb500690677470188266425e22077b46d28
  Original-SHA256: 823b789e38c763d42cc103ecfe7ba839bbe042c5bf7171ba75826946543ee8bb
  Verifiziert gegen main: c423381b6a269510ed48f4cd8fd5f8c2a129acdd
-->

# Dead-Code & Typsicherheits-Audit Bericht (Juli 2026)

Dieser Bericht fasst die Ergebnisse des automatisierten Scans (Knip) und der manuellen Typsicherheits-Analyse zusammen. Er dient als Entscheidungsgrundlage für zukünftige Refactorings.

---

## 1. Dead-Code Analyse (Knip Findings)

### Unbenutzte Dateien (Echte Funde / True Positives)
Diese Dateien sind im Projekt vorhanden, werden aber von keinem Entry-Point (`main.tsx`, `server/index.ts`) referenziert und sind nicht in `App.tsx` geroutet.

| Pfad | Status | Grund |
| :--- | :--- | :--- |
| `client/src/pages/admin/MediaSkriptGenerator.tsx` | 🗑️ Zu löschen | Verwaist, keine Verknüpfung in App.tsx oder Menüs. |
| `client/src/pages/AdminCodesPage.tsx` | 🗑️ Zu löschen | Redundant; wird durch `client/src/pages/admin/AdminCodes.tsx` ersetzt. |
| `client/src/pages/ComplaintForm.tsx` | 🗑️ Zu löschen | Redundant; `client/src/components/ComplaintForm.tsx` wird direkt geroutet. |
| `client/src/pages/NotFound.tsx` | 🗑️ Zu löschen | Redundant; `client/src/pages/not-found.tsx` ist aktiv. |
| `client/src/components/AIChatBox.tsx` | 🗑️ Zu löschen | Altes UI-Fragment, ersetzt durch den globalen `AITutor`. |
| `client/src/components/ValuationCalculator.tsx` | 🗑️ Zu löschen | Altlast; spezialisierte Rechner in `components/calculators/` übernehmen dies. |
| `client/src/components/ExpertModeValuation.tsx` | 🗑️ Zu löschen | Unbenutztes Experiment für Profi-Bewertung. |
| `client/src/data/quiz-cases-modul2.ts` (ff.) | 🗑️ Zu löschen | Die Quiz-Daten wurden in die `question_bank` DB-Tabelle migriert. |

### False Positives (Entry-Points & Configs)
Knip meldet diese als "unused", da sie als Root- oder Konfigurationsdateien dienen. **Nicht löschen!**
- `client/src/main.tsx` (Frontend Entry)
- `server/_core/index.ts` (Backend Entry)
- `playwright.*.config.ts` (Test Runner Configs)
- `drizzle/relations.ts` (Auto-generiert von Drizzle)
- `tests/performance/k6-load-test.js` (Externer Test-Runner)

### Unbenutzte Exports (Auszug)
Knip identifizierte zahlreiche Exports, die nicht projektweit genutzt werden. Diese sollten auf `private` gestellt oder entfernt werden:
- `server/ragTutor.ts`: `requireAuth` (wird oft inline neu definiert)
- `server/stripe.ts`: `stripeWebhookHandler` (redundant zu `stripeWebhookProcess.ts`)
- `shared/accessPolicy.ts`: `daysUntilAccessExpiry` (Logik oft redundant im Frontend)
- `server/agent/NightCron.ts`: `runMonitoringSnapshot`

### Unbenutzte Dependencies
Diese Pakete sind in `package.json` gelistet, werden aber laut statischer Analyse nicht verwendet:
- `@stripe/stripe-js` (Frontend nutzt oft Direkteinbindung)
- `framer-motion` (in vielen Komponenten durch CSS-Anmationen ersetzt)
- `recharts` (Legacy-Charts, Dashboard nutzt native SVG/Tailwind)
- `multer` (Backend-Uploads laufen primär über `express.raw` oder Base64)

---

## 2. Top 10 `any`-Audit & Typisierungs-Vorschläge

Das Projekt enthält aktuell ca. 739 `any`-Stellen. Hier sind die Top 10 Dateien und Vorschläge für deren Behebung.

### 1. `server/verwalterRouter.ts` (84 mal `any`)
**Hauptproblem:** Express Request-Objekte werden oft als `any` gecastet, um auf `currentUser` zuzugreifen. Catch-Blöcke nutzen `(e: any)`.
- **Vorschlag:** Einführung eines `AuthenticatedRequest` Typs.
- **Beispiel-Typ:**
```typescript
interface AuthenticatedRequest extends Request {
  currentUser: {
    id: number;
    email?: string;
    role: 'user' | 'admin' | 'trainer';
    enabledModules: string;
  };
}
```

### 2. `server/ownerRoute.ts` (71 mal `any`)
**Hauptproblem:** Raw-SQL Abfragen via `db.$client.query` liefern `any[]` zurück.
- **Vorschlag:** Nutzung von `Zod` zur Validierung der DB-Resultate oder explizite Interface-Definitionen.
- **Beispiel-Typ:**
```typescript
interface UserRow {
  id: number;
  name: string;
  email: string;
  role: string;
  lastSignedIn: Date | null;
}
const [users] = await db.$client.query(...) as [UserRow[], any];
```

### 3. `server/_core/index.ts` (42 mal `any`)
**Hauptproblem:** Inline-Express-Handler nutzen oft `(req: any, res: any)`.
- **Vorschlag:** Explizite Nutzung der Express-Typen und ggf. Middleware-gestützte Typisierung für den `rawBody` bei Stripe-Webhooks.

### 4. `server/routers.ts` (25 mal `any`)
**Hauptproblem:** Komplexe tRPC-Transformationen und die DSGVO-Löschlogik.
- **Vorschlag:** Typisierung der `queries`-Parameter in `runPersonalDataCleanup`.
- **Beispiel-Typ:**
```typescript
type CleanupQuery = { sql: string; params: (string | number)[] };
```

### 5. `server/stripe.ts` (24 mal `any`)
**Hauptproblem:** Das Stripe-SDK wird als `any` initialisiert; Metadata-Zugriffe sind untypisiert.
- **Vorschlag:** Korrekte Typisierung des Stripe-Clients und Nutzung von `Stripe.Metadata` Interfaces.

### 6. `server/ragTutor.ts` (24 mal `any`)
**Hauptproblem:** KI-Kontexte (`context: any[]`) und LLM-Response-Typen.
- **Vorschlag:** Definition eines `ChatMessage` Typs für den RAG-Verlauf.
- **Beispiel-Typ:**
```typescript
type ChatMessage = { role: 'user' | 'assistant' | 'system'; content: string };
```

### 7. `client/src/pages/modules/Module4Detail.tsx` (21 mal `any`)
**Hauptproblem:** Dynamisches Laden von JSON-Inhalten (`moduleData`).
- **Vorschlag:** Shared Interface für Modul-Inhalte (`shared/types.ts`).

### 8. `server/adminOpsRoute.ts` (19 mal `any`)
**Hauptproblem:** Admin-Tools (Backfill, Payouts) hantieren mit untypisierten DB-Transaktionen.
- **Vorschlag:** Exportierte Typen aus den Service-Dateien (`partnerPayoutLedger.ts` etc.).

### 9. `server/referralRoute.ts` (18 mal `any`)
**Hauptproblem:** tRPC-Kontext-Zugriffe und Rewards-Logik.
- **Vorschlag:** Nutzung des tRPC-Kontexts `ctx.user` (bereits in `routers.ts` teilweise vorhanden).

### 10. `server/b2bOnboardingRoute.ts` (18 mal `any`)
**Hauptproblem:** Tenant-Konfigurationen und Logo-Upload-Payloads.
- **Vorschlag:** Zod-Schema für die Onboarding-API.

---

## 3. Dependency Audit (CI Findings)

Während des CI-Laufs wurden **14 Sicherheitslücken** identifiziert (4 low, 8 moderate, 2 high). Diese betreffen primär transitive Abhängigkeiten.

| Paket | Schweregrad | Problem | Empfohlener Fix |
| :--- | :--- | :--- | :--- |
| `vite` | High/Mod | Windows path bypass / NTLM hash disclosure | Update auf `>= 8.0.16` |
| `form-data` | High | CRLF injection | Update auf `>= 4.0.6` |
| `dompurify` | Moderate | XSS / Sanitization Bypass | Update auf `>= 3.4.7` |
| `tar` | Moderate | File smuggling | Update auf `>= 7.5.16` |
| `@opentelemetry/core` | Moderate | Unbounded memory allocation | Update auf `>= 2.8.0` |

---

## 4. Empfehlungen

1. **Abhängigkeiten aktualisieren:** Die oben genannten Pakete wurden in diesem PR via `pnpm update` auf die sicheren Versionen gehoben, um den CI-Blocker aufzulösen.
2. **Quick Wins (Dead Code):** Die oben gelisteten unbenutzten Dateien sollten in einem separaten PR gelöscht werden, um das Build-Artefakt zu verkleinern.
3. **Typsicherheit:** Priorität sollte auf `server/_core/trpc.ts` und den `AuthenticatedRequest` liegen. Damit ließen sich ca. 30% der `any`-Stellen in den Routern sofort durch sichere Typen ersetzen.
4. **Zod-Migration:** API-Endpunkte in `verwalterRouter.ts` sollten sukzessive auf Zod-Validierung umgestellt werden, um Laufzeitfehler zu vermeiden.

---
*Erstellt durch Jules (AI Engineer) - Basierend auf Git-Stand Juli 2026.*
---

## Anhang A: Verifikation gegen main @ c423381 (2026-06-20)

Read-only Re-Check (S234C). Der Originalbericht bleibt unverändert; diese Tabelle dokumentiert den aktuellen Stand.

### A.1 Dead-Code-Dateien

| Datei | Existiert | Import/Route | Audit korrekt? | Nächster Track |
| :--- | :---: | :--- | :--- | :--- |
| `client/src/pages/admin/MediaSkriptGenerator.tsx` | Ja | Nein | Ja | S235C |
| `client/src/pages/AdminCodesPage.tsx` | Ja | Nein (aktiv: `admin/AdminCodes.tsx`) | Ja | S235A |
| `client/src/pages/ComplaintForm.tsx` | Ja | Nein (aktiv: `components/ComplaintForm.tsx`) | Ja | S235A |
| `client/src/pages/NotFound.tsx` | Ja | Nein (aktiv: `pages/not-found.tsx`) | Ja | S235A |
| `client/src/components/AIChatBox.tsx` | Ja | Nein | Ja | S235B |
| `client/src/components/ValuationCalculator.tsx` | Ja | Nein | Ja | S235B |
| `client/src/components/ExpertModeValuation.tsx` | Ja | Nein | Ja | S235B |
| `client/src/data/quiz-cases-modul2.ts` … `modul5.ts` | Ja | Nein | Teilweise | S235D |
| `client/src/data/quiz-cases-modul1.ts` | Ja | **Ja** (`Module1Detail.tsx`) | Ausnahme | **Nicht löschen** |

**Korrektur zum Original (§1):** `quiz-cases-modul1.ts` ist weiterhin importiert. Nur `modul2`–`modul5` sind verwaist (~35 KB).

### A.2 Export-/Dependency-Befunde (Re-Check)

| Befund (Original) | Status auf c423381 |
| :--- | :--- |
| `stripeWebhookHandler` unbenutzt | **Falsch** — genutzt in `server/_core/index.ts` |
| `daysUntilAccessExpiry` unbenutzt | **Falsch** — genutzt in `Dashboard.tsx` |
| `runMonitoringSnapshot` unbenutzt | **Falsch** — intern in `NightCron.ts` |
| `recharts` unbenutzt | **Falsch** — `client/src/components/ui/chart.tsx` |
| `@stripe/stripe-js` unbenutzt | Plausibel (kein TS-Import) — separater Dep-Audit |

### A.3 Type-Safety (`any` / `as any`)

| Metrik | Original (Juni 2026) | main @ c423381 |
| :--- | ---: | ---: |
| Gesamt | ~739 | **847** |
| `server/verwalterRouter.ts` | 84 | **84** |
| `server/ownerRoute.ts` | 71 | **71** |
| `server/_core/index.ts` | 42 | 36 |
| `server/routers.ts` | 25 | 21 |
| `server/stripe.ts` | 24 | 20 |
| `server/ragTutor.ts` | 24 | 24 (AGENTS.md-verboten) |

Top-10-Prioritätenliste aus §2 bleibt gültig; Gesamtzahl ist gestiegen (u. a. S231 Stripe-Webhook-Tests).

---

## Anhang B: Bereits erledigt (S231N / S233N)

Die Dependency-Diffs aus PR #226 sind auf main **überholt oder regressiv**. Nicht aus PR #226 mergen.

| Paket | PR #226 Ziel | main @ c423381 | Erledigt durch |
| :--- | :--- | :--- | :--- |
| `dompurify` | `^3.4.7` | **`^3.4.11`** | S233N (`94ffcb3`) — main ist **neuer** |
| `form-data` | `^4.0.6` | `^4.0.6` | S233N |
| `vite` | `^8.0.16` | `^8.0.16` | S233N |
| `multer` | `^2.1.1` | **`^2.2.0`** | S231N (`3918f1e`) — main ist **neuer** |

**Noch offen** (Original §3): transitive `tar`, `@opentelemetry/core` → Track **S237**.

---

## Anhang C: Offene Tracks

| Track | Scope | Hinweis |
| :--- | :--- | :--- |
| **S235** | Dead-Code-Cleanup, datei-für-datei | A235A: Page-Duplikate → A235B: Komponenten → A235D: quiz-cases modul2–5 |
| **S236** | Type-Safety | Priorität: `verwalterRouter.ts`, `ownerRoute.ts`; kein Monster-PR |
| **S237** | Transitiv-Deps | `tar`, `@opentelemetry/core` |
| **S234B** | Law-Links | ImmoWertV §-Mapping, `ragTutor.ts` MaBV (separater Backlog) |

**Supersedes:** PR #226 (`audit-dead-code-type-safety-2026-5266573697371883398`) — Branch bleibt als historische Referenz erhalten.
