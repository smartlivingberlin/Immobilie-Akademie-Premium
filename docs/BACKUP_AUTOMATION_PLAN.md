# Backup Automation Plan

Stand: 2026-06-06
Aktualisiert: 2026-06-14 nach S218A/S218B

Dieses Dokument beschreibt die empfohlene Automatisierung fuer Railway-MySQL-Backups der Immobilien Akademie Smart. Es baut auf dem historischen manuellen Backup- und Restore-Test aus `docs/RUNBOOK_BACKUP_RESTORE.md` sowie den aktuellen S218A/S218B-Nachweisen aus `docs/BACKUP_INVENTORY.md` auf.

## Aktueller Ist-Stand nach S218A/S218B

- Der GitHub-Actions-Workflow `.github/workflows/mysql-backup-r2.yml` ist bereits als taeglicher Cron aktiv.
- Ein geplanter GitHub-Actions-Backup-Lauf wurde am 14.06.2026 erfolgreich belegt.
- Der Cloudflare-R2-Bucket und die erwarteten `latest`-Objekte wurden im Dashboard sichtbar bestaetigt.
- Im Railway-MySQL-Backups-Tab waren kein Backup-Zeitplan und keine Provider-Backups sichtbar.
- Entschluesselung und isolierter Restore aus R2 sind weiterhin nicht bewiesen.
- Bis zur separaten Freigabe bleibt S218C ein Planungs-/Runbook-Thema. Keine operative Restore-Handlung, kein Download und keine Entschluesselung.

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
- Entschluesselung nur nach separater Freigabe in einer isolierten Umgebung testen.
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

Historische Zielstrategie war: erst Secrets setzen, manuellen Lauf pruefen, Restore-Test durchfuehren und danach Cron aktiv lassen.

Aktueller Ist-Zustand nach S218A/S218B:

1. GitHub Secrets sind fuer den Backup-Workflow vorhanden.
2. `.github/workflows/mysql-backup-r2.yml` ist aktiv.
3. Der taegliche Cron `17 2 * * *` ist aktiv.
4. Ein erfolgreicher geplanter Lauf mit `DRY_RUN=0` wurde belegt.
5. R2 `latest`-Objekte wurden sichtbar bestaetigt.
6. Entschluesselung und isolierter Restore sind weiterhin offen.

Diese Abweichung ist bewusst dokumentiert: Der aktive Cron liefert Backup-Evidence, ersetzt aber keinen Restore-Proof. Ein spaeterer Restore-Test darf nur mit separater Freigabe, isolierter Zielumgebung und eigenem Protokoll geplant und durchgefuehrt werden.

## Restore-Test-Regel

Ein automatisches Backup ist nur dann voll belastbar, wenn regelmaessig bewiesen wird, dass es wiederherstellbar ist.

Aktueller Status:

- Backup-Lauf: belegt.
- R2-Objekte: sichtbar belegt.
- Entschluesselung: nicht belegt.
- Isolierter Restore: nicht belegt.
- Railway Provider-Backups: nicht sichtbar / kein Schedule.

S218C bleibt bis zur separaten Freigabe gesperrt. Kein R2-Dump herunterladen, nicht entschluesseln und nicht restoren. Zuerst muss ein isolierter Restore-Proof-Plan mit Zielumgebung, Rollen, Stop-Regeln und Beweisprotokoll freigegeben werden.

Spaeterer Mindestnachweis fuer einen echten Restore-Proof:

```text
users
trial_leads
presentation_codes
learning_logs
open_questions
glossar_terms
pending_purchases
```

Spaeterer Ausbau nach separater Freigabe:

- Eigenen Restore-Test-Plan oder Workflow entwerfen.
- Nur in isolierter Zielumgebung ausfuehren.
- Keine Verbindung zur Produktion.
- Keine Dumps, Secrets oder personenbezogenen Inhalte in PRs, Chat, Logs oder Artefakten.
- Nur nicht-sensitive Metadaten und Ergebnisprotokoll speichern.
- Restore-Test-Workflow erst aktivieren, wenn der manuelle isolierte Prozess bestanden und abgenommen wurde.

## Sicherheitsregeln

- Keine DB-Dumps im Git committen.
- Keine Secrets in Chat, PRs, Screenshots oder Logs posten.
- Bei sichtbaren Secret-Fragmenten nach bewiesenem Backup rotieren.
- Railway-MySQL-Service nicht redeployen/restarten, solange kein frisches Backup plus Restore-Test existiert.

## Naechste Ausbaustufen

1. Backup-/Restore-Dokumente mit S218A/S218B synchron halten.
2. Risikoregister auf die aktuelle Baseline nach #218/#219 aktualisieren.
3. Isolierten Restore-Proof-Plan erstellen, aber nicht ausfuehren.
4. R2-Retention, Versionierung, Replication und Notifications/Alerting planen.
5. Bewusst entscheiden, ob Railway Provider-Backups aktiviert oder die GitHub-Actions-R2-Pipeline als primaerer Backup-Weg dokumentiert wird.
6. Secret-Rotation nur bei tatsaechlichem Secret-Leak oder geplanter Sicherheitsmassnahme durchfuehren.
