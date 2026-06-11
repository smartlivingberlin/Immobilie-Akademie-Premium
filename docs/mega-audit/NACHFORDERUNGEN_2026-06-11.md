# Mega-Audit — Nachforderungen & Vertiefungen

**Stand:** 2026-06-11 · Branch `cursor/mega-audit-docs-0b8d` · PR #198  
**Modus:** Nur Analyse + Dokumentation, **keine Fixes**

---

## Korrektur: Sentry-Status

| Frühere Aussage (Audit) | Korrigiert |
|-------------------------|------------|
| „Sentry konfiguriert aber ENV-abhängig" / UNVERIFIZIERT | ✅ **Sentry IST aktiv in Production** |

**Beleg (Alisad, 2026-06-11):** Sentry-Dashboard zeigt ~2 Wochen Daten und **4 ungelöste Issues**.  
→ `SENTRY_DSN` (Server) und vermutlich `VITE_SENTRY_DSN` (Client) sind in Railway gesetzt.

| Variable | Code-Referenz |
|----------|---------------|
| `SENTRY_DSN` | `server/_core/index.ts:2-3` |
| `VITE_SENTRY_DSN` | `client/src/main.tsx:3-5` |

**Executive Summary** und J3-Eintrag „Railway Sentry prüfen" sind damit **überholt** — Sentry funktioniert; die 4 Issues unten sind die aktuelle Arbeitsliste.

---

## Sentry-Issues (4 ungelöst, ~2 Wochen Daten)

| ID | Issue | Events | Zeitraum | Priorität |
|----|-------|--------|----------|-----------|
| S-1 | `/api/tts` TypeError `req.body` | 3 | ~3 Wochen | ⚠️ Mittel |
| S-2 | Service Worker `sw.js` Fehler | 10 | ~2 Wochen | ⚠️ Mittel |
| S-2b | „text/html is not valid JS MIME type" | 1 | ~2 Wochen | ⚠️ Mittel (verwandt mit S-2/S-3) |
| S-3 | Dynamic Import Failure Dashboard-Chunk | (in 4 Issues) | — | 💭 Niedrig |

---

## S-1. `/api/tts` — TypeError `Cannot destructure property 'text' of req.body`

### Fundstellen

```bash
grep -rn "app.post.*tts\|/api/tts" server/ --include="*.ts"
```

| Datei | Zeile | Route | Auth |
|-------|-------|-------|------|
| `server/_core/index.ts` | 156 | `POST /api/tts` | `requireAuth` |
| `server/ragTutor.ts` | 408 | `POST /api/ai/tts` | `requireAuth` |

### Root Cause: Body-Parser-Reihenfolge ❌

**Middleware-Reihenfolge in `server/_core/index.ts`:**

| Zeile | Middleware/Route |
|-------|------------------|
| **156** | `app.post("/api/tts", ...)` ← **destructure `req.body` hier** |
| 176 | `app.post("/api/consent", ...)` ← gleiches Problem möglich |
| 204 | `app.use(cookieParser())` |
| 240–275 | Stripe Webhook (raw body) |
| **276** | `app.use(express.json({ limit: "1mb" }))` ← **JSON-Parser erst danach** |

**Diagnose:** `POST /api/tts` wird registriert **vor** `express.json()`. Bei JSON-POST ist `req.body` daher `undefined` → exakt der Sentry-TypeError bei Zeile 157:

```typescript
const { text, voiceId = "21m00Tcm4TlvDq8ikWAM" } = req.body; // req.body === undefined
```

**Vergleich:** `POST /api/ai/tts` in `ragTutor.ts:408` wird via `registerRagTutorRoutes(app)` bei Zeile 294 gemountet — **nach** `express.json()` — und hat `try/catch` um `req.body`-Zugriff. Diese Route wäre korrekt.

### Client-Aufruf

| Datei | Zeile | Endpoint | Content-Type |
|-------|-------|----------|--------------|
| `client/src/components/AIAssistant.tsx` | 142–154 | `POST /api/tts` | `application/json` |

Body (korrekt vom Client):

```json
{
  "text": "<bereinigter Markdown-Text, max 300 Zeichen>",
  "model_id": "eleven_multilingual_v2",
  "voice_settings": { "stability": 0.5, "similarity_boost": 0.75 }
}
```

`credentials: "include"` — Session-Cookie wird mitgesendet.  
**Kein anderer Client** ruft `/api/tts` auf (grep nur `AIAssistant.tsx`).

### Schweregrad & Nutzer-Impact

| Aspekt | Bewertung |
|--------|-----------|
| ElevenLabs Premium-TTS | ❌ **Immer fehlgeschlagen** (struktureller Parser-Bug) |
| Browser-Fallback | ✅ `AIAssistant.tsx:169-179` — `window.speechSynthesis` |
| Nutzer wahrnehmbar? | ⚠️ **Teilweise** — Vorlesen funktioniert mit Browser-Stimme, nicht ElevenLabs |
| Häufigkeit | Niedrig — nur 3 Sentry-Events / ~3 Wochen (Button „Text vorlesen" im KI-Assistenten) |
| Betroffene User | Nur Nutzer die **explizit** den Vorlesen-Button im `AIAssistant` klicken |

**Fazit:** ⚠️ Mittel — Feature degradiert zu Browser-TTS, kein Totalausfall. Fix trivial (Route nach `express.json()` verschieben oder eigenes `express.json()` davor) — **nicht in diesem PR**.

### Empfohlener Fix (nur Vorschlag)

1. `app.post("/api/tts", ...)` Block von Zeile 155–173 **unter** Zeile 276 verschieben, **oder**
2. Client auf `/api/ai/tts` umstellen (bereits korrekt verdrahtet), **oder**
3. Lokales `express.json()` nur für `/api/tts` und `/api/consent` vor den Handlern.

---

## S-2. Service Worker `sw.js` — 10 Events + MIME-Type-Fehler

### Bewusst implementiert ✅ (kein Vite-PWA-Rest)

| Komponente | Pfad | Beleg |
|------------|------|-------|
| SW-Datei | `client/public/sw.js` | v2, Cache `ias-v4` |
| Registrierung | `client/src/lib/registerSW.ts:11` | `navigator.serviceWorker.register('/sw.js')` |
| Aufruf | `client/src/main.tsx:89` | `registerServiceWorker()` |

### Live-Check `curl -I /sw.js` (2026-06-11)

```
HTTP/2 200
content-type: application/javascript; charset=UTF-8
```

✅ **Korrekter MIME-Type** für `/sw.js` selbst.

### „text/html is not valid JS MIME type" (1 Event) — wahrscheinliche Ursache

**SPA-Fallback liefert HTML für fehlende JS-Chunks:**

```bash
curl -sI 'https://immobilien-akademie-smart.de/assets/nonexistent-chunk.js'
# content-type: text/html; charset=UTF-8  (HTTP 200!)
```

Beleg: `server/_core/vite.ts:161-169` — Catch-All `app.get("*")` sendet `index.html` für unbekannte Pfade.

**Kausalkette:**
1. Nach Deploy ändern sich Vite-Chunk-Hashes (`Dashboard-*.js`)
2. User/SW hat noch alte `index.html` oder alten Chunk-Cache
3. Browser/SW fordert alten `/assets/OldHash.js` an
4. Server antwortet mit **HTML** statt 404
5. Browser: „text/html is not valid JS MIME type"

### SW-Strategie (relevant für S-2/S-3)

`client/public/sw.js`:
- **Cache-First** für gehashte `/assets/*.js` (`isStaticAsset`)
- **Network-First** für HTML/Seiten
- `/api/*` nie gecacht (`NEVER_CACHE`)
- `updateViaCache: 'none'` bei Registrierung (`registerSW.ts:13`)

⚠️ **Risiko:** Cache-First für alte Hash-Assets kann veraltete JS-Dateien liefern, solange der alte Hash noch im Cache liegt. Nach Deploy ohne Cache-Bust können Import-Fehler entstehen.

### 10 SW-Events — mögliche Ursachen (🔍 ohne Stack-Trace aus Sentry-UI)

| Hypothese | Plausibilität |
|-----------|---------------|
| Stale Chunk → HTML statt JS (s. oben) | Hoch |
| `registration.update()` Fehler bei langsamem Netz | Mittel |
| Erste Installation während Offline | Niedrig |
| Alte Domain/URL in gecachtem SW | Niedrig (kein Treffer für alte Railway-Domain im Client-Code) |

---

## S-3. Dynamic Import Failure — Dashboard-Chunk

### Lazy-Loading Dashboard

```typescript
// client/src/App.tsx:55
const Dashboard = lazy(() => import("@/pages/Dashboard"));

// client/src/App.tsx:443-449 — Preload nach 2,5s
if (path.startsWith("/statistiken") || path.startsWith("/modul/"))
  void import("@/pages/Dashboard");
```

`DashboardLayout` ebenfalls lazy (`App.tsx:6`).

### Reload-on-ChunkError-Strategie?

```bash
grep -rn "Failed to fetch dynamically imported" client/src/
# → 0 Treffer
```

| Mechanismus | Vorhanden? | Beleg |
|-------------|------------|-------|
| Globaler `import()` Error-Handler | ❌ | — |
| Vite `preloadError` / automatischer Reload | ❌ | nicht konfiguriert |
| `ErrorBoundary` mit Reload-Button | ✅ | `ErrorBoundary.tsx:41` — manuell |
| `window.location.reload()` an anderen Stellen | ✅ | ModuleQuiz, CookieConsent, OwnerDashboard — **nicht** chunk-spezifisch |

**Fazit:** Keine automatische Reload-on-ChunkError-Strategie. Nutzer sieht ggf. ErrorBoundary oder leeren Suspense-Fallback.

### Schweregrad

💭 **Niedrig** — typisches Post-Deploy-Cache-Timing-Problem. Einmaliges Hard-Reload löst es. Häufigkeit unbekannt (ein Issue unter den 4).

**Empfehlung (nur Doku, kein Fix):** Globaler Listener:

```javascript
// Pseudocode — nicht implementiert
window.addEventListener('vite:preloadError', () => location.reload());
// oder React.lazy error boundary mit auto-reload
```

---

## Kurzreferenz: Frühere Nachforderungen (Auszug)

Vollständige Antworten in PR-Kommentar 2026-06-11. Kernergebnisse:

| Thema | Ergebnis |
|-------|----------|
| Quiz-Leak | ⚠️ **Mittel** — nur **17** DB-Seed-Fragen öffentlich; **854** über `/data/all-questions.json` geschützt (403) |
| Schema-Drift | **16** aktive Orphan-Tabellen, alle per raw SQL genutzt — Dokumentationsproblem, kein Laufzeit-Risiko |
| Mahnwesen LLM | ✅ Kein LLM — rein Template (`verwalterMahnwesenService.ts:71`) |
| CI E2E | ❌ **100% Failure** (Login 401 in global-setup) — `continue-on-error` seit 2026-06-07 (`3c83b9f5`) |
| Compliance-E2E #197 | Nicht in CI-Smoke enthalten — Bug nicht durch continue-on-error versteckt |
| IDOR Verwalter | ✅ 401 ohne Cookie für `/api/verwalter/objekte/ac736e2f-969` |

---

## Priorisierte Fix-Liste (nur Empfehlung, P2/P3)

| P | Issue | Aufwand | Aktion |
|---|-------|---------|--------|
| P2 | S-1 `/api/tts` Parser-Reihenfolge | ~15 Min | Route nach `express.json()` |
| P2 | S-2/S-3 Chunk+SW Cache | ~1–2h | SW-Version bump + Chunk-Error-Reload |
| P3 | S-2 `/api/consent` gleiche Parser-Lage | ~15 Min | Mit S-1 verschieben |
| P3 | Quiz tRPC public | ~30 Min | `protectedProcedure` oder Antworten strippen |

---

*Ende Nachforderungen — keine Code-Änderungen in PR #198*
