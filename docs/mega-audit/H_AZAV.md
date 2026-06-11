# Teil H1 — AZAV technische Voraussetzungen

**Rolle:** Gründungsberater (technischer Teil nur)  
**Stand:** 2026-06-11 · HEAD `fcb7ac5`

⚠️ **H2 (Kosten, FKS, BAFA, AVGS)** ist Recherche-Auftrag für Claude — siehe Platzhalter am Ende.

---

## H1.1 Qualitätsmanagement-Dokumentation

| Prüfung | Ergebnis | Beleg |
|---------|----------|-------|
| QM-Prozess-Doku in `docs/` | ⚠️ Teilweise — Handover/Audit-Docs, kein dediziertes QM-Handbuch | `docs/handover/` |
| Beschwerdeweg | ✅ `/beschwerde` Route | `App.tsx:315` |
| Bildungskonzept | ✅ `/bildungskonzept` | `App.tsx:309` |

---

## H1.2 Lernerfolgskontrolle (technisch)

### Tabellen & Persistenz

| Feature | Tabelle/Code | Exportierbar? |
|---------|--------------|---------------|
| Prüfungssimulation | `exam_sessions`, `exam_questions` (Schema) | ✅ PDF-Zertifikat |
| Zertifikate | `certificates` + `generateCertificatePDF` | ✅ PDF → Storage | `server/certificates.ts:22-36` |
| Lernfortschritt | tRPC `progress.*` | ✅ AZAV-PDF-Export | `AzavPdfExport.tsx` |
| Weiterbildungsnachweis | `/weiterbildungsnachweis` | ✅ Route | `App.tsx:325` |
| Aktivitäts-Heartbeat | `useActivityHeartbeat` in Modulen | ✅ Zeittracking | `Module3Detail.tsx:5` |

### Zertifikat-Typen

✅ Unterscheidung Teilnahme vs. Prüfung — `certificates.ts:34` (`certificateType?: "participation" | "exam"`)

### AZAV-Felder im PDF

✅ Optionale AZAV-Metadaten: `azavEnabled`, `azavLicenseNumber`, `measureLicenseNumber` — `certificates.ts:31-33`

🔍 Ob diese Felder in Prod mit echten Träger-Daten befüllt werden — **Alisad** (noch keine Trägerzulassung).

---

## H1.3 Prüfungsmodus

| Komponente | Status | Beleg |
|------------|--------|-------|
| IHK-Timer (Zeitlimit) | ✅ getestet | `server/ihk-timer.test.ts` |
| Exam-Router | ✅ | `server/examRouter.ts` |
| Ergebnis-Seite | ✅ `/pruefung/:sessionId/ergebnis` | `App.tsx:320` |

---

## H1.4 Compliance / 20-Stunden-Nachweis

✅ Landing `/compliance-20h` — E2E gegen Prod (#197)  
✅ Preis 249 €/Jahr im Test verifiziert

---

## H2 — Recherche-Auftrag Claude (NICHT Cursor)

| Thema | Status |
|-------|--------|
| AZAV Trägerzulassung Kosten/Dauer 2026 | 🔍 AUSSTEHEND |
| ZFU-Zulassung (FernUSG) | 🔍 AUSSTEHEND |
| IHK Berlin Anerkennung §34c-Anbieter | 🔍 AUSSTEHEND |
| BAFA-Förderung Beratung 2026 | 🔍 AUSSTEHEND |
| Arbeitsagentur AVGS Maßnahmenträger | 🔍 AUSSTEHEND |

---

*Zurück zum [Hauptbericht](../MEGA_AUDIT_2026-06-11_BERICHT.md)*
