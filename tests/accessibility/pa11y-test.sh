#!/bin/bash
BASE="https://immobilie-akademie-premium-production.up.railway.app"
echo "♿ BARRIEREFREIHEIT AUDIT (WCAG 2.1)"
echo "====================================="

for page in "/" "/login" "/kurse" "/glossary" "/impressum" "/datenschutz"; do
  echo ""
  echo "Teste: $BASE$page"
  pa11y "$BASE$page" \
    --standard WCAG2AA \
    --reporter cli \
    --timeout 30000 \
    2>/dev/null | head -20 || echo "  ⚠️ Pa11y Test fehlgeschlagen"
done
