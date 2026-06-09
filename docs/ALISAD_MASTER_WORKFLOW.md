# Master-Workflow — Alisad & Cursor (Anfänger-Anleitung)

**Stand:** 09.06.2026  
**Für:** Alisad Gadyri (Betreiber) — Schritt für Schritt, ohne Vorkenntnisse  
**Ziel:** Portal sicher, schnell und zuverlässig — mit bewiesenen Daten, nicht Vermutungen

---

## Wie wir zusammenarbeiten (einfach erklärt)

| Wer | Was |
|-----|-----|
| **Du (Alisad)** | Dinge mit Passwort-Zugang: Domain-DNS (UDAG), GitHub „Merge“, Railway, Resend, Browser-Tests |
| **Cursor (Agent)** | Code, Skripte, Prüfungen per Terminal, Pull Requests vorbereiten, Ergebnisse auswerten |
| **Gemeinsam** | Du führst einen Schritt aus → schreibst „fertig“ oder kopierst Terminal-Ausgabe → Cursor prüft und sagt „weiter“ oder „korrigieren“ |

**Regel:** Nichts eigenmächtig auf `main` mergen. Jeder Merge = dein Klick auf GitHub nach kurzer Prüfung.

---

## Ampel — Wo stehen wir?

| Bereich | Status | Nächster Schritt |
|---------|--------|------------------|
| Website läuft | 🟢 | — |
| Tests (135 Vitest, 36 API) | 🟢 | — |
| TLS/SSL (Qualys A+) | 🟢 | — |
| Performance Desktop | 🟢 | — |
| Performance Mobile (LCP ~4,8 s) | 🟡 | Später Code-PR (nicht eilig) |
| **E-Mail DNS (SPF kaputt)** | 🔴 | **Phase 1 — heute** |
| HSTS preload | 🟡 | Phase 2 — PR #151 mergen |
| R2 Backup-Restore ungetestet | 🔴 | Phase 4 |
| Stripe Live | 🟡 | Nach Backup + E-Mail |
| PR #147 E-Mail-Verifikation | ⛔ blockiert | Erst E-Mail DNS > 90 % |

---

## Phase 1 — E-Mail DNS reparieren (P0, ~20 Minuten)

### Warum?

Deine Domain hat einen **fehlerhaften SPF-Eintrag**. Das ist wie ein falscher Absender-Stempel: Mails können im Spam landen. **PR #147 (E-Mail-Bestätigung) darf erst danach** kommen.

### Was Cursor nicht kann

DNS ändert nur **du** im Domain-Provider (vermutlich United Domains / UDAG). Cursor hat keinen Zugang.

### Schritt 1.1 — Einloggen beim Domain-Anbieter

1. Browser öffnen
2. Gehe zu dem Ort, wo du `immobilien-akademie-smart.de` gekauft/verwaltet hast (z. B. united-domains.de oder dein UDAG-Kundenportal)
3. Einloggen mit deinen Zugangsdaten

### Schritt 1.2 — DNS-Verwaltung öffnen

1. Klicke auf **Meine Domains** oder **Domainverwaltung**
2. Wähle **immobilien-akademie-smart.de**
3. Klicke auf **DNS**, **DNS-Einträge** oder **Zone bearbeiten**

### Schritt 1.3 — Alten SPF-Eintrag finden

Suche einen **TXT**-Eintrag, der so anfängt:

```
v=spf1 include:_smtp.udag.de include:_spf.resend.com ~all
```

**Nicht löschen ohne Ersatz!** Nur **bearbeiten/ersetzen**.

### Schritt 1.4 — Neuen SPF-Eintrag eintragen (Root)

**Ersetze** den kompletten Text durch (Copy-Paste):

```
v=spf1 include:_smtp.udag.de include:amazonses.com -all
```

| Feld | Wert |
|------|------|
| Typ | TXT |
| Name/Host | `@` oder leer oder `immobilien-akademie-smart.de` |
| Wert | siehe oben |
| TTL | 300 oder Standard |

**Speichern** klicken.

**Wenn etwas schief geht:** Alte Version aus Schritt 1.3 wieder eintragen (= Rollback).

### Schritt 1.5 — Neuen SPF-Eintrag auf `send` (zusätzlich)

**Neuen** TXT-Eintrag **hinzufügen** (nicht den von 1.4 ändern):

| Feld | Wert |
|------|------|
| Typ | TXT |
| Name/Host | `send` |
| Wert | `v=spf1 include:amazonses.com -all` |

**Speichern.**

### Schritt 1.6 — Warten (15–60 Minuten)

DNS braucht Zeit. Trink einen Kaffee ☕

### Schritt 1.7 — Prüfen (Terminal)

**Windows (PowerShell)** oder **WSL** oder **Mac Terminal** — im Projektordner:

```bash
cd pfad/zu/Immobilie-Akademie-Premium
pnpm run ops:dns-email-check
```

**Erfolg sieht so aus:**

- ✅ Kein `_spf.resend.com`
- ✅ `include:amazonses.com vorhanden`
- ✅ SPF auf send-Subdomain vorhanden

**Dann im Browser:**

1. https://internet.nl/mail/immobilien-akademie-smart.de/ — Ziel: deutlich über 63 %, ideal > 90 %
2. Test-Registrierung auf der Website → kommt Willkommens-Mail im **Posteingang** (nicht Spam)?

### Schritt 1.8 — Cursor Bescheid geben

Schreib z. B.: *„Phase 1 fertig, hier die Ausgabe von ops:dns-email-check: …"*

Cursor wertet aus und gibt Phase 2 frei.

---

## Phase 2 — HSTS Preload (Code, ~10 Minuten)

### Warum?

Kleiner Sicherheits-Header-Fix. PR ist **fertig vorbereitet**, du musst nur mergen.

### Schritt 2.1 — Pull Request öffnen

1. Browser → GitHub → Repository `Immobilie-Akademie-Premium`
2. Öffne **Pull Request #151** (`cursor/hsts-preload-fix-7dbc`)
3. Lies kurz die Beschreibung
4. Klicke **Merge pull request** → **Confirm**

### Schritt 2.2 — Warten auf Deploy (~3 Min)

Railway baut automatisch neu.

### Schritt 2.3 — Prüfen

```bash
curl -sI https://immobilien-akademie-smart.de/ | grep -i strict-transport
```

**Erfolg:** Zeile enthält das Wort `preload`

**Wichtig:** `hstspreload.org` Einreichung **erst nach 1 Monat** — nicht jetzt.

---

## Phase 3 — Doku mergen (optional, ~5 Min)

Zwei Draft-PRs mit Audit-Ergebnissen:

| PR | Inhalt |
|----|--------|
| #149 | Bericht §17 + externe Tests |
| #150 | Risikoregister |

Gleiche Vorgehensweise wie Phase 2: öffnen → Merge (wenn du einverstanden bist).

---

## Phase 4 — R2 Backup-Restore testen (P0, ~1 Stunde)

### Warum?

Backups existieren, aber **nie getestet** = nicht vertrauenswürdig.

### Anleitung

Folge exakt: `docs/R2_ACTIVATION_CHECKLIST.md` und `docs/RUNBOOK_BACKUP_RESTORE.md`

**Kurz:**

```bash
pnpm run ops:r2-checklist   # Secrets vorhanden?
```

Dann Restore lokal nach Runbook. Ergebnis in `audit_runs/r2_restore_test_YYYYMMDD/` dokumentieren.

**Bei Problemen:** Terminal-Ausgabe an Cursor — nicht raten.

---

## Phase 5 — DNS CAA (10 Minuten, nach Phase 1)

Beim gleichen Domain-Provider wie Phase 1, **zwei neue CAA-Einträge**:

```
Typ: CAA | Name: @ | Wert: 0 issue "letsencrypt.org"
Typ: CAA | Name: @ | Wert: 0 iodef "mailto:alisadgadyri38@gmail.com"
```

Prüfen:

```bash
dig CAA immobilien-akademie-smart.de +short
```

---

## Phase 6 — DMARC verschärfen (erst nach grünem SPF, ~1 Woche später)

**Nicht sofort!** Erst wenn internet.nl Mail gut ist.

Phase A (Monitoring):

```
v=DMARC1; p=none; pct=100; rua=mailto:info@immobilien-akademie-smart.de
```

Erst Wochen später → `p=quarantine; pct=100` → langfristig `p=reject`.

---

## Phase 7 — Was wir bewusst NICHT jetzt machen

| Thema | Warum warten |
|-------|--------------|
| PR #147 E-Mail-Verifikation | Blockiert bis E-Mail > 90 % |
| PR #144–#146 | Drafts, brauchen Rework |
| Stripe Live | Nach Backup + E-Mail stabil |
| LCP Mobile Optimierung | Wichtig, aber kein Blocker |
| IPv6 | Provider-Sache (Railway/UDAG), dokumentiert akzeptieren |

---

## Terminal-Befehle — Spickzettel

```bash
# E-Mail-DNS prüfen (nach Phase 1)
pnpm run ops:dns-email-check

# Server-Gesundheit
pnpm run ops:health

# TypeScript (vor jedem Merge)
npx tsc --noEmit --skipLibCheck

# Alle Unit-Tests
pnpm test
```

---

## Wenn du nicht weiterkommst

1. **Screenshot** vom DNS-Panel oder **komplette Terminal-Ausgabe** kopieren
2. An Cursor schicken mit: *„Ich bin bei Phase X, Schritt Y hängen"*
3. Cursor antwortet mit genau einem nächsten Schritt — nicht zehn auf einmal

---

*Du musst nicht alles verstehen — nur jeden Schritt der Reihe nach ausführen. Cursor prüft die Ergebnisse.*
