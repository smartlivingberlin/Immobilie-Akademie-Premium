#!/bin/bash
BASE="https://immobilie-akademie-premium-production.up.railway.app"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
check() {
  CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$1")
  [ "$CODE" = "200" ] && echo "[$TIMESTAMP] ✅ $1: OK" || echo "[$TIMESTAMP] ❌ $1: $CODE — DOWN!"
}
check "$BASE/"
check "$BASE/api/health"
check "$BASE/api/stripe/products"
check "$BASE/api/portal-phase"
