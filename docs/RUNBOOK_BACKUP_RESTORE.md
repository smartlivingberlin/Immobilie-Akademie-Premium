# Railway MySQL Backup & Restore Runbook

Stand: 2026-06-06

Dieses Runbook dokumentiert den bewiesenen Rettungsweg fuer die Railway-MySQL-Datenbank der Immobilien Akademie Smart. Es ist absichtlich operativ gehalten: erst sichern, dann reparieren.

## Aktueller Befund

- Produktionsdatenbank: Railway MySQL.
- App-Service: `Immobilie-Akademie-Premium`.
- DB-Service: `MySQL`.
- DB-Zugriff ist ueber Railway TCP Proxy moeglich.
- Ein manueller Dump wurde am 2026-06-06 erstellt und lokal erfolgreich in eine frische MySQL-8-Instanz restored.
- Der Railway-MySQL-Service zeigte danach einen `FAILED`-Status fuer den neuesten Deployment-Versuch. Die App konnte dennoch mit der Datenbank arbeiten. Daraus folgt: Keine MySQL-Redeploys oder Restarts ohne frisches Backup und Restore-Test.

## Bewiesener Backup-Stand vom 2026-06-06

Artefakt:

```text
audit_runs/mysql_manual_backup_20260606_065425/railway_mysql_backup.sql.gz
```

Bewiesen:

- gzip-Integritaet OK.
- Restore in lokalen MySQL-8-Container erfolgreich.
- 33 Tabellen restored.
- Exakte Kernzaehlungen Live und Restore stimmten ueberein.

Kernzaehlungen:

```text
users               4
trial_leads         93
presentation_codes 96
learning_logs      365
open_questions     4275
glossar_terms      93
pending_purchases  1
```

## Manuellen Dump erstellen

Voraussetzungen:

- Railway CLI ist eingeloggt und mit dem Projekt verlinkt.
- Service `MySQL` hat die Variablen `RAILWAY_TCP_PROXY_DOMAIN`, `RAILWAY_TCP_PROXY_PORT`, `MYSQLUSER`, `MYSQLPASSWORD`, `MYSQLDATABASE`.
- Lokal sind `railway`, `mysqldump`, `gzip` verfuegbar.

Empfohlen:

```bash
scripts/backup/railway-mysql-dump.sh
```

Das Script erzeugt einen Ordner unter `audit_runs/`, erstellt einen komprimierten Dump und fuehrt Basispruefungen aus.

## Restore-Test lokal durchfuehren

Ein Backup gilt erst als belastbar, wenn es erfolgreich restored wurde. Beispiel:

```bash
BACKUP_DIR="audit_runs/mysql_manual_backup_YYYYMMDD_HHMMSS"
RESTORE_DIR="$BACKUP_DIR/restore_test_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$RESTORE_DIR"

CONTAINER="ia_restore_test_$(date +%Y%m%d_%H%M%S)"
ROOTPW="restoreRoot123!"
USERPW="restoreUser123!"
DBNAME="railway_restore"

docker run -d \
  --name "$CONTAINER" \
  -e MYSQL_ROOT_PASSWORD="$ROOTPW" \
  -e MYSQL_DATABASE="$DBNAME" \
  -e MYSQL_USER="restore_user" \
  -e MYSQL_PASSWORD="$USERPW" \
  -p 33078:3306 \
  mysql:8.0 \
  --default-authentication-plugin=mysql_native_password

for i in $(seq 1 90); do
  if docker exec "$CONTAINER" mysql -urestore_user -p"$USERPW" "$DBNAME" -e "SELECT 1;" >/dev/null 2>&1; then
    echo "MySQL SQL ready after ${i}s"
    break
  fi
  sleep 1
done

zcat "$BACKUP_DIR/railway_mysql_backup.sql.gz" \
  | docker exec -i "$CONTAINER" mysql -urestore_user -p"$USERPW" "$DBNAME"

docker exec "$CONTAINER" mysql -urestore_user -p"$USERPW" "$DBNAME" -N -e "
  SELECT 'users', COUNT(*) FROM users
  UNION ALL SELECT 'trial_leads', COUNT(*) FROM trial_leads
  UNION ALL SELECT 'presentation_codes', COUNT(*) FROM presentation_codes
  UNION ALL SELECT 'learning_logs', COUNT(*) FROM learning_logs
  UNION ALL SELECT 'open_questions', COUNT(*) FROM open_questions
  UNION ALL SELECT 'glossar_terms', COUNT(*) FROM glossar_terms
  UNION ALL SELECT 'pending_purchases', COUNT(*) FROM pending_purchases;
" | tee "$RESTORE_DIR/key_counts.txt"

docker rm -f "$CONTAINER"
```

## Live-Counts ohne personenbezogene Daten

```bash
railway run --service MySQL -- bash -lc '
mysql \
  -h "$RAILWAY_TCP_PROXY_DOMAIN" \
  -P "$RAILWAY_TCP_PROXY_PORT" \
  -u "$MYSQLUSER" \
  -p"$MYSQLPASSWORD" \
  "$MYSQLDATABASE" \
  -N -e "
    SELECT '\''users'\'', COUNT(*) FROM users
    UNION ALL SELECT '\''trial_leads'\'', COUNT(*) FROM trial_leads
    UNION ALL SELECT '\''presentation_codes'\'', COUNT(*) FROM presentation_codes
    UNION ALL SELECT '\''learning_logs'\'', COUNT(*) FROM learning_logs
    UNION ALL SELECT '\''open_questions'\'', COUNT(*) FROM open_questions
    UNION ALL SELECT '\''glossar_terms'\'', COUNT(*) FROM glossar_terms
    UNION ALL SELECT '\''pending_purchases'\'', COUNT(*) FROM pending_purchases;
  "
'
```

## Railway MySQL FAILED-Status

Wenn Railway den `MySQL`-Service als `FAILED` zeigt, obwohl die App erfolgreich DB-Migrationen ausfuehrt:

1. Nicht sofort `redeploy`, `restart`, `down`, `volume detach`, `volume delete` oder Service-Delete ausfuehren.
2. Zuerst frischen Dump erstellen.
3. Dump lokal restoren.
4. Erst danach im Railway-Dashboard pruefen:
   - Source muss ein MySQL-Image bzw. DB-Template sein, nicht das GitHub-App-Repo.
   - Kein App-Healthcheck wie `/api/health` fuer MySQL.
   - Volume `/var/lib/mysql` muss erhalten bleiben.
   - Start Command muss MySQL starten, nicht `node dist/index.js`.

## Secrets Rotation

Wenn Secrets in Terminal-Logs, Chat-Ausgaben oder Screenshots sichtbar wurden, nach einem bewiesenen Backup rotieren:

1. MySQL Passwort / `DATABASE_URL`.
2. `JWT_SECRET`, `MAGIC_LINK_SECRET`, `INSPECT_JWT_SECRET`.
3. KI-Provider Keys: Anthropic, Gemini, Groq, ElevenLabs.
4. Stripe Keys nur, wenn vollstaendige Werte sichtbar wurden.

Rotation immer mit anschliessendem Healthcheck, Login-Test und mindestens einem Smoke-Test fuer Code-Einloesung und Owner-Dashboard.

## Nach R2-Aktivierung: Restore-Test-Checkliste

Diese Checkliste ist **Pflicht** nach dem ersten erfolgreichen GitHub-Workflow-Lauf (`.github/workflows/mysql-backup-r2.yml`). Ein Backup in R2 gilt erst als belastbar, wenn der Restore-Test dokumentiert ist.

### 1. Dump aus R2 holen

```bash
aws s3 cp "s3://$R2_BUCKET/${R2_PREFIX:-mysql/production}/latest/immobilien-akademie-smart_mysql_latest.sql.gz.gpg" ./restore_inbox/ \
  --endpoint-url "https://$R2_ACCOUNT_ID.r2.cloudflarestorage.com"
```

### 2. Entschlüsseln

```bash
gpg --batch --yes --passphrase "$BACKUP_ENCRYPTION_PASSPHRASE" \
  -d ./restore_inbox/immobilien-akademie-smart_mysql_latest.sql.gz.gpg \
  > ./restore_inbox/restore.sql.gz
gzip -t ./restore_inbox/restore.sql.gz
```

### 3. Lokal restoren

Den Abschnitt **Restore-Test lokal durchfuehren** oben ausfuehren. `BACKUP_DIR` auf `./restore_inbox` setzen.

### 4. Kernzaehlungen vergleichen

| Tabelle | Erwartung (Stand 06.06.2026) | Restore-Ist | OK |
|---------|------------------------------|-------------|-----|
| users | 4 | ___ | ☐ |
| trial_leads | 93 | ___ | ☐ |
| presentation_codes | 96 | ___ | ☐ |
| learning_logs | 365 | ___ | ☐ |
| open_questions | 4275 | ___ | ☐ |
| glossar_terms | 93 | ___ | ☐ |
| pending_purchases | 1 | ___ | ☐ |

Abweichungen >5 % bei `open_questions` oder `learning_logs` → Backup als fehlerhaft markieren, Workflow stoppen, manuellen Dump wiederholen.

### 5. App-Smoke nach Restore (optional, Staging)

Nur auf isolierter Restore-Instanz, nicht gegen Live:

- Login mit Test-Account
- `/api/health` → 200
- Modul 1 Tag 1 öffnen

### 6. Dokumentation

Ergebnis in `audit_runs/r2_restore_test_YYYYMMDD/` ablegen:

- `key_counts.txt` (aus Restore)
- `restore_ok.txt` mit Datum, R2-Pfad, Prüfer
- Bei Erfolg: Cron im Workflow aktivieren (siehe `BACKUP_AUTOMATION_PLAN.md`)

**Regel:** Kein Cron, kein „Production-ready“-Status für R2-Backups ohne mindestens einen dokumentierten Restore-Test.

## Naechste Automatisierung

Zielbild:

- Taeglicher `mysqldump`.
- Komprimierung.
- Externer Speicher, zum Beispiel S3-kompatibler Bucket.
- Regelmaessiger Restore-Test (monatlich laut `BACKUP_AUTOMATION_PLAN.md`).
- Alarm bei fehlgeschlagenem Dump oder Restore.

Bis diese Automatisierung steht, mindestens vor jedem Railway-DB-Eingriff manuell `scripts/backup/railway-mysql-dump.sh` ausfuehren.
