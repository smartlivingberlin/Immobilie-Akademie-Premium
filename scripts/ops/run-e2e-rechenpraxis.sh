#!/usr/bin/env bash
# E2E Rechenpraxis + Audio — Passwort wird unsichtbar abgefragt (nicht in History)
set -euo pipefail

cd "$(dirname "$0")/../.."
BASE="${OPS_BASE_URL:-https://immobilien-akademie-smart.de}"

if [[ -z "${B2B_ADMIN_PASSWORD:-}" && -z "${TEST_ADMIN_PASSWORD:-}" ]]; then
  read -r -s -p "Admin-Passwort (Eingabe unsichtbar): " B2B_ADMIN_PASSWORD
  echo ""
  export B2B_ADMIN_PASSWORD
fi

export B2B_ADMIN_EMAIL="${B2B_ADMIN_EMAIL:-${TEST_ADMIN_EMAIL:-alisadgadyri38@gmail.com}}"
export PLAYWRIGHT_BASE_URL="$BASE"

echo "=== Login-Check ==="
bash scripts/ops/test-admin-login.sh

echo "=== E2E Rechenpraxis P0 + Modul-3 Audio ==="
npx playwright test tests/e2e/24-rechenpraxis-p0-module3-audio.spec.ts --project=chromium

echo "Fertig."
