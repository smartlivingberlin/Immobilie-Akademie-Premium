#!/usr/bin/env bash
# Verwalter Suite — QA-Pack (öffentlich + optional eingeloggt)
# Nutzung: bash scripts/ops/verwalter-qa-pack.sh
# Mit Login: B2B_ADMIN_PASSWORD='...' bash scripts/ops/verwalter-qa-pack.sh
set -euo pipefail

BASE="${OPS_BASE_URL:-https://immobilien-akademie-smart.de}"
REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$REPO_ROOT"

echo "=============================================="
echo " VERWALTER QA-PACK — $BASE"
echo " $(date -u +%Y-%m-%dT%H:%M:%SZ)"
echo "=============================================="

pass=0
fail=0
warn=0

check_http() {
  local label="$1"
  local url="$2"
  local expect="$3"
  local code
  code=$(curl -s -o /dev/null -w "%{http_code}" -L --max-time 20 "$url" || echo "000")
  if [[ "$code" == "$expect" ]]; then
    echo "  OK   [$code] $label"
    pass=$((pass + 1))
  else
    echo "  FAIL [$code] $label (erwartet $expect)"
    fail=$((fail + 1))
  fi
}

check_api_code() {
  local label="$1"
  local url="$2"
  local expect="$3"
  local code
  code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 15 "$url" || echo "000")
  if [[ "$code" == "$expect" ]]; then
    echo "  OK   [$code] $label"
    pass=$((pass + 1))
  else
    echo "  FAIL [$code] $label (erwartet $expect)"
    fail=$((fail + 1))
  fi
}

echo ""
echo "── A) Öffentliche Seiten (SPA → 200) ──"
PAGES=(
  "/"
  "/verwalter-rechner"
  "/kurs/modul-3-weg-verwalter"
  "/app/verwalter/objekte"
  "/app/verwalter/vorgaenge"
  "/app/verwalter/buchungen"
  "/app/verwalter/vorlagen"
  "/app/verwalter/fristen"
)
for p in "${PAGES[@]}"; do
  check_http "$p" "${BASE}${p}" "200"
done

echo ""
echo "── B) API ohne Login (Schutz) ──"
check_api_code "GET /api/health" "${BASE}/api/health" "200"
check_api_code "GET /api/verwalter/objekte" "${BASE}/api/verwalter/objekte" "401"
check_api_code "GET /api/verwalter/dashboard" "${BASE}/api/verwalter/dashboard" "401"
check_api_code "GET /api/admin/mysql-health" "${BASE}/api/admin/mysql-health" "401"

echo ""
echo "── C) Health-Details ──"
if command -v jq >/dev/null 2>&1; then
  curl -s "${BASE}/api/health" | jq '{ok, db, latencyMs, migrations}'
else
  curl -s "${BASE}/api/health" | head -c 400
  echo ""
  warn=$((warn + 1))
  echo "  HINWEIS: jq installieren für schönere Ausgabe (sudo apt install jq)"
fi

echo ""
echo "── D) Eingeloggt (optional) ──"
if [[ -n "${B2B_ADMIN_PASSWORD:-}" || -n "${TEST_ADMIN_PASSWORD:-}" || -n "${MAGIC_LINK_SECRET:-}" ]]; then
  python3 - <<'PY'
import json
import os
import sys
import http.cookiejar
import urllib.request

base = os.environ.get("OPS_BASE_URL", "https://immobilien-akademie-smart.de")
email = os.environ.get("B2B_ADMIN_EMAIL") or os.environ.get("TEST_ADMIN_EMAIL") or "alisadgadyri38@gmail.com"
password = os.environ.get("B2B_ADMIN_PASSWORD") or os.environ.get("TEST_ADMIN_PASSWORD") or ""
magic = os.environ.get("MAGIC_LINK_SECRET", "")

cj = http.cookiejar.CookieJar()
opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))

def get(path):
    req = urllib.request.Request(f"{base}{path}")
    with opener.open(req, timeout=20) as r:
        return r.status, r.read().decode()[:500]

def post(path, data):
    payload = json.dumps(data).encode()
    req = urllib.request.Request(
        f"{base}{path}", data=payload,
        headers={"Content-Type": "application/json"}, method="POST",
    )
    with opener.open(req, timeout=20) as r:
        return r.status, r.read().decode()[:500]

logged_in = False
if magic:
    try:
        urllib.request.urlopen(f"{base}/api/auth/magic?secret={magic}", timeout=15)
        st, body = get("/api/auth/me")
        if st == 200 and ("email" in body or "name" in body):
            logged_in = True
            print("  OK   Login via MAGIC_LINK_SECRET")
    except Exception as e:
        print(f"  FAIL Magic-Login: {e}")

if not logged_in and password:
    try:
        st, body = post("/api/auth/login", {"email": email, "password": password})
        if st == 200:
            logged_in = True
            print(f"  OK   Login als {email}")
        else:
            print(f"  FAIL Login HTTP {st}: {body[:200]}")
            sys.exit(1)
    except Exception as e:
        print(f"  FAIL Login: {e}")
        sys.exit(1)

if not logged_in:
    print("  SKIP Kein Passwort/Magic — setze B2B_ADMIN_PASSWORD")
    sys.exit(0)

checks = [
    ("GET /api/verwalter/objekte", "/api/verwalter/objekte"),
    ("GET /api/verwalter/dashboard", "/api/verwalter/dashboard"),
    ("GET /api/verwalter/vorgaenge", "/api/verwalter/vorgaenge"),
    ("GET /api/verwalter/buchungen", "/api/verwalter/buchungen"),
]
for label, path in checks:
    try:
        st, body = get(path)
        ok = st == 200 and '"success":true' in body.replace(" ", "")
        print(f"  {'OK' if ok else 'FAIL'}  [{st}] {label}")
        if ok and "objekte" in path:
            data = json.loads(body)
            print(f"       → {len(data.get('objekte', []))} Objekt(e)")
    except Exception as e:
        print(f"  FAIL {label}: {e}")

try:
    st, body = get("/api/verwalter/export/stammdaten-csv")
    print(f"  {'OK' if st == 200 else 'FAIL'}  [{st}] GET /api/verwalter/export/stammdaten-csv")
except Exception as e:
    print(f"  FAIL stammdaten-csv: {e}")
PY
else
  echo "  SKIP — für API mit Login:"
  echo "       B2B_ADMIN_PASSWORD='...' bash scripts/ops/verwalter-qa-pack.sh"
  warn=$((warn + 1))
fi

echo ""
echo "── E) Playwright (lokal, gegen Prod) ──"
echo "  Einmalig: pnpm exec playwright install chromium"
echo "  Dann:"
echo "  PLAYWRIGHT_BASE_URL=$BASE pnpm exec playwright test \\"
echo "    tests/e2e/26-verwalter-mobile-layout.spec.ts \\"
echo "    tests/e2e/07-verwalter-rechner.spec.ts \\"
echo "    tests/e2e/21-mysql-health.spec.ts \\"
echo "    tests/e2e/22-migration-status.spec.ts \\"
echo "    --project=chromium"

echo ""
echo "── F) Lighthouse (Performance, optional) ──"
echo "  npx --yes lighthouse ${BASE}/app/verwalter/buchungen --only-categories=performance,accessibility,best-practices --chrome-flags='--headless' --output=json --output-path=./verwalter-lighthouse.json"
echo "  Report: cat verwalter-lighthouse.json | jq '.categories | to_entries[] | {id: .key, score: .value.score}'"

echo ""
echo "── G) Externe Tools (Browser öffnen) ──"
echo "  PageSpeed:  https://pagespeed.web.dev/analysis?url=${BASE}/app/verwalter/buchungen"
echo "  Security:   https://securityheaders.com/?q=${BASE}&followRedirects=on"

echo ""
echo "=============================================="
echo " Ergebnis: $pass OK, $fail FAIL, $warn übersprungen/Hinweise"
echo " Copy-Paste diesen Block an Cursor."
echo "=============================================="
[[ "$fail" -eq 0 ]]
