# Teil 2.2 — Deployment-Migration Nixpacks → Dockerfile

**Stand:** 2026-06-10

---

## Auslöser

| Faktor | Detail | Beleg |
|--------|--------|-------|
| Symptom | Railway P2-Redeploy schlug fehl | PR #158 Titel: „Railway-Nixpacks Build härten" |
| Root Cause (behauptet) | Nixpacks instabil bei native deps (bcrypt, esbuild), Corepack-Bug, .dockerignore Encoding | PRs #158–#166 |
| Entscheidung | Vollständiger Wechsel zu Multi-Stage Dockerfile | PR #159 `b84ce5e` merged 2026-06-09T17:49Z |

**Annahme:** Ob Nixpacks grundsätzlich ungeeignet ist oder nur Konfigurationsfehler — nicht unabhängig verifiziert.

---

## Zeitliche Abfolge (Fix-Kette #158–#166)

| PR# | Merge-Zeit (UTC) | Problem | Lösung | Vermeidbar? |
|-----|------------------|---------|--------|-------------|
| #158 | 2026-06-09 17:19 | Nixpacks P2-Redeploy | Build härten (vor Dockerfile) | Ja — früher Docker |
| #159 | 17:49 | Nixpacks weiterhin problematisch | **Dockerfile eingeführt** | — |
| #160 | 17:59 | `pnpm install` native Module | `python3 make g++` in deps-Stage | Ja — Standard für node-gyp |
| #161 | 18:04 | OOM / Image zu groß | Multi-Stage, nur dist + node_modules | Ja |
| #162 | 18:08 | Corepack activate pnpm Fehler | `npm install -g pnpm@10.4.1` | Bekannter Corepack-Bug |
| #163 | 19:24 | Railway exclude-patterns | `.dockerignore` ASCII-only | Ja — Encoding |
| #164 | 19:31 | CRLF in .dockerignore | LF erzwingen, minimal ignore | Ja |
| #165 | 19:47 | Runtime: `drizzle-orm` fehlt | Volle `node_modules` im Runner (nicht nur prod) | Architektur-Entscheid |
| #166 | 20:47 | A11y + Kursbuch + drizzle runtime | `pnpm-lock.yaml` sync nach dep-Move | Folge von #165 |

**Gesamtdauer:** ~27 Stunden (09.06. 17:04 bis 10.06. 06:17 für #168 Folge-Fix)

---

## Aktueller Dockerfile (vollständig)

```dockerfile
FROM node:22-bookworm-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g pnpm@10.4.1
WORKDIR /app

FROM base AS deps
RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 make g++ ca-certificates \
  && rm -rf /var/lib/apt/lists/*
COPY package.json pnpm-lock.yaml ./
COPY patches ./patches
RUN pnpm install --frozen-lockfile

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

FROM base AS runner
ENV NODE_ENV=production
COPY package.json pnpm-lock.yaml ./
COPY patches ./patches
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY drizzle/migrations ./drizzle/migrations
COPY server/knowledge ./server/knowledge
COPY server/knowledge ./knowledge
COPY client/src/pages/modules ./client/src/pages/modules
COPY server/agent ./server/agent
EXPOSE 8080
CMD ["node", "dist/index.js"]
```

**Beleg:** `Dockerfile:1-35`

---

## Vorher / Nachher

| Aspekt | Nixpacks (vor #159) | Dockerfile (nach #166) |
|--------|---------------------|------------------------|
| Build-System | Railway auto-detect | Explizit 3-Stage |
| Base Image | unbekannt | `node:22-bookworm-slim` |
| Native deps | implizit | `python3 make g++` in deps |
| node_modules Runner | prod-only (angenommen) | **Vollständig** (wegen esbuild external + drizzle-orm) |
| Image-Größe | **unverifiziert** | **unverifiziert** — Railway Dashboard nötig |
| Build-Dauer | **unverifiziert** | **unverifiziert** |
| Healthcheck | `GET /api/health` | Unverändert — live `200` |

---

## Deployment-Pipeline aktuell

```
git push main → Railway auto-deploy → Docker build (Dockerfile)
  → node dist/index.js :8080
  → railway-edge CDN (us-east4-eqdc4a)
```

**Beleg:** `x-railway-edge: railway/us-east4-eqdc4a` im curl-Header 2026-06-10

### Health-Check (live)

```json
{"ok":true,"db":"connected","latencyMs":429,"ts":"2026-06-10T09:36:25.903Z","migrations":{"pending":0,"total":45,"lastApplied":"add-indexes.sql"}}
```

**Restart-Verhalten:** **unverifiziert** — kein Railway-Zugang. Code: kein expliziter `HEALTHCHECK` in Dockerfile.

### Caching-Strategie

- Docker Layer-Cache: `deps` Stage cached wenn `package.json`/`pnpm-lock.yaml` unverändert
- Kein explizites Railway Build-Cache dokumentiert

---

## Restrisiken

| Risiko | Schwere | Detail |
|--------|---------|--------|
| Volle node_modules in Production | Mittel | Größeres Image, mehr Angriffsfläche; notwendig für drizzle-orm runtime (#165) |
| Kein HEALTHCHECK in Dockerfile | Niedrig | Railway hat eigenen Health-Endpoint |
| File-Stores (`data/verwalter-*`) | **Hoch** | Nicht in Dockerfile COPY — **ephemeral** ohne Railway Volume |
| Module-JSON COPY | Mittel | `client/src/pages/modules` — ungewöhnlich, evtl. Runtime-Fallback |
| Rollback zu Nixpacks | Möglich | `railway.toml` oder Dashboard Builder zurück auf Nixpacks; kein `nixpacks.toml` mehr im Repo (**unverifiziert**) |

---

## Rollback zu Nixpacks

1. Railway Dashboard → Service → Settings → Builder → Nixpacks
2. Oder `nixpacks.toml` wieder hinzufügen (existiert aktuell nicht im Repo)
3. **Risiko:** Alle #158–#165 Fixes wären obsolet; native deps Problem kehrt zurück

**Empfehlung (Cursor):** Nicht rollbacken — Dockerfile ist stabiler nach 9 Fix-PRs.

---

## Deploy-Anzahl letzte 30 Tage

**unverifiziert** — Railway API nicht zugänglich.

**Proxy-Indikator:** 90 Commits am 07.06., 37 am 09.06. → geschätzt 10–30 Deploys in 30 Tagen bei auto-deploy on push.

---

*Weiter: [01_CHRONOLOGIE.md](./AUDIT_2026-06-10_01_CHRONOLOGIE.md)*
