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
