# Compliance Claims Fix Report
## Phase 1 — Claims entschärft
**Datum:** 28. April 2026
**Branch:** marktreife-hardening-20260428

---

## ERLEDIGTE FIXES

| Nr | Datei | Alt | Neu | Risiko vorher | Status |
|----|-------|-----|-----|---------------|--------|
| 1 | FeedbackWidget.tsx:4 | QM-Pflicht nach AZAV §3 | interne Qualitätssicherung | ROT | ERLEDIGT |
| 2 | ComplaintForm.tsx:4 | QM-Pflicht nach AZAV §3 | interne Qualitätssicherung | ROT | ERLEDIGT |
| 3 | ComplaintForm.tsx:35 | Rechtsgrundlage: AZAV §3 Abs. 4 | Internes Beschwerdemanagement | ROT | ERLEDIGT |
| 4 | ComplaintForm.tsx:101 | gemäß AZAV §3 dokumentiert | intern dokumentiert | ROT | ERLEDIGT |
| 5 | KursPakete.tsx:30 | IHK-Niveau garantiert | an IHK-Themen orientiert | ROT | ERLEDIGT |

---

## BEWUSST BEHALTEN (mit Begründung)

| Datei | Claim | Begründung |
|-------|-------|------------|
| KursLanding.tsx:27 | AZAV-Zulassung in Vorbereitung | Ehrliche Zukunftsaussage — OK |
| WhiteLabelAdmin.tsx | AZAV-Felder | Nur intern/Admin — nicht öffentlich |
| PortalPhaseAdmin.tsx | AZAV Phase C/D | Nur Admin — nicht öffentlich |
| Foerderung.tsx:5 | Zertifizierungsverfahren | Ehrliche Beschreibung des Status |
| Impressum.tsx | kein staatlich anerkannter | Korrekte Einschränkung — BEHALTEN |
| certificates.ts | ersetzt nicht die offizielle IHK-Prüfung | Korrekte Einschränkung — BEHALTEN |

---

## NOCH OFFEN (externe Prüfung nötig)

| Nr | Bereich | Aufgabe |
|----|---------|---------|
| A | IHK-Claims in SEO.tsx | Rechtsanwalt prüfen lassen |
| B | Foerderung.tsx | Vollständige Seite prüfen lassen |
| C | AGB | Fachanwalt prüfen lassen |
| D | DSGVO-Aussagen | Datenschutzbeauftragten prüfen lassen |
| E | ZFU-Relevanz | Fernunterrichtsschutzgesetz prüfen |

---

## BELEG
- Build: pnpm build wird nach Commit ausgeführt
- Grep-Verifikation: keine AZAV §3 Claims mehr öffentlich sichtbar
