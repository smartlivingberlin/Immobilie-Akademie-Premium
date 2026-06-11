#!/usr/bin/env bash
# KI-Tutor API-Tests per Terminal (ohne Browser/F12)
# Passwort wird interaktiv abgefragt — nicht in der Kommandozeile eingeben.
#
# Nutzung:
#   ./scripts/ops/test-ki-tutor-cli.sh
# Optional:
#   OPS_BASE_URL=http://localhost:3000 ./scripts/ops/test-ki-tutor-cli.sh
#   TEST_EMAIL=meine@email.de ./scripts/ops/test-ki-tutor-cli.sh   # nur E-Mail vorausfüllen
set -euo pipefail

BASE="${OPS_BASE_URL:-https://immobilien-akademie-smart.de}"
EMAIL="${TEST_EMAIL:-${B2B_ADMIN_EMAIL:-}}"
PASSWORD="${TEST_PASSWORD:-${B2B_ADMIN_PASSWORD:-}}"
COOKIE_JAR="$(mktemp)"
trap 'rm -f "$COOKIE_JAR"' EXIT

if [[ -z "$EMAIL" ]]; then
  read -r -p "E-Mail: " EMAIL
fi

if [[ -z "$PASSWORD" ]]; then
  read -r -s -p "Passwort (Eingabe unsichtbar, Enter zum Bestätigen): " PASSWORD
  echo ""
fi

if [[ -z "$EMAIL" || -z "$PASSWORD" ]]; then
  echo "FEHLER: E-Mail und Passwort sind erforderlich."
  exit 1
fi

# Login per Python — sicher bei Sonderzeichen im Passwort
python3 - "$BASE" "$EMAIL" "$PASSWORD" "$COOKIE_JAR" <<'PY'
import http.cookiejar
import json
import sys
import urllib.error
import urllib.request

base, email, password, jar_path = sys.argv[1:5]
cj = http.cookiejar.MozillaCookieJar(jar_path)
cj.save = lambda *a, **k: None  # nur für urllib-Setup

opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))
payload = json.dumps({"email": email, "password": password}).encode()
req = urllib.request.Request(
    f"{base}/api/auth/login",
    data=payload,
    headers={"Content-Type": "application/json"},
    method="POST",
)
try:
    with opener.open(req, timeout=20) as resp:
        print(f"=== 1) Login → Session-Cookie ===")
        print(f"HTTP {resp.status}")
        print(resp.read().decode()[:300])
except urllib.error.HTTPError as err:
    print(f"=== 1) Login → Session-Cookie ===")
    print(f"HTTP {err.code}")
    print(err.read().decode())
    sys.exit(1)

# Cookie-Jar für curl speichern (Netscape-Format)
with open(jar_path, "w") as f:
    f.write("# Netscape HTTP Cookie File\n")
    for c in cj:
        secure = "TRUE" if c.secure else "FALSE"
        f.write(f"{c.domain}\tTRUE\t{c.path}\t{secure}\t0\t{c.name}\t{c.value}\n")
PY

echo ""
echo "=== 2) Vorlesen (Browser-Stimme) ==="
echo "Hinweis: Vorlesen läuft kostenlos im Browser (speechSynthesis)."
echo "Terminal-Test nicht möglich — in der App auf „Vorlesen“ klicken."

echo ""
echo "=== 3) RAG-Tutor /api/ai/rag-tutor ==="
RAG_CODE=$(curl -s -o /tmp/rag.json -w "%{http_code}" \
  -b "$COOKIE_JAR" \
  -X POST "${BASE}/api/ai/rag-tutor" \
  -H "Content-Type: application/json" \
  -d '{"question":"Was ist §34c GewO?","moduleId":1,"context":[]}')
echo "HTTP ${RAG_CODE}"
head -c 400 /tmp/rag.json; echo ""

echo ""
echo "=== 4) Mikrofon-Header (Permissions-Policy) ==="
curl -sI "${BASE}/" | grep -i permissions-policy | grep -i microphone || echo "(microphone=(self) nach Deploy prüfen)"

echo ""
echo "Fertig."
