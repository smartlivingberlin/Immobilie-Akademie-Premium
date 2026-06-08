# R2 Backup — Aktivierungs-Checkliste

**Stand:** 07.06.2026  
**Workflow:** `.github/workflows/mysql-backup-r2.yml`  
**Ziel:** Tägliche verschlüsselte MySQL-Dumps in Cloudflare R2

---

## 1. Cloudflare R2 vorbereiten

1. Cloudflare Dashboard → R2 → Bucket anlegen (z. B. `immobilien-akademie-backups`)
2. R2 → Manage R2 API Tokens → Token mit **Object Read & Write** auf diesen Bucket
3. Notieren:
   - `R2_ACCOUNT_ID` (Dashboard-URL oder Account-Settings)
   - `R2_ACCESS_KEY_ID`
   - `R2_SECRET_ACCESS_KEY`
   - `R2_BUCKET`

## 2. GitHub Secrets setzen

Repository → Settings → Secrets and variables → Actions → **New repository secret**

| Secret | Beispiel / Quelle |
|--------|-------------------|
| `RAILWAY_TOKEN` | Railway → **Projekt** → Settings → Tokens → **Project Token** |
| `RAILWAY_PROJECT_ID` | Railway Projekt → Settings → Project ID |
| `R2_ACCOUNT_ID` | Cloudflare Account ID |
| `R2_ACCESS_KEY_ID` | R2 API Token |
| `R2_SECRET_ACCESS_KEY` | R2 API Token |
| `R2_BUCKET` | Bucket-Name |
| `BACKUP_ENCRYPTION_PASSPHRASE` | `openssl rand -base64 32` — **sicher aufbewahren** |

Optional:

| Secret / Variable | Default |
|-----------------|---------|
| `R2_PREFIX` | `mysql/production` |
| `RAILWAY_ENVIRONMENT` | `production` |

## 3. Erster manueller Lauf

1. GitHub → Actions → **MySQL Backup to Cloudflare R2** → **Run workflow**
2. Erfolg prüfen: grüner Job, Artifact `mysql-backup-metadata-*`
3. R2 prüfen:
   - `mysql/production/latest/immobilien-akademie-smart_mysql_latest.sql.gz.gpg`
   - `mysql/production/latest/key_counts_latest.txt`

## 4. Restore-Test (Pflicht vor Cron)

Checkliste: [RUNBOOK_BACKUP_RESTORE.md](./RUNBOOK_BACKUP_RESTORE.md) → Abschnitt „Nach R2-Aktivierung“

```bash
aws s3 cp "s3://$R2_BUCKET/mysql/production/latest/immobilien-akademie-smart_mysql_latest.sql.gz.gpg" ./restore_inbox/ \
  --endpoint-url "https://$R2_ACCOUNT_ID.r2.cloudflarestorage.com"

gpg --batch --yes --passphrase "$BACKUP_ENCRYPTION_PASSPHRASE" \
  -d ./restore_inbox/immobilien-akademie-smart_mysql_latest.sql.gz.gpg \
  > ./restore_inbox/restore.sql.gz
gzip -t ./restore_inbox/restore.sql.gz
```

Kernzählungen mit `key_counts_latest.txt` vergleichen. Ergebnis in `audit_runs/r2_restore_test_YYYYMMDD/` dokumentieren.

## 5. Täglichen Cron aktivieren

Nach erfolgreichem Restore-Test ist in `.github/workflows/mysql-backup-r2.yml` aktiv:

```yaml
schedule:
  - cron: "17 2 * * *"
```

## 6. Bei Railway MySQL FAILED

**Kein Redeploy ohne Backup.** Reihenfolge:

1. `pnpm run db:backup` (lokal mit Railway CLI)
2. Oder GitHub Workflow manuell auslösen
3. Erst danach Railway MySQL analysieren

---

*Verwandt: [BACKUP_AUTOMATION_PLAN.md](./BACKUP_AUTOMATION_PLAN.md), [DEPLOYMENT.md](../DEPLOYMENT.md)*
