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

# Login: ENV, Magic-Link oder interaktiv (Passwort unsichtbar)
ensure_verwalter_login() {
  if [[ -n "${MAGIC_LINK_SECRET:-}" ]]; then
    return 0
  fi
  if [[ -n "${B2B_ADMIN_PASSWORD:-}" || -n "${TEST_ADMIN_PASSWORD:-}" ]]; then
    return 0
  fi
  if [[ ! -t 0 ]]; then
    echo "Login nötig: Passwort interaktiv nur im Terminal."
    echo "  read -s -p 'Passwort: ' B2B_ADMIN_PASSWORD; echo; export B2B_ADMIN_PASSWORD"
    echo "  pnpm run ops:verwalter-cli $CMD"
    exit 1
  fi
  local email="${B2B_ADMIN_EMAIL:-${TEST_ADMIN_EMAIL:-alisadgadyri38@gmail.com}}"
  read -r -p "E-Mail [$email]: " input_email
  if [[ -n "$input_email" ]]; then
    export B2B_ADMIN_EMAIL="$input_email"
  else
    export B2B_ADMIN_EMAIL="$email"
  fi
  read -r -s -p "Passwort: " B2B_ADMIN_PASSWORD
  echo ""
  export B2B_ADMIN_PASSWORD
}

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
  events|freigaben|fristen-batch|dashboard|flags|mahnwesen|mahnungen|etv|etv-list|inbox|inbox-ingest)
    ensure_verwalter_login
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
elif cmd == "mahnungen":
    st, body = get("/api/verwalter/mahnwesen/vorgaenge")
elif cmd == "mahnwesen":
    objekt = os.environ.get("OBJEKT_ID", "")
    if not objekt:
        st, ob = get("/api/verwalter/objekte")
        data = json.loads(ob)
        objekte = data.get("objekte") or []
        if not objekte:
            print("Kein Objekt"); sys.exit(1)
        objekt = objekte[0]["id"]
        einheit = (objekte[0].get("einheiten") or [{}])[0]
    else:
        einheit = {}
    st, body = post("/api/verwalter/mahnwesen/start", {
        "objektId": objekt,
        "einheitId": os.environ.get("EINHEIT_ID") or einheit.get("id"),
        "eigentuemerName": os.environ.get("EIGENTUEMER") or einheit.get("eigentuemerName") or "Eigentümer",
        "betrag": float(os.environ.get("BETRAG", "100")),
        "faelligSeit": os.environ.get("FAELLIG_SEIT") or __import__("datetime").date.today().isoformat(),
    })
elif cmd == "etv-list":
    st, body = get("/api/verwalter/etv/vorgaenge")
elif cmd == "etv":
    objekt = os.environ.get("OBJEKT_ID", "")
    if not objekt:
        st, ob = get("/api/verwalter/objekte")
        data = json.loads(ob)
        objekte = data.get("objekte") or []
        if not objekte:
            print("Kein Objekt"); sys.exit(1)
        objekt = objekte[0]["id"]
    st, body = post("/api/verwalter/etv/start", {
        "objektId": objekt,
        "etvDatum": os.environ.get("ETV_DATUM") or __import__("datetime").date.today().isoformat(),
        "etvUhrzeit": os.environ.get("ETV_UHRZEIT") or "18:00 Uhr",
        "etvOrt": os.environ.get("ETV_ORT") or "Gemeinschaftsraum",
        "tagesordnung": os.environ.get("TAGESORDNUNG") or "1. Begrüßung\n2. Wirtschaftsplan\n3. Sonstiges",
    })
elif cmd == "inbox":
    st, body = get("/api/verwalter/inbox")
elif cmd == "inbox-ingest":
    st, body = post("/api/verwalter/inbox/ingest", {
        "from": os.environ.get("FROM") or "eigentuemer@example.com",
        "subject": os.environ.get("SUBJECT") or "Test E-Mail Inbox",
        "text": os.environ.get("TEXT") or "Testinhalt für Inbox-Workflow",
    })
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
    echo "  dashboard       — Dashboard-Stats (fragt Passwort unsichtbar)"
    echo "  events          — letzte Events (fragt Passwort unsichtbar)"
    echo "  freigaben       — ausstehende Freigaben (fragt Passwort unsichtbar)"
    echo "  fristen-batch   — alle Fristen → Vorgänge (OBJEKT_ID optional)"
    echo "  flags           — Feature-Flags (fragt Passwort unsichtbar)"
    echo "  mahnungen       — aktive Mahnungs-Vorgänge (Login)"
    echo "  mahnwesen       — Stufe-1 starten (Login, BETRAG/EIGENTUEMER optional)"
    echo "  etv             — ETV starten (Login, ETV_DATUM/TAGESORDNUNG optional)"
    echo "  etv-list        — aktive ETV-Vorgänge (Login)"
    echo "  inbox           — Inbox-Liste (Login, VERWALTER_INBOX_ENABLED=1)"
    echo "  inbox-ingest    — Test-E-Mail simulieren (Login)"
    echo ""
    echo "Login-Alternative: read -s -p 'Passwort: ' B2B_ADMIN_PASSWORD; echo; export B2B_ADMIN_PASSWORD"
    ;;
esac
