# R2 Backup — Aktivierungs-Checkliste

**Stand:** 07.06.2026
**Aktualisiert:** 2026-06-14 nach S218A/S218B
**Workflow:** `.github/workflows/mysql-backup-r2.yml`
**Ziel:** Tägliche verschlüsselte MySQL-Dumps in Cloudflare R2

> Aktueller Ist-Zustand: Der Backup-Cron ist bereits aktiv und ein erfolgreicher GitHub-Actions-R2-Backup-Lauf wurde belegt. R2-`latest`-Objekte sind sichtbar. Entschlüsselung und isolierter Restore sind weiterhin nicht bewiesen. Diese Checkliste ist deshalb nicht mehr als ungeprüfte Erstaktivierung zu lesen, sondern als historischer Aktivierungs-/Betriebsabgleich.

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
| `OPS_ALERT_WEBHOOK_URL` | Slack Incoming Webhook URL (Failure-Alert Job) |

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

## 4. Restore-Test / S218C-Status

Entschlüsselung und isolierter Restore sind weiterhin **nicht bewiesen**.

Bis zur separaten Freigabe gilt:

- Kein Backup herunterladen.
- Kein Backup öffnen.
- Keine Entschlüsselung.
- Kein Restore.
- Keine DB-Verbindung.
- Keine Railway Shell.
- Keine Provider-Mutation.
- Keine Secrets, Tokens, URLs oder personenbezogenen Werte kopieren.

Ein späterer Restore-Proof darf nur auf Grundlage eines separaten Plans erfolgen. Siehe [RESTORE_PROOF_RUNBOOK.md](./RESTORE_PROOF_RUNBOOK.md).

## 5. Täglicher Cron — aktueller Ist-Zustand

Der tägliche Cron ist bereits in `.github/workflows/mysql-backup-r2.yml` aktiv:

```yaml
schedule:
  - cron: "17 2 * * *"
```

Diese Abweichung vom ursprünglichen Aktivierungsplan ist bewusst dokumentiert: Der aktive Cron belegt laufende Backup-Erzeugung, ersetzt aber keinen Restore-Proof.

## 6. Bei Railway MySQL FAILED

**Kein Redeploy ohne Backup und Freigabe.** Reihenfolge:

1. Aktuelle Backup-Evidence in `docs/BACKUP_INVENTORY.md` prüfen.
2. Falls nötig: GitHub Workflow manuell auslösen, ohne Secrets oder Dumps offenzulegen.
3. Kein `pnpm run db:backup`, kein `railway run`, keine DB-Shell und kein Restore ohne separate Freigabe.
4. Erst danach Railway MySQL read-only analysieren.

---

*Verwandt: [BACKUP_AUTOMATION_PLAN.md](./BACKUP_AUTOMATION_PLAN.md), [DEPLOYMENT.md](../DEPLOYMENT.md)*
