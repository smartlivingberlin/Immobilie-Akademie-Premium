#!/usr/bin/env bash
# Admin-Login gegen Prod testen (JSON-sicher, auch bei Sonderzeichen im Passwort)
set -euo pipefail

BASE="${OPS_BASE_URL:-https://immobilien-akademie-smart.de}"
EMAIL="${B2B_ADMIN_EMAIL:-${TEST_ADMIN_EMAIL:-alisadgadyri38@gmail.com}}"

if [[ -z "${B2B_ADMIN_PASSWORD:-}" && -z "${TEST_ADMIN_PASSWORD:-}" ]]; then
  read -r -s -p "Admin-Passwort (Eingabe unsichtbar): " B2B_ADMIN_PASSWORD
  echo ""
  export B2B_ADMIN_PASSWORD
fi

python3 - <<'PY'
import json
import os
import sys
import urllib.error
import urllib.request

base = os.environ.get("OPS_BASE_URL", "https://immobilien-akademie-smart.de")
email = os.environ.get("B2B_ADMIN_EMAIL") or os.environ.get("TEST_ADMIN_EMAIL") or "alisadgadyri38@gmail.com"
password = os.environ.get("B2B_ADMIN_PASSWORD") or os.environ.get("TEST_ADMIN_PASSWORD") or ""

placeholders = {
    "DEIN_PASSWORT", "DEIN_ECHTES_PASSWORT", "DeinEchtesPasswort",
    "dein echtes Passwort", "<test-password>",
}
if not password or password in placeholders:
    print("FEHLER: Kein Passwort gesetzt (B2B_ADMIN_PASSWORD oder TEST_ADMIN_PASSWORD)", file=sys.stderr)
    sys.exit(1)

payload = json.dumps({"email": email, "password": password}).encode()
req = urllib.request.Request(
    f"{base}/api/auth/login",
    data=payload,
    headers={"Content-Type": "application/json"},
    method="POST",
)
try:
    with urllib.request.urlopen(req, timeout=15) as resp:
        print(f"HTTP {resp.status}")
        print(resp.read().decode())
except urllib.error.HTTPError as err:
    print(f"HTTP {err.code}")
    print(err.read().decode())
    sys.exit(1)
PY
