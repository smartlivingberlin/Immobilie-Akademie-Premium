# Verwalter Phase 1 — Status & Alisad-Aufgaben

**Stand:** 2026-06-10  
**Branch:** `cursor/verwalter-phase1-consolidated-7dbc`  
**Ersetzt:** PRs #172–#177 (ein konsolidierter PR)

---

## Erledigt (Cursor)

| # | Task | Status |
|---|------|--------|
| 1 | Strategie-Dokument auf `main` | ✅ PR #179 merged |
| 2 | Verwalter P3–Suite+ in **einem PR** konsolidiert | ✅ Rebase auf `main` |
| 3 | Fair-Use auf Verwalter-KI (`ki-brief`, `assistent`, `buchungen/vorschlagen`) | ✅ `kiFairUseGate.ts` |
| 4 | Rebase-Konflikt `.gitignore` (DATEV + Independence Plan) | ✅ |

---

## Bewusst zurückgestellt (Sicherheit / AGENTS.md)

| # | Task | Grund | Nächster Schritt |
|---|------|-------|------------------|
| 1 | Verwalter File-Store → MySQL | `drizzle/schema.ts` ist **verboten** zu ändern | Separates OK von Alisad für Schema-PR |
| 2 | Railway Volume für `data/verwalter-*` | Nur Alisad (Dashboard) | Interim-Backup bis MySQL |
| 3 | Stripe „Verwalter Tools" Live | Alisad Stripe Dashboard | Nach PR-Merge auf Staging testen |

---

## Nur Alisad (nicht im Terminal automatisierbar)

### A — Nach PR-Merge: Staging-Smoke (5 Min.)

1. https://immobilien-akademie-smart.de/app/verwalter öffnen (eingeloggt)
2. Objekt anlegen → Vorgang → Buchung vorschlagen
3. KI-Brief testen
4. Bei Fehler: Screenshot + Copy-Paste der Browser-Konsole

### B — Daten-Backup bis MySQL (einmalig)

**WSL:**
```bash
cd /mnt/c/Users/Lenovo/Immobilie-Akademie-Premium
git checkout main && git pull
# Falls data/verwalter-* lokal existiert:
tar -czvf ~/verwalter-data-backup-$(date +%Y%m%d).tar.gz data/verwalter-* 2>/dev/null || echo "Keine lokalen Verwalter-Daten"
```

### C — Railway Volume (optional, bis MySQL)

Railway Dashboard → Service → Settings → prüfen ob **Volume** verfügbar.  
Falls ja: Mount `/app/data` — sonst auf MySQL-Migration warten.

### D — PR #172–#177 schließen

Nach Merge des konsolidierten PRs: alte Draft-PRs als „superseded" schließen (Cursor oder Alisad).

---

## Phase 2 (noch nicht starten)

- Zweiter Railway-Service + Subdomain `verwalter.immobilien-akademie-smart.de`
- Siehe `docs/VERWALTER_INDEPENDENCE_PLAN.md`
