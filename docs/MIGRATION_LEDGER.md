# Migration Ledger — Betrieb

**Stand:** 07.06.2026 · CASE-010 geschlossen in Code

---

## Wie es funktioniert

1. Jeder Deploy führt `runMigrations()` in `server/migrate.ts` aus (vor Express-Start).
2. Angewendete Dateien werden in `schema_migrations` protokolliert.
3. Bereits eingetragene Dateien werden übersprungen.
4. In **Production** schlägt ein nicht-idempotenter Fehler fehl (`MIGRATION_STRICT`, Default an).

## Neue Migration anlegen

```bash
# drizzle-kit schreibt nach drizzle/migrations/ (drizzle.config.ts)
pnpm exec drizzle-kit generate
# Datei prüfen, committen, push → Railway deployt automatisch
```

## Bestehende Produktions-DB (einmalig)

Wenn die DB **vor** dem Ledger alle Tabellen hatte, `schema_migrations` ist leer:

```bash
# 1. Backup
pnpm run db:backup

# 2. Dry-run
pnpm run db:backfill-migrations -- --dry-run

# 3. Alle bis 0041 eintragen (oder --until=0037_....sql)
pnpm run db:backfill-migrations -- --apply

# 4. Deploy — nur neue Migrationen laufen
```

## Status prüfen

```bash
curl -s https://immobilien-akademie-smart.de/api/health | jq .migrations
# Admin (eingeloggt): GET /api/admin/migration-status
```

Erwartung nach Backfill: `{ "pending": 0, "total": 45, ... }`

## ENV

| Variable | Default | Bedeutung |
|----------|---------|-----------|
| `MIGRATION_STRICT` | `true` in production | Fehler → Deploy stoppt Migration-Phase |

---

*Verwandt: [EXTERNAL_OPS_CHECKLIST.md](./EXTERNAL_OPS_CHECKLIST.md)*
