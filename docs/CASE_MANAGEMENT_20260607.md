# Case Management — Immobilien Akademie Smart

**Stand:** 07.06.2026 Abend  
**Owner:** Alisad Gadyri  
**Agentur-Modus:** Produkt · Security · Compliance · Ops · QA · Legal

---

## Executive Dashboard

| Bereich | Ampel | Offene Cases | Nächster Schritt |
|---------|-------|--------------|------------------|
| Produktion | 🟢 | 0 P0 | Modul 5 + Stripe Live (#122) ✅ |
| Security | 🟢 | 0 P1 | ki-stats, quiz-guard, resend-2fa (#120) ✅ |
| Compliance | 🟡 | 1 P1 | Claims zentralisiert; Gewerbeschein extern |
| Daten/Backup | 🟡 | 1 P1 | R2 Workflow ready (#123); Secrets + Restore extern |
| QA/CI | 🟢 | 0 P2 | Modul-Smoke + Stripe-Guards CI (#123) ✅ |
| Legal/DSGVO | 🟡 | 4 extern | AVVs, Gewerbeschein, DMARC |

---

## Stakeholder-Matrix

| Stakeholder | Vertreter | Sicht | Priorität diese Woche |
|-------------|-----------|-------|----------------------|
| **Product Owner** | Alisad | Feature-Flow, Inspect, Module | Inspect-Polish #92 |
| **Security** | Audit/Agent | Least privilege, Content-Leaks | ki-stats #91, Quiz-Schutz #93 |
| **DSGVO** | Berater | Löschung, Consent, AVV | PR #82 verifiziert ✅ |
| **Legal/Claims** | Prüfer | §34c/§34i, IHK-Formulierungen | Claims #94 |
| **Ops/SRE** | Railway | Deploy, MySQL FAILED, Health | R2 #89, MySQL klären |
| **QA** | Tester | Smoke, Regression | #90 Playwright |
| **Marketing** | Alisad | 854/855/4275 Konsistenz | shared/claims.ts |
| **Finanzen** | Stripe | Test-Modus, Webhooks | Live-Freigabe offen |

---

## Case Register

### CASE-001 — ki-stats ohne Admin-Gate
- **Status:** Fix bereit → **PR #91**
- **Risiko:** Mittel (falsche Metriken / offener Endpoint)
- **Owner:** Dev
- **Merge:** Nach tsc + test

### CASE-002 — all-questions.json öffentlich
- **Status:** Fix in Agency-Sprint **#93**
- **Risiko:** Hoch (854 Fragen IP)
- **Abnahme:** curl anonym → 403, eingeloggt → 200

### CASE-003 — Owner resend-2fa ohne Limit
- **Status:** Fix in **#93** (Rate-Limit 3/15min)
- **Risiko:** Mittel (OTP-Spam)

### CASE-004 — Claims 854 vs 855+
- **Status:** Fix in **#94** (`shared/claims.ts`)
- **Risiko:** Niedrig (Marketing/Recht)

### CASE-005 — Cookie-Banner vs Code (Umami)
- **Status:** Fix in **#94** (ehrlicher Text)
- **Risiko:** Mittel (DSGVO-Darstellung)

### CASE-006 — Inspect Ansehen-Links / Stats 0
- **Status:** Fix bereit → **PR #92**

### CASE-007 — Modul-Smoke fehlt
- **Status:** Fix bereit → **PR #90**

### CASE-008 — R2 Backup inaktiv
- **Status:** Workflow + Checkliste → **#123** ✅
- **Blocker:** GitHub Secrets, R2-Bucket, Restore-Test (Alisad)

### CASE-009 — Railway MySQL FAILED
- **Status:** Runbook `docs/RAILWAY_MYSQL_OPS.md` + `/api/health` DB-Ping
- **Owner:** Alisad + Ops — Backup zuerst, dann Redeploy

### CASE-010 — Migration ohne Ledger
- **Status:** Backlog P2
- **Scope:** `server/migrate.ts` + SQL-Ledger

### CASE-011 — Server-Tests nicht in CI
- **Status:** Fix in **#95** (vitest.config.ts)

### CASE-012 — PR #72 Read-Only Audit
- **Status:** Überholt → geschlossen (ersetzt durch #116–#123)

---

## Merge-Welle (empfohlen)

```
Welle 1 — Security (heute):
  #91 ki-stats → deploy → curl /api/admin/ki-stats → 401/403
  #93 quiz-schutz + resend-2fa → deploy → curl all-questions 403

Welle 2 — UX/Compliance:
  #92 Inspect-Polish
  #94 Claims + Cookie
  #87 + #88 UI-Labels (optional batch)

Welle 3 — Qualität/Ops:
  #90 Modul-Smoke (manuell ausführen)
  #95 CI vitest
  #89 R2-Doku (kein Code-Risiko)
```

---

## Externe Aufgaben (nur Alisad)

- [ ] `OWNER_MAGIC_CODE` rotieren
- [ ] `INSPECT_JWT_SECRET` prüfen/setzen
- [ ] R2-Bucket + GitHub Secrets
- [ ] R2 Restore-Test nach Checkliste (#89)
- [ ] Railway MySQL FAILED analysieren
- [ ] DMARC `p=reject`
- [ ] Gewerbeschein Impressum
- [ ] DSGVO-AVVs abschließen
- [ ] Issue #30 schließen, PR #72 archivieren

---

## Definition of Done (Sprint 07.06.)

- [ ] Alle P0/P1 Cases haben PR oder externes Ticket
- [ ] `pnpm test` ≥ 18 Tests grün (inkl. Server-Unit)
- [ ] `tsc` 0 Errors
- [ ] Keine verbotenen Dateien geändert
- [ ] Produktion: Health 8/8, module*.json 403 anonym

---

*Nächstes Review: nach Merge Welle 1*
