# Playwright Auth Smoke — E2E-Credentials

Dokumentation für `tests/e2e/28-auth-smoke-tutor.spec.ts` und `tests/e2e/global-setup.ts`.

## Benötigte Umgebungsvariablen (ohne Werte)

| Variable | Zweck |
|----------|--------|
| `PLAYWRIGHT_BASE_URL` | Basis-URL (Standard: Produktionsportal) |
| `TEST_ADMIN_EMAIL` | Admin-E-Mail für Login |
| `TEST_ADMIN_PASSWORD` | Admin-Passwort für Login |
| `B2B_ADMIN_EMAIL` | Alternative E-Mail (Fallback in global-setup) |
| `B2B_ADMIN_PASSWORD` | Alternative Passwort (Fallback in global-setup) |
| `MAGIC_LINK_SECRET` | Optional: Session ohne Passwort-Login |
| `PLAYWRIGHT_ALLOW_EMPTY_AUTH_STATE` | `1` = leerer Auth-State statt Abbruch (nur Auth-Smoke) |
| `PLAYWRIGHT_SKIP_GLOBAL_SETUP` | `1` = Setup überspringen, leerer Auth-State |

**Keine Secrets ins Repo committen.** Lokale Werte nur in `.env` (gitignored) oder Shell-Export.

## Lokaler Public-Smoke (ohne Login)

Public-Tests in der Spec nutzen explizit leeren Storage-State und laufen ohne Credentials:

```bash
pnpm run test:e2e:auth-smoke
```

Das Script setzt `PLAYWRIGHT_ALLOW_EMPTY_AUTH_STATE=1`, damit global-setup bei fehlendem Passwort nicht abbricht. Authentifizierte Tests werden per `hasValidSession()` übersprungen.

Alternativ Setup komplett überspringen:

```bash
PLAYWRIGHT_SKIP_GLOBAL_SETUP=1 pnpm run test:e2e:auth-smoke
```

## Lokaler Auth-Smoke (mit Login)

```bash
export TEST_ADMIN_EMAIL="<your-email>"
export TEST_ADMIN_PASSWORD="<your-password>"
# optional:
# export MAGIC_LINK_SECRET="<secret>"

pnpm run test:e2e:auth-smoke
```

Bei gültiger Session wird `tests/e2e/.auth-state.json` wiederverwendet (gitignored).

## GitHub Actions / CI

Repository-Secrets (Settings → Secrets and variables → Actions):

- `TEST_ADMIN_EMAIL`
- `TEST_ADMIN_PASSWORD`
- optional: `MAGIC_LINK_SECRET`

Workflow muss Secrets als Env an Playwright durchreichen. Ohne Secrets: Public-Smokes laufen; Auth-Smokes werden sauber skipped.

## Skip-Verhalten ohne Secrets

1. **global-setup:** Ohne Passwort und ohne `PLAYWRIGHT_ALLOW_EMPTY_AUTH_STATE=1` → **Abbruch mit klarer Fehlermeldung** (bestehendes E2E-Verhalten bleibt erhalten).
2. **Auth-Smoke-Script:** Setzt `PLAYWRIGHT_ALLOW_EMPTY_AUTH_STATE=1` → leerer Auth-State, kein Throw.
3. **Spec:** `hasValidSession()` false → Auth-Tests `test.skip()` mit Meldung.

## Gesetzeslink-Smoke (#204)

`LAW_SLUG_CHECKS` in `helpers/testAuth.ts`:

| Slug | Route | Status |
|------|-------|--------|
| `woeigg` | Modul 1 Tag 12, Modul 3 Tag 1 | href-Check |
| `mabv` | Modul 1 Tag 2 | href-Check |
| `immowertv_2021` | Modul 4 Tag 1 | href-Check |
| `heimmindbauv` | Modul 4 Tag 37 (HypZert Bonus) | href-Check |
| `grstvg` | — | dokumentiert ausgeschlossen (nur Glossar/LegalLink) |
| Modul 5 | Tag 1 | dokumentiert ausgeschlossen (keine festen hrefs) |

Warte-Strategie (Auth-Smoke #209):

- Nach `goto` auf `/modul/{id}/tag/{n}` wird auf `module{n}.json` und sichtbare Tabs gewartet.
- Modul 1 und 3: ein `reload()` nach dem ersten `goto`, damit der Tag aus der URL zum gerenderten Inhalt passt (ohne App-Code-Änderung).
- Normen-Tab wird geöffnet, falls vorhanden; Slug-Prüfung ist case-insensitive auf `gesetze-im-internet.de`-hrefs und HTML.

## KI-Assistent Smoke (#205)

- Sichtbarkeit: Mic-Button (`title="Spracheingabe starten"`) **nur im geöffneten KI-Overlay** — nicht den AudioPlayer auf der Tag-Seite.
- Der Vorlesen-Button (`aria-label="Text vorlesen"`) erscheint erst unter Assistant-Nachrichten (RAG-Antwort). Der Smoke-Test klickt ihn nicht und sendet keine Chatnachricht (keine API-/RAG-Kosten).
- `speechSynthesis` bleibt in den Tests gemockt.

## Allgemeine E2E vs. Auth-Smoke

- **`pnpm run test:e2e`** (alle Specs): Erwartet Credentials oder `MAGIC_LINK_SECRET`; bricht früh ab, wenn nichts gesetzt ist.
- **`pnpm run test:e2e:auth-smoke`**: Bewusst tolerant ohne Secrets (Public + dokumentierte Skips).

## Security-Hinweis

`global-setup.ts` enthält pre-existing Fallback-Werte für E-Mail/Passwort (Legacy lokaler Dev-Flow). Diese sollten in einem separaten Security-/Test-Hardening-PR entfernt werden — nicht Teil dieses PRs.
