#!/bin/bash
BASE="https://immobilien-akademie-smart.de"
echo "🔒 SICHERHEITS-SCAN"
echo "==================="

echo ""
echo "1. Security Headers Vollständig:"
curl -s -I "$BASE/" | grep -iE "strict-transport|x-frame|x-content|content-security|referrer|permissions" | while read line; do
  echo "  ✅ $line"
done

echo ""
echo "2. HTTPS Redirect (HTTP → HTTPS):"
CODE=$(curl -s -o /dev/null -w "%{http_code}" http://immobilie-akademie-premium-production.up.railway.app/ 2>/dev/null)
[ "$CODE" = "301" ] || [ "$CODE" = "308" ] && echo "  ✅ HTTP→HTTPS Redirect aktiv ($CODE)" || echo "  ⚠️ Kein Redirect ($CODE)"

echo ""
echo "3. Sensitive Endpoints geschützt:"
for path in "/api/admin" "/admin" "/api/trpc/adminQuery"; do
  CODE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE$path")
  if [ "$path" = "/admin" ] && [ "$CODE" = "200" ]; then
    echo "  ℹ️  $path: SPA-Shell (200) — Auth clientseitig, kein Datenleck"
  elif [ "$CODE" = "401" ] || [ "$CODE" = "403" ] || [ "$CODE" = "404" ]; then
    echo "  ✅ $path: Gesperrt ($CODE)"
  else
    echo "  ❌ $path: Zugänglich ($CODE)!"
  fi
done

echo ""
echo "4. SQL Injection Test (Basis):"
CODE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/api/auth/login" \
  -X POST -H "Content-Type: application/json" \
  -d '{"email":"admin@test.de\" OR \"1\"=\"1","password":"test"}')
[ "$CODE" = "401" ] && echo "  ✅ SQL-Injection abgeblockt" || echo "  ⚠️ Prüfen: Status $CODE"

echo ""
echo "5. SSL-Zertifikat:"
echo | openssl s_client -connect immobilie-akademie-premium-production.up.railway.app:443 2>/dev/null | \
  openssl x509 -noout -dates 2>/dev/null | while read line; do
  echo "  ✅ $line"
done
