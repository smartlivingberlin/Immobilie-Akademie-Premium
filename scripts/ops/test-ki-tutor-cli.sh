#!/usr/bin/env bash
# KI-Tutor API-Tests per Terminal (ohne Browser/F12)
# Nutzung:
#   export TEST_EMAIL="ihre@email.de"
#   export TEST_PASSWORD="IhrPasswort"
#   ./scripts/ops/test-ki-tutor-cli.sh
# Optional: OPS_BASE_URL=http://localhost:3000 für lokale Tests
set -euo pipefail

BASE="${OPS_BASE_URL:-https://immobilien-akademie-smart.de}"
EMAIL="${TEST_EMAIL:-${B2B_ADMIN_EMAIL:-}}"
PASSWORD="${TEST_PASSWORD:-${B2B_ADMIN_PASSWORD:-}}"
COOKIE_JAR="$(mktemp)"
trap 'rm -f "$COOKIE_JAR"' EXIT

if [[ -z "$EMAIL" || -z "$PASSWORD" ]]; then
  echo "FEHLER: TEST_EMAIL und TEST_PASSWORD setzen (oder B2B_ADMIN_EMAIL / B2B_ADMIN_PASSWORD)"
  exit 1
fi

echo "=== 1) Login → Session-Cookie ==="
LOGIN_CODE=$(curl -s -o /tmp/login.json -w "%{http_code}" \
  -c "$COOKIE_JAR" -b "$COOKIE_JAR" \
  -X POST "${BASE}/api/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"${EMAIL}\",\"password\":\"${PASSWORD}\"}")
echo "HTTP ${LOGIN_CODE}"
head -c 300 /tmp/login.json; echo ""

if [[ "$LOGIN_CODE" != "200" ]]; then
  echo "Login fehlgeschlagen — keine weiteren Tests."
  exit 1
fi

echo ""
echo "=== 2) TTS /api/ai/tts (Vorlesen) ==="
TTS_CODE=$(curl -s -o /tmp/tts.mp3 -w "%{http_code}" \
  -c "$COOKIE_JAR" -b "$COOKIE_JAR" \
  -X POST "${BASE}/api/ai/tts" \
  -H "Content-Type: application/json" \
  -H "Accept: audio/mpeg" \
  -d '{"text":"Hallo, dies ist ein Test der Vorlesefunktion."}')
echo "HTTP ${TTS_CODE}"
if [[ "$TTS_CODE" = "200" ]]; then
  BYTES=$(wc -c < /tmp/tts.mp3)
  echo "Audio-Bytes: ${BYTES}"
  file /tmp/tts.mp3 2>/dev/null || true
else
  head -c 500 /tmp/tts.mp3; echo ""
fi

echo ""
echo "=== 3) RAG-Tutor /api/ai/rag-tutor ==="
RAG_CODE=$(curl -s -o /tmp/rag.json -w "%{http_code}" \
  -c "$COOKIE_JAR" -b "$COOKIE_JAR" \
  -X POST "${BASE}/api/ai/rag-tutor" \
  -H "Content-Type: application/json" \
  -d '{"question":"Was ist §34c GewO?","moduleId":1,"context":[]}')
echo "HTTP ${RAG_CODE}"
head -c 400 /tmp/rag.json; echo ""

echo ""
echo "=== 4) Permissions-Policy (Mikrofon) ==="
curl -sI "${BASE}/" | grep -i permissions-policy || echo "(Header nicht gefunden — nach Deploy prüfen)"

echo ""
echo "=== 5) Ohne Cookie → 401 erwartet ==="
UNAUTH=$(curl -s -o /dev/null -w "%{http_code}" \
  -X POST "${BASE}/api/ai/tts" \
  -H "Content-Type: application/json" \
  -d '{"text":"test"}')
echo "TTS ohne Cookie: HTTP ${UNAUTH} (401 erwartet)"

echo ""
echo "Fertig. Cookie-Datei war temporär: $COOKIE_JAR"
