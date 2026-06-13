#!/usr/bin/env bash
# Prüft Gesetzeslinks auf bekannte falsche Slugs (gesetze-im-internet.de)
set -euo pipefail

ROOT="${1:-client}"
echo "=== Audit Gesetzeslinks in $ROOT ==="

BAD_PATTERNS=(
  'gesetze-im-internet.de/maklerv'
  'gesetze-im-internet.de/heimmindbauvou'
  'gesetze-im-internet.de/weg/'
  'gesetze-im-internet.de/grundstvg'
  'gesetze-im-internet.de/grdstvg'
  'gesetze-im-internet.de/immowertv/'
)

FOUND=0
for pat in "${BAD_PATTERNS[@]}"; do
  hits=$(rg -l "$pat" "$ROOT" 2>/dev/null || true)
  if [[ -n "$hits" ]]; then
    echo ""
    echo "FEHLER — Muster: $pat"
    rg -n "$pat" "$ROOT" 2>/dev/null | head -20
    FOUND=$((FOUND + 1))
  fi
done

echo ""
echo "=== Korrekte Slugs (Stichprobe) ==="
echo "WEG  → woeigg"
echo "MaBV → mabv"
echo "GRStVG → grstvg"
echo "ImmoWertV → immowertv_2021"

if [[ "$FOUND" -eq 0 ]]; then
  echo ""
  echo "OK: Keine bekannten falschen Muster gefunden."
  exit 0
fi

echo ""
echo "WARNUNG: $FOUND Problem-Muster gefunden."
exit 1
