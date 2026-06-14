# Restore-Proof-Runbook — Immobilien Akademie Premium

**Stand:** 14. Juni 2026  
**Scope:** MySQL/R2/Produktionsbetrieb — Plan zur Wiederherstellungsprüfung  
**Status:** Dokumentation / Vorbereitung  
**Wichtig:** Dieses Runbook führt keinen Restore aus. Es enthält keine Produktionsdaten, keine Secrets und keine DB-Mutation.

---

## 1. Zweck

Dieses Dokument beschreibt, wie ein Restore-Proof sicher geplant und dokumentiert werden soll.

Ziel ist nicht nur zu wissen, dass Backups existieren, sondern nachweisbar zu prüfen:

- Kann ein Backup wiederhergestellt werden?
- Ist der Wiederherstellungsweg dokumentiert?
- Gibt es klare Rollen, Stop-Regeln und Nachweise?
- Wird Produktion nicht gefährdet?

---

## 2. Strikte Sicherheitsregeln

| Regel | Bedeutung |
|---|---|
| Keine Produktion überschreiben | Niemals Restore direkt auf die Live-Datenbank ausführen. |
| Keine Secrets ins Repo | Keine DB-URLs, Tokens, Keys, Dumps oder Zugangsdaten committen. |
| Keine echten Kundendaten in PRs | Keine personenbezogenen Daten in Logs, Screenshots oder Markdown. |
| Kein `db:push` | Keine Schema-/DB-Mutation im Rahmen dieses Runbooks. |
| Kein Railway-Deploy | Dieses Runbook ist Dokumentation, kein Deploy-Track. |
| Human Approval | Jeder echte Restore-Test braucht separate ausdrückliche Freigabe. |

---

## 3. Restore-Proof-Stufen

| Stufe | Ziel | Risiko |
|---|---|---|
| **R0 — Inventar** | Welche Backups existieren, wo, wie oft, wie lange? | Niedrig |
| **R1 — Read-only Nachweis** | Backup-Metadaten prüfen, ohne Daten wiederherzustellen. | Niedrig |
| **R2 — Isolierter Restore-Test** | Restore in separater, leerer Testumgebung. | Mittel |
| **R3 — Funktionaler Smoke-Test** | App gegen isolierte Testdaten starten und prüfen. | Mittel |
| **R4 — Dokumentierter Recovery-Prozess** | Ergebnis, Dauer, Fehler, Lessons Learned dokumentieren. | Niedrig |

---

## 4. Vorbedingungen vor echtem Restore-Test

Vor einem echten Restore-Test müssen geklärt sein:

| Punkt | Status |
|---|---|
| Backup-Quelle bekannt | Prüfen |
| Backup-Zeitpunkt bekannt | Prüfen |
| Zielumgebung isoliert | Prüfen |
| Keine Verbindung zur Live-Produktion | Pflicht |
| Keine echten Secrets im Repo | Pflicht |
| Verantwortliche Person benannt | Pflicht |
| Rollback-/Abbruchregel definiert | Pflicht |
| Testdaten/Datenschutz geprüft | Pflicht |

---

## 5. MySQL Restore-Proof — Plan

### R0/R1: Read-only Inventar

Zu dokumentieren:

- Backup-Quelle
- Backup-Frequenz
- Retention / Aufbewahrung
- letzter erfolgreicher Backup-Zeitpunkt
- Speicherort / Provider
- Zugriffspfad nur im sicheren Provider-Dashboard
- verantwortliche Person

Keine Dumps herunterladen, keine Daten öffnen, keine Secrets kopieren.

### R2: Isolierter Restore-Test

Nur nach separater Freigabe:

1. Neue isolierte Testdatenbank erstellen.
2. Backup dort einspielen.
3. Keine Verbindung zu Produktionsservice herstellen.
4. Keine Produktions-URL verwenden.
5. Zugriff nur minimal und zeitlich begrenzt.
6. Ergebnis dokumentieren.

### R3: Smoke-Test gegen isolierte Umgebung

Mögliche Prüfungen:

- Tabellen vorhanden
- Migrationstand nachvollziehbar
- App startet gegen isolierte DB
- `/api/health` zeigt Test-DB connected
- keine Schreibtests auf Produktion

---

## 6. R2 / Objekt-Storage Restore-Proof — Plan

Zu dokumentieren:

- Bucket / Speicherort
- Backup-Objekte
- Versionierung / Lifecycle
- letzter erfolgreicher Upload
- Zugriffskontrolle
- Restore-Pfad in isolierten Testbereich

Keine produktiven Dateien überschreiben.

---

## 7. Nachweisdokumentation

Für jeden Restore-Proof soll ein separates internes Ergebnisprotokoll erstellt werden:

| Feld | Inhalt |
|---|---|
| Datum | Zeitpunkt des Tests |
| Verantwortlich | Name/Rolle |
| Backup-Zeitpunkt | Quelle und Zeit |
| Zielumgebung | isolierte Testumgebung |
| Ergebnis | erfolgreich / teilweise / fehlgeschlagen |
| Dauer | Recovery Time |
| Datenintegrität | grobe Prüfung |
| Probleme | Findings |
| nächste Maßnahmen | P0/P1/P2 |

Keine Secrets und keine personenbezogenen Daten im Protokoll.

---

## 8. Stop-Regeln

Der Restore-Test muss gestoppt werden, wenn:

- unklar ist, ob die Zielumgebung isoliert ist
- Live-DB-Verbindung nicht ausgeschlossen ist
- Secrets in Logs/Dateien erscheinen
- personenbezogene Daten in PRs oder Chat-Ausgaben geraten könnten
- ein Tool produktive Mutationen ausführen will
- Railway/DB/Stripe ohne ausdrückliche Freigabe geändert werden soll

---

## 9. Empfohlene nächste Schritte

| Priorität | Aufgabe |
|---|---|
| P0 | Backup-Inventar read-only erstellen |
| P0 | Isolierte Restore-Zielumgebung planen |
| P0 | Verantwortliche Person und Stop-Regeln bestätigen |
| P1 | Restore-Testprotokoll-Vorlage erstellen |
| P1 | R2/Object-Storage-Backup-Pfad prüfen |
| P2 | Regelmäßigen Restore-Proof-Turnus definieren |

---

## 10. Change History

| Datum | Änderung |
|---|---|
| 14.06.2026 | Erstes Restore-Proof-Runbook als Doku-Track nach Risikoregister #215 erstellt. |
