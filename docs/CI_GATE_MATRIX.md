# CI Gate Matrix

Stand: 2026-06-15
Baseline: `9962b70b289ce73baa09325b6073bae143c8d657`
Letzter Safety-Tag: `safety/pr224-stripe-sandbox-market-release-gate-live-health-9962b70`

Diese Matrix dokumentiert, welche CI-/E2E-/Ops-Gates aktuell harte Merge-Gates sind und welche nur Signale, optionale Prüfungen oder separate Betriebsprozesse darstellen.

Wichtig: Grüne PR-Checks bedeuten aktuell nicht automatisch, dass alle Live-, Auth-, Stripe-, KI-, TTS- und Voice-Flows real bewiesen sind.

## 1. Harte PR-/Main-Gates

| Gate | Workflow/Script | Status | Bedeutung |
|---|---|---|---|
| `check` | `.github/workflows/ci.yml` | Hard Gate | Installiert Dependencies, prüft verbotene Modul-6-8-Referenzen, führt TypeScript-Check, Build, Tests und Audit aus. |
| `docker-build` | `.github/workflows/ci.yml` | Hard Gate | Baut das Docker-Image als Railway-Paritätscheck. Läuft erst nach `check`. |

Diese Gates laufen bei Pull Requests auf `main` und bei Pushes auf `main`. Sie sind die aktuell wichtigsten technischen Blocker.

## 2. Soft-/Signal-Gates

| Gate | Workflow/Script | Status | Bedeutung |
|---|---|---|---|
| `e2e-smoke` | `pnpm run test:e2e:smoke` | Soft Signal | Live/Public-Smoke gegen Production-Domain. In CI aktuell mit `continue-on-error: true`. |
| `e2e-stripe` | `pnpm run test:e2e:stripe-guards` | Soft Signal | Stripe-/Preis-/Webhook-/Health-Readiness-Prüfungen. In CI aktuell mit `continue-on-error: true`. |

Diese Gates sind wertvolle Frühwarnsignale, aber aktuell nicht als harte Merge-Blocker zu behandeln.

## 3. Optional / Secret-gated

| Gate | Bedingung | Status | Bedeutung |
|---|---|---|---|
| Stripe live checkout | `vars.STRIPE_E2E_ENABLED == 'true'` plus passende Secrets | Optional / Secret-gated | Darf ohne Markt-/Gewerbe-/Compliance-Freigabe nicht als echte Zahlungsfreigabe verstanden werden. |
| Auth-Smoke | Test-Credentials, Magic-Link-Secret oder gültiger Auth-State | Optional / Secret-gated | Ohne sichere Test-Credentials kann Auth-Coverage bewusst leer/skipped bleiben. |
| KI-/Tutor-/TTS-/Voice-Smoke | Auth-State und ggf. Provider-/Runtime-Voraussetzungen | Nicht vollständig bewiesen | Grüne CI allein beweist diese Flows aktuell nicht vollständig. |

Diese Prüfungen dürfen nicht blind zu harten Gates gemacht werden, weil fehlende Secrets sonst gute PRs blockieren können.

## 4. Separate Ops-Workflows

| Workflow/Script | Status | Bedeutung |
|---|---|---|
| `.github/workflows/mysql-backup-r2.yml` | Separate Ops | Scheduled/manual Backup-Workflow mit Railway-, MySQL-, R2- und GPG-Kontext. Kein normaler PR-/Merge-Gate. |
| `db:backup` | Separate Ops | Backup-nah; nur mit gesonderter Freigabe und Secret-Schutz. |
| `stripe:seed-prices` | Separate Ops | Stripe-mutierend möglich; nicht als normales CI-Gate verwenden. |
| `stripe:setup-webhook` | Separate Ops | Stripe-/Webhook-mutierend möglich; nicht als normales CI-Gate verwenden. |
| `db:push` | Gesperrt/neutralisiert | Script gibt aktuell nur aus, dass `db:push` auf Railway deaktiviert ist. |

## 5. Aktuell nicht vollständig bewiesen

Folgende Bereiche sind durch grüne Standard-CI nicht vollständig bewiesen:

- vollständiger Authenticated User Flow
- KI-Tutor / AI Assistant unter echter Auth
- TTS / Voice / Audio-Komfortfunktionen unter echter Auth
- echte Stripe-Live-Zahlung
- echter Live-Checkout mit realem Zahlungsmittel
- Restore-/Decrypt-Proof eines Backups
- vollständige Admin-/Owner-/Support-Flows

Das ist kein akuter Fehler, sondern eine klare Abgrenzung der aktuellen Testabdeckung.

## 6. Entscheidungsregel

Vor einem CI-Hardening gilt:

1. Erst Gate klassifizieren.
2. Dann prüfen, ob der Test ohne Secrets stabil laufen kann.
3. Dann entscheiden, ob der Test ein harter Merge-Blocker sein darf.
4. Auth-, Stripe-Live-, Backup-, Restore- und Secret-gated Tests nicht blind hart schalten.
5. Bei Payment-, Backup- und Datenbankthemen immer separaten Freigabe-Track verwenden.

## 7. Empfehlung

Kurzfristig keine pauschale Entfernung von `continue-on-error`.

Sinnvoller nächster Schritt ist gezieltes Hardening nur dort, wo Tests stabil, secretfrei, nicht mutierend und produktionssicher sind. Bis dahin dient diese Matrix als transparente Entscheidungsgrundlage.
