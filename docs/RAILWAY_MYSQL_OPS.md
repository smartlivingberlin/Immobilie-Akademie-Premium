# Railway MySQL — Ops-Runbook

**Stand:** 07.06.2026  
**Kontext:** MySQL-Service kann in Railway als `FAILED` angezeigt werden, während die App noch verbunden ist. **Kein Redeploy ohne Backup.**

---

## Symptome

| Signal | Bedeutung |
|--------|-----------|
| Railway MySQL → **FAILED** | Container/Deploy-Problem, nicht zwingend Datenverlust |
| `/api/health` → **503** + `db: unavailable` | App kann DB nicht erreichen |
| Admin → System → MySQL **rot** | Live-Check schlägt fehl |
| Login/Progress fehlgeschlagen | DB wirklich down |

## Sofort-Maßnahmen (Reihenfolge)

### 1. Backup — Pflicht

```bash
pnpm run db:backup
```

Oder GitHub Actions → **MySQL Backup to Cloudflare R2** (siehe [R2_ACTIVATION_CHECKLIST.md](./R2_ACTIVATION_CHECKLIST.md)).

### 2. Status prüfen

```bash
curl -s https://immobilien-akademie-smart.de/api/health | jq .
```

Erwartung bei OK: `{ "ok": true, "db": "connected", "latencyMs": ... }`

Als Admin: `GET /api/admin/mysql-health` (401 ohne Login)

### 3. Railway Dashboard

1. [railway.app](https://railway.app) → Projekt → **MySQL** Service
2. **Deployments** → letzter Deploy: Logs lesen (OOM, Disk, Start-Command)
3. **Variables** → `MYSQL*` / Proxy-Domain unverändert?
4. **Metrics** → CPU/RAM/Disk

### 4. Häufige Ursachen

| Ursache | Fix |
|---------|-----|
| Falscher Start Command (`node dist/...` auf MySQL) | Start Command leer / MySQL-Image Standard |
| OOM / RAM voll | Plan upgraden oder Connections reduzieren |
| Disk voll | Alte Logs/Dumps bereinigen, Plan erweitern |
| Proxy-Port geändert | `DATABASE_URL` in App-Service aktualisieren |
| Deploy während Dump | Warten, dann erneut prüfen |

### 5. Redeploy nur mit Backup

1. Backup bestätigt (lokal oder R2)
2. Railway MySQL → **Redeploy** (nicht Delete)
3. Nach 2–5 Min: `/api/health` + Admin MySQL-Status
4. Smoke: Login, Modul 1 Tag 1, Code einlösen

### 6. Restore (Worst Case)

Siehe [RUNBOOK_BACKUP_RESTORE.md](./RUNBOOK_BACKUP_RESTORE.md).

---

## Monitoring

- **HealthWatcher** (Nacht-Cron): `/api/health` muss `ok: true` liefern
- **Admin Dashboard** → Tab System → MySQL-Zeile
- **GitHub CI** `e2e-smoke` nach Deploy

## Eskalation

Wenn nach Backup + Redeploy weiterhin `FAILED`:

1. Railway Support-Ticket mit Deploy-Logs
2. Restore auf neuen MySQL-Service (Railway Add-on neu anlegen)
3. `DATABASE_URL` in App + alle Cron-Jobs aktualisieren

---

*Verwandt: [RUNBOOK_BACKUP_RESTORE.md](./RUNBOOK_BACKUP_RESTORE.md), [DEPLOYMENT.md](../DEPLOYMENT.md)*
