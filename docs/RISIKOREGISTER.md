# Risikoregister — Immobilien Akademie Smart

**Stand:** 09.06.2026  
**Zweck:** Zentrale Übersicht identifizierter Risiken aus Architektur-Audit, Forensik NF-A1–A7 und externen Verifikationen (Qualys, PageSpeed).  
**Nicht:** Ersatz für juristische Beratung oder formale ISMS-Dokumentation.

---

## Legende

| Severity | Bedeutung |
|----------|-----------|
| **Hoch** | Produktions-/Compliance-Blocker oder signifikante Haftung bei Eintritt |
| **Mittel** | Beherrschbar, aber zeitnah adressieren vor Skalierung / Live-Zahlungen |
| **Niedrig** | Akzeptabel für Soft Launch; Monitoring oder Backlog |

| Verantwortlichkeit | Wer |
|--------------------|-----|
| **Code** | Entwicklung / PR im Repo |
| **Alisad** | Betrieb, manuelle Tests, externe Tools, rechtliche Klärung |
| **Extern** | Anwalt, Stripe-Support, Infrastruktur-Anbieter |

---

## Risiko-Tabelle

| ID | Risiko | Severity | Mitigation (aktuell) | Empfohlene Maßnahme | Verantwortlichkeit |
|----|--------|----------|----------------------|---------------------|-------------------|
| R-01 | **R2-Restore nie auf Prod-Backup durchgeführt** — Backups existieren, Wiederherstellbarkeit unbewiesen | Hoch | Manueller MySQL-Dump 06.06. lokal restored; R2-Cron dokumentiert (`docs/RUNBOOK_BACKUP_RESTORE.md`) | Restore-Test gegen `latest/` in R2; Ergebnis in `audit_runs/r2_restore_test_YYYYMMDD/` | Alisad (+ Code: Restore-Skript-Doku) |
| R-02 | **Stripe Live nicht aktiviert** — Zahlungsflüsse nur Testmodus | Hoch | 18 Price-ENV-Keys im Katalog, 7 in Public-API; Webhook-Health-Endpoint | Pre-Flight `ops:stripe-preflight` vor Live; PR #145 nach Rework mergen | Alisad + Code |
| R-03 | **Keine Staging-Umgebung** — Tests/E2E teils gegen Prod | Mittel | Inspect-Modus, Rate-Limits, 4 Prod-User | Dedizierte Preview-Branch-Deploys oder Railway-Staging | Alisad |
| R-04 | **Solo-Founder Bus Factor** — Wissen, Ops, Legal bei einer Person | Mittel | Übergabe-Doku, Runbooks, CI-Guards | Risikoregister + zweiter Admin-Zugang dokumentieren; kritische Runbooks quarterly üben | Alisad |
| R-05 | **KI-API-Kosten ohne harte Budget-Cap** — Fair-Use-Quoten, kein absolutes Tageslimit | Mittel | `server/kiFairUse.ts` Tier-Quotas; Admin ki-stats | Hard cap + Alert bei 80/100 %; Kosten-Dashboard | Code + Alisad |
| R-06 | **CSP `unsafe-inline`** — XSS-Oberfläche in script/style | Mittel | Helmet-CSP aktiv; Stripe/Plausible allowlisted | Nonce- oder Hash-basierte CSP (Roadmap NF-12); kein Big-Bang | Code |
| R-07 | **HSTS ohne `preload` in Live-Response** — Code setzt preload, Helmet überschreibt | Niedrig | HSTS 1 Jahr + includeSubDomains aktiv (curl 09.06.) | Helmet `hsts: { preload: true }` oder doppeltes Setzen entfernen; optional hstspreload.org | Code |
| R-08 | **COEP fehlt** — Kein Cross-Origin-Embedder-Policy Header | Niedrig | COOP + CORP gesetzt | COEP nur wenn SharedArrayBuffer o.ä. benötigt — sonst dokumentiert akzeptieren | Code |
| R-09 | **Inspect-Modus: Owner-Routes (`/api/owner/*`) außerhalb REST-Allowlist** | Mittel | tRPC admin/owner blockiert (#141); REST default-deny (#148) | Scope-Review `requireOwner`; ggf. gleiche Allowlist-Logik | Code |
| R-10 | **DSGVO-Löschung ohne Audit-Trail** | Mittel | `account.deleteMyAccount` Multi-Table-Delete | PR #146 nach Rework (Hash-Audit, Post-Verify) | Code |
| R-11 | **Registrierung ohne E-Mail-Verifikation** | Mittel | Sofort-Session nach Register; Willkommens-Mail | PR #147 deferred — Hybrid-Verify nach Produktentscheidung | Code + Alisad |
| R-12 | **Rechtsinhalt / Zertifikats-Haftung** — Keine automatische Rechtsvalidierung | Hoch | Disclaimer auf Zertifikaten (nicht amtlich); Quellen in Modulen | Externe Rechtsprüfung Bildungs-/Werbetexte; BDSG §26 Bildungskontext | Extern + Alisad |
| R-13 | **LCP Mobile 4,5 s** (Ziel &lt;2,5 s) — PageSpeed 09.06. | Mittel | Hero preload, code-splitting, CLS 0 | Render-blocking reduzieren, Fonts subsetten, unused JS (siehe §17 Ubergabebericht) | Code |
| R-14 | **Lighthouse-Skript `tests/performance/lighthouse-test.sh` defekt (WSL)** | Niedrig | PageSpeed Insights als Ersatz | Skript fixen oder als deprecated markieren | Code |
| R-15 | **R2-Backup-Failure ohne Alert** | Mittel | Manueller Cron, Workflow ohne Failure-Notify | PR #144 nach R2-Restore-Test | Code + Alisad |
| R-16 | **Konkurrenz-/USP-Vergleiche im Repo teils unbelegt** | Niedrig | `docs/COMPETITIVE_ANALYSIS.md` als intern markiert | Keine Marketing-Claims ohne Quelle; Audit-Hinweis in Doku | Alisad |
| R-17 | **Testgrün ≠ Produktionssicherheit** — 135 Vitest, 36 API, 10 E2E sind Indikatoren | Mittel | CI grün, Smoke reproduzierbar | Externe Scans (Qualys, PageSpeed, securityheaders.com); Pen-Test vor Skalierung | Alisad + Code |
| R-18 | **Snyk/Header-Scanner HTTP-Falle** — Falsche Negatives bei HTTP statt HTTPS | Niedrig | Manueller curl-Verify 09.06. | Tools immer mit `https://` URL; Ergebnis in Audit-Protokoll | Alisad |
| R-19 | **Module3 Content-Chunk ~184 KB / ~53 KB gzip** — groß, aber lazy-loaded | Niedrig | Dynamic import, nicht im Home-Bundle | Optional weitere Splits Part 2–4 | Code |
| R-20 | **B2B-Tenant-Isolation / Team-Codes** — komplex, wenig automatisierter Regressionstest | Mittel | CLI-Smoke `ops:b2b-team-smoke` | Erweiterte E2E für B2B-Flows vor Live-Stripe | Code |

---

## Priorisierte nächste Schritte (P0/P1)

| Prio | Maßnahme | Risiko-IDs |
|------|----------|------------|
| **P0** | R2-Restore-Test durchführen und dokumentieren | R-01 |
| **P0** | Live-Verifikation Inspect REST (#148): `ki-stats` → 403 mit Cookie | R-09 |
| **P1** | LCP-Optimierung (Render-blocking, Fonts, unused JS) | R-13 |
| **P1** | Stripe Live Pre-Flight vor Umschaltung | R-02 |
| **P1** | Externe Header-Scans (securityheaders.com, Mozilla Observatory) | R-17, R-18 |
| **P1** | Rechtliche Review Bildungs-/Marketingtexte | R-12 |

---

## Änderungshistorie

| Datum | Änderung |
|-------|----------|
| 09.06.2026 | Erstversion aus Audit NF-A6, externen Daten Alisad (Qualys A+, PageSpeed Mobile) |

---

*Verknüpft mit:* `docs/UEBERGABE_ANTROPIQ_ARCHITEKT_20260608.md` §17 (Bericht-Korrektur-Nachtrag)
