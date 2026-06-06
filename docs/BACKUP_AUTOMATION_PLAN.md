# Backup Automation Plan

Stand: 2026-06-06

Dieses Dokument beschreibt die empfohlene Automatisierung fuer Railway-MySQL-Backups der Immobilien Akademie Smart. Es baut auf dem bewiesenen manuellen Backup- und Restore-Test aus `docs/RUNBOOK_BACKUP_RESTORE.md` auf.

## Entscheidung

Empfohlenes Ziel: **Cloudflare R2 Standard Storage**.

Gruende:

- S3-kompatibel und dadurch mit Standardtools nutzbar.
- Externer Speicher ausserhalb von Railway.
- Fuer kleine taegliche DB-Dumps kostenguenstig.
- Cloudflare R2 berechnet laut offizieller Preisuebersicht keine Egress-Bandbreitenkosten; Storage Standard liegt bei 0.015 USD pro GB-Monat, vorbehaltlich Free Tier und Operation-Kosten.

Nicht als Primaerziel empfohlen:

- GitHub Actions Artifacts: gut fuer kurzfristige Build-/Audit-Artefakte, aber nicht als langlebiger Hauptspeicher fuer personenbezogene Datenbank-Backups.
- Nur Railway-interner Speicher: besser als nichts, aber nicht ideal als alleinige Absicherung, weil Datenbank und Backup beim selben Anbieter liegen.

## Zielbild

1. Taeglicher komprimierter MySQL-Dump.
2. Upload in Cloudflare R2.
3. Keine Secrets im Repo.
4. Separater Restore-Test mindestens monatlich und vor riskanten Railway-DB-Eingriffen.
5. Manuelle Backups vor:
   - Railway MySQL Redeploy/Restart.
   - Secret-Rotation fuer `DATABASE_URL` oder MySQL-Zugang.
   - Migrationen mit Schema-/Datenrisiko.
   - groesseren Generator-/User-/Code-Flows.

## Empfohlenes Namensschema

```text
mysql/production/daily/YYYY/MM/DD/immobilien-akademie-smart_mysql_YYYYMMDD_HHMMSS.sql.gz.gpg
mysql/production/weekly/YYYY/WW/immobilien-akademie-smart_mysql_YYYYMMDD_HHMMSS.sql.gz.gpg
mysql/production/monthly/YYYY/MM/immobilien-akademie-smart_mysql_YYYYMMDD_HHMMSS.sql.gz.gpg
mysql/production/latest/immobilien-akademie-smart_mysql_latest.sql.gz.gpg
```

Optional fuer Restore-Beweise:

```text
mysql/production/restore-tests/YYYY/MM/DD/restore_test_YYYYMMDD_HHMMSS.txt
```

## Aufbewahrung

Empfohlen fuer den Start:

- 14 taegliche Backups.
- 8 woechentliche Backups.
- 12 monatliche Backups.

Pragmatischer erster Schritt:

- Taeglich sichern.
- Retention im R2-Bucket oder per spaeterem Cleanup-Job erzwingen.
- Bis Retention automatisiert ist: monatlich manuell pruefen, ob alte Dumps geloescht werden koennen.

## Verschluesselung

DB-Dumps enthalten personenbezogene Daten. Deshalb sollen sie vor dem Upload nach R2 clientseitig verschluesselt werden.

Empfehlung fuer Phase 1:

```bash
gpg --batch --yes --symmetric --cipher-algo AES256 \
  --passphrase "$BACKUP_ENCRYPTION_PASSPHRASE" \
  --output backup.sql.gz.gpg \
  backup.sql.gz
```

Regeln:

- `BACKUP_ENCRYPTION_PASSPHRASE` nur als GitHub Secret speichern.
- Passphrase nicht in Logs ausgeben.
- Entschluesselung mindestens einmal lokal testen.
- Wenn die Passphrase kompromittiert wurde, neue Passphrase setzen und neue Backups erzeugen.

## Noetige GitHub Secrets

Diese Werte duerfen nicht ins Repo:

```text
RAILWAY_TOKEN
RAILWAY_PROJECT_ID
R2_ACCOUNT_ID
R2_ACCESS_KEY_ID
R2_SECRET_ACCESS_KEY
R2_BUCKET
BACKUP_ENCRYPTION_PASSPHRASE
```

Optional:

```text
R2_PREFIX
RAILWAY_ENVIRONMENT
```

Empfehlung:

```text
RAILWAY_ENVIRONMENT=production
```

## Noetige Railway-Konfiguration

Der Backup-Workflow benoetigt Zugriff auf den Railway-Service `MySQL` und liest diese Variablen zur Laufzeit:

```text
RAILWAY_TCP_PROXY_DOMAIN
RAILWAY_TCP_PROXY_PORT
MYSQLUSER
MYSQLPASSWORD
MYSQLDATABASE
```

## Workflow-Strategie

Der initiale Workflow sollte **nicht automatisch aktiv** sein, bis alle Secrets gesetzt und ein manueller Dry Run erfolgreich war. Deshalb liegt im Repo zuerst nur ein Beispiel:

```text
.github/workflows/mysql-backup-r2.example.yml
```

Aktivierung:

1. GitHub Secrets setzen.
2. Beispielworkflow nach `.github/workflows/mysql-backup-r2.yml` kopieren.
3. Sicherstellen, dass `RAILWAY_PROJECT_ID` auf das richtige Railway-Projekt zeigt.
4. Einmal manuell mit `workflow_dispatch` starten.
5. Ergebnis in R2 pruefen.
6. Verschluesselten Dump herunterladen.
7. Lokal entschluesseln.
8. Lokal restoren.
9. Erst danach Cron aktiv lassen.

## Restore-Test-Regel

Ein automatisches Backup ist nur dann wertvoll, wenn regelmaessig bewiesen wird, dass es wiederherstellbar ist.

Minimum:

- Monatlich einen R2-Dump herunterladen.
- In lokale MySQL-8-Instanz restoren.
- Kernzaehlungen pruefen:

```text
users
trial_leads
presentation_codes
learning_logs
open_questions
glossar_terms
pending_purchases
```

Phase 2:

- Eigenen Restore-Test-Workflow erstellen.
- Monatlich per `workflow_dispatch` und spaeter Cron ausfuehren.
- Letzten verschluesselten Dump aus R2 herunterladen.
- Mit `BACKUP_ENCRYPTION_PASSPHRASE` entschluesseln.
- In temporaere MySQL-8-Instanz restoren.
- Kernzaehlungen ausgeben.
- Ergebnis als kurzfristiges GitHub Artifact speichern, nicht den Dump.

Der Restore-Test-Workflow soll erst aktiviert werden, nachdem der Backup-Workflow mindestens einmal manuell erfolgreich war und ein lokaler Restore aus R2 bestanden wurde.

## Sicherheitsregeln

- Keine DB-Dumps im Git committen.
- Keine Secrets in Chat, PRs, Screenshots oder Logs posten.
- Bei sichtbaren Secret-Fragmenten nach bewiesenem Backup rotieren.
- Railway-MySQL-Service nicht redeployen/restarten, solange kein frisches Backup plus Restore-Test existiert.

## Naechste Ausbaustufen

1. R2-Bucket anlegen.
2. Least-Privilege R2 API Token erstellen.
3. GitHub Secrets setzen.
4. Beispielworkflow aktivieren.
5. Manuell ausfuehren und Restore-Test dokumentieren.
6. Secret-Rotation planen und durchfuehren.
7. Railway-MySQL-FAILED-Status reparieren.
8. Grossen Portal-Generatoren-Audit starten.
