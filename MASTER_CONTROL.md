# IMMOBILIEN AKADEMIE SMART PREMIUM
# Master Control Document — Stand: 12.05.2026

## DIE 5 HAUPTZIELE (unveränderlich)
1. Portal ist marktreif und verkaufbar
2. Zahlungen funktionieren (Stripe Live)
3. Nutzer-Flows sind fehlerfrei
4. Legal compliant (Gewerbeschein, AGB, DSGVO)
5. Jobcenter-Präsentation möglich

## LAUNCH-CHECKLISTE (was blockiert Go-Live)
- [ ] Stripe Webhook konfigurieren (NUR ALISAD)
- [ ] Gewerbeschein anmelden (NUR ALISAD)
- [ ] Domain kaufen (NUR ALISAD)
- [x] Login-System korrekt (erledigt 11.05)
- [x] Routing rollenbasiert (erledigt 11.05)
- [x] Claims korrekt (erledigt 11.05)
- [x] Stripe Checkout funktioniert (erledigt)
- [x] 810 IHK-Fragen validiert (erledigt)

## VERBOTENE ABWEICHUNGEN
- Kein Refactoring von db.ts oder routers.ts
- Keine neuen Features bis Stripe Webhook live
- Keine Bundle-Optimierung bis Launch
- Kein Umbau von funktionierenden Systemen

## BEKANNTE TECHNISCHE SCHULDEN (nach Launch)
- db.ts 1295 Zeilen aufteilen
- routers.ts 977 Zeilen aufteilen
- Sentry aktivieren
- 2FA Session-Cookie absichern
- WCAG vollständig
