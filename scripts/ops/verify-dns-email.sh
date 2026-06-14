#!/usr/bin/env bash
# DNS and Email Verification Check for immobilien-akademie-smart.de
# Read-only verification of public DNS/email records.
# NOTE: HSTS was verified separately via live response headers; this script checks DNS/email only.

set -u

DOMAIN="${1:-immobilien-akademie-smart.de}"
DNS_SERVER="${DNS_SERVER:-1.1.1.1}"

info() { echo "  INFO: $1"; }
ok() { echo "  FOUND: $1"; }
review() { echo "  REVIEW: $1"; }
missing() { echo "  MISSING: $1"; }

have_cmd() {
  command -v "$1" >/dev/null 2>&1
}

lookup() {
  local type="$1"
  local name="$2"

  if have_cmd dig; then
    dig +short "$type" "$name" @"$DNS_SERVER" 2>/dev/null || true
  elif have_cmd nslookup; then
    nslookup -type="$type" "$name" "$DNS_SERVER" 2>/dev/null || true
  else
    echo ""
  fi
}

echo ""
echo "============================================================"
echo " DNS & Email Read-only Check"
echo " Domain: ${DOMAIN}"
echo " Time: $(date -u '+%Y-%m-%d %H:%M UTC')"
echo " DNS resolver: ${DNS_SERVER}"
echo "============================================================"
echo ""

if ! have_cmd dig && ! have_cmd nslookup; then
  missing "Neither dig nor nslookup is available. Install dnsutils/bind-tools or run in an environment with DNS lookup tools."
  exit 0
fi

echo "1) Root / WWW"
A_ROOT="$(lookup A "${DOMAIN}")"
if [ -n "$A_ROOT" ]; then
  echo "$A_ROOT" | while read -r line; do [ -n "$line" ] && ok "Root A: $line"; done
else
  missing "Root A record not found"
fi

CNAME_WWW="$(lookup CNAME "www.${DOMAIN}")"
A_WWW="$(lookup A "www.${DOMAIN}")"
if [ -n "$CNAME_WWW" ]; then
  echo "$CNAME_WWW" | while read -r line; do [ -n "$line" ] && ok "WWW CNAME: $line"; done
elif [ -n "$A_WWW" ]; then
  echo "$A_WWW" | while read -r line; do [ -n "$line" ] && ok "WWW A: $line"; done
else
  review "No WWW CNAME/A record found. Verify current domain setup."
fi

echo ""
echo "2) MX records"
MX="$(lookup MX "${DOMAIN}" | sort -n)"
if [ -n "$MX" ]; then
  echo "$MX" | while read -r line; do [ -n "$line" ] && ok "MX: $line"; done
else
  review "No MX records found. This may be OK only if the domain does not receive email."
fi

echo ""
echo "3) SPF / TXT records"
TXT_ROOT="$(lookup TXT "${DOMAIN}")"
SPF_ROOT="$(printf '%s\n' "$TXT_ROOT" | tr -d '"' | grep -i 'v=spf1' || true)"
if [ -n "$SPF_ROOT" ]; then
  echo "$SPF_ROOT" | while read -r line; do [ -n "$line" ] && ok "SPF root: $line"; done
else
  review "No root SPF record found. Verify with current email provider dashboard."
fi

TXT_SEND="$(lookup TXT "send.${DOMAIN}")"
SPF_SEND="$(printf '%s\n' "$TXT_SEND" | tr -d '"' | grep -i 'v=spf1' || true)"
if [ -n "$SPF_SEND" ]; then
  echo "$SPF_SEND" | while read -r line; do [ -n "$line" ] && ok "SPF send.${DOMAIN}: $line"; done
else
  review "No SPF record found on send.${DOMAIN}. Verify whether this subdomain is used for sending."
fi

echo ""
echo "4) DKIM records"
info "Checking common DKIM selectors. Verify active selectors in the current email provider dashboard."
for SELECTOR in resend selector1 selector2 google k1 default; do
  DKIM="$(lookup TXT "${SELECTOR}._domainkey.${DOMAIN}")"
  if [ -n "$DKIM" ]; then
    ok "DKIM selector '${SELECTOR}' found"
  fi
done
review "If no DKIM selector is shown above, confirm the active selector names in the current email provider dashboard."

echo ""
echo "5) DMARC policy"
DMARC="$(lookup TXT "_dmarc.${DOMAIN}" | tr -d '"')"
if [ -n "$DMARC" ]; then
  echo "$DMARC" | while read -r line; do [ -n "$line" ] && ok "DMARC: $line"; done
else
  review "No DMARC record found. Verify desired policy with current email provider/compliance requirements."
fi

echo ""
echo "6) CAA records"
CAA="$(lookup CAA "${DOMAIN}")"
if [ -n "$CAA" ]; then
  echo "$CAA" | while read -r line; do [ -n "$line" ] && ok "CAA: $line"; done
else
  info "No CAA records found. This is optional, but may be reviewed for certificate authority control."
fi

echo ""
echo "7) HSTS note"
info "HSTS was verified separately via live response headers; this script checks DNS/email only."

echo ""
echo "External manual review tools:"
echo "  https://internet.nl/mail/${DOMAIN}/"
echo "  https://mxtoolbox.com/emailhealth/${DOMAIN}/"
echo ""
echo "Done. Read-only check completed."
