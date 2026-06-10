# Verwalter Suite — Plan zur eigenständigen Produktlinie

**Stand:** 2026-06-10  
**Entscheidung Alisad:** Eigenständiges Produkt mit eigener Domain ist **geplant**  
**Status:** Strategie — noch nicht umgesetzt

---

## Kurzantwort: Neues Repo jetzt?

| Option | Empfehlung | Warum |
|--------|------------|-------|
| **Neues GitHub-Repo sofort** | ❌ Nein | 51+ Verwalter-Dateien, geteilte Auth, KI-Pipeline, `users`-Tabelle — Split kostet Wochen, bremst parallele Entwicklung |
| **Neuer Railway-Service** | 🟡 Ja, aber Phase 2 | Eigene Domain + Deploy — sinnvoll nach P0-Fixes |
| **Neues Railway-Projekt** | 🟡 Optional | Gleicher Effekt wie zweiter Service; ein Projekt mit 2 Services reicht meist |
| **Monorepo behalten** | ✅ Ja | Parallele Entwicklung Lernportal + Verwalter im selben Repo |

---

## Empfohlene Phasen (Agentur-Standard)

### Phase 1 — Fundament (jetzt, 1–2 Wochen)

**Ziel:** Sub-Produkt stabil, Daten sicher, offene PRs konsolidiert.

| # | Task | Wer |
|---|------|-----|
| 1 | Verwalter-Daten von File-Store → **MySQL** (eigene Tabellen) | Cursor |
| 2 | PRs #172–#177 → **1 konsolidierter PR** auf `main` | Cursor |
| 3 | Fair-Use auf `/api/verwalter/*` | Cursor |
| 4 | E2E Smoke für Vorlagen + Objekte | Cursor |
| 5 | Stripe-Produkt „Verwalter Tools" (Test) vorbereiten | Cursor + Alisad |

**Repo:** `Immobilie-Akademie-Premium` (unverändert)  
**URL:** `immobilien-akademie-smart.de/app/verwalter/*` (bleibt)

### Phase 2 — Eigenes Deployment (wenn Phase 1 live)

**Ziel:** Eigene Domain, unabhängiger Deploy, geteilte Auth.

```
┌─────────────────────────────────────────────────────────────┐
│  Monorepo: Immobilie-Akademie-Premium                        │
├──────────────────────────┬──────────────────────────────────┤
│  Railway Service 1       │  Railway Service 2               │
│  „portal"                  │  „verwalter"                     │
│  immobilien-akademie-      │  verwalter.immobilien-akademie-  │
│  smart.de                  │  smart.de (oder eigene Domain)   │
├──────────────────────────┴──────────────────────────────────┤
│  Geteilt: MySQL (User-Auth), KI-API-Keys, ggf. Redis später   │
│  Getrennt: Deploy, ENV PRODUCT_MODE, Stripe-Products, Brand  │
└─────────────────────────────────────────────────────────────┘
```

| # | Task | Wer |
|---|------|-----|
| 1 | Railway: **zweiten Service** im gleichen Projekt anlegen | **Alisad** (Dashboard) |
| 2 | `railway.toml` / `Dockerfile` mit `PRODUCT=verwalter` oder Root-Filter | Cursor |
| 3 | DNS: `verwalter.immobilien-akademie-smart.de` → Service 2 | **Alisad** (United Domains / Cloudflare) |
| 4 | Cookie-Domain: `.immobilien-akademie-smart.de` für SSO | Cursor |
| 5 | Eigenes Stripe-Produkt (39 €/Mo laut Roadmap) | Alisad + Cursor |
| 6 | **Volume** oder MySQL für Verwalter-Daten (nach Phase-1-Migration) | erledigt in Phase 1 |

**Neues GitHub-Repo:** weiterhin **nein**.

### Phase 3 — Vollständige Produkt-Trennung (optional, >50 zahlende Verwalter)

| # | Task | Wann |
|---|------|------|
| 1 | Eigenes Impressum / AGB / Datenschutz-Verweis | Go-to-Market |
| 2 | Eigenes Railway-**Projekt** (nur wenn Compliance/Isolation nötig) | Skalierung |
| 3 | Repo-Split in `packages/auth`, `packages/ki`, `apps/verwalter` | Nur bei separatem Team |
| 4 | Eigene Domain ohne Subdomain (z. B. `weg-verwalter-tools.de`) | Marke |

---

## Parallele Entwicklung + Schulung

| Bereich | Lernportal (§34c) | Verwalter Suite |
|---------|-------------------|-----------------|
| Branch-Präfix | `cursor/portal-*` | `cursor/verwalter-*` |
| Routes | `/kurs/*`, `/modul/*` | `/app/verwalter/*` → später eigene Domain |
| Doku | `docs/` allgemein | `docs/VERWALTER_*.md` |
| Tests | `tests/e2e/0[1-6]*` | `tests/e2e/26-verwalter-*` |
| Deploy | Service 1 (jetzt) | Service 2 (Phase 2) |

**Schulung/Inhalt:** Module 1–5 + Rechenpraxis bleiben im Hauptportal; Verwalter-Vorlagen + Assistent eigenes Onboarding (`VerwalterOnboarding.tsx` in Branch #176).

---

## Was Cursor NICHT kann (Alisad-Aufgaben)

| Aufgabe | Warum |
|---------|-------|
| Railway-Projekt/Service anlegen | Kein Zugang zu deinem Railway-Account |
| DNS-Einträge setzen | United Domains / Cloudflare — dein Login |
| Stripe Live-Produkte anlegen | Dashboard + Geschäftsentscheidung |
| Neues GitHub-Repo in deiner Org | Nur du entscheidest Org-Struktur; aktuell nicht empfohlen |

---

## Was Cursor als Nächstes kann (nach deinem OK)

1. Phase-1-P0: MySQL-Migration für Verwalter-Objekte/Vorgänge/Buchungen
2. Verwalter-PRs #172–#177 konsolidieren und mergen
3. `PRODUCT_MODE=verwalter|portal` Env-Skeleton für Phase 2 vorbereiten
4. Dieses Dokument in PR auf `main`

---

## Entscheidungspunkte für Alisad

| Frage | Optionen |
|-------|----------|
| Domain Phase 2 | `verwalter.immobilien-akademie-smart.de` vs. komplett eigene Domain |
| Preis | 39 €/Mo (Roadmap) — bestätigen |
| DB geteilt vs. getrennt | **Empfehlung:** eine MySQL, getrennte Tabellen (günstiger, Auth einfacher) |
| Wann Phase 2 Deploy | Nach Phase 1 Merge + 1 Woche stabil |

---

*Referenz: `docs/VERWALTER_SUITE_ROADMAP.md:58-62`, Audit Teil 4 `docs/AUDIT_2026-06-10_04_VERWALTER.md`*
