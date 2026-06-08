#!/usr/bin/env bash
# Gibt die benötigten GitHub Secrets für mysql-backup-r2.yml aus
set -euo pipefail

cat <<'EOF'
=== GitHub Secrets für R2 Backup Workflow ===

Pflicht (Repository → Settings → Secrets → Actions):

  RAILWAY_TOKEN              Railway → Account → Tokens
  RAILWAY_PROJECT_ID         Railway Projekt → Settings
  BACKUP_ENCRYPTION_PASSPHRASE   openssl rand -base64 32  (sicher speichern!)
  R2_ACCOUNT_ID              Cloudflare Dashboard
  R2_ACCESS_KEY_ID           R2 → Manage API Tokens
  R2_SECRET_ACCESS_KEY       R2 → Manage API Tokens
  R2_BUCKET                  z.B. immobilien-akademie-backups

Optional:
  R2_PREFIX                  Default: mysql/production
  RAILWAY_ENVIRONMENT        Default: production

=== Erster Testlauf ===

1. GitHub → Actions → "MySQL Backup to Cloudflare R2"
2. Run workflow → dry_run: true  (nur Dump, kein R2)
3. Bei Erfolg: dry_run: false
4. Restore-Test: docs/RUNBOOK_BACKUP_RESTORE.md

=== Cron aktivieren (nach Restore-Test) ===

In .github/workflows/mysql-backup-r2.yml die schedule-Zeilen auskommentieren.

Siehe: docs/R2_ACTIVATION_CHECKLIST.md
EOF
