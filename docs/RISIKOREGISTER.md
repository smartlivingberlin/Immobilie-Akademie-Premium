# Risikoregister — Immobilien Akademie Premium

**Stand:** 14. Juni 2026
**Aktualisiert:** 14. Juni 2026 nach #218/#219/#220
**Scope:** Gesamtsystem: Infrastruktur, Code, Compliance, Betrieb, Zahlungs-/E-Mail-/KI-Risiken
**Dokumenttyp:** Operatives Risikoregister für interne Steuerung und Agentenarbeit
**Hinweis:** Dieses Dokument ist keine Rechtsberatung, keine Steuerberatung und kein formales ISMS. Es dient der Priorisierung, Nachverfolgung und vorsichtigen Risikosteuerung.

---

## 1. Legende

### Schweregrad

| Level | Bedeutung |
|---|---|
| **P0 / Kritisch** | Produktions-, Zahlungs-, Datenschutz-, Compliance- oder Datenverlust-Risiko mit hoher Priorität. |
| **P1 / Hoch** | Sicherheits-, Betriebs- oder Vertrauensrisiko; zeitnah prüfen und kontrolliert lösen. |
| **P2 / Mittel** | Beherrschbares Risiko; vor Skalierung, Marketing-Ausbau oder höherem Traffic lösen. |
| **P3 / Niedrig** | Backlog-/Monitoring-Thema; dokumentieren und regelmäßig neu bewerten. |

### Verantwortlichkeit

| Rolle | Bedeutung |
|---|---|
| **Entwicklung / Agenten-PR** | Code, Tests, Skripte, CI, Dokumentation, kleine kontrollierte PRs. |
| **Betrieb / Human** | Railway, Domains, DNS, Stripe, Provider-Dashboards, Secrets, Freigaben. |
| **Compliance / Review** | Rechtliche Aussagen, IHK-/AZAV-/Förder-/Preis-/SEO-/Trust-Claims, Datenschutztexte. |

---

## 2. Aktuelle Baseline

| Bereich | Aktueller Stand | Bewertung |
|---|---|---|
| **Repository main** | `04b8e8da31580c03e8bda0949925851902392d8d` nach PR #220 | stabiler Ausgangspunkt |
| **Safety-Tags** | #218, #219 und #220 safety-getaggt | erledigt |
| **AGENTS.md** | Workflow-Regeln nach PR #213 aktualisiert | erledigt |
| **DNS/E-Mail Check** | `pnpm run ops:dns-email-check` nach PR #214 verfügbar | erledigt als Read-only Tool |
| **Backup-Actions-Evidence** | #218 dokumentiert erfolgreichen GitHub-Actions-R2-Backup-Lauf mit `DRY_RUN=0` | Backup-Erzeugung belegt |
| **Provider-Metadaten** | #219 dokumentiert R2-`latest`-Objekte und Railway MySQL ohne sichtbaren Provider-Backup-Schedule | R2-Zielobjekte belegt, Provider-Fallback offen |
| **Backup-/Restore-Doku** | #220 synchronisiert Backup-/Restore-Doku mit S218A/S218B | erledigt |
| **Railway / Live** | Letzter Check nach #220: Deployment `ff2c3ff3-66d5-437f-bc8b-de4276972b22` erfolgreich, Health HTTP 200 | aktuell OK |
| **Datenbank** | Letzter `/api/health`: DB connected, pending migrations 0, total 48, lastApplied `add-indexes.sql` | aktuell OK |
| **HSTS** | Live via Response-Header verifiziert: `max-age=31536000; includeSubDomains; preload` | erledigt |
| **CAA** | Letzter DNS-Check: keine CAA Records gefunden | Review erforderlich, nicht blind ändern |
| **Offene Alt-PRs** | Mehrere alte/draft/nicht-mergeable PRs vorhanden | Cleanup/Splitting erforderlich |
| **Auto-Deploy** | Railway Auto-Deploy auf `main` aktiv und bei #218/#219/#220 praktisch bestätigt | jede Merge-Entscheidung ist deploy-relevant |

---

## 3. Risikotabelle

| Kategorie | Risiko | Schwere | Status / empfohlene Maßnahme |
|---|---|:---:|---|
| **Backup / Restore** | Backup-Erzeugung ist belegt, aber Wiederherstellbarkeit ist nicht verifiziert. | **P0** | Datenverlust-Risiko ist reduziert, nicht eliminiert. Restore-Proof bleibt ausstehend; S218C ist gesperrt und nur als isolierter Planungs-/Runbook-Track erlaubt. |
| **Backup / R2-Betrieb** | R2 Retention, Versionierung, Replication und Notifications/Alerting sind nicht aktiv/bestätigt. | **P1** | Separat planen und prüfen; keine Secrets, Dumps oder Provider-Mutationen in PRs. |
| **Backup / Railway Provider** | Railway MySQL zeigte `No backup schedule` und `No Backups`; kein Provider-Backup-Fallback belegt. | **P2** | Bewusst entscheiden: Railway Provider-Backups aktivieren oder GitHub-Actions-R2 als primären Weg dokumentieren. |
| **Zahlungen / Stripe** | Stripe-Live-Readiness vor echten Zahlungen nicht vollständig durch Produktiv-Preflight belegt. | **P0** | Vor Echtzahlungen: Price-IDs, Webhooks, Success/Cancel, Testkauf-/Live-Grenzen prüfen. |
| **Recht / Claims** | Ungeprüfte IHK-, AZAV-, Förder-, SEO-, Preis- oder Trust-Claims können Abmahn-/Vertrauensrisiko erzeugen. | **P0** | Jede öffentliche Aussage nach `CLAIMS_POLICY.md` prüfen; §34c/§34i sauber trennen. |
| **Staging / Deployment** | Kein dediziertes Staging; Merge auf `main` kann Auto-Deploy auslösen. | **P1** | Kleine PRs, CI-Gates, bewusste Merge-Freigabe, Post-Merge-Live-Check. |
| **CI / E2E-Gates** | E2E-Smoke- und Stripe-Guard-Jobs sind vorhanden und zuletzt grün, aber harte Gate-Struktur bleibt prüfpflichtig. | **P1** | `continue-on-error`/Gate-Status separat prüfen und schrittweise härten; keine CI-Härtung zusammen mit Produktcode. |
| **Test-/DB-Signal** | S220A sah einen geloggten `video_tutorials`-DB-Fehler in einem grün gebliebenen Inspect-Test. | **P2** | Separat analysieren: Test erwartet Fehler oder echte Daten-/Schema-/Fixture-Lücke? Nicht im Doku-Track lösen. |
| **Security Headers / CSP** | CSP-/Header-Härtung möglicherweise noch nicht final, z. B. `unsafe-inline`-Abhängigkeiten. | **P1** | Header-Audit read-only durchführen; Härtung nur in separatem Mini-PR. |
| **Owner/Admin-Schutz** | Owner-, Admin- und Magic-Code-Flows müssen gegen Session-/Rollen-/Bypass-Risiken geprüft bleiben. | **P1** | Auth-/Role-E2E und manuelle Rollenprüfung als separater Track. |
| **DSGVO / Account-Löschung** | Account-Deletion, Audit-Trail und Nachweisdokumentation sind nicht final als Live-Prozess belegt. | **P1** | Löschfluss, Audit-Log, Datenschutzhinweise und Nachweisführung getrennt prüfen. |
| **E-Mail-Verifikation** | E-Mail-Verifikation und Zustellbarkeit können durch DNS-/Provider-Drift beeinträchtigt werden. | **P1** | `pnpm run ops:dns-email-check` regelmäßig nutzen und Provider-Dashboard gegenprüfen. |
| **DNS / CAA** | Keine CAA Records gefunden; dies ist optional, aber für Zertifikatskontrolle prüfenswert. | **P2** | Review: prüfen, ob CAA sinnvoll ist; erst nach Provider-/Domain-Prüfung setzen. |
| **KI-Kosten** | AI-API-Kosten können ohne Budget-/Rate-Limits unerwartet steigen. | **P2** | Provider-Budgets, Limits, Logging und Failover-Strategie prüfen. |
| **Performance Mobile** | Mobile LCP, Bild-/JS-Last und ungenutztes JavaScript können Conversion und UX schwächen. | **P2** | Lighthouse/PageSpeed neu messen; Optimierung als separater Performance-Track. |
| **Testabdeckung vs. Produktion** | Tests sind grün, decken aber nicht automatisch alle realen Rollen-, Zahlungs- und KI-Flows ab. | **P2** | Smoke-, Auth-, Stripe- und Rollen-Tests getrennt erweitern. |
| **Alt-PRs / Monster-PRs** | Alte große PRs enthalten gemischte Änderungen und können aktuelle stabile Baseline beschädigen. | **P2** | Nicht blind rebasen/mergen; splitten oder schließen. |
| **Bus-Faktor** | Projektwissen, Betrieb und Entscheidungen hängen stark an einer Person. | **P3** | AGENTS.md, Runbooks, Risiko-/Workflow-Doku fortlaufend pflegen. |

---

## 4. Priorisierte nächste Schritte

| Priorität | Maßnahme | Ziel | Scope-Hinweis |
|---|---|---|---|
| **P0** | Restore-Proof planen, nicht ausführen | Belegen, wie ein späterer isolierter Restore sicher geprüft würde. | S218C bleibt gesperrt: kein Download, keine Entschlüsselung, kein Restore, keine DB-Verbindung. |
| **P0** | Stripe-Live-Preflight vor Echtzahlungen | Zahlungsrisiko senken. | Keine Live-Mutation ohne ausdrückliche Freigabe. |
| **P0** | Legal-/Claims-Review | Abmahn- und Vertrauensrisiko reduzieren. | Nur source-backed Änderungen; keine Marketing-Behauptungen ohne Beleg. |
| **P1** | E2E-/CI-Gate-Review | Prüfen, welche stabilen Jobs als harte Gates geeignet sind. | Erst read-only; Härtung separat und klein. |
| **P1** | E-Mail-DNS-Review | Zustellbarkeit und Domain-Vertrauen prüfen. | `pnpm run ops:dns-email-check` + Provider-Dashboard. |
| **P1** | CAA-Review | Zertifikatsausstellung kontrollierter machen, falls sinnvoll. | Erst prüfen, dann entscheiden; nicht blind setzen. |
| **P1** | Stale-PR-Cleanup | Alte PRs schließen, splitten oder neu aufsetzen. | Keine Monster-PRs übernehmen. |
| **P2** | `video_tutorials`-DB-Log prüfen | Klären, ob der grüne Inspect-Test ein echtes Daten-/Fixture-Signal verdeckt. | Read-only Analyse vor Patch. |
| **P2** | Security-Header-Audit | CSP/Permissions-Policy/Härtung kontrolliert verbessern. | Read-only Audit vor Patch. |
| **P2** | Mobile Performance Audit | LCP/JS/Bilder verbessern. | Messung vor Optimierung. |
| **Produkt** | Sichtbarer Produkt-/UX-Schritt | Nach diesem Risikoregister-Refresh wieder Nutzerwert schaffen. | Nächster Track soll kein weiterer reiner Doku-PR sein, z. B. #200 KI-Tutor Mikrofon/TTS oder ein anderer sichtbarer Bugfix. |

---

## 5. Change History

| Datum | Änderung |
|---|---|
| 14.06.2026 | Frischer Rewrite nach #213 und #214. Ersetzt den alten #150-Ansatz. HSTS als live verifiziert dokumentiert. DNS/E-Mail-Check als Read-only Tool berücksichtigt. CAA als Review-Thema statt direkter Änderungsanweisung formuliert. |
| 14.06.2026 | Baseline nach #218/#219/#220 aktualisiert: Backup-Actions-Evidence, Provider-Metadaten und Backup-/Restore-Doku-Konsistenz berücksichtigt. Klarstellung: Backup-Erzeugung ist belegt; Wiederherstellbarkeit bleibt ohne isolierten Restore-Proof unbewiesen. |
