# Verwalter Suite — QA-Runbook (Stakeholder-Tests)

**Stand:** 2026-06-10  
**Production:** https://immobilien-akademie-smart.de

---

## 1. Alle Verwalter-Links (zum Klicken / an Tester)

### Öffentlich (ohne Login)

| Bereich | URL |
|---------|-----|
| Startseite | https://immobilien-akademie-smart.de/ |
| Verwalter-Rechner Landing | https://immobilien-akademie-smart.de/verwalter-rechner |
| Modul 3 Kurs-Landing (WEG) | https://immobilien-akademie-smart.de/kurs/modul-3-weg-verwalter |

### App (Login nötig — leitet sonst um)

| Bereich | URL |
|---------|-----|
| Objekte (Einstieg) | https://immobilien-akademie-smart.de/app/verwalter/objekte |
| Vorgänge | https://immobilien-akademie-smart.de/app/verwalter/vorgaenge |
| Buchungen | https://immobilien-akademie-smart.de/app/verwalter/buchungen |
| Vorlagen | https://immobilien-akademie-smart.de/app/verwalter/vorlagen |
| Fristen | https://immobilien-akademie-smart.de/app/verwalter/fristen |
| Beispiel-Vorlage Mahnung | https://immobilien-akademie-smart.de/app/verwalter/vorlagen/mahnung-stufe1 |

### Rechenpraxis-Shell (Verwalter-Produkt)

| Bereich | URL |
|---------|-----|
| Rechenpraxis (mit Verwalter-Nav) | https://immobilien-akademie-smart.de/app/rechenpraxis |

---

## 2. Ein Befehl — automatisches QA-Pack (WSL)

```bash
cd /mnt/c/Users/Lenovo/Immobilie-Akademie-Premium
bash scripts/ops/verwalter-qa-pack.sh
```

**Mit Login (API-Tests inkl. deine Objekte):**

```bash
cd /mnt/c/Users/Lenovo/Immobilie-Akademie-Premium
B2B_ADMIN_PASSWORD='hier-dein-echtes-admin-passwort' bash scripts/ops/verwalter-qa-pack.sh
```

Wichtig: `'DEIN_PASSWORT'` ist nur Platzhalter — echtes Passwort einsetzen (nicht committen).

→ **Gesamte Ausgabe copy-pasten** an Cursor.

---

## 3. Playwright (Browser-Simulation, Prod)

**Einmalig:**

```bash
cd /mnt/c/Users/Lenovo/Immobilie-Akademie-Premium
pnpm install
pnpm exec playwright install chromium
```

**Verwalter-Tests:**

```bash
PLAYWRIGHT_BASE_URL=https://immobilien-akademie-smart.de \
B2B_ADMIN_PASSWORD='DEIN_PASSWORT' \
pnpm exec playwright test \
  tests/e2e/26-verwalter-mobile-layout.spec.ts \
  tests/e2e/07-verwalter-rechner.spec.ts \
  tests/e2e/21-mysql-health.spec.ts \
  tests/e2e/22-migration-status.spec.ts \
  --project=chromium
```

Copy-Paste: letzte 30 Zeilen der Ausgabe.

---

## 4. Lighthouse (Speed + A11y)

**WSL ohne Chrome:** PageSpeed-Link nutzen (Abschnitt 5) — einfacher.

**WSL (ein Script):**

```bash
cd /mnt/c/Users/Lenovo/Immobilie-Akademie-Premium
bash scripts/ops/verwalter-lighthouse.sh
```

Falls Chromium-Libs fehlen (Ubuntu 24): `sudo apt-get install -y libnss3 libatk-bridge2.0-0t64 libdrm2 libxkbcommon0 libgbm1 libasound2t64`

**ARM/WSL:** Lighthouse lokal oft unmöglich — PageSpeed-Link nutzen (Abschnitt 5).

**Playwright Admin-401-Tests ohne Login-Setup:**

```bash
PLAYWRIGHT_SKIP_GLOBAL_SETUP=1 PLAYWRIGHT_BASE_URL=https://immobilien-akademie-smart.de \
pnpm exec playwright test tests/e2e/21-mysql-health.spec.ts tests/e2e/22-migration-status.spec.ts --project=chromium
```

---

## 5. Externe Web-Tests (nur Link öffnen)

| Tool | Link |
|------|------|
| Google PageSpeed | https://pagespeed.web.dev/analysis?url=https://immobilien-akademie-smart.de/app/verwalter/buchungen |
| Security Headers | https://securityheaders.com/?q=https://immobilien-akademie-smart.de&followRedirects=on |
| SSL Labs | https://www.ssllabs.com/ssltest/analyze.html?d=immobilien-akademie-smart.de |

Screenshot oder Score-Zahlen copy-pasten.

---

## 6. Stakeholder-Checklisten

### A — Endnutzer (Hausverwalter)

- [ ] Registrieren / Login
- [ ] Objekt anlegen
- [ ] Vorgang anlegen
- [ ] Buchung vorschlagen + speichern
- [ ] Assistent (unten rechts) öffnen
- [ ] Vorlage → KI-Brief

### B — Beta-Tester (extern)

- [ ] Link erhalten: `/app/verwalter/objekte`
- [ ] 15 Min. frei testen
- [ ] Feedback: Was unklar? Was fehlt?

### C — Betreiber (Alisad)

- [ ] `bash scripts/ops/verwalter-qa-pack.sh` mit Passwort
- [ ] Health: `migrations.pending = 0`
- [ ] MySQL: Objekte in DB (nach erstem Zugriff importiert)

### D — Security

- [ ] `/api/verwalter/*` ohne Cookie → 401
- [ ] Admin-Routen ohne Login → 401

---

## 7. Vitest (nur lokal, kein Prod)

```bash
cd /mnt/c/Users/Lenovo/Immobilie-Akademie-Premium
pnpm exec vitest run server/verwalterObjektStore.test.ts server/verwalterBuchungStore.test.ts server/verwalterVorgangStore.test.ts
```

---

*Siehe auch: `docs/VERWALTER_BETA_TESTER.md`*
