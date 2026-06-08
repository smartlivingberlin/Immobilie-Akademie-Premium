#!/usr/bin/env bash
# B2B Team-Code Smoke-Test komplett per curl (ohne Browser)
set -euo pipefail

BASE_URL="${BASE_URL:-https://immobilien-akademie-smart.de}"
ADMIN_EMAIL="${B2B_ADMIN_EMAIL:-}"
ADMIN_PASSWORD="${B2B_ADMIN_PASSWORD:-}"
MEMBER_EMAIL="${B2B_MEMBER_EMAIL:-}"
MEMBER_PASSWORD="${B2B_MEMBER_PASSWORD:-}"
MAX_USES="${B2B_TEAM_MAX_USES:-10}"
WORKDIR="${B2B_SMOKE_DIR:-/tmp/b2b-smoke-$$}"

mkdir -p "$WORKDIR"
ADMIN_COOKIE="$WORKDIR/admin-cookies.txt"
MEMBER_COOKIE="$WORKDIR/member-cookies.txt"

die() { echo "ERROR: $*" >&2; exit 1; }

need_cmd() {
  command -v "$1" >/dev/null 2>&1 || die "$1 fehlt (z.B. apt install $1)"
}

json_body() {
  jq -n --arg e "${1:-}" --arg p "${2:-}" '{email:$e,password:$p}'
}

need_cmd curl
need_cmd jq

echo "=== 1) Health ==="
HEALTH=$(curl -fsS "$BASE_URL/api/health")
echo "$HEALTH" | jq '{ok, db}'
echo "$HEALTH" | jq -e '.ok == true' >/dev/null || die "Health check failed"

[[ -n "$ADMIN_EMAIL" && -n "$ADMIN_PASSWORD" ]] || die "Setze B2B_ADMIN_EMAIL und B2B_ADMIN_PASSWORD"

echo ""
echo "=== 2) Admin Login ==="
LOGIN=$(curl -fsS -c "$ADMIN_COOKIE" -X POST "$BASE_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d "$(json_body "$ADMIN_EMAIL" "$ADMIN_PASSWORD")")
echo "$LOGIN" | jq .
echo "$LOGIN" | jq -e '.ok == true' >/dev/null || die "Admin-Login fehlgeschlagen"

echo ""
echo "=== 3) B2B Status ==="
STATUS=$(curl -fsS -b "$ADMIN_COOKIE" "$BASE_URL/api/b2b/onboarding/status")
echo "$STATUS" | jq .
echo "$STATUS" | jq -e '.hasTenant == true' >/dev/null || die "Kein B2B-Tenant — zuerst B2B-Kauf abschließen"

COMPANY=$(echo "$STATUS" | jq -r '.tenant.companyName // "Maklerbüro"')
COMPLETED=$(echo "$STATUS" | jq -r '.completed')

if [[ "$COMPLETED" != "true" ]]; then
  echo ""
  echo "=== 4) Branding speichern (für completed) ==="
  BRAND=$(curl -fsS -b "$ADMIN_COOKIE" -X POST "$BASE_URL/api/b2b/onboarding/branding" \
    -H "Content-Type: application/json" \
    -d "$(jq -n --arg c "$COMPANY" '{companyName:$c, primaryColor:"#2563eb", welcomeText:"Willkommen im Team-Portal"}')")
  echo "$BRAND" | jq .
  echo "$BRAND" | jq -e '.ok == true' >/dev/null || die "Branding fehlgeschlagen"
else
  echo ""
  echo "=== 4) Branding bereits completed — übersprungen ==="
fi

echo ""
echo "=== 5) Team-Code erstellen ==="
CREATE=$(curl -fsS -b "$ADMIN_COOKIE" -X POST "$BASE_URL/api/b2b/onboarding/team-codes" \
  -H "Content-Type: application/json" \
  -d "$(jq -n --arg m "$MAX_USES" '{maxUses: ($m|tonumber), note:"CLI smoke test"}')")
echo "$CREATE" | jq .

TEAM_CODE=$(echo "$CREATE" | jq -r '.code.code // .code // empty')
if [[ -z "$TEAM_CODE" || "$TEAM_CODE" == "null" ]]; then
  echo "POST ohne code.code — versuche GET-Liste..."
  LIST=$(curl -fsS -b "$ADMIN_COOKIE" "$BASE_URL/api/b2b/onboarding/team-codes")
  echo "$LIST" | jq .
  TEAM_CODE=$(echo "$LIST" | jq -r '.codes[0].code // empty')
fi
[[ -n "$TEAM_CODE" && "$TEAM_CODE" != "null" ]] || die "Kein Team-Code erhalten"
echo "TEAM_CODE=$TEAM_CODE" | tee "$WORKDIR/team-code.txt"

echo ""
echo "=== 6) Team-Code Liste (Admin) ==="
curl -fsS -b "$ADMIN_COOKIE" "$BASE_URL/api/b2b/onboarding/team-codes" | jq .

echo ""
echo "=== 7) Code einlösen ==="
if [[ -n "$MEMBER_EMAIL" && -n "$MEMBER_PASSWORD" ]]; then
  echo "Mit Mitglieds-Login: $MEMBER_EMAIL"
  REG=$(curl -sS -X POST "$BASE_URL/api/auth/register" \
    -H "Content-Type: application/json" \
    -d "$(jq -n --arg e "$MEMBER_EMAIL" --arg p "$MEMBER_PASSWORD" '{email:$e,password:$p,name:"Team Mitglied"}')" || true)
  echo "$REG" | jq . 2>/dev/null || echo "(Register übersprungen — Konto existiert evtl. schon)"
  MEMBER_LOGIN=$(curl -fsS -c "$MEMBER_COOKIE" -X POST "$BASE_URL/api/auth/login" \
    -H "Content-Type: application/json" \
    -d "$(json_body "$MEMBER_EMAIL" "$MEMBER_PASSWORD")")
  echo "$MEMBER_LOGIN" | jq .
  REDEEM=$(curl -fsS -b "$MEMBER_COOKIE" -c "$MEMBER_COOKIE" -X POST "$BASE_URL/api/auth/redeem-code" \
    -H "Content-Type: application/json" \
    -d "$(jq -n --arg c "$TEAM_CODE" '{code:$c}')")
else
  echo "Ohne Mitglieds-Login (Gast-Session via access:CODE)"
  REDEEM=$(curl -fsS -c "$MEMBER_COOKIE" -X POST "$BASE_URL/api/auth/redeem-code" \
    -H "Content-Type: application/json" \
    -d "$(jq -n --arg c "$TEAM_CODE" '{code:$c}')")
fi
echo "$REDEEM" | jq .
echo "$REDEEM" | jq -e '.ok == true' >/dev/null || die "Code-Einlösung fehlgeschlagen"

echo ""
echo "=== 8) Session nach Einlösung ==="
curl -fsS -b "$MEMBER_COOKIE" "$BASE_URL/api/auth/me" | jq .

echo ""
echo "=== FERTIG ==="
echo "Team-Code: $TEAM_CODE"
echo "Cookies:   $ADMIN_COOKIE (Admin), $MEMBER_COOKIE (Mitglied/Gast)"
echo "WORKDIR:   $WORKDIR"
