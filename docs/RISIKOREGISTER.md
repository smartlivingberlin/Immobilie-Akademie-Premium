# Risikoregister — Immobilien Akademie Premium

**Stand:** 14. Juni 2026
**Scope:** Gesamtsystem (Infrastruktur, Code, Compliance, Betrieb)
**Hinweis:** Dies ist ein operatives Dokument zur Risikosteuerung und keine juristische oder formale ISMS-Beratung.

---

## 1. Legende

### Severity (Schweregrad)
| Level | Bedeutung |
|-------|-----------|
| **Kritisch (P0)** | Produktions-Blocker, Compliance-Verstoß oder akuter Datenverlust droht. |
| **Hoch (P1)** | Signifikante Beeinträchtigung der Sicherheit oder des Betriebs; zeitnah adressieren. |
| **Mittel (P2)** | Beherrschbares Risiko; vor Skalierung oder Marketing-Launch lösen. |
| **Niedrig (P3)** | Backlog-Thema; Monitoring ausreichend. |

### Verantwortlichkeit
- **Entwicklung (Agent/PR):** Korrekturen im Code oder CI/CD-Prozess.
- **Betrieb (Alisad/Human):** Externe Konfiguration (Railway, Stripe, DNS, Provider).

---

## 2. Aktueller System-Status (Baseline)

| Bereich | Status | Bemerkung |
|---------|--------|-----------|
| **Live Health** | ✅ OK | System antwortet unter `/api/health`. |
| **Datenbank** | ✅ Verbunden | MySQL-Konnektivität stabil. |
| **Migrationen** | ✅ 0 pending | Drizzle-Schema ist aktuell. |
| **Sicherheit (HSTS)** | ✅ Verifiziert | HSTS live via Response-Header bestätigt. |
| **Infrastruktur-Check** | ✅ Vorhanden | DNS/Email-Check via `pnpm run ops:dns-email-check` verfügbar. |
| **CAA Records** | 🔍 Prüfen | Letzter Check ergab keine CAA-Einträge; Review erforderlich. |

---

## 3. Identifizierte Risiken

| Kategorie | Risiko | Schwere | Status / Maßnahme |
|-----------|--------|:-------:|-------------------|
| **Backup** | Fehlender Beweis für erfolgreichen Restore (R2/MySQL). | **Kritisch** | Prüfen: Restore-Test-Protokoll erstellen. |
| **Zahlungen** | Stripe Live-Readiness nicht vollständig end-to-end verifiziert. | **Kritisch** | Prüfen: Preflight-Check vor Echtzahlungen. |
| **Compliance** | Unverifizierte Marketing-/IHK-Claims (siehe `CLAIMS_POLICY.md`). | **Kritisch** | Review erforderlich: Quellenprüfung aller Claims. |
| **Infrastruktur** | Kein dediziertes Staging-Environment (direkt Main → Prod). | **Hoch** | Maßnahme: Strenge PR-Validierung via CI. |
| **Sicherheit** | CSP erlaubt `unsafe-inline` für Scripts/Styles. | **Hoch** | Prüfen: Schrittweise Härtung der Policy. |
| **Sicherheit** | Schutz der Owner- und Admin-Routen (Owner Magic Code). | **Hoch** | Review erforderlich: Session-Isolation validieren. |
| **Betrieb** | "Bus-Faktor" (Solo-Founder / Einzel-Entwickler). | **Mittel** | Maßnahme: Dokumentation (AGENTS.md, Workflow). |
| **Finanzen** | Fehlende Hard-Caps / Monitoring für AI-API Kosten. | **Mittel** | Maßnahme: Budgets in Provider-Dashboards setzen. |
| **DSGVO** | Audit-Trail für Account-Löschungen nicht final verifiziert. | **Mittel** | Prüfen: Lösch-Flow im Test-System validieren. |
| **E-Mail** | Deliverability / SPF / DKIM / DMARC Drift. | **Mittel** | Maßnahme: Regelmäßiger `ops:dns-email-check`. |
| **Performance** | Mobile Performance (LCP) und ungenutztes JavaScript. | **Mittel** | Maßnahme: Bundle-Analyse und Optimierung. |
| **Infrastruktur** | CAA Records fehlen (Certificate Pinning). | **Niedrig** | Prüfen: CAA-Einträge beim Domain-Provider setzen. |
| **Prozess** | "Monster-PRs" und veraltete offene PR-Branches. | **Niedrig** | Maßnahme: Stale PR Cleanup und Atomic Commits. |

---

## 4. Priorisierte Nächste Schritte

| Priorität | Maßnahme | Ziel |
|:---:|-----------|------|
| **P0** | **Restore Proof** | Dokumentierter Nachweis, dass MySQL aus R2-Backup wiederherstellbar ist. |
| **P0** | **Stripe Preflight** | Finaler Test der Live-API Konfiguration vor Freischaltung der Zahlungen. |
| **P0** | **Legal/Claims Review** | Abgleich aller Landingpage-Texte mit der `CLAIMS_POLICY.md`. |
| **P1** | **Email Review** | Prüfung der Deliverability im Provider-Dashboard (Resend/SES). |
| **P1** | **CAA Review** | Setzen von CAA-Records zur Absicherung der SSL-Zertifikatsausstellung. |
| **P1** | **PR Cleanup** | Schließen oder Aufteilen veralteter Groß-PRs (z.B. Reste von #150/152). |
| **P2** | **Mobile Fixes** | Optimierung der LCP-Werte für mobile Endgeräte. |

---

## 5. Änderungshistorie

- **14.06.2026:** Vollständiger Rewrite basierend auf der aktuellen Baseline (#213/#214). Ersetzt den veralteten Ansatz aus PR #150. HSTS-Status auf "Live verifiziert" aktualisiert. DNS-Ops Tooling integriert.
