#!/usr/bin/env bash
# Verwalter Suite — Terminal-Werkzeuge (ohne Stripe)
# Nutzung:
#   bash scripts/ops/verwalter-cli.sh health
#   bash scripts/ops/verwalter-cli.sh qa
#   bash scripts/ops/verwalter-cli.sh migrate-status
#   B2B_ADMIN_PASSWORD='…' bash scripts/ops/verwalter-cli.sh events
#   B2B_ADMIN_PASSWORD='…' bash scripts/ops/verwalter-cli.sh freigaben
#   B2B_ADMIN_PASSWORD='…' OBJEKT_ID=abc START_DATE=2026-06-10 bash scripts/ops/verwalter-cli.sh fristen-batch
set -euo pipefail

BASE="${OPS_BASE_URL:-https://immobilien-akademie-smart.de}"
CMD="${1:-help}"
shift || true

case "$CMD" in
  health)
    curl -s "${BASE}/api/health" | (command -v jq >/dev/null && jq . || cat)
    ;;
  qa)
    exec bash "$(dirname "$0")/verwalter-qa-pack.sh"
    ;;
  migrate-status)
    curl -s "${BASE}/api/health" | (command -v jq >/dev/null && jq '.migrations' || cat)
    ;;
  events|freigaben|fristen-batch|dashboard|flags)
    if [[ -z "${B2B_ADMIN_PASSWORD:-}" && -z "${TEST_ADMIN_PASSWORD:-}" && -z "${MAGIC_LINK_SECRET:-}" ]]; then
      echo "Login nötig: B2B_ADMIN_PASSWORD='…' bash scripts/ops/verwalter-cli.sh $CMD"
      exit 1
    fi
    python3 - "$CMD" "$BASE" <<'PY'
import json, os, sys, http.cookiejar, urllib.request

cmd, base = sys.argv[1], sys.argv[2]
email = os.environ.get("B2B_ADMIN_EMAIL") or os.environ.get("TEST_ADMIN_EMAIL") or "alisadgadyri38@gmail.com"
password = os.environ.get("B2B_ADMIN_PASSWORD") or os.environ.get("TEST_ADMIN_PASSWORD") or ""
magic = os.environ.get("MAGIC_LINK_SECRET", "")

cj = http.cookiejar.CookieJar()
opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))

def get(path):
    with opener.open(urllib.request.Request(f"{base}{path}"), timeout=25) as r:
        return r.status, r.read().decode()

def post(path, data=None):
    payload = json.dumps(data or {}).encode()
    req = urllib.request.Request(
        f"{base}{path}", data=payload,
        headers={"Content-Type": "application/json"}, method="POST",
    )
    with opener.open(req, timeout=60) as r:
        return r.status, r.read().decode()

if magic:
    urllib.request.urlopen(f"{base}/api/auth/magic?secret={magic}", timeout=20)
elif password:
    post("/api/auth/login", {"email": email, "password": password})
else:
    print("Kein Login"); sys.exit(1)

if cmd == "events":
    st, body = get("/api/verwalter/events?limit=20")
elif cmd == "freigaben":
    st, body = get("/api/verwalter/freigaben?status=ausstehend&limit=20")
elif cmd == "dashboard":
    st, body = get("/api/verwalter/dashboard")
elif cmd == "flags":
    st, body = get("/api/verwalter/feature-flags")
elif cmd == "fristen-batch":
    objekt = os.environ.get("OBJEKT_ID", "")
    if not objekt:
        st, ob = get("/api/verwalter/objekte")
        data = json.loads(ob)
        objekte = data.get("objekte") or []
        if not objekte:
            print("Kein Objekt — zuerst OBJEKT_ID setzen oder Objekt anlegen"); sys.exit(1)
        objekt = objekte[0]["id"]
    start = os.environ.get("START_DATE") or __import__("datetime").date.today().isoformat()
    st, body = post("/api/verwalter/fristen/batch-vorgaenge", {
        "objektId": objekt, "startDate": start,
    })
else:
    print("Unbekannt"); sys.exit(1)

print(f"HTTP {st}")
try:
    print(json.dumps(json.loads(body), indent=2, ensure_ascii=False))
except Exception:
    print(body[:2000])
PY
    ;;
  help|*)
    echo "Verwalter CLI — Befehle:"
    echo "  health          — /api/health (öffentlich)"
    echo "  qa              — vollständiges QA-Pack"
    echo "  migrate-status  — Migrations-Stand aus Health"
    echo "  dashboard       — Dashboard-Stats (Login)"
    echo "  events          — letzte Events (Login)"
    echo "  freigaben       — ausstehende Freigaben (Login)"
    echo "  fristen-batch   — alle Fristen → Vorgänge (Login, OBJEKT_ID optional)"
    echo "  flags           — Feature-Flags (Login)"
    ;;
esac
