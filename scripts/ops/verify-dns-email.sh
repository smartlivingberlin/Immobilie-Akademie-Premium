#!/usr/bin/env bash
# DNS and Email Verification Check for immobilien-akademie-smart.de
# Read-only verification of core infrastructure records.
# NOTE: HSTS was verified separately via live response headers; this script checks DNS/email only.
set -euo pipefail

DOMAIN="${1:-immobilien-akademie-smart.de}"

info() { echo "  ℹ️  $1"; }
ok()   { echo "  ✅ $1"; }
review() { echo "  🔍 $1"; }
missing() { echo "  ⚠️  $1"; }

echo ""
echo "══════════════════════════════════════════════════════════"
echo "  DNS & Email Infrastructure Check: ${DOMAIN}"
echo "  $(date -u '+%Y-%m-%d %H:%M UTC')"
echo "══════════════════════════════════════════════════════════"
echo ""

echo "── 1. Root & WWW Records ──"
A_ROOT=$(dig +short A "${DOMAIN}" @1.1.1.1 || true)
if [[ -n "$A_ROOT" ]]; then
  ok "Root A-Record: $A_ROOT"
else
  missing "Root A-Record missing"
fi

CNAME_WWW=$(dig +short CNAME "www.${DOMAIN}" @1.1.1.1 || true)
if [[ -n "$CNAME_WWW" ]]; then
  ok "WWW CNAME: $CNAME_WWW"
else
  review "WWW CNAME missing (check if A-record is used instead)"
fi

echo ""
echo "── 2. MX Records (Email Receiving) ──"
MX=$(dig +short MX "${DOMAIN}" @1.1.1.1 | sort -n || true)
if [[ -n "$MX" ]]; then
  echo "$MX" | while read -r line; do ok "MX: $line"; done
else
  missing "No MX records found"
fi

echo ""
echo "── 3. TXT / SPF Records ──"
SPF=$(dig +short TXT "${DOMAIN}" @1.1.1.1 | grep -i spf | tr -d '"' || true)
if [[ -n "$SPF" ]]; then
  info "Record: $SPF"
  if echo "$SPF" | grep -q 'include:'; then
    ok "SPF includes found"
  else
    review "SPF policy found but no includes - verify with current email provider dashboard"
  fi
else
  missing "No SPF record found on root domain"
fi

# Check common subdomains for mail sending
SEND_SPF=$(dig +short TXT "send.${DOMAIN}" @1.1.1.1 | grep -i spf | tr -d '"' || true)
if [[ -n "$SEND_SPF" ]]; then
  ok "Subdomain send.${DOMAIN} has SPF: $SEND_SPF"
fi

echo ""
echo "── 4. DKIM Records (Common Selectors) ──"
# Check common DKIM selectors. Verify active selectors in the current email provider dashboard.
DKIM_RESEND=$(dig +short TXT "resend._domainkey.${DOMAIN}" @1.1.1.1 | head -1 || true)
if [[ -n "$DKIM_RESEND" ]]; then
  ok "DKIM selector 'resend' found"
else
  review "DKIM selector 'resend' missing - verify active selectors in provider dashboard"
fi

echo ""
echo "── 5. DMARC Policy ──"
DMARC=$(dig +short TXT "_dmarc.${DOMAIN}" @1.1.1.1 | tr -d '"' || true)
if [[ -n "$DMARC" ]]; then
  info "Record: $DMARC"
  if echo "$DMARC" | grep -q 'p='; then
    ok "DMARC policy defined"
  else
    review "DMARC record exists but policy (p=) unclear"
  fi
else
  missing "No DMARC record found"
fi

echo ""
echo "── 6. CAA Records (Certificate Authority) ──"
CAA=$(dig +short CAA "${DOMAIN}" @1.1.1.1 || true)
if [[ -n "$CAA" ]]; then
  echo "$CAA" | while read -r line; do ok "CAA: $line"; done
else
  info "No CAA records (Optional but recommended for pinning CA)"
fi

echo ""
echo "── 7. HSTS Status ──"
info "HSTS was verified separately via live response headers; this script checks DNS/email only."

echo ""
echo "══════════════════════════════════════════════════════════"
echo "  Verification Tools (External):"
echo "  • https://internet.nl/mail/${DOMAIN}/"
echo "  • https://mxtoolbox.com/emailhealth/${DOMAIN}/"
echo "══════════════════════════════════════════════════════════"
echo ""
