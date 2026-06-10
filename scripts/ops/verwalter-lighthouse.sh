#!/usr/bin/env bash
# Lighthouse gegen Verwalter-Buchungen — WSL/Playwright-Chromium
set -euo pipefail

BASE="${1:-https://immobilien-akademie-smart.de/app/verwalter/buchungen}"
OUT="${2:-./verwalter-lighthouse.json}"

if ! command -v pnpm >/dev/null 2>&1; then
  echo "pnpm fehlt"
  exit 1
fi

pnpm exec playwright install chromium >/dev/null 2>&1 || true

CHROME=""
for candidate in \
  "$(find ~/.cache/ms-playwright -type f -name chrome-headless-shell 2>/dev/null | head -1)" \
  "$(find ~/.cache/ms-playwright -type f -path '*/chrome-linux/chrome' 2>/dev/null | head -1)"; do
  if [[ -n "$candidate" && -x "$candidate" ]]; then
    CHROME="$candidate"
    break
  fi
done

if [[ -z "$CHROME" ]]; then
  echo "Kein Playwright-Chromium gefunden."
  echo "Alternative: https://pagespeed.web.dev/analysis?url=${BASE}"
  exit 1
fi

if [[ "$(uname -m)" == "aarch64" || "$(uname -m)" == "arm64" ]]; then
  echo "Hinweis: Lighthouse + Playwright-Chromium auf ARM/WSL oft nicht kompatibel."
  echo "Nutze PageSpeed: https://pagespeed.web.dev/analysis?url=${BASE}"
fi

echo "Chrome: $CHROME"
if ! "$CHROME" --version >/dev/null 2>&1; then
  echo "Chromium startet nicht — fehlende WSL-Libs?"
  echo "  sudo apt-get update && sudo apt-get install -y libnss3 libatk-bridge2.0-0 libdrm2 libxkbcommon0 libgbm1 libasound2 libxcomposite1 libxdamage1"
  echo "Oder PageSpeed: https://pagespeed.web.dev/analysis?url=${BASE}"
  exit 1
fi

npx --yes lighthouse@12 "$BASE" \
  --chrome-path="$CHROME" \
  --only-categories=performance,accessibility,best-practices \
  --chrome-flags="--headless=new --no-sandbox --disable-dev-shm-usage" \
  --output=json \
  --output-path="$OUT"

if command -v jq >/dev/null 2>&1; then
  jq '.categories | to_entries[] | {id: .key, score: .value.score}' "$OUT"
else
  echo "Report: $OUT"
fi
