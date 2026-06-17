#!/usr/bin/env bash
# S231L — Deploy-SHA / Runtime-Activation Reality Gate (read-only)
# Prüft Live-Runtime gegen erwarteten Merge-Commit — kein Deploy, kein Replay, keine DB/Stripe/Railway-Mutation.
set -euo pipefail

BASE="${1:-https://immobilien-akademie-smart.de}"
WWW_BASE="${WWW_BASE:-https://www.immobilien-akademie-smart.de}"
EXPECTED_SHA="${EXPECTED_SHA:-006076e37658e876d213e16a16eab6a2fc7c47d3}"
STRICT_SHA="${STRICT_SHA:-1}"

pass=0
fail=0
partial=0

check() {
  local label="$1"
  local ok="$2"
  if [ "$ok" = "1" ]; then
    echo "PASS  $label"
    pass=$((pass + 1))
  else
    echo "FAIL  $label"
    fail=$((fail + 1))
  fi
}

warn() {
  local label="$1"
  echo "WARN  $label"
  partial=$((partial + 1))
}

echo "=== S231L Deploy-SHA / Runtime-Activation Reality Gate ==="
echo "base=${BASE}"
echo "www=${WWW_BASE}"
echo "expected_sha=${EXPECTED_SHA}"
echo "strict_sha=${STRICT_SHA}"
echo ""

HEALTH_JSON="$(curl -fsS "${BASE}/api/health" || true)"
if [ -z "$HEALTH_JSON" ]; then
  echo "FAIL  health root unreachable"
  exit 1
fi

HEALTH_OK="$(printf '%s' "$HEALTH_JSON" | jq -r '.ok // empty')"
HEALTH_DB="$(printf '%s' "$HEALTH_JSON" | jq -r '.db // empty')"
LIVE_SHA="$(printf '%s' "$HEALTH_JSON" | jq -r '.runtime.gitSha // empty')"
LIVE_SHA_SHORT="$(printf '%s' "$HEALTH_JSON" | jq -r '.runtime.gitShaShort // empty')"
LIVE_SHA_SOURCE="$(printf '%s' "$HEALTH_JSON" | jq -r '.runtime.gitShaSource // empty')"
MANUAL_REPLAY="$(printf '%s' "$HEALTH_JSON" | jq -r '.runtime.activation.s231kManualReplayEnabled // empty')"
REPLAY_ROUTE_DEPLOYED="$(printf '%s' "$HEALTH_JSON" | jq -r '.runtime.activation.s231kReplayRouteDeployed // empty')"

check "health root ok=true" "$([ "$HEALTH_OK" = "true" ] && echo 1 || echo 0)"
check "health root db=connected" "$([ "$HEALTH_DB" = "connected" ] && echo 1 || echo 0)"

WWW_CODE="$(curl -s -o /dev/null -w "%{http_code}" "${WWW_BASE}/api/health" || true)"
check "health www HTTP 200" "$([ "$WWW_CODE" = "200" ] && echo 1 || echo 0)"

WEBHOOK_CODE="$(curl -s -o /dev/null -w "%{http_code}" -X POST "${BASE}/api/stripe/webhook" \
  -H "Content-Type: application/json" \
  -d '{}' || true)"
check "unsigned webhook POST = 400" "$([ "$WEBHOOK_CODE" = "400" ] && echo 1 || echo 0)"

REPLAY_ROUTE_CODE="$(curl -s -o /dev/null -w "%{http_code}" -X POST "${BASE}/api/admin/stripe-webhook-replay" \
  -H "Content-Type: application/json" \
  -d '{}' || true)"
check "S231K replay route ohne Login = 401" "$([ "$REPLAY_ROUTE_CODE" = "401" ] && echo 1 || echo 0)"

if [ -n "$LIVE_SHA" ]; then
  LIVE_NORM="$(printf '%s' "$LIVE_SHA" | tr '[:upper:]' '[:lower:]')"
  EXPECTED_NORM="$(printf '%s' "$EXPECTED_SHA" | tr '[:upper:]' '[:lower:]')"
  SHA_MATCH=0
  if [ "$LIVE_NORM" = "$EXPECTED_NORM" ] \
    || [[ "$LIVE_NORM" == "$EXPECTED_NORM"* ]] \
    || [[ "$EXPECTED_NORM" == "$LIVE_NORM"* ]]; then
    SHA_MATCH=1
  fi
  check "deploy SHA matches expected (${LIVE_SHA_SHORT:-?} vs ${EXPECTED_SHA:0:7})" "$SHA_MATCH"
  check "runtime gitShaSource present (${LIVE_SHA_SOURCE})" "$([ -n "$LIVE_SHA_SOURCE" ] && [ "$LIVE_SHA_SOURCE" != "unknown" ] && echo 1 || echo 0)"
else
  if [ "$STRICT_SHA" = "1" ]; then
    check "runtime gitSha available on live /api/health" 0
    warn "deploy SHA not assertable until S231L runtime metadata is live"
  else
    warn "runtime gitSha unavailable (STRICT_SHA=0 — bootstrap mode)"
  fi
fi

if [ "$REPLAY_ROUTE_DEPLOYED" = "true" ]; then
  check "S231K replay route deployed flag=true" 1
elif [ -n "$REPLAY_ROUTE_DEPLOYED" ]; then
  check "S231K replay route deployed flag=true" 0
else
  warn "runtime activation metadata unavailable (pre-S231L deploy)"
fi

if [ "$MANUAL_REPLAY" = "false" ] || [ -z "$MANUAL_REPLAY" ]; then
  check "S231K manual replay disabled in runtime" 1
else
  check "S231K manual replay disabled in runtime" 0
fi

echo ""
echo "summary pass=${pass} fail=${fail} warn=${partial}"
echo "Deploy-SHA live asserted: $([ -n "$LIVE_SHA" ] && echo yes || echo no)"
echo "No real replay executed."
echo "No deploy executed."
echo "No DB/Stripe/Railway mutation executed."

if [ "$fail" -gt 0 ]; then
  echo "RESULT: FAIL"
  exit 1
fi

if [ -n "$LIVE_SHA" ]; then
  echo "RESULT: PASS"
  exit 0
fi

echo "RESULT: PARTIAL (guards ok, deploy SHA not yet assertable)"
exit 2
