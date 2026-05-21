#!/bin/bash
BASE="https://immobilien-akademie-smart.de"
echo "🔦 LIGHTHOUSE PERFORMANCE AUDIT"
echo "================================"

for page in "/" "/login" "/kurse"; do
  echo ""
  echo "Teste: $BASE$page"
  npx lighthouse "$BASE$page" \
    --output=json \
    --output-path="/tmp/lighthouse-$(echo $page | tr '/' '-').json" \
    --chrome-flags="--headless --no-sandbox" \
    --quiet 2>/dev/null && \
  python3 -c "
import json, sys
with open('/tmp/lighthouse-$(echo $page | tr '/' '-').json') as f:
    d = json.load(f)
cats = d.get('categories', {})
print(f'  Performance:    {round(cats.get(\"performance\",{}).get(\"score\",0)*100)}%')
print(f'  Accessibility:  {round(cats.get(\"accessibility\",{}).get(\"score\",0)*100)}%')
print(f'  Best Practices: {round(cats.get(\"best-practices\",{}).get(\"score\",0)*100)}%')
print(f'  SEO:           {round(cats.get(\"seo\",{}).get(\"score\",0)*100)}%')
" 2>/dev/null || echo "  ⚠️ Lighthouse Analyse fehlgeschlagen"
done
