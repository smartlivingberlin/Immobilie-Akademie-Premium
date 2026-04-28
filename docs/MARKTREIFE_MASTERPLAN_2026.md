# MARKTREIFE MASTERPLAN 2026
## Immobilien Akademie Smart Premium
**Erstellt:** 28. April 2026
**Branch:** marktreife-hardening-20260428
**Status:** IN ARBEIT

---

## ZIEL
Das Portal soll sicher, rechtlich sauber und professionell
zur Marktreife geführt werden — ohne Neubau.

---

## PHASEN-ÜBERSICHT

| Phase | Titel | Status |
|-------|-------|--------|
| 0 | Sicherheit, Backup, Branch | IN ARBEIT |
| 1 | Claims und rechtliche Texte entschärfen | OFFEN |
| 2 | Impressum, Datenschutz, AGB, Cookie härten | OFFEN |
| 3 | Stripe, Webhook, Freischaltung, E-Mail | OFFEN |
| 4 | Auth, Rollen, Gating, Owner-Panel | OFFEN |
| 5 | KI/RAG Qualität und Datenschutz | OFFEN |
| 6 | Barrierefreiheit und Smart Access Layer | OFFEN |
| 7 | Inklusive Berufswege und USP | OFFEN |
| 8 | Content, Modul 6/7/8, Didaktik | OFFEN |
| 9 | Performance und Bundle-Größen | OFFEN |
| 10 | Testsystem und Qualitätsgate | OFFEN |
| 11 | Deployment, Domain, Railway, Monitoring | OFFEN |
| 12 | Marketing, SEO, Social Media | OFFEN |
| 13 | AZAV, ZFU, Partner, Förderung | OFFEN |
| 14 | Abschluss: Marktreife-Dashboard | OFFEN |

---

## AKTUELLE BLOCKER (aus Audit)

### ROT — sofort:
- Gewerbeschein fehlt
- Stripe im Testmodus
- Stripe-Webhook nicht konfiguriert
- E-Mail-System inaktiv (RESEND_API_KEY fehlt)
- Impressum unvollständig
- AZAV-Claims ohne Zulassung

### GELB — diese Woche:
- IHK-Claims abschwächen
- Modul 6/7/8 prüfen
- VITE_FORGE_API_KEY prüfen
- Owner-Panel 2FA
- Bundle-Größen reduzieren

---

## GRUNDREGELN
1. Keine Secrets ausgeben
2. Keine produktiven Daten verändern ohne Freigabe
3. Keine Migrationen ohne Plan und Backup
4. Keine Live-Zahlung ohne Freigabe
5. Keine AZAV/ZFU/IHK-Claims ohne Beleg
6. Immer kleine sichere Schritte
7. Nach jedem Schritt: Beleg liefern

---

## ERLEDIGTE SCHRITTE

### Phase 0 — 28.04.2026
- [x] Branch erstellt: marktreife-hardening-20260428
- [x] docs/ Ordner erstellt
- [x] Masterplan erstellt
- [x] Git-Status geprüft: sauber
- [x] .gitignore prüft: .env geschützt
- [x] Keine Secrets im Repo gefunden

---

## OFFENE ENTSCHEIDUNGEN (nur du kannst das)
1. Gewerbeschein: Gewerbeamt Berlin persönlich anmelden
2. Stripe Live: Dashboard-Freigabe erteilen
3. Domain: immobilien-akademie-smart.de kaufen
4. RESEND: API-Key bei resend.com erstellen
5. AZAV: Beratung bei zuständiger Stelle beginnen
