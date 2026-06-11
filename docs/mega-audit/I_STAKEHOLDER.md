# Teil I — Stakeholder- & Nutzertests (simuliert)

**Rolle:** User-Research-Lead  
**Stand:** 2026-06-11 · HEAD `fcb7ac5`

⚠️ Kein vollständiger Browser-Walkthrough in Cloud-Sandbox (fehlende E2E-Credentials). Befunde basieren auf **Routen-Inventur**, **Live-HTTP-Checks** und **Code-Pfaden**.

---

## I1. Persona-basierte Walkthroughs

### Persona 1 — „Quereinsteiger Maria" (§34c-Prüfung)

| Schritt | Route/Aktion | Status | Beleg |
|---------|--------------|--------|-------|
| 1. Landing | `/` | ✅ HTTP 200, Lighthouse SEO 92 | curl + Lighthouse |
| 2. Registrierung | `/login` → Register-Flow | ✅ Route | `App.tsx:17-18` |
| 3. Modul 1 Tag 1 | `/modul/1/tag/1` | ✅ `ProtectedModuleRoute` | `App.tsx:331` |
| 4. Quiz | `/quiz/:moduleId` | ✅ Auth-geschützt | `App.tsx:317` |
| 5. KI-Tutor | `AITutor` lazy in Modul-Detail | ✅ | `Module3Detail.tsx:27` |
| 6. Fortschritt | tRPC `progress.*` + Dashboard | ✅ | `Dashboard.tsx`, `routers.ts` |

**Potenzielle Bruchstellen:**
- ⚠️ Modul-Zugang ohne Kauf → `ModuleGuard` Redirect (erwartetes Verhalten)
- ❌ Öffentliche `quiz.*` tRPC könnte Antworten leaken (Teil A3) — betrifft nicht Maria direkt, aber Reputationsrisiko

🔍 Playwright-Flow Maria — **AUSSTEHEND** (Login-Credentials).

---

### Persona 2 — „WEG-Verwalterin Frau Schmidt" (Mahnwesen)

| Schritt | UI-Route | Ohne CLI? | Beleg |
|---------|----------|-----------|-------|
| Login | `/login?redirect=/app/verwalter` | ✅ | `FuerVerwaltungsbuerosLanding.tsx:85` |
| Dashboard | `/app/verwalter` | ✅ | `App.tsx:362-366` |
| Objekt anlegen | `/app/verwalter/objekte` | ✅ REST POST | `ObjekteIndex.tsx` |
| Fristen-Batch | `/app/verwalter/fristen` | ✅ | `App.tsx:391-395` |
| Mahnung Stufe 1 | `/app/verwalter/mahnwesen` | ✅ POST start | `MahnwesenIndex.tsx:70-80` |
| Freigabe | `/app/verwalter/freigaben` | ✅ | `App.tsx` Freigaben-Route |

✅ **Vollständiger Flow über UI möglich** — bestätigt durch Code-Review; CLI war gestern getestet, UI-Pfad parallel vorhanden.

🔍 End-to-End-Screenshot-Walkthrough — Alisad mit Test-Account.

---

### Persona 3 — „Investor/Stakeholder"

| Kriterium | Status | Beleg |
|-----------|--------|-------|
| Erster Eindruck Ladezeit | ⚠️ Perf 85 (Home) | Lighthouse |
| Visuelle Konsistenz | ⚠️ 1382 Hardcoded-Hex | Teil B1 |
| Impressum | ✅ HTTP 200 | curl 2026-06-11 |
| AGB | ✅ HTTP 200 | curl |
| Datenschutz | ✅ HTTP 200 | curl |
| Platzhalter in Legal | ✅ Keine TODO/Lorem in Legal-Pages grep | curl + rg |
| Vertrauenssignale Footer | ✅ Links Impressum/Datenschutz/AGB | `Footer.tsx` |

---

## I2. Edge-Cases / Fehlerzustände

### Falsches Passwort 5×

| Verhalten | Ergebnis | Beleg |
|-----------|----------|-------|
| Rate-Limit Login | ✅ `loginLimiter` auf `/api/auth/login` | `index.ts:119,195` |
| Account-Lockout nach 5× | 🔍 **UNVERIFIZIERT** — kein expliziter Lockout-Code in grep | Nur Rate-Limit, kein permanentes Lock |

### Abgelaufene Session

✅ tRPC `UNAUTHED_ERR_MSG` → Redirect Login — `client/src/main.tsx:33-42`

### Stripe-Checkout-Abbruch

✅ `cancel_url` für Verwalter-Tools → `/fuer-verwaltungsbueros` — `server/stripe.ts:233`  
🔍 Ob „halber Kauf" in DB — Webhook-abhängig; `pending_purchases` Tabelle existiert (Migration).

### 404-Seite

✅ Custom `not-found.tsx` mit DE-Text und Home-Link — `client/src/pages/not-found.tsx:14-23`  
Route: `<Route component={NotFound} />` am Ende von `App.tsx`.

### Health bei Ausfall

✅ HealthWatcher E-Mail-Alert (wenn Resend-Key) — `HealthWatcher.ts:101-148`

---

*Weiter: [H_AZAV.md](./H_AZAV.md)*
