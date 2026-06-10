# Teil 9 — Ehrliche Selbst-Bewertung

**Perspektive:** Cursor Agent · **Stand:** 2026-06-10

---

## 9.1 Letzte 30 Tage — Was lief gut?

| Entscheidung | Warum rückblickend richtig | Beleg |
|--------------|---------------------------|-------|
| Inspect Security P0 (#141, #148) | Reale Schwachstelle geschlossen vor externem Audit | merged 08.06. |
| Dockerfile statt Nixpacks-Patches | Nach 9 PRs stabiler Build | Health 200 |
| KI Multi-Provider Fallback | Reduziert Single-Point-of-Failure Anthropic | #168, #84 |
| Stripe Test-First + Seed-Script | 18 Price-IDs automatisierbar | PR #127 |
| Verwalter als Subpath | Schneller MVP ohne zweites Deployment | #169 merged |
| Vitest-Ausbau 122→213 | Mehr Regression-Schutz | Test-Run 10.06. |

---

## 9.2 Was lief schlecht?

| Problem | Hätte vermieden werden können | Beleg |
|---------|------------------------------|-------|
| 90 Commits / 47 PRs an einem Tag (07.06.) | Sprint-Disziplin, kleinere Batches | Chronologie |
| 6 Verwalter-PRs kaskadierend statt 1 konsolidiert | Architektur-Plan vor Coding | #172-#177 |
| File-Stores ohne Volume-Plan | DB-Design vor Feature-Sprint | `data/verwalter-*` |
| PR #154 mit 14k LoC | Feature-Split | offen |
| Nixpacks 9 Fix-PRs | Dockerfile von Anfang an | #158-#166 |
| Verwalter-KI ohne Fair-Use | Gate wiederverwenden | `verwalterRouter.ts` |
| schema.ts hinter migrations zurück | Schema-Sync als Pflicht | 26 vs 45 migrations |

### Zu schnell

- Verwalter P1-P3+ an einem Tag (10.06.)
- B2B Phasen 4-15 an einem Tag (07.06.)

### Zu langsam

- HSTS preload (#151) — 1 Tag offen, trivial
- R2 Restore-Test — seit 06.06. geplant, nicht erledigt
- Stripe Live — vorbereitet aber nicht geschaltet

---

## 9.3 Wo bin ich unsicher?

| Bereich | Unsicherheit |
|---------|--------------|
| File-Stores auf Railway | Ob Volume existiert — Datenverlust-Risiko |
| Verwalter Suite Produkt-Market-Fit | Keine Nutzer-Feedback-Daten |
| PR #154 Regression-Umfang | 14k LoC unreviewed |
| GDPR Delete + File-Stores | Ob Löschung File-Stores abdeckt |
| Test-Zahlen vs Production | E2E gegen Prod, nicht Staging |
| KI-Kosten Verwalter | Kein Cap, unbegrenzte Nutzung möglich |
| Marketing Claims | Keine Single Source of Truth verifiziert |

---

## 9.4 Empfehlung für Alisad

### P0 — Akut

1. **Railway Volume** für `data/verwalter-*` oder Migration zu MySQL
2. **Verwalter-PRs konsolidieren** (#172-#177 → 1 PR, review, merge)
3. **Fair-Use auf Verwalter-KI** anwenden
4. **R2 Restore-Test** durchführen (Checkliste #4)
5. **PR #141+#148** live verifizieren (Inspect-Pentest)

### P1 — Kann kurz warten

- PR #151 HSTS preload merge
- PR #145 Stripe Preflight vor Live
- PR #146 DSGVO Audit Log
- DMARC pct=100
- Owner-Code Rotation

### P2-P3 — Kann warten

- PR #154 splitten und inkrementell
- Subdomain `verwalter.*` (Roadmap >50 Nutzer)
- Staging-Environment
- DocuSign Integration

### Zurückbauen (Tech-Debt)

- Doppelter Keep-alive Ping (8 + 14 min) — einer reicht
- `unsafe-inline` CSP langfristig entfernen
- Module 6-8 tote Referenzen (teilweise #142)

### Nicht jetzt anfangen

- B2B Multi-Mandant Verwalter
- Eigenes Railway-Projekt Verwalter
- Stripe Live ohne Restore-Test + Preflight
- Weitere Feature-PRs vor Merge-Stau-Aufräumen

---

## 9.5 Prozess-Feedback

### Claude (Architekt) + Cursor (Code) + Alisad (Owner)

| Aspekt | Bewertung |
|--------|-----------|
| **Funktioniert** | Klare PR-Nummern, Audit-Anforderungen, AGENTS.md Verbotsliste |
| **Funktioniert** | GitHub PR-Flow mit gh CLI |
| **Nervt** | Audit-Briefing vs. Implementierungs-Sprints parallel — Kontext-Split |
| **Nervt** | „13 offene PRs" in Briefing vs. 18 real — Kommunikationslücke |
| **Nervt** | Kaskadierende Draft-PRs ohne Merge-Disziplin |
| **Strukturell ändern** | 1 Feature = 1 Branch = 1 PR = Review = Merge vor nächstem Feature |
| **Strukturell ändern** | Staging-Environment für E2E |
| **Strukturell ändern** | Wöchentlicher PR-Gardening-Tag |

---

*Weiter: [10_STRATEGIE.md](./AUDIT_2026-06-10_10_STRATEGIE.md)*
