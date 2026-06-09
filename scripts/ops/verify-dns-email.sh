#!/usr/bin/env bash
# E-Mail-DNS Schnellcheck für immobilien-akademie-smart.de
# Anfänger-freundlich: Grün = gut, Rot = Handlung nötig
set -euo pipefail

DOMAIN="${1:-immobilien-akademie-smart.de}"

ok()   { echo "  ✅ $1"; }
warn() { echo "  ⚠️  $1"; }
fail() { echo "  ❌ $1"; }

echo ""
echo "══════════════════════════════════════════════════════════"
echo "  E-Mail-DNS Check: ${DOMAIN}"
echo "  $(date -u '+%Y-%m-%d %H:%M UTC')"
echo "══════════════════════════════════════════════════════════"
echo ""

echo "── 1. SPF (Root-Domain) ──"
SPF=$(dig +short TXT "${DOMAIN}" @1.1.1.1 | grep -i spf | tr -d '"' || true)
if [[ -z "$SPF" ]]; then
  fail "Kein SPF-Record gefunden"
else
  echo "     Record: $SPF"
  if echo "$SPF" | grep -q '_spf.resend.com'; then
    fail "include:_spf.resend.com ist KAPUTT (Host existiert nicht) → ersetzen durch include:amazonses.com"
  else
    ok "Kein _spf.resend.com (gut)"
  fi
  if echo "$SPF" | grep -q 'include:amazonses.com'; then
    ok "include:amazonses.com vorhanden"
  else
    warn "include:amazonses.com fehlt — Resend-Versand braucht das"
  fi
  if echo "$SPF" | grep -q '\-all'; then
    ok "Hardfail (-all) gesetzt"
  elif echo "$SPF" | grep -q '~all'; then
    warn "Softfail (~all) — Internet.nl bevorzugt oft -all"
  fi
fi

echo ""
echo "── 2. SPF (send-Subdomain) ──"
SEND_SPF=$(dig +short TXT "send.${DOMAIN}" @1.1.1.1 | grep -i spf | tr -d '"' || true)
if [[ -z "$SEND_SPF" ]]; then
  fail "Kein SPF auf send.${DOMAIN} — Resend Return-Path braucht: v=spf1 include:amazonses.com -all"
else
  echo "     Record: $SEND_SPF"
  ok "SPF auf send-Subdomain vorhanden"
fi

echo ""
echo "── 3. DMARC ──"
DMARC=$(dig +short TXT "_dmarc.${DOMAIN}" @1.1.1.1 | tr -d '"' || true)
if [[ -z "$DMARC" ]]; then
  fail "Kein DMARC-Record"
else
  echo "     Record: $DMARC"
  if echo "$DMARC" | grep -q 'pct=10'; then
    warn "pct=10 — nur 10% der Mails werden geprüft (später auf pct=100 erhöhen)"
  fi
  if echo "$DMARC" | grep -q 'p=none'; then
    ok "p=none (Monitoring-Phase — ok für Start)"
  elif echo "$DMARC" | grep -q 'p=quarantine'; then
    ok "p=quarantine aktiv"
  fi
fi

echo ""
echo "── 4. DKIM (Resend) ──"
DKIM=$(dig +short TXT "resend._domainkey.${DOMAIN}" @1.1.1.1 | head -1 || true)
if [[ -z "$DKIM" ]]; then
  fail "Kein DKIM resend._domainkey — in Resend-Dashboard Domain prüfen"
else
  ok "DKIM resend._domainkey vorhanden (${#DKIM} Zeichen)"
fi

echo ""
echo "── 5. MX (Posteingang) ──"
dig +short MX "${DOMAIN}" @1.1.1.1 | while read -r line; do echo "     $line"; done

echo ""
echo "── 6. CAA (optional, empfohlen) ──"
CAA=$(dig +short CAA "${DOMAIN}" @1.1.1.1 || true)
if [[ -z "$CAA" ]]; then
  warn "Keine CAA-Records — 10-Min-Fix beim Domain-Provider möglich"
else
  echo "$CAA" | while read -r line; do echo "     $line"; ok "CAA gesetzt"; done
fi

echo ""
echo "── 7. HSTS (Website) ──"
HSTS=$(curl -sI "https://${DOMAIN}/" | grep -i strict-transport-security || true)
if [[ -z "$HSTS" ]]; then
  fail "Kein HSTS-Header"
else
  echo "     ${HSTS#strict-transport-security: }"
  if echo "$HSTS" | grep -qi preload; then
    ok "preload vorhanden (PR #151 deployed)"
  else
    warn "preload fehlt noch — PR #151 mergen + deployen"
  fi
fi

echo ""
echo "══════════════════════════════════════════════════════════"
echo "  Online-Tests (im Browser öffnen):"
echo "  • https://internet.nl/mail/${DOMAIN}/"
echo "  • https://mxtoolbox.com/SuperTool.aspx?action=spf%3a${DOMAIN}"
echo "══════════════════════════════════════════════════════════"
echo ""
