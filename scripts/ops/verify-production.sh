#!/usr/bin/env bash
# Schnell-Check Produktion — Health, Quiz-Guard, öffentliche Seiten
set -euo pipefail

BASE="${1:-https://immobilien-akademie-smart.de}"

echo "=== Health ==="
curl -s "${BASE}/api/health" | jq '{ok, db, migrations}' || echo "jq fehlt — rohe Antwort:"
curl -s "${BASE}/api/health" | head -c 500
echo ""

echo ""
echo "=== Quiz-Guard (403 erwartet) ==="
CODE=$(curl -s -o /dev/null -w "%{http_code}" "${BASE}/data/all-questions.json")
echo "HTTP ${CODE}"
test "$CODE" = "403" || echo "WARNUNG: erwartet 403"

echo ""
echo "=== B2B Landing ==="
CODE=$(curl -s -o /dev/null -w "%{http_code}" "${BASE}/fuer-maklerbueros")
echo "HTTP ${CODE}"

echo ""
echo "=== Stripe Live Admin (Login nötig für Details) ==="
echo "${BASE}/admin/stripe-live"

echo ""
echo "Fertig."
