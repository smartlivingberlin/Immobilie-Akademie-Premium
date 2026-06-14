# Backup-Inventar — Immobilien Akademie Premium

**Stand:** 14. Juni 2026
**Scope:** MySQL, R2/Object Storage, Railway-Produktionsbetrieb
**Status:** Read-only Inventar / Vorbereitung
**Wichtig:** Dieses Dokument enthält keine Secrets, keine Dumps, keine Produktionsdaten und führt keinen Restore aus.

---

## 1. Zweck

Dieses Dokument ist der erste sichere Schritt vom Restore-Proof-Runbook zum tatsächlichen Betriebsnachweis.

Ziel:

- erfassen, welche Backups existieren
- erfassen, wo Backup-Metadaten geprüft werden müssen
- offene Punkte sichtbar machen
- Restore-Proof vorbereiten, ohne Produktion oder Daten anzufassen

---

## 2. Sicherheitsregeln

| Regel | Bedeutung |
|---|---|
| Keine Secrets | Keine DB-URLs, API-Keys, Tokens, Passwörter oder Zugangsdaten dokumentieren. |
| Keine Dumps | Keine Backup-Dateien, SQL-Dumps oder Objektkopien ins Repo. |
| Keine Produktionsdaten | Keine personenbezogenen Daten, Kundendaten oder Screenshots mit sensiblen Daten. |
| Keine Mutation | Kein Restore, kein `db:push`, keine DB-Änderung, keine Railway-Mutation. |
| Nur Metadaten | Nur sichere Betriebsinformationen und offene Prüfpunkte erfassen. |

---

## 3. MySQL Backup-Inventar

| Prüffeld | Status | Notiz |
|---|---|---|
| Backup-Quelle bekannt | Prüfen | Railway/MySQL-Provider-Dashboard prüfen. |
| Backup-Frequenz bekannt | Prüfen | Nicht raten, nur aus Provider-Dashboard übernehmen. |
| Retention / Aufbewahrung bekannt | Prüfen | Zeitraum dokumentieren. |
| Letzter erfolgreicher Backup-Zeitpunkt bekannt | Prüfen | Nur Metadaten, keine Daten öffnen. |
| Restore-Zielumgebung definiert | Offen | Muss isoliert sein, niemals Live-DB überschreiben. |
| Verantwortliche Person benannt | Offen | Human-Freigabe erforderlich. |
| Zugriffspfad dokumentiert | Prüfen | Ohne Secrets im Repo. |

---

## 4. R2 / Object Storage Backup-Inventar

| Prüffeld | Status | Notiz |
|---|---|---|
| Bucket / Speicherort bekannt | Prüfen | Nur Name/Struktur ohne Secrets dokumentieren. |
| Backup-Objekte vorhanden | Prüfen | Keine Dateien ins Repo kopieren. |
| Versionierung bekannt | Prüfen | Provider-Dashboard prüfen. |
| Lifecycle / Retention bekannt | Prüfen | Aufbewahrung dokumentieren. |
| Restore-Zielbereich definiert | Offen | Isolierter Testbereich erforderlich. |
| Alerting bei Backup-Fehlern vorhanden | Prüfen | Separater Monitoring-Track. |

---

## 5. Aktueller sicherer Nachweisstand

| Bereich | Stand |
|---|---|
| Live Health | Letzte Checks nach #216: HTTP 200 auf geprüften Domains. |
| DB-Verbindung | Letzte `/api/health` Checks: DB connected. |
| Pending migrations | Letzte Checks: 0 pending migrations. |
| Restore-Proof-Runbook | Vorhanden: `docs/RESTORE_PROOF_RUNBOOK.md`. |
| Echter Restore-Test | Noch nicht durchgeführt. |
| Produktionsdaten berührt | Nein. |

---

## 6. Offene Fragen vor echtem Restore-Proof

| Frage | Priorität |
|---|---|
| Wo genau werden MySQL-Backups verwaltet? | P0 |
| Wie oft laufen MySQL-Backups? | P0 |
| Wie lange werden MySQL-Backups aufbewahrt? | P0 |
| Gibt es einen getesteten Restore-Pfad? | P0 |
| Welche isolierte Zielumgebung wird genutzt? | P0 |
| Welche R2/Object-Storage-Daten sind backup-relevant? | P1 |
| Gibt es Alerting bei Backup-Fehlern? | P1 |
| Wer gibt einen echten Restore-Test frei? | P1 |

---

## 7. Nächste sichere Schritte

| Priorität | Schritt | Mutation? |
|---|---|---|
| P0 | Backup-Metadaten im Provider-Dashboard read-only prüfen | Nein |
| P0 | Isolierte Restore-Zielumgebung planen | Nein |
| P0 | Verantwortliche Person und Stop-Regeln bestätigen | Nein |
| P1 | Restore-Testprotokoll-Vorlage erstellen | Nein |
| P1 | Separaten echten Restore-Test erst nach ausdrücklicher Freigabe planen | Noch nicht |

---

## 8. Stop-Regeln

Sofort stoppen, wenn:

- ein Tool echte Produktionsdaten anzeigen oder exportieren will
- Secrets in Logs, Chat, Dateien oder PRs erscheinen könnten
- ein Restore gegen die Live-Datenbank vorgeschlagen wird
- `db:push`, Migrationen oder Railway-Mutationen ausgeführt werden sollen
- unklar ist, ob eine Zielumgebung wirklich isoliert ist

---

## 9. Change History

| Datum | Änderung |
|---|---|
| 14.06.2026 | Erstes Backup-Inventar als read-only Doku-Track nach Restore-Proof-Runbook #216 erstellt. |

---

## 10. S218A — GitHub Actions Backup-Lauf-Metadaten

**Status:** Teilweise bestätigt — GitHub-Actions-seitiger Backup-Lauf erfolgreich.
**Quelle:** GitHub Actions Workflow `MySQL Backup to Cloudflare R2`, Run `27491293716`.
**Art der Prüfung:** Read-only Log-/Metadatenprüfung.
**Wichtig:** Es wurden keine Dumps geöffnet, keine Backups heruntergeladen, keine Secrets ausgegeben und kein Restore durchgeführt.

### Bestätigte Metadaten

| Prüffeld | Status | Nachweis |
|---|---|---|
| Workflow vorhanden | Bestätigt | `.github/workflows/mysql-backup-r2.yml` |
| Schedule vorhanden | Bestätigt | Cron `17 2 * * *` |
| Letzter geprüfter geplanter Lauf | Bestätigt | Run `27491293716`, `schedule`, `success` |
| Dry Run | Bestätigt | `DRY_RUN=0` |
| GitHub Secrets verfügbar | Teilweise bestätigt | Secrets waren im Lauf vorhanden und maskiert; Werte wurden nicht ausgegeben |
| MySQL Dump erstellt | Bestätigt | Log zeigt Erstellung von `immobilien-akademie-smart_mysql_20260614_065909.sql.gz` |
| Dump komprimiert geprüft | Bestätigt | Workflow führte `gzip -t` aus und brach nicht ab |
| Backup verschlüsselt | Bestätigt | GPG AES256 erzeugte `.sql.gz.gpg`; Plain `.sql.gz` wurde entfernt |
| Upload nach R2 daily | Bestätigt laut GitHub Actions Log | Upload nach `mysql/production/daily/...` erfolgreich |
| Upload nach R2 latest | Bestätigt laut GitHub Actions Log | Upload nach `mysql/production/latest/immobilien-akademie-smart_mysql_latest.sql.gz.gpg` erfolgreich |
| Key-count Metadata | Bestätigt | `key_counts_latest.txt` und GitHub Artifact `mysql-backup-metadata-20260614_065909` |
| Artifact Retention | Bestätigt | GitHub Artifact läuft laut Metadaten am `2026-06-28T07:00:30Z` ab |

### Weiterhin nicht bestätigt

| Prüffeld | Status | Notiz |
|---|---|---|
| Cloudflare R2 Bucket-Konfiguration | Offen | Dashboard-/R2-Metadatenprüfung nötig |
| R2 Lifecycle / Retention | Offen | Nicht aus GitHub Actions ableitbar |
| R2 Versionierung | Offen | Dashboard nötig |
| R2 Replication | Offen | Dashboard nötig |
| R2 Alerting | Offen | Provider-/Monitoring-Prüfung nötig |
| Entschlüsselbarkeit des Backups | Offen | Separater isolierter Test nötig, kein Produktionsdump im Repo |
| Restore-Fähigkeit | Offen | Separater Restore-Proof in isolierter Umgebung nötig |
| Railway Provider-Backups | Offen | Railway Dashboard nötig |

### Einordnung

Der erfolgreiche GitHub-Actions-Lauf beweist, dass die konfigurierte Backup-Pipeline am geprüften Datum einen Dump erstellt, verschlüsselt und laut Log nach R2 hochgeladen hat. Das ist ein echter Betriebsnachweis für den Backup-Lauf, aber noch kein Restore-Proof. Ein Backup gilt erst als vollständig belastbar, wenn zusätzlich Entschlüsselung und isolierter Restore erfolgreich getestet und dokumentiert wurden.

---

## 11. S218B — Provider-Metadaten Cloudflare R2 / Railway MySQL

**Status:** Teilweise bestätigt — R2-Objekte sichtbar, Railway-Provider-Backups nicht sichtbar.
**Art der Prüfung:** Read-only Dashboard-Metadatenprüfung.
**Wichtig:** Es wurden keine Dumps geöffnet, keine Backups heruntergeladen, keine Secrets kopiert, keine Entschlüsselung durchgeführt und kein Restore ausgelöst.

### Cloudflare R2

| Prüffeld | Status | Nachweis |
|---|---|---|
| Bucket sichtbar | Bestätigt | Bucket `immobilien-akademie-backups` sichtbar |
| Bucket erstellt | Bestätigt | `Jun 8, 2026` |
| Bucket Location | Bestätigt | `Eastern Europe (EEUR)` |
| Public Access | Bestätigt deaktiviert | `Disabled` |
| Default Storage Class | Bestätigt | `Standard` |
| Objektanzahl | Bestätigt | `18` |
| Bucket Size | Bestätigt | `654.95 kB` |
| latest Prefix | Bestätigt | `mysql/production/latest/` sichtbar |
| latest Backup-Datei | Bestätigt | `immobilien-akademie-smart_mysql_latest.sql.gz.gpg` sichtbar |
| latest Backup LastModified | Bestätigt | `14 Jun 2026 09:00:28 MESZ` |
| latest Backup Größe | Bestätigt | `77.13 kB` |
| key_counts_latest | Bestätigt | `key_counts_latest.txt` sichtbar |
| key_counts LastModified | Bestätigt | `14 Jun 2026 09:00:30 MESZ` |
| key_counts Größe | Bestätigt | `120 B` |
| Custom Domain | Bestätigt deaktiviert | Keine Custom Domain |
| Public Development URL | Bestätigt deaktiviert | Disabled |
| R2 Data Catalog | Bestätigt deaktiviert | Disabled |
| CORS Policy | Bestätigt nicht gesetzt | Keine CORS Policy |
| Object Lifecycle Rules | Teilweise aktiv | Nur `Default Multipart Abort Rule`, Abort uploads after 7 days |
| Backup-Retention/Lifecycle | Offen | Keine spezifische Backup-Retention bestätigt |
| Bucket Lock Rules | Nicht aktiv | Keine Bucket Lock Rules |
| Event Notifications | Nicht aktiv | Workers Paid Plan erforderlich |
| On Demand Migration | Nicht aktiv | Disabled |
| Local Uploads | Nicht aktiv | Disabled |
| Versionierung | Nicht geprüft / nicht gefunden | Im Dashboard nicht als aktiv bestätigt |
| Replication | Nicht geprüft / nicht gefunden | Im Dashboard nicht als aktiv bestätigt |

### Railway MySQL

| Prüffeld | Status | Nachweis |
|---|---|---|
| MySQL-Service sichtbar | Bestätigt | Railway-Projekt production, MySQL-Service |
| Backups-Tab sichtbar | Bestätigt | Tab `Backups` vorhanden |
| Backup schedule | Nicht aktiv | `No backup schedule` |
| Provider-Backups | Nicht vorhanden sichtbar | `No Backups` |
| Restore/New backup Funktion | Sichtbar, nicht genutzt | Keine Aktion ausgelöst |
| Variables | Werte nicht kopiert | Werte waren maskiert |
| Tabellenliste | Sichtbar, keine Inhalte kopiert | Keine Tabellenwerte exportiert |

### Einordnung

Die Cloudflare-R2-Prüfung bestätigt, dass der erwartete Backup-Bucket existiert und dass `latest`-Backup-Objekte sichtbar sind. Dies stützt den GitHub-Actions-Nachweis aus S218A. Gleichzeitig sind Backup-Retention, Bucket Lock, Versionierung, Replication und Notifications nicht als aktiv bestätigt.

Die Railway-Prüfung zeigt im MySQL-Backups-Tab keinen aktiven Backup-Zeitplan und keine sichtbaren Provider-Backups. Damit ist aktuell kein Railway-Provider-Backup-Fallback belegt. Die belastbare Backup-Grundlage ist derzeit die eigene GitHub-Actions-R2-Pipeline; Restore und Entschlüsselung bleiben weiterhin unbewiesen.

### Weiterhin offen

- Entschlüsselungsprobe in isolierter Umgebung
- Restore-Proof in isolierter Umgebung
- R2-spezifische Backup-Retention
- R2 Versionierung oder Replication
- R2 Event Notifications / Alerting
- Railway Provider-Backup-Strategie oder bewusste Dokumentation, dass kein Railway-Provider-Backup genutzt wird
