# Growth Roadmap — Skalierung, Monetarisierung & Expansion

**Produkt:** Immobilien Akademie Smart  
**Stand:** 7. Juni 2026  
**Basis:** `docs/COMPETITIVE_ANALYSIS.md`, `docs/BUSINESS_ANALYSIS.md`

---

## Vision

Das führende **KI-gestützte Immobilien-Bildungsportal** im DACH-Raum: B2C-Vollqualifikation, B2B-White-Label, Compliance-Weiterbildung — eine Plattform, drei Umsatzströme.

**Umsatzziel (12 Monate):** 180.000 € (20 Sales/Monat × 750 € AOV) — realistisches Szenario aus Business Analysis.

---

## Umsatzarchitektur (Zielmix)

| Stream | Anteil Ziel | Mechanismus |
|--------|-------------|-------------|
| B2C Einzelmodule & Bundles | 60% | Stripe Checkout (bestehend) |
| B2B White-Label / Büro-Lizenzen | 25% | 199–499 €/Monat, 5–50 Seats |
| Micro-Subscriptions | 10% | Rechts-Update 9,90 €/Mo, KI-Credits |
| Affiliate & Partnerschaften | 5% | CRM, Makler-Software, Versicherungen |

---

## Phase 1: Foundation (Wochen 1–4)

### Legal & Payment (Blocker)
- [ ] Gewerbeschein final
- [ ] Stripe Live (`sk_live_`), Webhook produktiv
- [ ] SPF/DKIM/DMARC für `info@` und `support@`
- [ ] RESEND_API_KEY für Kauf-E-Mails

### Produkt — Compliance-Hook
- [ ] **Weiterbildungsnachweis-Export** (Stundenlog, PDF §15b MaBV)
- [ ] Klarstellung Modul 2: „480 UE vs. 20h Minimum“ auf Landing
- [ ] Zertifikat-Schwellen vereinheitlichen (Marketing 70% vs. Code 80%)

### Marketing — USP & Trust
- [x] USP-Landing `/warum-wir`
- [ ] 5 Testimonials (Name, Foto, Beruf)
- [ ] Social-Proof-API: echte `certsThisWeek`
- [ ] WIS-IHK-Listung

### SEO Quick Wins
- [x] Sitemap erweitert (`/warum-wir`, `/rechner`, `/hilfe`, `/barrierefreiheit`)
- [ ] Schema.org `offers.price` pro Modul
- [ ] Google Business Profile (Berlin)

---

## Phase 2: Traffic Engine (Monate 2–3)

### Content Marketing
| Kanal | Frequenz | Quelle |
|-------|----------|--------|
| Blog / Ratgeber | 2×/Woche | 240 Lerntage → SEO-Artikel |
| LinkedIn | 5×/Woche | Lerntag-Bites, Rechts-Updates |
| Instagram Reels | 3×/Woche | Rechner-Demos, KI-Tutor-Clips |
| YouTube Shorts | 2×/Woche | „§34c in 60 Sekunden“ |

### SEO Pillar Pages (Priorität)
1. `/ratgeber/34c-weiterbildung-pflicht` — 20h, MaBV, Nachweis
2. `/ratgeber/immobilienmakler-werden` — Karriereguide
3. `/ratgeber/weg-verwalter-ausbildung` — §26a
4. `/ratgeber/34i-sachkundenachweis` — IHK-Vorbereitung
5. `/vergleich/wbthek-alternative` — Conversion-Seite

### CRO
- Post-Trial 7-Tage-E-Mail-Sequenz
- Exit-Intent auf `/kurse`
- Bundle-Upsell 48h nach Einzelkauf
- Live-Chat (Crisp/Tawk, kostenlos)

### Paid (nach Stripe Live)
- Google Ads: „§34c Weiterbildung online“, „Immobilienmakler Kurs“
- Meta: Lookalike Trial-Converter
- Budget Start: 500 €/Monat, ROAS-Ziel 3×

---

## Phase 3: B2B & Skalierung (Monate 4–12)

### White-Label Go-Live
- Öffentliche Seite `/fuer-maklerbueros`
- Pakete: Starter (5 User, 199 €), Professional (15 User, 399 €), Enterprise (50+ User, Angebot)
- Inspect-Link als Demo-Tool für Vertrieb
- Partner-Onboarding: 1-Pager + Demo-Tenant

### Produkt-Erweiterungen
- Server-sync Gamification (Multi-Device)
- Verifizierbare Zertifikate (QR-Check)
- KI-Token-Limits (Fair Use: 50 Nachrichten/Tag)
- AZAV-Vorbereitung (wenn Zertifizierung)

### Expansion
- Österreich/Schweiz: Rechts-Module (WIKR bleibt DE-fokussiert)
- Makler-CRM-Integrationen (Propstack, onOffice)
- Verbände: IVD-Mitgliedschaft als Vertriebskanal

---

## Social Media Playbook

### Positionierung
*„Der KI-Makler-Coach — lernen wie die Profis, ohne Präsenzpflicht.“*

### Content-Säulen
1. **Recht aktuell** — BGH-Urteile, Gesetzesänderungen (aus Modul-Normen)
2. **Rechner-Demos** — „WEG-Nebenkosten in 30 Sekunden“
3. **KI-Tutor** — Screenshot-Threads „Frag den Tutor: Was ist §181 BGB?“
4. **Erfolgsgeschichten** — Zertifikat + Zitat
5. **Behind the Portal** — 240 Lerntage, Technik, Berlin

### Hashtags (DE)
`#Immobilienmakler` `#34c` `#WEG` `#Immobilienwirtschaft` `#Weiterbildung` `#Maklerausbildung` `#PropTech`

---

## Technische Skalierung

| Komponente | Limit heute | Maßnahme bei 10k User |
|------------|-------------|----------------------|
| MySQL (Railway) | OK | Read-Replica, Indizes |
| Node.js | Stateless | Horizontal scaling |
| KI-API | **Risiko** | Token-Limits, Caching, Haiku-first |
| CDN | Vite assets | Cloudflare vor Domain |
| Backups | Runbook vorhanden | Täglich automatisiert testen |

---

## Meilensteine

| Meilenstein | Kriterium |
|-------------|-----------|
| **Launch-Ready** | Stripe Live + 11/14 Checklist grün |
| **Product-Market-Fit** | 20 zahlende Kunden, NPS 40+ |
| **B2B Proof** | 3 White-Label-Piloten |
| **Scale** | 10.000 registrierte User, 50 Sales/Monat |

---

## Nächste Implementierungen (Engineering Backlog)

1. `Weiterbildungsnachweis.tsx` + Server-PDF-Export
2. `/fuer-maklerbueros` B2B-Landing
3. Blog-Router + 5 Seed-Artikel
4. Prerender für `/kurs/*` und `/warum-wir` (Vite SSR oder Prerender.io)
5. Referral-System (`?ref=CODE`, 50 € Gutschein)

---

*Siehe auch: `docs/COMPETITIVE_ANALYSIS.md` für Wettbewerbsdetails und USP-Matrix.*
