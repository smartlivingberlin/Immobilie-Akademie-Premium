# Risikoregister — Immobilien Akademie Smart

**Stand:** 09.06.2026 (NF-X1–X6 ergänzt)  
**Zweck:** Zentrale Übersicht identifizierter Risiken aus Architektur-Audit, Forensik NF-A1–A7/NF-X und sechs externen Verifikationen (Qualys, PageSpeed, Internet.nl, Observatory, Snyk, GTmetrix).  
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
| R-07 | **HSTS ohne `preload` in Live-Response** — hstspreload.org bestätigt Fehler | Niedrig | Fix in PR **#151** (`cursor/hsts-preload-fix-7dbc`); noch nicht deployed | Nach Merge: `curl -sI` prüfen; hstspreload.org-Einreichung erst nach 1 Monat | Code |
| R-08 | **COEP fehlt** — Kein Cross-Origin-Embedder-Policy Header | Niedrig | COOP + CORP gesetzt | COEP nur wenn SharedArrayBuffer o.ä. benötigt — sonst dokumentiert akzeptieren | Code |
| R-09 | **Inspect-Modus: Owner-Routes (`/api/owner/*`) außerhalb REST-Allowlist** | Mittel | tRPC admin/owner blockiert (#141); REST default-deny (#148) | Scope-Review `requireOwner`; ggf. gleiche Allowlist-Logik | Code |
| R-10 | **DSGVO-Löschung ohne Audit-Trail** | Mittel | `account.deleteMyAccount` Multi-Table-Delete | PR #146 nach Rework (Hash-Audit, Post-Verify) | Code |
| R-11 | **Registrierung ohne E-Mail-Verifikation** | Mittel | Sofort-Session nach Register; Willkommens-Mail | PR #147 **blockiert** bis R-21 gelöst (Internet.nl Mail &gt; 90 %) | Code + Alisad |
| R-12 | **Rechtsinhalt / Zertifikats-Haftung** — Keine automatische Rechtsvalidierung | Hoch | Disclaimer auf Zertifikaten (nicht amtlich); Quellen in Modulen | Externe Rechtsprüfung Bildungs-/Werbetexte; BDSG §26 Bildungskontext | Extern + Alisad |
| R-13 | **LCP Mobile 4,8 s** (Desktop 1,0 s — bipolar) — PageSpeed 09.06. 10:08 | Mittel | Desktop 99/100; Mobile 77/100; GTmetrix Seattle LCP 2,6 s | Mobile-only Fixes: Inline-CSS, Font-Subsetting, Hero-Preload; Intl.: CDN-Cache (§17.17) | Code |
| R-14 | **Lighthouse-Skript `tests/performance/lighthouse-test.sh` defekt (WSL)** | Niedrig | PageSpeed Insights als Ersatz | Skript fixen oder als deprecated markieren | Code |
| R-15 | **R2-Backup-Failure ohne Alert** | Mittel | Manueller Cron, Workflow ohne Failure-Notify | PR #144 nach R2-Restore-Test | Code + Alisad |
| R-16 | **Konkurrenz-/USP-Vergleiche im Repo teils unbelegt** | Niedrig | `docs/COMPETITIVE_ANALYSIS.md` als intern markiert | Keine Marketing-Claims ohne Quelle; Audit-Hinweis in Doku | Alisad |
| R-17 | **Testgrün ≠ Produktionssicherheit** — 135 Vitest, 36 API, 10 E2E sind Indikatoren | Mittel | CI grün, Smoke reproduzierbar | Externe Scans (Qualys, PageSpeed, securityheaders.com); Pen-Test vor Skalierung | Alisad + Code |
| R-18 | **Snyk/Header-Scanner HTTP-Falle** — Falsche Negatives bei HTTP statt HTTPS | Niedrig | Manueller curl-Verify 09.06. | Tools immer mit `https://` URL; Ergebnis in Audit-Protokoll | Alisad |
| R-19 | **Module3 Content-Chunk ~184 KB / ~53 KB gzip** — groß, aber lazy-loaded | Niedrig | Dynamic import, nicht im Home-Bundle | Optional weitere Splits Part 2–4 | Code |
| R-20 | **B2B-Tenant-Isolation / Team-Codes** — komplex, wenig automatisierter Regressionstest | Mittel | CLI-Smoke `ops:b2b-team-smoke` | Erweiterte E2E für B2B-Flows vor Live-Stripe | Code |
| R-21 | **E-Mail-Deliverability 63 %** — Internet.nl Mail: SPF permerror (`include:_spf.resend.com` NXDOMAIN), DMARC pct=10, kein SPF auf `send` | **Hoch** | DKIM `resend._domainkey` ✅; Resend API aktiv | SPF Root: `v=spf1 include:_smtp.udag.de include:amazonses.com -all`; SPF `send`: `v=spf1 include:amazonses.com -all`; DMARC pct=100 stufenweise — siehe `EXTERNAL_OPS_CHECKLIST.md` P0 | **Alisad** (DNS) |
| R-22 | **IPv6 fehlt (Web + Mail)** — Internet.nl Failed | Niedrig | Web: nur A (Railway); Mail: UDAG MX nur IPv4 | Railway: keine öffentl. IPv6-Doku; UDAG: Provider-Ticket oder akzeptieren | Extern (Provider) |
| R-23 | **DNS CAA Records fehlen** — Internet.nl + SSL Labs | Niedrig | Keine CAA-Records (dig 09.06.) | `0 issue "letsencrypt.org"` + `0 iodef "mailto:alisadgadyri38@gmail.com"` | Alisad |
| R-24 | **Internet.nl Hash-Function Failed vs SSL Labs A+** | Niedrig | TLS 1.3/1.2 ohne SHA-1 in ausgehandelter Cipher (openssl 09.06.) | Vollständigen Cipher-Scan optional; kein Fix ohne Kompatibilitäts-Test | Code + Alisad |
| R-25 | **Mozilla Observatory B+ (80/100)** — CSP unsafe-inline (−20) | Niedrig | Snyk HTTPS Grade A bestätigt | Nonce-CSP (NF-12 Roadmap) → theoretisch A+ | Code |

---

## Priorisierte nächste Schritte (P0/P1)

| Prio | Maßnahme | Risiko-IDs |
|------|----------|------------|
| **P0** | **E-Mail-Stack reparieren** (SPF permerror, DMARC, send-Subdomain) — blockiert PR #147 | R-21 |
| **P0** | R2-Restore-Test durchführen und dokumentieren | R-01 |
| **P0** | HSTS Preload deployen (PR #151) + curl-Verifikation | R-07 |
| **P1** | DNS CAA Records setzen (~10 Min) | R-23 |
| **P1** | LCP Mobile-Optimierung (Render-blocking, Fonts, unused JS) | R-13 |
| **P1** | Stripe Live Pre-Flight vor Umschaltung | R-02 |
| **P1** | Rechtliche Review Bildungs-/Marketingtexte | R-12 |
| **P2** | IPv6/DNSSEC/DANE auf UDAG-MX — Provider klären oder akzeptieren | R-22 |

---

## Änderungshistorie

| Datum | Änderung |
|-------|----------|
| 09.06.2026 | Erstversion aus Audit NF-A6, externen Daten Alisad (Qualys A+, PageSpeed Mobile) |
| 09.06.2026 | NF-X1–X6: E-Mail 63 %, HSTS-Fix #151, IPv6/CAA, Performance bipolar, Observatory B+ |

---

*Verknüpft mit:* `docs/UEBERGABE_ANTROPIQ_ARCHITEKT_20260608.md` §17 (Bericht-Korrektur-Nachtrag)
