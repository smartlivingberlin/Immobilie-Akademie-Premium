# AUTOMATION_CRON_RISK_MATRIX

Stand: `main` @ `5b24046` (2026-06-24)
Scope: In-Process-Crons und externes Monitoring — Risiko-Ampel für Railway-Betrieb.

## Legende

| Ampel | Bedeutung |
|-------|-----------|
| SAFE_NOW | Aktuell vertretbar |
| NEEDS_LOCKING | Distributed Lock nötig |
| NEEDS_LEGAL_REVIEW | Rechtsprüfung vor Produktivbetrieb |
| NOT_READY | Nicht produktionsreif |

Railway-Mehrfachinstanz: Alle Jobs laufen in jedem Node-Prozess.
Ohne replicas=1 oder Distributed Lock können Jobs parallel laufen.

## Jobs

| Job | Frequenz | E-Mail | Locking | Ampel |
|-----|----------|--------|---------|-------|
| NightCron | täglich 02:00 Serverzeit | ✅ | ❌ | NEEDS_LOCKING |
| HealthWatcher | stündlich +2min | ✅ bei Fehler | ❌ | NEEDS_LOCKING |
| AccessExpiryReminder | täglich 08:00 UTC | ✅ | ❌ | NEEDS_LOCKING |
| TrialFollowup | alle 30min + 5s Start | ✅ | ❌ | NEEDS_LEGAL_REVIEW |
| PartnerPayoutCron | Quartalsbeginn via NightCron | ❌ | ❌ | NEEDS_LOCKING |
| KeepAlive 14min | alle 14min | ❌ | n/a | SAFE_NOW |
| KeepAlive 8min | alle 8min | ❌ | n/a | SAFE_NOW |
| UptimeRobot extern | alle 5min | ✅ | n/a | SAFE_NOW |

## Kritische Punkte

### TrialFollowup — NEEDS_LEGAL_REVIEW
- Läuft alle 30min + 5s nach Serverstart
- extended = -1 missbraucht BOOLEAN-Feld
- Kein Opt-out-Link in E-Mail
- Kein Marketing-Consent-Check
- Doppelversand-Risiko bei Mehrfachinstanzen

### NightCron — NEEDS_LOCKING
- Täglich 02:00 Serverzeit (Railway = UTC)
- Schreibt nightcron_log, memory.json, coaching.json, cron.log
- Triggert PartnerPayoutCron am Quartalsbeginn
- Kein Distributed Lock

### AccessExpiryReminder
- Dedupe ✅ via UNIQUE KEY (userId, accessExpiresAt, reminderDays)
- Locking ❌ — Race zwischen SELECT und INSERT möglich

### Verwalter-Suite pending:40
- Tracking-Problem, kein Produktionsfehler
- Verwalter-Tabellen manuell ausgeführt, Drizzle-Ledger weiß es nicht
- Kein UptimeRobot-Produktivmonitor auf verwalter-suite solange ungeklärt

## Priorisierte Maßnahmen

1. Railway replicas=1 oder DB-Lock für NightCron/AccessExpiry/TrialFollowup
2. TrialFollowup: Legal Review + Opt-out + followupSentAt statt extended=-1
3. PartnerPayout: Unique Index (partnerUserId, periodStart, periodEnd)
4. KeepAlive: 8min und 14min zusammenführen
5. Verwalter pending:40: Migrations-Konzept klären

## Änderungshistorie

| Datum | Commit | Notiz |
|-------|--------|-------|
| 2026-06-24 | 5b24046 | Initiale Matrix |
